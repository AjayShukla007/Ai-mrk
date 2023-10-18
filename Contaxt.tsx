import React, { createContext, useContext, useState } from 'react';

const Value = createContext<any>(undefined);

const MyProvider: React.FC<{children:React.ReactNode}> = ({children}) => {
    const [value, setValue] = useState<string>("**Hello world!!!**");
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
      const [anime, setAnime] = useState<boolean>(true);
      const [alertBox, setAlertBox] = useState<boolean>(false);
    const closeChat = ()=>{
      console.log("it is in tge context component");
    }
  return (
    <Value.Provider value={{value, setValue, closeChat, isLogin,setIsLogin, isOpen, setIsOpen, anime, setAnime, alertBox, setAlertBox}}>
    {children}
    </Value.Provider>
    )
}

const useValue = () => {
  return useContext(Value);
}
interface usingValue{
    value: string;
    setValue: (value:string)=>void;
    
    isLogin: boolean;
    setIsLogin: (value:boolean)=>void;
    
    isOpen:boolean;
    setIsOpen: (value:boolean)=>void;
    
    anime: boolean;
    setAnime: (value:boolean)=>void;
    
    alertBox:boolean;
    setAlertBox: (value:boolean)=>void;
    
    closeChat:any
  }

export type {usingValue}
export {MyProvider, useValue}