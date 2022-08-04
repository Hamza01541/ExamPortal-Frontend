import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { ApiUrl } from '../resource-reference';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private requestService: RequestService) {}

/**
 * logged
 * @param user 
 * @returns 
 */
  login(user:User){
    return this.requestService.addData(`${ApiUrl.apiBaseUrl}/${ApiUrl.login}/`, user);   
  }


}
