import {QUIZAPP_Audio_Dictionary_API_key, QUIZAPP_IMAGE_API_KEY} from "./apikeys.js"


import { wordsListLesson1, wordsListLesson2, 
  wordsListLesson3, wordsListLesson4} from "./wordslist.js"


let currentLesson



let lessonPage = document.getElementsByClassName("lessonpage")[0]
    let mainPage = document.getElementById("mainpage")


export const initalizeTestPage = () => {
  let lessonPage = document.getElementsByClassName("lessonpage")[0]
  let mainPage = document.getElementById("mainpage")
    mainPage.style.display ="block"
    lessonPage.style.display ="none"
}

let lessonTitle = document.querySelector(".lessontitle")
let mainButtons = document.getElementsByClassName("bottombutton")
let wordsListsArrays = [wordsListLesson1, wordsListLesson2, wordsListLesson3, wordsListLesson4]
let displayLesson






function buttonHandler (){

for (let i = 0; i < mainButtons.length; i++) {
    


  mainButtons[i].addEventListener('click', (e) => {
   

      let currentLesson = null; 
      lessonPage.style.display = "block"
      mainPage.style.display = "none"
    
     if(e.target.id === "0"){
        currentLesson = 0
        lessonTitle.textContent = "Family"
        displayLesson = wordsListsArrays[currentLesson]
        updatePage()
      
     } 

     if(e.target.id === "1"){
       currentLesson = 1
       lessonTitle.textContent = "Clothes"
       displayLesson = wordsListsArrays[currentLesson]
      updatePage()
    
     }
     
     
     if(e.target.id === "2"){
        currentLesson = 2
        lessonTitle.textContent = "Places"
        displayLesson = wordsListsArrays[currentLesson]
        updatePage()
        
     }
     

     if(e.target.id === "3"){
       currentLesson = 3
       lessonTitle.textContent = "Emotions"
       displayLesson = wordsListsArrays[currentLesson]
       updatePage()
     }
      
  
  })


}

}

buttonHandler()




let lesson1complete = false; 
let lesson2complete = false; 
let lesson3complete = false; 
let lesson4complete = false; 


// cycles through each word
let currentPage = 0

 // cycles through pictures
 let currentIndex = 0

let imageToDisplay = document.getElementsByClassName('lessonpicture')[0];
const nextImageButton = document.getElementsByClassName("nextbttn")[0]
const previousImageButton = document.getElementsByClassName("prevbttn")[0]




async function displayImage () {
  let randomImage = await getNewImage();
  imageToDisplay.src = randomImage;
  
 }

 async function getNewImage () {
  

  if (displayLesson === undefined){
  
  setTimeout(getNewImage,400)

   return
  }




  let newPic = displayLesson[currentPage]

  const imageURL = "https://api.unsplash.com/search/photos?query="+ newPic +"&client_id=" + QUIZAPP_IMAGE_API_KEY
  return fetch(imageURL)
  .then((response) => response.json())
  .then((data) => {
    
    return data.results[currentIndex].urls.small
  });
  
  
  }

  async function updateNewImage () {
    
    if (displayLesson === undefined){
  
      setTimeout(updateNewImage,400)
    
       return
      }
    

    
    let randomImage = await getNewImageCategory();
    imageToDisplay.src = randomImage;
    
   }
  
   async function getNewImageCategory () {
 
    let updatedCategoryPic = displayLesson[currentPage]
 
    const imageURL = "https://api.unsplash.com/search/photos?query="+ updatedCategoryPic +"&client_id="+ QUIZAPP_IMAGE_API_KEY
    return fetch(imageURL)
    .then((response) => response.json())
    .then((data) => {
     return data.results[currentIndex].urls.small
    });
    
    
    }



nextImageButton.addEventListener('click', () => {

  currentIndex += 1 
 
displayImage()
});


previousImageButton.addEventListener('click', () => {

  currentIndex -= 1 
displayImage()
});



displayImage()

let apiAudio = null 

function play(source) {

  let newDef = source.meanings[0].definitions[0].definition

  apiAudio = ""+ source.phonetics[1].audio + ""


      const vocabularyBox = document.getElementsByClassName("worddescription")[0]
     
      vocabularyBox.textContent = newDef

      const audioButton = document.getElementsByClassName("voicebutton")[0]


      audioButton.addEventListener('click', (e) => {

        var audio = new Audio(apiAudio);
        audio.play();
      
      
         })


    }
    


let word = {
  apiKey: "cf24836904b630625a0cf302dfe09cac", 
   fetchword: function (word) {
     fetch
     (QUIZAPP_Audio_Dictionary_API_key + word + ""
   )
   .then((response) => {
     if (!response.ok) {
       alert("No word found");
       throw new Error("No word found.");
     }
     return response.json();
   })
   .then((data) => play(data[0]));
},

}


let previousWord = document.getElementById("leftarrowicon")
let nextWord = document.getElementById("rightarrowicon")

previousWord.addEventListener('click', () => {

  if (currentPage === 0 ){
    return
  }

  

  displayLesson[currentPage -=1 ]
 
   updatePage()
  
})

nextWord.addEventListener('click', () => {

   
displayLesson[currentPage +=1 ]

if (currentPage === 5 ){
 
  initCongratsMessage()
  clearAndRedirect()

  
 if (lessonTitle.textContent === "Family"){
  lesson1complete = true; 
 }

 if (lessonTitle.textContent === "Clothes"){
  lesson2complete = true; 
 }
  
 if (lessonTitle.textContent === "Places"){
  lesson3complete = true; 
 }
 if (lessonTitle.textContent === "Emotions"){
  lesson4complete = true; 
 }

 assignProperCheck()

   }
   
  
 
  updatePage()
})


function updatePage (){
   


  if (displayLesson === undefined){
  
    setTimeout(updatePage,400)
  
     return
    }

  let currentTitle = document.getElementsByClassName("lessonlargetitletext")[0]
  currentTitle.textContent = displayLesson[currentPage]
  
   let wordandaudio = currentTitle.textContent

   word.fetchword(wordandaudio)
   updateNewImage()



  }



updatePage()


function clearCongratsMessage(){
  let congratsPage = document.querySelector(".completemessagepopup")
  congratsPage.style.display ="none"
  let lessonPage = document.getElementsByClassName("lessonpage")[0]
  lessonPage.style.display = "none"
  let mainPage = document.getElementById("mainpage")
  mainPage.style.display ="block"
}



function initCongratsMessage(){
  let congratsPage = document.querySelector(".completemessagepopup")
  congratsPage.style.display ="block"
}

function clearAndRedirect (){
  setTimeout(clearCongratsMessage, 1500)
  currentPage = 0 
  
}


function assignProperCheck (){
  
  let checkMarks = document.getElementsByClassName("checkmark")
  if (lesson1complete === true){
   checkMarks[0].style.display = "block"
  }

  if (lesson2complete === true){
    checkMarks[1].style.display = "block"
   }

   if (lesson3complete === true){
    checkMarks[2].style.display = "block"
   }
 
   if (lesson4complete === true){
     checkMarks[3].style.display = "block"
    }


}


assignProperCheck()




const goToMainMenuOnClick = () => {

let menuButton = document.getElementsByClassName("menubutton")[0]

menuButton.addEventListener('click', () => {


  mainPage.style.display ="block"
  lessonPage.style.display ="none"
  currentPage = 0 
  console.log(currentPage)
})

}
goToMainMenuOnClick()


const checkLesson =() => {



}

checkLesson()