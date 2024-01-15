import axios from "axios";
import React, { useState } from "react";

const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at

export default function AppFunctional(props) {
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  function getXY() {
    switch (currentIndex) {
      case 0:
        return { x: 1, y: 1 };
      case 1:
        return { x: 2, y: 1 };
      case 2:
        return { x: 3, y: 1 };
      case 3:
        return { x: 1, y: 2 };
      case 4:
        return { x: 2, y: 2 };
      case 5:
        return { x: 3, y: 2 };
      case 6:
        return { x: 1, y: 3 };
      case 7:
        return { x: 2, y: 3 };
      case 8:
        return { x: 3, y: 3 };
      default:
        return { x: 0, y: 0 }; // Handle other cases if needed
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
      case "left":
        if (currentIndex !== 0 && currentIndex !== 3 && currentIndex !== 6) {
          setCurrentIndex(currentIndex - 1);
          setSteps(steps + 1);
          setMessage("");
        } else {
          setMessage("You can't go left");
        }
        break;
      case "up":
        if (currentIndex !== 0 && currentIndex !== 1 && currentIndex !== 2) {
          setCurrentIndex(currentIndex - 3);
          setSteps(steps + 1);
          setMessage("");
        } else {
          setMessage("You can't go up");
        }
        break;
      case "right":
        if (currentIndex !== 2 && currentIndex !== 5 && currentIndex !== 8) {
          setCurrentIndex(currentIndex + 1);
          setSteps(steps + 1);
          setMessage("");
        } else {
          setMessage("You can't go right");
        }
        break;
      case "down":
        if (currentIndex !== 6 && currentIndex !== 7 && currentIndex !== 8) {
          setCurrentIndex(currentIndex + 3);
          setSteps(steps + 1);
          setMessage("");
        } else {
          setMessage("You can't go down");
        }
        break;
    }
  }


  function onSubmit(evt) {
    evt.preventDefault();
    const data = {
      email: email,
      steps: steps,
      x: getXY().x,
      y: getXY().y,
    };
  
    axios.post('http://localhost:9000/api/result', data)
      .then(({ data }) => {
        console.log(data); // Log the response data to the console
        setMessage(data.message);
        setEmail(initialEmail);
        // Reset coordinates and steps after successful submission
      })
      .catch((error) => {
        console.error('Error:', error);
        setMessage(error.response.data.message);
        setEmail(initialEmail);
      });
  }
  
  
  

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">
          You moved {steps} {steps === 1 ? "time" : "times"}
        </h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div
            key={idx}
            className={`square${idx === currentIndex ? " active" : ""}`}
          >
            {idx === currentIndex ? "B" : null}
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
      <form>
  <input
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    id="email"
    type="email"
    placeholder="type email"
  />
  <button type="button" onClick={onSubmit} id="submit">
    Submit
  </button>
</form>
    </div>
  );
}
