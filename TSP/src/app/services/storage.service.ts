import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { NavbarElement } from '../models/NavbarElement';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  URL: string = '../assets/storage.json';;

  dynamicProgramming = "dynamic-programming";
  branchAndBound = "branch-and-bound";
  christofidesAlgorithm = "christofides-algorithm";
  doubleTreeAlgorithm = "double-tree-algorithm";
  farthestInsertion = "farthest-insertion";
  nearestInsertion = "nearest-insertion";
  cheapestInsertion = "cheapest-insertion";
  nearestNeighbor = "nearest-neighbor";
  twoOpt = "2-opt";
  threeOpt = "3-opt";
  inputClass = "input-class";

  constructor(
    private http: HttpClient
  ) { }

  getDynamicProgrammingName(): string {
    return this.dynamicProgramming;
  }

  getBranchAndBoundName(): string {
    return this.branchAndBound;
  }

  getChristofidesAlgorithmName(): string {
    return this.christofidesAlgorithm;
  }
  
  getDoubleTreeAlgorithmName(): string {
    return this.doubleTreeAlgorithm;
  }

  getFarthestInsertionName(): string {
    return this.farthestInsertion;
  }

  getNearestInsertionName(): string {
    return this.nearestInsertion;
  }

  getCheapestInsertionName(): string {
    return this.cheapestInsertion;
  }

  getNearestNeighborName(): string {
    return this.nearestNeighbor;
  }

  getTwoOptName(): string {
    return this.twoOpt;
  }

  getThreeOptName(): string {
    return this.threeOpt;
  }

  getInputClassName(): string {
    return this.inputClass;
  }

  getVariations(): Observable<any> {
    return this.http.get<any>(this.URL).pipe(
      map(x => x["variations"])
    );
  }

  getApproximationAlg(): Observable<any> {
    return this.http.get<any>(this.URL).pipe(
      map(x => x["approximation-algorithms"])
    );
  }

  getNavbar(): Observable<NavbarElement[]> {
    return this.http.get<any>(this.URL).pipe(
      map(x => x["navbar"])
    );
  }
}
