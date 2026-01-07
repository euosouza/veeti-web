import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BadgeDemoPage } from "./badge-demo.page";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("BadgeDemoPage", () => {
  let component: BadgeDemoPage;
  let fixture: ComponentFixture<BadgeDemoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeDemoPage, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeDemoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
