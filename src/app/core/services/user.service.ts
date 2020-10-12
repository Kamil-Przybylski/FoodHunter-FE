import { Injectable } from '@angular/core';
import { AuthFormUserModel, AuthUser, AuthUserDtoModel } from '@core/models/auth.models';
import { HttpDtoService } from '@core/utils/http-dto-service';
import { HttpUtil } from '@core/utils/http.util';
import { PhotoHelper } from '@core/utils/photo.helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private postfixes = {
    AUTH: 'auth',
    USER: 'user',
  };

  constructor(private httpDtoService: HttpDtoService) { }

  
  updateProfile(payload: AuthFormUserModel): Observable<AuthUser> {
    const file = PhotoHelper.dataURItoBlob(payload.photoPath, payload.username);

    const req = AuthUserDtoModel.getReqAuthUserDto(payload, file);
    const data = HttpUtil.toFormData(req);
    
    return this.httpDtoService
      .patch<AuthUser, AuthUserDtoModel>(AuthUserDtoModel, `${this.postfixes.AUTH}/${this.postfixes.USER}`, data);
  }

}
