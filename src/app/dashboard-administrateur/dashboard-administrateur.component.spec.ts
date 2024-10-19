import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAdministrateurComponent } from './dashboard-administrateur.component';

describe('DashboardAdministrateurComponent', () => {
  let component: DashboardAdministrateurComponent;
  let fixture: ComponentFixture<DashboardAdministrateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardAdministrateurComponent]
    });
    fixture = TestBed.createComponent(DashboardAdministrateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
