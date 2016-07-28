import {Component} from '@angular/core';
import {Modal, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {StationsModal} from './components/stations-modal/stations-modal';
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
                this.getNextTrain(data.station.Code);
            } else if (typeof data.station !== undefined && data.stationType === 'end') {
                this.endStation = data.station;
            }
            console.log('returned data: ', data);
        });

        this.navCtrl.present(modal);
    }

    getNextTrain(stationCode) {
        this.stationsSvc.getNextTrain(stationCode)
        .then(data => {
            console.log(data);
        });
    }
}

