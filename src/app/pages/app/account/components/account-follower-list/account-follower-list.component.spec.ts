import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountFollowerListComponent } from './account-follower-list.component';

describe('AccountFollowerListComponent', () => {
  let component: AccountFollowerListComponent;
  let fixture: ComponentFixture<AccountFollowerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountFollowerListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountFollowerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
