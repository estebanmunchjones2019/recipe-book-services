import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userSub: Subscription;
  isAuthenticated: boolean = false;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user   //!user ? false : true;
    })
  }

  onSave() {
    this.dataStorageService.storeRecipes();
  }

  onFetch() {
    this.dataStorageService.fetchRecipes().subscribe(); // I subscribe here because I also subscribe in the RecipesResolverService, and the GET request was returned in the DataStorageService
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth']);

  }

  ngOnDestroy() {
    this.userSub.unsubscribe(); 
  }

}
