// controller (ingenting her ennå)
function klikkStolpe(barNo){
    
    chosenBar = barNo == chosenBar ? "" : barNo;
    
    // if(barNo == chosenBar){
    //     chosenBar = "";
    //     console.log(chosenBar + " i if")
    // } else {
    //     chosenBar = barNo;
    //     console.log(chosenBar + " i else")
    //     console.log(barNo + " barNo")
    // }

  show(); }
    
function leggTilStolpe(){
    
    if(inputValue < 1 ){
        alert("Denne stolpen er for liten");
    }else if(inputValue > 10 ) {
        alert("Denne stolpen er for stor");
        
    } else  {
            numbers.push(inputValue); 
    }
    show();
    
    

}

function slettStolpe(){
   numbers.splice(chosenBar -1, 1);
   show();

}
function endreStolpe(){
    if (inputValue < 1 || inputValue > 10) {
            alert ('du har skrevet enten for lavt eller høyt!')
            return inputValue;
        }
            numbers[chosenBar -1] = inputValue;
            // console.log(inputValue);
            // console.log(chosenBar);

            // console.log(numbers[chosenBar -1] + "Hei");

        // numbers.splice(chosenBar - 1, 1, inputValue);
    show();

    

}
