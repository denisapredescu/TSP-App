import random
import numpy as np

class NearestNeighbor:
    def __init__(self, n, D):
        self.n = n
        self.D = D
        
    def getCycle(self):
        startNode = random.randint(0, self.n - 1)   # the start node is chosen randomly
        visited = [0 for _ in range(self.n)] 
        visited[startNode] = 1
        cycle = [startNode]
        solution = 0              # the sum of the distances that make up the cycle
        
        while len(cycle) != self.n: 
            # the last node in the cycle is taken and the nearest neighbor is searched 
            i = cycle[-1]        
                
            nearestNeighborDistance = np.inf
            for j in range(self.n):
                if i != j and visited[j] == 0 and self.D[i, j] < nearestNeighborDistance:
                    nearestNeighborDistance = self.D[i, j]
                    nearestNeighbor = j
            
            # the edge between the current node and its nearest neighbor is added
            cycle.append(nearestNeighbor)       
            visited[nearestNeighbor] = 1             # it is marked as visited
            solution += self.D[i, nearestNeighbor]   # the value of the edge is added
        
        # the value of the return edge in the start node is added
        solution += self.D[cycle[self.n - 1], startNode]
        
        return cycle, solution