import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { Observable } from 'rxjs';
import { Post } from '../../../models/posts.model';
import { getPosts } from '../state/posts.selector';
import { deletePost } from '../state/posts.actions';

@Component({
    selector: 'app-posts-list',
    templateUrl: './posts-list.component.html',
    styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

    posts: Observable<Post[]>;
    constructor(private store: Store<AppState>) { }

    ngOnInit(): void {
        this.posts = this.store.select(getPosts);
    }

    onDeletePost(id: string){
        if(confirm('¿Estas seguro que de sea eliminar el registro?')){
            this.store.dispatch(deletePost({ id }));
        }
    }
}
