import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountUserInfoPage } from './account-user-info.page';

describe('AccountUserInfoPage', () => {
  let component: AccountUserInfoPage;
  let fixture: ComponentFixture<AccountUserInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountUserInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountUserInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
