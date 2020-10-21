import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountFollowerFindComponent } from './account-follower-find.component';

describe('AccountFollowerFindComponent', () => {
  let component: AccountFollowerFindComponent;
  let fixture: ComponentFixture<AccountFollowerFindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountFollowerFindComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountFollowerFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
