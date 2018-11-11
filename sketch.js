// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
=== */

let classifier;
let video;

function setup() {
  noCanvas();
  // Create a camera input
  video = createCapture(VIDEO);
  // Initialize the Image Classifier method with MobileNet and the video as the second argument
  classifier = ml5.imageClassifier('MobileNet', video, modelReady);
}

function modelReady() {
  // Change the status of the model once its ready
  select('#status').html('Show me what you got');
  // Call the classifyVideo function to start classifying the video
  classifyVideo();
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.predict(gotResult);
}

// When we get a result
function gotResult(err, results) {
  // The results are in an array ordered by probability.
  if (results[0].className == "banana" || results[0].className == "orange") {
    console.log('yay!');
    select('#message').html('Thank goodness!');
    document.body.style.backgroundColor = "green";
    document.body.style.color = "white";
  } else {
    select('#message').html('Show me something healthy!');
    document.body.style.backgroundColor = "grey";
    document.body.style.color = "white";
  }
  console.log("Results: ", results);
  // select('#result').html(results[0].className);
  // select('#probability').html(nf(results[0].probability, 0, 2));
  classifyVideo();
}
