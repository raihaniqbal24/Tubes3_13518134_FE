import { useEffect, useRef, useState } from "react"

  
export const ChatInput = () => {
    // set initial state
    const [chatList, setChatList] = useState([
        {id:1, text:"I'm the bot", user:false}
    ]);
    const [textValue, setTextValue] = useState("");
   
    const handleInputText = (e) => {
        setTextValue(e.target.value);
    }

    const handleChatInput = (e) => {
        e.preventDefault();

        // insert user chat
        const newChat = {id:chatList.length + 1, text:textValue, user:true};

        // insert bot response
        const botResponseChat = {id:chatList.length + 1, text:"response " + (Math.ceil(chatList.length/2)), user:false};
        setChatList([...chatList, newChat, botResponseChat]);
        
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

// export const ChatOutput = () => {
//     return(
//         <div>
//             <ul>
//             {botChat.slice(0).reverse().map((botChat) => ( // reverse the order of the array
//             <li key={todo.id}>{todo.text}</li>
//             ))}
//         </ul>
//       </div>
//     )
// }