from copy import deepcopy
import heapq
import random
import numpy as np
import networkx as nx

class Christofides:
    def __init__(self, n, D):
        self.n = n
        self.D = D
    
    def prim(self, startNode):    
        d = np.full(self.n, np.inf)       # distances
        visited = np.full(self.n, 0)      # records are kept of whether a node has been visited or not
        h = []                            # priority queue
        d[startNode] = 0    
        degrees = np.full(self.n, 0)
        
        # the adjacency list in which the minimum cost tree will be kept
        tree = [[] for _ in range(self.n)]  
        
        # the first node and the cost of the edge up to it are entered in the queue
        heapq.heappush(h, [d[startNode], startNode, -1]) 

        for _ in range(self.n):                  
            _, node, parent = heapq.heappop(h)     
            while visited[node] == 1:
                _, node, parent =  heapq.heappop(h)  
            
            visited[node] = 1 
            if parent != -1:
                degrees[node] += 1
                degrees[parent] += 1 
                tree[node].append(parent)
                tree[parent].append(node)
            
            # his unvisited neighbors are also put in the queue, if the distance to them decreases
            for neighbor in range(self.n):           
                if self.D[node, neighbor] != np.inf and visited[neighbor] == 0 and d[neighbor] > self.D[node, neighbor]:  
                    d[neighbor] = self.D[node, neighbor]
                    heapq.heappush(h, [d[neighbor], neighbor, node])   

        return tree, degrees
    
    
    def nodesWithOddDegree(self, degrees):
        return [i for i in range(len(degrees)) if degrees[i] % 2 == 1]    
        
    def greedy_matching(self, tree, nodes, repetitions):
        copyNodes = deepcopy(nodes)
        minSolution = float("inf")
        matchEdgesForSolution = None
        
        for _ in range(repetitions):
            while True:
                solution = 0
                ok = True
                matchEdges = []      
                nodes = deepcopy(copyNodes)
                random.shuffle(nodes)

                while len(nodes) != 0:
                    u = nodes.pop()
                    edgeLength = np.inf
                    match_u = None
                    for v in nodes:
                        # the edge between u and the node closest to u is taken
                        if u != v and self.D[u, v] < edgeLength and (not v in tree[u]):
                            edgeLength = self.D[u, v]
                            match_u = v  
                    
                    if match_u == None: 
                        ok = False
                        nodes = []
                    else:
                        solution += edgeLength
                        nodes.remove(match_u)
                        matchEdges.append([u, match_u])
                
                if ok == True:   
                    break
                
            if solution < minSolution:
                minSolution = solution
                matchEdgesForSolution = matchEdges
        
        return matchEdgesForSolution
        
    def minimum_peftect_matching(self, tree, nodes):
        G = nx.Graph()

        for i in range(len(nodes) - 1):
            for j in range(i + 1, len(nodes)):
                node_i = nodes[i]
                node_j = nodes[j]
                if (not node_j in tree[node_i]):
                    G.add_edge(node_i, node_j, weight=-self.D[node_i, node_j])
                    
        matchEdges = nx.algorithms.matching.max_weight_matching(G, maxcardinality=True, weight='weight')
        
        return matchEdges
    
        
    def addNodesToTree(self, tree, matchEdges):
        for u, v in matchEdges:
            tree[u].append(v)
            tree[v].append(u)
    
       
    # the method of determining the Eulerian cycle is applied, 
    # but the nodes are inserted in the final cycle only the first time they meet
    # Method:
    # - the path works as a stack in which one node that is a neighbor to the last node in the path is inserted;
    # - if the last node has no more neighbors (unvisited incident edges), it is removed from the stack and 
    # inserted into the 'cycle' only if the respective node does not already exist in the cycle. 
    # - it is checked if the new last node has neighbors.
    # - The algorithm is repeated by modifying the stack until all edges are visited and at the end the Hamiltonian 
    # cycle is built in the cycle variable
    def hamiltonianCycle(self, graph, k):
        visited = [0 for _ in range(self.n)]
        # path initialization with the first node
        path = [k]
        # cycle initialization with empty list
        cycle = []

        while len(path) != 0:
            currentNode = path[-1]

            if len(graph[currentNode]) == 0:
                # the current node has no more unvisited neighbors (untraveled edges), it is added to the cycle 
                if visited[currentNode] == 0:
                    cycle.append(currentNode)
                    visited[currentNode] = 1
                
                if len(path) == 1:
                    cycle.append(currentNode)
                    
                path.pop()
            else:
                # a neighbor is chosen and inserted in the path
                neighbor = graph[currentNode].pop(0) 
                path.append(neighbor)
                
                # remove the edge from the opposite direction as well
                graph[neighbor].remove(currentNode) 
        
        return cycle


    def cycleValue(self, cycle):
        solution = 0
        for i in range(len(cycle) - 1):
            solution += self.D[cycle[i], cycle[i + 1]]
            
        return solution


    def TSP(self, matching, repetitions = 1):
        startNode = random.randint(0, self.n - 1)
        tree, degrees = self.prim(startNode)
        nodes = self.nodesWithOddDegree(degrees)
        
        if matching == "greedy-matching":
            matchEdges = self.greedy_matching(tree, nodes, repetitions)
        else: 
            matchEdges = self.minimum_peftect_matching(tree, nodes)
            
        self.addNodesToTree(tree, matchEdges)
        cycle = self.hamiltonianCycle(tree, startNode)
        solution = self.cycleValue(cycle)

        return solution, cycle