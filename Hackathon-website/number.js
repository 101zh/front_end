  
// random value generated 
var y = Math.floor(Math.random() * 100 + 1); 
      
    // counting the number of guesses 
    // made for correct Guess 
var guess = 1; 
      
function sumbitGuess ()
      
  // number guessed by user      
  var x = document.getElementById("guessField").value; 
  
  if(x == y) 
  {     
    alert("Congrats!!! Ya guessed the epik potat's number in "+ guess + " guess/guesses 🎉🥔🥳"); 
  } 
  else if(x > y) /* if guessed number is greater 
                  than actual number*/ 
  {     
    guess++; + guess + " guess/guesses 🎉🥔🥳"); 
  } 
  else if(x > y) /* if guessed number is greater 
                  than actual number*/ 
  {     
    guess++; 
    alert("Try a smaller number 🥔 .__. 🥔"); 
  } 
  else
  { 


  } 
  else
  { 
    guess++; 
    alert("Try a greater number 🥔 .__. 🥔") 
  } 
} 