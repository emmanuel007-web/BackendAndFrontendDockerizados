import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegister } from './form-register';

describe('FormRegister', () => {
  let component: FormRegister;
  let fixture: ComponentFixture<FormRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRegister],
    }).compileComponents();

    fixture = TestBed.createComponent(FormRegister);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
