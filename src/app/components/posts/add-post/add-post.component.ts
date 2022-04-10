import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../../models/posts.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { addPost } from '../state/posts.actions';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-post',
    templateUrl: './add-post.component.html',
    styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

    postForm: FormGroup
    constructor(private store: Store<AppState>, private router: Router) { }

    ngOnInit(): void {
        this.postForm = new FormGroup({
            title: new FormControl('', [Validators.required, Validators.minLength(6)]),
            description: new FormControl(null, [Validators.required, Validators.minLength(10)])
        })
    }

    get f() {
        return this.postForm.controls;
    }

    showErrorDescription() {
        const descriptionForm = this.postForm.get('description');
        if (descriptionForm?.touched && descriptionForm.invalid) {
            if (descriptionForm.errors?.['required']) {
                return "Es requerido este campo";
            }

            if (descriptionForm.errors?.['minlength']) {
                return "Mnimo 10 caracteres este campo";
            }
        }
    }

    onAddPost() {
        if(!this.postForm.valid){
            return;
        }
        const post: Post = {
            title: this.postForm.value.title,
            description: this.postForm.value.description,
        }

        this.store.dispatch(addPost({post}))
        this.router.navigate(['posts'])
    }

}
