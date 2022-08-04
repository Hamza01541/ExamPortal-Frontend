import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { User } from 'src/app/shared/models/user.model';
import { AdminService, LocalStorageService } from 'src/app/shared/services';
import { DataService } from 'src/app/shared/services/data.service';
import { ViewResultComponent } from '../components/view-result/view-result.component';
import { IQuestionnaire, IQuestionnaireResponse } from '../model/Questionair.model';

@Component({
  selector: 'app-questionnaire-list',
  templateUrl: './questionnaire-list.component.html',
  styleUrls: ['./questionnaire-list.component.css']
})
export class QuestionnaireListComponent implements OnInit {
  public currentUser: User = new User();
  public questionaires: IQuestionnaire[] = [];
  public questionaireResponses: IQuestionnaireResponse[] = [];

  constructor(private readonly localStorageService: LocalStorageService,
    private readonly adminService: AdminService,
    private readonly router: Router,
    private readonly dataService: DataService,
    private readonly dialogService: DialogService) {
    this.currentUser = this.localStorageService.get('user');
  }

  ngOnInit(): void {
    this.getQuestionnaireList();

    this.getSubmittedQuestionnaire();
  }

  public addNewQuestionnaire(): void {
    this.router.navigate(['/admin/questions']);
  }

  public getQuestionnaireList(): void {
    this.adminService.getQuestions().subscribe((questionaire: IQuestionnaire[]) => {
      if (questionaire.length > 0) {
        this.questionaires = questionaire;
      }
    })
  }


  public editQeustionnaire(questionnaire: IQuestionnaire): void {
    this.router.navigate(['/admin/questions', { id: questionnaire._id }]);
  }

  public deleteQuestionnaire(questionnaire: IQuestionnaire): void {
    this.adminService.deleteQuestion(questionnaire._id).subscribe((res) => {
      if (res) {
        this.getQuestionnaireList();
      }
    });
  }

  public getSubmittedQuestionnaire(): void {
    this.adminService.getSubmittedResponse().subscribe((res: any) => {
      this.questionaireResponses = res;
    }, (err) => {
      console.log(err);
    });
  }

  public viewSubmission(questionaireResponse:any): void {
    this.dialogService.open(ViewResultComponent, {
      data: questionaireResponse
    });
  }

}
