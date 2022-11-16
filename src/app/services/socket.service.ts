import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  

  // currentDocument = this.socket.fromEvent<Document>('document');
  // documents = this.socket.fromEvent<string[]>('documents');

  constructor(private socket: Socket) { }

  // getDocument(id: string) {
  //   this.socket.emit('getDoc', id);
  // }

  // newDocument() {
  //   this.socket.emit('addDoc', { id: '', doc: '' });
  // }

  // editDocument(document: Document) {
  //   this.socket.emit('editDoc', document);
  // }



  // sendMessage(msg: string) {
  //   this.socket.emit('message', msg);
  // }
  // getMessage() {
  //   return this.socket.fromEvent('message').pipe(map((data: any) => data.msg));
  // }

  enviarMensaje = () => {

    // try {

      const mensaje = 'hola mundo';
      const payload = {
          mensaje,
          id: '123ABC',
          fecha: new Date().getTime()
      };
      
      this.socket.emit('mensaje', payload, ( id ) => {
          console.log('Desde el server', id );
      });      
      
    // } catch (error) {
    //   console.log('error', error);
    //   throw new Error(error);    
    // }

  };

  recibirMensaje = () => {

    // try {

      // return this.socket.fromEvent('message').pipe(map((data: any) => data));
      return this.socket.fromEvent('mensaje');
    //   .toPromise()
    //   .then((result: any) => {
    //     console.log('result', result);
    //     return result;
    //   });
      
    // } catch (error) {
    //   console.log('error', error);
    //   throw new Error(error);      
    // }

  };

}
