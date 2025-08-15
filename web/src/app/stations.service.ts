// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import station_json from './stations.json';

@Injectable({
  providedIn: 'root'
})
export class StationsService {
  // private http = inject(HttpClient);
  getStationScore(): Observable<number[]> {
    const ret: number[] = [];
    Object.entries(station_json).forEach(([id, score]) => {
      ret[parseInt(id)] = score;
    });
    return of(ret);
    // return this.http.get<Record<string, number>>(env.api.getStations).pipe(timeout(env.api.timeout), map((val: Record<string, number>) => {
    //   console.log(val);
    //   const ret: number[] = [];
    //   Object.entries(val).forEach(([id, score]) => {
    //     ret[parseInt(id)] = score;
    //   });
    //   return ret;
    // }),
    //   catchError((error) => {
    //     console.error('fetching error', error);
    //     const ret: number[] = [];
    //     for (let i = 0; i < env.station.maxStationID + 1; i++) {
    //       ret.push(0);
    //     }
    //     return of(ret);
    //   }));
  }
}
