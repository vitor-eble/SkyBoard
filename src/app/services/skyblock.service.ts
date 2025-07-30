import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SkyblockService {

  constructor(private http: HttpClient) {}

  getUUID(nickname: string) {
    return this.http
      .get<any>(`https://playerdb.co/api/player/minecraft/${nickname}`)
      .pipe(map((res: any) => res.data.player.raw_id));
  }

  getSkyblockProfile(uuid: string) {
    const headers = new HttpHeaders({
      'API-Key': environments.hypixelApiKey,
    });

    return this.http
      .get<any>(`/api/hypixel?uuid=${uuid}`, {
        headers,
        observe: 'response',
      })
      .pipe(
        map((response) => {
          console.log('Response headers:', response.headers.keys());
          console.log('Full response:', response);
          return response.body;
        })
      );
  }
}
