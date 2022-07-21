
export class Questionnaire {
  questionId?: string;
  _id?: string
  title: string = '';
  questionOption: QuestionOptions[] = [
    { label: 'A', value: '', require: true, isExist: false },
    { label: 'B', value: '', require: true, isExist: false },
    { label: 'C', value: '', require: false, isExist: false },
    { label: 'D', value: '', require: false, isExist: false },
  ];
  answer: string = '';
  marks: number = 0;
  selectedAnswer?: string = '';
  isCorrect?: boolean = false;
};

export class QuestionOptions {
  label: string = '';
  value: any = '';
  require: boolean = true;
  isExist: boolean = true;
}

export class QuestionButton {
    isValidAnwer: boolean = false;
    isNotValidQuestion: boolean = true;
}

/**
 * DropDown List Catagory name
 */
 export interface questioCatagory {
  name: string;
  code: string;
}