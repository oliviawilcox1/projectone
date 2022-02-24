document.addEventListener('DOMContentLoaded', () => {
    

const gridBox = document.querySelector('.box')
const points = document.getElementById("points")
const points2 = document.getElementById("points2")
const timer = document.getElementById("count")
const button = document.getElementById("button")
const winner = document.getElementById("winner")
let player = 'one'

timer.textContent = '45'
// points.textContent = 0;
// points2.textContent = 0;

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

//images.sort( () => 0.5 - Math.random ());

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

    if(points > points2) {
        winner.textContent = "Player One Wins"
    } else if (points < points2) {
        winner.textContent = "Player Two Wins"
    } else {
        winner.textContent = "There is a tie!"
    }
}


button.addEventListener('click', () => {

console.log('this is player', player)
let count = 45
const setTimer1 = setInterval(()=> {
    
    if(count > 0) {
        count--; 
        timer.textContent = count;
        // console.log(count)
    }
    
    if(count === 0 || matches.length === images.length/2) {
        
        console.log('this is player', player)
        if (player === 'one') {
            points.textContent = pointsArr[pointsArr.length-1]
        }

       if (player === 'two') {
           points2.textContent = pointsArr[pointsArr.length-1]
       }
        if (player === 'two') {
            printPlayersScores()
        }
        switchPlayers()
        setTimeout(()=> {
        //alert(`It is Player Two's Turn!`) 
        clearInterval(setTimer1)
        const cards = document.querySelectorAll('img')
        cardChoice = []
        cardsId = []
        matches = []
        timer.textContent = 45;
        cards.forEach(element => element.style.visibility = 'visible')
        }, 100)

    
    }
   
    }, 1000)
})




function flipCards () {
   
    if(cardChoice.length != 2) {
        let cardDataId = this.getAttribute('data-id');
        //console.log(images[cardDataId].name)
        cardChoice.push(images[cardDataId].name)
        //console.log(cardDataId)
        //console.log('this is the cards choosen array', cardChoice)
        cardsId.push(cardDataId)
        //console.log('this is the ids', cardsId)
        this.setAttribute('src', images[cardDataId].img)
    if (cardChoice.length == 2) {
        setTimeout(match, 200)
        }
    }
  
}

function match () {
    const cards = document.querySelectorAll('img')
    const choiceOne = cardsId[0]
    //console.log(choiceOne)
    const choiceTwo = cardsId[1]
    //console.log('cards array', cards)
    // console.log(choiceTwo)
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





    //calculate the points of a match
    //if(player one === one)
    // point1Arr.push(currentPoints)
    // points.textContent = point1Arr[point1Arr.length-1]
    // console.log('points array', point1Arr[point1Arr.length-1])
    // point2Arr.push(currentPoints)
    // points2.textContent = point1Arr[point1Arr.length-1]


    // let currentPoints = (matches.length) * 5
    // point1Arr.push(currentPoints)
    // points.textContent = point1Arr[point1Arr.length-1]
   // points.textContent = currentPoints