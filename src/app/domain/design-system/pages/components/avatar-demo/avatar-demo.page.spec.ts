import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AvatarDemoPage } from "./avatar-demo.page";

describe("AvatarDemoPage", () => {
  let component: AvatarDemoPage;
  let fixture: ComponentFixture<AvatarDemoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarDemoPage]
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarDemoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
