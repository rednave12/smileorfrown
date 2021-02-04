'use strict';

const video = document.querySelector('video');
const canvas = document.querySelector('#videoCanvas');
const resized = document.querySelector('#resizedFace');
const ctx = canvas.getContext('2d');
const ctx2 = resized.getContext('2d');
//const results = document.querySelector('.results');
canvas.width = 480;
canvas.height = 360;
resized.width = 76;
resized.height = 76;


function camToCanvas() {
	canvas.width = Math.min(video.videoWidth, video.videoHeight);
	canvas.height = Math.min(video.videoWidth, video.videoHeight);
	resized.width = 76;
	resized.height = 76;
	
	ctx.translate(video.videoWidth, 0); //flip video 
	ctx.scale(-1, 1);
	ctx.drawImage(video, 0, 0, video.videoWidth, canvas.height);
	
	//put cropped version on resized canvas
	ctx2.translate(video.videoWidth * (76 / canvas.height), 0); //flip video 
	ctx2.scale(-1, 1);
	ctx2.drawImage(video, -video.videoWidth * (76/ canvas.height) /2 -10, -resized.height / 2, video.videoWidth * (76/ canvas.height) * 2, resized.height * 2);
	
	$(".overlay").css({'width': video.videoWidth * (76/ canvas.height) * 2.32 });
	$(".overlay").css({'height': video.videoWidth * (76/ canvas.height) * 2.32 });

	let top = $(".overlay").css('top');
	let left = $(".overlay").css('left');
		
	$(".overlay").css({'left': '50.5%' });
	$(".overlay").css({'top': '37%' });
	
	
	
	window.requestAnimationFrame(camToCanvas);
}

const constraints = {
  audio: false,
  video: {
	 autoplay: true, 
  }
};

function handleSuccess(stream) {
  window.stream = stream; // make stream available to browser console
  video.srcObject = stream;
}

function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

video.pause();
video.style.display='none';
resized.style.display='none';
navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
camToCanvas();