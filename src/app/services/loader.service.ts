import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(
    private loadingController: LoadingController,
  ) { }

  simpleLoader = async(message: string) => {

    // const loading = await this.loadingController.create();
    // await loading.present();

    try {

      await this.loadingController.create({ message: message })
      .then(loading => {
        loading.present();
      });
      
    } catch (error) {
      console.log('error simpleLoader', error);
      throw new Error(error);
    }

  };

  dismissLoader = async() => {

    try {
    
      // await loading.dismiss();
      await this.loadingController.dismiss()
      .then(response => {
        // console.log('Loader closed!', response);
      });      
      
    } catch (error) {
      console.log('error dismissLoader', error);
      throw new Error(error);
    }
    
  };

}
