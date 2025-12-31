import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DefaultColorsGridComponent } from "./default-colors-grid.component";

describe("DefaultColorsGridComponents", () => {
  let component: DefaultColorsGridComponent;
  let fixture: ComponentFixture<DefaultColorsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultColorsGridComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DefaultColorsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
