import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private searchTermSource = new BehaviorSubject<string>('');
  private sortOrderSource = new BehaviorSubject<string>('newToOld');
  private itemsPerPageSource = new BehaviorSubject<number>(8);
  private loginModalVisibleSource = new BehaviorSubject<boolean>(false);

  searchTerm$ = this.searchTermSource.asObservable();
  sortOrder$ = this.sortOrderSource.asObservable();
  itemsPerPage$ = this.itemsPerPageSource.asObservable();
  loginModalVisible$ = this.loginModalVisibleSource.asObservable();

  setSearchTerm(term: string): void {
    this.searchTermSource.next(term);
  }

  setSortOrder(order: string): void {
    this.sortOrderSource.next(order);
  }

  setItemsPerPage(count: number): void {
    this.itemsPerPageSource.next(count);
  }

  toggleLoginModal(): void {
    this.loginModalVisibleSource.next(!this.loginModalVisibleSource.value);
  }

  setLoginModalVisibility(isVisible: boolean): void {
    this. loginModalVisibleSource.next(isVisible);
  }
  
}
