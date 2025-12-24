import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component'
import {CountriesComponent} from './components/countries/countries.component'
import {SearchComponent} from './components/search/search.component'
import {CountryComponent} from './components/country/country.component'
export const routes: Routes = [
    {   path:'',
        component: HomeComponent,
        title:"Home"
    },

    {   path:'countries/:id',
        component: CountriesComponent,
        title:"Countries"
    },
    {   path:'countries/country/:id',
        component: CountryComponent,
        title:"Country"
    },
    {   path:'search/:name',
        component: SearchComponent,
        title:"Country"
    },

];
