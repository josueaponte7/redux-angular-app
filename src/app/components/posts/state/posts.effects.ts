import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostsService } from '../../../services/posts.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { Router } from '@angular/router';
import { loadPost, loadPostSuccess } from './posts.actions';
import { map, mergeMap } from 'rxjs';

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
}
