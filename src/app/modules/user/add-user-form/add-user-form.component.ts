import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { User } from 'src/app/shared/models/user.model';
import { AdminService } from 'src/app/shared/services';
import { IQuestionnaire, Questionnaire } from '../../admin/model/Questionair.model';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.css']
})
export class AddUserFormComponent implements OnInit {
  user: User;
  loading: boolean;
  submitted: boolean;
  questionnaireList!: IQuestionnaire[];
  isEditMode: boolean = false;

  constructor(private adminService: AdminService, private ref: DynamicDialogRef,
    public config: DynamicDialogConfig, private toastr: ToastrService) {
    this.user = new User();
    this.submitted = false;
    this.loading = false;

    if (config?.data?.selectedUser) {
      this.user = config.data.selectedUser;
      this.user.questions = config.data.selectedUser?.questions?._id
      this.isEditMode = true;
    }
    else {
      this.user = new User();
    }
  }

  ngOnInit(): void {
    this.loadQuestionnaireDropdown()
  }

  /**
   * load questionnaire dropdown
   */
  loadQuestionnaireDropdown() {
    this.adminService.getQuestions().subscribe((questions: IQuestionnaire[]) => {
      if (questions) {
        this.questionnaireList = questions;
      }
    },
      error => {
        this.loading = false;
        this.toastr.error(`${error.status}: Error in loading dropdown`, 'Error');
      })
  }


  /**
* Save or update user details 
*/
  saveUser(form: NgForm) {
    this.submitted = true;
    // stop here if form is invalid
    if (form.invalid) {
      return;
    }
    console.log('this.user: ', this.user);
    this.loading = true;
    if (this.user._id) {
      this.adminService.updateUser(this.user._id, this.user).subscribe((user: User) => {
        
        this.loading = false;
        this.toastr.success('User updated successfully', 'Success');
        this.ref.close(user);
      });
    }
    else {
      const {_id, ...user} = this.user;
      this.adminService.addUser(user).subscribe(data => {
        if (data) {
          this.loading = false;
          this.toastr.success('User added successfully', 'Success');
          this.ref.close();
        }
      },
      );
    }

  }


}
