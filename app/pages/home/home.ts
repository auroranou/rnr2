import {Component} from '@angular/core';
import {Modal, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {StationsModal} from '../../components/stations-modal/stations-modal';
import {StationsService} from '../../providers/stations-service/stations-service';

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

        let start = this.startStation.Code;
        let end = this.endStation.Code;
        let tripTime = `The next train from ${this.startStation.Name} leaves `;
 
        this.stationsSvc.getNextTrain(start)
        .then(data => {
            if (data["Trains"].length && data["Trains"][0].Min) {
                tripTime += data["Trains"][0].Min === 'BRD' ? 'now' : `in ${data["Trains"][0].Min} minutes`;
           }

            return this.stationsSvc.getTripInformation(start, end);
        }).then(data => {
            tripTime += ` and will take ${data["StationToStationInfos"][0].RailTime} minutes to reach ${this.endStation.Name}.`;
            console.log(tripTime);
        });
    }
}
