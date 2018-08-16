import {Component, OnInit} from '@angular/core';
import {FirestoreService} from '../services/data/firestore.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    public songList;

    constructor(private fireStoreService: FirestoreService,
                private router: Router) {
    }

    ngOnInit() {
        this.songList = this.fireStoreService.getSongList().valueChanges();

    }


}
