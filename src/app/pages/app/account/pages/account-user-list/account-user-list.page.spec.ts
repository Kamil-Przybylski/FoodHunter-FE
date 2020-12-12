import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountUserListPage } from './account-user-list.page';

describe('AccountUserListPage', () => {
  let component: AccountUserListPage;
  let fixture: ComponentFixture<AccountUserListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountUserListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountUserListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
