import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostsService } from '../../../services/posts.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { Router } from '@angular/router';
import {
  addPost,
  addPostSuccess,
  deletePost,
  deletePostSuccess,
  loadPost,
  loadPostSuccess,
  updatePost,
  updatePostSuccess,
} from './posts.actions';
import { map, mergeMap, switchMap } from 'rxjs';

@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  loadPost = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPost),
      mergeMap((action) => {
        return this.postsService.getPost().pipe(
          map((posts) => {
            return loadPostSuccess({ posts });
          })
        );
      })
    );
  });
  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this.postsService.addPost(action.post).pipe(
          map((data) => {
            const post = { ...action.post, id: data.id };
            return addPostSuccess({ post });
          })
        );
      })
    );
  });

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePost),
      switchMap((action) => {
        return this.postsService.updatePost(action.post).pipe(
          map((data) => {
            const post = { ...action.post, id: data.id };
            return updatePostSuccess({ post: action.post });
          })
        );
      })
    );
  });

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePost),
      switchMap((action) => {
        return this.postsService.deletePost(action.id).pipe(
          map((data) => {
            return deletePostSuccess({ id: action.id });
          })
        );
      })
    );
  });
}
