import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { LoginCardComponent } from './login-card.component';
import { AppState } from '@core/store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { AuthFormSingInFields, AuthFormSingInModel } from '@core/models/auth.models';
import { authSingInAction } from '@core/store/core/auth/auth.actions';

@Component({ selector: 'app-login-form', template: '' })
class MockLoginFormComponent {
  @Output() public singIn = new EventEmitter<AuthFormSingInModel>();
  submitForm() {
    this.singIn.emit({
      [AuthFormSingInFields.EMAIL]: 'testEmail',
      [AuthFormSingInFields.PASSWORD]: 'testPassword',
    });
  }
}

@Component({ selector: 'app-loading-button', template: '' })
class MockLoadingButtonComponent {
  @Input() isLoading!: boolean;
}

describe('LoginCardComponent', () => {
  let component: LoginCardComponent;
  let fixture: ComponentFixture<LoginCardComponent>;

  let store: MockStore<AppState>;
  const initialState = { core: { auth: { isLogging: false } } } as AppState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginCardComponent, MockLoginFormComponent, MockLoadingButtonComponent],
      imports: [NoopAnimationsModule, RouterTestingModule, MatButtonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCardComponent);
    TestBed.createComponent(MockLoginFormComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.isLogging$).toBeTruthy();
  });

  it('should submit form', async () => {
    spyOn(component, 'singIn').and.callThrough();
    spyOn(store, 'dispatch');
    fixture.detectChanges();

    const expectedResult = {
      [AuthFormSingInFields.EMAIL]: 'testEmail',
      [AuthFormSingInFields.PASSWORD]: 'testPassword',
    };

    const buttonDebugElem = fixture.debugElement.query(By.css('[name=login]'));
    await fixture.whenStable();
    buttonDebugElem.nativeElement.click();

    expect(buttonDebugElem).toBeTruthy();
    expect(component.singIn).toHaveBeenCalledWith(expectedResult);
    expect(store.dispatch).toHaveBeenCalledWith(
      authSingInAction({
        payload: { formModel: expectedResult },
      })
    );
  });
});
