from cheapest_insertion import CheapestInsertion
from farthest_insertion import FarthestInsertion
from nearest_insertion import NearestInsertion
from nearest_neighbor import NearestNeighbor

class Trei_OPT:
    def __init__(self, n, D):
        self.n = n
        self.D = D

    # for convenience, write the values ​​of f (noted cycle_f) with a, b, c, d, e, f
    def advantageCalculation(self, cycle_f, i, j, k):
        # 3 opt means that 2-change and 3-change can be made, resulting in 7 cycles
        # 3 - 1 modification of type 2-change
        # 3 - 2 modifications of type 2-change
        # 1 - 3 modifications of type 2-change
        
        a = cycle_f[i - 1]
        b = cycle_f[i]
        c = cycle_f[j - 1]
        d = cycle_f[j]
        e = cycle_f[k - 1]
        f = cycle_f[k]
        
        # 1 modifications of type 2-change per cycle
        # (a, b), (c, d) -> acbdef
        delta_acbdef = self.D[a, b] + self.D[c, d]  - self.D[a, c] - self.D[b, d]
        
        # (a, b), (e, f) ->  aedcbf
        delta_aedcbf = self.D[a, b] + self.D[e, f]  - self.D[a, e] - self.D[b, f]
        
        # (c, d), (e, f) -> abcedf
        delta_abcedf = self.D[c, d] + self.D[e, f]  - self.D[c, e] - self.D[d, f]
        
        # 2 modifications of type 2-change per cycle
        # (a, b), (c, d), (e, f) -> acbedf
        delta_acbedf = self.D[a, b] + self.D[c, d] + self.D[e, f] - self.D[a, c] - self.D[b, e] - self.D[d, f]
                    
        # (a, b), (c, d), (e, f) -> aedbcf
        delta_aedbcf = self.D[a, b] + self.D[c, d] + self.D[e, f] - self.D[a, e] - self.D[d, b] - self.D[c, f]
        
        # (a, b), (c, d), (e, f) -> adecbf  
        delta_adecbf = self.D[a, b] + self.D[c, d] + self.D[e, f] - self.D[a, d] - self.D[e, c] - self.D[b, f]
        
        # 3 modifications of type 2-change per cycle
        # (a, b), (c, d), (e, f) -> adebcf
        delta_adebcf = self.D[a, b] + self.D[c, d] + self.D[e, f] - self.D[a, d] - self.D[e, b] - self.D[c, f]
    
        delta_maxim = max([delta_acbdef, delta_aedcbf, delta_abcedf, delta_acbedf, delta_aedbcf, delta_adecbf, delta_adebcf])
        if delta_acbdef == delta_maxim:
            return delta_acbdef, "ij"
        if delta_aedcbf == delta_maxim:
            return delta_aedcbf, "ik"
        if delta_abcedf == delta_maxim:
            return delta_abcedf, "jk"
        if delta_acbedf == delta_maxim:
            return delta_acbedf, "ij-jk"
        if delta_aedbcf == delta_maxim:
            return delta_aedbcf, "ij-ik"
        if delta_adecbf == delta_maxim:
            return delta_adecbf, "jk-ik"
        if delta_adebcf == delta_maxim:
            return delta_adebcf, "ij-jk-ik"


    # the method uses positions because the values ​​in the cycle change, 
    # which is why the notation a, b, c, d, e, f can no longer be used
    def change(self, f, i, j, k , modification):
        # 3 opt means that 2-change and 3-change can be made, resulting in 7 cycles
        # 3 - 1 modification of type 2-change
        # 3 - 2 modifications of type 2-change
        # 1 - 3 modifications of type 2-change
        
        # 1  modification of type 2-change per cycle
        # i, j                
        if modification == "ij":
            return f[: i] + f[i : j][::-1] + f[j: ] 
        
        # i, k 
        if modification == "ik":
            return f[: i] + f[i : k][::-1] + f[k: ]

        # j, k
        if modification == "jk":
            return f[: j] + f[j : k][::-1] + f[k: ]

        # 2  modifications of type 2-change per cycle
        # i, j -> j, k 
        if modification == "ij-jk":
            g_ij = f[: i] + f[i : j][::-1] + f[j: ]
            return g_ij[: j] + g_ij[j : k][::-1] + g_ij[k: ]
        
        # i, j -> i, k 
        if modification == "ij-ik":
            g_ij = f[: i] + f[i : j][::-1] + f[j: ] 
            return g_ij[: i] + g_ij[i : k][::-1] + g_ij[k: ]
        
        # j, k -> i, k
        if modification == "jk-ik":
            g_jk = f[: j] + f[j : k][::-1] + f[k: ]
            return g_jk[: i] + g_jk[i : k][::-1] + g_jk[k: ]
        
        # 3 modifications of type 2-change per cycle
        # i, j -> j, k -> i, k
        if modification == "ij-jk-ik":
            g_ij = f[: i] + f[i : j][::-1] + f[j: ]
            g_ij_jk = g_ij[: j] + g_ij[j : k][::-1] + g_ij[k: ]
            return g_ij_jk[: i] + g_ij_jk[i : k][::-1] + g_ij_jk[k: ]


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
            for i in range(self.n - 4):
                for j in range(i + 2, self.n - 2):
                    for k in range (j + 2, self.n):
                        if i == 0 and k == self.n - 1:
                            continue 
                    
                        advantage_modification, modification = self.advantageCalculation(f, i, j, k) 
                        if advantage_modification > advantage: 
                            g = self.change(f, i, j, k, modification)
                            advantage = advantage_modification
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