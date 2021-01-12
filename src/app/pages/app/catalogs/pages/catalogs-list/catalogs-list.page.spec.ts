import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CatalogsListPage } from './catalogs-list.page';

describe('CatalogsListPage', () => {
  let component: CatalogsListPage;
  let fixture: ComponentFixture<CatalogsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogsListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
