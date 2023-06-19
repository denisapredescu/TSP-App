import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResultRunDP } from '../models/ResultRunDP';
import { Observable } from 'rxjs';
import { ResultRunChistofides } from '../models/ResultRunChistofides';
import { ResultRunBB } from '../models/ResultRunBB';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  baseUrl: string = 'http://127.0.0.1:5000';

  httpOptions = {
    headers: new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json'),
  };

  private getOptions(input: any): any {
    const options: Object = {
     
      headers: new HttpHeaders()
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json'),
    
    };
    return options;
  }

  constructor(private httpClient: HttpClient) {}

  public getAlgoritmProgramareDinamica() {
    return this.httpClient.get<string>(`${this.baseUrl}/getCodeDynamicProgramming`);
  }

  public getAlgoritmBranchAndBound() {
    return this.httpClient.get<string>(`${this.baseUrl}/getCodeBranchAndBound`);
  }

  public getAlgoritmChristofides() {
    return this.httpClient.get<string>(`${this.baseUrl}/getCodeChristofides`);
  }

  public getDoubleTree() {
    return this.httpClient.get<string>(`${this.baseUrl}/getCodeDoubleTree`);
  }

  public getFarthestInsertion() {
    return this.httpClient.get<string>(`${this.baseUrl}/getCodeFarthestInsertion`);
  }

  public getNearestInsertion() {
    return this.httpClient.get<string>(`${this.baseUrl}/getCodeNearestInsertion`);
  }

  public getCheapestInsertion() {
    return this.httpClient.get<string>(`${this.baseUrl}/getCodeCheapestInsertion`);
  }

  public getNearestNeighbor() {
    return this.httpClient.get<string>(`${this.baseUrl}/getCodeNearestNeighbor`);
  }

  public getAlgoritm3OPT() {
    return this.httpClient.get<string>(`${this.baseUrl}/getCode3OPT`);
  }

  public getAlgoritm2OPT() {
    return this.httpClient.get<string>(`${this.baseUrl}/getCode2OPT`);
  }

  public getInputClass() {
    return this.httpClient.get<string>(`${this.baseUrl}/getCodeInputClass`);
  }

  public runDP(input: string, type: number): Observable<any> {
    const json = {
      "input": input, 
      "inputType": type
    };

    return this.httpClient.post<ResultRunDP>(
      `${this.baseUrl}/runCodeDynamicProgramming` ,
      JSON.stringify(json),
      this.httpOptions 
      );
  }

  public runBB(input: string, type: number) {
    const json = {
      "input": input, 
      "inputType": type
    };

    return this.httpClient.post<ResultRunBB>(
      `${this.baseUrl}/runCodeBranchAndBound` ,
      JSON.stringify(json),
      this.httpOptions 
      );
  }

  public runChristofides(input: string, type: number, algorithm: string, noRepetitions: number) {
    const json = {
      "input": input, 
      "inputType": type,
      "algorithm" : algorithm,
      "noRepetitions": noRepetitions
    };
    return this.httpClient.post<ResultRunChistofides>(
      `${this.baseUrl}/runCodeChristofides` ,
      JSON.stringify(json),
      this.httpOptions 
      );
  }

  public runDoubleTree(input: string, type: number) {
    const json = {
      "input": input, 
      "inputType": type
    };
    return this.httpClient.post<ResultRunChistofides>(
      `${this.baseUrl}/runCodeDoubleTree` ,
      JSON.stringify(json),
      this.httpOptions 
      );
  }

  public runFarthestInsertion(input: string, type: number) {
    const json = {
      "input": input, 
      "inputType": type
    };

    return this.httpClient.post<string>(
      `${this.baseUrl}/runCodeFarthestInsertion` ,
      JSON.stringify(json),
      this.httpOptions 
      );
  }

  public runNearestInsertion(input: string, type: number) {
    const json = {
      "input": input, 
      "inputType": type
    }; 

    return this.httpClient.post<string>(
      `${this.baseUrl}/runCodeNearestInsertion` ,
      JSON.stringify(json),
      this.httpOptions 
    );
  }

  public runCheapestInsertion(input: string, type: number) {
    const json = {
      "input": input, 
      "inputType": type
    };

    return this.httpClient.post<string>(
      `${this.baseUrl}/runCodeCheapestInsertion` ,
      JSON.stringify(json),
      this.httpOptions 
    );
  }

  public runNearestNeighbor(input: string, type: number) {
    const json = {
      "input": input, 
      "inputType": type
    };

    return this.httpClient.post<string>(
      `${this.baseUrl}/runCodeNearestNeighbor` ,
      JSON.stringify(json),
      this.httpOptions 
      );
  }

  public run2OPT(input: string, heuristicAlgorithm: string, type: number, noRepetitions: number) {
    const json = {
      "input": input, 
      "inputType": type,
      "algorithm" : heuristicAlgorithm,
      "noRepetitions": noRepetitions
    };
   
    return this.httpClient.post<string>(
      `${this.baseUrl}/runCode2OPT` ,
      JSON.stringify(json),
      this.httpOptions 
      );
  }

  public run3OPT(input: string, heuristicAlgorithm: string, type: number, noRepetitions: number) {
    const json = {
      "input": input, 
      "inputType": type,
      "algorithm" : heuristicAlgorithm,
      "noRepetitions": noRepetitions
    };
   
    return this.httpClient.post<string>(
      `${this.baseUrl}/runCode3OPT` ,
      JSON.stringify(json),
      this.httpOptions 
      );
  }
}
