shapes = []; //shapes are the models in trees
TreeArray = []; //TreeArray are the models with PreOrdering
//they kinda do the same thing, but me too lazy to do it better
var selectedObject = null;

modelsCenterPoint = [];
var isUsingAnimation = false;
var animationAngle = 0;
var btn_id = 0;

var fps = 3;
var frames = [];
var isPlaying = false;
var startFrame = 0;
var endFrame = 0;
var currentFrame = 0;

function onLoad() {
  //Initialize the WebGL
  init();

  //Real Model
  // loadDragon();
  // loadTank();
  // loadDog();
  // loadPerson();
  loadDuck();

  //Model For Texting Texture
  // loadCube();

  traverseTree(shapes);
  redraw();

  // document.getElementById("camera-angle-x").value = 0; //for testing purposes, remove later
  // document.getElementById("camera-angle-y").value = 90;
  // changeAngleX();
  // changeAngleY();
}

function preOrder(node, depth) {
  var br = document.createElement("BR");
  document.getElementById("tree").appendChild(br); //i dont know how to do this cleaner

  let offset = "&nbsp&nbsp&nbsp"; //i dont know how to do this cleaner
  let newOffset = "";
  for (var i = 0; i < depth; i++) {
    newOffset += offset;
  }
  document.getElementById("tree").innerHTML += newOffset;

  TreeArray.push(node);
  var btn = document.createElement("BUTTON");
  btn.innerText = node.name;
  btn.id = "treebutton" + btn_id;
  btn_id++;

  document.getElementById("tree").appendChild(btn);

  node.children.forEach(function (child) {
    preOrder(child, depth + 1);
  });
}

function addListeners() {
  buttonlist = document.getElementById("tree").querySelectorAll("button");

  for (let index = 0; index < buttonlist.length; index++) {
    buttonlist[index].addEventListener("click", function () {
      setCurrentObject(index);
    });
  }
}

function setCurrentObject(index) {
  selectedObject = TreeArray[index];
  document.getElementById("selectedobject").innerText = selectedObject.name;
}

function traverseTree() {
  document.getElementById("tree").innerHTML = "";
  shapes.forEach(function (shape) {
    preOrder(shape, 0);
  });
  addListeners();
  setCurrentObject(0);
}

function changeFPS() {
  if (isPlaying) {
    isPlaying = false;
    document.getElementById("play-animation-button").innerHTML =
      "<img src='./assets/icons/play.svg' type='image/svg+xml' />";
  }

  fps = document.getElementById("fps").value;
  document.getElementById("fps-value").innerHTML = fps;
}

function changeFrameRange() {
  if (isPlaying) {
    isPlaying = false;
    document.getElementById("play-animation-button").innerHTML =
      "<img src='./assets/icons/play.svg' type='image/svg+xml' />";
  }

  startFrame = Number(document.getElementById("start-frame").value);
  endFrame = Number(document.getElementById("end-frame").value);

  if (startFrame > endFrame) {
    startFrame = 0;
    endFrame = 0;
    alert("Start frame cannot be greater than end frame");
    return;
  }
  if (startFrame < 0) {
    startFrame = 0;
    alert("Start frame cannot be less than 0");
    return;
  }
  if (endFrame >= frames.length) {
    endFrame = frames.length - 1;
    alert(
      "End frame cannot be greater than the number of frames counted from zero (" +
        endFrame +
        " frames)"
    );
    return;
  }

  if (currentFrame < startFrame) {
    currentFrame = startFrame;
  }
  if (currentFrame > endFrame) {
    currentFrame = endFrame;
  }
}

function playAnimation() {
  var interval = 1000 / fps;

  if (frames.length == 0) {
    alert("No animation to play");
    return;
  }

  if (!isPlaying) {
    isPlaying = true;
    document.getElementById("play-animation-button").innerHTML =
      "<img src='./assets/icons/pause.svg' type='image/svg+xml' />";

    let i = startFrame;
    if (currentFrame != 0) {
      i = currentFrame;
    }

    let updateFrame = setInterval(function () {
      for (var j = 0; j < TreeArray.length; j++) {
        setCurrentObject(j);
        selectedObject.translation_arr = frames[i][j].translation;
        selectedObject.rotation = frames[i][j].rotation;
        selectedObject.scalation = frames[i][j].scalation;
        selectedObject.translationSTree = frames[i][j].translationSTree;
        selectedObject.rotationSTree = frames[i][j].rotationSTree;
        selectedObject.scalationSTree = frames[i][j].scalationSTree;

        transformObject();
        transformObjectSubTree();
      }
      i++;
      currentFrame = i;
      if (i == endFrame + 1) {
        // playing infinitely until stop is pressed
        i = startFrame;
        currentFrame = startFrame;
      }
      if (!isPlaying) {
        clearInterval(updateFrame);
        i = startFrame;
      }
    }, interval);
  } else {
    isPlaying = false;
    document.getElementById("play-animation-button").innerHTML =
      "<img src='./assets/icons/play.svg' type='image/svg+xml' />";
  }
}

function replayAnimation() {
  currentFrame = startFrame;
  playAnimation();
}

function reverseAnimation() {
  if (isPlaying) {
    isPlaying = false;
    document.getElementById("play-animation-button").innerHTML =
      "<img src='./assets/icons/play.svg' type='image/svg+xml' />";
  }
  frames.reverse();
}

function redraw() {
  var id = new Float32Array(16);
  convertToIdentityMatrix(id);
  view();
  var loop = () => {
    if (isUsingAnimation) {
      //NOTE: animation doesnt work because the object is setting its own matWorldLocation everytime it draws, TODO: transform the matrix on the object instead
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
      shape.draw(true);
    });

    if (isUsingAnimation) {
      requestAnimationFrame(loop);
    }
  };
  requestAnimationFrame(loop);
}

function toggleShadder() {
  let isShader = document.getElementById("toggleShadder").checked;
  if (isShader) {
    isUsingShadder = 1.0;
  } else {
    isUsingShadder = 0.0;
  }
  redraw();
}

onLoad();

function changeTexture() {
  var texture = document.getElementById("texture").value;
  if (texture == "custom") {
    choosenTexture = 0.0;
  } else if (texture == "env") {
    choosenTexture = 1.0;
  } else {
    choosenTexture = 2.0;
  }
  redraw();
}

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

//other stuff i may have missed
