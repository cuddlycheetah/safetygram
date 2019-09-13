(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["users-chat-chat-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/message/forwardinfo/forwardinfo.component.html":
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/message/forwardinfo/forwardinfo.component.html ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  {{ text }}\n</p>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/message/message.component.html":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/message/message.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"message\">\n  <mat-card [attr.data-outgoing]=\"message.isOutgoing\" [attr.data-deleted]=\"message.deleted\">\n    <!--* Title -->\n    <mat-card-subtitle>\n      <forward-info *ngIf=\"message.isForwarded === true\" [message]=\"message\"></forward-info>\n    </mat-card-subtitle>\n    <!--* Content -->\n    <mat-card-content *ngIf=\"message.type=='ukn'\">{{ message.content | json }}</mat-card-content>\n    <mat-card-content *ngIf=\"message.type=='txt'\">{{ message.content }}</mat-card-content>\n    <mat-card-content *ngIf=\"message.type=='stk'\"><img [src]=\"'/api/file/fetch/' + message.content[0]\"></mat-card-content>\n    <mat-card-content *ngIf=\"message.type=='pic'\"><img [src]=\"'/api/file/fetch/' + message.content[1]\">{{ message.content[0] }}</mat-card-content>\n    <mat-card-content *ngIf=\"message.type=='gif'\"><img [src]=\"'/api/file/fetch/' + message.content[1]\">{{ message.content[3] }}</mat-card-content>\n    <mat-card-content *ngIf=\"message.type=='gif_'\">\n      <video autoplay loop [poster]=\"'/api/file/fetch/' + message.content[1]\" [src]=\"'/api/file/clientfetch/' + message.content[2]\"></video>\n      <pre>{{ message.content[3] }}</pre>\n    </mat-card-content>\n    <mat-card-content *ngIf=\"message.hasEdits\" [hidden]=\"editsHidden\">\n      <mat-list dense>\n        <mat-list-item *ngFor=\"let edit of edits\">\n            <p *ngIf=\"message.type=='txt'\">{{ edit.content }}</p>\n            <p *ngIf=\"message.type=='pic'\">{{ edit.content[1] || edit.content }}</p>\n            <p *ngIf=\"message.type=='ukn'\">{{ edit.content }}</p>\n          <span class=\"msgDate\">{{ formatDate(edit.createdAt) }}</span>\n        </mat-list-item>\n      </mat-list>\n    </mat-card-content>\n    <!--* Footer-->\n    <mat-card-footer>\n      <!--* Text -->\n      <span class=\"dateColumn\">\n        <span class=\"msgDate\">{{ formatDate(message.createdAt) }}</span>\n        <span class=\"msgDate\" *ngIf=\"message.deleted\">\n          <mat-icon>delete</mat-icon>{{ formatDate(message.deletedAt) }}\n        </span>\n      </span>\n      <!--* Context Menu Button -->\n      <button mat-icon-button [mat-menu-trigger-for]=\"menu\" (menuOpened)=\"openedContextMenu()\">\n        <mat-icon>more_vert</mat-icon>\n      </button>\n    </mat-card-footer>\n    <mat-card-actions> <!--  *ngIf=\"message.hasEdits\" -->\n      <button mat-button *ngIf=\"message.hasEdits\" (click)=\"toggleEdits()\">Edits</button>\n    </mat-card-actions>\n  </mat-card>\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/users/chat/chat.page.html":
/*!*********************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/users/chat/chat.page.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-button (click)=\"location.back()\" >\n        <ion-icon slot=\"icon-only\" name=\"arrow-round-back\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n    <mat-list>\n      <mat-list-item>\n        <img matListAvatar *ngIf=\"basicChatNamesets.length > 0\" [src]=\"'/api/file/fetch/' + basicChatNamesets[0].photo\">\n        <h2 matLine *ngIf=\"basicUserNamesets.length > 0\">{{ basicUserNamesets[0].firstName }} {{ basicUserNamesets[0].lastName }}</h2>\n        <p matLine *ngIf=\"basicUserInfos.length > 0\">{{ basicUserInfos[0].bio }}</p>\n        <!--\n          <button mat-raised-button color=\"primary\" (click)=\"showInfo=!showInfo\">\n            <mat-icon>history</mat-icon> {{ 'chat.message.history' | translate }}\n          </button>\n        -->\n      </mat-list-item>\n    </mat-list>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content fullscreen style=\"top:0;left:0;width:100%; height: 100%; background: url('/assets/background.jpg') no-repeat center center scroll;background-size: cover;\">\n  <div id=\"chatContent\">\n    <mat-tab-group backgroundColor=\"primary\" [(selectedIndex)]=\"selectedIndex\">\n      <mat-tab>\n        <ng-template mat-tab-label>\n          <mat-icon>chat</mat-icon> {{ 'chat.infos.chat' | translate }}\n        </ng-template>\n      </mat-tab>\n      <mat-tab>\n        <ng-template mat-tab-label>\n          <mat-icon>person</mat-icon> {{ 'chat.infos.identities' | translate }}\n        </ng-template>\n      </mat-tab>\n      <mat-tab>\n        <ng-template mat-tab-label>\n          <mat-icon>bug_report</mat-icon> {{ 'chat.infos.debug' | translate }}\n        </ng-template>\n      </mat-tab>\n    </mat-tab-group>\n    <!-- Chat History -->\n    <section class=\"chatTab\" [hidden]=\"selectedIndex != 0\">\n      <ion-content>\n        <ion-infinite-scroll threshold=\"100px\" position=\"top\" (ionInfinite)=\"loadData($event)\" #scroll>\n          <ion-infinite-scroll-content loadingSpinner=\"bubbles\" loadingText=\"Loading more data...\">\n          </ion-infinite-scroll-content>\n        </ion-infinite-scroll>\n        <app-message [message]=\"message\" [menu]=\"appMenu\" (menuOpened)=\"menuOpened($event)\" *ngFor=\"let message of cachedData\"></app-message>\n      </ion-content>\n    </section>\n    <mat-menu #appMenu=\"matMenu\" yPosition=\"above\">\n      <ng-template matMenuContent>\n        <!--\n          <button mat-menu-item translate (click)=\"ctxMenu_OpenInTG()\">\n            chat.message.menu.openintg\n          </button>\n        -->\n      </ng-template>\n    </mat-menu>\n    <!-- Identities -->\n    <section class=\"chatTab\" [hidden]=\"selectedIndex != 1\">\n      <h2 translate>chat.infos.identities</h2>\n      <mat-list>\n        <mat-list-item *ngFor=\"let chatNameset of basicChatNamesets\">\n          <img matListAvatar [src]=\"'/api/file/fetch/' + chatNameset.photo\">\n          <h3 matLine>{{ chatNameset.name }}</h3>\n          <p matLine>\n            <span>{{ formatDate(chatNameset.createdAt) }}</span>\n          </p>\n        </mat-list-item>\n      </mat-list>\n    </section>\n    <!-- Debug -->\n    <section class=\"chatTab\" [hidden]=\"selectedIndex != 2\">\n      <pre>{{ basicUser | json }}</pre>\n      <pre>{{ basicUserInfos | json }}</pre>\n      <pre>{{ basicUserNamesets | json }}</pre>\n      <pre>{{ basicChatNamesets | json }}</pre>\n    </section>\n  </div>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/message/forwardinfo/forwardinfo.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/message/forwardinfo/forwardinfo.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21lc3NhZ2UvZm9yd2FyZGluZm8vZm9yd2FyZGluZm8uY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/message/forwardinfo/forwardinfo.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/message/forwardinfo/forwardinfo.component.ts ***!
  \**************************************************************/
/*! exports provided: ForwardinfoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForwardinfoComponent", function() { return ForwardinfoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");




var ForwardinfoComponent = /** @class */ (function () {
    function ForwardinfoComponent(translate, http) {
        this.translate = translate;
        this.http = http;
        this.text = 'Unkown';
    }
    ForwardinfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        /*
          fordwardName: ""
          forwardInfo: null
          forwardType: null
          forwardedChat: -1001211391560
          forwardedUser: null
        */
        var peerId = !!this.message.forwardedUser ? this.message.forwardedUser : this.message.forwardedChat;
        this.http.get("/api/rest/chatnameset/desc?chatId=" + peerId)
            .subscribe(function (data) {
            var peerName = !!_this.message.fordwardName && _this.message.fordwardName.length > 0
                ? _this.message.fordwardName
                : data[0].name;
            if (!!_this.message.forwardedChat) {
                _this.text = _this.translate.instant('chat.message.forwardinfo.chat') + " " + peerName;
            }
            if (!!_this.message.forwardedUser) {
                _this.text = _this.translate.instant('chat.message.forwardinfo.user') + " " + peerName;
            }
        });
    };
    ForwardinfoComponent.ctorParameters = function () { return [
        { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"] },
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ForwardinfoComponent.prototype, "message", void 0);
    ForwardinfoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'forward-info',
            template: __webpack_require__(/*! raw-loader!./forwardinfo.component.html */ "./node_modules/raw-loader/index.js!./src/app/message/forwardinfo/forwardinfo.component.html"),
            styles: [__webpack_require__(/*! ./forwardinfo.component.scss */ "./src/app/message/forwardinfo/forwardinfo.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], ForwardinfoComponent);
    return ForwardinfoComponent;
}());



/***/ }),

/***/ "./src/app/message/message.component.scss":
/*!************************************************!*\
  !*** ./src/app/message/message.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "mat-card {\n  max-width: 300px;\n  width: 80%;\n  padding-top: 5px;\n  color: white;\n}\n\nmat-card[data-outgoing=false] {\n  background-color: #182533;\n}\n\nmat-card[data-outgoing=true] {\n  margin-left: auto;\n  background-color: #2B5278;\n}\n\nmat-card[data-deleted=true] {\n  background-color: maroon;\n}\n\n.message {\n  width: 100%;\n  display: block;\n  padding-left: 1.75rem;\n  padding-right: 1.75rem;\n  padding-top: 0.75rem;\n  padding-bottom: 1rem;\n}\n\nmat-card-subtitle {\n  color: white;\n}\n\nmat-card-subtitle > forward-info {\n  color: white;\n  font-weight: bold;\n}\n\nmat-card-footer {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  color: white;\n}\n\nmat-card-footer > mat-icon {\n  font-size: 0.95rem !important;\n}\n\nmat-card[data-outgoing=false] mat-card-footer span {\n  -webkit-box-ordinal-group: 1;\n          order: 0;\n}\n\nmat-card[data-outgoing=true] mat-card-footer span {\n  -webkit-box-ordinal-group: 2;\n          order: 1;\n}\n\nmat-card[data-outgoing=false] mat-card-footer button {\n  -webkit-box-ordinal-group: 2;\n          order: 1;\n}\n\nmat-card[data-outgoing=true] mat-card-footer button {\n  -webkit-box-ordinal-group: 1;\n          order: 0;\n}\n\n.msgDate {\n  padding-left: 0.2rem;\n  padding-right: 0.2rem;\n  font-size: 1.2rem;\n  font-family: monospace;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWVzc2FnZS9NOlxccHJvamVjdHNcXHNhZmV0eWdyYW1hcHBcXHNmYWV0eWdyYW1hcHAvc3JjXFxhcHBcXG1lc3NhZ2VcXG1lc3NhZ2UuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL21lc3NhZ2UvbWVzc2FnZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGdCQUFBO0VBQ0EsVUFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtBQ0NKOztBRENBO0VBQ0kseUJBQUE7QUNFSjs7QURBQTtFQUNJLGlCQUFBO0VBQ0EseUJBQUE7QUNHSjs7QUREQTtFQUNJLHdCQUFBO0FDSUo7O0FEREE7RUFDSSxXQUFBO0VBQ0EsY0FBQTtFQUNBLHFCQUFBO0VBQ0Esc0JBQUE7RUFDQSxvQkFBQTtFQUNBLG9CQUFBO0FDSUo7O0FERkE7RUFDSSxZQUFBO0FDS0o7O0FESEE7RUFDSSxZQUFBO0VBQ0EsaUJBQUE7QUNNSjs7QURGQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDhCQUFBO0VBQUEsNkJBQUE7VUFBQSxtQkFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7RUFDQSxZQUFBO0FDS0o7O0FESEE7RUFDSSw2QkFBQTtBQ01KOztBREpBO0VBQ0ksNEJBQUE7VUFBQSxRQUFBO0FDT0o7O0FESkE7RUFDSSw0QkFBQTtVQUFBLFFBQUE7QUNPSjs7QURKQTtFQUNJLDRCQUFBO1VBQUEsUUFBQTtBQ09KOztBRExBO0VBQ0ksNEJBQUE7VUFBQSxRQUFBO0FDUUo7O0FESkE7RUFDSSxvQkFBQTtFQUNBLHFCQUFBO0VBQ0EsaUJBQUE7RUFDQSxzQkFBQTtBQ09KIiwiZmlsZSI6InNyYy9hcHAvbWVzc2FnZS9tZXNzYWdlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsibWF0LWNhcmQge1xyXG4gICAgbWF4LXdpZHRoOiAzMDBweDtcclxuICAgIHdpZHRoOiA4MCU7XHJcbiAgICBwYWRkaW5nLXRvcDogNXB4O1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG59XHJcbm1hdC1jYXJkW2RhdGEtb3V0Z29pbmc9J2ZhbHNlJ10ge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzE4MjUzMztcclxufVxyXG5tYXQtY2FyZFtkYXRhLW91dGdvaW5nPSd0cnVlJ10ge1xyXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMkI1Mjc4O1xyXG59XHJcbm1hdC1jYXJkW2RhdGEtZGVsZXRlZD0ndHJ1ZSddIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxMjgsIDAsIDApO1xyXG59XHJcblxyXG4ubWVzc2FnZSB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgcGFkZGluZy1sZWZ0OiAxLjc1cmVtO1xyXG4gICAgcGFkZGluZy1yaWdodDogMS43NXJlbTtcclxuICAgIHBhZGRpbmctdG9wOiAwLjc1cmVtO1xyXG4gICAgcGFkZGluZy1ib3R0b206IDFyZW07XHJcbn1cclxubWF0LWNhcmQtc3VidGl0bGUge1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG59XHJcbm1hdC1jYXJkLXN1YnRpdGxlID4gZm9yd2FyZC1pbmZvIHtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcblxyXG4vLyBGb290ZXIgU3R1ZmZcclxubWF0LWNhcmQtZm9vdGVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG59XHJcbm1hdC1jYXJkLWZvb3RlciA+IG1hdC1pY29uIHtcclxuICAgIGZvbnQtc2l6ZTogMC45NXJlbSAhaW1wb3J0YW50O1xyXG59XHJcbm1hdC1jYXJkW2RhdGEtb3V0Z29pbmc9J2ZhbHNlJ10gbWF0LWNhcmQtZm9vdGVyIHNwYW4ge1xyXG4gICAgb3JkZXI6IDA7XHJcbiAgICAvLyB0ZXh0LWFsaWduOiByaWdodDtcclxufVxyXG5tYXQtY2FyZFtkYXRhLW91dGdvaW5nPSd0cnVlJ10gbWF0LWNhcmQtZm9vdGVyIHNwYW4ge1xyXG4gICAgb3JkZXI6IDE7XHJcbiAgICAvLyB0ZXh0LWFsaWduOiBsZWZ0O1xyXG59XHJcbm1hdC1jYXJkW2RhdGEtb3V0Z29pbmc9J2ZhbHNlJ10gbWF0LWNhcmQtZm9vdGVyIGJ1dHRvbiB7XHJcbiAgICBvcmRlcjogMTtcclxufVxyXG5tYXQtY2FyZFtkYXRhLW91dGdvaW5nPSd0cnVlJ10gbWF0LWNhcmQtZm9vdGVyIGJ1dHRvbiB7XHJcbiAgICBvcmRlcjowO1xyXG59XHJcblxyXG4vLyBEYXRlXHJcbi5tc2dEYXRlIHtcclxuICAgIHBhZGRpbmctbGVmdDogMC4ycmVtO1xyXG4gICAgcGFkZGluZy1yaWdodDogMC4ycmVtO1xyXG4gICAgZm9udC1zaXplOiAxLjJyZW07XHJcbiAgICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xyXG59IiwibWF0LWNhcmQge1xuICBtYXgtd2lkdGg6IDMwMHB4O1xuICB3aWR0aDogODAlO1xuICBwYWRkaW5nLXRvcDogNXB4O1xuICBjb2xvcjogd2hpdGU7XG59XG5cbm1hdC1jYXJkW2RhdGEtb3V0Z29pbmc9ZmFsc2VdIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzE4MjUzMztcbn1cblxubWF0LWNhcmRbZGF0YS1vdXRnb2luZz10cnVlXSB7XG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMkI1Mjc4O1xufVxuXG5tYXQtY2FyZFtkYXRhLWRlbGV0ZWQ9dHJ1ZV0ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXJvb247XG59XG5cbi5tZXNzYWdlIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwYWRkaW5nLWxlZnQ6IDEuNzVyZW07XG4gIHBhZGRpbmctcmlnaHQ6IDEuNzVyZW07XG4gIHBhZGRpbmctdG9wOiAwLjc1cmVtO1xuICBwYWRkaW5nLWJvdHRvbTogMXJlbTtcbn1cblxubWF0LWNhcmQtc3VidGl0bGUge1xuICBjb2xvcjogd2hpdGU7XG59XG5cbm1hdC1jYXJkLXN1YnRpdGxlID4gZm9yd2FyZC1pbmZvIHtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxubWF0LWNhcmQtZm9vdGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBjb2xvcjogd2hpdGU7XG59XG5cbm1hdC1jYXJkLWZvb3RlciA+IG1hdC1pY29uIHtcbiAgZm9udC1zaXplOiAwLjk1cmVtICFpbXBvcnRhbnQ7XG59XG5cbm1hdC1jYXJkW2RhdGEtb3V0Z29pbmc9ZmFsc2VdIG1hdC1jYXJkLWZvb3RlciBzcGFuIHtcbiAgb3JkZXI6IDA7XG59XG5cbm1hdC1jYXJkW2RhdGEtb3V0Z29pbmc9dHJ1ZV0gbWF0LWNhcmQtZm9vdGVyIHNwYW4ge1xuICBvcmRlcjogMTtcbn1cblxubWF0LWNhcmRbZGF0YS1vdXRnb2luZz1mYWxzZV0gbWF0LWNhcmQtZm9vdGVyIGJ1dHRvbiB7XG4gIG9yZGVyOiAxO1xufVxuXG5tYXQtY2FyZFtkYXRhLW91dGdvaW5nPXRydWVdIG1hdC1jYXJkLWZvb3RlciBidXR0b24ge1xuICBvcmRlcjogMDtcbn1cblxuLm1zZ0RhdGUge1xuICBwYWRkaW5nLWxlZnQ6IDAuMnJlbTtcbiAgcGFkZGluZy1yaWdodDogMC4ycmVtO1xuICBmb250LXNpemU6IDEuMnJlbTtcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/message/message.component.ts":
/*!**********************************************!*\
  !*** ./src/app/message/message.component.ts ***!
  \**********************************************/
/*! exports provided: MessageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageComponent", function() { return MessageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");




var MessageComponent = /** @class */ (function () {
    function MessageComponent(http) {
        this.http = http;
        this.menuOpened = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.edits = [];
        this.editsHidden = true;
    }
    MessageComponent.prototype.ngOnInit = function () { };
    MessageComponent.prototype.openedContextMenu = function () {
        console.log(this.message);
        this.menuOpened.emit(this.message);
    };
    MessageComponent.prototype.toggleEdits = function () {
        var _this = this;
        if (this.message.hasEdits) {
            if (this.edits.length === 0) {
                return this.http.get("/api/rest/messageedit/?messageId=" + this.message.id)
                    .subscribe(function (res) {
                    console.log('res', res.length);
                    _this.edits = res;
                });
            }
            this.editsHidden = !this.editsHidden;
        }
    };
    MessageComponent.prototype.formatDate = function (inputDate) {
        var date = new Date(inputDate);
        return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    };
    MessageComponent.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], MessageComponent.prototype, "message", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatMenu"])
    ], MessageComponent.prototype, "menu", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], MessageComponent.prototype, "menuOpened", void 0);
    MessageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-message',
            template: __webpack_require__(/*! raw-loader!./message.component.html */ "./node_modules/raw-loader/index.js!./src/app/message/message.component.html"),
            styles: [__webpack_require__(/*! ./message.component.scss */ "./src/app/message/message.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], MessageComponent);
    return MessageComponent;
}());



/***/ }),

/***/ "./src/app/users/chat/chat.module.ts":
/*!*******************************************!*\
  !*** ./src/app/users/chat/chat.module.ts ***!
  \*******************************************/
/*! exports provided: ChatPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatPageModule", function() { return ChatPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _chat_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./chat.page */ "./src/app/users/chat/chat.page.ts");
/* harmony import */ var src_app_material_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/material.module */ "./src/app/material.module.ts");
/* harmony import */ var src_app_message_message_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/message/message.component */ "./src/app/message/message.component.ts");
/* harmony import */ var src_app_message_forwardinfo_forwardinfo_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/message/forwardinfo/forwardinfo.component */ "./src/app/message/forwardinfo/forwardinfo.component.ts");










var routes = [
    {
        path: '',
        component: _chat_page__WEBPACK_IMPORTED_MODULE_6__["ChatPage"]
    }
];
var ChatPageModule = /** @class */ (function () {
    function ChatPageModule() {
    }
    ChatPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                src_app_material_module__WEBPACK_IMPORTED_MODULE_7__["MaterialModule"]
            ],
            declarations: [
                _chat_page__WEBPACK_IMPORTED_MODULE_6__["ChatPage"],
                src_app_message_message_component__WEBPACK_IMPORTED_MODULE_8__["MessageComponent"],
                src_app_message_forwardinfo_forwardinfo_component__WEBPACK_IMPORTED_MODULE_9__["ForwardinfoComponent"]
            ]
        })
    ], ChatPageModule);
    return ChatPageModule;
}());



/***/ }),

/***/ "./src/app/users/chat/chat.page.scss":
/*!*******************************************!*\
  !*** ./src/app/users/chat/chat.page.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#chatContent {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  height: 100%;\n}\n\n.chatTab {\n  background: url(\"/assets/background.jpg\") no-repeat center center fixed;\n  background-size: cover;\n  height: 100%;\n  background-size: cover;\n  /* height: 100%; */\n  /* max-height: 100%; */\n  /* display: block; */\n  overflow: hidden;\n  overflow-y: scroll;\n}\n\n/* width */\n\n::-webkit-scrollbar {\n  width: 10px;\n}\n\n/* Track */\n\n::-webkit-scrollbar-track {\n  background: #f1f1f1;\n}\n\n/* Handle */\n\n::-webkit-scrollbar-thumb {\n  background: #888;\n}\n\n/* Handle on hover */\n\n::-webkit-scrollbar-thumb:hover {\n  background: #555;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdXNlcnMvY2hhdC9NOlxccHJvamVjdHNcXHNhZmV0eWdyYW1hcHBcXHNmYWV0eWdyYW1hcHAvc3JjXFxhcHBcXHVzZXJzXFxjaGF0XFxjaGF0LnBhZ2Uuc2NzcyIsInNyYy9hcHAvdXNlcnMvY2hhdC9jaGF0LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDRCQUFBO0VBQUEsNkJBQUE7VUFBQSxzQkFBQTtFQUNBLFlBQUE7QUNDSjs7QURDQTtFQUNJLHVFQUFBO0VBQXdFLHNCQUFBO0VBQ3hFLFlBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSxvQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUNHSjs7QURBQSxVQUFBOztBQUNBO0VBQ0ksV0FBQTtBQ0dKOztBRERBLFVBQUE7O0FBQ0E7RUFDSSxtQkFBQTtBQ0lKOztBREZBLFdBQUE7O0FBQ0E7RUFDSSxnQkFBQTtBQ0tKOztBREhBLG9CQUFBOztBQUNBO0VBQ0ksZ0JBQUE7QUNNSiIsImZpbGUiOiJzcmMvYXBwL3VzZXJzL2NoYXQvY2hhdC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjY2hhdENvbnRlbnQge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuLmNoYXRUYWIge1xyXG4gICAgYmFja2dyb3VuZDogdXJsKCcvYXNzZXRzL2JhY2tncm91bmQuanBnJykgbm8tcmVwZWF0IGNlbnRlciBjZW50ZXIgZml4ZWQ7YmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbiAgICAvKiBoZWlnaHQ6IDEwMCU7ICovXHJcbiAgICAvKiBtYXgtaGVpZ2h0OiAxMDAlOyAqL1xyXG4gICAgLyogZGlzcGxheTogYmxvY2s7ICovXHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgb3ZlcmZsb3cteTogc2Nyb2xsO1xyXG59XHJcblxyXG4vKiB3aWR0aCAqL1xyXG46Oi13ZWJraXQtc2Nyb2xsYmFyIHtcclxuICAgIHdpZHRoOiAxMHB4O1xyXG59XHJcbi8qIFRyYWNrICovXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xyXG4gICAgYmFja2dyb3VuZDogI2YxZjFmMTsgXHJcbn1cclxuLyogSGFuZGxlICovXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xyXG4gICAgYmFja2dyb3VuZDogIzg4ODsgXHJcbn1cclxuLyogSGFuZGxlIG9uIGhvdmVyICovXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWI6aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZDogIzU1NTsgXHJcbn0iLCIjY2hhdENvbnRlbnQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5jaGF0VGFiIHtcbiAgYmFja2dyb3VuZDogdXJsKFwiL2Fzc2V0cy9iYWNrZ3JvdW5kLmpwZ1wiKSBuby1yZXBlYXQgY2VudGVyIGNlbnRlciBmaXhlZDtcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgaGVpZ2h0OiAxMDAlO1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICAvKiBoZWlnaHQ6IDEwMCU7ICovXG4gIC8qIG1heC1oZWlnaHQ6IDEwMCU7ICovXG4gIC8qIGRpc3BsYXk6IGJsb2NrOyAqL1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBvdmVyZmxvdy15OiBzY3JvbGw7XG59XG5cbi8qIHdpZHRoICovXG46Oi13ZWJraXQtc2Nyb2xsYmFyIHtcbiAgd2lkdGg6IDEwcHg7XG59XG5cbi8qIFRyYWNrICovXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcbiAgYmFja2dyb3VuZDogI2YxZjFmMTtcbn1cblxuLyogSGFuZGxlICovXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgYmFja2dyb3VuZDogIzg4ODtcbn1cblxuLyogSGFuZGxlIG9uIGhvdmVyICovXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogIzU1NTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/users/chat/chat.page.ts":
/*!*****************************************!*\
  !*** ./src/app/users/chat/chat.page.ts ***!
  \*****************************************/
/*! exports provided: ChatPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatPage", function() { return ChatPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");









var ChatPage = /** @class */ (function () {
    function ChatPage(route, modalController, http, loadingCtrl, alertCtrl, location, translate) {
        this.route = route;
        this.modalController = modalController;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.location = location;
        this.translate = translate;
        this.id = '';
        this.basicUser = {};
        this.basicUserInfos = [];
        this.basicUserNamesets = [];
        this.basicChatNamesets = [];
        this.messages = [];
        this.contextMenuMessage = {};
        this.PAGE_SIZE = 50;
        this.selectedIndex = 0;
        this.messageCount = 0;
        this.cPage = 0;
        this.cachedData = [];
    }
    ChatPage.prototype.ngOnInit = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.id = this.route.snapshot.paramMap.get('id');
                this.loadBasicInfo();
                return [2 /*return*/];
            });
        });
    };
    ChatPage.prototype.getPageForIndex = function (index) {
        return Math.floor(index / this.PAGE_SIZE);
    };
    ChatPage.prototype.loadPreviousPage = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, this.http.get("/api/rest/message/@page/desc/" + this.id + "/" + this.cPage++)
                        .subscribe(function (res) {
                        _this.scroll.disabled = res.length === 0;
                        for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
                            var message = res_1[_i];
                            message.content = JSON.parse(message.content);
                            _this.cachedData.unshift(message);
                        }
                    })];
            });
        });
    };
    ChatPage.prototype.formatDate = function (inputDate) {
        var date = new Date(inputDate);
        return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    };
    ChatPage.prototype.loadBasicInfo = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingCtrl.create({
                            message: this.translate.instant('users.chat.loading'),
                            translucent: true,
                        })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["forkJoin"])([
                                this.http.get("/api/rest/user/" + this.id),
                                this.http.get("/api/rest/userinfo/desc?userId=" + this.id),
                                this.http.get("/api/rest/usernameset/desc?userId=" + this.id),
                                this.http.get("/api/rest/chatnameset/desc?chatId=" + this.id),
                                this.http.get("/api/rest/message/@count?chatId=" + this.id),
                            ])
                                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["finalize"])(function () { return loading.dismiss(); }))
                                .subscribe(function (res) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                    this.basicUser = res[0];
                                    this.basicUserInfos = res[1];
                                    this.basicUserNamesets = res[2];
                                    this.basicChatNamesets = res[3];
                                    this.messageCount = res[4];
                                    this.loadPreviousPage();
                                    console.log('=> got response', res);
                                    return [2 /*return*/];
                                });
                            }); })];
                }
            });
        });
    };
    ChatPage.prototype.loadData = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.target.disabled = true;
                        return [4 /*yield*/, this.loadPreviousPage()];
                    case 1:
                        _a.sent();
                        event.target.complete();
                        event.target.disabled = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatPage.prototype.menuOpened = function (message) {
        this.contextMenuMessage = message;
        console.log('context menu message=', message);
    };
    ChatPage.prototype.ctxMenu_OpenInTG = function () {
        // const url = `tg://openmessage?user_id=${ this.contextMenuMessage.chatId }&message_id=${ this.contextMenuMessage.id }`;
        // window.open(url);
    };
    ChatPage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_4__["Location"] },
        { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('scroll', { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonInfiniteScroll"])
    ], ChatPage.prototype, "scroll", void 0);
    ChatPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-chat',
            template: __webpack_require__(/*! raw-loader!./chat.page.html */ "./node_modules/raw-loader/index.js!./src/app/users/chat/chat.page.html"),
            styles: [__webpack_require__(/*! ./chat.page.scss */ "./src/app/users/chat/chat.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
            _angular_common__WEBPACK_IMPORTED_MODULE_4__["Location"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateService"]])
    ], ChatPage);
    return ChatPage;
}());

;


/***/ })

}]);
//# sourceMappingURL=users-chat-chat-module-es5.js.map