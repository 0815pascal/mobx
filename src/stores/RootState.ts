// RootState.ts
import { LoadingStore } from './LoadingStore';

export class RootState {
    loadingStore: LoadingStore;

    constructor() {
        this.loadingStore = new LoadingStore();
    }
}

export const rootState = new RootState();
