function changeRadius() {
  cameraRadius = document.getElementById("camera-radius").value;
  document.getElementById("radius-value").innerHTML = cameraRadius;
  redraw((usingShape = true));
}

function changeAngleX() {
  cameraAngleX = toRadian(document.getElementById("camera-angle-x").value);
  document.getElementById("angle-value-x").innerHTML = Math.round(
    toDegree(cameraAngleX)
  );
  redraw((usingShape = true));
}

function changeAngleY() {
  cameraAngleY = toRadian(document.getElementById("camera-angle-y").value);
  document.getElementById("angle-value-y").innerHTML = Math.round(
    toDegree(cameraAngleY)
  );
  redraw((usingShape = true));
}

function changeAngleZ() {
  cameraAngleZ = toRadian(document.getElementById("camera-angle-z").value);
  document.getElementById("angle-value-z").innerHTML = Math.round(
    toDegree(cameraAngleZ)
  );
  redraw((usingShape = true));
}

function changeProjection() {
  projectionMode = document.getElementById("projection-mode").value;
  redraw((usingShape = true));
}

function resetCamera() {
  cameraRadius = 50;
  cameraAngleX = toRadian(0);
  cameraAngleY = toRadian(0);
  cameraAngleZ = toRadian(0);
  projectionMode = "orthographic";
  isUsingAnimation = false;

  document.getElementById("camera-radius").value = cameraRadius;
  document.getElementById("radius-value").innerHTML = cameraRadius;
  document.getElementById("camera-angle-x").value = toDegree(cameraAngleX);
  document.getElementById("angle-value-x").innerHTML = Math.round(
    toDegree(cameraAngleX)
  );
  document.getElementById("camera-angle-y").value = toDegree(cameraAngleY);
  document.getElementById("angle-value-y").innerHTML = Math.round(
    toDegree(cameraAngleY)
  );
  document.getElementById("camera-angle-z").value = toDegree(cameraAngleZ);
  document.getElementById("angle-value-z").innerHTML = Math.round(
    toDegree(cameraAngleZ)
  );
  document.getElementById("toggleAnimation").checked = false;
  redraw();
}
