import random
import numpy as np

class Programare_dinamica:
    def __init__(self, n, D):
        self.n = n
        self.D = D
    
    def bin_str_decomp(self, num):
        binary_num = bin(num)
        bin_clean = binary_num[:1:-1]

        return [idx for idx, bit in enumerate(bin_clean) if bit == '1']

    def TSP(self, nod_start):
   
        # initializare 
        n = self.n
        D = self.D
        V = (1 << n) - 1 # multimea cu toate nodurile
        S = 1 << n       # submultimile (2^n)
           
        # creare matrice M 
        M = np.full((S, n), np.inf)   
        copie_M = np.full((S, n), -1)
      
        # initializarea submultimilor cu 2 noduri cu valorile din matricea de distanta D
        for j in range(1, n):
            M[(1 << j) + (1 << (nod_start)), j] = D[nod_start, j]
            
            if (D[nod_start, j] == np.inf) :
                copie_M[(1 << j) + (1 << (nod_start)), j] = -1
            else :
                copie_M[(1 << j) + (1 << (nod_start)), j] = D[nod_start, j]
  
        for P in range(2, S): # iau toate submultimile
            for j in range(1, n):
                if P & (1 << j) and P & (1 << (nod_start)): # verific sa existe 0 si j in P 
                    for i in range(1, n):
                        # caut i - nod intermediar - care sa nu fie 0 sau j
                        if P & (1 << i) and i != j:         
                            lungime_drum_pana_la_i = M[P ^ (1 << j), i] + D[i, j]
                            # print(P ^ (1 << j))
                            M[P, j] = min(M[P, j], lungime_drum_pana_la_i)
                            
                            if (M[P, j] == np.inf):
                                copie_M[P, j] = -1
                            else:
                                copie_M[P, j] = M[P, j]
                            

        # determinarea solutiei optime
        solutie = float('inf')
        for j in range(n):
            solutie = min(solutie, M[V, j] + D[j, nod_start])
            
        remake_the_steps=[nod_start]
        multime = V
        nod_final = None
        valoare = np.inf
        i = None
        nod_final = nod_start
        while i == None:
            for j in range(n):
                if multime & (1 << j) and valoare > M[multime, j] + D[j, nod_final]:
                    # print(M[multime, j] + D[j, nod_final], j, nod_final)
                    valoare = M[multime, j] + D[j, nod_final]
                    i = j  
           
            if i == None: 
                break
            
            if i != None: 
                nod_final = i
                remake_the_steps.append(i)
                multime = multime ^ (1 << i)
               
                if 1 << nod_start != multime:
                    i = None
        remake_the_steps.append(nod_start)  
                
        if solutie == float('inf'):
            solutie = -1    # -1 se traduce in "Nu exista solutie" 
        
        self.D[self.D == np.inf] = -1
        
        return solutie, n, copie_M.tolist(), remake_the_steps[::-1], self.D.tolist()
