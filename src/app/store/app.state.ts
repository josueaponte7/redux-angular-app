import { CounterState } from "../components/counter/store/counter.state";
import { PostsState } from '../components/posts/state/posts.state';
import { counterReducer } from '../components/counter/store/counter.reducer';
import { postsReducer } from "../components/posts/state/posts.reducer";



export interface AppState {
    counter: CounterState;
    posts: PostsState;
}

export const appReducer = {
    counter: counterReducer,
    posts: postsReducer
}