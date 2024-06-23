import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCourComponent } from './update-cour.component';

describe('UpdateCourComponent', () => {
  let component: UpdateCourComponent;
  let fixture: ComponentFixture<UpdateCourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateCourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
