import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestadmindashboardComponent } from './testadmindashboard.component';

describe('TestadmindashboardComponent', () => {
  let component: TestadmindashboardComponent;
  let fixture: ComponentFixture<TestadmindashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestadmindashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestadmindashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
