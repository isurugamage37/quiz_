import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { Question } from '../interface/question';
import { Result } from '../interface/result';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  ngOnInit(): void {
  }

  answera: number | undefined;
  @Output() finalResult = new EventEmitter();
  @Output() userNameResult = new EventEmitter();

  public questions: Array<any>;
  public selected = {} as Question;
  public result = {} as Result;

  public index: number = 0;
  public answer: string | undefined;
  public userName: string = '';
  public operations: string = '';

  constructor() {
    this.questions = [];
    this.reset();
  }

  showQuestion(index: number): void {
    this.selected = this.questions[index];
    this.userName = localStorage.getItem('userName')!;
    this.operations = localStorage.getItem('operations')!;
  }

  nextQuestion(number: any): void {
    this.checkAnswer(number);
    this.index++;
    if (this.questions.length > this.index) {
      this.answer = '';
      this.showQuestion(this.index);
    } else {
      this.finishQuiz();
    }
    this.answera = null as any;
  }

  checkAnswer(number: any) {
    let isAnswer = this.questions[this.index].correct_answer;
    if (number == isAnswer) {
      this.result.correct++
    } else {
      this.result.wrong++
    }
  }

  finishQuiz() {
    this.result.total = this.questions.length;
    this.result.correctPercentage = (this.result.correct / this.result.total) * 100;
    this.result.wrongPercentage = (this.result.wrong / this.result.total) * 100;

    this.finalResult.emit(this.result);
    this.userNameResult.emit(this.userName);

  }

  reset(): void {
    this.answer = '';
    this.index = 0;
    this.result = {
      total: 0,
      correct: 0,
      wrong: 0,
      correctPercentage: 0,
      wrongPercentage: 0
    }
  }

}
