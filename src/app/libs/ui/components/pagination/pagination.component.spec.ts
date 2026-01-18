import { ComponentFixture, TestBed } from "@angular/core/testing";
import { VPaginationComponent } from "./pagination.component";

describe("VPaginationComponent", () => {
  let component: VPaginationComponent;
  let fixture: ComponentFixture<VPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VPaginationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(VPaginationComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("total", 100);
    fixture.componentRef.setInput("pageSize", 10);
    fixture.componentRef.setInput("currentPage", 1);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
