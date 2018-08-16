import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Song} from '../../models/song.interface';

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {

    constructor(public firestore: AngularFirestore) {
    }

    createSong(albumName: string,
               artistName: string,
               songDescription: string,
               songName: string): Promise<void> {
        const id = this.firestore.createId();

        return this.firestore.doc(`songList/${id}`).set({
            id,
            albumName,
            artistName,
            songDescription,
            songName,
        });
    }

    getSongList(): AngularFirestoreCollection<Song> {
        return this.firestore.collection(`songList`);
    }
}
