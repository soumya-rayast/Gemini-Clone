import React, { useContext } from 'react'
import "./Main.css"
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input,setRecentPrompt } = useContext(Context);
  const  handleSend = () =>{
    setRecentPrompt(input);
    onSent(input);
  }
  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className="main-container">
        {!showResult ?
          <>
            <div className="greet">
              <p><span>Hello, Dev.</span></p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggests some best movies to watch</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Suggests some best place to visit in India</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Suggests some best foods to eat in Varanasi</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Suggests some best foods to eat in Goa</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </> : <div className='result'>
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? <div className="loader">
                <hr />
                <hr />
                <hr />
              </div> :
               <p dangerouslySetInnerHTML={{ __html: resultData }}></p>}
            </div>
          </div>
        }

        <div className="main-bottom">
          <div className="search-box">
            <input type="text" 
            placeholder='Enter a prompt here' 
            value={input}
            onChange={(e) => setInput(e.target.value)}
             />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img onClick={handleSend} src={assets.send_icon} alt="" />
            </div>
          </div>
          <p className='bottom-info'>
            Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps.
          </p>
        </div>
      </div>
    </div>
  )
}
export default Main
