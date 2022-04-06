import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlertComponent } from '../components/alert/alert.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { DropdownDirective } from '../directives/dropdown.directive';

@NgModule({
    declarations: [ AlertComponent, LoaderComponent,DropdownDirective],   
    imports:[CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
    exports: [ AlertComponent, LoaderComponent,DropdownDirective,FormsModule,ReactiveFormsModule,CommonModule,RouterModule]
}) 
export class ParentModule{}