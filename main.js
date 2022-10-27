img = "";
object_status = "";
objects = [];
function preload() {
    img = loadImage('dog_cat.jpg');
}
function setup() {
    canvas = createCanvas(700, 500);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = 'Status - Detecting Objects';
}
function modelLoaded() {
    console.log('Model is loaded!');
    object_status = true;
    objectDetector.detect(img, gotResult);
}
function gotResult(error, result) {
    if (error) {
        console.error(error);
    }
    console.log(result);
    objects = result
}
function draw() {
    image(img, 0, 0, 700, 500)
    if (object_status != "") {
        document.getElementById("status").innerHTML = "Status - Objects Detected";
        for (i = 0; i < objects.length; i++) {
            fill('red');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 20);
            textSize(20)
            noFill();
            stroke('red');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}