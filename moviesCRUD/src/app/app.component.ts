import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'; 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'moviesCRUD';
  query: string = '';
  
  public ngOnInit(){
    
    $(window).resize(function(){
      var tam = $(window).width();
    
      if (tam <= 990){
        $('#idContainerPrincipal').addClass('mw-100','pl-0','pr-0','mx-0');
        $('#containerCard').addClass('mw-100','pl-0','pr-0','mx-0');
      }
      else{
        $('#idContainerPrincipal').removeClass('mw-100','pl-0','pr-0','mx-0');
        $('#containerCard').removeClass('mw-100','pl-0','pr-0','mx-0');
      }
    });
  }
}
