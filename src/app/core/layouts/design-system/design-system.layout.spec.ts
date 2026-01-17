import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DesignSystemLayout } from "./design-system.layout";

describe("DesignSystemLayout", () => {
  let component: DesignSystemLayout;
  let fixture: ComponentFixture<DesignSystemLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignSystemLayout]
    }).compileComponents();

    fixture = TestBed.createComponent(DesignSystemLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
