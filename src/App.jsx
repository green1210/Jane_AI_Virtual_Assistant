import React, { use, useContext } from 'react'
import './App.css'
import va from './assets/ai.png'
import { FaMicrophone } from "react-icons/fa";
import { datacontext } from './context/UserContext';
import speakimg from './assets/speak.gif';
import aigif  from './assets/aivoice.gif';
import vi from './assets/jane.png';

function App() {
let {recognition,speaking,setSpeaking,prompt,response,setPrompt,setResponse}=useContext(datacontext)

  return (
    <div className="main">
      <img src={vi} alt="Virtual Assistant" id='jane'/>
      <span>I'm Jane, your advanced AI virtual assistant</span>
      {!speaking? 
       <button onClick={()=>{ 
        setPrompt("Jane listening..."); 
        setSpeaking(true);  
        setResponse(false);
        recognition.start() }} > <FaMicrophone /><br /> Talk to Jane </button>
      : <div className='response'>
        {!response? <img src={speakimg} alt="speaking" id='speak'/> :
        <img src={aigif} alt="speaking" id='aigif'/>}
        <p>{prompt}</p>
      </div>
      }

      
    </div>
  )
}

export default App