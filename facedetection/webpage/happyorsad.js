//let img;
let imageClassifier;
let input = document.querySelector('#resizedFace');
const resultsDiv = document.querySelector('.results');

function preload() {
	//img = loadImage('/testimages/WIN_20210203_21_38_24_Pro.jpg');
}

function setup() {
  //createCanvas(76, 76);

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
	//image(img, 0, 0);
}

function modelLoaded() {
  console.log('Model Loaded!');
}

function mousePressed() {
	imageClassifier.classify({image: input}, gotResults);
}

function gotResults(err, results) {
	if (err) {
		console.error(err);
		return;
	}
	console.log(results);
	let label = results[0].label;
	let confidence = (results[0].confidence * 100).toFixed(0);
	resultsDiv.innerHTML = label + ": " +  confidence + "%";
	
	if (label == "smile") {
		$("body").css({'backgroundColor': 'yellow'});
		resultsDiv.innerHTML += "\r" + "amazing!!! you deserve to be happy!!!!"
	} else if (label == "frown") {
		$("body").css({'backgroundColor': 'blue'});
		resultsDiv.innerHTML += "\r" + ":( hope you cheer up soon bab"
	}
}

