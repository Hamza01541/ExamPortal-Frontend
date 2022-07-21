import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/services';
import { Questionnaire } from '../../admin/model/Questionair.model';

@Component({
  selector: 'app-questionnair',
  templateUrl: './questionnair.component.html',
  styleUrls: ['./questionnair.component.css']
})
export class QuestionnairComponent implements OnInit {

  questionList: Questionnaire[] = [];
  selectedValue: string = '';
  userAnswers: any[] = [];
  totalScore: number = 0;
  isdisable: boolean = false;
  showfm: boolean = true;
  formSubmitted: boolean = false;
  percenttage: number = 0;
  userQuseetionResult: any[] = []
  userAnswerResult: any[] = []
  totalMarks = 0;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.LoadUserQusestion();
  }
  

    /**
   * send api call to get Questions List.
   */
     LoadUserQusestion() {
    // this.adminService
    //   .getQuestions()
    //   .subscribe((questionsList: Questionnaire[]) => {
    //     if (questionsList) {
    //       this.questionList = questionsList;
    //     }
    //   });

    const questions = localStorage.getItem('questionList');
    if (questions) {
      this.questionList = JSON.parse(questions);

      console.log("this.questionaires:", this.questionList)

      this.questionList.forEach(x=> {
        this.totalMarks += x.marks;
      });
    }
  }

  selectAnswer(question: Questionnaire, selectedAnswer: any) {
   question.selectedAnswer = selectedAnswer;
   question.isCorrect = selectedAnswer === question.answer;
    
    const index = this.userAnswers.findIndex((answer: any) => answer.questionId == question.questionId)

    if (index <= -1) {
      this.userAnswers.push(question);
    } else {
      this.userAnswers[index] = question;
    }
  };

  // get user Asnwer and calculat the total number;
  submitAnswer() {
    console.log("userAnswers:",this.userAnswers);
    this.userAnswers.forEach((answer) => {
      if (answer.isCorrect) {
        this.totalScore += answer.marks;
      };
    });

    // if (this.userAnswers.length == this.questionList.length) {
    //   this.isdisable = true;
    //   this.LoadUserQusestion();
    //   this.showfm = !this.showfm
    // }



    this.percenttage = (this.totalScore / this.totalMarks) * 100;

    this.formSubmitted = true;
  }
}
