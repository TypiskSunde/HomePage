function tall(Knappen){
    talletViTryktePå = Knappen.innerHTML;
   //document.getElementById("userInput").value = talletViTryktePå;
   // = talletViTryktePå;
   updateView();
}
function enter(){
   console.log(talletViTryktePå);
   console.log(number);
   if (talletViTryktePå == number){
       guessNumberText = `Du gjettet riktig, din nr var ${number}!`
   } else if (talletViTryktePå < number) {
       guessNumberText = "Du gjettet for lavt!"
   }

   else if (talletViTryktePå > number){
       guessNumberText = "Du gjettet for høyt!"
   } else if (talletViTryktePå < 0 || isNaN(talletViTryktePå) == true) { //isNaN sjekker om noe ikke er et tall. isNaN(ikke et tall) = true isNaN(tall) = false 
       guessNumberText = "Vennligst skriv inn et tall";
   }
   updateView();
   
}
function getRandomNumber(){
   return ( Math.floor(Math.random() * 10) + 1);
}
function prøvPåNytt(){
   guessNumberText = "";
   talletViTryktePå = "";
   number = getRandomNumber();
   updateView();
}
