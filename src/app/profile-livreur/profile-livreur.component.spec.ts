import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLivreurComponent } from './profile-livreur.component';

describe('ProfileLivreurComponent', () => {
  let component: ProfileLivreurComponent;
  let fixture: ComponentFixture<ProfileLivreurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileLivreurComponent]
    });
    fixture = TestBed.createComponent(ProfileLivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
