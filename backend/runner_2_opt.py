import copy
from farthest_insertion import FarthestInsertion
from nearest_insertion import NearestInsertion
from cheapest_insertion import CheapestInsertion
from nearest_neighbor import NearestNeighbor

class Doi_OPT:
    def __init__(self, n, D):
        self.n = n
        self.D = D

    def calcul_avantaj(self, f, i, j):
        return  self.D[f[i - 1], f[i]] + self.D[f[j - 1], f[j]] - self.D[f[i - 1], f[j - 1]] - self.D[f[i], f[j]]

    def schimburi(self, f, i, j):    
        # creez noul cicul
        # Exemplu: f = abcdef cu i = 2 si j = 4 => g = abdcef
        return f[: i] + f[i : j][::-1] + f[j: ]

    def opt(self, algoritm_determinare_ciclu):

        if algoritm_determinare_ciclu == "farthest-insertion":
            algoritm = FarthestInsertion(self.n, self.D)
        elif algoritm_determinare_ciclu == "nearest-insertion":
            algoritm = NearestInsertion(self.n, self.D)
        elif algoritm_determinare_ciclu == "cheapest-insertion":
            algoritm = CheapestInsertion(self.n, self.D)
        elif algoritm_determinare_ciclu == "nearest-neighbor":
            algoritm = NearestNeighbor(self.n, self.D)
        
        f, solutie = algoritm.getCycle()
        print(self.D, f, solutie)
        solutii_intermediare = []
        solutii_intermediare.append([copy.deepcopy(f), round(solutie, 4), 0, 0])
        
        while True:
            avantaj = 0
            g = f
            for i in range(self.n - 2):
                # se porneste de la i + 2 pentru ca nu se face 2-schimb pe 2 muchii care au un nod comun
                for j in range(i + 2, self.n):  
                    # previne incercarea de a face schimb intre 2 muchii cu un nod comun, caz netratat in for loop
                    if i == 0 and j == self.n - 1:   
                        continue 
                    
                    avantaj_g = self.calcul_avantaj(f, i, j)
                    if avantaj_g > avantaj: 
                        g = self.schimburi(f, i, j)
                        avantaj = avantaj_g
                        poz_i = i
                        poz_j = j
            f = g
            solutie -= avantaj
            print(solutie, avantaj)
            if avantaj == 0:
                break
                
            if len(solutii_intermediare) == 1:
                # print(solutii_intermediare)
                solutii_intermediare.append([copy.deepcopy(f), round(solutie, 4), poz_i, poz_j])
           
        
        return f, solutie, solutii_intermediare
    
    def TSP(self, repetari, algoritm_determinare_ciclu):
        print("repetari", repetari)
        solutie_minima = float("inf")

        for _ in range(repetari):
            ciclu, solutie, intermediare = self.opt(algoritm_determinare_ciclu)
            if solutie < solutie_minima:
                solutie_minima = solutie
                ciclu_solutie_minima = ciclu
                intermediare_retinute = intermediare
          
        return round(solutie_minima, 4), ciclu_solutie_minima, intermediare_retinute


