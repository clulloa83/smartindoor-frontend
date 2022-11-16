import { Component, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-webcam-snapshot',
  templateUrl: './webcam-snapshot.component.html',
  styleUrls: ['./webcam-snapshot.component.scss'],
})
export class WebcamSnapshotComponent implements AfterViewInit {

  @Output() fotosCargar = new EventEmitter<any[]>();

  WIDTH = 640;
  HEIGHT = 480;
  @ViewChild('video') public video: ElementRef;
  @ViewChild('canvas') public canvas: ElementRef;
  captures: any[] = [];
  error: any;
  isCaptured: boolean;

  maximoCapturas = 3;

  @Output() videoParam = new EventEmitter<any>();


  constructor() { }

  async ngAfterViewInit() {
    await this.setupDevices();
  };
  setupDevices = async() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        if (stream) {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
          this.error = null;
        } else {
          this.error = 'No tienes dispositivo de salida de video';
        }
      } catch (e) {
        this.error = e;
      }
    }
  };
  capture = () => {

    this.drawImageToCanvas(this.video.nativeElement);
    
    this.captures.push(this.canvas.nativeElement.toDataURL('image/png'));

    this.isCaptured = true;
    
    this.fotosCargar.emit(this.captures);
    this.videoParam.emit(this.video);
    

  };
  removeCurrent = () => {
    this.isCaptured = false;
  };
  setPhoto = (idx: number) => {
    this.isCaptured = true;
    var image = new Image();
    image.src = this.captures[idx];
    this.drawImageToCanvas(image);
  };
  drawImageToCanvas = (image: any) => {
    this.canvas.nativeElement
      .getContext('2d')
      .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
  };

}
