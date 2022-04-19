import { createReducer, on } from '@ngrx/store';

import {
  addPostSuccess,
  deletePostSuccess,
  loadPostSuccess,
  updatePostSuccess,
} from './posts.actions';
import { initialState } from './posts.state';

const _postsReducer = createReducer(
  initialState,
  on(addPostSuccess, (state, action) => {
    let post = { ...action.post };
    return {
      ...state,
      posts: [...state.posts, post],
    };
  }),
  on(updatePostSuccess, (state, action) => {
    const updatedPost = state.posts.map((post) => {
      return action.post.id === post.id ? action.post : post;
    });
    return {
      ...state,
      posts: updatedPost,
    };
  }),
  on(deletePostSuccess, (state, { id }) => {
    const updatedPost = state.posts.filter((post) => {
      return post.id !== id;
    });
    return {
      ...state,
      posts: updatedPost,
    };
  }),
  on(loadPostSuccess, (state, action) => {
    return {
      ...state,
      posts: action.posts,
    };
  })
);

export function postsReducer(state: any, action: any) {
  return _postsReducer(state, action);
}
