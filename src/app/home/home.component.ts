import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription, interval } from "rxjs";
import { Observable } from 'rxjs-compat';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstOBsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstOBsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });

    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if(count === 5){
          observer.complete();
        }
        if(count>3){
          observer.error(new Error('Count is greater 3!'))
        }
        count++;
      },1000);
    });

    this.firstOBsSubscription = customIntervalObservable.subscribe(data => {
      console.log(data);
    }, error =>{
      console.log(error);
      alert(error.message);
    }, () => {
      console.log('Completed!');
      alert('Completed!');
    });
  }

  ngOnDestroy(): void {
    this.firstOBsSubscription.unsubscribe();
  }

}
