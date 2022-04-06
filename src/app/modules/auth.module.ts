import { NgModule } from '@angular/core';
import { AuthComponent } from '../components/auth/auth.component';
import { AuthRoute } from '../routes/auth.routes';
import { ParentModule } from './parent.module';


@NgModule({
    declarations: [AuthComponent],
    imports:[ParentModule,AuthRoute]
}) 
export class AuthModule{}