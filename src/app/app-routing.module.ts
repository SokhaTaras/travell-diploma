import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AdminComponent} from './admin/admin.component';
import {AllToursComponent} from './admin/all-tour-types/all-tours.component';
import {MainPageComponent} from './home/main-page/main-page.component';
import {TourTypesComponent} from './home/tour-types/tour-types.component';
import {TourTypeComponent} from './home/tour-type/tour-type.component';
import {AllCountriesComponent} from './admin/all-countries/all-countries.component';
import {CountriesComponent} from './home/countries/countries.component';
import {CountryComponent} from './home/country/country.component';
import {AllHotelsComponent} from './admin/all-hotels/all-hotels.component';
import {AllToursDataComponent} from './admin/all-tours-data/all-tours-data.component';
import {SignInComponent} from './home/sign-in/sign-in.component';
import {SearchToursComponent} from './home/search-tours/search-tours.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children:
      [
        {path: '', component: MainPageComponent},
        {path: 'tour-types', component: TourTypesComponent},
        {path: 'tour-types/:id', component: TourTypeComponent},
        {path: 'countries', component: CountriesComponent},
        {path: 'countries/:id', component: CountryComponent},
        {path: 'sign-in', component: SignInComponent},
        {path: 'search-tours', component: SearchToursComponent}
      ]
  },
  {
    path: 'admin', component: AdminComponent, children: [
      {path: 'all-tours', component: AllToursComponent},
      {path: 'all-countries', component: AllCountriesComponent},
      {path: 'all-hotels', component: AllHotelsComponent},
      {path: 'all-tours-detailed-data', component: AllToursDataComponent}
    ]
  },
  {path: 'admin', redirectTo: '/admin/all-tours', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
