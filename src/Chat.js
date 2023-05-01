import { useEffect, useRef, useState } from "react"

  
export const Chat = ({current ,updater}) => {
    // set initial state
    const [chatList, setChatList] = useState([]);
    const [textValue, setTextValue] = useState("");

    useEffect(() => {
        setChatList(current)
    }, [current]);
   
    const handleInputText = (e) => {
        setTextValue(e.target.value);
    }

    const handleChatInput = (e) => {
        e.preventDefault();

        // insert user chat
        const newChat = {id:chatList.length + 1, text:textValue, user:true};
        updater(newChat, current.index);

        // insert bot response
        const botResponseChat = {id:chatList.length + 1, text:"response " + (Math.ceil(chatList.length/2)), user:false};
        updater(botResponseChat);
        // setChatList([...chatList, newChat, botResponseChat]);
        
        setTextValue("");
    }

    return (
      <>
      <div className="chatBubbles">
            {chatList.map((chat) => (
                <div key={chat.id} className={`chatfrom ${chat.user ? "user" : "bot"}`}>
                    <p>{chat.text}</p>
                </div>
            ))}
      </div>
      <form className="chatInput" onSubmit={handleChatInput}>
        <label>
          <textarea 
            name="chatInput"
            placeholder="Say something..."
            value={textValue}
            onChange={handleInputText}
          />
        </label>
        <button type="submit">send</button>
      </form>
      </>
    );
}
