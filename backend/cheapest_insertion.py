import heapq
import random
import numpy as np

class CheapestInsertion:
    def __init__(self, n, D):
        self.n = n
        self.D = D
        
    def getCycle(self):
        startNode = random.randint(0, self.n - 1)
        h = []                    # the list of priorities of the form [growth, position in which node k is added, node k]
        cycle = [startNode]       # nodes are gradually inserted until the length is n
        visited = [0] * self.n    # remember which node was visited 
        visited[startNode] = 1
        
        # take the node closest to the starting node k and form a cycle with the 2 nodes
        minimumDistance = float("inf")
        for i in range(self.n):
            if self.D[startNode][i] < minimumDistance and startNode != i:
                minimumDistance = self.D[startNode][i]
                k = i 
        cycle.append(k)                             
        solution =  2 * self.D[startNode, k]  
        visited[k] = 1
        
        # enter the distance growth that occur if any unvisited node is entered between the 2 nodes
        for i in range(self.n):
            if i != cycle[0] and i != cycle[1]:
                growth = self.D[cycle[0], i] + self.D[i, cycle[1]] - self.D[cycle[0], cycle[1]]
                heapq.heappush(h, [growth, 0, i])
        
        while len(cycle) != self.n:  
            minimalGrowth, insertionPosition, k = heapq.heappop(h)
            cycle = cycle[:insertionPosition + 1] + [k] + cycle[insertionPosition + 1:]
            solution += minimalGrowth
            visited[k] = 1
        
            # remove from the priority queue those calculations that involved adding a node between i and i + 1
            # because after inserting k, cicu[i + 1] = k, so those distances are no longer valid
            # also eliminate the triplets that suggested that k is a node that is not part of the cycle
            h_aux = []
            
            while len(h) != 0: 
                growth, position, node = heapq.heappop(h)
                if insertionPosition > position and visited[node] == 0:
                    heapq.heappush(h_aux, [growth, position, node])
                if position > insertionPosition and visited[node] == 0:
                    heapq.heappush(h_aux, [growth, (position + 1) % len(cycle), node])
    
            h = h_aux
            # the distances must be calculated for any unvisited node that can be inserted between the nodes 
            # cycle[i] and k, respectively k and cycle[i + 2] (k is on position i + 1)
            for i in range(self.n):
                if visited[i] == 0:
                    a = cycle[insertionPosition]
                    b = cycle[(insertionPosition + 2) % len(cycle)]
                    heapq.heappush(h, [self.D[a, i] + self.D[i, k] - self.D[a, k], insertionPosition, i])   
                    heapq.heappush(h, [self.D[k, i] + self.D[i, b] - self.D[k, b], (insertionPosition + 1) % len(cycle), i])   

        return cycle, solution