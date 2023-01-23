import { useState } from 'react'
import {Configuration, OpenAIApi} from 'openai'
import ClipLoader from "react-spinners/SyncLoader";
import './App.css'
function App() {
  const [text, setText] = useState("");
  const [resultText, setResultText] = useState("");
  const [loading, setLoading] = useState(false)
  let decriptApiKey = import.meta.env.VITE_OPEN_AI_KEY_PAID
  decriptApiKey = decriptApiKey.split("%").join("")
  const override = {
    display: "block",
    top: "50%",
    left: "50%",
    position: "absolute",
    margin: "0 auto",
    opacity: "1",

  };
  const configuration = new Configuration({
    // apiKey: import.meta.env.VITE_OPEN_AI_KEY_UNPAID
    apiKey: decriptApiKey
  })
  const openai = new OpenAIApi(configuration);
  const generatedText = async() => {
    setResultText("")
    if(text.length < 2){
      alert("Enter Valid Text")
      return
    }
    setLoading(true)
    try {
      const response = await openai.createComletion({
        model: 'text-davinci-003',
        prompt: text,
        temperature: 0,
        max_tokens: 64,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      })
      setResultText(response.data.choices[0].text)
      setLoading(false)
    } catch (error) {
      alert("Servers are Busy.\nWait sometime or contact Neerav 😅\nSorry for Inconvenience.")
      setLoading(false)
    }
  }
  const changeState = (event) => {
    setText(event.target.value);
  }
  return (
    <div className="App" style={loading?{opacity: 0.2}:{opacity: 1}}>
        <div className='flex-box'>
          <div className='app-name'>
            <p>Ask Me Anything</p>
          </div>
          <div className='text-area'>
            <textarea onChange={(event)=>changeState(event)} value={text}/> 
          </div>
          <div className="submit-button">
            <button onClick={()=>generatedText()}>Send</button>
          </div>
          <div className="result-area">
            <div className='result-text'>
              <p>{resultText}</p>
            </div>
          </div>
          <ClipLoader size={10} loading={loading} cssOverride={override} color="white"/>
        </div>
    </div>
  )
}

export default App
