const REMOVED_BATANG = {
  DEPAN_ATAS: 0,
  DEPAN_BAWAH: 1,
  KIRI_ATAS: 2,
  KIRI_BAWAH: 3,
  KANAN_ATAS: 4,
  KANAN_BAWAH: 5,
  BELAKANG_ATAS: 6,
  BELAKANG_BAWAH: 7,
  DEPAN_KANAN: 8,
  DEPAN_KIRI: 9,
  BELAKANG_KANAN: 10,
  BELAKANG_KIRI: 11,
};

class TriangularPrism extends Object {
  constructor(origin, length, height, width, removed_batang, obj_name) {
    super(obj_name);

    this.origin = origin;
    this.center = [
      this.origin[0] + length / 2,
      this.origin[1] + height / 2,
      this.origin[2] + width / 2,
    ];

    this.texture = "texture"; //to be implemented //currently its hardcoded to use webglfundamentals one

    this.createVertices(length, height, width);
    this.createPlanes(removed_batang);
  }
  
  toTriangle(p1,p2,p3,p4){
    return [
      p1.concat([1,1]).concat(calculateTangetSpace(p1,p2,p3)), //still in progress, will change later on
      p2.concat([0,1]).concat(calculateTangetSpace(p2,p3,p4)), 
      p3.concat([0,0]).concat(calculateTangetSpace(p3,p1,p2)),

      p1.concat([1,1]).concat(calculateTangetSpace(p1,p3,p4)),
      p3.concat([0,0]).concat(calculateTangetSpace(p3,p4,p1)),
      p4.concat([1,0]).concat(calculateTangetSpace(p4,p1,p2)),
    ]
}

  toTriangleSlope(p1, p2, p3) {
    return [
      p1.concat([1,1]).concat(calculateTangetSpace(p1,p2,p3)), //still in progress, will change later on
      p2.concat([0,1]).concat(calculateTangetSpace(p2,p3,p1)), 
      p3.concat([0,0]).concat(calculateTangetSpace(p3,p1,p2)),
    ];
  }

  createVertices(length, height, width) {
    let x = this.origin[0];
    let y = this.origin[1];
    let z = this.origin[2];

    this.belakang_kanan_bawah = [x, y, z];
    this.belakang_kiri_bawah = [x + length, y, z];
    this.depan_kanan_bawah = [x, y, z + width];
    this.depan_kiri_bawah = [x + length, y, z + width];
    
    this.belakang_kanan_atas = [x, y + height, z];
    this.belakang_kiri_atas = [x + length, y + height, z];
    this.depan_kanan_atas = [x, y + height, z + width];
    this.depan_kiri_atas = [x + length, y + height, z + width];
  }
  createPlanes(removed_batang) {
    if (removed_batang == REMOVED_BATANG.DEPAN_ATAS) {
      this.batang = [
        this.toTriangle(this.belakang_kanan_bawah, this.belakang_kiri_bawah, this.depan_kiri_bawah, this.depan_kanan_bawah),
        this.toTriangle(this.depan_kanan_bawah, this.depan_kiri_bawah, this.belakang_kiri_atas, this.belakang_kanan_atas),
        this.toTriangle(this.belakang_kanan_atas, this.belakang_kiri_atas, this.belakang_kiri_bawah, this.belakang_kanan_bawah),
        this.toTriangleSlope(this.depan_kanan_bawah, this.belakang_kanan_atas, this.belakang_kanan_bawah),
        this.toTriangleSlope(this.depan_kiri_bawah, this.belakang_kiri_bawah, this.belakang_kiri_atas),
      ];
    }else if(removed_batang == REMOVED_BATANG.DEPAN_BAWAH){
      this.batang = [
        this.toTriangle(this.belakang_kiri_atas, this.belakang_kanan_atas, this.depan_kanan_atas, this.depan_kiri_atas),
        this.toTriangle(this.belakang_kanan_bawah, this.belakang_kiri_bawah, this.depan_kiri_atas, this.depan_kanan_atas),
        this.toTriangle(this.belakang_kanan_atas, this.belakang_kiri_atas, this.belakang_kiri_bawah, this.belakang_kanan_bawah),
        this.toTriangleSlope(this.depan_kanan_atas, this.belakang_kanan_atas, this.belakang_kanan_bawah),
        this.toTriangleSlope(this.depan_kiri_atas, this.belakang_kiri_bawah, this.belakang_kiri_atas),
      ];
    }else if(removed_batang == REMOVED_BATANG.KIRI_ATAS){
      this.batang = [
        this.toTriangle(this.belakang_kanan_bawah, this.belakang_kiri_bawah, this.depan_kiri_bawah, this.depan_kanan_bawah),
        this.toTriangle(this.belakang_kanan_bawah, this.depan_kanan_bawah, this.depan_kanan_atas, this.belakang_kanan_atas),
        this.toTriangle(this.belakang_kanan_atas, this.depan_kanan_atas, this.depan_kiri_bawah, this.belakang_kiri_bawah),
        this.toTriangleSlope(this.belakang_kanan_atas, this.belakang_kiri_bawah, this.belakang_kanan_bawah),
        this.toTriangleSlope(this.depan_kanan_bawah, this.depan_kiri_bawah, this.depan_kanan_atas),
      ];
    }else if(removed_batang == REMOVED_BATANG.KIRI_BAWAH){
      this.batang = [
        this.toTriangle(this.belakang_kiri_atas, this.belakang_kanan_atas, this.depan_kanan_atas, this.depan_kiri_atas),
        this.toTriangle(this.belakang_kanan_bawah, this.depan_kanan_bawah, this.depan_kanan_atas, this.belakang_kanan_atas),
        this.toTriangle(this.belakang_kiri_atas, this.depan_kiri_atas, this.depan_kanan_bawah, this.belakang_kanan_bawah),
        this.toTriangleSlope(this.belakang_kanan_atas, this.belakang_kiri_atas, this.belakang_kanan_bawah),
        this.toTriangleSlope(this.depan_kanan_atas, this.belakang_kiri_atas, this.depan_kanan_bawah),
        
      ];
    }else if(removed_batang == REMOVED_BATANG.KANAN_ATAS){
      this.batang = [
        this.toTriangle(this.belakang_kanan_bawah, this.belakang_kiri_bawah, this.depan_kiri_bawah, this.depan_kanan_bawah),
        this.toTriangle(this.belakang_kiri_bawah, this.depan_kiri_bawah, this.depan_kiri_atas, this.belakang_kiri_atas),
        this.toTriangle(this.depan_kanan_atas, this.belakang_kanan_atas, this.belakang_kiri_bawah, this.depan_kiri_bawah),
        this.toTriangleSlope(this.belakang_kiri_atas, this.belakang_kiri_bawah, this.belakang_kanan_bawah),
        this.toTriangleSlope(this.depan_kanan_bawah, this.depan_kiri_atas, this.depan_kiri_bawah),
      ];
    }else if(removed_batang == REMOVED_BATANG.KANAN_BAWAH){
      this.batang = [
        this.toTriangle(this.belakang_kiri_atas, this.belakang_kanan_atas, this.depan_kanan_atas, this.depan_kiri_atas),
        this.toTriangle(this.depan_kiri_bawah, this.belakang_kiri_bawah, this.belakang_kiri_atas, this.depan_kiri_atas),
        this.toTriangle(this.depan_kanan_atas, this.belakang_kanan_atas, this.belakang_kiri_bawah, this.depan_kiri_bawah),
        this.toTriangleSlope(this.belakang_kiri_atas, this.belakang_kiri_bawah, this.belakang_kanan_atas),
        this.toTriangleSlope(this.depan_kiri_bawah, this.depan_kiri_atas, this.depan_kanan_atas),
      ];
    }else if(removed_batang == REMOVED_BATANG.BELAKANG_ATAS){
      this.batang = [
        this.toTriangle(this.belakang_kanan_bawah, this.belakang_kiri_bawah, this.depan_kiri_bawah, this.depan_kanan_bawah),
        this.toTriangle(this.depan_kanan_bawah, this.depan_kiri_bawah, this.depan_kiri_atas, this.depan_kanan_atas),
        this.toTriangle(this.depan_kanan_atas, this.depan_kiri_atas, this.belakang_kiri_bawah, this.belakang_kanan_bawah),
        this.toTriangleSlope(this.belakang_kanan_bawah, this.depan_kanan_bawah, this.depan_kanan_atas),
        this.toTritoTriangleSlopeangle(this.belakang_kiri_bawah, this.depan_kiri_atas, this.depan_kiri_bawah),
      ];
    }else if(removed_batang == REMOVED_BATANG.BELAKANG_BAWAH){
      this.batang = [
        this.toTriangle(this.belakang_kiri_atas, this.belakang_kanan_atas, this.depan_kanan_atas, this.depan_kiri_atas),
        this.toTriangle(this.depan_kanan_bawah, this.depan_kiri_bawah, this.depan_kiri_atas, this.depan_kanan_atas),
        this.toTriangle(this.belakang_kanan_atas, this.belakang_kiri_atas, this.depan_kiri_bawah, this.depan_kanan_bawah),
        this.toTriangleSlope(this.depan_kanan_atas, this.belakang_kanan_atas, this.depan_kanan_bawah),
        this.toTriangleSlope(this.depan_kiri_bawah, this.belakang_kiri_atas, this.depan_kiri_atas),
      ];
    }else if(removed_batang == REMOVED_BATANG.DEPAN_KANAN){
      this.batang = [
        this.toTriangle(this.belakang_kanan_bawah, this.belakang_kanan_atas, this.belakang_kiri_atas, this.belakang_kiri_bawah),
        this.toTriangle(this.belakang_kiri_bawah, this.belakang_kiri_atas, this.depan_kiri_atas, this.depan_kiri_bawah),
        this.toTriangle(this.depan_kiri_bawah, this.depan_kiri_atas, this.belakang_kanan_atas, this.belakang_kanan_bawah),
        this.toTriangleSlope(this.belakang_kanan_bawah, this.belakang_kiri_bawah, this.depan_kiri_bawah),
        this.toTriangleSlope(this.belakang_kanan_atas, this.depan_kiri_atas, this.belakang_kiri_atas),
      ];
    }else if(removed_batang == REMOVED_BATANG.DEPAN_KIRI){
      this.batang = [
        this.toTriangle(this.belakang_kanan_bawah, this.belakang_kanan_atas, this.belakang_kiri_atas, this.belakang_kiri_bawah),
        this.toTriangle(this.belakang_kanan_atas, this.belakang_kanan_bawah, this.depan_kanan_bawah, this.depan_kanan_atas),
        this.toTriangle(this.depan_kanan_atas, this.depan_kanan_bawah, this.belakang_kiri_bawah, this.belakang_kiri_atas),
        this.toTriangleSlope(this.belakang_kanan_bawah, this.belakang_kiri_bawah, this.depan_kanan_bawah),
        this.toTriangleSlope(this.belakang_kanan_atas, this.depan_kanan_atas, this.belakang_kiri_atas),
      ];
    }else if(removed_batang == REMOVED_BATANG.BELAKANG_KANAN){
      this.batang = [
        this.toTriangle(this.depan_kanan_bawah, this.depan_kiri_bawah, this.depan_kiri_atas, this.depan_kanan_atas),
        this.toTriangle(this.belakang_kiri_bawah, this.belakang_kiri_atas, this.depan_kiri_atas, this.depan_kiri_bawah),
        this.toTriangle(this.belakang_kiri_atas, this.belakang_kiri_bawah, this.depan_kanan_bawah, this.depan_kanan_atas),
        this.toTriangleSlope(this.depan_kanan_atas, this.depan_kiri_atas, this.belakang_kiri_atas),
        this.toTriangleSlope(this.depan_kanan_bawah, this.belakang_kiri_bawah, this.depan_kiri_bawah),
      ];
    }else if(removed_batang == REMOVED_BATANG.BELAKANG_KIRI){
      this.batang = [
        this.toTriangle(this.depan_kanan_bawah, this.depan_kiri_bawah, this.depan_kiri_atas, this.depan_kanan_atas),
        this.toTriangle(this.belakang_kanan_bawah, this.depan_kanan_bawah, this.depan_kanan_atas, this.belakang_kanan_atas),
        this.toTriangle(this.belakang_kanan_bawah, this.belakang_kanan_atas, this.depan_kiri_atas, this.depan_kiri_bawah),
        this.toTriangleSlope(this.depan_kanan_atas, this.depan_kiri_atas, this.belakang_kanan_atas),
        this.toTriangleSlope(this.depan_kanan_bawah, this.belakang_kanan_bawah, this.depan_kiri_bawah),
      ];
    }else{
      this.batang = [
        this.toTriangle(this.depan_kanan_atas, this.depan_kiri_atas, this.belakang_kiri_atas, this.belakang_kanan_atas),
        this.toTriangle(this.depan_kanan_bawah, this.depan_kiri_bawah, this.belakang_kiri_bawah, this.belakang_kanan_bawah),

        this.toTriangle(this.depan_kiri_atas, this.depan_kanan_atas, this.depan_kanan_bawah, this.depan_kiri_bawah),
        this.toTriangle(this.belakang_kanan_atas, this.belakang_kiri_atas, this.belakang_kiri_bawah, this.belakang_kanan_bawah),

        this.toTriangle(this.depan_kanan_atas, this.belakang_kanan_atas, this.belakang_kanan_bawah, this.depan_kanan_bawah),
        this.toTriangle(this.belakang_kiri_atas, this.depan_kiri_atas, this.depan_kiri_bawah, this.belakang_kiri_bawah),
      ];
    }

    return this.batang;
  }
}
