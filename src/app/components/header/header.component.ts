import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import { DataStorageService } from '../../services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  isAuthenticated = false;
  subscription:Subscription;
  authAubscription:Subscription;
  constructor(private dataStoreageService:DataStorageService,private authService:AuthService) { }

  ngOnInit(): void {
    this.authAubscription = this.authService.user.subscribe(userData=>{
      this.isAuthenticated = !!userData;
    });
  }
  onSaveData(){
    this.dataStoreageService.storeRecipes();
  }

  onFetchData(){
    this.subscription = this.dataStoreageService.fetchRecipes().subscribe();
  }
  onLogout(){
    this.authService.logout();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.authAubscription.unsubscribe();
  }
}
