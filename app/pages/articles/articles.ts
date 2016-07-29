import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

/*
  Generated class for the ArticlesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/articles/articles.html',
})
export class ArticlesPage {
    public tripMessage: any;
    public tripTime: any;

  constructor(
    private nav: NavController,
    private navParams: NavParams,
    public platform: Platform
  ) {
    this.navParams = navParams;
    this.platform = platform;
    this.tripMessage = navParams.get("tripMessage");
    this.tripTime = navParams.get("tripTime");
  }

}
