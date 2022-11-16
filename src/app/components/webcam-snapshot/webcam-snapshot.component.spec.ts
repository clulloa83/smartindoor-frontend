import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WebcamSnapshotComponent } from './webcam-snapshot.component';

describe('WebcamSnapshotComponent', () => {
  let component: WebcamSnapshotComponent;
  let fixture: ComponentFixture<WebcamSnapshotComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WebcamSnapshotComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WebcamSnapshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
