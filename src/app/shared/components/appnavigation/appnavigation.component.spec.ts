import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppnavigationComponent } from './appnavigation.component';

describe('AppnavigationComponent', () => {
  let component: AppnavigationComponent;
  let fixture: ComponentFixture<AppnavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppnavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppnavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
