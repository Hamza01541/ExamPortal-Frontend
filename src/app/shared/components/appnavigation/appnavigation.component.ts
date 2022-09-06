import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services';

@Component({
  selector: 'app-appnavigation',
  templateUrl: './appnavigation.component.html',
  styleUrls: ['./appnavigation.component.css']
})
export class AppnavigationComponent implements OnInit {

  constructor(private readonly localStorageService: LocalStorageService,
              private readonly router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.localStorageService.clear();
    this.router.navigate(['/login']);
  }
}
