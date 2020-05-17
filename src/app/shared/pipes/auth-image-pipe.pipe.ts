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

    // console.log(666.1, src, token, headers);
    // try {
    //   const imageBlob = await this.http.get(src, {headers, responseType: 'blob'}).toPromise();
    //   const reader = new FileReader();
    //   console.log(666.2, src);
    //   return new Promise((resolve, reject) => {
    //     console.log(666.3, reader.result);
    //     reader.onloadend = () => resolve(reader.result as string);
    //     reader.readAsDataURL(imageBlob);
    //   });
    // } catch {
    //   console.log(666.4);
    //   return 'assets/fallback.png';
    // }
  }

}
