from farthest_insertion import FarthestInsertion
from nearest_insertion import NearestInsertion
from cheapest_insertion import CheapestInsertion
from nearest_neighbor import NearestNeighbor

class Doi_OPT:
    def __init__(self, n, D):
        self.n = n
        self.D = D

    def advantageCalculation(self, f, i, j):
        return  self.D[f[i - 1], f[i]] + self.D[f[j - 1], f[j]] - self.D[f[i - 1], f[j - 1]] - self.D[f[i], f[j]]

    def change(self, f, i, j):    
        # create the new cycle
        # example: f = abcdef with i = 2 si j = 4 => g = abdcef
        return f[: i] + f[i : j][::-1] + f[j: ]

    def opt(self, cycleDeterminationAlgorithm):

        if cycleDeterminationAlgorithm == "farthest-insertion":
            algorithm = FarthestInsertion(self.n, self.D)
        elif cycleDeterminationAlgorithm == "nearest-insertion":
            algorithm = NearestInsertion(self.n, self.D)
        elif cycleDeterminationAlgorithm == "cheapest-insertion":
            algorithm = CheapestInsertion(self.n, self.D)
        elif cycleDeterminationAlgorithm == "nearest-neighbor":
            algorithm = NearestNeighbor(self.n, self.D)
        
        f, solution = algorithm.getCycle()
        
        while True:
            advantage = 0
            g = f
            for i in range(self.n - 2):
                # it starts from i + 2 because there is no 2-exchange on 2 edges that have a common node
                for j in range(i + 2, self.n):  
                    # prevents the attempt to exchange between 2 edges with a common node, a case not handled in the for loop
                    if i == 0 and j == self.n - 1:   
                        continue 
                    
                    advantage_g = self.advantageCalculation(f, i, j)
                    if advantage_g > advantage: 
                        g = self.change(f, i, j)
                        advantage = advantage_g
            f = g
            solution -= advantage
            if advantage == 0:
                break
    
        return f, solution
    
    def TSP(self, noRepetitions, cycleDeterminationAlgorithm):
        minSolution = float("inf")

        for _ in range(noRepetitions):
            cycle, solution = self.opt(cycleDeterminationAlgorithm)
            if solution < minSolution:
                minSolution = solution
                cycleSolution = cycle
          
        return round(minSolution, 4), cycleSolution