import {Component} from '@angular/core';
import {Modal, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {StationsModal} from '../../components/stations-modal/stations-modal';
import {StationsService} from '../../providers/stations-service/stations-service';
import {ArticlesPage} from '../articles/articles';

@Component({
  templateUrl: 'build/pages/home/home.html',
    providers: [StationsService]
})

export class HomePage {
    public startStation: any;
    public endStation: any;

    constructor(
        private navCtrl: NavController,
        public stationsSvc: StationsService
    ) {}

    openModal(stationType) {
        let modal = Modal.create(StationsModal, { type: stationType });
        
        modal.onDismiss(data => {
            if (typeof data.station !== undefined && data.stationType === 'start') {
                this.startStation = data.station;
            } else if (typeof data.station !== undefined && data.stationType === 'end') {
                this.endStation = data.station;
            }
        });

        this.navCtrl.present(modal);
    }

    runTripQuery() {
        if (!this.startStation || !this.endStation) {
            return;
        }

        if (this.startStation.Name === this.endStation.Name) {
            return;
        }

        let start = this.startStation.Code;
        let end = this.endStation.Code;
        let tripMessage = `The next train from ${this.startStation.Name} leaves `;
        let tripTime = 0;
 
        this.stationsSvc.getNextTrain(start)
        .then(data => {
            if (data["Trains"].length && data["Trains"][0].Min) {
              if (data["Trains"][0].Min === 'BRD') {
                tripMessage += 'now'
              } else if (!isNaN(data["Trains"][0].Min)) {
                tripMessage += `in ${+data["Trains"][0].Min} minutes`;
                tripTime += +data["Trains"][0].Min;
              }
           }

            return this.stationsSvc.getTripInformation(start, end);
        }).then(data => {
            tripMessage += ` and will take ${data["StationToStationInfos"][0].RailTime} minutes to reach ${this.endStation.Name}.`;
            tripTime += +data["StationToStationInfos"][0].RailTime;

            this.navCtrl.push(ArticlesPage, {
                tripMessage: tripMessage,
                tripTime: tripTime
            }); 
        });
    }
}
