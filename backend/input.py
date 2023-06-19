import math
import numpy as np

class Input: 
    def __init__(self, input, type):
        inputList = [float(x) for x in input.strip("\"").split()]
        self.type = type
        self.n = int(inputList[0])
        self.D = np.full((self.n, self.n), np.inf)
        
        # enter data of the type (node ​​1, node 2, distance); matrix D can be symmetric (type 1) or asymmetric (type 2)
        if self.type == 1 or self.type == 2:   
            if (len(inputList) - 2) % 3 != 0:
                raise Exception("The entered input does not have the correct form!")
            
            self.m = int(inputList[1])
            self.data = [] 
            
            for index in range(2, len(inputList), 3):
                if int(inputList[index]) < 0 or int(inputList[index + 1]) < 0 or inputList[index + 2] < 0:
                    raise Exception("You entered at least one negative number!")
                
                self.data.append([int(inputList[index]), int(inputList[index + 1]), inputList[index + 2]])
        
        # enter data of the type (node, X coordinate, Y coordinate); the matrix D will always be symmetric
        elif self.type == 3:  
            if (len(inputList) - 1) % 3 != 0:
                raise Exception("The entered input does not have the correct form!")
            
            if (len(inputList) - 1) / 3 != self.n:
                raise Exception("The number of nodes is different than specified!")
            
            self.m = None
            self.data = [0] * self.n 
            
            for index in range(1, len(inputList), 3):
                if int(inputList[index]) < 0 or inputList[index + 1] < 0 or inputList[index + 2] < 0:
                    raise Exception("You entered at least one negative number!")
                
                if inputList[index] >= self.n:
                    raise Exception("Nodes are numbered from 0 to {0}, but node {1} was found!".format(self.n-1, int(inputList[index])))
                
                if self.data[int(inputList[index])] != 0:
                    raise Exception("Already set the coordonates for node {0}!".format(int(inputList[index])))
                
                self.data[int(inputList[index])] = [inputList[index + 1], inputList[index + 2]]
                
            for i in range(len(self.data) - 1):
                for j in range(i + 1, len(self.data)):
                    # 2 nodes with same coordonates
                    if self.data[i][0] == self.data[j][0] and self.data[i][1] == self.data[j][1]:
                        raise Exception("Can not have the same coordonates for 2 different nodes!")
      
       
    def createMatrix(self): 
        if self.type == 1 or self.type == 2:  
            if self.m != len(self.data):
                raise Exception("The specified number of edges ({0}) is different from the number of lines of the type: node 1 node 2 value ({1})".format(self.m, len(self.data)))
                
        if self.type == 1:    #the matrix is complete and symmetric
            for i, j, distance in self.data:
                if i < 0 or i >= self.n:
                    raise Exception("Nodes are numbered from 0 to {0}, but node {1} was found!".format(self.n-1, i))
                if j < 0 or j >= self.n:
                    raise Exception("Nodes are numbered from 0 to {0}, but node {1} was found!".format(self.n-1, j))
                
                if self.D[i, j] != np.inf:
                    raise Exception("Already set the distance from node {0} to {1}!".format(i, j))
                
                self.D[i, j] = distance
                self.D[j, i] = distance
        
        if self.type == 2:  # the matrix is asymmetric
            for i, j, distance in self.data:
                if i < 0 or i >= self.n:
                    raise Exception("Nodes are numbered from 0 to {0}, but node {1} was found!".format(self.n-1, i))
                if j < 0 or j >= self.n:
                    raise Exception("Nodes are numbered from 0 to {0}, but node {1} was found!".format(self.n-1, j))
                
                if self.D[i, j] != np.inf:
                    raise Exception("Already set the distance from node {0} to {1}!".format(i, j))
                self.D[i, j] = distance
    
        if self.type == 3:   # euclidean distances
            for i in range(self.n):
                for j in range(self.n):
                    if i != j:
                        self.D[i, j] = round(math.sqrt( 
                                (self.data[i][0] - self.data[j][0]) * (self.data[i][0] - self.data[j][0]) + \
                                    (self.data[i][1] - self.data[j][1]) * (self.data[i][1] - self.data[j][1])
                            ), 4)
                        self.D[j, i] = self.D[i, j]  
        return self.D
    
    # verify is the graph is complete (needed for approximation and heuristic algorithms)
    # the matrix created using euclidean distances is already complete
    def isComplete(self):
        if self.type == 1:
            if np.count_nonzero(self.D == np.inf) != self.n:
                raise Exception("The given graph is not complete!")   
        
    # just for input type == 1
    # the matrix is symmetric: D[i, j] = D[j, i] and D[i, k] + D[k, j] = D[j, k] + D[k, i]
    def isMetric(self):
        if self.type == 1:
            for i in range(self.n - 1):
                for j in range(i + 1, self.n):
                    for k in range(self.n):
                        if i != k and j != k:
                            if self.D[i, k] + self.D[k, j] < self.D[i, j]:  # does not hold the triangle inequality
                                raise Exception("The given set of data does not transform to a matrix that respect the triangle inequality!")
                        