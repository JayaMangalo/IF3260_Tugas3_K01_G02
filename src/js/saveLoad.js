function traverseComponents(component) {
  // create a new object, used when loading model from json
  var obj = new Block(
    component.origin,
    component.length,
    component.height,
    component.width,
    component.name
  );

  if (component.children.length > 0) {
    for (child of component.children) {
      let child_obj = traverseComponents(child);
      obj.appendChild(child_obj);
    }
  }
  return obj;
}

function saveModel() {
  json = { type: "model", data: [] };

  for (shape of shapes) {
    json.data.push(shape.toJson());
  }

  const link = document.createElement("a");
  const file = new Blob([JSON.stringify(json)], { type: "text/plain" });
  link.href = URL.createObjectURL(file);
  link.download = "model.json";
  link.click();
  link.remove();
}

function loadModel() {
  var input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.onchange = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = (readerEvent) => {
      var content = readerEvent.target.result;
      var json = JSON.parse(content);
      if (json.type != "model") {
        alert("Invalid file");
        return;
      }
      // only load the first model
      const model = json.data[0];
      var obj = traverseComponents(model);
      shapes = [];
      TreeArray = [];
      shapes.push(obj);
      traverseTree(shapes);
      redraw();
    };
  };
  input.click();
}

function saveFrame() {
  json = { type: "frame", data: { transformations: [] } };

  for (component of TreeArray) {
    json.data.transformations.push({
      translation: component.translation_arr,
      rotation: component.rotation,
      scalation: component.scalation,
      translationSTree: component.translationSTree,
      rotationSTree: component.rotationSTree,
      scalationSTree: component.scalationSTree,
    });
  }

  const link = document.createElement("a");
  const file = new Blob([JSON.stringify(json)], { type: "text/plain" });
  link.href = URL.createObjectURL(file);
  link.download = "frame.json";
  link.click();
  link.remove();
}

function loadFrame() {
  // TODO: load transformation for all components instead of selected object
  console.log("Loading Frame");
  var input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.onchange = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = (readerEvent) => {
      var content = readerEvent.target.result;
      var json = JSON.parse(content);
      if (json.type != "frame") {
        alert("Invalid file");
        return;
      }

      if (json.data.transformations.length != TreeArray.length) {
        alert(
          "Invalid number of transformations. Please make sure that you have defined transformation for each component."
        );
        return;
      }

      for (var i = 0; i < json.data.transformations.length; i++) {
        setCurrentObject(i);
        const frame = json.data.transformations[i];
        selectedObject.translation_arr = frame.translation;
        selectedObject.rotation = frame.rotation;
        selectedObject.scalation = frame.scalation;
        selectedObject.translationSTree = frame.translationSTree;
        selectedObject.rotationSTree = frame.rotationSTree;
        selectedObject.scalationSTree = frame.scalationSTree;

        transformObject();
      }
    };
  };
  input.click();
}

function loadAnimation() {
  var input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.onchange = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = (readerEvent) => {
      var content = readerEvent.target.result;
      var json = JSON.parse(content);
      if (json.type != "animation") {
        alert("Invalid file");
        return;
      }

      frames = [];

      // assuming there is only one shape
      if (shapes.length > 0) {
        const data = json.data;

        if (data.frames.length < 9) {
          alert("Please define at least 9 frames.");
          return;
        }
        for (transformations of data.frames) {
          var transform = [];
          if (transformations.length != TreeArray.length) {
            alert(
              "Invalid number of transformations. Please make sure that you have defined transformation for each component."
            );
            frames = [];
            return;
          }
          for (transformation of transformations) {
            transform.push({
              translation: transformation.translation,
              rotation: transformation.rotation,
              scalation: transformation.scalation,
              translationSTree: transformation.translationSTree,
              rotationSTree: transformation.rotationSTree,
              scalationSTree: transformation.scalationSTree,
            });
          }
          frames.push(transform);
        }
      }
    };
  };
  input.click();
}
