import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountFollowerFindDialogComponent } from './account-follower-find-dialog.component';

describe('AccountFollowerFindDialogComponent', () => {
  let component: AccountFollowerFindDialogComponent;
  let fixture: ComponentFixture<AccountFollowerFindDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountFollowerFindDialogComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountFollowerFindDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
