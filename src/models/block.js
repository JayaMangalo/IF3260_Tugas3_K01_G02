class Block extends Obj {
  constructor(origin, length, height, width, obj_name) {
    super(obj_name);

    this.origin = origin;
    this.center = [
      this.origin[0] + length / 2,
      this.origin[1] + height / 2,
      this.origin[2] + width / 2,
    ];

    this.length = length;
    this.height = height;
    this.width = width;

    this.texture = "texture"; //to be implemented //currently its hardcoded to use webglfundamentals one

    this.createVertices(length, height, width);
    this.createPlanes();
  }
  toTriangle(p1, p2, p3, p4) {
    return [
      p1.concat([1, 1]).concat(calculateTangetSpace(p1, p2, p3)), //still in progress, will change later on
      p2.concat([0, 1]).concat(calculateTangetSpace(p2, p3, p4)),
      p3.concat([0, 0]).concat(calculateTangetSpace(p3, p1, p2)),

      p1.concat([1, 1]).concat(calculateTangetSpace(p1, p3, p4)),
      p3.concat([0, 0]).concat(calculateTangetSpace(p3, p4, p1)),
      p4.concat([1, 0]).concat(calculateTangetSpace(p4, p1, p2)),
    ];
  }

  createVertices(l, h, w) {
    let x = this.origin[0];
    let y = this.origin[1];
    let z = this.origin[2];

    this.leftbotnear = [x, y, z + w];
    this.rightbotnear = [x + l, y, z + w];
    this.rightbotfar = [x + l, y, z];
    this.leftbotfar = [x, y, z];

    this.lefttopnear = [x, y + h, z + w];
    this.righttopnear = [x + l, y + h, z + w];
    this.righttopfar = [x + l, y + h, z];
    this.lefttopfar = [x, y + h, z];
  }
  createPlanes() {
    this.batang = [
      this.toTriangle(
        this.leftbotnear,
        this.rightbotnear,
        this.rightbotfar,
        this.leftbotfar
      ),
      this.toTriangle(
        this.lefttopnear,
        this.righttopnear,
        this.righttopfar,
        this.lefttopfar
      ),

      this.toTriangle(
        this.leftbotnear,
        this.leftbotfar,
        this.lefttopfar,
        this.lefttopnear
      ),
      this.toTriangle(
        this.rightbotnear,
        this.rightbotfar,
        this.righttopfar,
        this.righttopnear
      ),

      this.toTriangle(
        this.leftbotnear,
        this.rightbotnear,
        this.righttopnear,
        this.lefttopnear
      ),
      this.toTriangle(
        this.leftbotfar,
        this.rightbotfar,
        this.righttopfar,
        this.lefttopfar
      ),
    ];
  }

  toJson() {
    let json = {
      type: "block",
      name: this.name,
      origin: this.origin,
      length: this.length,
      height: this.height,
      width: this.width,
      children: [],
    };
    this.children.forEach(function (child) {
      json.children.push(child.toJson());
    });
    return json;
  }
}
