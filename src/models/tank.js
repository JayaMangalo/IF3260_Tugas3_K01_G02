function loadTank() {
  gl.clearColor(0.9296875, 0.91015625, 0.8515625, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  let offsetX = 0;
  let offsetY = 0;
  let offsetZ = -40;

  //Panjang = Z
  //Lebar = X
  //Tinggi = Y

  hull = new Block(
    (origin = [offsetX, offsetY, offsetZ]),
    20,
    10,
    55,
    (obj_name = "Hull")
  );

  //Left Hull
  leftHull = new Block(
    (origin = [offsetX + 20, offsetY + 7, offsetZ]),
    8.5,
    3,
    55,
    (obj_name = "Left Hull")
  );
  leftProtection = new Block(
    (origin = [offsetX + 20 + 8.5 - 0.1, offsetY + 3, offsetZ]),
    0.1,
    4,
    55,
    (obj_name = "Left Protection")
  );
  leftBackDriveSprocket = new Block(
    (origin = [offsetX + 20 + 0.5, offsetY, offsetZ - 10]),
    7.5,
    7.5,
    7.5,
    (obj_name = "Left Back Drive Sprocket")
  );
  leftFrontDriveSprocket = new Block(
    (origin = [offsetX + 20 + 0.5, offsetY, offsetZ + 60]),
    7.5,
    7.5,
    7.5,
    (obj_name = "Left Front Drive Sprocket")
  );
  leftTrack = new Block(
    (origin = [offsetX + 20 + 0.5, offsetY, offsetZ + 25]),
    0,
    0,
    0,
    (obj_name = "Left Track")
  );

  //Left Drive Wheel
  leftRoadWheel1 = new Block(
    (origin = [offsetX + 20 + 0.5, offsetY - 5, offsetZ + 50]),
    7.5,
    7.5,
    7.5,
    (obj_name = "Left Road Wheel 1")
  );
  leftRoadWheel2 = new Block(
    (origin = [offsetX + 20 + 0.5, offsetY - 5, offsetZ + 40]),
    7.5,
    7.5,
    7.5,
    (obj_name = "Left Road Wheel 2")
  );
  leftRoadWheel3 = new Block(
    (origin = [offsetX + 20 + 0.5, offsetY - 5, offsetZ + 30]),
    7.5,
    7.5,
    7.5,
    (obj_name = "Left Road Wheel 3")
  );
  leftRoadWheel4 = new Block(
    (origin = [offsetX + 20 + 0.5, offsetY - 5, offsetZ + 20]),
    7.5,
    7.5,
    7.5,
    (obj_name = "Left Road Wheel 4")
  );
  leftRoadWheel5 = new Block(
    (origin = [offsetX + 20 + 0.5, offsetY - 5, offsetZ + 10]),
    7.5,
    7.5,
    7.5,
    (obj_name = "Left Road Wheel 5")
  );
  leftRoadWheel6 = new Block(
    (origin = [offsetX + 20 + 0.5, offsetY - 5, offsetZ]),
    7.5,
    7.5,
    7.5,
    (obj_name = "Left Road Wheel 6")
  );

  //Right Hull
  rightHull = new Block(
    (origin = [offsetX - 8.5, offsetY + 7, offsetZ]),
    8.5,
    3,
    55,
    (obj_name = "Right Hull")
  );
  rightProtection = new Block(
    (origin = [offsetX - 8.5, offsetY + 3, offsetZ]),
    0.1,
    4,
    55,
    (obj_name = "Right Protection")
  );
  rightBackDriveSprocket = new Block(
    (origin = [offsetX - 8.5 + 0.5, offsetY, offsetZ - 10]),
    7.5,
    7.5,
    7.5,
    (obj_name = "Right Back Drive Sprocket")
  );
  rightFrontDriveSprocket = new Block(
    (origin = [offsetX - 8.5 + 0.5, offsetY, offsetZ + 60]),
    7.5,
    7.5,
    7.5,
    (obj_name = "Right Front Drive Sprocket")
  );
  rightTrack = new Block(
    (origin = [offsetX - 8.5 + 0.5, offsetY, offsetZ + 25]),
    0,
    0,
    0,
    (obj_name = "Right Track")
  );

  //Right Drive Wheel
  rightRoadWheel1 = new Block(
    (origin = [offsetX - 8.5 + 0.5, offsetY - 5, offsetZ + 50]),
    7.5,
    7.5,
    7.5,
    (obj_name = "Right Road Wheel 1")
  );
  rightRoadWheel2 = new Block(
    (origin = [offsetX - 8.5 + 0.5, offsetY - 5, offsetZ + 40]),
    7.5,
    7.5,
    7.5,
    (obj_name = "Right Road Wheel 2")
  );
  rightRoadWheel3 = new Block(
    (origin = [offsetX - 8.5 + 0.5, offsetY - 5, offsetZ + 30]),
    7.5,
    7.5,
    7.5,
    (obj_name = "Right Road Wheel 3")
  );
  rightRoadWheel4 = new Block(
    (origin = [offsetX - 8.5 + 0.5, offsetY - 5, offsetZ + 20]),
    7.5,
    7.5,
    7.5,
    (obj_name = "Right Road Wheel 4")
  );
  rightRoadWheel5 = new Block(
    (origin = [offsetX - 8.5 + 0.5, offsetY - 5, offsetZ + 10]),
    7.5,
    7.5,
    7.5,
    (obj_name = "Right Road Wheel 5")
  );
  rightRoadWheel6 = new Block(
    (origin = [offsetX - 8.5 + 0.5, offsetY - 5, offsetZ]),
    7.5,
    7.5,
    7.5,
    (obj_name = "Right Road Wheel 6")
  );

  //Front Hull
  frontPlate = new Block(
    (origin = [offsetX, offsetY, offsetZ + 55]),
    0,
    0,
    0,
    (obj_name = "Front Plate")
  );
  upperFrontPlate = new TriangularPrism(
    (origin = [offsetX - 8.5, offsetY + 7, offsetZ + 55]),
    37,
    3,
    20,
    REMOVED_BATANG.DEPAN_ATAS,
    (obj_name = "Upper Front Plate")
  );
  lowerFrontPlate = new TriangularPrism(
    (origin = [offsetX, offsetY, offsetZ + 55]),
    20,
    7,
    20,
    REMOVED_BATANG.DEPAN_BAWAH,
    (obj_name = "Lower Front Plate")
  );

  //Back Hull
  engine = new Block(
    (origin = [offsetX - 8.5, offsetY + 7, offsetZ - 15]),
    37,
    3,
    15,
    (obj_name = "Engine")
  );
  upperEngine = new TriangularPrism(
    (origin = [offsetX - 8.5, offsetY + 10, offsetZ - 15]),
    37,
    2,
    30,
    REMOVED_BATANG.DEPAN_ATAS,
    (obj_name = "Upper Engine")
  );
  lowerEngine = new TriangularPrism(
    (origin = [offsetX, offsetY, offsetZ - 15]),
    20,
    7,
    15,
    REMOVED_BATANG.BELAKANG_BAWAH,
    (obj_name = "Lower Engine")
  );

  //Turret
  turretRing = new Block(
    (origin = [offsetX, offsetY + 10, offsetZ + 20]),
    20,
    0.5,
    25,
    (obj_name = "Turret Ring")
  );
  turret = new Block(
    (origin = [offsetX, offsetY + 10.5, offsetZ + 20]),
    20,
    8,
    30,
    (obj_name = "Turret")
  );
  leftTurretCheek = new TriangularPrism(
    (origin = [offsetX + 14, offsetY + 10.5, offsetZ + 50]),
    6,
    7.5,
    9.5,
    REMOVED_BATANG.DEPAN_KIRI,
    (obj_name = "Left Turret Cheek")
  );
  rightTurretCheek = new TriangularPrism(
    (origin = [offsetX, offsetY + 10.5, offsetZ + 50]),
    6,
    7.5,
    9.5,
    REMOVED_BATANG.DEPAN_KANAN,
    (obj_name = "Right Turret Cheek")
  );

  //Back Turret
  backTurret = new Block(
    (origin = [offsetX, offsetY + 12.5, offsetZ + 5]),
    20,
    6,
    15,
    (obj_name = "Back Turret")
  );
  lowerBackTurret = new TriangularPrism(
    (origin = [offsetX, offsetY + 10.5, offsetZ + 10]),
    20,
    2,
    20,
    REMOVED_BATANG.BELAKANG_BAWAH,
    (obj_name = "Lower Back Turret")
  );
  backBackTurret = new Block(
    (origin = [offsetX + 5, offsetY + 12.5, offsetZ]),
    10,
    6,
    5,
    REMOVED_BATANG.BELAKANG_BAWAH,
    (obj_name = "Back Back Turret")
  );
  leftBackBackTurret = new TriangularPrism(
    (origin = [offsetX + 15, offsetY + 12.5, offsetZ]),
    5,
    6,
    5,
    REMOVED_BATANG.BELAKANG_KIRI,
    (obj_name = "Left Back Back Turret")
  );
  rightBackBackTurret = new TriangularPrism(
    (origin = [offsetX + 0, offsetY + 12.5, offsetZ]),
    5,
    6,
    5,
    REMOVED_BATANG.BELAKANG_KANAN,
    (obj_name = "Right Back Back Turret")
  );

  //Roof
  roof = new Block(
    (origin = [offsetX, offsetY + 18.5, offsetZ + 5]),
    20,
    1.5,
    35,
    (obj_name = "Roof")
  );
  frontRoof = new TriangularPrism(
    (origin = [offsetX, offsetY + 18.5, offsetZ + 40]),
    20,
    1.5,
    10,
    REMOVED_BATANG.DEPAN_ATAS,
    (obj_name = "Front Roof")
  );

  //Cannon
  cannonBreech = new Block(
    (origin = [offsetX + 6, offsetY + 11, offsetZ + 50]),
    8,
    7.5,
    10,
    (obj_name = "Cannon Breech")
  );
  cannonBarrel = new Block(
    (origin = [offsetX + 8.5, offsetY + 13, offsetZ + 60]),
    3,
    3,
    35,
    (obj_name = "Cannon Barrel")
  );
  fumeExtractor = new Block(
    (origin = [offsetX + 8, offsetY + 13, offsetZ + 70]),
    4,
    4,
    5,
    (obj_name = "Fume Extractor")
  );

  //Left Hull
  hull.appendChild(leftHull);
  leftHull.appendChild(leftProtection);

  //Left Track and Road Wheel
  leftHull.appendChild(leftTrack);
  leftTrack.appendChild(leftBackDriveSprocket);
  leftTrack.appendChild(leftFrontDriveSprocket);
  leftTrack.appendChild(leftRoadWheel1);
  leftTrack.appendChild(leftRoadWheel2);
  leftTrack.appendChild(leftRoadWheel3);
  leftTrack.appendChild(leftRoadWheel4);
  leftTrack.appendChild(leftRoadWheel5);
  leftTrack.appendChild(leftRoadWheel6);

  //Right Hull
  hull.appendChild(rightHull);
  rightHull.appendChild(rightProtection);

  //Right Track and Road Wheel
  rightHull.appendChild(rightTrack);
  rightTrack.appendChild(rightBackDriveSprocket);
  rightTrack.appendChild(rightFrontDriveSprocket);
  rightTrack.appendChild(rightRoadWheel1);
  rightTrack.appendChild(rightRoadWheel2);
  rightTrack.appendChild(rightRoadWheel3);
  rightTrack.appendChild(rightRoadWheel4);
  rightTrack.appendChild(rightRoadWheel5);
  rightTrack.appendChild(rightRoadWheel6);

  hull.appendChild(frontPlate);
  frontPlate.appendChild(upperFrontPlate);
  frontPlate.appendChild(lowerFrontPlate);

  hull.appendChild(engine);
  engine.appendChild(upperEngine);
  engine.appendChild(lowerEngine);

  //Turret
  hull.appendChild(turret);
  turret.appendChild(turretRing);
  turret.appendChild(leftTurretCheek);
  turret.appendChild(rightTurretCheek);
  turret.appendChild(cannonBreech);

  //Back Turret
  turret.appendChild(backTurret);
  backTurret.appendChild(lowerBackTurret);
  backTurret.appendChild(backBackTurret);
  backBackTurret.appendChild(leftBackBackTurret);
  backBackTurret.appendChild(rightBackBackTurret);

  //Roof
  turret.appendChild(roof);
  roof.appendChild(frontRoof);

  //Cannon
  cannonBreech.appendChild(cannonBarrel);
  cannonBarrel.appendChild(fumeExtractor);

  shapes.push(hull);
}
