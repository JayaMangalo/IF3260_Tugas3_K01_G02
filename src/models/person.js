function loadPerson() {
  gl.clearColor(0.9296875, 0.91015625, 0.8515625, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  body = new Block((origin = [-4, -4, -12.5]), 8, 16, 8, (obj_name = "Body"));
  head = new Block((origin = [-4, 12, -12.5]), 8, 8, 8, (obj_name = "Head"));
  leftHand = new Block((origin = [4, -6, -12.5]), 4, 18, 8, (obj_name = "Left Hand"));
  rightHand = new Block((origin = [-8, -6, -12.5]), 4, 18, 8, (obj_name = "Right Hand"));
  pelvis = new Block((origin = [-4, -6, -12.5]), 8, 2, 8, (obj_name = "Pelvis"));
  leftFoot = new Block((origin = [0, -24, -12.5]), 4, 18, 8, (obj_name = "Left Foot"));
  rightFoot = new Block((origin = [-4, -24, -12.5]), 4, 18, 8, (obj_name = "Right Foot"));
  
  body.appendChild(head);
  body.appendChild(leftHand)
  body.appendChild(rightHand)
  body.appendChild(pelvis)
  pelvis.appendChild(leftFoot)
  pelvis.appendChild(rightFoot)

  shapes.push(body);
}
