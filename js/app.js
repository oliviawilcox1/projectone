document.addEventListener('DOMContentLoaded', () => {
    

const gridBox = document.querySelector('.box')
const points = document.getElementById("points")
const points2 = document.getElementById("points2")
const timer = document.getElementById("count")
const button = document.getElementById("button")
const winner = document.getElementById("winner")

let player = 'one'

timer.textContent = '30'
//array of objects of my images
const images = [
    { name: 'shade1', img: 'img/purple.jpg'},
    { name: 'shade1', img: 'img/purple.jpg'},

    { name: 'shade2', img: 'img/two.png'},
    { name: 'shade2', img: 'img/two.png'},

    { name: 'shade3', img: 'img/three.png'},
    { name: 'shade3', img: 'img/three.png'},

    { name: 'shade4', img: 'img/four.png'},
    { name: 'shade4', img: 'img/four.png'},

    { name: 'shade5', img: 'img/five.png'},
    { name: 'shade5', img: 'img/five.png'},

    { name: 'shade6', img: 'img/six.png'},
    { name: 'shade6', img: 'img/six.png'},

    { name: 'shade7', img: 'img/seven.png'},
    { name: 'shade7', img: 'img/seven.png'},

    { name: 'shade8', img: 'img/eight.png'},
    { name: 'shade8', img: 'img/eight.png'},

    { name: 'shade9', img: 'img/nine.png'},
    { name: 'shade9', img: 'img/nine.png'},

    { name: 'shade10', img: 'img/ten.png'},
    { name: 'shade10', img: 'img/ten.png'} 
] 



images.sort( () => 0.5 - Math.random ());
//sort cards randomly

let cardChoice = []
//empty array of card names
let cardsId = []
//empty array of card data
let matches = []
//empty array of matches
let pointsArr = []
//empty arr of points

function switchPlayers () {
        player = player === 'one' ? 'two' : 'one';
        //switch for who the player is, if one then switch to two
    }



function createBackBoard () {

    for (let i = 0; i < images.length; i++) {
        //iterate through the images array
        const card = document.createElement('img')
        //created imgs
        card.setAttribute('src', 'img/front.jpg')
        //set them equal to front card
        card.setAttribute('data-id', i)
        //gives it a number id 0 - 19 to differentiate 
        card.addEventListener('click', flipCards)
        //call to flip the card when clicked
        gridBox.appendChild(card)
        // append cards to grid 
    }
}

const printPlayersScores = () => {
    if (points.textContent > points2.textContent) {
        winner.textContent = "Player One Wins!"
        //if points1 is greater than player one wins
    } else if (points.textContent < points2.textContent) {
        winner.textContent = "Player Two Wins!"
        //if points two is greater than player two wins
    } else {
        winner.textContent = "There is a Tie! Play Again!"
        //else there is a tie
    }
}


button.addEventListener('click', () => {
//listen for the button to be clicked
let count = 30
const setTimer1 = setInterval(()=> {
    
    if(count > 0) {
        count--; 
        //decrememnt count
        timer.textContent = count;
        //timer is count
        winner.textContent = ''
    }
    
    if(count === 0 || matches.length === images.length/2) {
        //time is out or all matches have been found
    
        if (player === 'one') {
            points.textContent = pointsArr[pointsArr.length-1]
            //get final points pushed into array and add it to player points
            button.innerText = "Player Two Start!"
            //changes button
        }

       if (player === 'two') {
           points2.textContent = pointsArr[pointsArr.length-1]
           //get final points pushed into array and add it to player points
           printPlayersScores()
           //call function to compare scores
           button.innerText = 'Player One Start!'
       }
 
        switchPlayers()
       // calls switch
        setTimeout(()=> {
        clearInterval(setTimer1)
        //interval is cleared
        const cards = document.querySelectorAll('img')
        cardChoice = []
        cardsId = []
        matches = []
        pointsArr = []
        //clear out all data after each player

        timer.textContent = 30;
        //reset all of the cards to be visible and the front image
        cards.forEach(element => element.style.visibility = 'visible')
        cards.forEach(element => element.setAttribute('src','img/front.jpg'))
        //after one players turn, all arrays cleared, and all cards set to visible and front image
        //timer reset as well
        }, 100)    
    }
    }, 1000)
})




function flipCards () {
   
    if(cardChoice.length != 2) {
        //only clicked on oe card 
        let cardDataId = this.getAttribute('data-id');
       
        //giving you shade name of the data id
        cardChoice.push(images[cardDataId].name)
        //pushing shade name into array
       
        cardsId.push(cardDataId)
        //pushing data number into data array
       
        this.setAttribute('src', images[cardDataId].img)
        //flips image over and sets it to back image
    if (cardChoice.length == 2) {
        setTimeout(match, 100)
        //if length of cardChoice is 2, check for a match
        }
    }
  
}

function match () {
    const cards = document.querySelectorAll('img')
    //select all imgs
    const choiceOne = cardsId[0]
    
    //data id of what you have clicked
    const choiceTwo = cardsId[1]
 
 
        if (cardsId[0] === cardsId[1]) {
            //account for double clicking same image in array with same data
            cards[choiceOne].setAttribute('src','img/front.jpg')
            //change back to front image
            cards[choiceTwo].setAttribute('src','img/front.jpg')
        } else if (cardChoice[0] === cardChoice[1]) {
        //if names of item match in array they are the same color
            matches.push(cardChoice)
            //push name into match array
            cards[choiceOne].style.visibility = 'hidden'
            cards[choiceTwo].style.visibility = 'hidden'
            // set them to hidden 
            cards[choiceOne].setAttribute('src','img/front.jpg')
            cards[choiceTwo].setAttribute('src','img/front.jpg')
            //set them back to front for when they need to be visible again
         }  else {
             //not a match
            cards[choiceOne].setAttribute('src','img/front.jpg')
            //change back to front image
            cards[choiceTwo].setAttribute('src','img/front.jpg')
        }

    cardChoice = []
    //reclear the array
    cardsId = []
    //reclear the data array
    let currentPoints = (matches.length) * 5
    //length of matches times 5 for points
    pointsArr.push(currentPoints)
    //push points into point arr
     
}       

createBackBoard()
//callBackBoard
})
