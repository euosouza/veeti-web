import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TypographyPage } from "./typography.page";

describe("Typography", () => {
  let component: TypographyPage;
  let fixture: ComponentFixture<TypographyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypographyPage]
    }).compileComponents();

    fixture = TestBed.createComponent(TypographyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
