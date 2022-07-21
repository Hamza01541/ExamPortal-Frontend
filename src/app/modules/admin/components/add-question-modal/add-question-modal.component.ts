import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { QuestionButton, Questionnaire } from '../../model/Questionair.model';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminService } from 'src/app/shared/services';

@Component({
  selector: 'app-add-question-modal',
  templateUrl: './add-question-modal.component.html',
  styleUrls: ['./add-question-modal.component.css'],
  providers: [DialogService],
})
export class AddQuestionModalComponent implements OnInit, OnDestroy {
  @Input() set display(va: any) {
    this.isEditMode = va?.show;
    this.initializeQuestionairForm();
  }
  

  public addQuestionButton: QuestionButton;
  public questionnaire: Questionnaire;
  public addMultiQuestions: Questionnaire[];
  public isEditMode = false;
  public isLoading = false;
  public selectedCategoryName: string;
  public selectedDropDownValue: any;
  public questionaires: Questionnaire[] = [];
  // questionairCatagory: questioCatagory[] = [];
  // answerList: answerList[] = [];

  constructor(
    public config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private adminService: AdminService
  ) {
    this.selectedCategoryName = '';
    this.addQuestionButton = new QuestionButton();
    this.addMultiQuestions = [];

    if (config.data.selectedQuestion) {
      this.questionnaire = config.data.selectedQuestion;
      this.initializeQuestionairForm(this.questionnaire);
      this.isEditMode = true;
    } else {
      this.questionnaire = new Questionnaire();
      this.initializeQuestionairForm(this.questionnaire);
    }
  }

  ngOnInit(): void {
    const questions = localStorage.getItem('questionList');
    if(questions){
     this.questionaires = JSON.parse(questions);
    }
  }

  /**
   * Initialize Question Form and Edit selected Question
   * @param EditSelectedQuestion
   */
  initializeQuestionairForm(selectedQuestion?: any) {
    this.addMultiQuestions = [
      {
        _id: selectedQuestion?._id,
        title: selectedQuestion?.title,
        questionOption: selectedQuestion?.questionOption,
        answer: selectedQuestion?.answer,
        marks: selectedQuestion.marks,
        questionId: selectedQuestion.questionId
      },
    ];
  }

  /**
   * sends api request to add Question.
   * @param questionaires Questionnaire.
   */
  addQuestion(questionaire: Questionnaire) {
    this.isLoading = true;
    
   const currentIndex = this.questionaires.findIndex(x=> x.questionId === questionaire.questionId);

   if(currentIndex === -1) {
    questionaire.questionId = this.getRandomId();
    this.questionaires.push(questionaire);
   } else {
    this.questionaires[currentIndex] = questionaire;
  }

   localStorage.setItem('questionList', JSON.stringify(this.questionaires));

   setTimeout(() => {
   this.isLoading = false;
   this.ref.close();
    }, 3000);
  }

  // /**
  //  * sends api request to update Question.
  //  * @param question Questionnaire obj.
  //  */
  // updateQuestion(question: Questionnaire) {
  //   this.adminService.updateQuestion(question).subscribe((res) => {
  //     if (res) {
  //       this.isLoading = false;
  //       this.ref.close();
  //     }
  //   });
  // }



  /**
   * check options on user Inputs that its a valid options or not
   * @param optionValue
   */
  isOptionValid(optionValue: any, index?: any) {
    if (optionValue == '') {
      this.addMultiQuestions[this.addMultiQuestions.length - 1].questionOption[
        index
      ].isExist = false;
    } else {
      this.addMultiQuestions[
        this.addMultiQuestions.length - 1
      ].questionOption.forEach((item: any, index: any, arr: any) => {
        if (item.value != '') {
          this.addMultiQuestions[
            this.addMultiQuestions.length - 1
          ].questionOption = this.getDuplicated(item.value, arr);
        }
      });
      this.addMultiQuestions[
        this.addMultiQuestions.length - 1
      ].questionOption.forEach((item: any, index: number) => {
        this.addMultiQuestions[
          this.addMultiQuestions.length - 1
        ].questionOption[index].isExist = item.size > 1 ? true : false;
        if (item.size > 1) {
          this.addQuestionButton.isNotValidQuestion = false;
        }
        // if(item.value){
        // this.showAnswerdropDownList = true;
        // }else{
        // this.showAnswerdropDownList = false;
        // }
      });
    }
  }

  /**
   * User Option Duplicated check value funcation here...
   * @param Duplicated
   */
  getDuplicated(value: any, array: any) {
    array.map((val: any, index: any) => {
      if (val.value != '' && val.value == value) {
        return array.filter((val: any) => {
          return val.value === value;
        }).length > 1
          ? (array[index].size = 2)
          : (array[index].size = 0);
      } else {
        return false;
      }
    });
    return array;
  }

  /**
   * Remove User multi Question form
   * @param index
   */
  RemoveQuestion(index: any) {
    this.addMultiQuestions.splice(index, 1);
    this.showButtonOnRemove();
  }

  /**
   * Remove user multi QUestion form funcation here...
   * @param RemoveFuncation
   */
  showButtonOnRemove() {
    const answer =
      this.addMultiQuestions[this.addMultiQuestions.length - 1].answer;
    const questionfound = this.addMultiQuestions[
      this.addMultiQuestions.length - 1
    ].questionOption.find((item: any) => item.value === answer);
    if (questionfound?.value) {
      this.addQuestionButton.isValidAnwer = true;
    }
  }

    /**
     * Gets random id.
     * @param {number} lengthOfCode Length of code.
     * @returns {string}
     */
       getRandomId(lengthOfCode = 50): string {
        const possible = 'abcdefghijklmnopqrstuvwxuzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        let text = '';
        for (let i = 0; i < lengthOfCode; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

  ngOnDestroy(): void {
    this.questionnaire = new Questionnaire();
  }
}
