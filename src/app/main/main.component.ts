import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../shared/models/user.model';
import { LocalStorageService } from '../shared/services';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
uploadedImage: any = null;
currentUser:User = new User();

  constructor(private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.localStorage.get('user')
    
  }


  /**
   * Check for file validation
   * @param event get file uploaded
   */
     checkValidFile(event: any) {
      const file = event.target.files;
      if (!file !== null && file.length !== 0) {
        const r = new FileReader();
        // this.validateImage(file[0]);
        this.uploadedImage = file[0];
        r.onloadend = (e: any) => {
          this.uploadedImage = e.target.result;
        };
        r.readAsDataURL(file[0]);
      }
    }

    
  /**
   * Validate Image
   * @param file file to validate
   */
  validateImage(file: any, imageForm: any) {
    const img = new Image();
    img.src = window.URL.createObjectURL(file);
    img.onload = () => {
      const minSize = Number((file.size / 1024).toFixed(2));
      const maxSize = Number((file.size / 1048576).toFixed(2));
      if (minSize < 1) {
        imageForm.form.controls.newProfileImage.setErrors({minSize: true});
      }
      if (maxSize > 15) {
        imageForm.form.controls.newProfileImage.setErrors({maxSize: true});
      }
      if (img.width < 150) {
        imageForm.form.controls.newProfileImage.setErrors({minWidth: true});
      }
      if (img.width > 5000) {
        imageForm.form.controls.newProfileImage.setErrors({maxWidth: true});
      }
      if (img.height < 150) {
        imageForm.form.controls.newProfileImage.setErrors({minHeight: true});
      }
      if (img.height > 5000) {
        imageForm.form.controls.newProfileImage.setErrors({maxHeight: true});
      }
    };
  }

}
