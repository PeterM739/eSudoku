import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PuzzleModel } from '../models/puzzle';

@Injectable({
  providedIn: 'root'
})
export class SudokuService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public getPuzzle(difficulty: number) {
    let params = new HttpParams();
    params.append('difficulty', difficulty)
    console.log(this.http.get<PuzzleModel>(this.baseUrl + 'generate', { params }))

    return this.http.get<PuzzleModel>(this.baseUrl + 'generate', { params })
  }

  public getTest() {
    const test:PuzzleModel = {
      solution: [
        [7,4,2,3,4,5,6,8,9],
        [3,4,5,6,8,9,1,2,7],
        [6,8,9,1,2,7,3,4,5],
        [1,2,3,4,5,6,7,9,8],
        [4,5,6,7,9,8,2,1,3],
        [8,9,7,2,1,3,4,5,6],
        [2,3,8,5,6,1,9,7,4],
        [5,6,1,9,7,4,8,3,2],
        [9,7,4,8,3,2,5,6,1]
      ],
      grid: [
        [0,4,2,3,4,5,6,8,0],
        [3,4,5,6,8,9,1,2,7],
        [6,8,9,1,2,7,3,4,5],
        [1,2,3,4,5,6,7,9,8],
        [4,5,6,7,9,8,2,1,3],
        [8,9,7,2,1,3,4,5,6],
        [2,3,8,5,6,1,9,7,4],
        [5,6,1,9,7,4,8,3,2],
        [9,7,4,8,3,2,5,6,1]
      ]
    };
    const observableResponse: Observable<PuzzleModel> = of(test);
    
    return observableResponse
  }
}
