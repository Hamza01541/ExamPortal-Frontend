import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AdminService, LocalStorageService } from 'src/app/shared/services';
import { AddQuestionModalComponent } from '../../components';
import { questioCatagory, Questionnaire } from '../../model/Questionair.model';

@Component({
  selector: 'app-question',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  providers: [DialogService],
})
export class QuestionsComponent implements OnInit {
  public display: boolean = false;
  public searchByTitle: string = '';
  public questionaires: Questionnaire[] = [];
  public questionairCatagory: questioCatagory[] = [];
  public isLoading: boolean = false;

  constructor(
    private dialogService: DialogService,
    private adminService: AdminService,
    private localStorageService: LocalStorageService
  ) {
    this.questionairCatagory = [
      { name: 'All', code: 'all' },
      { name: 'Physics', code: 'PY' },
      { name: 'Chemistry', code: 'CH' },
      { name: 'Biology', code: 'BIO' },
      { name: 'Mathematics', code: 'MATH' },
      { name: 'Computer', code: 'CS' },
    ];
  }

  /**
   * get Questionnaires From Local Storage
   */
  ngOnInit(): void {
    this.getQuestionsList();
  }

  /**
   * send api call to get Questions List.
   */
  getQuestionsList() {
    const questions = localStorage.getItem('questionList');
    if (questions) {
      this.questionaires = JSON.parse(questions);

      console.log("this.questionaires:", this.questionaires)
    }

    // this.adminService
    //   .getQuestions()
    //   .subscribe((questionsList: Questionnaire[]) => {
    //     if (questionsList) {
    //       this.questionaires = questionsList;
    //       this.localStorageService.set('questionaires', this.questionaires)
    //     }
    //   });
  }

  /**
   * opens Add Question Modal Popup.
   */
  openQuestionModel() {
    const ref = this.dialogService.open(AddQuestionModalComponent, {
      header: 'Add a new Question',
      width: '50%',
      height: '150%',
      data: {},
    });
    ref.onClose.subscribe((res) => {
      this.getQuestionsList();
    });
  }

  /**
   * Edit pop form Question Button after update data send to Add-Question-model
   * @param  selectedQuestion Questionnaire obj.
   */
  editQuestion(selectedQuestion: Questionnaire) {
    const ref = this.dialogService.open(AddQuestionModalComponent, {
      header: 'Edit Question',
      width: '50%',
      height: '150%',
      data: { selectedQuestion: selectedQuestion },
    });
    ref.onClose.subscribe((res) => {
      this.getQuestionsList();
    });
  }

  /**
   * sends api call to delete question.
   * @param selectedQuestion  Questionnaire obj.
   */
  deleteQuestion(selectedQuestion: Questionnaire) {
    this.isLoading = true;
    // this.adminService
    //   .deleteQuestion(selectedQuestion._id as string)
    //   .subscribe((res) => {
    //     if (res) {
    //       this.isLoading = false;
    //       this.getQuestionsList();
    //     }
    //   });


    const currentIndex = this.questionaires.findIndex(x => x.questionId === selectedQuestion.questionId);

    this.questionaires.splice(currentIndex, 1);

    localStorage.setItem('questionList', JSON.stringify(this.questionaires));

    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }
}
