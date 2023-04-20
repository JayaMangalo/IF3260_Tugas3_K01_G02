// var translation_arr = [0,0,0];
// var rotation = [0,0,0];
// var scalation = [10,10,10]; //10 is normal , 100 is 10x bigger

// var translationSTree = [0,0,0];
// var rotationSTree = [0,0,0];
// var scalationSTree = [10,10,10]; //10 is normal , 100 is 10x bigger

//Function to transform ONLY the object
function transformObject() {
  var centerpoint = selectedObject.getCenter();

  // var matrix = m4.projection(gl.canvas.clientWidth, gl.canvas.clientHeight, 400);
  var matrix = [];
  convertToIdentityMatrix(matrix);
  matrix = translate(
    matrix,
    selectedObject.translation_arr[0],
    selectedObject.translation_arr[1],
    selectedObject.translation_arr[2]
  );
  matrix = multiply(
    matrix,
    xRotateonPoint(selectedObject.rotation[0], centerpoint)
  );
  matrix = multiply(
    matrix,
    yRotateonPoint(selectedObject.rotation[1], centerpoint)
  );
  matrix = multiply(
    matrix,
    zRotateonPoint(selectedObject.rotation[2], centerpoint)
  );
  matrix = multiply(
    matrix,
    scaleOnPoint(
      selectedObject.scalation[0] / 10,
      selectedObject.scalation[1] / 10,
      selectedObject.scalation[2] / 10,
      centerpoint
    )
  );

  selectedObject.transformSelf(matrix);
  // selectedObject.transformSubTree(matrix); //activated for testing, revert when done
  redraw();
}

//Function to transform object's subtree (including himself)
function transformObjectSubTree() {
  // var matrix = m4.projection(gl.canvas.clientWidth, gl.canvas.clientHeight, 400);
  var centerpoint = selectedObject.getCenter();

  var matrix = [];
  convertToIdentityMatrix(matrix);
  matrix = translate(
    matrix,
    selectedObject.translationSTree[0],
    selectedObject.translationSTree[1],
    selectedObject.translationSTree[2]
  );
  matrix = multiply(
    matrix,
    xRotateonPoint(selectedObject.rotationSTree[0], centerpoint)
  );
  matrix = multiply(
    matrix,
    yRotateonPoint(selectedObject.rotationSTree[1], centerpoint)
  );
  matrix = multiply(
    matrix,
    zRotateonPoint(selectedObject.rotationSTree[2], centerpoint)
  );
  matrix = multiply(
    matrix,
    scaleOnPoint(
      selectedObject.scalationSTree[0] / 10,
      selectedObject.scalationSTree[1] / 10,
      selectedObject.scalationSTree[2] / 10,
      centerpoint
    )
  );

  selectedObject.transformSubTree(matrix);

  redraw();
}

//Transformation for individual sliders for OBJECT
function rotateX(degree) {
  document.getElementById("x-angle").innerText = degree.value;
  selectedObject.rotation[0] = (degree.value * Math.PI) / 180;
  transformObject();
}
function rotateY(degree) {
  document.getElementById("y-angle").innerText = degree.value;
  selectedObject.rotation[1] = (degree.value * Math.PI) / 180;
  transformObject();
}
function rotateZ(degree) {
  document.getElementById("z-angle").innerText = degree.value;
  selectedObject.rotation[2] = (degree.value * Math.PI) / 180;
  transformObject();
}
function translateX(degree) {
  document.getElementById("x-distance").innerText = degree.value;
  selectedObject.translation_arr[0] = degree.value;
  transformObject();
}
function translateY(degree) {
  document.getElementById("y-distance").innerText = degree.value;
  selectedObject.translation_arr[1] = degree.value;
  transformObject();
}
function translateZ(degree) {
  document.getElementById("z-distance").innerText = degree.value;
  selectedObject.translation_arr[2] = degree.value;
  transformObject();
}
function scaleX(degree) {
  document.getElementById("x-ratio").innerText = degree.value;
  selectedObject.scalation[0] = degree.value;
  transformObject();
}
function scaleY(degree) {
  document.getElementById("y-ratio").innerText = degree.value;
  selectedObject.scalation[1] = degree.value;
  transformObject();
}
function scaleZ(degree) {
  document.getElementById("z-ratio").innerText = degree.value;
  selectedObject.scalation[2] = degree.value;
  transformObject();
}

//Transformation for individual sliders for tree //todo: update slider values (me too lazy)
function rotateXSTree(degree) {
  document.getElementById("xs-angle").innerText = degree.value;
  selectedObject.rotationSTree[0] = (degree.value * Math.PI) / 180;
  transformObjectSubTree();
}
function rotateYSTree(degree) {
  document.getElementById("ys-angle").innerText = degree.value;
  selectedObject.rotationSTree[1] = (degree.value * Math.PI) / 180;
  transformObjectSubTree();
}
function rotateZSTree(degree) {
  document.getElementById("zs-angle").innerText = degree.value;
  selectedObject.rotationSTree[2] = (degree.value * Math.PI) / 180;
  transformObjectSubTree();
}
function translateXSTree(degree) {
  document.getElementById("xs-distance").innerHTML = degree.value;
  selectedObject.translationSTree[0] = degree.value;
  transformObjectSubTree();
}
function translateYSTree(degree) {
  document.getElementById("ys-distance").innerHTML = degree.value;
  selectedObject.translationSTree[1] = degree.value;
  transformObjectSubTree();
}
function translateZSTree(degree) {
  document.getElementById("zs-distance").innerHTML = degree.value;
  selectedObject.translationSTree[2] = degree.value;
  transformObjectSubTree();
}
function scaleXSTree(degree) {
  document.getElementById("xs-ratio").innerHTML = degree.value;
  selectedObject.scalationSTree[0] = degree.value;
  transformObjectSubTree();
}
function scaleYSTree(degree) {
  document.getElementById("ys-ratio").innerHTML = degree.value;
  selectedObject.scalationSTree[1] = degree.value;
  transformObjectSubTree();
}
function scaleZSTree(degree) {
  document.getElementById("zs-ratio").innerHTML = degree.value;
  selectedObject.scalationSTree[2] = degree.value;
  transformObjectSubTree();
}
