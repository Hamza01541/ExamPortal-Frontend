import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { User } from 'src/app/shared/models/user.model';
import { AdminService } from 'src/app/shared/services';
import { AddUserFormComponent } from '../add-user-form/add-user-form.component';

@Component({
  selector: 'app-user-tab',
  templateUrl: './user-tab.component.html',
  styleUrls: ['./user-tab.component.css']
})
export class UserTabComponent implements OnInit {
  user!: User;
  loading!: boolean;
  submitted!: boolean;
  users: any = [];

  constructor(private adminService: AdminService, private dialogService: DialogService,) {
    // this.user = new User();
    // this.submitted = false;
    // this.loading = false;
  }
  ngOnInit(): void {
    this.getUsersList();
  }

  /**
  * send api call to get Users List.
  */

  getUsersList() {
    this.adminService.getUsers().subscribe((users: any[]) => {
      if (users && users.length) {
        this.users = users
      }
    })
  }

  /**
   * opens add user form dialog
   */
  addUser() {
    const ref = this.dialogService.open(AddUserFormComponent, {
      header: 'Add User',
      width: '80%',
      height: '150%',
    });

    ref.onClose.subscribe((res) => {
      this.getUsersList();
    });
  }

  editUser(selectedUser: User) {
    const ref = this.dialogService.open(AddUserFormComponent, {
      header: 'Edit User',
      width: '80%',
      height: '150%',
      data: { selectedUser: selectedUser }
    });
    ref.onClose.subscribe((res) => {
      this.getUsersList();
    });
  }

  deleteUser(user: User) {
    this.adminService.deleteUser(user._id).subscribe((res: any) => {
      if (res) {
        this.getUsersList();
      }
    })
  }



}
