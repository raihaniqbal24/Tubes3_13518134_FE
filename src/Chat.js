import { useEffect, useRef, useState } from "react"
import useApi from "./useApi";
import {addUpdateQuestionService, askQuestionService, deleteQuestionService} from './chadgpt.service';
import './Chat.css'
  
export const Chat = ({current ,updater}) => {
    // set initial state
    const chatBubblesRef = useRef(null);
    const [chatList, setChatList] = useState([]);
    const [textValue, setTextValue] = useState("");
    const [algoChoice, setAlgoChoice] = useState("kmp");
    const [answer, setAnswer] = useState(null);
    console.log(algoChoice);

    const addUpdateQuestion = useApi(addUpdateQuestionService);
    const askQuestion = useApi(askQuestionService);
    const deleteQuestion = useApi(deleteQuestionService);

    const getAnswer = (qst) => {
      askQuestion.request(qst, algoChoice);
    }

    useEffect(() => {
      if (askQuestion.data) {
        setAnswer(askQuestion.data.answer);
        console.log(askQuestion.data);
      }
    }, [askQuestion.data])

    useEffect(() => {
        setChatList(current)
    }, [current]);

    useEffect(() => {
        const chatbub = chatBubblesRef.current;
        const scroll = chatbub.scrollHeight;

        console.log("masuk scroll");
        console.log(scroll);

        chatBubblesRef.current.scrollTo(0, scroll);
    });

    const handleAlgoChange = (e) => {
      setAlgoChoice(e.target.value);
    }
   
    const handleInputText = (e) => {
        setTextValue(e.target.value);
    }

    const handleChatInput = (e) => {
        e.preventDefault();

        // insert user chat
        const newChat = {id:chatList.length + 1, text:textValue, user:true};
        updater(newChat, current.index);

        getAnswer(textValue);

        // insert bot response
        const botResponseChat = {id:chatList.length + 1, text: answer, user:false};
        updater(botResponseChat);
        // setChatList([...chatList, newChat, botResponseChat]);
        
        setTextValue("");
    }

    return (
      <>
      <div className="chatBubbles" ref={chatBubblesRef}>
            {chatList.map((chat) => (
                <div key={chat.id} className={`chatfrom${chat.user ? "user" : "bot"}`}>
                    <p>{chat.text}</p>
                </div>
            ))}
      </div>
      <form className="chatInput" onSubmit={handleChatInput}>
      <div className="algochoice">
        <input
          type="radio"
          name="algo"
          id="algokmp"
          value="kmp"
          onChange={handleAlgoChange}
          defaultChecked
          />KMP
        <input
          type="radio"
          name="algo"
          id="algobm"
          value="bm"
          onChange={handleAlgoChange}/>BM
        </div>
        <label>
          <textarea 
            name="chatInput"
            placeholder="Say something..."
            value={textValue}
            onChange={handleInputText}
          />
        </label>
        <button className="send-button" type="submit">send</button>
      </form>
      </>
    );
}
