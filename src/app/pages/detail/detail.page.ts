import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Song} from '../../models/song.interface';
import {FirestoreService} from '../../services/data/firestore.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.page.html',
    styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

    public song: Observable<Song>;

    constructor(private firestoreService: FirestoreService,
                private route: ActivatedRoute,
                private alertController: AlertController,
                private router: Router) {
    }

    ngOnInit() {
        const songId = this.route.snapshot.paramMap.get('id');
        this.song = this.firestoreService.getSongDetail(songId).valueChanges();
    }

    async deleteSong() {
        const songId = this.route.snapshot.paramMap.get('id');
        const alert = await this.alertController.create({
            message: 'Are you sure you want to delete the song?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'Cancel',
                    handler: blah => {
                        console.log('Confirm Cancel: blah');
                    }
                },
                {
                    text: 'Okay',
                    handler: () => {
                        this.firestoreService.deleteSong(songId).then(() => {
                            this.router.navigateByUrl('');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }

}
