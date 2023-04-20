function loadDuck() {
  gl.clearColor(0.9296875, 0.91015625, 0.8515625, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  body = new Block((origin = [-10, -10, -10]), 25, 15, 20, (obj_name = "Body"));
  neck = new Block((origin = [12, -5, -2.5]), 5, 20, 5, (obj_name = "Neck"));
  head = new Block((origin = [11, 15, -4]), 10, 7, 8, (obj_name = "Head"));
  beak = new TriangularPrism(
    (origin = [21, 15, -2]),
    3,
    3,
    4,
    REMOVED_BATANG.KIRI_ATAS,
    (obj_name = "Beak")
  );
  tail = new TriangularPrism(
    (origin = [-23, -10, -10]),
    13,
    15,
    20,
    REMOVED_BATANG.KANAN_BAWAH,
    (obj_name = "Tail")
  );
  rightWing = new TriangularPrism(
    (origin = [-3, -8, 10]),
    18,
    13,
    2,
    REMOVED_BATANG.KANAN_BAWAH,
    (obj_name = "Right Wing")
  );
  leftWing = new TriangularPrism(
    (origin = [-3, -8, -12]),
    18,
    13,
    2,
    REMOVED_BATANG.KANAN_BAWAH,
    (obj_name = "Left Wing")
  );
  rightFoot = new Block(
    (origin = [0, -25, 2]),
    3,
    15,
    3,
    (obj_name = "Right Foot")
  );
  leftFoot = new Block(
    (origin = [0, -25, -6]),
    3,
    15,
    3,
    (obj_name = "Left Foot")
  );

  body.appendChild(neck);
  body.appendChild(tail);
  body.appendChild(rightWing);
  body.appendChild(leftWing);
  body.appendChild(rightFoot);
  body.appendChild(leftFoot);
  neck.appendChild(head);
  head.appendChild(beak);

  shapes.push(body);
}
