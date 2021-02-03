let img;
let imageClassifier;

function preload() {
	img = loadImage('/images/frown0.png');
}

function setup() {
  createCanvas(76, 76);

  const options = {
	task: 'imageClassification',
    inputs: [76, 76, 4],
  };

 imageClassifier = ml5.neuralNetwork(options);
 
 const modelDetails = {
    model: 'model/model.json',
    metadata: 'model/metadata.json',
    weights: 'model/model.weights.bin'
	};
	
	imageClassifier.load(modelDetails, modelLoaded);
}

function draw() {
	image(img, 0, 0);
}

function modelLoaded() {
  console.log('Model Loaded!');
}

function mousePressed() {
	imageClassifier.classify({image: img}, gotResults);
}

function gotResults(err, results) {
	if (err) {
		console.error(err);
		return;
	}
	console.log(results);
}

