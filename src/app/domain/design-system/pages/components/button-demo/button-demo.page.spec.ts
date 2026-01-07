import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ButtonDemoPage } from "./button-demo.page";

describe("ButtonDemoPage", () => {
  let component: ButtonDemoPage;
  let fixture: ComponentFixture<ButtonDemoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonDemoPage]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonDemoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
