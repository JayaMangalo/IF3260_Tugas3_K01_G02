//Variable Declaration and Initialization
var canvas = document.getElementById("canvas");
var gl = canvas.getContext("webgl2");
var vertexShader = gl.createShader(gl.VERTEX_SHADER);
var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
var program = gl.createProgram();
var vertexBuffer = gl.createBuffer();
var indexBuffer = gl.createBuffer();
var positionAttribLocation;
var textureAttribLocation;
var normalAttribLocation;
var tangentAttribLocation;
var bitangentAttribLocation;
var shadderSource;
var isUsingShadder = 0.0; //Cannt use boolean because it will be converted to float
var choosenTexture = 0.0; //0.0 = custom texture, 1.0 = environment texture, 2.0 = bump texture

var light_source = [1, 1, 0];
var matWorldLocation;
var matViewLocation;
var matProjLocation;
var matNormalLocation;
var matViewModelLocation;
var worldMatrix;
var viewMatrix;
var projMatrix;
var cameraMatrix;
var eyeX, eyeY, eyeZ;
var cameraAngleX, cameraAngleY, cameraAngleZ;
var cameraRadius;
var fieldOfView;
var projectionMode;

//Texture
var images = [];
var textures = [];

//Initialize the WebGL
function init() {
  //Check if webgl is supported
  if (!gl) {
    alert("WebGL is not supported");
    return;
  }

  //Set the Canvas
  gl.clearColor(0.9296875, 0.91015625, 0.8515625, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  //Create Shadder
  const shadderSource = {
    vertexShaderSource: `#version 300 es
        in vec3 vertPosition;
        in vec2 a_texcoord;
        in vec3 a_normal;
        in vec3 a_tangent;
        in vec3 a_bitangent;
        
        out vec4 fragColor;
        out vec3 v_normal;
        out vec2 v_texcoord;

        out vec3 ts_light_pos;
        out vec3 ts_view_pos;
        out vec3 ts_frag_pos;

        out vec3 vWorldPosition;
        out vec3 vWorldNormal;

        uniform mat4 mModel;
        uniform mat4 mView;
        uniform mat4 mProj;
        uniform mat4 mViewModel;
        uniform mat4 mNormal;
    
        void main() {
            gl_Position = mProj * mView * mModel * vec4(vertPosition, 1);
            v_normal = a_normal;
            v_texcoord = a_texcoord;
            
            vec3 T = normalize((mNormal * vec4(a_tangent, 0)).xyz);
            vec3 B = normalize((mNormal * vec4(a_bitangent, 0)).xyz);
            vec3 N = normalize((mNormal * vec4(a_normal, 0)).xyz);
            mat3 TBN = transpose(mat3(T, B, N));
            // mat3 TBN = mat3(T, B, N);

            ts_light_pos = TBN * vec3(1,2,0);
            ts_view_pos = TBN * vec3(0,0,0);
            ts_frag_pos = TBN * vec3(mViewModel * vec4(vertPosition, 1));

            vWorldPosition = (mViewModel * vec4(vertPosition, 1)).xyz;
            vWorldNormal = (mNormal * vec4(a_normal, 0)).xyz;
        }`,

    fragmentShaderSource: `#version 300 es
        precision mediump float;
        in vec3 v_normal;
        in vec2 v_texcoord;
        out vec4 outColor;

        in vec3 ts_light_pos;
        in vec3 ts_view_pos;
        in vec3 ts_frag_pos;

        in vec3 vWorldPosition;
        in vec3 vWorldNormal;

        uniform float isUsingShadder;
        uniform float choosenTexture;
        
        uniform vec3 uWorldCameraPosition;
        uniform sampler2D u_texture;
        uniform sampler2D u_texture_bump;
        uniform samplerCube u_texture_environment;

        void main() {
          if(choosenTexture == 0.0) {
            //jika texture mapping
            vec3 normal = normalize(v_normal);
            float light = dot(normal, normalize(vec3(1,1,1)));

            outColor = texture(u_texture, v_texcoord);
            // outColor  = vec4(1,0,0,1);

            if(isUsingShadder > 0.5){
              outColor.rgb *= light;
            }
          } else if(choosenTexture == 1.0){
            //jika environment mapping
            vec3 worldNormal = normalize(vWorldNormal);
            vec3 eyeToSurfaceDir = normalize(vWorldPosition - uWorldCameraPosition);
            vec3 direction = normalize(reflect(eyeToSurfaceDir, worldNormal));

            outColor = vec4(texture(u_texture_environment, direction));
          }
          else {
            //jika bump mapping
            vec3 light_dir = normalize(ts_light_pos - ts_frag_pos);
            vec3 view_dir = normalize(ts_view_pos - ts_frag_pos);
            vec3 albedo = texture(u_texture_bump, v_texcoord).rgb;
            vec3 ambient = 0.3 * albedo;
            vec3 norm = normalize(texture(u_texture_bump, v_texcoord).rgb * 2.0 - 1.0);
            float diffuse = max(dot(light_dir, norm), 0.0);
            outColor = vec4(diffuse * albedo + ambient, 1.0);
          }        
        }`,
  };
  //Create Shadder
  gl.shaderSource(vertexShader, shadderSource.vertexShaderSource);
  gl.shaderSource(fragmentShader, shadderSource.fragmentShaderSource);

  //Compile Shadder
  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error(
      "ERROR compiling vertex shader!",
      gl.getShaderInfoLog(vertexShader)
    );
    return;
  }
  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error(
      "ERROR compiling fragment shader!",
      gl.getShaderInfoLog(fragmentShader)
    );
    return;
  }

  //Attach Shadder
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  //Link Shadder
  gl.linkProgram(program);

  //Bind the buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // Create Position Attribute
  positionAttribLocation = gl.getAttribLocation(program, "vertPosition");
  gl.vertexAttribPointer(
    positionAttribLocation,
    3, //3 float per vertex (XYZ)
    gl.FLOAT,
    gl.FALSE,
    14 * Float32Array.BYTES_PER_ELEMENT, //1 vertex = 14 float (XYZ RGBA XYZ XYZ XYZ)
    0 //Position start from the first element
  );

  // Create Color Attribute
  textureAttribLocation = gl.getAttribLocation(program, "a_texcoord");
  gl.vertexAttribPointer(
    textureAttribLocation,
    2, //4 float per vertex (RGBA)
    gl.FLOAT,
    gl.FALSE,
    14 * Float32Array.BYTES_PER_ELEMENT, //1 vertex = 14 float (XYZ RGBA XYZ XYZ XYZ)
    3 * Float32Array.BYTES_PER_ELEMENT //Color start from the fourth element
  );

  // Create Normal Attribute
  normalAttribLocation = gl.getAttribLocation(program, "a_normal");
  gl.vertexAttribPointer(
    normalAttribLocation,
    3, //3 float per vertex (XYZ)
    gl.FLOAT,
    gl.FALSE,
    14 * Float32Array.BYTES_PER_ELEMENT, //1 vertex = 14 float (XYZ RGBA XYZ XYZ XYZ)
    5 * Float32Array.BYTES_PER_ELEMENT //Color start from the seventh element
  );

  //Create Tangent Attribute
  tangentAttribLocation = gl.getAttribLocation(program, "a_tangent");
  gl.vertexAttribPointer(
    tangentAttribLocation,
    3, //3 float per vertex (XYZ)
    gl.FLOAT,
    gl.FALSE,
    14 * Float32Array.BYTES_PER_ELEMENT, //1 vertex = 14 float (XYZ RGBA XYZ XYZ XYZ)
    8 * Float32Array.BYTES_PER_ELEMENT //Color start from the seventh element
  );

  //Create Bitangent Attribute
  bitangentAttribLocation = gl.getAttribLocation(program, "a_bitangent");
  gl.vertexAttribPointer(
    bitangentAttribLocation,
    3, //3 float per vertex (XYZ)
    gl.FLOAT,
    gl.FALSE,
    14 * Float32Array.BYTES_PER_ELEMENT, //1 vertex = 14 float (XYZ RGBA XYZ XYZ XYZ)
    11 * Float32Array.BYTES_PER_ELEMENT //Color start from the seventh element
  );

  //Enable the attribute
  gl.enableVertexAttribArray(positionAttribLocation);
  gl.enableVertexAttribArray(textureAttribLocation);
  gl.enableVertexAttribArray(normalAttribLocation);
  gl.enableVertexAttribArray(tangentAttribLocation);
  gl.enableVertexAttribArray(bitangentAttribLocation);

  //Enable transparency
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  //Enable Depth Test
  gl.enable(gl.DEPTH_TEST);

  //Start the program
  gl.useProgram(program);
  // lightSourceLocation = gl.getUniformLocation(program, "a_lightsource");
  matWorldLocation = gl.getUniformLocation(program, "mModel");
  matViewLocation = gl.getUniformLocation(program, "mView");
  matProjLocation = gl.getUniformLocation(program, "mProj");
  matViewModelLocation = gl.getUniformLocation(program, "mViewModel");
  matNormalLocation = gl.getUniformLocation(program, "mNormal");
  textureLocation = gl.getUniformLocation(program, "u_texture");
  textureLocationBump = gl.getUniformLocation(program, "u_texture_bump");
  textureLocationEnvironment = gl.getUniformLocation(
    program,
    "u_texture_environment"
  );
  cameraPosisionLocation = gl.getUniformLocation(
    program,
    "uWorldCameraPosition"
  );
  isUsingShadderLocation = gl.getUniformLocation(program, "isUsingShadder");
  choosenTextureLocation = gl.getUniformLocation(program, "choosenTexture");

  // lightSourceVector = new Float32Array(light_source)
  worldMatrix = new Float32Array(16);
  viewMatrix = new Float32Array(16);
  projMatrix = new Float32Array(16);
  convertToIdentityMatrix(worldMatrix);

  //Load Texture
  function loadImages(urls, callback) {
    var imagesToLoad = urls.length;

    // Called each time an image finished
    // loading.
    var onImageLoad = function () {
      --imagesToLoad;
      // If all the images are loaded call the callback.
      if (imagesToLoad === 0) {
        callback(images);
      }
    };

    for (var ii = 0; ii < imagesToLoad; ++ii) {
      var image = loadImage(urls[ii], onImageLoad);
      images.push(image);
    }
  }

  function loadImage(url, callback) {
    var image = new Image();
    image.src = url;
    image.crossOrigin = "anonymous";
    image.onload = callback;
    return image;
  }

  function renderTexture() {
    // for (var i = 0; i < images.length; i++) {
    for (var i = 0; i < 3; i++) {
      if (i < 2) {
        //Textrue biasa dan bump texture
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          images[i]
        );
        gl.generateMipmap(gl.TEXTURE_2D);
        textures.push(texture);
      } else {
        //Environment texture
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

        const faceInfos = [
          { target: gl.TEXTURE_CUBE_MAP_POSITIVE_X, img: images[2] },
          { target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X, img: images[3] },
          { target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y, img: images[4] },
          { target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, img: images[5] },
          { target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z, img: images[6] },
          { target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, img: images[7] },
        ];

        faceInfos.forEach((faceInfo) => {
          const { target, img } = faceInfo;
          gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
          gl.texImage2D(target, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        });
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
        textures.push(texture);
      }
    }
  }

  //Load image from texture, bumptexture, pox-x, neg-x, pos-y, neg-y, pos-z, neg-z
  loadImages(
    [
      "https://raw.githubusercontent.com/JayaMangalo/IF3260_Tugas2_K01_G02/main/assets/textures/dragonscale.jpg",
      "https://raw.githubusercontent.com/JayaMangalo/IF3260_Tugas2_K01_G02/main/assets/textures/bump.png",
      "https://raw.githubusercontent.com/JayaMangalo/IF3260_Tugas2_K01_G02/main/assets/textures/pos-x.jpg",
      "https://raw.githubusercontent.com/JayaMangalo/IF3260_Tugas2_K01_G02/main/assets/textures/neg-x.jpg",
      "https://raw.githubusercontent.com/JayaMangalo/IF3260_Tugas2_K01_G02/main/assets/textures/pos-y.jpg",
      "https://raw.githubusercontent.com/JayaMangalo/IF3260_Tugas2_K01_G02/main/assets/textures/neg-y.jpg",
      "https://raw.githubusercontent.com/JayaMangalo/IF3260_Tugas2_K01_G02/main/assets/textures/pos-z.jpg",
      "https://raw.githubusercontent.com/JayaMangalo/IF3260_Tugas2_K01_G02/main/assets/textures/neg-z.jpg",
    ],
    renderTexture
  );

  cameraAngleX = toRadian(0);
  cameraAngleY = toRadian(0);
  cameraAngleZ = toRadian(0);
  cameraRadius = 50;
  fieldOfView = toRadian(45);
  projectionMode = "orthographic";
  view();
}

// Initialize the View
function view() {
  let m = xRotation(cameraAngleX);
  let n = yRotation(cameraAngleY);
  let p = zRotation(cameraAngleZ);
  cameraMatrix = multiply(m, n);
  cameraMatrix = multiply(cameraMatrix, p);
  cameraMatrix = translate(cameraMatrix, 0, 0, cameraRadius * 1.5);

  let left = -canvas.width / (1000 / cameraRadius);
  let right = canvas.width / (1000 / cameraRadius);
  let bottom = -canvas.height / (1000 / cameraRadius);
  let top = canvas.height / (1000 / cameraRadius);
  let near = 0.1;
  let far = 1000.0;
  if (projectionMode == "orthographic") {
    projMatrix = ortographic(left, right, bottom, top, near, far);
  } else if (projectionMode == "oblique") {
    projMatrix = oblique(
      left,
      right,
      bottom,
      top,
      -far,
      2 * far,
      toRadian(-89.2),
      toRadian(-89.2)
    );
    cameraMatrix = translate(cameraMatrix, 0, 0, (cameraRadius - 100) * 1.5);
  } else if (projectionMode == "perspective") {
    projMatrix = perspective(
      fieldOfView,
      canvas.width / canvas.height,
      near,
      far
    );
  }

  viewMatrix = inverse(cameraMatrix);
  gl.uniformMatrix4fv(matWorldLocation, gl.FALSE, worldMatrix);
  gl.uniformMatrix4fv(matViewLocation, gl.FALSE, viewMatrix);
  gl.uniformMatrix4fv(matProjLocation, gl.FALSE, projMatrix);
  gl.uniformMatrix4fv(matViewModelLocation,gl.FALSE,multiply(viewMatrix, worldMatrix));
  gl.uniformMatrix4fv(matNormalLocation,gl.FALSE,transpose(inverse(multiply(viewMatrix, worldMatrix))));
  gl.uniform3fv(cameraPosisionLocation, [cameraMatrix[12],cameraMatrix[13],cameraMatrix[14],]);
  gl.uniform1i(textureLocation, 0);
  gl.uniform1i(textureLocationBump, 1);
  gl.uniform1i(textureLocationEnvironment, 2);
  gl.uniform1f(isUsingShadderLocation, isUsingShadder);
  gl.uniform1f(choosenTextureLocation, choosenTexture);

  //Bind the texture
  gl.activeTexture(gl.TEXTURE0 + 0);
  gl.bindTexture(gl.TEXTURE_2D, textures[0]);
  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, textures[1]);
  gl.activeTexture(gl.TEXTURE2);
  gl.bindTexture(gl.TEXTURE_CUBE_MAP, textures[2]);
}
