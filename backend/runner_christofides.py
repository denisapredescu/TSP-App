from copy import deepcopy
import heapq
import random
import numpy as np
import networkx as nx

class Christofides:
    def __init__(self, n, D):
        self.n = n
        self.D = D
            
    def prim(self, nod_start):    
        d = np.full(self.n, np.inf)       # distante
        vizitat = np.full(self.n, 0)      # se tine evidenta daca un nod a fost vizitat sau nu
        h = []                            # coada de prioritati
        d[nod_start] = 0    
        grade = np.full(self.n, 0)
        
        # lista de adiacenta in care va fi pastrat arborele de cost minim
        arbore = [[] for _ in range(self.n)]  
        muchii_arbore = []
        # se introduce in coada primul nod si costul drumului pana la acesta
        heapq.heappush(h, [d[nod_start], nod_start, -1]) 
        
        for _ in range(self.n):                  
            _, nod, tata = heapq.heappop(h)  
            print(nod, tata)   
            while vizitat[nod] == 1:
                _, nod, tata =  heapq.heappop(h)  
            
            print(vizitat)
            vizitat[nod] = 1 
            if tata != -1:
                grade[nod] += 1
                grade[tata] += 1 
                arbore[nod].append(tata)
                arbore[tata].append(nod)
                muchii_arbore.append([tata, nod])
            print(d)
            # se pun si vecinii lui nevizitati in coada, daca distanta pana la ei se micsoreaza
            for vecin in range(self.n):           
                if self.D[nod, vecin] != np.inf and vizitat[vecin] == 0 and d[vecin] > self.D[nod, vecin]:  
                    d[vecin] = self.D[nod, vecin]
                    heapq.heappush(h, [d[vecin], vecin, nod])   

        return arbore, grade, muchii_arbore
    
    
    def determinare_noduri_cu_grad_impar(self, grade):
        return [i for i in range(len(grade)) if grade[i] % 2 == 1]    
        
            
    def greedy_matching(self, arbore, noduri_impare, repetari):
        print("greedy", repetari)
        rezerva = deepcopy(noduri_impare)
        solutie_minima = float("inf")
        muchii_match_solutie_minima = None
        
        for _ in range(repetari):
            while True:
                solutie = 0
                ok = True
                muchii_match = []      
                noduri_impare = deepcopy(rezerva)
                random.shuffle(noduri_impare)

                while len(noduri_impare) != 0:
                    u = noduri_impare.pop()
                    lungime_muchie = np.inf
                    pereche_u = None
                    for v in noduri_impare:
                        # se ia muchia dintre u si nodul cel mai apropiat de u
                        if u != v and self.D[u, v] < lungime_muchie and (not v in arbore[u]):
                            lungime_muchie = self.D[u, v]
                            pereche_u = v  
                    
                    if pereche_u == None: 
                        ok = False
                        noduri_impare = []
                    else:
                        solutie += lungime_muchie
                        noduri_impare.remove(pereche_u)
                        muchii_match.append([u, pereche_u])
                
                if ok == True:   
                    break
                
            if solutie < solutie_minima:
                solutie_minima = solutie
                muchii_match_solutie_minima = muchii_match
        
        return muchii_match_solutie_minima
        
        
    def minimum_peftect_matching(self, arbore, noduri_impare):
        print("minim perf matching")
        G = nx.Graph()

        for i in range(len(noduri_impare) - 1):
            for j in range(i + 1, len(noduri_impare)):
                nod_i = noduri_impare[i]
                nod_j = noduri_impare[j]
                if (not nod_j in arbore[nod_i]):
                    G.add_edge(nod_i, nod_j, weight=-self.D[nod_i, nod_j])
        print("ajunge", G.edges)           
        muchii_match = nx.algorithms.matching.max_weight_matching(G, maxcardinality=True, weight='weight')
        print(muchii_match)
        return list(muchii_match)

    def adaugare_noduri_la_arbore(self, arbore, muchii_match):
        for u, v in muchii_match:
            arbore[u].append(v)
            arbore[v].append(u)
                
    def ciclu_hamiltonian(self, graf, k):
        vizitat = [0 for _ in range(self.n)]
        # initizare drum cu primul nod
        drum = [k]
        # initializare ciclu cu lista vida
        ciclu = []

        while len(drum) != 0:
            nod_curent = drum[-1]

            if len(graf[nod_curent]) == 0:
                # nodul curent nu mai are vecini nevizitati de el (muchii neparcurse), se adauga in ciclul 
                if vizitat[nod_curent] == 0:
                    ciclu.append(nod_curent)
                    vizitat[nod_curent] = 1
                
                if len(drum) == 1:
                    ciclu.append(nod_curent)
                    
                drum.pop()
            else:
                # se alege un vecin care se introduce in drum
                vecin = graf[nod_curent].pop(0) 
                drum.append(vecin)
                
                # elimin muchia si din directia opusa
                graf[vecin].remove(nod_curent) 
        
        return ciclu
        
    def valoare_ciclu(self, ciclu):
        solutie = 0
        for i in range(len(ciclu) - 1):
            solutie += self.D[ciclu[i], ciclu[i + 1]]
            
        return solutie


    def TSP(self, matching, repetari):
        nod_start = random.randint(0, self.n - 1)
        print(nod_start)
        arbore, grade, muchii_arbore = self.prim(nod_start)
        print("arbore")
        noduri_impare = self.determinare_noduri_cu_grad_impar(grade)
        copie_noduri_impare = noduri_impare.copy()
        print("tsp")
        if matching == "greedy-matching":
            muchii_match = self.greedy_matching(arbore, noduri_impare, repetari)
        else: 
            muchii_match = self.minimum_peftect_matching(arbore, noduri_impare)
        
        self.adaugare_noduri_la_arbore(arbore, muchii_match)
        ciclu = self.ciclu_hamiltonian(arbore, nod_start)
        solutie = self.valoare_ciclu(ciclu)

        return round(solutie, 4), muchii_arbore, copie_noduri_impare, muchii_match, ciclu
