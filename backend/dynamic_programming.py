import numpy as np

class DynamicProgramming:
    def __init__(self, n, D):
        self.n = n
        self.D = D
        
    def TSP(self, startNode):
        n = self.n
        D = self.D
        V = (1 << n) - 1 # the set with all nodes
        S = 1 << n       # subsets (2^n)
        
        # create matrix M 
        M = np.full((S, n), np.inf)   
        
        # initialize the 2-node subsets with the values ​​from the distance matrix D
        for j in range(1, n):
            M[(1 << j) + (1 << (startNode)), j] = D[startNode, j]
    
        # the recursion
        for P in range(2, S): # take all subsets
            for j in range(1, n):
                if P & (1 << j) and P & (1 << (startNode)): # check that there are 0 and j in P 
                    for i in range(1, n):
                        # looking for i - intermediate node - which is not 0 or j
                        if P & (1 << i) and i != j:         
                            lengthTo_i = M[P ^ (1 << j), i] + D[i, j]
                            M[P, j] = min(M[P, j], lengthTo_i)
                
        # determination of the optimal solutione
        solution = float('inf')
        for j in range(n):
            solution = min(solution, M[V, j] + D[j, startNode])
        
        if solution == float('inf'):
            solution = "Nu exista solution" 
                
        return solution
