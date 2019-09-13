(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["setup-setup-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/setup/setup.page.html":
/*!*****************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/setup/setup.page.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-title>Enter your Telegram Account Data</ion-title>\n    <img style=\"max-width: 300px;\" src=\"/assets/safetygramlogo.png\">\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <article #phoneNumberStep [hidden]=\"paneIndex!=0\">\n    <form [formGroup]=\"phoneNumberGroup\">\n      <mat-form-field>\n        <input matInput [placeholder]=\"'setup.phonenumber' | translate\" type=\"tel\" formControlName=\"phoneNumber\" required>\n      </mat-form-field>\n      <div>\n        <button mat-flat-button (click)=\"verifyPhoneNumber()\" translate>setup.request.code</button>\n      </div>\n    </form>\n  </article>\n  <article #codeStep [hidden]=\"paneIndex!=1\">\n    <form [formGroup]=\"codeGroup\">\n      <mat-form-field>\n        <input matInput placeholder=\"Code\" type=\"text\" pattern=\"[0-9]{5}\" formControlName=\"code\" required>\n      </mat-form-field>\n      <div>\n        <button mat-button translate>setup.back</button>\n        <button mat-flat-button (click)=\"verifyCode()\" translate>setup.request.verify.code</button>\n      </div>\n    </form>\n  </article>\n  <article #passwordStep [hidden]=\"paneIndex!=2\">\n    <form [formGroup]=\"passwordGroup\">\n      <mat-form-field>\n        <input matInput placeholder=\"'auth.password' | translate\" type=\"password\" formControlName=\"password\" required>\n      </mat-form-field>\n      <div>\n        <button mat-button translate>setup.back</button>\n        <button mat-flat-button (click)=\"verifyPassword()\" translate>setup.request.verify.password</button>\n      </div>\n    </form>\n  </article>\n  <article [hidden]=\"paneIndex!=3\">\n    <p translate>setup.finished.set_interface_password</p>\n\n    <form [formGroup]=\"interfacePasswordGroup\">\n      <mat-form-field>\n        <input matInput placeholder=\"Passwort\" formControlName=\"password\" required>\n      </mat-form-field>\n      <div>\n        <button mat-flat-button (click)=\"finishSetup()\" [disabled]=\"interfacePasswordGroup.invalid\">Fertig</button>\n      </div>\n    </form>\n  </article>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/setup/setup.module.ts":
/*!***************************************!*\
  !*** ./src/app/setup/setup.module.ts ***!
  \***************************************/
/*! exports provided: SetupPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetupPageModule", function() { return SetupPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _setup_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./setup.page */ "./src/app/setup/setup.page.ts");
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../material.module */ "./src/app/material.module.ts");








var routes = [
    {
        path: '',
        component: _setup_page__WEBPACK_IMPORTED_MODULE_6__["SetupPage"]
    }
];
var SetupPageModule = /** @class */ (function () {
    function SetupPageModule() {
    }
    SetupPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                _material_module__WEBPACK_IMPORTED_MODULE_7__["MaterialModule"]
            ],
            declarations: [_setup_page__WEBPACK_IMPORTED_MODULE_6__["SetupPage"]]
        })
    ], SetupPageModule);
    return SetupPageModule;
}());



/***/ }),

/***/ "./src/app/setup/setup.page.scss":
/*!***************************************!*\
  !*** ./src/app/setup/setup.page.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NldHVwL3NldHVwLnBhZ2Uuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/setup/setup.page.ts":
/*!*************************************!*\
  !*** ./src/app/setup/setup.page.ts ***!
  \*************************************/
/*! exports provided: SetupPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetupPage", function() { return SetupPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../auth.service */ "./src/app/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");






var SetupPage = /** @class */ (function () {
    function SetupPage(formBuilder, authService, router, translate) {
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.router = router;
        this.translate = translate;
        // @ViewChild('stepper', {static: true}) stepper: MatVerticalStepper;
        // @ViewChild('phoneNumberStep', {static: true}) phoneNumberStep: MatStep;
        // @ViewChild('codeStep', {static: true}) codeStep: MatStep;
        this.paneIndex = -1;
        this.phoneNumberGroup = this.formBuilder.group({
            phoneNumber: ['', [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern(/^\+(?:[0-9] ?){6,14}[0-9]$/)
                ]],
        });
        this.codeGroup = this.formBuilder.group({
            code: ['', [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(5),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(5)
                ]],
        });
        this.passwordGroup = this.formBuilder.group({
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
        });
        this.interfacePasswordGroup = this.formBuilder.group({
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
        });
    }
    SetupPage.prototype.verifyPhoneNumber = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var phoneNumber;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.phoneNumberGroup.invalid) {
                            return [2 /*return*/, false];
                        }
                        phoneNumber = this.phoneNumberGroup.value.phoneNumber;
                        return [4 /*yield*/, this.authService.verifyPhoneNumber(phoneNumber)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SetupPage.prototype.verifyCode = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var code;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.codeGroup.invalid) {
                            return [2 /*return*/, false];
                        }
                        code = this.codeGroup.value.code;
                        return [4 /*yield*/, this.authService.verifyCode(code)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SetupPage.prototype.verifyPassword = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var password;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.passwordGroup.invalid) {
                            return [2 /*return*/, false];
                        }
                        password = this.passwordGroup.value.password;
                        return [4 /*yield*/, this.authService.verifyPassword(password)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SetupPage.prototype.finishSetup = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var password;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.interfacePasswordGroup.invalid) {
                            return [2 /*return*/, false];
                        }
                        password = this.interfacePasswordGroup.value.password;
                        return [4 /*yield*/, this.authService.initPassword(password)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SetupPage.prototype.ngOnInit = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                if (this.authService.setupNavOkay.value === false) {
                    this.router.navigateByUrl('/');
                }
                this.authService.tgAuthState.subscribe(function (newState) {
                    console.log('tgAuth State', newState);
                    switch (newState) {
                        case 'authorizationStateWaitPhoneNumber':
                            _this.paneIndex = 0;
                            break;
                        case 'authorizationStateWaitCode':
                            _this.paneIndex = 1;
                            break;
                        case 'authorizationStateWaitPassword':
                            _this.paneIndex = 2;
                            break;
                        case 'authorizationStateReady':
                            _this.paneIndex = 3;
                            break;
                        default:
                            console.warn('unkown tgAuth State', newState);
                            break;
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    SetupPage.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: _auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__["TranslateService"] }
    ]; };
    SetupPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-setup',
            template: __webpack_require__(/*! raw-loader!./setup.page.html */ "./node_modules/raw-loader/index.js!./src/app/setup/setup.page.html"),
            styles: [__webpack_require__(/*! ./setup.page.scss */ "./src/app/setup/setup.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__["TranslateService"]])
    ], SetupPage);
    return SetupPage;
}());



/***/ })

}]);
//# sourceMappingURL=setup-setup-module-es5.js.map