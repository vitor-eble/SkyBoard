import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { map as Map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SkyblockService {

  private apiKey: string = environments.hypixelApiKey;

  constructor(private http: HttpClient) { }

  getUUID(nickname: string){
    return this.http.get<any>(`htps://playerdb.co/api/player/minecraft/${nickname}`)
      .pipe(
        Map((res: any) => res.data.player.raw_id)
      )
  }

  getSkyblockProfile(uuid: string) {
    return this.http.get<any>(`https://api.hypixel.net/skyblock/profiles?uuid=${uuid}&key=${this.apiKey}`)
  }
}
