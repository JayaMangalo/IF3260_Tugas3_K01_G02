shapes = [];                //shapes are the models in trees
TreeArray = [];             //TreeArray are the models with PreOrdering 
                            //they kinda do the same thing, but me too lazy to do it better
var selectedObject = null;

modelsCenterPoint = [];
var isUsingShader = true;
var isUsingAnimation = false;
var animationAngle = 0;
var btn_id = 0;

function onLoad() {
  //Initialize the WebGL
  init();
  loadEXPERIMENT();

  traverseTree(shapes)
  redraw()

  document.getElementById("camera-angle-x").value = -30 //for testing purposes, remove later
  document.getElementById("camera-angle-y").value = -40
  changeAngleX()
  changeAngleY()
}

function preOrder(node,depth) { 
  var br = document.createElement("BR");
  document.getElementById("treecontainer").appendChild(br);       //i dont know how to do this cleaner

  let offset = "&nbsp&nbsp&nbsp"                                            //i dont know how to do this cleaner
  let newOffset = ""
  for(var i=0; i<depth; i++){
    newOffset += offset;
  }
  document.getElementById("treecontainer").innerHTML += newOffset 

  TreeArray.push(node)
  var btn = document.createElement("BUTTON");    
  btn.innerText = node.name                
  btn.id="treebutton" + btn_id;
  btn_id++;

  document.getElementById("treecontainer").appendChild(btn);

  node.children.forEach(function (child) {
    preOrder(child,depth+1)
  })

} 

function addListeners(){
  buttonlist = document.getElementById("treecontainer").querySelectorAll("button")

  for (let index = 0; index < buttonlist.length; index++) {
    buttonlist[index].addEventListener('click',function(){
      setCurrentObject(index)
    })
  }
}

function setCurrentObject(index){
  selectedObject = TreeArray[index]
  document.getElementById("selectedobject").innerText = selectedObject.name 
}

function traverseTree(){
  shapes.forEach(function (shape) {
    preOrder(shape,0);
  }); 
  addListeners();
  setCurrentObject(0)
}



function saveShapes() {
  // json = { type: "model", data: [] };
  // for (shape of shapes) {
  //   json.data.push(shape.toString());
  // }
  // for (model of models) {
  //   for (shape of model) {
  //     json.data.push(shape);
  //   }
  // }
  // const link = document.createElement("a");
  // const file = new Blob([JSON.stringify(json)], { type: "text/plain" });
  // link.href = URL.createObjectURL(file);
  // link.download = "model.json";
  // link.click();
  // link.remove();
}

function redraw() {
  var id = new Float32Array(16);
  convertToIdentityMatrix(id);
  view();
  var loop = () => {
    if (isUsingAnimation) { //NOTE: animation doesnt work because the object is setting its own matWorldLocation everytime it draws, TODO: transform the matrix on the object instead
      // create rotAngle based on time in range of [-360, 360]
      rotAngle = (performance.now() / 10000) * 360;
      if (rotAngle > 360) {
        rotAngle = -360 + (rotAngle % 360);
      }

      document.getElementById("camera-angle-y").value = Math.round(rotAngle);
      document.getElementById("angle-value-y").innerHTML = Math.round(rotAngle);
      rotAngle = toRadian(rotAngle);
      rotate(worldMatrix, id, rotAngle, [0, 1, 0]);
    }
    gl.uniformMatrix4fv(matWorldLocation, gl.FALSE, worldMatrix);
    gl.clearColor(0.9296875, 0.91015625, 0.8515625, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    shapes.forEach((shape) => {
      shape.draw(isUsingShader);
    });

    if (isUsingAnimation) {
      requestAnimationFrame(loop);
    }
  };
  requestAnimationFrame(loop);
}

function toggleShadder() {
  let isShader = document.getElementById("toggleShadder").checked;
  isUsingShader = isShader;
  redraw();
}

function toggleAnimation() {
  isUsingAnimation = document.getElementById("toggleAnimation").checked;
  redraw();
}


onLoad();

//TODO

//CORE STUFF
// multiple textures (all)
// wait for textures to load before continuing
// tostring (save/load)

// mau indices atau no-indices
// normals
// animation
// spek lanjutan

// make sliders for subtree

// MINOR STUFF/bugs
// a way to rotate objects during init (an easy way is to set a hidden rotation matrix during init time, main issue is which order should the matrices be calculated)
// rotate and scale with center of object as origin point (ask chatgpt/stackoverflow for how to, there is the math for this)
// if u rotate 2 different heads, they wont stick exactly to the body (this is maybe because of the order matrices are calculated or because they arent rotated on their center (probably this))

//other stuff i may have missed
