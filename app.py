from flask import Flask, render_template, request
import re
import math
from anytree import Node

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('calculator.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    expression = request.form['expression']
    components = analyze_expression(expression)
    result = evaluate_expression(expression)
    return render_template('calculator.html', components=components, result=result)

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

if __name__ == '__main__':
    app.run(debug=True)
