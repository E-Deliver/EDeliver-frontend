import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueClientComponent } from './historique-client.component';

describe('HistoriqueClientComponent', () => {
  let component: HistoriqueClientComponent;
  let fixture: ComponentFixture<HistoriqueClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriqueClientComponent]
    });
    fixture = TestBed.createComponent(HistoriqueClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
