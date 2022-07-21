import { environment } from 'src/environments/environment';

/**
 * For API Requests
 */
export class ApiUrl {
  // Base URLs
  static backendUri = `${environment.apiUrl}`;
  // Base API URLs
  static apiBaseUrl = `${ApiUrl.backendUri}/api`;

  static questionairre = 'questionairre';
}
