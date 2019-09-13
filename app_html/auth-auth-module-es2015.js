(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["auth-auth-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/auth/auth.page.html":
/*!***************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/auth/auth.page.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- \n  url(\"/assets/img/bg.jpg\") center center / cover no-repeat fixed\n-->\n<ion-content>\n  <!-- [hidden]=\"!authService.hasTokenValidationFailed()\" -->\n  <div id=\"fullBG\">\n    <form [formGroup]=\"loginFormGroup\" id=\"authForm\">\n      <div text-center>\n        <img src=\"/assets/safetygramlogo.png\">\n        <h1 translate>auth.title</h1>\n      </div>\n      <p>\n        <mat-form-field class=\"fullWidth\">\n          <input matInput [placeholder]=\"'auth.password' | translate\" type=\"password\" formControlName=\"password\" required>\n        </mat-form-field>\n      </p>\n      <p class=\"submitButtonRow\">\n        <button class=\"submitButton\" mat-raised-button color=\"primary\" type=\"submit\" (click)=\"login()\" [disabled]=\"loginFormGroup.invalid\">{{ 'auth.login' | translate }}</button>\n      </p>\n      <mat-nav-list style=\"overflow: hidden;\">\n        <mat-list-item role=\"listheader\">\n          <h3 matLine i18n=\"@@homeUsefulLinks\">Useful Links</h3>\n        </mat-list-item>\n        <a mat-list-item href=\"https://github.com/cuddlycheetah/safetygram\" target=\"_blank\">\n          <mat-icon matListIcon>open_in_new</mat-icon>\n          <h3 matLine i18n=\"@@homeOpenOnGithub\">Open on Github</h3>\n        </a>\n        <a mat-list-item href=\"https://t.me/SafetygramApp\" target=\"_blank\">\n          <mat-icon matListIcon>message</mat-icon>\n          <h3 matLine i18n=\"@@homeTelegram\">Telegram Support</h3>\n        </a>\n        <a mat-list-item href=\"https://paypal.me/4thebadwoofsky\" target=\"_blank\">\n          <mat-icon matListIcon>credit_card</mat-icon>\n          <h3 matLine i18n=\"@@donate\">Donate</h3>\n        </a>\n      </mat-nav-list>\n    </form>\n  </div>\n</ion-content>"

/***/ }),

/***/ "./src/app/auth/auth.module.ts":
/*!*************************************!*\
  !*** ./src/app/auth/auth.module.ts ***!
  \*************************************/
/*! exports provided: AuthPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthPageModule", function() { return AuthPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _auth_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./auth.page */ "./src/app/auth/auth.page.ts");
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../material.module */ "./src/app/material.module.ts");








const routes = [
    {
        path: '',
        component: _auth_page__WEBPACK_IMPORTED_MODULE_6__["AuthPage"]
    }
];
let AuthPageModule = class AuthPageModule {
};
AuthPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            _material_module__WEBPACK_IMPORTED_MODULE_7__["MaterialModule"],
        ],
        declarations: [_auth_page__WEBPACK_IMPORTED_MODULE_6__["AuthPage"]]
    })
], AuthPageModule);



/***/ }),

/***/ "./src/app/auth/auth.page.scss":
/*!*************************************!*\
  !*** ./src/app/auth/auth.page.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#fullBG {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: url(\"/assets/background.jpg\") no-repeat center center scroll;\n  background-size: cover;\n}\n\n#authForm {\n  margin: auto;\n  margin-top: 2rem;\n  width: 22rem;\n  background: rgba(255, 255, 255, 0.4);\n  padding: 1rem;\n  border-radius: 1rem;\n}\n\na {\n  background: unset !important;\n}\n\n.submitButton {\n  margin: 0 auto 0 1rem;\n}\n\n.fullWidth {\n  width: 100%;\n  height: 2rem;\n}\n\n.submitButtonRow {\n  height: 2rem;\n}\n\n.submitButton {\n  float: right;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0aC9NOlxccHJvamVjdHNcXHNhZmV0eWdyYW1hcHBcXHNmYWV0eWdyYW1hcHAvc3JjXFxhcHBcXGF1dGhcXGF1dGgucGFnZS5zY3NzIiwic3JjL2FwcC9hdXRoL2F1dGgucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksa0JBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esd0VBQUE7RUFDQSxzQkFBQTtBQ0NKOztBRENBO0VBQ0ksWUFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLG9DQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0FDRUo7O0FEQUE7RUFDSSw0QkFBQTtBQ0dKOztBRERBO0VBQ0kscUJBQUE7QUNJSjs7QURGQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0FDS0o7O0FERkE7RUFDSSxZQUFBO0FDS0o7O0FESEE7RUFDSSxZQUFBO0FDTUoiLCJmaWxlIjoic3JjL2FwcC9hdXRoL2F1dGgucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI2Z1bGxCRyB7XHJcbiAgICBwb3NpdGlvbjphYnNvbHV0ZTtcclxuICAgIHRvcDowO1xyXG4gICAgbGVmdDowO1xyXG4gICAgd2lkdGg6MTAwJTtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIGJhY2tncm91bmQ6IHVybCgnL2Fzc2V0cy9iYWNrZ3JvdW5kLmpwZycpIG5vLXJlcGVhdCBjZW50ZXIgY2VudGVyIHNjcm9sbDtcclxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbn1cclxuI2F1dGhGb3JtIHtcclxuICAgIG1hcmdpbjogYXV0bzsgXHJcbiAgICBtYXJnaW4tdG9wOiAycmVtO1xyXG4gICAgd2lkdGg6IDIycmVtO1xyXG4gICAgYmFja2dyb3VuZDogcmdiYSgyNTUsMjU1LDI1NSwwLjQpO1xyXG4gICAgcGFkZGluZzogMXJlbTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDFyZW07XHJcbn1cclxuYSB7XHJcbiAgICBiYWNrZ3JvdW5kOiB1bnNldCAhaW1wb3J0YW50O1xyXG59XHJcbi5zdWJtaXRCdXR0b24ge1xyXG4gICAgbWFyZ2luOiAwIGF1dG8gMCAxcmVtO1xyXG59XHJcbi5mdWxsV2lkdGgge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDJyZW07XHJcbn1cclxuXHJcbi5zdWJtaXRCdXR0b25Sb3cge1xyXG4gICAgaGVpZ2h0OiAycmVtO1xyXG59XHJcbi5zdWJtaXRCdXR0b24ge1xyXG4gICAgZmxvYXQ6IHJpZ2h0O1xyXG59IiwiI2Z1bGxCRyB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBiYWNrZ3JvdW5kOiB1cmwoXCIvYXNzZXRzL2JhY2tncm91bmQuanBnXCIpIG5vLXJlcGVhdCBjZW50ZXIgY2VudGVyIHNjcm9sbDtcbiAgYmFja2dyb3VuZC1zaXplOiBjb3Zlcjtcbn1cblxuI2F1dGhGb3JtIHtcbiAgbWFyZ2luOiBhdXRvO1xuICBtYXJnaW4tdG9wOiAycmVtO1xuICB3aWR0aDogMjJyZW07XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC40KTtcbiAgcGFkZGluZzogMXJlbTtcbiAgYm9yZGVyLXJhZGl1czogMXJlbTtcbn1cblxuYSB7XG4gIGJhY2tncm91bmQ6IHVuc2V0ICFpbXBvcnRhbnQ7XG59XG5cbi5zdWJtaXRCdXR0b24ge1xuICBtYXJnaW46IDAgYXV0byAwIDFyZW07XG59XG5cbi5mdWxsV2lkdGgge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAycmVtO1xufVxuXG4uc3VibWl0QnV0dG9uUm93IHtcbiAgaGVpZ2h0OiAycmVtO1xufVxuXG4uc3VibWl0QnV0dG9uIHtcbiAgZmxvYXQ6IHJpZ2h0O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/auth/auth.page.ts":
/*!***********************************!*\
  !*** ./src/app/auth/auth.page.ts ***!
  \***********************************/
/*! exports provided: AuthPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthPage", function() { return AuthPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../auth.service */ "./src/app/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");





let AuthPage = class AuthPage {
    constructor(route, authService, formBuilder) {
        this.route = route;
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.loginFormGroup = this.formBuilder.group({
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
        });
    }
    ngOnInit() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.authService.getStatus();
        });
    }
    login() {
        const password = this.loginFormGroup.value.password;
        this.authService.login(password);
    }
};
AuthPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] }
];
AuthPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-auth',
        template: __webpack_require__(/*! raw-loader!./auth.page.html */ "./node_modules/raw-loader/index.js!./src/app/auth/auth.page.html"),
        styles: [__webpack_require__(/*! ./auth.page.scss */ "./src/app/auth/auth.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        _auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"]])
], AuthPage);



/***/ })

}]);
//# sourceMappingURL=auth-auth-module-es2015.js.map