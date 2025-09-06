import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprietarioslistComponent } from './proprietarioslist.component';

describe('ProprietarioslistComponent', () => {
  let component: ProprietarioslistComponent;
  let fixture: ComponentFixture<ProprietarioslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProprietarioslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProprietarioslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
