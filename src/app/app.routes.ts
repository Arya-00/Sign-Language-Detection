import { Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { HomepageComponent } from './components/homepage/homepage.component';

export const routes: Routes = [
    {
        path: '',
        component: HomepageComponent
    },
    {
        path: 'search',
        component: SearchComponent
    }
];