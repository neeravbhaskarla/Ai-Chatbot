import { useState } from 'react'
import {Configuration, OpenAIApi} from 'openai'
import './App.css'
function App() {
  const [text, setText] = useState("");
  const [resultText, setResultText] = useState("");
  const configuration = new Configuration({
    // apiKey: import.meta.env.VITE_OPEN_AI_KEY_UNPAID
    apiKey: import.meta.env.VITE_OPEN_AI_KEY_PAID
  })
  const openai = new OpenAIApi(configuration);
  const generatedText = async() => {
    if(text.length < 2){
      alert("Enter Valid Text")
      return
    }
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: text,
      temperature: 0,
      max_tokens: 64,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    })
    setResultText(response.data.choices[0].text)
  }
  const changeState = (event) => {
    setText(event.target.value);
  }
  return (
    <div className="App">
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
        <div className='result-text'>
          <p>{resultText}</p>
        </div>
      </div>
    </div>
  )
}

export default App
