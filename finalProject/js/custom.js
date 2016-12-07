// variable declaration
var voteBoo;
var voteMarnie;
var voteBoo;
var votePhteven;
var gender;
var runner;
var leftBone;
var rightBone;
var xPos;
var yPos;
var n;
var videoDiv;
var suggestionText;
var suggestionList;
var song;
var boo;
var marnie;
var tuna;
var doug;
var voteSelected;

function preload() {
    song = loadSound("jingleBarks.mp3");
}

function setup() {
    canvas = createCanvas(windowWidth, 200);

    // song setup
    fft = new p5.FFT();
    song.setVolume(0.4);
    song.loop();

    // image setup
    runner = loadImage("photos/running.png");
    leftBone = loadImage("photos/bone.png");
    rightBone = loadImage("photos/bone.png");

    // variable initialization
    xPos = 175;
    n = 0;
    voteSelected = true;

    // start each dog with 2 votes
    boo = 2;
    marnie = 2;
    tuna = 2;
    doug = 2;

    
    // suggestion section
    suggestionText = createElement('h2', 'Please enter a suggestion for next weeks puppy of the week!');
    input = createInput();
    inputButton = createButton('Submit');
    createElement('h5', "\n");
    createElement('h5', 'Digby van Winkle');
    createElement('h5', 'Minnie and Maxie Pugs');
    inputButton.mousePressed(suggestion);
    
}

function draw() {
    background(255);

    var spectrum = fft.analyze();

    // moving puppy
    xPos++; // move puppy horizontally
    yPos = 60 * noise(n); // move puppy vertically
    n += .03;   // change random noise 
    image(runner, xPos, yPos); // display image
    
    if (xPos >= windowWidth - 350) {
        xPos = 175;
    }
    

    // dog bone size changing in tune w/ song
   if (song.isPlaying()){
        image(leftBone, 10, 50, fft.getEnergy("bass") - 50, fft.getEnergy("bass") - 75);
        image(rightBone, windowWidth - 175, 50, fft.getEnergy("bass")-50, fft.getEnergy("bass")-75);
   }

}

// update suggestions each time inputButton is pressed
function suggestion() {
    var name = input.value();
    input.value('');
    createElement('h5', name);
}


function submitVote(){
    if (document.getElementById('boo').checked){
        boo++;
    }
    else if (document.getElementById('marnie').checked){
        marnie++;
    }
    else if (document.getElementById('tuna').checked){
        tuna++;
    }
    else if (document.getElementById('doug').checked){
        doug++;
    }
    else{
        voteSelected = false;
    }
    
    if (voteSelected){
        // hide radio buttons
        document.getElementById("booLabel").style.display = 'none';
        document.getElementById("booPercent").innerHTML = "" + Math.round((boo/(boo+marnie+tuna+doug))*100) + "%";
        document.getElementById("marnieLabel").style.display = 'none';
        document.getElementById("marniePercent").innerHTML = "" + Math.round((marnie/(boo+marnie+tuna+doug))*100) + "%";
        document.getElementById("tunaLabel").style.display = 'none';
        document.getElementById("tunaPercent").innerHTML = "" + Math.round((tuna/(boo+marnie+tuna+doug))*100) + "%";
        document.getElementById("dougLabel").style.display = 'none';
        document.getElementById("dougPercent").innerHTML = "" + Math.round((doug/(boo+marnie+tuna+doug))*100) + "%";
        voteSelected = false;
    }

}


// pause song when nay key is pressed
function keyPressed(){
    if(song.isPlaying())
        song.pause();
    else
        song.loop();
}