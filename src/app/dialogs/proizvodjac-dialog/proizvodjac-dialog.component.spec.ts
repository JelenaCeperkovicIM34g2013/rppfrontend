import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProizvodjacDialogComponent } from './proizvodjac-dialog.component';

describe('ProizvodjacDialogComponent', () => {
  let component: ProizvodjacDialogComponent;
  let fixture: ComponentFixture<ProizvodjacDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProizvodjacDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProizvodjacDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
