import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getCounter } from '../../store/counter.selectors';
import { CounterState } from '../../store/counter.state';
import { AppState } from '../../../../store/app.state';

@Component({
    selector: 'app-counter-output',
    templateUrl: './counter-output.component.html',
    styleUrls: ['./counter-output.component.css']
})
export class CounterOutputComponent implements OnInit {

    counter:number = 0;
    counter$ : Observable<number>;
    constructor(private store: Store<AppState>) {
    }

    ngOnInit(): void {
        /*this.store.select(getCounter).subscribe(counter =>{
            this.counter = counter
        })*/
        this.counter$ = this.store.select(getCounter)
    }
}
