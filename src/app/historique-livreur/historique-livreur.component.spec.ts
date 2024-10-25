import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueLivreurComponent } from './historique-livreur.component';

describe('HistoriqueLivreurComponent', () => {
  let component: HistoriqueLivreurComponent;
  let fixture: ComponentFixture<HistoriqueLivreurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriqueLivreurComponent]
    });
    fixture = TestBed.createComponent(HistoriqueLivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
