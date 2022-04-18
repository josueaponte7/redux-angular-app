import { createAction, props } from '@ngrx/store';
import { Post } from '../../../models/posts.model';

export const ADD_POST_ACTION = '[post page] add';
export const UPDATE_POST_ACTION = '[post page] update';
export const DELETE_POST_ACTION = '[post page] delete';
export const LOAD_POST = '[post page] load post';
export const LOAD_POST_SUCCESS = '[post page] load post success';
export const addPost = createAction(ADD_POST_ACTION, props<{ post: Post }>());

export const updatePost = createAction(
  UPDATE_POST_ACTION,
  props<{ post: Post }>()
);

export const deletePost = createAction(
  DELETE_POST_ACTION,
  props<{ id: string }>()
);

export const loadPost = createAction(LOAD_POST);
export const loadPostSuccess = createAction(
  LOAD_POST_SUCCESS,
  props<{ posts: Post[] }>()
);
