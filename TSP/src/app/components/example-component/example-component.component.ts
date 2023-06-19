import { Component, Input, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-example-component',
  templateUrl: './example-component.component.html',
  styleUrls: ['./example-component.component.scss']
})
export class ExampleComponentComponent {
  @ViewChild('carousel')
  carousel!: NgbCarousel;

  @Input() example: string = "";

  constructor (private translate: TranslateService) {}

  title: string= "You a big dummy";

  infos = [
    {
      neighborhood: [ [2, 6], [1, 3, 4, 5], [2, 5], [2, 5], [2, 3, 4, 6],  [1, 5]],
      currentNode: [],
      path: [1],
      cycle: [],
      id: "img-0"
    },
    {
      neighborhood: [ [6], [ 3, 4, 5], [2, 5], [2, 5], [2, 3, 4, 6],  [1, 5]],
      currentNode: [1],
      path: [1, 2],
      cycle: [],
      id: "img-1"
    },
    {
      neighborhood: [ [6], [ 4, 5], [ 5], [2, 5], [2, 3, 4, 6],  [1, 5]],
      currentNode: [2],
      path: [1, 2, 3],
      cycle: [],
      id: "img-2"
    },
    {
      neighborhood:   [ [6], [ 4, 5], [], [2, 5], [2, 4, 6],  [1, 5]],
      currentNode: [3],
      path: [1, 2, 3, 5],
      cycle: [],
      id: "img-3"
    },
    {
      neighborhood:[ [6], [ 4, 5], [], [2, 5], [2, 4],  [1]],
      currentNode:[5],
      path: [1, 2, 3, 5, 6],
      cycle: [],
      id: "img-4"
    },
    {
      neighborhood:  [ [], [ 4, 5], [], [2, 5], [2, 4],  []],
      currentNode:[6],
      path: [1, 2, 3, 5, 6, 1], 
      cycle:  [],
      id: "img-5" 
    },
    {
      neighborhood:  [ [], [ 4, 5], [], [2, 5], [2, 4],  []],
      currentNode:[1],
      path: [1, 2, 3, 5, 6],
      cycle:  [1],
      id: "img-6"
    },
    {
      neighborhood:  [ [], [ 4, 5], [], [2, 5], [2, 4],  []],
      currentNode: [6],
      path: [1, 2, 3, 5],
      cycle: [1, 6],
      id: "img-7"
    } ,
    {
      neighborhood:  [ [], [ 4], [], [2, 5], [4],  []],
      currentNode: [5],
      path: [1, 2, 3, 5, 2],
      cycle: [1, 6],
      id: "img-8"
    } ,
    {  
      neighborhood:[ [], [], [], [5], [4],  []],
      currentNode:[2],
      path:  [1, 2, 3, 5, 2, 4],
      cycle:  [1, 6],  
      id: "img-9"
    },
    {
      neighborhood: [ [], [], [], [ ], [ ],  []],
      currentNode:[4],
      path: [1, 2, 3, 5, 2, 4, 5], 
      cycle: [1, 6],
      id: "img-10"
    },
    {
      neighborhood: [ [], [], [], [ ], [ ],  []],
      currentNode: [5],
      path: [1, 2, 3, 5, 2, 4], 
      cycle: [1, 6, 5], 
      id: "img-11"
    },
    {
      neighborhood: [ [], [], [], [ ], [ ],  []],
      currentNode: [4], 
      path: [1, 2, 3, 5, 2], 
      cycle: [1, 6, 5, 4],
      id: "img-12"
    },
    {
      neighborhood: [ [], [], [], [ ], [ ],  []],
      currentNode:[2],
      path: [1, 2, 3, 5],
      cycle:  [1, 6, 5, 4, 2],
      id: "img-13"
    },
    {
      neighborhood: [ [], [], [], [ ], [ ],  []],
      currentNode: [5],
      path:  [1, 2, 3],
      cycle: [1, 6, 5, 4, 2],
      id: "img-14"
    } ,
    {
      neighborhood: [ [], [], [], [ ], [ ],  []],
      currentNode: [3], 
      path: [1, 2],
      cycle:  [1, 6, 5, 4, 2, 3],
      id: "img-15"
    },
    {
      neighborhood: [ [], [], [], [ ], [ ],  []],
      currentNode: [2], 
      path: [1], 
      cycle: [1, 6, 5, 4, 2, 3],
      id: "img-16"
    },
    {
      neighborhood:  [ [], [], [], [ ], [ ],  []],
      currentNode:[1],
      path:  [], 
      cycle: [1, 6, 5, 4, 2, 3, 1], 
      id: "img-17"
    }
  ];

  branchAndBound= [
    {
      id: "img-0",
      fromNode: -1,
      fromMatrix:  [
        ["∞", "5", "10", "12"],
        [ "7", "∞",  "9",  "10"],
        [ "3", "15", "∞",  "13"],
        [ "6",  "11", "19", "∞"]
      ],
      node: [0],
      reduction: [26],
      distances:[],
      f: [26], 
      matrix: [
        [
          ["∞", "0", "3", "4"],
          [ "0", "∞",  "0",  "0"],
          [ "0", "12", "∞",  "7"],
          [ "0",  "5", "11", "∞"]
        ]
      ]
    }, {
      id: "img-1",
      fromNode: 0,
      fromMatrix:  [
        ["∞", "0", "3", "4"],
        [ "0", "∞",  "0",  "0"],
        [ "0", "12", "∞",  "7"],
        [ "0",  "5", "11", "∞"]
      ],
      fromF: 26,
      node: [1, 2, 3],
      reduction: [0, 12, 5],
      distances: [0, 3, 4],
      f: [26, 41, 35], 
      matrix: [
        [
          ["∞", "∞", "∞", "∞"],
          ["∞", "∞", "0", "0"],
          [ "0", "∞", "∞",  "7"],
          [ "0", "∞", "11", "∞"]
        ], 
        [
          ["∞", "∞", "∞", "∞"],
          [ "0", "∞", "∞",  "0"],
          ["∞",  "0", "∞",  "0"],
          [ "0",  "0", "∞", "∞"]
        ],
        [
          ["∞", "∞", "∞", "∞"],
          [ "0", "∞",  "0", "∞"],
          [ "0", "12", "∞", "∞"],
          ["∞",  "0",  "6", "∞"]
        ]
      ]
    }, {
      id: "img-2",
      fromNode: 1,
      fromMatrix:  [
        ["∞", "∞", "∞", "∞"],
        ["∞", "∞", "0", "0"],
        [ "0", "∞", "∞",  "7"],
        [ "0", "∞", "11", "∞"]
      ],
      fromF: 26,
      node: [2, 3],
      reduction: [7, 11],
      distances: [0, 0],
      f: [33, 37], 
      matrix: [
        [
          ["∞", "∞", "∞", "∞"],
          ["∞", "∞",  "∞",  "∞"],
          [  "∞", "∞", "∞",  "0"],
          [ "0", "∞",  "∞", "∞"]
        ], 
        [
          ["∞", "∞", "∞", "∞"],
          ["∞", "∞", "∞", "∞"],
          ["0", "∞", "∞","∞"],
          ["∞", "∞", "0", "∞"]
        ]
      ]
    } , {
      id: "img-3",
      fromNode: 2,
      fromMatrix:  [
        ["∞", "∞", "∞", "∞"],
        ["∞", "∞",  "∞",  "∞"],
        [  "∞", "∞", "∞",  "0"],
        [ "0", "∞",  "∞", "∞"]
      ], 
      fromF: 33,
      node: [3],
      reduction: [0],
      distances: [0],
      f: [33], 
      matrix: [
        [
          ["∞", "∞", "∞", "∞"],
          ["∞", "∞",  "∞", "∞"],
          ["∞", "∞", "∞", "∞"],
          ["∞", "∞",  "∞", "∞"]
        ]
      ]
    }
    , {
      id: "img-4",
      fromNode: 3,
      fromMatrix:  [], 
      fromF: 33,
      node: [0, 1, 2, 3, 0],
      reduction: [],
      distances: [],
      f: [33], 
      matrix: []
    }
  ];

  farthest_insertion = [
    {
      id: "img-0",
      accesible_nodes:[],
      cycle: [],
      insertions: [], 
      chosen_position: [],
      solution: 0,
      actualization: []
      ,h:[]
    },
    {
      id: "img-1",
      chosen_distance: 0,
      chosen_node: 1,
      cycle: [1],
      insertions: [], 
      chosen_position: [],
      h: [[2, 7], [3, 4], [4, 2], [5, 4]],
      solution: 0,
      actualization: []
    },  {
      id: "img-2",
      chosen_distance: 7,
      chosen_node: 2,
      cycle: [1, 2, 1],
      insertions: [], 
      chosen_position: [],
      solution: 14,
      actualization: [[3, 2, 13, 4, false], [4, 2, 5, 2, false], [5, 2, 10, 4, false]], 
      actialization_active: false,
      h: [ [3, 4], [4, 2], [5, 4]],
  
    }
    ,  {
      id: "img-3",
      chosen_distance: 4,
      chosen_node: 3,
      insertions: [[1, 2, 10], [2, 1, 10]],
      chosen_position: [1,2, 10],
      cycle: [1, 3, 2, 1],
      solution: 24,
      actualization: [[4, 3, 8, 2, false], [5, 3, 1, 4, true]],
      actialization_active: true, 
      h: [[4, 2], [5, 1]],
    }
    ,  {
      id: "img-4",
      chosen_distance: 2,
      chosen_node: 4,
      insertions: [[1, 3, 6], [3, 2, 0], [2, 1, 0]],
      chosen_position: [3, 2, 0],
      cycle: [1, 3, 4, 2, 1],
      solution: 24,
      actualization: [[5, 4, 14, 1, false]],
      actialization_active: false, 
      h: [[5,1]],
    }
    ,  {
      id: "img-5",
      chosen_distance: 1,
      chosen_node: 5,
      insertions: [[1, 3, 1], [3, 4, 7], [4, 2, 19], [2, 1, 7]],
      chosen_position: [1, 3, 1],
      cycle: [1, 5, 3, 4, 2, 1],
      solution: 25,
      actualization: [],
      h: [],
    }
  ];

  nearest_insertion = [
    {
      id: "img-0",
      accesible_nodes:[],
      cycle: [],
      insertions: [], 
      chosen_position: [],
      solution: 0,
      chosen_node: ""
      , h:[],
      actualization: []
    },
    {
      id: "img-1",
      chosen_distance: 0,
      chosen_node: 1,
      cycle: [1],
      solution: 0,
      insertions: [], 
      chosen_position: [],
      actualization: [],
      h: [[2, 7], [3, 4], [4, 2], [5, 4]]
    },  {
      id: "img-2",
      chosen_distance: 2,
      chosen_node: 4,
      insertions: [],
      chosen_position: [], 
      cycle: [1, 4, 1],
      solution: 4,
      actualization: [[2, 4, 5, 7, true], [3, 4, 8, 4, false], [5, 4, 14, 4, false]],
      actialization_active: true,
      h: [[2, 5], [3, 4], [5, 4]]
    }
    ,  {
      id: "img-3",
      chosen_distance: 4,
      chosen_node: 3,
      insertions: [[1, 4, 10], [4, 1, 10]],
      chosen_position: [1, 4, 10],
      cycle: [1, 4, 3, 1],
      solution: 14,
      actualization: [[2, 3, 13,5, false], [5, 3, 1, 4, true]],
      actialization_active: true,
      h: [[2, 5], [5, 1]]
    }
    ,  {
      id: "img-4",
      chosen_distance: 1,
      chosen_node: 5,
      insertions: [[1, 3, 1], [3, 4, 7], [4, 1, 16]],
      chosen_position: [1, 3, 1],
      cycle: [1, 5, 3, 4, 1],
      solution: 15,
      actualization: [[2, 5, 10, 5, false]],
      actialization_active: false,
      h: [[2, 5]]
    }
    ,  {
      id: "img-5",
      chosen_distance: 5,
      chosen_node: 2,
      insertions: [[1, 5, 13], [5, 3, 22], [3, 4, 10], [4, 1, 10]],
      chosen_position: [3, 4, 10],
      cycle: [1, 5, 3, 2, 4, 1],
      solution: 25,
      actualization: [],
      actialization_active: false,
      h: []
    }
  ];

  cheapest_insertion = [
    {
      id: "img-0",
      cycle: [],
      insertions: [],
      chosen_position: [],
      chosen_node: 0,
      h: []
    },
    {
      id: "img-1",
      h: [[1, 2, "7 + 7 = 14"], [1, 3, "4 + 4 = 8"], [1, 4, "2 + 2 = 4"], [1, 5, "4 + 4 = 8"]],
      cycle: [1],
      solution: 0,
      chosen_position: [],
      chosen_node: 1,
    },  {
      id: "img-2",
      chosen_distance: 4,
      chosen_node: 4,
      chosen_position: [1, 1] ,
      cycle: [1, 4, 1],
      h: [[1, 4, 2, "7 + 5 - 2 = 10"], [1, 4, 3, "4 + 8 - 2 = 10"], [1, 4, 5, "4 + 14 - 2 = 16"]],
      solution: 4,
    }
    ,  {
      id: "img-3",
      chosen_distance: 10,
      chosen_node: 2,
      chosen_position: [1, 4],
      h: [[1, 2, 5, "4 + 10 - 7 = 7"], [2, 4, 5, "10 + 14 - 5 = 19"], [4, 1, 5, "14 + 4 - 2 = 16"], [1, 2, 3, "4 + 13 - 7= 10"], [2, 4, 3, "13 + 8 - 5 = 16"], [4, 1, 3, "8 + 4 - 2 = 10"]],
      cycle: [1, 2, 4, 1],
      solution: 14,
    }
    ,  {
      id: "img-4",
      chosen_distance: 7,
      chosen_node: 5,
      chosen_position: [1, 2],
      cycle: [1, 5, 2, 4, 1],
      solution: 21,
      h: [[1, 5, 3, "4 + 1 - 4 = 1"],  [5, 2, 3, "13 + 1 - 10 = 4"],   [2, 4, 3, "13 + 8 - 5 = 16"], [4, 1, 3, "4 + 8 - 2 = 10"]],
    }
    ,  {
      id: "img-5",   
      chosen_distance: 1,
      chosen_node: 3,
      chosen_position: [1, 5],
      cycle: [1, 3, 5, 2, 4, 1],
      solution: 22,
      h: [],
    }
  ];

  nearest_neighbor = [
    {
      id: "img-0",
      cycle: [1],
      solution: 0,
      nextNode: "",
      minimunDistance: "",
      distances: [],
      currentNode: ""
    },
    {
      id: "img-1",
      currentNode: 1,
      distances: [ [2, 7], [3, 4], [4, 2], [5, 4]],
      minimunDistance: 2,
      nextNode: 4, 
      cycle: [1, 4],
      solution: 2
    }, 
     {
      id: "img-2",
      currentNode: 4,
      distances: [[2, 5], [3, 8], [5, 14]],
      minimunDistance: 5,
      nextNode: 2, 
      cycle: [1, 4, 2],
      solution: 7
    }, {
      id: "img-3",
      currentNode: 2,
      distances: [[3, 13], [5, 10]],
      minimunDistance: 10,
      nextNode: 5, 
      cycle: [1, 4, 2, 5],
      solution: 17
    }, {
      id: "img-4",
      currentNode: 5,
      distances: [[3, 1]],
      minimunDistance: 1,
      nextNode: 3, 
      cycle: [1, 4, 2, 5, 3],
      solution: 18
    }, {
      id: "img-5",
      currentNode: 3,
      distances: [],
      minimunDistance: 4,
      nextNode: 1, 
      cycle: [1, 4, 2, 5, 3, 1],
      solution: 22
    }
  ];

  prev() {
    this.carousel.prev();
  }

  next() {
    this.carousel.next();
  }

  reset(){
    this.carousel.select("img-0");
  }

  ngOnInit() {
    if (this.example === "hamiltonian-cycle-from-hierholzer") {
      this.translate.get('carousel.example-eulerian-cycle').subscribe(
        (text: string) => {
          this.title = text;
        });
    } else if (this.example === 'branch-and-bound') {
      this.translate.get('carousel.example-branch-and-bound').subscribe(
        (text: string) => {
          this.title = text;
        });
    } else if (this.example === 'farthest-insertion') {
      this.translate.get('carousel.example-farthest-insertion').subscribe(
        (text: string) => {
          this.title = text;
        });
    } else if (this.example === 'nearest-insertion') {
      this.translate.get('carousel.example-nearest-insertion').subscribe(
        (text: string) => {
          this.title = text;
        });
    } else if (this.example === 'cheapest-insertion') {
      this.translate.get('carousel.example-cheapest-insertion').subscribe(
        (text: string) => {
          this.title = text;
        });
    } else if (this.example === 'nearest-neighbor') {
      this.translate.get('carousel.example-nearest-neighbor').subscribe(
        (text: string) => {
          this.title = text;
        });
    }
  }
}
