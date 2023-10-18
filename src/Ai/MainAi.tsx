import { useState } from "react";

function Ai() {
  const commonWords = ["","apple", "banana", "cherry", "date", "elderberry"];

  const [value, setValue] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any>([]);
  const [key, setKey] = useState('no key');

  const handleInputChange = (event:any) => {
    const value = event.target.value;
    setText(value);
    setValue(value);
    // cursor(event.target.selectionStart)
    if (value.length > 1) {
      const filteredSuggestions = commonWords.filter((word) =>
        word
          .toLowerCase()
          .startsWith(value.toLowerCase().split(" ").slice(-1).pop())
      );
      setSuggestions(filteredSuggestions[0]);
      const words:any = value.split(' ');
    words[words.length - 1] = filteredSuggestions[0];
    const newValue:any = words.join(' ');
    if(key !== '32'){
    setText(newValue)
    }
    } else {
      setSuggestions("");
      setText("");
    }
  };

const handleEnterPress = () => {
  if (suggestions.length > 0) {
    const words = value.split(' ');
    words[words.length - 1] = suggestions; 
    const newValue = words.join(' ');
    setValue(newValue);
    setText(newValue);
    setSuggestions("");
  }
};

  return (
    <>
      <div className="reply"></div>
      <div className="promt">
        <input
          type="text"
          name=""
          id=""
          value={value}
          onChange={handleInputChange}
          onClick={handleEnterPress}
          placeholder={text}
          onKeyDown={(e:any)=>setKey(e.keyCode)}
        />
        {suggestions?<div style={{
          position:'fixed',
          top:'50px',
          color:'red'
        }}>{text}</div>
        :""}
        <input
          type="text"
          name=""
          id=""
          onChange={() => {}}
          value={text}
        />
      </div>
    </>
  );
}

export default Ai;
