import {Component} from '@angular/core';
import {Modal, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {StationsService} from '../../providers/stations-service/stations-service';

@Component({
    templateUrl: 'build/components/stations-modal/stations-modal.html',
    providers: [StationsService]
})

export class StationsModal {
    public colorsMap: any;
    public stationType: any;
    public stations: any;
    public station: any;

    constructor(
        public params: NavParams,
        public platform: Platform,
        public stationsSvc: StationsService,
        public viewCtrl: ViewController 
    ) {
        // stationType is either "start" or "end"
        this.stationType = this.params.get("type");
        this.colorsMap = {
          "BL": "blue",
          "GR": "green",
          "OR": "orange",
          "RD": "red",
          "SV": "gray",
          "YL": "yellow" 
        };

        this.loadStations();
    }

    loadStations() {
        this.stationsSvc.load()
        .then(data => {
            this.stations = data;
        });
    }

    getStation(evt) {
        let val = evt.target.value.toLowerCase();

        if (val && val.trim() !== '') {
            this.stations = this.stations.filter((s) => s.Name.toLowerCase().indexOf(val) > -1);
        } else {
            this.loadStations();
        }
    }

    setStation(station) {
        this.station = station;
        this.closeModal();        
    }

    closeModal() {
        this.viewCtrl.dismiss({ 
            station: this.station,
            stationType: this.stationType
        });
    }
}
