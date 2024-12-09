import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatgoryComponent } from './catgory.component';

describe('CatgoryComponent', () => {
  let component: CatgoryComponent;
  let fixture: ComponentFixture<CatgoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatgoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatgoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
