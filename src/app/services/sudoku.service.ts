import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    params = params.append('difficulty', difficulty)

    return this.http.get<PuzzleModel>(this.baseUrl + 'generate', { params })
  }

}
