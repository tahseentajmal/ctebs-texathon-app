import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PookalamComponent } from './pookalam.component';

describe('PookalamComponent', () => {
  let component: PookalamComponent;
  let fixture: ComponentFixture<PookalamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PookalamComponent]
    });
    fixture = TestBed.createComponent(PookalamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
