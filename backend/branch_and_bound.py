import heapq
import numpy as np
    
class Branch_and_Bound:
    def __init__(self, n, D):
        self.n = n
        self.D = D
        self.lim = np.inf
        self.optimalPath = None
        self.visited = [0] * n 
        self.neighbors = self.neighborhood()
    
    def neighborhood(self):
        neighbors = [[] for x in range(self.n)]
        for i in range(self.n):
            for j in range(self.n):
                if self.D[i, j] != np.inf:
                    neighbors[i].append(j)
        return neighbors
       
    def matrix_reduction(self, Di, i, j, startNode):
        Dj = Di.copy()
        Dj[i, :] = np.inf          # the line i becomes infinite
        Dj[:, j] = np.inf          # the column j becomes infinite
        Dj[j, startNode] = np.inf  # the distance from j to the start node becomes infinite
        cost = self.f(Dj)          # the reduction is calculated
    
        return cost, Dj

    def f(self, Dj):
        n = len(Dj)
        cost = 0                   # the cost of the new reduction
        for row in range(n):
            minim = np.min(Dj[row, :])
            if minim != 0 and minim != np.inf:
                cost += minim
                Dj[row, :] -= minim              
        for column in range(n):
            minim = np.min(Dj[:, column])
            if minim != 0 and minim != np.inf:
                cost += minim
                Dj[:, column] -= minim  
        
        return cost
      
    def search(self, node, fi, path, Di):
        self.visited[node] = 1
        
        if fi < self.lim :
            if len(path) == self.n:
                if self.D[path[-1], self.startNode] != np.inf:
                    self.lim = fi
                    self.optimalPath = path
            else:         
                neighborsDistance = []
                for j in self.neighbors[node]:
                    if self.visited[j] == 0:            #  node is unvisited child
                        alpha, Dj = self.matrix_reduction(Di, path[-1], j)
                        fj = fi + Di[path[-1], j] + alpha
                        heapq.heappush(neighborsDistance, [fj, j, path + [j], Dj])
                        
                while len(neighborsDistance) != 0:
                    fj, nodej, pathj, Dj = heapq.heappop(neighborsDistance) 
                    self.dfs(nodej, fj, pathj, Dj)
        
        self.visited[node] = 0 
            
            
    def TSP(self, startNode = 0):
        self.start = startNode
        
        Dstart = self.D.copy()
        f_startNode = self.f(Dstart)
        
        self.dfs(startNode, f_startNode, [startNode], Dstart)

        if self.lim == np.inf:
            return "No solution"
        else:
            return self.lim, self.optimalPath




