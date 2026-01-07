import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SkeletonDemoPage } from "./skeleton-demo.page";

describe("SkeletonDemoPage", () => {
  let component: SkeletonDemoPage;
  let fixture: ComponentFixture<SkeletonDemoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonDemoPage]
    }).compileComponents();

    fixture = TestBed.createComponent(SkeletonDemoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
