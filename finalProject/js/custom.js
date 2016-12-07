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
var voteUpdate;

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
    voteUpdate = true;

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
    
    // update number of votes for each dog
    if (voteUpdate){ // check to see if valid to update vote
        if (document.getElementById('boo').checked){
            boo++;
            voteSelected = true;
        }
        else if (document.getElementById('marnie').checked){
            marnie++;
            voteSelected = true;
        }
        else if (document.getElementById('tuna').checked){
            tuna++;
            voteSelected = true;
        }
        else if (document.getElementById('doug').checked){
            doug++;
            voteSelected = true;
        }
        else{
            // no dog selected
            voteSelected = false;
        }
    }

    
    if (voteSelected){ // check to make sure dog was selected
        // hide radio buttons and show each dog's vote percentage
        document.getElementById("booLabel").style.display = 'none';
        document.getElementById("booLabel").checked = 'false';
        document.getElementById("booPercent").innerHTML = "" + Math.round((boo/(boo+marnie+tuna+doug))*100) + "%";
        document.getElementById("marnieLabel").style.display = 'none';
        document.getElementById("marnieLabel").checked = 'false';
        document.getElementById("marniePercent").innerHTML = "" + Math.round((marnie/(boo+marnie+tuna+doug))*100) + "%";
        document.getElementById("tunaLabel").style.display = 'none';
        document.getElementById("tunaLabel").checked = 'false';
        document.getElementById("tunaPercent").innerHTML = "" + Math.round((tuna/(boo+marnie+tuna+doug))*100) + "%";
        document.getElementById("dougLabel").style.display = 'none';
        document.getElementById("dougLabel").checked = 'false';
        document.getElementById("dougPercent").innerHTML = "" + Math.round((doug/(boo+marnie+tuna+doug))*100) + "%";
        
        // keep programming from re-entering loop after one vote
        voteSelected = false;
        // keep program from updating vote count
        voteUpdate = false;
    }

}


// pause song when any key is pressed
function keyPressed(){
    if(song.isPlaying())
        song.pause();
    else
        song.loop();
}