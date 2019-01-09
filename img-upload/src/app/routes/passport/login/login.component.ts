import { SettingsService, _HttpClient } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import {
  SocialService,
  SocialOpenType,
  TokenService,
  DA_SERVICE_TOKEN,
} from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { environment } from '@env/environment';
import { StartupService } from '@core/startup/startup.service';
import { SysMenuService } from '../../../service/system';
import { RESPONSE } from '../../../models';
import { filter } from 'rxjs/operators';
import { SesssionStorageService } from '../../../service/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
})
export class UserLoginComponent implements OnDestroy {
  form: FormGroup;
  error = '';
  type = 0;

  constructor(
    fb: FormBuilder,
    modalSrv: NzModalService,
    public msg: NzMessageService,
    private router: Router,
    private settingsService: SettingsService,
    private socialService: SocialService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
    private startupSrv: StartupService,
    public http: _HttpClient,
    private menuSer : SysMenuService ,
    private ss : SesssionStorageService
  ) {
    this.form = fb.group({
      userName: [null, [ Validators.required ]],
      password: [null, Validators.required],
      mobile: [null, [ Validators.required, Validators.pattern(/^1\d{10}$/)]],
      captcha: [null, [ Validators.required ] ],
      remember: [true],
    });
    modalSrv.closeAll();
  }

  // #region fields

  get userName() {
    return this.form.controls.userName;
  }
  get password() {
    return this.form.controls.password;
  }
  get mobile() {
    return this.form.controls.mobile;
  }
  get captcha() {
    return this.form.controls.captcha;
  }

  // #endregion

  switch(ret: any) {
    this.type = ret.index;
  }

  // #region get captcha

  count = 0;
  interval$: any;

  getCaptcha() {
    if (this.mobile.invalid) {
      this.mobile.markAsDirty({ onlySelf: true });
      this.mobile.updateValueAndValidity({ onlySelf: true });
      return;
    }
    this.count = 59;
    this.interval$ = setInterval(() => {
      this.count -= 1;
      if (this.count <= 0) clearInterval(this.interval$);
    }, 1000);
  }

  // #endregion

  submit() {
    this.error = '';

    if (this.type === 0) {
      this.userName.markAsDirty();
      this.userName.updateValueAndValidity();
      this.password.markAsDirty();
      this.password.updateValueAndValidity();
      if (this.userName.invalid || this.password.invalid) return;
    } else {
      this.mobile.markAsDirty();
      this.mobile.updateValueAndValidity();
      this.captcha.markAsDirty();
      this.captcha.updateValueAndValidity();
      if (this.mobile.invalid || this.captcha.invalid) return;
    }

    // 默认配置中对所有HTTP请求都会强制 [校验](https://ng-alain.com/auth/getting-started) 用户 Token
    // 然一般来说登录请求不需要校验，因此可以在请求URL加上：`/login?_allow_anonymous=true` 表示不触发用户 Token 校验

    const formData = new FormData() ;
    formData.append("username" , this.userName.value ) ;
    formData.append("password" , this.password.value ) ;

    this.ss.set("loginInfo" , true ) ;
    this.getMenu(3) ;
    //
    // ( <Observable<any>> < any >this.menuSer.login(formData) )
    //   .subscribe( ( res : any ) => {
    //     this.ss.set('loginInfo' , res.message) ;
    //     this.reuseTabService.clear();
    //     this.getMenu(res.data.id) ;
    //     // this.startupSrv.load().then(() => this.router.navigate(['/']));
    //   });

    // this.http
    //   .post('/login/account?_allow_anonymous=true', {
    //     type: this.type,
    //     userName: this.userName.value,
    //     password: this.password.value,
    //   })
    //   .subscribe((res: any) => {
    //     if (res.msg !== 'ok') {
    //       this.error = res.msg;
    //       return;
    //     }
    //     // 清空路由复用信息
    //     this.reuseTabService.clear();
    //     // 设置用户Token信息
    //     this.tokenService.set(res.user);
    //     // 重新获取 StartupService 内容，我们始终认为应用信息一般都会受当前用户授权范围而影响
    //     this.startupSrv.load().then(() => this.router.navigate(['/']));
    //   });
  }

  // #region social
  // #endregion

  ngOnDestroy(): void {
    if (this.interval$) clearInterval(this.interval$);
  };

  getMenu(usrId : number){
    this.menuSer.getLoginMenu(usrId)
      .pipe(
          filter( ( res : RESPONSE ) => {
              if(res.success === false){
                  this.msg.error("获取用户菜单失败") ;
              };
              return res.success === true ;
          }),
          filter( (res : RESPONSE ) => {
            if(res.data.length <= 0 )
              this.msg.warning("该用户未拥有任何权限,请联系系统管理员") ;
            return res.data.length > 0  ;
          })
      )
      .subscribe( ( res : RESPONSE) => {
        this.ss.set("menuInfo" , res.data) ;
        this.router.navigate(['/']) ;
      })
  }
}
