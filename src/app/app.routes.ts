import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Review Dojo Lessons',
    loadComponent: () => import('./pages/topic-index').then((m) => m.TopicIndex),
  },
  {
    path: ':topic',
    redirectTo: ({ params }) => `/${params['topic']}/intro`,
    pathMatch: 'full',
  },
  {
    path: ':topic/:page',
    loadComponent: () => import('./pages/chapter-page').then((m) => m.ChapterPage),
  },
];
