from flask import Flask, Response, jsonify, request
from flask_cors import CORS

from cheapest_insertion import CheapestInsertion
from farthest_insertion import FarthestInsertion
from nearest_insertion import NearestInsertion
from nearest_neighbor import NearestNeighbor
from input import Input
import runner_bb
import runner_pd
import runner_2_opt
import runner_3_opt
import runner_christofides
import runner_double_tree
import json

app = Flask(__name__)
CORS(app, origins="http://localhost:4200")

@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        res = Response()
        res.headers['X-Content-Type-Options'] = '*'
        return res
        
        
# @app.route('/', methods=["GET"])
# def index():
#     return render_template("index.html")

@app.route('/getCodeDynamicProgramming', methods=["GET"])
def getCodeDynamicProgramming():
    f = open("dynamic_programming.py", mode="r")
    cod = f.read()
    f.close()
    return jsonify(cod), 200

@app.route('/getCodeBranchAndBound', methods=["GET"])
def getCodeBranchAndBound():
    f = open("branch_and_bound.py", mode="r")
    cod = f.read()
    f.close()
    return jsonify(cod), 200

@app.route('/getCodeDoubleTree', methods=["GET"])
def getCodeDoubleTree():
    f = open("double_tree_algorithm.py", mode="r")
    cod = f.read()
    f.close()
    return jsonify(cod), 200

@app.route('/getCodeChristofides', methods=["GET"])
def getCodeChristofides():
    f = open("algorithm_christofides.py", mode="r")
    cod = f.read()
    f.close()
    return jsonify(cod), 200

@app.route('/getCode2OPT', methods=["GET"])
def getCode2OPT():
    f = open("algorithm_2_opt.py", mode="r")
    cod = f.read()
    f.close()
    return jsonify(cod), 200

@app.route('/getCode3OPT', methods=["GET"])
def getCode3OPT():
    f = open("algorithm_3_opt.py", mode="r")
    cod = f.read()
    f.close()
    return jsonify(cod), 200

@app.route('/getCodeFarthestInsertion', methods=["GET"])
def getCodeFarthestInsertion():
    f = open("farthest_insertion.py", mode="r")
    cod = f.read()
    f.close()
    return jsonify(cod), 200

@app.route('/getCodeNearestInsertion', methods=["GET"])
def getCodeNearestInsertion():
    f = open("nearest_insertion.py", mode="r")
    cod = f.read()
    f.close()
    return jsonify(cod), 200

@app.route('/getCodeCheapestInsertion', methods=["GET"])
def getCodeCheapestInsertion():
    f = open("cheapest_insertion.py", mode="r")
    cod = f.read()
    f.close()
    return jsonify(cod), 200

@app.route('/getCodeNearestNeighbor', methods=["GET"])
def getCodeNearestNeighbor():
    f = open("nearest_neighbor.py", mode="r")
    cod = f.read()
    f.close()
    return jsonify(cod), 200

@app.route('/getCodeInputClass', methods=["GET"])
def getCodeInputClass():
    f = open("input.py", mode="r")
    cod = f.read()
    f.close()
    return jsonify(cod), 200

@app.route('/runCodeDynamicProgramming', methods=["POST"])
def runCodeDynamicProgramming():
    data = request.get_data(as_text=True) 
    decoded_data = json.loads(data)
    
    inputData = decoded_data["input"]
    inputType = decoded_data["inputType"]

    try:
        input = Input(inputData, inputType)
        matrix = input.createMatrix(inputType)
            
        programare_dinamica = runner_pd.Programare_dinamica(input.n, matrix)
        solutie = programare_dinamica.TSP(0)
    
    except Exception as e:
        return jsonify(e.args), 500
    
    return jsonify(solutie), 200


@app.route('/runCodeBranchAndBound', methods=["POST"])
def runCodeBranchAndBound():
    data = request.get_data(as_text=True) 
    decoded_data = json.loads(data)
    
    inputData = decoded_data["input"]
    inputType = decoded_data["inputType"]
    
    try:
        input = Input(inputData, inputType)
        matrix = input.createMatrix(inputType)     
        branch_and_bound = runner_bb.Branch_and_Bound(input.n, matrix)
        response = branch_and_bound.TSP(0)
        
    except Exception as e:
        return jsonify(e.args), 500
    
    return jsonify(response), 200


@app.route('/runCodeDoubleTree', methods=["POST"])
def runCodeDoubleTree():
    data = request.get_data(as_text=True) 
    decoded_data = json.loads(data)
    
    inputData = decoded_data["input"]
    inputType = decoded_data["inputType"]
    
    try:
        input = Input(inputData, inputType)
        matrix = input.createMatrix()
        input.isComplete()
        input.isMetric()
        doubleTree = runner_double_tree.AlgoritmulArboreluiDublu(input.n, matrix)
        response = doubleTree.TSP()
     
    except Exception as e:
        return jsonify(e.args), 500
    
    return jsonify(response), 200


@app.route('/runCodeChristofides', methods=["POST"])
def runCodeChristofides():
    data = request.get_data(as_text=True) 
    decoded_data = json.loads(data)
    
    inputData = decoded_data["input"]
    inputType = decoded_data["inputType"]
    algoritm = decoded_data["algorithm"]
    noRepetitions = decoded_data["noRepetitions"]
    try:
        input = Input(inputData, inputType)
        matrix = input.createMatrix()
        input.isComplete()
        input.isMetric()
        christofides = runner_christofides.Christofides(input.n, matrix)
        response = christofides.TSP(algoritm, noRepetitions)
     
    except Exception as e:
        return jsonify(e.args), 500
    
    return jsonify(response), 200


@app.route('/runCode2OPT', methods=["POST"])
def runCode2OPT():
    data = request.get_data(as_text=True) 
    decoded_data = json.loads(data)
    
    inputData = decoded_data["input"]
    inputType = decoded_data["inputType"]
    algoritm = decoded_data["algorithm"]
    noRepetitions = decoded_data["noRepetitions"]
    
    try:
        input = Input(inputData, inputType)      
        matrix = input.createMatrix()
        input.isComplete()
        input.isMetric()
        doi_opt = runner_2_opt.Doi_OPT(input.n, matrix)
        response = doi_opt.TSP(noRepetitions, algoritm)
        
    except Exception as e:
        return jsonify(e.args), 500
    
    return jsonify(response), 200

@app.route('/runCode3OPT', methods=["POST"])
def runCode3OPT():
    data = request.get_data(as_text=True) 
    decoded_data = json.loads(data)
    
    inputData = decoded_data["input"]
    inputType = decoded_data["inputType"]
    algoritm = decoded_data["algorithm"]
    noRepetitions = decoded_data["noRepetitions"]
    
    try:
        input = Input(inputData, inputType)
        matrix = input.createMatrix()
        input.isComplete()
        input.isMetric()
        trei_opt = runner_3_opt.Trei_OPT(input.n, matrix)
        response = trei_opt.TSP(noRepetitions, algoritm)
        
    except Exception as e:
        return jsonify(e.args), 500
    
    return jsonify(response), 200

@app.route('/runCodeFarthestInsertion', methods=["POST"])
def runCodeFarthestInsertion():
    data = request.get_data(as_text=True) 
    decoded_data = json.loads(data)
    inputData = decoded_data["input"]
    inputType = decoded_data["inputType"]

    try:
        input = Input(inputData, inputType)
        matrix = input.createMatrix()
        input.isComplete()
        input.isMetric()
        farthest_insertion = FarthestInsertion(input.n, matrix)
        response = farthest_insertion.getCycle()
        
    except Exception as e:
        return jsonify(e.args), 500
    
    return jsonify(response), 200


@app.route('/runCodeNearestInsertion', methods=["POST"])
def runCodeNearestInsertion():
    data = request.get_data(as_text=True) 
    decoded_data = json.loads(data)
    inputData = decoded_data["input"]
    inputType = decoded_data["inputType"]

    try:
        input = Input(inputData, inputType)
        matrix = input.createMatrix() 
        input.isComplete()
        input.isMetric()  
        nearest_insertion = NearestInsertion(input.n, matrix)
        response = nearest_insertion.getCycle()
        
    except Exception as e:
        return jsonify(e.args), 500
    
    return jsonify(response), 200

@app.route('/runCodeCheapestInsertion', methods=["POST"])
def runCodeCheapestInsertion():
    data = request.get_data(as_text=True) 
    decoded_data = json.loads(data)
    inputData = decoded_data["input"]
    inputType = decoded_data["inputType"]

    try:
        input = Input(inputData, inputType)
        matrix = input.createMatrix()
        input.isComplete() 
        input.isMetric()
        cheapest_insertion = CheapestInsertion(input.n, matrix)
        response = cheapest_insertion.getCycle()
        
    except Exception as e:
        return jsonify(e.args), 500
    
    return jsonify(response), 200

@app.route('/runCodeNearestNeighbor', methods=["POST"])
def runCodeNearestNeighbor():
    data = request.get_data(as_text=True) 
    decoded_data = json.loads(data)
    inputData = decoded_data["input"]
    inputType = decoded_data["inputType"]

    try:
        input = Input(inputData, inputType)
        matrix = input.createMatrix()
        input.isComplete()
        input.isMetric() 
        nearest_neighbor = NearestNeighbor(input.n, matrix)
        response = nearest_neighbor.getCycle()
        
    except Exception as e:
        return jsonify(e.args), 500
    
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)