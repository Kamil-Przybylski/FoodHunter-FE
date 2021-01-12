import { Component, Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpErrorResDto } from '@core/models/custom-http.models';
import { AppState } from '@core/store';
import { LoginFormComponent } from './login-form.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { FormErrorUtil } from '@core/utils/form-error.util';

@Component({ selector: 'app-form-errors', template: '' })
class MockAppFormErrprsComponent {
  @Input() error!: HttpErrorResDto | null;
  @Input() isFormSubmitted!: boolean;
  @Input() isFormValid!: boolean;
}

@Directive({ selector: '[appDisableControl]' })
class MockDisableControlDirective {
  @Input() set appDisableControl(c: any) {}
}

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  let store: MockStore<AppState>;
  const initialState = { core: { auth: { isLogging: true, loginErrors: null } } } as AppState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginFormComponent, MockAppFormErrprsComponent, MockDisableControlDirective],
      imports: [NoopAnimationsModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.isLogging$).toBeTruthy();
    expect(component.loginErrors$).toBeTruthy();
  });

  it('should create form', async () => {
    fixture.detectChanges();

    expect(component.form).toBeTruthy();
    expect(component.form.value).toEqual({ email: null, password: null });

    await fixture.whenStable();

    const form = fixture.debugElement.query(By.css('form'));
    const emailInput = fixture.debugElement.query(By.css('[name=email]'));
    const passwordInput = fixture.debugElement.query(By.css('[name=password]'));
    const button = fixture.debugElement.query(By.css('button.d-none'));
    expect(form).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it('should emit correct form', async () => {
    fixture.detectChanges();

    spyOn(component.singIn, 'emit');
    spyOn(FormErrorUtil, 'setAllTouched');
    component.form.setValue({
      [component.formFields.EMAIL]: 'testEmail',
      [component.formFields.PASSWORD]: 'testPassword',
    });
    const button = fixture.debugElement.query(By.css('button.d-none'));

    await fixture.whenStable();
    button.nativeElement.click();

    expect(FormErrorUtil.setAllTouched).not.toHaveBeenCalled();
    expect(component.singIn.emit).toHaveBeenCalledWith({
      [component.formFields.EMAIL]: 'testEmail',
      [component.formFields.PASSWORD]: 'testPassword',
    });
  });

  it('should show 2 errors after submit when form is empty', async () => {
    fixture.detectChanges();

    spyOn(component.singIn, 'emit');
    spyOn(FormErrorUtil, 'setAllTouched');
    const button = fixture.debugElement.query(By.css('button.d-none'));

    await fixture.whenStable();
    button.nativeElement.click();

    expect(component.singIn.emit).not.toHaveBeenCalled();
    expect(FormErrorUtil.setAllTouched).toHaveBeenCalledWith(component.form);

    fixture.detectChanges();
    const matErrors = fixture.debugElement.queryAll(By.css('mat-error'));
    expect(matErrors.length).toEqual(2);
  });

  it('should show 1 errors after submit when email is empty', async () => {
    fixture.detectChanges();

    spyOn(component.singIn, 'emit');
    spyOn(FormErrorUtil, 'setAllTouched');
    component.form.setValue({
      [component.formFields.EMAIL]: '',
      [component.formFields.PASSWORD]: 'testPassword',
    });
    const button = fixture.debugElement.query(By.css('button.d-none'));

    await fixture.whenStable();
    button.nativeElement.click();

    expect(component.singIn.emit).not.toHaveBeenCalled();
    expect(FormErrorUtil.setAllTouched).toHaveBeenCalledWith(component.form);

    fixture.detectChanges();
    const matErrors = fixture.debugElement.queryAll(By.css('mat-error'));
    expect(matErrors.length).toEqual(1);
  });
});
