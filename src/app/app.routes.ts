import { Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ChatComponent } from './components/chat/chat.component';

export const routes: Routes = [
    {
        path: '',
        component: HomepageComponent
    },
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'chats',
        component: ChatComponent
    }
];