import {Component} from '@angular/core';
import {Modal, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {StationsService} from '../../providers/stations-service/stations-service';

@Component({
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage {
    constructor(
        private navCtrl: NavController
    ) {}

    openModal(stationType) {
        let modal = Modal.create(StationsModal, { type: stationType });
        this.navCtrl.present(modal);
    }
}

@Component({
    templateUrl: 'build/pages/home/stations.modal.html',
    providers: [StationsService]
})

export class StationsModal {
    public stationType: any;
    public stations: any;
    public station: any;

    constructor(
        public platform: Platform,
        public params: NavParams,
        public stationsSvc: StationsService,
        public viewCtrl: ViewController 
    ) {
        // stationType is either "start" or "end"
        this.stationType = this.params.get("type");

        this.loadStations();
    }

    loadStations() {
        this.stationsSvc.load()
        .then(data => {
            this.stations = data.Stations;
        });
    }

    getStation(evt) {
        let val = evt.target.value.toLowerCase();
        console.log('val', val);

        if (val && val.trim() !== '') {
            this.stations = this.stations.filter((s) => s.Name.toLowerCase().indexOf(val) > -1);
        } else {
            this.loadStations();
        }
    }

    setStation(station) {
        this.station = station;
        console.log(this.station);
        this.closeModal();        
    }

    closeModal() {
        this.viewCtrl.dismiss();
    }
}
