import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SkyblockService {
  private apiKey: string = environments.hypixelApiKey;

  constructor(private http: HttpClient) {}

  getUUID(nickname: string) {
    return this.http
      .get<any>(`https://playerdb.co/api/player/minecraft/${nickname}`)
      .pipe(map((res: any) => res.data.player.raw_id));
  }

  getSkyblockProfile(uuid: string) {
    console.log('API Key:', this.apiKey);

    const headers = new HttpHeaders()
      .set('API-Key', this.apiKey)
      .set('Content-Type', 'application/json');

    console.log('Headers:', headers);
    console.log(
      'URL:',
      `https://api.hypixel.net/v2/skyblock/profiles?uuid=${uuid}`
    );

    return this.http
      .get<any>(`https://api.hypixel.net/v2/skyblock/profiles?uuid=${uuid}`, {
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
