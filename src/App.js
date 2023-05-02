import { useEffect, useState } from "react";
import {Chat} from './Chat.js';
import './App.css'


const App = () => {
  const [history, setHistory] = useState([
  [
    {id:1, text:"I'm the bot", user:false}
  ],
  [
    {id:1, text:"this is history", user:false},
    {id:2, text:"how can i help you?", user:false}
  ]]);

  const [sidebarComp, setSidebarComp] = useState([
    {index:0, text:"history 1"},
    {index:1, text:"history 2"}
  ]);

  // TODO Here: fetch history from server api.
  // TODO Here: Create the side bar component list.

  const [current, setCurrent] = useState({chatList:history[0], index:0});

  const updateHistory = (chat) => {
    const newHistoryList = [...history];
    const newHistory = newHistoryList[current.index];

    newHistory.push(chat);

    setHistory(newHistoryList)
  }

  const handleNewChat = () => {
    const newHistory = [{id:1, text:"Hi, im the new bot", user:false}];
    const newSidebarComp = {index: sidebarComp.length, text:"New Chat"};

    setHistory([...history, newHistory]);
    setSidebarComp([...sidebarComp, newSidebarComp]);
  }

  const Sidebar = () => {
    return(
      <div className="sidebar">
        <ul className="sidebar-container">
          {sidebarComp.map((component) => (
            <li 
            className="sidebar-comp"
            key={component.index} 
            onClick={() => setCurrent({chatList:history[component.index], index:component.index})}
            >{component.text}</li>
          ))}
          </ul>
          <button type="button" onClick={handleNewChat}>new chat</button>
      </div>
    )
  }
  
  

  return (
    <div className="App">
      <div className="header">
        <h1>chadGPT</h1>
      </div>
      <Sidebar />
      <div className="content">
      
      <Chat current={current.chatList} updater={updateHistory}/>
      { console.log("this is history")}
      { console.log(history)}
      </div>
    </div>
  );
}

export default App;
