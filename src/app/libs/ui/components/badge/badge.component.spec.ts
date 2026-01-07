import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BadgeComponent } from "./badge.component";
import { By } from "@angular/platform-browser";

describe("BadgeComponent", () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("should apply default variant and size classes", () => {
    fixture.detectChanges();
    const badgeElement = fixture.debugElement.query(By.css("span"));
    expect(badgeElement.nativeElement.classList).toContain("bg-primary");
    expect(badgeElement.nativeElement.classList).toContain("text-xs");
  });

  it("should apply specified variant and size classes", () => {
    fixture.componentRef.setInput("variant", "secondary");
    fixture.componentRef.setInput("size", "md");
    fixture.detectChanges();
    const badgeElement = fixture.debugElement.query(By.css("span"));
    expect(badgeElement.nativeElement.classList).toContain("bg-secondary");
    expect(badgeElement.nativeElement.classList).toContain("text-sm");
  });

  it("should not show a close button by default", () => {
    fixture.detectChanges();
    const closeButton = fixture.debugElement.query(By.css("button"));
    expect(closeButton).toBeFalsy();
  });

  it("should show a close button when removable is true", () => {
    fixture.componentRef.setInput("removable", true);
    fixture.detectChanges();
    const closeButton = fixture.debugElement.query(By.css("button"));
    expect(closeButton).toBeTruthy();
  });

  it("should emit remove event on close button click", () => {
    spyOn(component.remove, "emit");
    fixture.componentRef.setInput("removable", true);
    fixture.detectChanges();

    const closeButton = fixture.debugElement.query(By.css("button"));
    closeButton.triggerEventHandler("click", null);

    expect(component.remove.emit).toHaveBeenCalled();
  });
});
