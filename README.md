# smileorfrown
<em>A Facial Expression Image Classifier using ml5.js</em>

This project is pretty ambitious for me in terms of bringing different technologies together and truly understanding how web apps work beyond just running JavaScript in the browser. 

<strong><em>TRAINING THE MODEL</em></strong>

I used Python with Selenium to webscrape photos of people both smiling and frowning from Shutterstock, saving them appropriately numbered and split by facial expression to a local directory. Then, using Python with OpenCV's face detection, I cropped and resized every image to be 76x76 squares containing faces only.

I decided to use ml5.js for this particular application as I'm fairly comfortable with JavaScript and the end goal is for this to be a web app which takes a webcam input and classifies the user's facial expression based on the training data in real time. I used the training data to train the imageClassifier, loosely following along from this video by The Coding Train: https://www.youtube.com/watch?v=3MqJzMvHE3E. I had to do a lot of fiddling to get it working, but eventually the loss function was falling far enough that the model looked usable.

<strong><em>USING THE MODEL</em></strong>

After training, I tested the model's accuracy in the browser just by feeding in one of the training images. On the face of it, it works great and seems accurate. I've used WebRTC's API @webRTC again to handle a video input and have drawn a mirrored version to the canvas. 

The red square overlayed on the video feed indicates where one's face needs to be in order for the model to work. A cropped snapshot of the video at the appropriate dimensions is stored in a hidden canvas, which contains the same area as the red square. When the user clicks anywhere on the page, their facial expression is classified by the model :)
