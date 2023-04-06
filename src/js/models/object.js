class Object {
  constructor(obj_name) {
    this.name = obj_name

    this.children = [];

    this.parentTransformationMatrix = [];   //Transformation Matrix from Parent/Subtree   //Only updated by parent via SubTree
    this.selfTransformationMatrix = [];     //Transformation for Self (Set by user via controller/UI)            
    this.childTransformationMatrix = [];    //Transformation for Child(and self)

    convertToIdentityMatrix(this.parentTransformationMatrix);
    convertToIdentityMatrix(this.selfTransformationMatrix);
    convertToIdentityMatrix(this.childTransformationMatrix);

    //this is so the objects have a savestate for sliders
    this.translation_arr = [0,0,0];
    this.rotation = [0,0,0];
    this.scalation = [10,10,10];
    this.translationSTree = [0,0,0];
    this.rotationSTree = [0,0,0];
    this.scalationSTree = [10,10,10];
  }

  appendChild(child) {
    this.children.push(child);
    this.transformSubTree(this.childTransformationMatrix) //Update Child's parent matrix to match current (only needed if a child is added during running)
  }

  getChild(index){
    return this.children[index]
  }

  transformSelf(matrix) {
    this.selfTransformationMatrix = matrix;
  }

  transformSubTree(matrix) {
    this.childTransformationMatrix = matrix
    let temp = multiply(this.parentTransformationMatrix,this.childTransformationMatrix);

    this.children.forEach(function (child) {
      child.parentTransformationMatrix = temp
      child.transformSubTree(child.childTransformationMatrix)
    }); 
  }
  getCenter(){
    var vec4_center = this.center;
    vec4_center[3] = 1;
    
    return vec4_center
    
  }
  draw(isUsingShader=false) {
    if (this.batang == null) {
      return;
    }
    let temp = multiply(this.selfTransformationMatrix,this.childTransformationMatrix); 
    let finalTransformationMatrix = multiply(this.parentTransformationMatrix,temp); 

    // gl.Texture //dosomething

    gl.uniformMatrix4fv(matWorldLocation, false, finalTransformationMatrix);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    
    if (isUsingShader) {
      for (let batang of this.batang) {
        let vertices = [];
        for (let i = 0; i < batang.length; i++) {
          vertices.push(
            batang[i][0], //x
            batang[i][1], //y
            batang[i][2], //z
            batang[i][3], //texturemapX
            batang[i][4], //texturemapY
            batang[i][5], //NormalX
            batang[i][6], //NormalY
            batang[i][7] //NormalZ
          );
        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        gl.drawArrays(gl.TRIANGLES, 0, batang.length);
      }
    } else {
      for (let batang of this.batang) {
        let vertices = [];
        for (let i = 0; i < batang.length; i++) {
          vertices.push(
            batang[i][0], //x
            batang[i][1], //y
            batang[i][2], //z
            batang[i][3], //texturemapX
            batang[i][4], //texturemapY
            1, //NormalX
            1, //NormalY
            0 //NormalZ
          );
          
        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        gl.drawArrays(gl.TRIANGLES, 0, batang.length);
      }
    }
    this.children.forEach(function (child) {
      child.draw(isUsingShader)
    }); 
  }
}

