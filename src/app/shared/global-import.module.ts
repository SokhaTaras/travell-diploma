import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AgmCoreModule} from '@agm/core';
// import {TranslateHttpLoader} from '@ngx-translate/http-loader';
// import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {environment} from '../../environments/environment';
import {MaterialModule} from './material.module';
import {NgxMaskModule} from 'ngx-mask';
import {AgmOverlays} from 'agm-overlays';
import {AgmDirectionModule} from 'agm-direction';
import {NgxChartsModule} from "@swimlane/ngx-charts";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxChartsModule,
    AgmDirectionModule,
    AgmOverlays,
    NgxMaskModule.forRoot(),
  ],
  declarations: [],
  exports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule,
    MaterialModule,
    NgxMaskModule,
    AgmDirectionModule,
    AgmOverlays,
    NgxChartsModule,
  ]
})
export class GlobalImportModule {

}

export function HttpLoaderFactory(http: HttpClient) {
  // return new TranslateHttpLoader(http, environment.clientUrl + '/assets/content/', '.json');
}
