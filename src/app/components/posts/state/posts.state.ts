
import { Post } from '../../../models/posts.model';

export interface PostsState{
    posts: Post[];
}

export const initialState: PostsState = {
    posts: [
        { id: '1', title : 'Titulo de prueba1', description:'Prueba De Descripcion1'},
        { id: '2', title : 'Titulo de prueba2', description:'Prueba De Descripcion2'},
    ]
}