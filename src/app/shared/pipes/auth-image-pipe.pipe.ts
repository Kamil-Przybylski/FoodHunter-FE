import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '@core/services/auth.service';

@Pipe({
  name: 'authImagePipe'
})
export class AuthImagePipePipe implements PipeTransform {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  async transform(src: string) {
    // const token = this.authService.getToken();
    // return `${src}?bearer=${token}`;
    // if (!src) return;
    
    // const token = this.authService.getToken();
    // const headers = new HttpHeaders({['Authorization']: `Bearer ${token}`});

    // try {
    //   const imageBlob = await this.http.get(src, {headers, responseType: 'blob'}).toPromise();
    //   const reader = new FileReader();
    //   return new Promise((resolve, reject) => {
    //     reader.onloadend = () => resolve(reader.result as string);
    //     reader.readAsDataURL(imageBlob);
    //   });
    // } catch {
    //   return 'assets/fallback.png';
    // }
  }

}
