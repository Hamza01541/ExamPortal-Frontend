import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AdminService, LocalStorageService } from 'src/app/shared/services';
import { IQuestionnaire, Questionnaire } from '../../admin/model/Questionair.model';

@Component({
  selector: 'app-questionnair',
  templateUrl: './questionnair.component.html',
  styleUrls: ['./questionnair.component.css']
})
export class QuestionnairComponent implements OnInit {

  questionList!: IQuestionnaire;
  selectedValue: string = '';
  userAnswers: any[] = [];
  totalScore: number = 0;
  isdisable: boolean = false;
  showQuestionnaire: boolean = false;
  formSubmitted: boolean = false;
  percenttage: number = 0;
  userQuseetionResult: any[] = []
  userAnswerResult: any[] = []
  totalMarks = 0;
  index = 1
  time: any = 10;
  timePerQuestion: any;
  interval: any = 0;
  questionCounter: any = 1;
  oneQuestion: any;
  flageLast: any = false;
  totalQuestion: any;
  allQuestions: any;
  isTime: boolean = false;
  pager: any = {
    index: 0,
    count: 0
  };
  month: any;
  date: any;

  currentQuestion: any;
  remainingTime: number = 0;
  timeout: any;
  currentUser: User = new User();
  totalTime!: number | undefined;
  isSubmitted: boolean = false;


  constructor(private adminService: AdminService, private localStorage: LocalStorageService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.localStorage.get('user')

    this.loadQuestionnaire().then(() => this.checkIfSubmitted());
  }

  /**
   * Load Questionnaire
   * @returns 
   */
  loadQuestionnaire(): Promise<any> {
    return new Promise(resolve => {
      this.adminService.getUserById(this.currentUser._id).subscribe((user: any) => {
        if (user) {
          user = JSON.parse(atob(user));
          console.log('user: ', user);

          this.month = new Date().toLocaleString('en-US', { month: 'long' });
          this.date = new Date().toLocaleString('en-US', { day: 'numeric' });
          if (new Date() >= new Date(user?.questions?.startTime) && new Date() <= new Date(user?.questions?.endTime)) {
            this.isTime = false;
          } else {
            this.isTime = true;
          }
          this.questionList = user.questions;
          this.pager.count = this.questionList?.questions?.length;
          this.questionList?.questions?.forEach((x: any, ind) => {
            this.totalMarks += x.marks;
          });
          resolve('')
        }
        this.getTotalTime()
      }, (error: any) => {
        this.questionList = {};
      }
      );
    })
  }

  private getTotalTime() {
    this.totalTime =  this.questionList && this.questionList.questions && this.questionList?.questions?.reduce((acc, cur) => {
      return acc + +((cur!.questionTime!) / 60).toFixed(0);
    }, -1);
    return this.totalTime;

  }

  private getCurrentQuestion() {
    this.currentQuestion =  this.questionList.questions && this.questionList.questions[this.pager.index];
    this.remainingTime = this.currentQuestion?.questionTime;

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.currentQuestion ? this.nextQuestion()
        : (!this.currentQuestion ? this.submitAnswer()
          : this.formSubmitted = true)
    }, this.currentQuestion?.questionTime * 1000);


  }


  public nextQuestion() {
    this.pager.index++;
    this.getCurrentQuestion();
  }

  private startCountdown() {
    this.interval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      }
    }, 1000);
  }

  selectAnswer(question: Questionnaire, selectedAnswer: any) {
    question.selectedAnswer = selectedAnswer;
    question.isCorrect = selectedAnswer === question.answer;
    const index = this.userAnswers.findIndex((answer: any) => answer._id == question._id)
    if (index <= -1) {
      this.userAnswers.push(question);
    } else {
      this.userAnswers[index] = question;
    }
  };

  // get user Asnwer and calculat the total number;
  submitAnswer() {
    console.log('this.questionList: ', this.questionList);
    this.adminService.submitResponse(
      {
        userId: this.currentUser._id,
        questionnaireResponse: this.questionList,
        
        isSubmitted: true,
      }
    ).pipe().subscribe((res: any) => {
      
      this.formSubmitted = true;

      setTimeout(() => {
        this.localStorage.clear();
        this.router.navigate(['/login']);
      }, 2000)
    });
    //   if (answer.isCorrect) {
    //     this.totalScore += answer.marks;
    //   };
    // });

    // if (this.userAnswers.length == this.questionList.length) {
    //   this.isdisable = true;
    //   this.LoadUserQusestion();
    //   this.showfm = !this.showfm
    // }
    // this.percenttage = (this.totalScore / this.totalMarks) * 100;
    // if (this.timeout) {
    //   clearTimeout(this.timeout);
    // }

  }

  /**
   * Starts the countdown timer and Test
   */
  public startTest() {
    this.getCurrentQuestion();
    this.startCountdown();
    this.showQuestionnaire = true;
  }

  /**
   * Check if user has submitted the questionnaire
   */
  public checkIfSubmitted() {
    const user = {
      userId: this.currentUser._id,
      questionnaireId: this.questionList._id
    }
    this.adminService.checkIfSubmitted(user).subscribe(res => {
      res.data.forEach((data: any) => {
        console.log('data: ', data);
        if (data.questionnaireResponse._id === user.questionnaireId) {
          this.isSubmitted = data.isSubmitted;
        }
        else {
          this.isSubmitted = false;
        }
      })
    })

  }

}
