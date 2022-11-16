import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: Storage,
  ) { }

  public init = async() => {
    await this.storage.create();
  }

  public set = async(key: string, value: any) => {
    await this.storage?.set(key, value);
  }

  public get = async(key: string) => {
    return await this.storage?.get(key);
  }

  public remove = async(key: string) => {
    return await this.storage?.remove(key);
  }

  public clear = async() => {
    return await this.storage?.clear();
  }
  
}
