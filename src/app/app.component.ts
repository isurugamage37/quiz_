import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { QuizService } from './services/quiz.service';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  public questionsLimit : number;
  public difficulty : string;
  public operations : string;
  public operation : string | undefined;
  public operationName : string = '';
  public number1 : number| undefined;
  public number2 : number| undefined;
  public userName : string='';

  public showMainMenu : boolean;
  public showQuizScreen : boolean| undefined;
  public showResultScreen : boolean| undefined;
  public nubersArray : Array<any>;

  public spinner : boolean| undefined;

  @ViewChild('quiz',{static:true}) quiz! : QuizComponent;
  @ViewChild('result',{static:true}) result! : ResultComponent;

  constructor(){
    this.questionsLimit = 10;
    this.difficulty = "Easy";
    this.operations = '+';
    this.showMainMenu = true;
    this.nubersArray = [];
    localStorage.clear();
  }
  ngOnInit(): void {
  }

  getAnswer(randomNumber1 : any , randomNumber2 : any){
    switch (this.operations){
      case '+':
        this.operationName = "Addition";
      return randomNumber1 + randomNumber2; 
      case '-': 
      this.operationName = "Subtraction";
      return randomNumber1 - randomNumber2; 
      case '*': 
      this.operationName = "Multiplication";
      return randomNumber1 * randomNumber2; 
      case '/': 
      this.operationName = "Division";
      return randomNumber1 / randomNumber2; 
    }

  }
  getElementValue(){
    localStorage.setItem('userName', this.userName);
  }
  getDifficulty() : any{

    switch (this.difficulty){
      case "Easy":
        this.number1  = Math.floor(Math.random() * 10) + 1;
      return this.number1 
      case "Medium": 
        this.number1  = Math.floor(Math.random() * 25) + 1;
      return this.number1  
      case "Hard": 
        this.number1  = Math.floor(Math.random() * 50) + 1;
      return this.number1  
    }

  }

  quizQuestions(): void{
    this.getElementValue();
    for (let i = 0; i < this.questionsLimit; i++) {
      let randomNumber1: number = this.getDifficulty();
      let randomNumber2: number = this.getDifficulty();
      
      let keyValueObject = {
        "ex": `key${i}`,
        "id": i,
        "question" : randomNumber1 + " " + this.operations + " "+ randomNumber2,
        "description": null,
        "correct_answer": this.getAnswer(randomNumber1,randomNumber2)

      };
      this.quiz.questions.push(keyValueObject); // Adding elements to the array
    }
    localStorage.setItem('operations', this.operationName);
      this.quiz.reset();
      this.quiz.showQuestion(0);
      this.showMainMenu = false;
      this.showQuizScreen = true;
      this.toggleSpinner();
  }

  finalResult(result:any):void{
    this.result.finalResult = result;
    this.showQuizScreen = false;
    this.showResultScreen = true;
    this.quiz.questions = [];
  }

  showMainMenuScreen(event:any):void{
    this.showResultScreen = false;
    this.showMainMenu = true;
  }

  toggleSpinner(){
    this.spinner = !this.spinner;
  }

  increase() {
    this.questionsLimit++;
  }

  decrease() {
    if (this.questionsLimit > 0) {
      this.questionsLimit--;
    }
  }

}
