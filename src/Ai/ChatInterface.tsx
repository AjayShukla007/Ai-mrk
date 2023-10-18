import { useState, useRef } from "react";
import "../styles/chatInterface.css";
import Chats from "./Chats";
// import { useValue, usingValue } from "../../Contaxt";//debug
import { commonWords } from "../modules/commonWords";

const ChatInterface = () => {
  const [text, setText] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any>([]);
  const [key, setKey] = useState<any>("no key");
  const childCompRef = useRef<any>();

  const [promt, setPromt] = useState<string>("");
  const handleInputChange = (event: any) => {
    const value = event.target.value;
    setText(value);
    setPromt(value);
    if (value.length > 1) {
      const lastWord = value.split(" ").slice(-1).pop();
      let filteredSuggestions = commonWords.filter(word =>
        word.startsWith(lastWord)
      );
      if (lastWord.length > 3 && lastWord != filteredSuggestions) {
        commonWords.push(lastWord);
        filteredSuggestions = commonWords.filter(word =>
          word.startsWith(lastWord)
        );
      }
      setSuggestions(filteredSuggestions[0]);
      // setText(filteredSuggestions[0/]);//debug
      const words = value.split(" ");
      words[words.length - 1] = filteredSuggestions[0];
      const newValue = words.join(" ");
      if (key !== 32) {
        setText(newValue);
      }
      // console.log(key);//debug
    } else {
      setSuggestions("");
      setText("");
    }
  };

  const handleEnterPress = () => {
    if (suggestions && suggestions.length > 0) {
      const words = promt.split(" ");
      words[words.length - 1] = suggestions;
      const newValue = words.join(" ");
      setPromt(newValue);
      setText(newValue);
      setSuggestions("");
    }
  };

  return (
    <div className="chatInterface">
      <Chats ref={childCompRef} inputText={promt} />
      <div className="chat">
        <div className="inputContainer">
          <input
            type="text"
            name=""
            id=""
            value={promt}
            onChange={handleInputChange}
            onClick={handleEnterPress}
            placeholder={text}
            onKeyDown={(e: any) => setKey(e.keyCode)}
          />
          <input
            type="text"
            name=""
            id=""
            onChange={() => {}}
            value={text}
            className="subInput"
            disabled
          />
        </div>
        <button
          onClick={() => {
            if (promt.length > 2) {
              childCompRef
                ? childCompRef.current!.sendMessage(promt)
                : console.log(childCompRef);
              setPromt("");
              setText("");
            }
          }}
        >
          Send
        </button>
        <div className="readFS">
          <input
            type="file"
            name=""
            id=""
            value=""
            placeholder="plus"
            onChange={(e: any) =>
              childCompRef
                ? childCompRef.current!.sendMessage(e)
                : console.log(childCompRef)
            }
          />
          <div className="addFile">+</div>
        </div>
        <div className="warningOnChat">
          <span>*</span> Closing chat box will delete all the chats also
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;