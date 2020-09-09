import { Component, ViewChild, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
    selector: 'app-header-component',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
    public pageName = 'Job';
    public name = localStorage.getItem("user_name");
    constructor(public router: Router, public route:ActivatedRoute) {
    }
    flag = false;
    url;
    url_;


    ngOnInit(){
        if(this.router.url.includes('live')){
            this.flag = true;
            this.url_ = this.router.url;
            this.url = this.router.url.replace('live', "historical");
        }else if(this.router.url.includes('historical')){
            this.flag = true;
            this.url = this.router.url;
            this.url_ = this.router.url.replace("historical", "live");
        }
        else
            this.flag = false;
    }

    logMeOut(){
        localStorage.clear();
        this.router.navigateByUrl('login');
    }

    ngOnDestroy(){
        this.flag = false;
    }

}
