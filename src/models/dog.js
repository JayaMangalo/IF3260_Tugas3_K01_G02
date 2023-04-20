function loadDog() {
  gl.clearColor(0.9296875, 0.91015625, 0.8515625, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  body = new Block((origin = [-20, 0, -12.5]), 25, 10, 20, (obj_name = "Body"));
  head = new Block((origin = [4, 8, -8.5]), 10, 10, 12, (obj_name = "Head"));
  mouth = new Block((origin = [14, 8, -5.5]), 8, 6, 8, (obj_name = "Mouth"));
  leftEar = new Block(
    (origin = [5, 18, -0.5]),
    2,
    3,
    4,
    (obj_name = "Left Ear")
  );
  rightEar = new Block(
    (origin = [5, 18, -8.5]),
    2,
    3,
    4,
    (obj_name = "Right Ear")
  );
  frontLeftLeg = new Block(
    (origin = [0, -10, 3.5]),
    4,
    12,
    4,
    (obj_name = "Front Left Leg")
  );
  frontRightLeg = new Block(
    (origin = [0, -10, -12.5]),
    4,
    12,
    4,
    (obj_name = "Front Right Leg")
  );
  backLeftLeg = new Block(
    (origin = [-20, -10, 3.5]),
    4,
    12,
    4,
    (obj_name = "Back Left Leg")
  );
  backRightLeg = new Block(
    (origin = [-20, -10, -12.5]),
    4,
    12,
    4,
    (obj_name = "Back Right Leg")
  );

  body.appendChild(head);
  body.appendChild(frontLeftLeg);
  body.appendChild(frontRightLeg);
  body.appendChild(backLeftLeg);
  body.appendChild(backRightLeg);
  head.appendChild(mouth);
  head.appendChild(leftEar);
  head.appendChild(rightEar);

  shapes.push(body);
}
