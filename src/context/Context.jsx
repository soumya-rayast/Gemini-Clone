import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  // for delay function 
  const delayPara = (index, nextWord) => {
    setTimeout(function (){
      setResultData(prev=>prev+nextWord);
    },75*index)
  }
  const newChat = () =>{
    setLoading(false);
    setShowResult(false);
  }
  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if(prompt !== undefined){
      response = await run(prompt);
      setRecentPrompt(prompt);
    }
    else{
      setPrevPrompt(prev=>[...prev,input]);
      setRecentPrompt(input);
      response = await run(input)
    }

    setRecentPrompt(input);
    setPrevPrompt(prev=>[...prev,input])

    let responseArray = response.split("**");
    let newAResponse="";

    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newAResponse += responseArray[i];
      }
      else {
        newAResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    let newResponse2 = newAResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");
    for(let i= 0 ;i<newResponseArray.length;i++)
      {
        const nextWord = newResponseArray[i];
        delayPara(i,nextWord+" ");
      }
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };
  return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};

export default ContextProvider;
