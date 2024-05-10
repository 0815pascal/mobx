// LoadingStore.ts
import { makeAutoObservable } from "mobx";

export class LoadingStore {
    isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    showLoader(): void {
        console.log('Show loader')
        this.isLoading = true;
    }

    hideLoader(): void {
        console.log('hide loader')
        this.isLoading = false;
    }

    // Simulate a fetch request
    simulateFetch = async () => {
    this.showLoader();
    setTimeout(() => {
      this.hideLoader();
    }, 3000); // Simulates a network delay of 3 seconds
  };
}
