import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {
  }

  /**
   * Gets data.
   * @param string url API url
   * @param any obj
   * @returns Observable<any>
   */
  getData(url: string, obj?: any): Observable<any> {
    return this.http.get(url, obj);
  }

  /**
   * Adds data.
   * @param string url API url
   * @param any obj Data to be added
   * @returns Observable<any>}
   */
  addData(url: string, obj?: any): Observable<any> {
    console.log('called')
    return this.http.post(url, obj);
  }

  /**
   * Updates data.
   * @param string url API url
   * @param any obj Data to be updated
   * @returns Observable<any>
   */
  updateData(url: string, obj: any): Observable<any> {
    return this.http.put(url, obj);
  }

  /**
   * Deletes data.
   * @param string url API url
   * @returns Observable<any>
   */
  deleteData(url: string): Observable<any> {
    return this.http.delete(url);
  }

  /**
   * Patches data.
   * @param string url API url
   * @param any obj Data to be Patched
   * @returns Observable<any>
   */
  patchData(url: string, obj: any): Observable<any> {
    return this.http.patch(url, obj);
  }
}
