import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountFollowersComponent } from './account-followers.component';

describe('AccountFollowersComponent', () => {
  let component: AccountFollowersComponent;
  let fixture: ComponentFixture<AccountFollowersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountFollowersComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountFollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
