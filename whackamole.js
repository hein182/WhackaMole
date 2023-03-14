//print a 3x3 grid of moles
//each mole is represented by a 1
//each empty space is represented by a 0
//each row is on a separate line
//each row has 3 moles
//each row has 3 empty spaces
//each row has 3 moles and 3 empty spaces in a random order

//I want to create a 3x3 grid of divs with a mole image in each div

// make a 3x3 grid of divs that fit perfectly in a 700x700 canvas
// each div should have a mole image in it

//get canvas element and its context
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

function getCanvasClickPosition(canvas, event) {
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  return { x: x, y: y };
}
canvas.addEventListener('mousedown', function(event) {
  var position = getCanvasClickPosition(canvas, event);
  var x = position.x;
  var y = position.y;
  // Do something with x and y
  console.log(x, y);

});

class Mole {
  constructor(x, y, src) {
    this.x = x;
    this.y = y;
    this.src = 'images/mole.png';
    this.img = new Image();
  }
  draw() {
    this.img.onload = () => {
      ctx.drawImage(this.img, this.x, this.y, 100, 100);
    };
    this.img.src = this.src;
  }

  getImgSrc() {
    return this.src;
  }
}
  
//main game loop 
function startGame() {
    var score = 0;
    var myArray = new Array(3).fill().map(() => new Array(3).fill(null));

    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        var mole = new Mole(80 + (i * 200), 80 + (j * 200));
        myArray[i][j] = (mole);
        myArray[i][j].draw();
      }
    }

    canvas.addEventListener('mousedown', function(event) {
      var position = getCanvasClickPosition(canvas, event);
      var x = position.x;
      var y = position.y;
      
      // Check if the user clicked on a mole
      for (let i = 0; i < myArray.length; i++) {
        for (let j = 0; j < myArray[i].length; j++) {
          let mole = myArray[i][j];
          if (x >= mole.x && x <= mole.x + 100 && y >= mole.y && y <= mole.y + 100) {
            // Change the mole's image src
            if(mole.src === 'images/mole.png'){
              score = score + 1;
            }
            
            mole.src = '';    
            document.getElementById('score').innerHTML = "Score: " + score.toString();

            // Redraw the canvas to show the new image
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < myArray.length; i++) {
              for (let j = 0; j < myArray[i].length; j++) {
                myArray[i][j].draw();
              }
            }
            
            break;
          }
        }
      }
    });

    setInterval(() => {
      // Select a random mole to pop out
      let i = Math.floor(Math.random() * myArray.length);
      let j = Math.floor(Math.random() * myArray[i].length);
      let mole = myArray[i][j];
      
      // Change the mole's image src
      mole.src = 'images/mole.png';
  
      // Redraw the canvas to show the new image
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < myArray.length; i++) {
        for (let j = 0; j < myArray[i].length; j++) {
          myArray[i][j].draw();
        }
      }
  
      // Set a timeout to pop the mole back in after 1 second
      setTimeout(() => {
        mole.src = '';
  
        // Redraw the canvas to show the new image
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < myArray.length; i++) {
          for (let j = 0; j < myArray[i].length; j++) {
            myArray[i][j].draw();
          }
        }
      }, 1000);
    }, Math.floor(Math.random() * 4000) + 1000);

    console.log(myArray[0][0]);
}