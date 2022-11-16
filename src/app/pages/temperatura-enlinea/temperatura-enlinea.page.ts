import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { Observable, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';


@Component({
  selector: 'app-temperatura-enlinea',
  templateUrl: './temperatura-enlinea.page.html',
  styleUrls: ['./temperatura-enlinea.page.scss'],
})
export class TemperaturaEnlineaPage implements OnInit, OnDestroy {
 
  // document: Document;
  private _docSub: Subscription;


  resultado: any;

  constructor(
    private socketService: SocketService,
  ) { 

    // this.socketService.enviarMensaje();
    // this.socketService.recibirMensaje().then((res: any) => {
    //   console.log('res', res);
    // })
  }

  ngOnInit() {

    this.socketService.enviarMensaje();
    this._docSub = this.socketService.recibirMensaje()
    .subscribe((res: any) => {
      console.log('res', res);
      this.resultado = res;
      console.log('this.resultado', this.resultado);
    })
    // this.socketService.recibirMensaje().then((res: any) => {
    //   console.log('res', res);
    //   this.resultado = res;
    // })


    // this._docSub = this.documentService.currentDocument.pipe(
    //   startWith({ id: '', doc: 'Select an existing document or create a new one to get started' })
    // ).subscribe(document => this.document = document);

  };

  ngOnDestroy() {
    this._docSub.unsubscribe();

  };

  // loadDoc(id: string) {
  //   // this.documentService.getDocument(id);
  // }

  // newDoc() {
  //   // this.documentService.newDocument();
  // }


}
