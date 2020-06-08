import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniAppAccueilComponent } from './mini-app-accueil.component';

describe('MiniAppAccueilComponent', () => {
  let component: MiniAppAccueilComponent;
  let fixture: ComponentFixture<MiniAppAccueilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniAppAccueilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniAppAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
