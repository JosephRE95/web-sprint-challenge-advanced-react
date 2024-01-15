import React, { useState } from 'react';

const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at

export default function AppFunctional(props) {
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  function getXY() {
   switch (currentIndex){
    case 0: return [1,1]
    case 1: return [2,1]
    case 2: return [3,1]
    case 3: return [4,2]
    case 4: return [5,2]
    case 5: return [6,2]
    case 6: return [7,3]
    case 7: return [8,3]
    case 8: return [9,3]
   }
  }

  function getXYMessage() {
    const { x, y } = getXY();
    return `Coordinates (${x}, ${y})`;
  }

  function reset() {
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setCurrentIndex(initialIndex);
  }


  function move(evt) {
    const direction = evt.target.id;
    switch (direction) {
      case 'left':
      if (index !== 0 && index !== 3 && index !== 6){
      setCurrentIndex(currentIndex -1)
      setSteps(steps +1 )
      } else {
        setMessage("You cant move left")
      }
      break;
      case 'up':
      if (index > 2){
      setCurrentIndex(index -3)
      setSteps(steps +1 )
      } else {
        setMessage("")
      }
      break;
      case 'right':
      if (index !== 0 && index !== 3 && index !== 6){
      setCurrentIndex()
      setSteps()
      } else {
        setMessage("")
      }
      break;
      case 'down':
      if (index !== 0 && index !== 3 && index !== 6){
      setCurrentIndex()
      setSteps()
      } else {
        setMessage("")
      }
      break;
      
    }
    
  }

  function onChange(evt) {
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    // Prevent the default form submission behavior
    evt.preventDefault();

  
    // Get the entered email from the input field
    const email = document.getElementById('email').value;
  
    // Check if the email is valid
    if (!isValidEmail(email)) {
      // Display an error message if the email is not valid
      setMessage('Invalid email address');
      return;
    }
  
    // Create a payload with information to send to the server
    const payload = {
      x: getXY().x,
      y: getXY().y,
      steps: steps,
      email: email
    };
  
    // Make a request to the server using the fetch function
    fetch('http://localhost:9000/api/result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // Convert the payload to JSON and include it in the request body
      body: JSON.stringify(payload)
    })
      .then(response => {
        // Check if the server response is successful
        if (!response.ok) {
          // If not, throw an error
          throw new Error('Network response was not ok');
        }
        // Handle successful response by converting the response to JSON
        return response.json();
      })
      .then(data => {
        // Update the message state with a success message
        setMessage('Success: ' + JSON.stringify(data));
        setEmail('');
      })
      .catch(error => {
        // Handle errors by logging to the console and updating the message state
        console.error('Error:', error);
        setMessage('Error: ' + error.message);
      });
  }
  
  // Function to check if an email is valid
  function isValidEmail(email) {
    // Check if the email is not empty
    if (!email.trim()) {
      return false;
    }
  
    // Check if the email contains an '@' symbol
    if (email.indexOf('@') === -1) {
      return false;
    }
  
    // Check if there's at least one dot (.) after the '@' symbol
    const lastDotIndex = email.lastIndexOf('.');
    if (lastDotIndex === -1 || lastDotIndex < email.indexOf('@')) {
      return false;
    }
  
    return true;
  }
  

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} { steps > 1 ? 'times' : 'time' }</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === currentIndex ? ' active' : ''}`}>
            {idx === currentIndex ? 'B' : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>
          LEFT
        </button>
        <button id="up" onClick={move}>
          UP
        </button>
        <button id="right" onClick={move}>
          RIGHT
        </button>
        <button id="down" onClick={move}>
          DOWN
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" value={email} onChange={onChange} />
        <input id="submit" type="submit" />
      </form>
    </div>
  );
}
