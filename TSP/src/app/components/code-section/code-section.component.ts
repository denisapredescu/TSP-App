import { Component, Input, ViewChild } from '@angular/core';
import { CodeModel } from '@ngstack/code-editor';
import Graph from 'graphology';
import Sigma from 'sigma';
import { ResultRunDP } from 'src/app/models/ResultRunDP';
import { AppService } from 'src/app/services/app.service';
import { ResultRunBB } from 'src/app/models/ResultRunBB';
import { ResultRunChistofides } from 'src/app/models/ResultRunChistofides';
import { StorageService } from 'src/app/services/storage.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-code-section',
  templateUrl: './code-section.component.html',
  styleUrls: ['./code-section.component.scss']
})
export class CodeSectionComponent {
  @Input() currentSubsection: string = "";
  code: string = "";

  model: CodeModel = {
    language: 'python',
    uri: "main.py",
    value: '',
    dependencies: [
      '@types/node', 
      '@ngstack/translate', 
      '@ngstack/code-editor'
    ]
  };

  readOnly: boolean = true;
  options = {
    lineNumbers: true,
    contextmenu: true,
    minimap: {
      enabled: true
    }
  };

  dynamicProgramming: string = "";
  branchAndBound: string = "";
  christofidesAlgorithm: string = "";
  doubleTreeAlgorithm: string = "";
  farthestInsertion: string = "";
  nearestInsertion: string = "";
  cheapestInsertion: string = "";
  nearestNeighbor: string = "";
  twoOpt: string = "";
  threeOpt: string = "";
  inputClass: string = ""

  constructor(
    private appService: AppService,
    private storage: StorageService
  ) {
    this.dynamicProgramming = this.storage.getDynamicProgrammingName();
    this.branchAndBound = this.storage.getBranchAndBoundName();
    this.christofidesAlgorithm = this.storage.getChristofidesAlgorithmName();
    this.doubleTreeAlgorithm = this.storage.getDoubleTreeAlgorithmName();
    this.farthestInsertion = this.storage.getFarthestInsertionName();
    this.nearestInsertion = this.storage.getNearestInsertionName();
    this.cheapestInsertion = this.storage.getCheapestInsertionName();
    this.nearestNeighbor = this.storage.getNearestNeighborName();
    this.twoOpt = this.storage.getTwoOptName();
    this.threeOpt = this.storage.getThreeOptName();
    this.inputClass = this.storage.getInputClassName();
  }

  ngOnInit(): void {
    if (this.currentSubsection === this.dynamicProgramming) {
      this.model.uri = this.dynamicProgramming + ".py";
      this.getDP(); 
    } else if (this.currentSubsection === this.branchAndBound) {
      this.model.uri = this.branchAndBound + ".py";   // the uri has to be different from the one from the DP model
      this.getBB();
    } else if (this.currentSubsection === this.christofidesAlgorithm) { 
      this.model.uri = this.christofidesAlgorithm + ".py";  
      this.getChristofides();
    }  else if (this.currentSubsection === this.doubleTreeAlgorithm) { 
      this.model.uri = this.doubleTreeAlgorithm + ".py";  
      this.getDoubleTree();
    } else if (this.currentSubsection === this.farthestInsertion) {   
      this.model.uri = this.farthestInsertion + ".py";
      this.getFarthestInsertion();
    } else if (this.currentSubsection === this.nearestInsertion) {   
      this.model.uri = this.nearestInsertion + ".py";
      this.getNearestInsertion();
    } else if (this.currentSubsection === this.cheapestInsertion) { 
      this.model.uri = this.cheapestInsertion + ".py";  
      this.getCheapestInsertion();
    } else if (this.currentSubsection === this.nearestNeighbor) {   
      this.model.uri = this.nearestNeighbor + ".py";
      this.getNearestNeighbor();
    } else if (this.currentSubsection === this.twoOpt) {  
      this.model.uri = this.twoOpt + ".py"; 
      this.get2Opt();
    } else if (this.currentSubsection === this.threeOpt) {  
      this.model.uri = this.threeOpt + ".py"; 
      this.get3Opt();
    } else if (this.currentSubsection === this.inputClass) {  
      this.model.uri = this.inputClass + ".py"; 
      this.getInputClass();
    } 
  }

  getDP(): void {
    this.appService.getAlgoritmProgramareDinamica().subscribe(
      (response) => {
        this.code = response;
        var newCode = {
          language: 'python',
          value: this.code,
          uri: 'runner_code.py',
          dependencies: [
              '@types/node',
              '@ngstack/translate',
              '@ngstack/code-editor'
          ],
        };
        this.model = JSON.parse(JSON.stringify(newCode));
      }, (error) => { 
        this.code = "Cod Indisponibil";
      });
  }

  getBB(): void {
    this.appService.getAlgoritmBranchAndBound().subscribe(
      (response) => {
        this.code = response;
        var uri = this.branchAndBound + ".py";
        var newCode = {
          language: 'python',
          value: this.code,
          uri: uri,
          dependencies: [
              '@types/node',
              '@ngstack/translate',
              '@ngstack/code-editor'
          ],
        };
        this.model = JSON.parse(JSON.stringify(newCode));
      }, (error) => { 
        this.code = "Cod Indisponibil";
      });
  }

  getChristofides(): void {
    this.appService.getAlgoritmChristofides().subscribe(
      (response) => {
        this.code = response;
        var newCode = {
          language: 'python',
          value: this.code,
          uri: 'main.py',
          dependencies: [
              '@types/node',
              '@ngstack/translate',
              '@ngstack/code-editor'
          ],
        };
        this.model = JSON.parse(JSON.stringify(newCode));
      }, (error) => { 
        this.code = "Cod Indisponibil";
      });
  }

  getDoubleTree(): void {
    this.appService.getDoubleTree().subscribe(
      (response) => {
        this.code = response;
        var uri = this.doubleTreeAlgorithm + ".py";
        var newCode = {
          language: 'python',
          value: this.code,
          uri: uri,
          dependencies: [
              '@types/node',
              '@ngstack/translate',
              '@ngstack/code-editor'
          ],
        };
        this.model = JSON.parse(JSON.stringify(newCode));
      }, (error) => { 
        this.code = "Cod Indisponibil";
      });
  }
  
  getFarthestInsertion() : void {
    this.appService.getFarthestInsertion().subscribe(
      (response) => {

        this.code = response;
        var uri = this.farthestInsertion + '.py';
        var newCode = {
          language: 'python',
          value: this.code,
          uri: uri,
          dependencies: [
              '@types/node',
              '@ngstack/translate',
              '@ngstack/code-editor'
          ],
        };
        this.model = JSON.parse(JSON.stringify(newCode));
      }, (error) => { 
        this.code = "Cod Indisponibil";
      });
  }

  getNearestInsertion(): void {
    this.appService.getNearestInsertion().subscribe(
      (response) => {

        this.code = response;
        var uri = this.nearestInsertion + '.py'
        var newCode = {
          language: 'python',
          value: this.code,
          uri: uri,
          dependencies: [
              '@types/node',
              '@ngstack/translate',
              '@ngstack/code-editor'
          ],
        };
        this.model = JSON.parse(JSON.stringify(newCode));
      }, (error) => { 
        this.code = "Cod Indisponibil";
      });
  }

  getCheapestInsertion(): void {
    this.appService.getCheapestInsertion().subscribe(
      (response) => {

        this.code = response;
        var uri = 'dadadadad.py'
        var newCode = {
          language: 'python',
          value: this.code,
          uri: uri,
          dependencies: [
              '@types/node',
              '@ngstack/translate',
              '@ngstack/code-editor'
          ],
        };
        this.model = JSON.parse(JSON.stringify(newCode));
      }, (error) => { 
        this.code = "Cod Indisponibil";
      });
  }

  getNearestNeighbor(): void {
    this.appService.getNearestNeighbor().subscribe(
      (response) => {

        this.code = response;
        var uri = this.nearestNeighbor + '.py'
        var newCode = {
          language: 'python',
          value: this.code,
          uri: uri,
          dependencies: [
              '@types/node',
              '@ngstack/translate',
              '@ngstack/code-editor'
          ],
        };
        this.model = JSON.parse(JSON.stringify(newCode));
      }, (error) => { 
        this.code = "Cod Indisponibil";
      });
  }

  get2Opt(): void {
    this.appService.getAlgoritm2OPT().subscribe(
      (response) => {

        this.code = response;
        var uri = this.twoOpt + '.py'
        var newCode = {
          language: 'python',
          value: this.code,
          uri: uri,
          dependencies: [
              '@types/node',
              '@ngstack/translate',
              '@ngstack/code-editor'
          ],
        };
        this.model = JSON.parse(JSON.stringify(newCode));
      }, (error) => { 
        this.code = "Cod Indisponibil";
      });
  }

  get3Opt(): void {
    this.appService.getAlgoritm3OPT().subscribe(
      (response) => {

        this.code = response;
        var uri = this.threeOpt + '.py'
        var newCode = {
          language: 'python',
          value: this.code,
          uri: uri,
          dependencies: [
              '@types/node',
              '@ngstack/translate',
              '@ngstack/code-editor'
          ],
        };
        this.model = JSON.parse(JSON.stringify(newCode));
      }, (error) => { 
        this.code = "Cod Indisponibil";
      });
  }

  getInputClass(): void {
    this.appService.getInputClass().subscribe(
      (response) => {

        this.code = response;
        var uri = this.inputClass + '.py'
        var newCode = {
          language: 'python',
          value: this.code,
          uri: uri,
          dependencies: [
              '@types/node',
              '@ngstack/translate',
              '@ngstack/code-editor'
          ],
        };
        this.model = JSON.parse(JSON.stringify(newCode));
      }, (error) => { 
        this.code = "Cod Indisponibil";
      });
  }
  
  
}
