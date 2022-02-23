document.addEventListener('DOMContentLoaded', () => {
    

const gridBox = document.querySelector('.box')
const points = document.getElementById("points")
const playerTurn = document.getElementById("player")
const timer = document.getElementById("count")

let player = 'One'
playerTurn.innerText = 'One'
timer.textContent = '20'


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

let cardChoice = []
let cardsId = []
let matches = []


function switchPlayers () {
    if(player === 'One') {
        playerTurn.innerText = 'Two';
    } 
}
// }
// const resetBoard = () => {
//     timer.textContent = '20'
// }

function createBackBoard () {

    for (let i = 0; i < images.length; i++) {
       const card = document.createElement('img')
        card.setAttribute('src', 'img/front.jpg')
        card.setAttribute('data-id', i)
         //gives it a number id 
        console.log(card)
        card.addEventListener('click', flipCards)
        gridBox.appendChild(card)
    }
}


function flipCards () {
    if(cardChoice.length != 2) {
        let cardDataId = this.getAttribute('data-id');
        cardChoice.push(images[cardDataId].name)
        cardsId.push(cardDataId)
        this.setAttribute('src', images[cardDataId].img)
    if (cardChoice.length == 2) {
        setTimeout(match, 600)
        }
    }
}

function match () {
    const cards = document.querySelectorAll('img')
    const choiceOne = cardsId[0]
    const choiceTwo = cardsId[1]
    console.log(cards)

    if(cardChoice[0] === cardChoice[1]) {
        matches.push(cardChoice)
    } else {
    cards[choiceOne].setAttribute('src','img/front.jpg')
    cards[choiceTwo].setAttribute('src','img/front.jpg')

    }

    cardChoice = []
    cardsId = []
    points.textContent = (matches.length) * 5
       
    if (matches.length === images.length/2) {
        alert(`Player one scored ${points} points!`)
        switchPlayers()
        points.textContent = 0
        gridBox.remove('img')
        createBackBoard()
    }
}                 
            
createBackBoard()


})




// const printPlayersScores = () => {
//         // when game is finished alert pops up with who the winner with the higher score
//         //if player one score is greater than player 2, player one wins
//         //else if player two is greater than player one player two wins
//         // else if player two === player one score there is a tie
// }


// let count = 20
    
// setInterval(()=> {
         
//   if(count>0) {
//     --count; 
//     timer.textContent = count;
//     console.log(count)
 // } 
 // }, 1000)
    