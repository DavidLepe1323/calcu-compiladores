from flask import Flask, render_template, request
import re
import math
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('calculator.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    expression = request.form['expression']
    components = analyze_expression(expression)
    result = evaluate_expression(expression)
    # Generar la data del árbol y pasarla como string JSON
    tree_data = generate_syntax_tree(expression)
    return render_template('calculator.html', components=components, result=result, tree_data=json.dumps(tree_data))

def analyze_expression(expression):
    components = re.findall(r'\d+|[()+\-*/]', expression)
    analyzed_components = []
    for component in components:
        if component.isdigit():
            analyzed_components.append((component, 'Número'))
        else:
            analyzed_components.append((component, 'Operador'))
    return analyzed_components

def evaluate_expression(expression):
    expression = expression.replace('^', '**')
    return eval(expression, {'__builtins__': None}, {'math': math})

def generate_syntax_tree(expression):
    # Aquí debes implementar la lógica para generar la data del árbol sintáctico
    # Puedes usar cualquier estructura de datos que represente el árbol, por ejemplo un diccionario
    # Por ahora, supongamos que generamos una estructura de datos dummy
    return {"name": "Raíz", "children": [{"name": "Nodo 1"}, {"name": "Nodo 2"}]}

if __name__ == '__main__':
    app.run(debug=True)
