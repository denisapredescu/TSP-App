import random
import numpy as np

class FarthestInsertion:
    def __init__(self, n, D):
        self.n = n
        self.D = D
        
    def getCycle(self):
        startNode = random.randint(0, self.n - 1)
        h = [0] * self.n              # the list in which the minimum distance from each node to the cycle is kept 
        cycle = [startNode]           # nodes are gradually inserted until the length is n
        solution = 0                  # calculate the length of the cycle
        visited = [0] * self.n        # remember which node was visited
        visited[startNode] = 1
        
        for i in range(self.n):
            if i != startNode:
                h[i] = self.D[startNode, i]
            
        while len(cycle) != self.n:  
            maximumDistance = 0
            for node in range(self.n):
                if visited[node] == 0 and h[node] > maximumDistance:
                    maximumDistance = h[node]
                    k = node

            if len(cycle) == 1:
                # a cycle with two nodes is created
                cycle.append(k)
                solution += 2 * self.D[cycle[0], k]
                visited[k] = 1
            else: 
                minimalGrowth = np.inf
                insertionPosition = None
                
                # determine the position on which node j must be inserted
                for i in range(len(cycle)): 
                    a = cycle[i]
                    b = cycle[(i + 1) % len(cycle)]
                    growth = self.D[a, k] + self.D[k, b] - self.D[a, b]
                    if growth < minimalGrowth:
                        minimalGrowth = growth
                        insertionPosition = i
                        
                cycle = cycle[:insertionPosition + 1] + [k] + cycle[insertionPosition + 1:]
                solution += minimalGrowth
                visited[k] = 1
                
            for i in range(self.n):
                if visited[i] == 0 and self.D[k, i] < h[i]:
                    h[i] = self.D[k, i]     

        return cycle, solution