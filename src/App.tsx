import { useContext, useRef, useState, useEffect } from "react";
import { ICommand, EditorContext } from "@uiw/react-md-editor";

let MDEditor: any;
let commands: any;

import { useValue, usingValue } from "../Contaxt";
import axios from "axios";

import { LazyMotion, domAnimation, m } from "framer-motion";

import ChatInterface from "./Ai/ChatInterface";
import PreLoad from "./component/PreLoad";
import "./App.css";
const getNotesUrl = import.meta.env.VITE_API_GET_NOTES;
const addNotesUrl = import.meta.env.VITE_API_ADD_NOTES;

import Login from "./auth/Login";
// import SingUp from "./auth/SingIn";//debug
import AlertBox from "./auth/AlertBox";

const Button = () => {
  const btnStyle = {
    color: "white",
    transform: "scalzeX(1.5)",
    margin: "0 10px",
    transition: "0.2s ease all"
  };
  const { preview, dispatch } = useContext(EditorContext);
  const click = () => {
    dispatch!({
      preview: preview === "edit" ? "preview" : "edit"
    });
  };
  if (preview === "edit") {
    return (
      <svg
        width="12"
        height="12"
        viewBox="0 0 520 520"
        onClick={click}
        style={btnStyle}
      >
        <polygon
          fill="currentColor"
          points="0 71.293 0 122 319 122 319 397 0 397 0 449.707 372 449.413 372 71.293"
        />
        <polygon
          fill="currentColor"
          points="429 71.293 520 71.293 520 122 481 123 481 396 520 396 520 449.707 429 449.413"
        />
      </svg>
    );
  }
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 520 520"
      onClick={click}
      style={{
        color: "#006bdf",
        transform: "scalzeX(1.5)",
        margin: "0 10px",
        transition: "0.2s ease all"
      }}
    >
      <polygon
        fill="currentColor"
        points="0 71.293 0 122 38.023 123 38.023 398 0 397 0 449.707 91.023 450.413 91.023 72.293"
      />
      <polygon
        fill="currentColor"
        points="148.023 72.293 520 71.293 520 122 200.023 124 200.023 397 520 396 520 449.707 148.023 450.413"
      />
    </svg>
  );
};
const codePreview: ICommand = {
  name: "preview",
  keyCommand: "preview",
  value: "preview",
  icon: <Button />
};

const Disable = () => {
  const { preview } = useContext(EditorContext);
  return (
    <button disabled={preview === "preview"}>
      <svg viewBox="0 0 16 16" width="12px" height="12px">
        <path
          d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8Zm.9 13H7v-1.8h1.9V13Zm-.1-3.6v.5H7.1v-.6c.2-2.1 2-1.9 1.9-3.2.1-.7-.3-1.1-1-1.1-.8 0-1.2.7-1.2 1.6H5c0-1.7 1.2-3 2.9-3 2.3 0 3 1.4 3 2.3.1 2.3-1.9 2-2.1 3.5Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
};
const customButton = {
  name: "disable",
  keyCommand: "disable",
  value: "disable",
  icon: <Disable />
};

function App() {
  const [pc, setPc] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  // console.log(getNotesUrl);
  const { value, setValue, setAlertBox } = useValue() as usingValue;
  let { closeChat } = useValue() as usingValue;
  const [validateMessage, setValidateMessage] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertC, setAlertC] = useState<string>("");
  const [alertBg, setAlertBg] = useState<string>("");
  const [alertBo, setAlertBo] = useState<string>("");
  // closeChatA();
  const [opened, setOpened] = useState<boolean>();
  const variants = {
    open: {
      scale: [1, 1.25, 2.5, 5, 10],
      rotate: [0, 0, 270, 270, 0],
      borderRadius: ["100%", "100%", "50%", "50%", "20%"],
      boxShadow: [
        "0 0 0 0 transparent  ",
        "0 0 0 10px white",
        "0 0 0 20px white",
        "0 0 0 30px white",
        "0 0 0 50px white"
      ]
    },
    closed: {
      scale: [10, 5, 2.5, 1.25, 1],
      rotate: [0, 270, 270, 0, 0],
      borderRadius: ["20%", "50%", "50%", "100%", "100%"],
      boxShadow: [
        "0 0 0 50px white",
        "0 0 0 30px white",
        "0 0 0 20px white",
        "0 0 0 10px white",
        "0 0 0 0 transparent"
      ]
    }
  };
  const variants2 = {
    open: {
      scale: [1, 0.8, 0.5, 0.2, 0],
      rotate: [0, 0, -270, -270, 0],
      webkitTextFillColor: ["transparent", "transparent", "white"],
      background: "white"
    },
    closed: {
      scale: [0, 0.2, 0.5, 0.8, 1],
      rotate: [0, -270, -270, 0, 0],
      background: "-webkit-linear-gradient(-45deg, #00ddf3, #ff22e3, #ff2222)",
      webkitTextFillColor: ["white", "transparent", "transparent"],
      webkitBackgroundClip: "text",
      transition: {
        delay: 1.5,
        ease: "linear",
        duration: 2
      }
    }
  };
  const variants3 = {
    open: {
      scale: [1, 1.25, 2.5, 5, 10],
      rotate: [0, 0, -270, -270, 0],
      borderRadius: ["100%", "100%", "50%", "50%", "20%"],
      background: ["transparent", "white"],
      boxShadow: [
        "0 0 0 0 transparent  ",
        "0 0 0 10px white",
        "0 0 0 20px white",
        "0 0 0 30px white",
        "0 0 0 50px white"
      ]
    },
    closed: {
      scale: [10, 5, 2.5, 1.25, 1],
      rotate: [0, -270, -270, 0, 0],
      background: ["transparent"],
      borderRadius: ["20%", "50%", "50%", "100%", "100%"],
      boxShadow: [
        "0 0 0 50px white, 0 0 0 50px white inset",
        "0 0 0 30px white, 0 0 0 30px white inset",
        "0 0 0 20px white, 0 0 0 20px white inset",
        "0 0 0 10px white, 0 0 0 10px white inset",
        "0 0 0 0 transparent, 0 0 0 0 transparent inset"
      ],
      transition: {
        ease: "linear",
        duration: 2
      }
    }
  };

  const [credentials, setCredentials] = useState({
    title: `done+${Math.round(Math.random() * 100)}`,
    note: value
  });
  const [saveText, setSaveText] = useState("");

  const handleSave = async () => {
    if (value.length < 1) {
      setShowAlert(true);
      setAlertBox(true);
      setValidateMessage("Write something");
      setAlertC("red");
      setAlertBg("red");
      setAlertBo("red");
      setTimeout(() => {
        setAlertBox(false);
        setShowAlert(false);
      }, 2000);
      alert("type something");
      return;
    }
    const token = await localStorage.getItem("authToken");
    if (token) {
      // console.log(token);//debug
      try {
        const headers = {
          authToken: `${token}`
        };

        const response = await axios.post(
          addNotesUrl,
          credentials,
          { headers }
        );
        console.log(!response?"failed":"passed");

        const getData = await axios.get(
          getNotesUrl,
          {
            headers
          }
        );
        console.log(getData.data);
        setSave("saved");
      } catch (error: any) {
        console.log(error);
        alert(error.data);
      }
    }
  };
  const handleInp1 = (e:any) => {
    setSaveText(e.target.value);
    // console.log(saveText);
    setCredentials({
      title: `done+${Math.round(Math.random() * 1000)}`,
      note: saveText
    });
  };
  const chatRef = useRef<HTMLDivElement>(null);
  const fullScreenRef = useRef<HTMLDivElement>(null);
  closeChat = () => {
    if (pc) {
      if (!opened) {
        setisOpen(true);
        setTimeout(() => {
          chatRef.current!.style.display = "block";
          // console.log("open");
        }, 1000);
        setOpened(true);
      } else {
        chatRef.current!.style.display = "none";
        // console.log("closed");
        setisOpen(false);
        setOpened(false);
      }
    } else {
      if (!opened) {
        setisOpen(true);
        setTimeout(() => {
          chatRef.current!.style.display = "block";
          // console.log("open");
        }, 1000);
        setOpened(true);
      } else {
        chatRef.current!.style.display = "none";
        // console.log("closed");
        setisOpen(false);
        setOpened(false);
      }
    }
  };
  const [log, setLog] = useState<boolean>();
  const [save, setSave] = useState<string>("save");
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    import("@uiw/react-md-editor").then(module => {
      MDEditor = module.default;
      commands = module.commands;
      setEditorLoaded(true);
    });

    const windowLoad = () => {
      setTimeout(() => {
        fullScreenRef.current!.style.backgroundColor = "transparent";
      }, 1000);
      const currentWindowWidth = window.innerWidth;
      if (currentWindowWidth > 400) {
        // console.log("big window");
        setPc(true);
      } else {
        // console.log("small window");
        setPc(false);
      }
    };
    const isNew = () => {
      const getTok: any = localStorage.getItem("authToken");
      if (getTok) {
        setLog(true);
      } else {
        setLog(false);
      }
    };
    isNew();
    windowLoad();

    window.addEventListener("resize", windowLoad);
    window.addEventListener("load", windowLoad);
    return () => {
      window.removeEventListener("resize", windowLoad);
      window.removeEventListener("load", windowLoad);
    };
  }, []);
  if (!editorLoaded)
    return (
      <>
        <PreLoad />
      </>
    );
  return (
    <div className="container">
      <LazyMotion features={domAnimation}>
        <m.div
          animate={isOpen ? "open" : "closed"}
          variants={variants3}
          layout
          onClick={() => {
            // setisOpen(isOpen => !isOpen);
            // setOpened(true);
            closeChat();
          }}
          ref={fullScreenRef}
          className="fullScreen"
        ></m.div>
        <div className="title">
          AI-mrk {log && <span onClick={handleSave}>{save}</span>}
        </div>
        <div className="editor">
          <MDEditor
            value={value}
            preview="edit"
            extraCommands={[codePreview, customButton, commands?.fullscreen]}
            onChange={(val: string) => {
              setValue(val!);
              // console.log(value);
            }}
            onInput={handleInp1}
            style={{}}
          />
        </div>
        <div className="preview">
          <MDEditor.Markdown
            source={value}
            style={{
              height: "50vh"
            }}
          />
        </div>
        {showAlert && (
          <AlertBox
            message={validateMessage}
            color={alertC}
            btnBg={alertBg}
            border={alertBo}
          />
        )}
        {opened && (
          <div ref={chatRef} style={{ display: "none" }}>
            <button className="aibtn" onClick={closeChat}>
              Editor
            </button>
            <ChatInterface />
          </div>
        )}
        {!pc ? (
          <m.div
            className="ai"
            animate={isOpen ? "open" : "closed"}
            variants={variants}
            drag
            dragConstraints={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
            layout
            onClick={() => {
              // setisOpen(isOpen => !isOpen);
              // setOpened(true);
              closeChat();
            }}
          >
            <m.span
              className="ais"
              animate={isOpen ? "open" : "closed"}
              variants={variants2}
            >
              Ai
            </m.span>
          </m.div>
        ) : (
          <span className="ai" onClick={() => closeChat()}>
            Ai
          </span>
        )}
        <Login />
      </LazyMotion>
    </div>
  );
}

export default App;