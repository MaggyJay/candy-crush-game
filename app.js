document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const width = 8;
    const squares = [];
    let score = 0;


    const candyColors = [
        'red',
        'yellow',
        'purple',
        'orange',
        'green',
        'blue'
    ];
    // Create Board

    function createBoard () {
        for (let i = 0; i < width*width; i++) {
            const square = document.createElement('div')
            //we want to make the squares/candies draggable so we do the below
            square.setAttribute('draggable', true);
            //we want to give each grid an id so that we know which one we are moving
            square.setAttribute('id', i) //now everytime our loop occurs our i's have values from 0 to 63.

            let randomColor = Math.floor(Math.random() * candyColors.length);
                //we now have a random number from 0 to 5.
            square.style.backgroundColor = candyColors[randomColor];
                //look more into this syntax later, very interesting
            grid.appendChild(square);
            squares.push(square);
        }
    }
    
    createBoard();

    //Drag the candies
    let colorBeingDragged;
    let colorBeingReplaced;
    let squareIdBeingDragged;
    let squareIdBeingReplaced;



    squares.forEach(square => square.addEventListener('dragstart', dragStart));
    // for each square in our square array we have an event listening
    //research more into addevent listners 
    squares.forEach(square => square.addEventListener('dragend', dragEnd));
    squares.forEach(square => square.addEventListener('dragover', dragOver));
    squares.forEach(square => square.addEventListener('dragenter', dragEnter));
    squares.forEach(square => square.addEventListener('dragleave', dragLeave));
    squares.forEach(square => square.addEventListener('drop', dragDrop));

    function dragStart() {
        colorBeingDragged = this.style.backgroundColor;
        squareIdBeingDragged = parseInt(this.id);
        console.log('this is the colorbeing dragged--  ' + colorBeingDragged);
        console.log(this.id, 'dragstart');
            //passing the id of the squares being listened to, this is picking up the element which we set using the set attribute on line 23.
    }

    function dragOver(e) {
        //using e for 'event'
        e.preventDefault ();
            //we prevent it from doing anything as it's dragging.
            //I can go back and add animations/styling/etc if I choose to for the dragging process
        console.log(this.id, 'dragover');
    }

    function dragEnter(e) {
        e.preventDefault();
        console.log(this.id, 'dragenter');
    }

    function dragLeave() {
        console.log(this.id, 'dragleave');
    }

    function dragDrop() {
        console.log(this.id, 'dragdrop');
        colorBeingReplaced = this.style.backgroundColor;
        squareIdBeingReplaced = parseInt(this.id);
        this.style.backgroundColor = colorBeingDragged;
        squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced;
        console.log(squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced);
            //adding the square id of the square being dragged into the squares array, we want to add the squares color
    }

    
    function dragEnd() {
        console.log(this.id, 'dragend');
            //what is a valid move?
            //in candy crush you can only switch candies with those that are directly above, below, to the right or to the left of the current candy
        let validMoves = [
            squareIdBeingDragged - 1,
            //if you're on square 67 you're saying it can be switched out with square 66
            squareIdBeingDragged - width,
            //square visually above our square
            squareIdBeingDragged + 1,
            //square 68 if we're on square 67
            squareIdBeingDragged + width
            //square 75 if we're on square 67 (below our square in grid)
         ]

         let validMove = validMoves.includes(squareIdBeingReplaced)
         //if the number pass thru the square id being replaced is included in our valid moves array, we store the value of true. 

         if (squareIdBeingReplaced && validMove) {
             
            squareIdBeingReplaced = null;
         }
         else if (squareIdBeingReplaced && !validMove) {
            
            squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced;
            //since the square can't move as its not a valid move, we are giving the square back its color.
             squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
             //give the original square its original color again
         }
         else {
             squares [squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
         }
    }




    //Checking for matches

//check for row of four

function checkRowForFour () {
    //we have to loop 61 instead of 63 because there are no squares after index 63
    for (i =0; i < 60; i++) {
        let rowOfFour = [i, i+1, i+2, i+3];
        let decidedColor = squares[i].style.backgroundColor;
        const isBlank = squares[i].style.backgroundColor === '';

        const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55];
        if (notValid.includes(i)) continue;

        if (rowOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            score += 4;
            rowOfFour.forEach(index => {
                squares[index].style.backgroundColor = '';
            })
        }
    }
}
checkRowForFour();

//check for column of four

function checkColumnForFour () {
    //we have to loop 61 instead of 63 because there are no squares after index 63
    for (i = 0; i < 47; i++) {
        let columnOfFour = [i, i+width, i+width*2, i+width*3];
        let decidedColor = squares[i].style.backgroundColor;
        const isBlank = squares[i].style.backgroundColor === '';

        if (columnOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)){
            score += 4;
            columnOfFour.forEach(index => {
                squares[index].style.backgroundColor = '';
            })
        }
    }
}
checkColumnForFour();



    //check for row of three

    function checkRowForThree () {
        //we have to loop 61 instead of 63 because there are no squares after index 63
        for (i =0; i < 61; i++) {
            let rowOfThree = [i, i+1, i+2];
            let decidedColor = squares[i].style.backgroundColor;
            const isBlank = squares[i].style.backgroundColor === '';

            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
            if (notValid.includes(i)) continue;

            if (rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 3;
                rowOfThree.forEach(index => {
                    squares[index].style.backgroundColor = '';
                })
            }
        }
    }
    checkRowForThree();

    //check for column of three

    function checkColumnForThree () {
        //we have to loop 61 instead of 63 because there are no squares after index 63
        for (i =0; i < 47; i++) {
            let columnOfThree = [i, i+width, i+width*2];
            let decidedColor = squares[i].style.backgroundColor;
            const isBlank = squares[i].style.backgroundColor === '';

            if (columnOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 3;
                columnOfThree.forEach(index => {
                    squares[index].style.backgroundColor = '';
                })
            }
        }
    }
    checkColumnForThree();



    //want to invoke the checkrowthree function every 100 millisecond, maybe check out tetris to learn more about this

    window.setInterval(function(){
        checkRowForFour();
        checkColumnForFour();
        checkRowForThree();
        checkColumnForThree();
    }, 100)



})