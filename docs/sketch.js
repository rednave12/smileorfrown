let frowns = [];
let smiles = [];

function preload() {
  for (let i = 0; i < 102; i++) {
    frowns[i] = loadImage('images/frown' + i + '.png');
  }
  for (let i = 0; i < 106; i++) {
    smiles[i] = loadImage('images/smile' + i + '.png');
  }
}

let imageClassifier;

function setup() {
  createCanvas(76, 76);

  const options = {
	task: 'imageClassification',
    inputs: [76, 76, 4],
    debug: true
  };

 imageClassifier = ml5.neuralNetwork(options);

  for (let i = 0; i < smiles.length; i++) {
    imageClassifier.addData({ image: smiles[i] }, { label: 'smile'});
  }
  for (let i = 0; i < frowns.length; i++) {
    imageClassifier.addData({ image: frowns[i] }, { label: 'frown'});
  }
  imageClassifier.normalizeData();
  imageClassifier.train({ epochs: 75 }, finishedTraining);
}

function finishedTraining() {
  console.log('finished training!');
  imageClassifier.save();
}