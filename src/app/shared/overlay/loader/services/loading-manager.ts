import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingManager {
  private _instanceKeys: WritableSignal<string[]> = signal([]);

  isLoading(key: string): boolean {
    if (!key) return false;
    return this._instanceKeys().some((k) => k === key);
  }

  showSpinner(key: string): void {
    if (this.isLoading(key)) return;
    this._instanceKeys.update((keys) => [...keys, key]);
  }

  hideSpinner(key: string): void {
    this._instanceKeys.update((keys) => keys.filter((k) => k != key));
  }

  hideAllSpinners(): void {
    this._instanceKeys.set([]);
  }
}
