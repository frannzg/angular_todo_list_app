import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneTaskModalComponent } from './done-task-modal.component';

describe('DoneTaskModalComponent', () => {
  let component: DoneTaskModalComponent;
  let fixture: ComponentFixture<DoneTaskModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoneTaskModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoneTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
