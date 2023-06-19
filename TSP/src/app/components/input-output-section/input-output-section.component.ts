import { Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import Graph from 'graphology';
import Sigma from 'sigma';
import { ResultRunBB } from '../../models/ResultRunBB';
import { ResultRunChistofides } from '../../models/ResultRunChistofides';
import { ResultRunDP } from '../../models/ResultRunDP';
import { CodeModel } from '@ngstack/code-editor';
import { MatPaginator } from '@angular/material/paginator';
import { AppService } from '../../services/app.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-input-output-section',
  templateUrl: './input-output-section.component.html',
  styleUrls: ['./input-output-section.component.scss']
})
export class InputOutputSectionComponent {
  @ViewChild('paginator')
  paginator!: MatPaginator;

  dynamicProgramming: string = "";
  branchAndBound: string = "";
  christofidesAlgorithm: string = "";
  farthestInsertion: string = "";
  nearestInsertion: string = "";
  cheapestInsertion: string = "";
  nearestNeighbor: string = "";
  twoOpt: string = "";
  threeOpt: string = "";
  doubleTreeAlgorithm: string = "";

  chooseAlgorithm: string;

  @Input() currentSubsection: string = "";

  solution: any = 'initial-text';
  isShownInput: boolean = false;


  dataMatTableWithPagination: MatTableDataSource<any[]> = new MatTableDataSource<any>([]);

  graph = new Graph();

  container: any;
  renderer: any;  

  responseDP: ResultRunDP =  {
    solution: -1,
    n: 0,
    finalStep: [],
    cycle: [], 
    matrix:[]
  };

  responseBB: ResultRunBB = {
    solution: -1,
    cycle: [],
    steps: []
  };
  responseChistofides: ResultRunChistofides = {
    solution: -1,
    tree: [],
    odd_nodes: [],
    matching_edges: [],
    cycle: []
  }

  responseHeuristics: any = {
    "solution": -1,
    "cycle": []
  };

  responseOptimizationAlgorithm:  any = {
    "solution": -1,
    "cycle": [],
    "steps": [[]]
  }
 
  columns: Array<string> = [" "];

  ok: boolean = false;
  carousel: any;
  hasResponse: boolean = false;
  error: boolean = false;

  constructor(
    private appService: AppService,
    private storage: StorageService
  ) {
    this.dynamicProgramming = this.storage.getDynamicProgrammingName();
    this.branchAndBound = this.storage.getBranchAndBoundName();
    this.christofidesAlgorithm = this.storage.getChristofidesAlgorithmName();
    this.farthestInsertion = this.storage.getFarthestInsertionName();
    this.nearestInsertion = this.storage.getNearestInsertionName();
    this.cheapestInsertion = this.storage.getCheapestInsertionName();
    this.nearestNeighbor = this.storage.getNearestNeighborName();
    this.twoOpt = this.storage.getTwoOptName();
    this.threeOpt = this.storage.getThreeOptName();
    this.doubleTreeAlgorithm = this.storage.getDoubleTreeAlgorithmName();

    this.chooseAlgorithm = this.farthestInsertion;
  }

  ngOnInit(): void {
    if (this.currentSubsection === this.christofidesAlgorithm) { 
      this.chooseAlgorithm = "greedy-matching";
    } 
  }

  ngAfterViewInit() {
    this.dataMatTableWithPagination.paginator = this.paginator;
  }

  runCode(input: string): void {
    this.hasResponse = true;
    this.solution = -1;
    this.error = false;

    if (input === "") {
      this.solution = "insert-data";
      this.hasResponse = false;
      this.error = true;
    } else {
      if (this.currentSubsection === this.dynamicProgramming) { 
        this.runDP(input);
      } else if (this.currentSubsection === this.branchAndBound) {
        this.runBB(input);
      } else if (this.currentSubsection === this.christofidesAlgorithm) {
        this.runChristofides(input);
      } else if (this.currentSubsection === this.doubleTreeAlgorithm) {
        this.runDoubleTree(input);
      } else if (this.currentSubsection === this.farthestInsertion) {   
        this.runFarthestInsertion(input);
      } else if (this.currentSubsection === this.nearestInsertion) {   
        this.runNearestInsertion(input);
      } else if (this.currentSubsection === this.cheapestInsertion) { 
        this.runCheapestInsertion(input);
      } else if (this.currentSubsection === this.nearestNeighbor) {   
        this.runNearestNeighbor(input);
      } else if (this.currentSubsection === this.twoOpt) {  
        this.run2OPT(input);
      } else if (this.currentSubsection === this.threeOpt) { 
        this.run3OPT(input);
      } 
    }
  }

  runDP(input: string) {
    this.columns = [" "];
    this.responseDP.solution = -1;
    this.solution = -1;
  
    if (this.graph.size!=0) {
      this.cleanGraph(this.graph);
      this.renderer.refresh();
    }

    this.appService.runDP(input, Number(this.inputType)).subscribe(
      (response) => {
    
        this.responseDP.solution = response[0];
        this.responseDP.n = response[1];
        this.responseDP.finalStep = response[2];
        this.responseDP.cycle = response[3];
        this.responseDP.matrix = response[4];

        if (this.responseDP.solution != -1) {
          this.solution = this.responseDP.solution;

          this.dataMatTableWithPagination = new MatTableDataSource(this.responseDP.finalStep);
          this.dataMatTableWithPagination.paginator = this.paginator;

          for(var i = 0; i < this.responseDP.n ; i++) {
            this.columns.push(String(i));
          }

          this.container = document.getElementById("graph") ?? new HTMLElement();
          this.container.innerHTML= "";

          this.renderer = new Sigma(this.graph, this.container, {
            renderEdgeLabels: true,
            allowInvalidContainer: true
          }); 
      
          this.createNodes(this.graph,  this.responseDP.n);
          this.createCycle(this.graph, this.responseDP.cycle, this.responseDP.matrix);
          this.renderer.refresh();

        } else {
          this.hasResponse = false;
          this.solution = "no-solution";
        }
      }, (error) => {
        this.hasResponse = false;
        this.error = true;
        this.solution = error.error;
      }
    );
  }

  createNodes(graph: Graph, n: number) {
    for (var node = 0; node < n; node++) {
      console.log(node);
      graph.addNode(node, {size: 15, label: node, labelSize: 'proportional', color: "grey"});
    }

    graph.nodes().forEach((node, i) => {
      const angle = (i * 2 * Math.PI) /  graph.order;
      graph.setNodeAttribute(node, "x", 100 * Math.cos(angle));
      graph.setNodeAttribute(node, "y", 100 * Math.sin(angle));
    }); 

  }

  createCycle(graph: Graph, cycle: Array<number>, data: Array<Array<number>> = []) {
    for(var i = 0; i < cycle.length - 1; i++) {
      if (data.length !== 0) {
        graph.addEdge(cycle[i], cycle[i +  1], { 
          type: "arrow",
          label: data[cycle[i]][cycle[i + 1]], 
          size: 5,
          color: "orange"
        });
      } else {
        graph.addEdge(cycle[i], cycle[i +  1], { 
          type: "arrow",
          size: 5,
          color: "orange"
        });
      }
    }   
  }

  createEdges(graph: Graph, color: string, edges: Array<Array<number>> = []) {
    edges.forEach( (edge: unknown[]) => {
      graph.addEdge(edge[0], edge[1], { 
        type: "line",
        size: 5,
        color: color
      });  
    }); 
  }

  cleanGraph(graph: Graph) {
    graph.clear();
  }

  highlight(graph: Graph, nodes: Array<number>) {
    nodes.forEach(node => {
      graph.updateNodeAttribute(node, "color", color => "orange");
    });
  }

  runBB(input: string): void {
    this.columns = [" "];
    this.responseBB.solution = -1;
    this.solution = -1;
    if (this.graph.size != 0) {
      this.cleanGraph(this.graph);
      this.renderer.refresh();
    }
  
    this.appService.runBB(input, Number(this.inputType)).subscribe(
      (response: any) => {
        
        this.responseBB.solution = response[0];
    
        if (this.responseBB.solution !== -1) {
          this.solution = this.responseBB.solution;
          this.responseBB.cycle = response[1];
          this.responseBB.steps = response[2];
          
          for(var i = 0; i < this.responseBB.cycle.length - 1; i++) {
            this.columns.push(String(i));
          }
       
          this.container = document.getElementById("graph-bb") ?? new HTMLElement();
          this.container.innerHTML= "";
  
          this.renderer = new Sigma(this.graph, this.container, {
            renderEdgeLabels: true,
            allowInvalidContainer: true
          }); 
  
          this.createNodes(this.graph,  this.responseBB.cycle.length - 1);
          this.createCycle(this.graph, this.responseBB.cycle, this.responseBB.steps[0][2]);
          this.renderer.refresh();

        } else {
          this.hasResponse = false;
          this.solution = "no-solution";
        }
      }, (error) => {
        this.hasResponse = false;
        console.log(error);
        this.solution = error.error;
        this.error = true;
      }
    );
  } 

  graphChristofidesTree = new Graph();
  graphChristofidesOddNodes = new Graph();
  graphChristofidesMatching = new Graph();

  rendererTree: any;
  rendererOddNodes: any;
  rendererMatching: any;

  containerTree: any;
  containerOddNodes: any;
  containerMatching: any;
  
  runChristofides(input: string): void {
    this.responseChistofides.solution = -1;
    this.solution = -1;
    if (this.graph.size != 0) {
      this.cleanGraph(this.graph);
      this.renderer.refresh();
      this.cleanGraph(this.graphChristofidesTree);
      this.rendererTree.refresh();
      this.cleanGraph(this.graphChristofidesMatching);
      this.rendererMatching.refresh();
      this.cleanGraph(this.graphChristofidesOddNodes);
      this.rendererOddNodes.refresh();
    }

    this.appService.runChristofides(input, Number(this.inputType), this.chooseAlgorithm, Number(this.repetitions)).subscribe(
      (response: any) => {

        this.responseChistofides.solution = response[0];
        this.responseChistofides.tree = response[1];
        this.responseChistofides.odd_nodes = response[2];
        this.responseChistofides.matching_edges = response[3];
        this.responseChistofides.cycle = response[4];
      
        if (this.responseChistofides.solution !== -1) {
          this.solution = response[0];
  
          this.container = document.getElementById("graph-christofides") ?? new HTMLElement();
          this.containerTree = document.getElementById("graph-tree") ?? new HTMLElement();
          this.containerOddNodes = document.getElementById("graph-odd-nodes") ?? new HTMLElement();
          this.containerMatching = document.getElementById("graph-matching") ?? new HTMLElement();
                
          this.container.innerHTML= "";
          this.containerTree.innerHTML= "";
          this.containerOddNodes.innerHTML= "";
          this.containerMatching.innerHTML= "";
  
          this.renderer = new Sigma(this.graph, this.container, {
            renderEdgeLabels: true,
            allowInvalidContainer: true,
          });
          this.rendererTree = new Sigma(this.graphChristofidesTree, this.containerTree, {
            renderEdgeLabels: true,
            allowInvalidContainer: true,
          });
          this.rendererOddNodes = new Sigma(this.graphChristofidesOddNodes, this.containerOddNodes, {
            renderEdgeLabels: true,
            allowInvalidContainer: true,
          });
          this.rendererMatching = new Sigma(this.graphChristofidesMatching, this.containerMatching, {
            renderEdgeLabels: true,
            allowInvalidContainer: true,
          }); 
  
          this.createNodes(this.graph,  this.responseChistofides.cycle.length - 1);
          this.createNodes(this.graphChristofidesTree,  this.responseChistofides.cycle.length - 1);
          this.createNodes(this.graphChristofidesOddNodes,  this.responseChistofides.cycle.length - 1);
          this.createNodes(this.graphChristofidesMatching,  this.responseChistofides.cycle.length - 1);
         
          this.createCycle(this.graph, this.responseChistofides.cycle);
          this.renderer.refresh();

          this.createEdges(this.graphChristofidesTree, "grey", this.responseChistofides.tree);
          this.rendererTree.refresh();
          this.createEdges(this.graphChristofidesOddNodes, "grey", this.responseChistofides.tree);
          this.rendererOddNodes.refresh();
          this.createEdges(this.graphChristofidesMatching, "grey", this.responseChistofides.tree);
          this.rendererMatching.refresh();
 
          this.highlight(this.graphChristofidesOddNodes, this.responseChistofides.odd_nodes);
          this.rendererOddNodes.refresh();
         
          this.highlight(this.graphChristofidesMatching, this.responseChistofides.odd_nodes);
          this.rendererMatching.refresh();

          this.createEdges(this.graphChristofidesMatching, "orange", this.responseChistofides.matching_edges);
          this.rendererMatching.refresh();
          
        } else {
          this.hasResponse = false;
        }

      }, (error) => {
        console.log(error);
        // this.solution = ["Nu se poate oferi o solutie"];
        this.solution = error.error;
        this.hasResponse = false;
        this.error = true;
      }
    );
  }

  responseDoubleTree : any = {
    "solution": -1,
    "tree": [],
    "cycle": []
  }
  graphDoubleTreeCycle = new Graph();
  graphDoubleTreePrim = new Graph();
  containerDoubleTreeCycle: any;
  containerDoubleTreePrim: any;

  runDoubleTree(input: string): void {
    this.responseDoubleTree.solution = -1;
    this.solution = -1;

    if (this.graphDoubleTreeCycle.size != 0) {
      this.cleanGraph(this.graphDoubleTreeCycle);
      this.renderer.refresh();
      this.cleanGraph(this.graphDoubleTreePrim);
      this.rendererTree.refresh();
    } 
    this.appService.runDoubleTree(input, Number(this.inputType)).subscribe(
      (response: any) => {
        this.responseDoubleTree.solution = response[0];
        this.responseDoubleTree.tree = response[1];
        this.responseDoubleTree.cycle = response[2];

        if (this.responseDoubleTree.solution !== -1) {
          this.solution = response[0];
  
          this.containerDoubleTreeCycle = document.getElementById("graph-double-tree") ?? new HTMLElement();
          this.containerDoubleTreePrim = document.getElementById("graph-double-tree-prim") ?? new HTMLElement();

          this.containerDoubleTreeCycle.innerHTML= "";
          this.containerDoubleTreePrim.innerHTML= "";
        
          this.renderer = new Sigma(this.graphDoubleTreeCycle, this.containerDoubleTreeCycle, {
            renderEdgeLabels: true,
            allowInvalidContainer: true,
          });
          this.rendererTree = new Sigma(this.graphDoubleTreePrim, this.containerDoubleTreePrim, {
            renderEdgeLabels: true,
            allowInvalidContainer: true,
          });

          this.createNodes(this.graphDoubleTreeCycle,  this.responseDoubleTree.cycle.length - 1);
          this.createNodes(this.graphDoubleTreePrim,  this.responseDoubleTree.cycle.length - 1);
         
          this.createCycle(this.graphDoubleTreeCycle, this.responseDoubleTree.cycle);
          this.renderer.refresh();

          this.createEdges(this.graphDoubleTreePrim, "grey", this.responseDoubleTree.tree);
          this.rendererTree.refresh();
        } else {
          this.hasResponse = false;
        }
      }, (error) => {
        console.log(error);
        this.solution = error.error;
        this.hasResponse = false;
        this.error = true;
      }
    );
  }

  runFarthestInsertion(input: string): void {
    this.responseHeuristics.solution = -1;
    this.solution = -1;
    if (this.graph.size != 0) {
      this.cleanGraph(this.graph);
      this.renderer.refresh();
    }

    this.appService.runFarthestInsertion(input,  Number(this.inputType)).subscribe(
      (response: any) => {
        this.solution = response[1];

        this.responseHeuristics.solution = response[1];
        this.responseHeuristics.cycle = [...response[0], ...[response[0][0]]];

        this.container = document.getElementById("graph-farthest-insertion") ?? new HTMLElement();
        this.container.innerHTML= "";

        this.renderer = new Sigma(this.graph, this.container, {
          renderEdgeLabels: true,
          allowInvalidContainer: true,
        });

        this.createNodes(this.graph, this.responseHeuristics.cycle.length - 1);
        this.createCycle(this.graph, this.responseHeuristics.cycle);
        this.renderer.refresh();

      }, (error) => {
        this.hasResponse = false;
        console.log(error);
        this.solution = error.error;
        this.error = true;
      }
    );
  }

  runNearestInsertion(input: string): void {
    this.solution = -1;
    this.responseHeuristics.solution = -1;

    if (this.graph.size != 0) {
      this.cleanGraph(this.graph);
      this.renderer.refresh();
    }

    this.appService.runNearestInsertion(input,  Number(this.inputType)).subscribe(
      (response: any) => {
        this.solution = response[1];

        this.responseHeuristics.solution = response[1];
        this.responseHeuristics.cycle = [...response[0], ...[response[0][0]]];

        this.container = document.getElementById("graph-nearest-insertion") ?? new HTMLElement();
        this.container.innerHTML= "";

        this.renderer = new Sigma(this.graph, this.container, {
          renderEdgeLabels: true,
          allowInvalidContainer: true,
        });

        this.createNodes(this.graph, this.responseHeuristics.cycle.length - 1);
        this.createCycle(this.graph, this.responseHeuristics.cycle);
        this.renderer.refresh();

      }, (error) => {
        this.hasResponse = false;
        console.log(error);
        this.solution = error.error;
        this.error = true;
      }
    );
  }

  runCheapestInsertion(input: string): void {
    this.responseHeuristics.solution = -1;
    this.solution = -1;
    if (this.graph.size != 0) {
      this.cleanGraph(this.graph);
      this.renderer.refresh();
    }

    this.appService.runCheapestInsertion(input,  Number(this.inputType)).subscribe(
      (response: any) => {
        this.solution = response[1];

        this.responseHeuristics.solution = response[1];
        this.responseHeuristics.cycle = [...response[0], ...[response[0][0]]];

        this.container = document.getElementById("graph-cheapest-insertion") ?? new HTMLElement();
        this.container.innerHTML= "";

        this.renderer = new Sigma(this.graph, this.container, {
          renderEdgeLabels: true,
          allowInvalidContainer: true,
        });

        this.createNodes(this.graph, this.responseHeuristics.cycle.length - 1);
        this.createCycle(this.graph, this.responseHeuristics.cycle);
        this.renderer.refresh();
      }, (error) => {
        this.hasResponse = false;
        console.log(error);
        this.solution = error.error;
        this.error = true;
      }
    );
  }

  runNearestNeighbor(input: string): void {
  
    this.responseHeuristics.solution = -1;
    this.solution = -1;
    if (this.graph.size != 0) {
      this.cleanGraph(this.graph);
      this.renderer.refresh();
    }

    this.appService.runNearestNeighbor(input,  Number(this.inputType)).subscribe(
      (response: any) => {
        this.solution = response[1];

        this.responseHeuristics.solution = response[1];
        this.responseHeuristics.cycle = [...response[0], ...[response[0][0]]];

        this.container = document.getElementById("graph-nearest-neighbor") ?? new HTMLElement();
        this.container.innerHTML= "";

        this.renderer = new Sigma(this.graph, this.container, {
          renderEdgeLabels: true,
          allowInvalidContainer: true,
        });

        this.createNodes(this.graph, this.responseHeuristics.cycle.length - 1);
        this.createCycle(this.graph, this.responseHeuristics.cycle);
        this.renderer.refresh();

      }, (error) => {
        this.hasResponse = false;
        console.log(error);
        this.solution = error.error;
        this.error = true;
      }
    );
  }

  graphShowCycle2 = new Graph();
  graphFirstOptimization2 = new Graph();

  rendererShowCycle2: any;
  rendererFirstOptimization2: any;

  containerShowCycle2: any;
  containerFirstOptimization2: any;

  run2OPT(input: string): void {
    this.responseOptimizationAlgorithm.solution = -1;
    this.solution = -1;
    if (this.graph.size != 0) {
      this.cleanGraph(this.graph);
      this.renderer.refresh();
      this.cleanGraph(this.graphShowCycle2);
      this.rendererShowCycle2.refresh();
    }

    if (this.graphFirstOptimization2.size != 0) {
      this.cleanGraph(this.graphFirstOptimization2);
      this.rendererFirstOptimization2.refresh();
    }

    this.appService.run2OPT(input, this.chooseAlgorithm,  Number(this.inputType), Number(this.repetitions)).subscribe(
      (response: any) => {
        this.solution = response[0];
        this.responseOptimizationAlgorithm.solution = response[0];
        this.responseOptimizationAlgorithm.cycle = [...response[1], ...[response[1][0]]];
        this.responseOptimizationAlgorithm.steps = response[2];

        if (this.responseOptimizationAlgorithm.steps.length >= 2) {
          
          this.containerFirstOptimization2 = document.getElementById("graph-first-optimization-2-opt") ?? new HTMLElement();
          this.containerFirstOptimization2.innerHTML= "";
          
          this.rendererFirstOptimization2 = new Sigma(this.graphFirstOptimization2, this.containerFirstOptimization2, {
            renderEdgeLabels: true,
            allowInvalidContainer: true,
          });

          this.createNodes(this.graphFirstOptimization2, this.responseOptimizationAlgorithm.cycle.length - 1);
          this.createCycle(this.graphFirstOptimization2, this.responseOptimizationAlgorithm.steps[1][0]);
          this.rendererFirstOptimization2.refresh();
        } 

        this.container = document.getElementById("graph-2-opt") ?? new HTMLElement();
        this.container.innerHTML= "";

        this.containerShowCycle2 = document.getElementById("graph-cycle-2-opt") ?? new HTMLElement();
        this.containerShowCycle2.innerHTML= "";
      
        this.renderer = new Sigma(this.graph, this.container, {
          renderEdgeLabels: true,
          allowInvalidContainer: true,
        });

        this.rendererShowCycle2 = new Sigma(this.graphShowCycle2, this.containerShowCycle2, {
          renderEdgeLabels: true,
          allowInvalidContainer: true,
        });

        this.createNodes(this.graph, this.responseOptimizationAlgorithm.cycle.length - 1);
        this.createCycle(this.graph, this.responseOptimizationAlgorithm.cycle);
        this.renderer.refresh();

        this.createNodes(this.graphShowCycle2, this.responseOptimizationAlgorithm.cycle.length - 1);
        this.createCycle(this.graphShowCycle2, this.responseOptimizationAlgorithm.steps[0][0]);
        this.rendererShowCycle2.refresh();

      }, (error) => {
        this.hasResponse = false;
        console.log(error);
        this.solution = error.error;
        this.error = true;
      }
    );
  }
  

  graphShowCycle3 = new Graph();
  graphFirstOptimization3 = new Graph();

  rendererShowCycle3: any;
  rendererFirstOptimization3: any;

  containerShowCycle3: any;
  containerFirstOptimization3: any;
  run3OPT(input: string): void {
    this.responseOptimizationAlgorithm.solution = -1;
    this.solution = -1;
    if (this.graph.size != 0) {
      this.cleanGraph(this.graph);
      this.renderer.refresh();
      this.cleanGraph(this.graphShowCycle3);
      this.rendererShowCycle3.refresh();
    }

    if (this.graphFirstOptimization3.size != 0) {
      this.cleanGraph(this.graphFirstOptimization3);
      this.rendererFirstOptimization3.refresh();
    }

    this.appService.run3OPT(input, this.chooseAlgorithm,  Number(this.inputType), Number(this.repetitions)).subscribe(
      (response: any) => {
        this.solution = response[0];
        this.responseOptimizationAlgorithm.solution = response[0];
        this.responseOptimizationAlgorithm.cycle = [...response[1], ...[response[1][0]]];
        this.responseOptimizationAlgorithm.steps = response[2];
        if (this.responseOptimizationAlgorithm.steps.length >= 2) {
          
          this.containerFirstOptimization3 = document.getElementById("graph-first-optimization-3-opt") ?? new HTMLElement();
          this.containerFirstOptimization3.innerHTML= "";
          
          this.rendererFirstOptimization3 = new Sigma(this.graphFirstOptimization3, this.containerFirstOptimization3, {
            renderEdgeLabels: true,
            allowInvalidContainer: true,
          });

          this.createNodes(this.graphFirstOptimization3, this.responseOptimizationAlgorithm.cycle.length - 1);
          this.createCycle(this.graphFirstOptimization3, this.responseOptimizationAlgorithm.steps[1][0]);
          this.rendererFirstOptimization3.refresh();
        } 

        this.container = document.getElementById("graph-3-opt") ?? new HTMLElement();
        this.container.innerHTML= "";

        this.containerShowCycle3 = document.getElementById("graph-cycle-3-opt") ?? new HTMLElement();
        this.containerShowCycle3.innerHTML= "";

        this.renderer = new Sigma(this.graph, this.container, {
          renderEdgeLabels: true,
          allowInvalidContainer: true,
        });

        this.rendererShowCycle3 = new Sigma(this.graphShowCycle3, this.containerShowCycle3, {
          renderEdgeLabels: true,
          allowInvalidContainer: true,
        });

        this.createNodes(this.graph, this.responseOptimizationAlgorithm.cycle.length - 1);
        this.createCycle(this.graph, this.responseOptimizationAlgorithm.cycle);
        this.renderer.refresh();

        this.createNodes(this.graphShowCycle3, this.responseOptimizationAlgorithm.cycle.length - 1);
        this.createCycle(this.graphShowCycle3, this.responseOptimizationAlgorithm.steps[0][0]);
        this.rendererShowCycle3.refresh();

      }, (error) => {
        this.hasResponse = false;
        console.log(error);
        this.solution = error.error;
        this.error = true;
      }
    );
  }

  isShown() {
    return this.isShownInput; 
  }

  showInputBox() {
    this.isShownInput = !this.isShownInput;
    if (this.isShownInput) {
      this.hasResponse =  false;
      this.solution = "initial-text";
    }
  }

  currentInputType: string = "3";
  inputType: string = "3";
  isTypeChosen(inputType: string): boolean {
    return inputType === this.inputType;
  }

  chooseInputType(inputData: any): void { 
    if (this.currentInputType !== this.inputType) {
      this.currentInputType = this.inputType;
      this.hasResponse = false;
      inputData.value = "";
      this.solution = "initial-text";
      this.error = false;
    }
  }

  repetitions: string = "1";
}
