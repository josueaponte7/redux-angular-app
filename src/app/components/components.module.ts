import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterModule } from './counter/counter.module';
import { HomeComponent } from './home/home.component';
import { PostsModule } from './posts/posts.module';

@NgModule({
    declarations: [
    HomeComponent,
  ],
    imports: [
        CommonModule,
        CounterModule,
        PostsModule
    ],
    exports: [
        CounterModule,
        PostsModule
    ]
})
export class ComponentsModule { }
