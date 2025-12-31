import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SemanticColorsGridComponent } from "./semantic-colors-grid.component";

describe("SemanticColorsGrid", () => {
  let component: SemanticColorsGridComponent;
  let fixture: ComponentFixture<SemanticColorsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SemanticColorsGridComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SemanticColorsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
