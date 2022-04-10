import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { customIncrement, changeFirstName } from '../store/counter.actions';
import { CounterState } from '../store/counter.state';
import { getFisrtName } from '../store/counter.selectors';
import { Observable } from 'rxjs';
import { AppState } from '../../../store/app.state';

@Component({
    selector: 'app-custom-counter-input',
    templateUrl: './custom-counter-input.component.html',
    styleUrls: ['./custom-counter-input.component.css']
})
export class CustomCounterInputComponent implements OnInit {
    value: number = 0;
    firstName:string = '';
    firstName$: Observable<string>;
    changeFirstName:string = '';
    constructor(private store: Store<AppState>) { }

    ngOnInit(): void {
        /*this.store.select(getFisrtName).subscribe(firstName => {
            this.firstName = firstName
        })*/
        this.firstName$ = this.store.select(getFisrtName);
    }

    onAdd(){
        let count = Number(this.value)
        this.store.dispatch(customIncrement({count: count}))
    }

    onChangeFirstName(){
        let firstName = this.changeFirstName
        this.store.dispatch(changeFirstName({firstName : firstName}))
    }
}
