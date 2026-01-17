import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DividerDemoPage } from "./divider-demo.page";

describe("DividerDemoPage", () => {
  let component: DividerDemoPage;
  let fixture: ComponentFixture<DividerDemoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DividerDemoPage]
    }).compileComponents();

    fixture = TestBed.createComponent(DividerDemoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
