import heapq
import random
import numpy as np

class AlgoritmulArboreluiDublu:
    def __init__(self, n, D):
        self.n = n
        self.D = D
        self.cycle = []
        self.visited = np.full(n, 0) 
    
    def prim(self, startNode):    
        d = np.full(self.n, np.inf)              # distances
        tree = [[] for _ in range(self.n)]       # the adjacency list in which the minimum cost tree will be kept
        visited = np.full(self.n, 0)             # records are kept of whether a node has been visited or not
        h = []                                   # priority queue
        d[startNode] = 0    
        
        # the first node and the cost of the edge up to it are entered in the queue
        heapq.heappush(h, [d[startNode], startNode, -1])  
        
        for _ in range(self.n):                  
            _, node, parent = heapq.heappop(h)     
            while visited[node] == 1:
                _, node, parent =  heapq.heappop(h)  
                
            visited[node] = 1 
            if parent != -1:
                tree[node].append(parent)
                tree[parent].append(node)
            
            # his unvisited neighbors are also put in the queue, if the distance to them decreases
            for neighbor in range(self.n):           
                if self.D[node, neighbor] != np.inf and visited[neighbor] == 0 and d[neighbor] > self.D[node, neighbor]:  
                    d[neighbor] = self.D[node, neighbor]
                    heapq.heappush(h, [d[neighbor], neighbor, node])   
        return tree
    

    # instead of doubling the edges and keeping all the nodes reached, a depth-first search is applied 
    # and only the nodes that have not been visited are kept, thus combining the steps of determining 
    # the Eulerian cycle and applying shortcutting
    def hamiltonianCycle(self, tree, k):
        self.search(k, tree)
        self.cycle.append(self.cycle[0])
        
    def search(self, i, tree):
        self.cycle.append(i)
        self.visited[i] = 1
        for j in tree[i]:           # the children of i are traversed
            if self.visited[j] == 0: 
                self.search(j, tree)

    def cycleValue(self, cycle):
        solution = 0
        for i in range(len(cycle) - 1):
            solution += self.D[cycle[i], cycle[i + 1]]
            
        return solution


    def TSP(self):
        startNode = random.randint(0, self.n - 1)
        tree = self.prim(startNode)
        self.hamiltonianCycle(tree, startNode)
        solution = self.cycleValue(self.cycle)

        return solution, self.cycle