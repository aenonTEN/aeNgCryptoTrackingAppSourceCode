import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
constructor(){}

selectedCurrency: string='USD';
sendCurrency(event: string){
  console.log(event)

}

}
