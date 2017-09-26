import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingChildrenComponent } from './routing-children.component';

describe('RoutingChildrenComponent', () => {
  let component: RoutingChildrenComponent;
  let fixture: ComponentFixture<RoutingChildrenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutingChildrenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutingChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
