document.addEventListener('DOMContentLoaded', () => {
    

const gridBox = document.querySelector('.box')
const points = document.getElementById("points")
const points2 = document.getElementById("points2")
const timer = document.getElementById("count")
const button = document.getElementById("button")
const winner = document.getElementById("winner")

let player = 'one'

timer.textContent = '30'

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
let pointsArr = []

function switchPlayers () {
        player = player === 'one' ? 'two' : 'one';
        console.log(player)
    }



function createBackBoard () {

    for (let i = 0; i < images.length; i++) {
       const card = document.createElement('img')
        card.setAttribute('src', 'img/front.jpg')
        card.setAttribute('data-id', i)
         //gives it a number id 
        console.log(card)
        //be sure everything nis assigned correctly
        card.addEventListener('click', flipCards)
        gridBox.appendChild(card)
    }
}

const printPlayersScores = () => {
    // console.log(points.textContent)
    // console.log(points2)
    if (points.textContent > points2.textContent) {
        console.log(points)
        winner.textContent = "Player One Wins!"
    } else if (points.textContent < points2.textContent) {
        winner.textContent = "Player Two Wins!"
    } else {
        winner.textContent = "There is a Tie! Play Again!"
    }
}


button.addEventListener('click', () => {

console.log('this is player', player)
let count = 30
const setTimer1 = setInterval(()=> {
    
    if(count > 0) {
        count--; 
        timer.textContent = count;
        winner.textContent = ''
        // console.log(count)
    }
    
    if(count === 0 || matches.length === images.length/2) {
        
        console.log('this is player', player)
        if (player === 'one') {
            points.textContent = pointsArr[pointsArr.length-1]
            button.innerText = "Player Two Start!"
        }

       if (player === 'two') {
           points2.textContent = pointsArr[pointsArr.length-1]
           printPlayersScores()
           button.innerText = 'Player One Start!'
       }
 
        switchPlayers()

        setTimeout(()=> {
        //alert(`It is Player Two's Turn!`) 
        clearInterval(setTimer1)
        const cards = document.querySelectorAll('img')
        cardChoice = []
        cardsId = []
        matches = []
        pointsArr = []

        timer.textContent = 30;
        cards.forEach(element => element.style.visibility = 'visible')
        cards.forEach(element => element.setAttribute('src','img/front.jpg'))
        
        }, 100)    
    }
    }, 1000)
})




function flipCards () {
   
    if(cardChoice.length != 2) {
        let cardDataId = this.getAttribute('data-id');
        console.log(images[cardDataId].name)
        //giving you shade name
        cardChoice.push(images[cardDataId].name)
        console.log('this is the cards choosen array', cardChoice)
        cardsId.push(cardDataId)
        console.log('this is the ids', cardsId)
        this.setAttribute('src', images[cardDataId].img)
    if (cardChoice.length == 2) {
        setTimeout(match, 100)
        }
    }
  
}

function match () {
    const cards = document.querySelectorAll('img')
    const choiceOne = cardsId[0]
    console.log('this is choiceOne', choiceOne)
    const choiceTwo = cardsId[1]
    //console.log('cards array', cards)
    console.log('this is choice two', choiceTwo)
        if (cardsId[0] === cardsId[1]) {
            //account for double clicking same image
            cards[choiceOne].setAttribute('src','img/front.jpg')
            //change back to front image
            cards[choiceTwo].setAttribute('src','img/front.jpg')
        } else if (cardChoice[0] === cardChoice[1]) {
        //if names of item match in array they are the same color
            matches.push(cardChoice)
            cards[choiceOne].style.visibility = 'hidden'
            cards[choiceTwo].style.visibility = 'hidden'
            cards[choiceOne].setAttribute('src','img/front.jpg')
            cards[choiceTwo].setAttribute('src','img/front.jpg')
         }  else {
            cards[choiceOne].setAttribute('src','img/front.jpg')
            //change back to front image
            cards[choiceTwo].setAttribute('src','img/front.jpg')
        }

    cardChoice = []
    //reclear the array
    cardsId = []
    //reclear the data array
    let currentPoints = (matches.length) * 5
    pointsArr.push(currentPoints)
    console.log(pointsArr)  
}       

createBackBoard()
})
