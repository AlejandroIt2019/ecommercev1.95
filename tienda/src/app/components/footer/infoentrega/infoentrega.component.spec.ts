import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoentregaComponent } from './infoentrega.component';

describe('InfoentregaComponent', () => {
  let component: InfoentregaComponent;
  let fixture: ComponentFixture<InfoentregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoentregaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoentregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
