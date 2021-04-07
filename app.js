document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const width = 8;
    const squares = [];


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
let colorBeingDragged 



    squares.forEach(square => square.addEventListener('dragstart', dragStart));
    // for each square in our square array we have an event listerning
    //research more into addevent listners 
    squares.forEach(square => square.addEventListener('dragend', dragEnd));
    squares.forEach(square => square.addEventListener('dragover', dragOver));
    squares.forEach(square => square.addEventListener('dragenter', dragEnter));
    squares.forEach(square => square.addEventListener('dragleave', dragLeave));
    squares.forEach(square => square.addEventListener('dragdrop', dragDrop));

    function dragStart() {
        colorBeingDragged = this.style.backgroundColor
        console.log(colorBeingDragged);
        console.log(this.id, 'dragstart');
        //passing the id of the squares being listened to, this is picking up the element which we set using the set attribute
    }

    function dragOver() {
        console.log(this.id, 'dragover');
    }

    function dragEnter() {
        console.log(this.id, 'dragenter');
    }

    function dragLeave() {
        console.log(this.id, 'dragleave');
    }

    function dragEnd() {
        console.log(this.id, 'dragend');
    }

    function dragDrop() {
        console.log(this.id, 'dragdrop');
    }
})