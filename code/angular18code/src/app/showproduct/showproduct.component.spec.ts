import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowproductComponent } from './showproduct.component';

describe('ShowproductComponent', () => {
  let component: ShowproductComponent;
  let fixture: ComponentFixture<ShowproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowproductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
