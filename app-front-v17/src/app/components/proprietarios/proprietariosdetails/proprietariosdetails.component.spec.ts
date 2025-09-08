import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprietariosdetailsComponent } from './proprietariosdetails.component';

describe('ProprietariosdetailsComponent', () => {
  let component: ProprietariosdetailsComponent;
  let fixture: ComponentFixture<ProprietariosdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProprietariosdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProprietariosdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
