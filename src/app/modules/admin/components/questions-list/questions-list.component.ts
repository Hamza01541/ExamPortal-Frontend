import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Questionnaire } from '../../model/Questionair.model';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css'],
})
export class QuestionsListComponent implements OnInit {
  @Input() questionaires: Questionnaire[] = [];
  
  /**
   *  get Questionaires Data from Paresnt
   */
  @Output() editSelectedQuestion: EventEmitter<any> = new EventEmitter();
  @Output() onDeleteSelectedQuestion: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  /**
   * emits selected question to edit.
   * @param question Questionnaire obj.
   */
  editQuestion(question: Questionnaire) {
    this.editSelectedQuestion.emit({ ...question });
  }

  /**
   *
   * @param index
   */
  deleteQuestion(question: any) {
    this.onDeleteSelectedQuestion.emit({ ...question });
  }
}
