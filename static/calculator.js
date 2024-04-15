function appendToExpression(value) {
  document.getElementById("expression").value += value;
}

function clearExpression() {
  document.getElementById("expression").value = "";
}

function allowOnlyCalculatorChars(event) {
  var allowedChars = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "-",
    "*",
    "/",
    ".",
    "(",
    ")",
    "Backspace",
    "Delete",
  ];
  var key = event.key;
  if (allowedChars.includes(key)) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
}

function showTree() {
  var treeDiv = document.querySelector(".tree");
  treeDiv.style.display = "block";

  var treeDataStr = treeDiv.getAttribute("data-tree-data");

  try {
    console.log("Tree data string:", treeDataStr); // Para depuración
    var treeData = JSON.parse(treeDataStr);
    console.log("Tree data:", treeData); // Para depuración
    renderTree(treeData);
  } catch (error) {
    console.log("Error building tree:", error);
  }
}

function renderTree(treeData) {
  var margin = { top: 40, right: 90, bottom: 50, left: 90 };
  var width = 960 - margin.left - margin.right;
  var height = 600 - margin.top - margin.bottom;

  var color = d3.scaleOrdinal(d3.schemeCategory10); // Escala de colores

  var svg = d3
    .select(".tree svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var tree = d3.tree().size([height, width]);

  var root = d3.hierarchy(treeData);

  var treeData = tree(root);

  // Añadir enlaces coloreados
  svg
    .selectAll(".link")
    .data(treeData.links())
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("stroke", "#ccc") // Color de los enlaces
    .attr(
      "d",
      d3
        .linkHorizontal()
        .x(function (d) {
          return d.y;
        })
        .y(function (d) {
          return d.x;
        })
    );

  // Añadir nodos con color
  var node = svg
    .selectAll(".node")
    .data(treeData.descendants())
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", function (d) {
      return "translate(" + d.y + "," + d.x + ")";
    });

  node
    .append("circle")
    .attr("r", 10)
    .attr("fill", function (d) {
      return color(d.depth);
    }); // Asignar color al nodo según su profundidad

  node
    .append("text")
    .attr("dy", ".35em")
    .attr("x", function (d) {
      return d.children || d._children ? -13 : 13;
    })
    .attr("text-anchor", function (d) {
      return d.children || d._children ? "end" : "start";
    })
    .text(function (d) {
      return d.data.name;
    });
}
