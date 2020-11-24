import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsedProductsComponent } from './add-used-products.component';

describe('AddUsedProductsComponent', () => {
  let component: AddUsedProductsComponent;
  let fixture: ComponentFixture<AddUsedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUsedProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUsedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
