import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TemperaturaEnlineaPage } from './temperatura-enlinea.page';

describe('TemperaturaEnlineaPage', () => {
  let component: TemperaturaEnlineaPage;
  let fixture: ComponentFixture<TemperaturaEnlineaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TemperaturaEnlineaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TemperaturaEnlineaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
