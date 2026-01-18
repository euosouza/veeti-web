import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TableDemoPage } from "./table-demo.page";

describe("TableDemoPage", () => {
  let component: TableDemoPage;
  let fixture: ComponentFixture<TableDemoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableDemoPage]
    }).compileComponents();

    fixture = TestBed.createComponent(TableDemoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
