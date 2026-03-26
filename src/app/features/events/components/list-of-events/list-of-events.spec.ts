import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfEvents } from './list-of-events';

describe('ListOfEvents', () => {
  let component: ListOfEvents;
  let fixture: ComponentFixture<ListOfEvents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfEvents],
    }).compileComponents();

    fixture = TestBed.createComponent(ListOfEvents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
