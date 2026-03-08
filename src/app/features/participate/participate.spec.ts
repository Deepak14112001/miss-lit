import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Participate } from './participate';

describe('Participate', () => {
  let component: Participate;
  let fixture: ComponentFixture<Participate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Participate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Participate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
