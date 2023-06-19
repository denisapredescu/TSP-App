import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule} from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CodeEditorModule } from '@ngstack/code-editor';
import { NgImageSliderModule } from 'ng-image-slider';
import { MatTableModule } from '@angular/material/table';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import {  MatPaginatorModule } from '@angular/material/paginator';



import { LayoutComponent } from './components/layout/layout.component';
import { ImageSliderComponent } from './components/image-slider/image-slider.component';
import { VariationsComponent } from './components/variations/variations.component';
import { ExactAlgorithmsComponent } from './components/exact-algorithms/exact-algorithms.component';
import { ApproximationAlgorithmsComponent } from './components/approximation-algorithms/approximation-algorithms.component';
import { CodeSectionComponent } from './components/code-section/code-section.component';
import { HeuristicAlgorithmsComponent } from './components/heuristic-algorithms/heuristic-algorithms.component';
import { InputClassComponent } from './components/input-class/input-class.component';

//Translation
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LOCATION_INITIALIZED} from '@angular/common';
import { AboutTspComponent } from './components/about-tsp/about-tsp.component';
import { InputOutputSectionComponent } from './components/input-output-section/input-output-section.component';
import { ExampleComponentComponent } from './components/example-component/example-component.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeuristicAlgorithmsComponent,
    VariationsComponent,
    CodeSectionComponent,
    LayoutComponent,
    ImageSliderComponent,
    ExactAlgorithmsComponent,
    ApproximationAlgorithmsComponent,
    InputClassComponent,
    AboutTspComponent,
    InputOutputSectionComponent,
    ExampleComponentComponent
  ],
  exports:[
    MatSidenavModule,                
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    NgbModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule, 
    FormsModule,    
    ReactiveFormsModule,
    CodeEditorModule.forRoot(),
    NgImageSliderModule, 
    MatTableModule,
    NgbPaginationModule, 
    NgbAlertModule,
    MatSelectModule,
    MatTableModule, 
    MatPaginatorModule,
    // Translation
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

export function ApplicationInitializerFactory(translate: TranslateService, injector: Injector) {
  console.log(translate);
  return () => new Promise<any>((resolve: any) => {
    const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
    locationInitialized.then(() => {
      translate.addLangs(['ro', 'en']);
      let selectedLanguage = localStorage.getItem('language');
      if (selectedLanguage) {
        translate.setDefaultLang(selectedLanguage);
      }
      else {
        translate.setDefaultLang('ro');
        selectedLanguage = 'ro';
        localStorage.setItem("language", 'ro');
      }

      translate.use(selectedLanguage).subscribe(() => {
        console.info(`Successfully initialized '${selectedLanguage}' language.'`);
      }, err => {
        console.error(`There was a problem with '${selectedLanguage}' language initialization.'`);
      }, () => {
        resolve(null);
      });
    });
  });
}
