var video;

function preload() {
    video = loadSound("assets/portClip.mp3");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    push();
    scale(.5);
    image(img, 0, 0);
    pop();
    fft = new p5.FFT();
    song.setVolume(0.4);
    song.loop();


}

function draw() {
    background(0);

    var spectrum = fft.analyze();
    noStroke();
    fill(0, 255, 0);
    for (var i = 0; i < spectrum.length; i++) {
        var x = map(i, 0, spectrum.length, 0, width);
        //var h = -height + map(spectrum[i], 0, 255, height, 0);
        rect(x, height / 2, width / spectrum.length, spectrum[i]);
    }
    var b = fft.getEnergy("bass");
    fill(0, b, b / 2);
    ellipse(200, 200, fft.getEnergy("bass"), fft.getEnergy("bass"));
    ellipse(400, 200, fft.getEnergy("mid"), fft.getEnergy("mid"));
    ellipse(600, 200, fft.getEnergy("treble"), fft.getEnergy("treble"));

    var waveform = fft.waveform();
    noFill();
    beginShape();
    stroke(255, 0, 0);
    strokeWeight(1);
    for (var i = 0; i < waveform.length; i++) {
        var x = map(i, 0, waveform.length, 0, width);
        var y = map(waveform[i], -1, 1, 0, height);
        vertex(x, y);
    }
    endShape();

}

function mousePressed() {
    if (song.isPlaying()) {
        song.pause();
    } else {
        song.loop();
    }
}