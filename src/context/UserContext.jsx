import React, { createContext } from 'react';
import main from '../gemini';
export const datacontext=createContext();

function UserContext({children}) {
  let [speaking,setSpeaking]=React.useState(false);
  let [prompt,setPrompt]=React.useState("Jane listening...");
  let [response,setResponse]=React.useState(false);

    function speak(text){
        let utterance=new SpeechSynthesisUtterance(text);
        utterance.lang='te-IN';
        utterance.pitch=1;
        utterance.rate=1;
        utterance.volume=1;
        window.speechSynthesis.speak(utterance);  
    }
  async  function aiResponse(prompt){
    let text = await main(prompt);
    let newText = text
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/Google/gi, 'Nagamanikanta Nallaganchu') 
        .trim();

    setPrompt(newText);
    speak(newText);
    setResponse(true);
    setTimeout(() => {
    setSpeaking(false);
    }, 5000);
   
    }
  

    let speechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition=new speechRecognition();
    recognition.onresult=(e=>{
        let currentIndex=e.resultIndex;
        let transcript=e.results[currentIndex][0].transcript;
        setPrompt(transcript);
        takeCommand(transcript.toLowerCase());
    })

    function takeCommand(command){
      if(command.includes("open") && command.includes("google")){
        window.open("https://www.google.com","_blank");
        speak("Opening Google");
        setResponse(true);
        setPrompt("Opening Google");
        setTimeout(() => {
          setSpeaking(false);
        }, 5000);
      }else if(command.includes("open") && command.includes("youtube")){
        window.open("https://www.youtube.com","_blank");
        speak("Opening YouTube");
        setResponse(true);
        setPrompt("Opening YouTube");
        setTimeout(() => {
          setSpeaking(false);
        }, 5000);
      }else if(command.includes("What is your name") || command.includes("who are you")){
        speak("I am Jane, Your Advanced AI Virtual Assistant");
        setResponse(true);
        setPrompt("I am Jane, Your Advanced AI Virtual Assistant");
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
      }
      else if(command.includes("open") && command.includes("github")){
        window.open("https://www.github.com","_blank");
        speak("Opening GitHub");
        setResponse(true);
        setPrompt("Opening GitHub");
        setTimeout(() => {
          setSpeaking(false);
        }, 5000);
      }else if(command.includes("open") && command.includes("gmail")){
        window.open("https://www.gmail.com","_blank");
        speak("Opening Gmail");
        setResponse(true);
        setPrompt("Opening Gmail");
        setTimeout(() => {
          setSpeaking(false);
        }, 5000);
      }else if(command.includes("open") && command.includes("linkedin")){
        window.open("https://www.linkedin.com","_blank");
        speak("Opening LinkedIn");
        setResponse(true);
        setPrompt("Opening LinkedIn");
        setTimeout(() => {
          setSpeaking(false);
        }, 5000);
      }else if(command.includes("open") && command.includes("x")){
        window.open("https://www.x.com","_blank");
        speak("Opening X Twitter");
        setResponse(true);
        setPrompt("Opening X Twitter");
        setTimeout(() => {
          setSpeaking(false);
        }, 5000);
      }else if(command.includes("open") && command.includes("instagram")){
        window.open("https://www.instagram.com","_blank");
        speak("Opening Instagram");
        setResponse(true);
        setPrompt("Opening Instagram");
        setTimeout(() => {
          setSpeaking(false);
        }, 5000);
      }else if(command.includes("time")){
        let time=new Date().toLocaleTimeString(undefined,
          {hour:'2-digit',minute:'2-digit'});
        speak(time);
        setResponse(true);
        setPrompt("The time is "+time);
      }else if(command.includes("date")){
        let date=new Date().toLocaleDateString();
        speak(date);
        setResponse(true);
        setPrompt("Today's date is "+date);
      }else{
        aiResponse(command);
      }
    }

    let value ={ recognition,
      speaking,
      setSpeaking,
      prompt,
      setPrompt,
      response,
      setResponse
    };
   
  return (
    <div>
        <datacontext.Provider value={value}>
        {children}
        </datacontext.Provider>
        
    </div>
  )
}

export default UserContext