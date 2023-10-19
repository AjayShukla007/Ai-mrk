import { useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useValue, usingValue } from "../../Contaxt";
import Typewriter from "typewriter-effect";

import "../styles/log&singup.css";
import SingUp from "./SingIn";
const getNotesUrl = import.meta.env.VITE_API_GET_NOTES;
const delNotesUrl = import.meta.env.VITE_API_DELETE_NOTES;
const logInUserUrl = import.meta.env.VITE_API_LOG;
const getUserUrl = import.meta.env.VITE_API_GET_USER;

const Login = () => {
  const [credentials, setCredentials] = useState({
    userName: "",
    password: ""
  });
  const { setValue, isOpen, setIsOpen, setIsLogin, anime, setAnime } =
    useValue() as usingValue;
  const [saved, setSaved] = useState([]);
  const [status, setStatus] = useState<any>("");
  const [click, setClick] = useState<boolean>(false);
  const [newOr, setNewOr] = useState<any>("New User?");
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const logBoxBtn1 = useRef<HTMLButtonElement>(null);

  const handleChange = (e: any) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setClick(true);
      setTimeout(()=>{
       setClick(false) 
      },2000);
      
    try {
      const response = await axios.post(
        logInUserUrl,
        credentials
      );
      const { token, refreshToken } = response.data;
      console.log(response.data);
      const headers = {
        authToken: ` ${response.data.authToken}`
      };

      localStorage.setItem("authToken", response.data.authToken);

      const getUserData = await axios.get(
        getUserUrl,
        {
          headers
        }
      );
      console.log(getUserData.data);
      setNewOr(() => {
        return (
          <div className="loggedName">
            {getUserData.data.name}
            <div className="loggedEmain">{getUserData.data.email}</div>
          </div>
        );
      });
      const getData = await axios.get(
        getNotesUrl,
        {
          headers
        }
      );
      console.log(getData.data);
      setStatus(<span style={{ color: "green" }}>Login Success</span>);

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      setIsLogin(true);
      setSaved(getData.data);

      userNameRef.current!.style.display = "none";
      passwordRef.current!.style.display = "none";
      logBoxBtn1.current!.style.display = "none";
      singUpBtnRef.current!.style.display = "none";
      // Redirect or perform other actions upon successful login
    } catch (error) {
      console.log(error);
      setStatus(
        <span style={{ color: "red" }}>Error login, Please try again</span>
      );
      setClick(false);
      singUpBtnRef.current!.style.backgroundColor = "red";
      singUpBtnRef.current!.style.transform = "scale(1.2)";
    }
  };
  const variants = {
    open: {
      scaleX: [1.2, 1, 0.5, 1]
    },
    close: {
      scaleX: [1.2, 1, 0.5, 1]
    }
  };
  const variants2 = {
    open: {
      scaleX: [1.2, 1, 0, 1],
      translateX: ["-500%", "-200%", "-55%", "0%"],
      color: ["white", "white", "black"],
      opacity: [0, 0, 0, 0, 0, 1]
    },
    close: {
      scaleX: [1.2, 1, 0, 1],
      translateX: ["0%", "55%", "200%", "500%"],
      color: ["white", "white", "black"]
      // opacity:[1, 0 ,0 ,0, 0, 0]
    }
  };
  const aniWord = "Login";
  const variants5 = {
    anim0: {
      translateX: ["-100%", "-200%", "-100%", "0%"],
      translateY: ["-100%", "-200%", "-100%", "0%"]
    },
    anim1: {
      translateX: ["-80%", "-200%", "-80%", "0%"],
      translateY: ["-100%", "-200%", "-100%", "0%"]
    },
    anim2: {
      translateX: ["-60%", "-180%", "-60%", "0%"],
      translateY: ["-100%", "-200%", "-100%", "0%"]
    },
    anim3: {
      translateX: ["-0%", "-0%", "-0%", "0%"],
      translateY: ["-100%", "-200%", "-100%", "0%"]
    },
    anim4: {
      translateX: ["60%", "200%", "60%", "0%"],
      translateY: ["-100%", "-200%", "-100%", "0%"]
    },
    anim5: {
      translateX: ["80%", "220%", "80%", "0%"],
      translateY: ["-100%", "-200%", "-100%", "0%"]
    },
    anim6: {
      translateX: ["-220%", "-340%", "-220%", "0%"],
      translateY: ["-100%", "-200%", "-100%", "0%"]
    },
    anim7: {
      translateX: ["-240%", "-360%", "-240%", "0%"],
      translateY: ["-100%", "-200%", "-100%", "0%"]
    },
    anim8: {
      translateX: ["-260%", "-0%", "-140%", "0%"],
      translateY: ["-100%", "-200%", "-100%", "0%"]
    },
    anim9: {
      translateX: ["-100%", "-200%", "-100%", "0%"],
      translateY: ["-100%", "-200%", "-100%", "0%"]
    },
    anim10: {
      translateX: ["50%", "160%", "50%", "0%"],
      translateY: ["-100%", "-200%", "-100%", "0%"]
    },
    anim11: {
      translateX: ["-140%", "-260%", "-140%", "0%"],
      translateY: ["-100%", "-200%", "-100%", "0%"]
    },
    anim12: {
      translateX: ["-140%", "-260%", "-140%", "0%"],
      translateY: ["-100%", "-200%", "-100%", "0%"]
    },
    anim13: {
      translateX: ["140%", "-260%", "-140%", "0%"],
      translateY: ["100%", "-200%", "-100%", "0%"]
    }
  };
  const variants10 = {
    open: {
      translateX: "-200%",
      borderRadius: ["20%", "50%", "100%"]
    },
    close: {
      translateX: "0%",
      translateY: "0%",
      borderRadius: ["50%", "20%", "0%"]
    }
  };
  const loginText = ["L", "o", "g", "i", "n"];
  const menuBtn = useRef<HTMLDivElement>(null);
  const singUpBtnRef = useRef<HTMLButtonElement>(null);
  const delRef = useRef<HTMLSpanElement>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>();
  const handleButton = () => {
    menuBtn.current!.classList.toggle("open");
    if (menuBtn.current!.classList.contains("open")) {
      console.log("hahsgsj");
      setMenuOpen(true);
    } else {
      setMenuOpen(false);
    }
  };
  const toggleSingUp = () => {
    setAnime(true);
    if (anime) {
      setAnime(false);
    }
    setTimeout(() => {
      setIsOpen(false);
    }, 1000);
  };
  const refreshList = async () => {
    const token = await localStorage.getItem("authToken");
    if (token) {
      console.log(token);
      try {
        const headers = {
          authToken: `${token}`
        };
        const getData = await axios.get(
          getNotesUrl,
          {
            headers
          }
        );
        setSaved(getData.data);
        setStatus(<span style={{ color: "green" }}>Refreshed</span>);
        console.log(getData.data);
      } catch (error: any) {
        console.log(error);
        alert(error.data);
      }
    }
  };
  const delMark = async (e:any, targetId:any) => {
    e.stopPropagation();
    // let targetId = delRef.current!.id;
    console.log(targetId);
    if (targetId) {
      const token = await localStorage.getItem("authToken");
      if (token) {
        console.log(token);
        try {
          const headers = {
            authToken: `${token}`
          };
          const deleteMark = await axios.delete(
            `${delNotesUrl}${targetId}`,
            {
              headers
            }
          );
          if (deleteMark.status === 200) {
            setStatus(<span style={{ color: "green" }}>Deleting...</span>);
            refreshList();
          }
        } catch (err:any) {
          console.log(err.data);
        }
      }
    }
  };
  const formattedDate = (isoDate:any) => {
    const date = new Date(isoDate);
    const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    return formattedDate;
  };
  return (
    <>
      <div className="menu">
        <div ref={menuBtn} id="nav-icon2" onClick={handleButton}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <motion.div
        animate={!menuOpen ? "open" : "close"}
        variants={variants10}
        transition={{
          ease: "linear"
        }}
        className="login"
      >
        {isOpen ? (
          <>
            <motion.form
              className="loginform"
              onSubmit={handleSubmit}
              animate={!anime ? "open" : "close"}
              variants={variants2}
              layout
            >
              <motion.h1>
                {loginText.map((login, index) => (
                  <motion.span
                    whileTap={{ scale: 1.5 }}
                    drag
                    dragConstraints={{
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0
                    }}
                    style={{ display: "inline-block", overflow: "visible" }}
                    key={index}
                  >
                    {login}
                  </motion.span>
                ))}
              </motion.h1>
              <motion.div
                animate={anime ? "open" : "close"}
                variants={variants}
                layout
                className="error"
              >
                {status}
              </motion.div>
              <input
                required
                ref={userNameRef}
                type="text"
                name="userName"
                value={credentials.userName}
                onChange={handleChange}
                placeholder="userName"
              />
              <input
                required
                ref={passwordRef}
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="password"
              />
              <motion.button
              disabled={click}
                ref={logBoxBtn1}
                drag
                dragConstraints={{
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0
                }}
                className="submitBtn"
                type="submit"
              >
                Login
              </motion.button>
              {newOr}
              <button
                type="button"
                className="singupToggle"
                ref={singUpBtnRef}
                onClick={toggleSingUp}
              >
                SingUp here
              </button>
              <p>
                {saved.length > 0
                  ? "All Saved"
                  : "Login To see Saved markdowns"}
              </p>
              <div className="allsaved">
                <div className="refresh" onClick={refreshList}>
                  refresh
                </div>
                {saved
                  ? saved.map((element: any, index: any) => (
                      <div key={index} className="mainSaved">
                        <div
                          key={index}
                          className="list"
                          onClick={() => {
                            try {
                              setValue(element.note);
                              console.log("note added");
                              setMenuOpen(false);
                              menuBtn.current!.classList.toggle("open");
                            } catch (e: any) {
                              setValue(e);
                            }
                          }}
                        >
                          {element?.title}
                          <span className="lastEdited">
                            {formattedDate(element?.lastEdited)}
                          </span>
                        </div>
                        <span
                          className="delMark"
                          ref={delRef}
                          id={element._id}
                          onClick={e => delMark(e, element._id)}
                        >
                          <svg
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                            height="1.5em"
                            width="1.5em"
                          >
                            <path
                              fill="currentColor"
                              d="M13.05 42q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.5H9.5q-.65 0-1.075-.425Q8 9.65 8 9q0-.65.425-1.075Q8.85 7.5 9.5 7.5h7.9q0-.65.425-1.075Q18.25 6 18.9 6h10.2q.65 0 1.075.425.425.425.425 1.075h7.9q.65 0 1.075.425Q40 8.35 40 9q0 .65-.425 1.075-.425.425-1.075.425h-.55V39q0 1.2-.9 2.1-.9.9-2.1.9Zm0-31.5V39h21.9V10.5Zm5.3 22.7q0 .65.425 1.075.425.425 1.075.425.65 0 1.075-.425.425-.425.425-1.075V16.25q0-.65-.425-1.075-.425-.425-1.075-.425-.65 0-1.075.425-.425.425-.425 1.075Zm8.3 0q0 .65.425 1.075.425.425 1.075.425.65 0 1.075-.425.425-.425.425-1.075V16.25q0-.65-.425-1.075-.425-.425-1.075-.425-.65 0-1.075.425-.425.425-.425 1.075Zm-13.6-22.7V39 10.5Z"
                            />
                          </svg>
                        </span>
                      </div>
                    ))
                  : ""}
              </div>
            </motion.form>
            <div className="side">
              <h1>
                {aniWord.split("").map((w, i) => (
                  <motion.span
                    style={{
                      display: "inline-block"
                    }}
                    animate={`anim${i}`}
                    variants={variants5}
                    drag
                    dragConstraints={{
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0
                    }}
                    transition={{
                      // repeat: Infinity,
                      duration: 3
                    }}
                    key={i}
                  >
                    {w}
                  </motion.span>
                ))}
              </h1>
              <Typewriter
                onInit={typewriter => {
                  typewriter
                    .typeString("<p>Login to your account</p>")
                    .callFunction(() => {
                      // console.log('String typed out!');
                    })
                    .pauseFor(2000)
                    // .deleteAll()
                    .callFunction(() => {
                      // console.log('All strings were deleted');
                    })
                    .start();
                }}
              />
            </div>
          </>
        ) : (
          <SingUp />
        )}

        <div className="bgBlur"></div>
      </motion.div>
    </>
  );
};

export default Login;