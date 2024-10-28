import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandesLivreurComponent } from './commandes-livreur.component';

describe('CommandesLivreurComponent', () => {
  let component: CommandesLivreurComponent;
  let fixture: ComponentFixture<CommandesLivreurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommandesLivreurComponent]
    });
    fixture = TestBed.createComponent(CommandesLivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
