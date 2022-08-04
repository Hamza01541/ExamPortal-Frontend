import { Injectable } from '@angular/core';
import { RequestService } from '.';
import { ApiUrl } from '../resource-reference';
import { IQuestionnaire, Questionnaire } from 'src/app/modules/admin/model/Questionair.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private requestService: RequestService) { }

  /**
   * gets all questions from db.
   * @returns
   */
  getQuestions() {
    return this.requestService.getData(`${ApiUrl.apiBaseUrl}/${ApiUrl.questionairre}/`);
  }

  /**
   * adds new question in questions db.
   * @param question array.
   * @returns
   */
  addQuestion(question: IQuestionnaire) {
    return this.requestService.addData(`${ApiUrl.apiBaseUrl}/${ApiUrl.questionairre}/addQuestion`, question);
  }

  /**
   * gets question by Id.
   * @param questionId string.
   * @returns
   */
  getQuestionById(questionId: string) {
    return this.requestService.getData(`${ApiUrl.apiBaseUrl}/${ApiUrl.questionairre}/${questionId}`);
  }

  /**
   * updates question in Questions table.
   * @param question obj.
   * @returns
   */
  updateQuestion(_id: any, question: IQuestionnaire) {
    return this.requestService.updateData(`${ApiUrl.apiBaseUrl}/${ApiUrl.questionairre}/${question._id}`, question);
  }

  /**
   * deletes question by Id from db.
   * @param questionId strig.
   * @returns
   */
  deleteQuestion(questionId: string | any) {
    return this.requestService.deleteData(
      `${ApiUrl.apiBaseUrl}/${ApiUrl.questionairre}/${questionId}`
    );
  }

  /**
  * adds New User .
  * @param user User.
  * @returns
  */
  addUser(user: User) {
    return this.requestService.addData(`${ApiUrl.apiBaseUrl}/${ApiUrl.addUser}/`, user);
  }

  /**
   * gets all users from db.
   * @returns
   *
   * */
  getUsers() {
    return this.requestService.getData(`${ApiUrl.apiBaseUrl}/${ApiUrl.getUsers}/`)
  }

  /**
   * get user by Id
   * @param userId string.
   * @returns 
   */
  getUserById(userId: string | any) {
    return this.requestService.getData(`${ApiUrl.apiBaseUrl}/${ApiUrl.getUsers}/${userId}`)
  }

  /**
   * Update user by Id
   * @param userId string.
   * @param user User
   * @returns 
   */
  updateUser(userId: string, user: User) {
    return this.requestService.updateData(`${ApiUrl.apiBaseUrl}/${ApiUrl.getUsers}/${userId}`, user)
  }


  /**
   * delete user by Id
   */
  deleteUser(userId: string | any) {
    return this.requestService.deleteData(`${ApiUrl.apiBaseUrl}/${ApiUrl.getUsers}/${userId}`)
  }


  submitResponse(response: any) {
    return this.requestService.addData(`${ApiUrl.apiBaseUrl}/${ApiUrl.submitResponse}/submit`, response)
  }

  checkIfSubmitted(user:any) {
    return this.requestService.addData(`${ApiUrl.apiBaseUrl}/${ApiUrl.submitResponse}/`,  user)
  }

  getSubmittedResponse() {
    return this.requestService.getData(`${ApiUrl.apiBaseUrl}/${ApiUrl.submitResponse}/`)
  }

}
