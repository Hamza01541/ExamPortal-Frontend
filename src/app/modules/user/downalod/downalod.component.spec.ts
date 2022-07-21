import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownalodComponent } from './downalod.component';

describe('DownalodComponent', () => {
  let component: DownalodComponent;
  let fixture: ComponentFixture<DownalodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownalodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownalodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
