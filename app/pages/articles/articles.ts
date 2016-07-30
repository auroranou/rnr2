import { Component } from '@angular/core';
import { Loading, NavController, NavParams, Platform } from 'ionic-angular';
import { ArticlesService } from '../../providers/articles-service/articles-service';

/*
  Generated class for the ArticlesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/articles/articles.html',
  providers: [ArticlesService]
})

export class ArticlesPage {
    public tripMessage: any;
    public tripTime: any;
    public articles: any;

  constructor(
    private nav: NavController,
    private navParams: NavParams,
    public platform: Platform,
    private articlesSvc: ArticlesService
  ) {
    this.navParams = navParams;
    this.platform = platform;
    this.tripMessage = navParams.get("tripMessage");
    this.tripTime = navParams.get("tripTime");
    
    this.getArticles();
  }

  getArticles() {
    let loading = Loading.create({
      content: `
        <div class="article__spinner">
          <img src="build/images/train1.png">
        </div>
      `,
      spinner: 'hide'
    });

    this.nav.present(loading);

    this.articlesSvc.getArticles(this.tripTime)
    .then(data => {
      // TO DO: Randomly select 5 articles before binding to this
      loading.dismiss();
      this.articles = data;
    });
  }

}
