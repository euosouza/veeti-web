import { ComponentFixture, TestBed } from "@angular/core/testing";

import { IconsPage } from "./icons.page";

describe("Icons", () => {
  let component: IconsPage;
  let fixture: ComponentFixture<IconsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconsPage]
    }).compileComponents();

    fixture = TestBed.createComponent(IconsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
