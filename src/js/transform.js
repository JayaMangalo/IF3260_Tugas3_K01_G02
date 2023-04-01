var translation_arr = [0,0,0];
var rotation = [0,0,0];
var scalation = [10,10,10]; //10 is normal , 100 is 10x bigger

var translationSTree = [0,0,0];
var rotationSTree = [0,0,0];
var scalationSTree = [10,10,10]; //10 is normal , 100 is 10x bigger

function transformObject(){
  // var matrix = m4.projection(gl.canvas.clientWidth, gl.canvas.clientHeight, 400); 
  var matrix = []
  convertToIdentityMatrix(matrix)
  matrix = translate(matrix, translation_arr[0], translation_arr[1], translation_arr[2]);
  matrix = xRotate(matrix, rotation[0]);
  matrix = yRotate(matrix, rotation[1]);
  matrix = zRotate(matrix, rotation[2]);
  matrix = scale(matrix, scalation[0]/10, scalation[1]/10, scalation[2]/10);

  // selectedObject.transformSelf(matrix);
  selectedObject.transformSubTree(matrix); //activated for testing, revert when done
  redraw()
}

function transformObjectSubTree(){
   // var matrix = m4.projection(gl.canvas.clientWidth, gl.canvas.clientHeight, 400); 
  var matrix = []
  convertToIdentityMatrix(matrix)
  matrix = translate(matrix, translationSTree[0], translationSTree[1], translationSTree[2]);
  matrix = xRotate(matrix, rotationSTree[0]);
  matrix = yRotate(matrix, rotationSTree[1]);
  matrix = zRotate(matrix, rotationSTree[2]);
  matrix = scale(matrix, scalationSTree[0]/10, scalationSTree[1]/10, scalationSTree[2]/10);

  selectedObject.transformSubTree(matrix);
  redraw()

}
// for main body //todo: update slider values (me too lazy)
function rotateX(degree){
  rotation[0] = (degree.value * Math.PI) / 180;
  selectedObject.rotation[0] = rotation[0] //savestate 
  transformObject()
} 
function rotateY(degree){
  rotation[1] = (degree.value * Math.PI) / 180;
  selectedObject.rotation[1] = rotation[1] //savestate 
  transformObject()
} 
function rotateZ(degree){
  rotation[2] = (degree.value * Math.PI) / 180;
  selectedObject.rotation[2] = rotation[2] //savestate 
  transformObject()
} 
function translateX(degree){
  translation_arr[0] = degree.value;
  selectedObject.translation_arr[0] = translation_arr[0] //savestate 
  transformObject()
} 
function translateY(degree){
  translation_arr[1] = degree.value;
  selectedObject.translation_arr[1] = translation_arr[1] //savestate 
  transformObject()
} 
function translateZ(degree){
  translation_arr[2] = degree.value;
  selectedObject.translation_arr[2] = translation_arr[2] //savestate 
  transformObject()
} 
function scaleX(degree){
  scalation[0] = degree.value;
  selectedObject.scalation[0] = scalation[0] //savestate 
  transformObject()
} 
function scaleY(degree){
  scalation[1] = degree.value;
  selectedObject.scalation[1] = scalation[1] //savestate 
  transformObject()
} 
function scaleZ(degree){
  scalation[2] = degree.value;
  selectedObject.scalation[2] = scalation[2] //savestate 
  transformObject()
} 

// for tree //todo: make the other functons (me too lazy)
function rotateXSTree(degree){
  rotationSTree[0] = (degree.value * Math.PI) / 180;
  transformSubTree()
} 
// function rotateY(degree){
//   rotation[1] = (degree.value * Math.PI) / 180;
//   transformObject()
// } 
// function rotateZ(degree){
//   rotation[2] = (degree.value * Math.PI) / 180;
//   transformObject()
// } 
// function translateX(degree){
//   translation_arr[0] = degree.value;
//   transformObject()
// } 
// function translateY(degree){
//   translation_arr[1] = degree.value;
//   transformObject()
// } 
// function translateZ(degree){
//   translation_arr[2] = degree.value;
//   transformObject()
// } 
// function scaleX(degree){
//   scalation[0] = degree.value;
//   transformObject()
// } 
// function scaleY(degree){
//   scalation[1] = degree.value;
//   transformObject()
// } 
// function scaleZ(degree){
//   scalation[2] = degree.value;
//   transformObject()
// } 