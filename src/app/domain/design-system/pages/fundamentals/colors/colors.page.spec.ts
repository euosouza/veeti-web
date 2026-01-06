import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ColorsPage } from "./colors.page";

describe("Colors", () => {
  let component: ColorsPage;
  let fixture: ComponentFixture<ColorsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorsPage]
    }).compileComponents();

    fixture = TestBed.createComponent(ColorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
