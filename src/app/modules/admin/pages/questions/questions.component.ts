import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { User } from 'src/app/shared/models/user.model';
import { AdminService, LocalStorageService } from 'src/app/shared/services';
import { AddQuestionModalComponent } from '../../components';
import { IQuestionnaire, questioCatagory, Questionnaire } from '../../model/Questionair.model';

@Component({
  selector: 'app-question',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  providers: [DialogService],
})
export class QuestionsComponent implements OnInit {
  public display: boolean = false;
  public questionaireTitle: string = '';
  public searchByTitle: string = '';
  public questionaires = new IQuestionnaire();
  public questionairCatagory: questioCatagory[] = [];
  public isLoading: boolean = false;
  public currentUser: User = new User();
  users: any;
  user: any;
  dateTime: any
  questionnaireId!: string | null;



  constructor(
    private dialogService: DialogService,
    private adminService: AdminService,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute
  ) {
    this.questionairCatagory = [
      { name: 'All', code: 'all' },
      { name: 'Physics', code: 'PY' },
      { name: 'Chemistry', code: 'CH' },
      { name: 'Biology', code: 'BIO' },
      { name: 'Mathematics', code: 'MATH' },
      { name: 'Computer', code: 'CS' },
    ];
    this.currentUser = this.localStorageService.get('user')
    

  }

  /**
   * get Questionnaires From Local Storage
   */
  ngOnInit(): void {
    this.getQuestionsList();
    this.getUsers();
  }

  public getQuestionsList() {
    this.questionnaireId = this.getQuestionnairId();
    if (this.questionnaireId && this.questionnaireId.length) {
      this.adminService.getQuestionById(this.questionnaireId).subscribe((res) => {
        if (res) {
          this.questionaires = res;
          this.questionaires.startTime = new Date(this.questionaires.startTime!);
          this.questionaires.endTime = new Date(this.questionaires.endTime!);
        }
      })
    }
  }

  public getQuestionnairId() {
    return this.route.snapshot.paramMap.get('id');
  }

  public getUsers(): void {
    this.adminService.getUsers().subscribe((users) => {
      this.users = users;
    }, error => {
      console.log(error);
    });
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
    ref.onClose.subscribe((question) => {
      if (question) {
        this.questionaires.questions = [...this.questionaires.questions!, question];
        // this.adminService.addQuestion(this.questionaires).subscribe((res) => {
        //   this.getQuestionsList();
        // });
      }
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
    ref.onClose.subscribe((question) => {
      this.questionaires.questions = this.questionaires.questions!.map((questionnaire) => {
        return questionnaire._id === question._id ? question : questionnaire;
      });
      this.adminService.updateQuestion(this.getQuestionnairId(), this.questionaires).subscribe((res) => {
        this.getQuestionsList();
      });
    });
  }

  /**
   * sends api call to delete question.
   * @param selectedQuestion  Questionnaire obj.
   */
  deleteQuestion(selectedQuestion: Questionnaire) {
    this.isLoading = true;
    this.questionaires.questions = this.questionaires.questions!.filter((question) => {
      return question._id !== selectedQuestion._id;
    });
    this.adminService.updateQuestion(this.getQuestionnairId(), this.questionaires).subscribe((res) => {
      this.getQuestionsList();
    });
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  /**
   * Submits Questionnaire to server.
   */
  submitQuestionaire() {
    if (this.questionaires._id) {
      this.adminService.updateQuestion(this.getQuestionnairId(), this.questionaires).subscribe((res) => {
        setTimeout(() => history.back(), 2000);
      });
    } else {
      this.adminService.addQuestion(this.questionaires).subscribe((res) => {
        setTimeout(() => history.back(), 2000);
      });
    }
  }

}
