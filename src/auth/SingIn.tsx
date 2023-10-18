import { useState, useRef } from "react";
import "../styles/log&singup.css";
import axios from "axios";
import { motion } from "framer-motion";
import { useValue, usingValue } from "../../Contaxt";
import Typewriter from "typewriter-effect";
import * as EmailValidator from "email-validator";

import AlertBox from "./AlertBox";
const getNotesUrl = import.meta.env.VITE_API_GET_NOTES;
const singUpUrl = import.meta.env.VITE_API_SINGIN;

const SingUp = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    userName: "",
    email: "",
    password: ""
  });

  const { setIsOpen, anime, setAnime, setAlertBox } = useValue() as usingValue;
  const [validateMessage, setValidateMessage] = useState("");
  const [alertC, setAlertC] = useState("");
  const [alertBg, setAlertBg] = useState("");
  const [alertBo, setAlertBo] = useState("");

  const nameRef = useRef<HTMLInputElement>(null);
  const userRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const logBtnRef = useRef<HTMLButtonElement>(null);

  const handleChange = (e: any) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const nameValidate = nameRef.current!.value;
    const userValidate = userRef.current!.value;
    const mailValidate = emailRef.current!.value;
    const passValidate = passRef.current!.value;

    const regLowercase = /^(?=.*[a-z])/;
    const regUppercase = /^(?=.*[A-Z])/;
    const regDigit = /^(?=.*\d)/;
    const regSpecialChar = /^(?=.*[@$!%*?&])/;

    const validateEmail = EmailValidator.validate(mailValidate);

    console.log(nameValidate);
    console.log(userValidate);
    console.log(mailValidate);
    console.log(passValidate);
    // console.log(validateEmail);
    if (!validateEmail) {
      setAlertBox(true);
      setValidateMessage("please enter correct email");
      setAlertC("red");
      setAlertBg("red");
      setAlertBo("red");
      emailRef.current!.style.borderColor = "red";
      setTimeout(() => setAlertBox(false), 2000);
      return;
    }
    if (nameValidate.length < 3) {
      setAlertBox(true);
      setValidateMessage("Name must be more then 3 charactors");
      setAlertC("red");
      setAlertBg("red");
      setAlertBo("red");
      setTimeout(() => setAlertBox(false), 2000);
      nameRef.current!.style.borderColor = "red";
      return;
    } else if (userValidate.length < 3) {
      setAlertBox(true);
      setValidateMessage("UserName must be more then 3 charactors");
      setAlertC("red");
      setAlertBg("red");
      setAlertBo("red");
      setTimeout(() => setAlertBox(false), 2000);
      userRef.current!.style.borderColor = "red";
      return;
    }
    if (passValidate.length < 5) {
      setAlertBox(true);
      setValidateMessage("Password must be at least 5 characters long");
      setAlertC("red");
      setAlertBg("red");
      setAlertBo("red");
      setTimeout(() => setAlertBox(false), 2000);
      passRef.current!.style.borderColor = "red";
      return;
    } else if (!regLowercase.test(passValidate)) {
      setAlertBox(true);
      setValidateMessage(
        "Password must contain at least one lowercase character"
      );
      setAlertC("red");
      setAlertBg("red");
      setAlertBo("red");
      setTimeout(() => setAlertBox(false), 2000);
      passRef.current!.style.borderColor = "red";
      return;
    } else if (!regUppercase.test(passValidate)) {
      setAlertBox(true);
      setValidateMessage(
        "Password must contain at least one uppercase character"
      );
      setAlertC("red");
      setAlertBg("red");
      setAlertBo("red");
      setTimeout(() => setAlertBox(false), 2000);
      passRef.current!.style.borderColor = "red";
      return;
    } else if (!regDigit.test(passValidate)) {
      setAlertBox(true);
      setValidateMessage("Password must contain at least one digit");
      setAlertC("red");
      setAlertBg("red");
      setAlertBo("red");
      setTimeout(() => setAlertBox(false), 2000);
      passRef.current!.style.borderColor = "red";
      return;
    } else if (!regSpecialChar.test(passValidate)) {
      setAlertBox(true);
      setValidateMessage(
        "Password should contain at least one special character"
      );
      setAlertC("red");
      setAlertBg("red");
      setAlertBo("red");
      setTimeout(() => setAlertBox(false), 2000);
      passRef.current!.style.borderColor = "red";
      return;
    } else {
      setAlertBox(true);
      setValidateMessage("Creating account...");
      setAlertC("blue");
      setAlertBg("blue");
      setAlertBo("blue");
      setTimeout(() => setAlertBox(false), 5000);
    }

    try {
      const response = await axios.post(
        singUpUrl,
        credentials
      );
      console.log(response.data);

      const headers = {
        authToken: ` ${response.data.authToken}`
      };
      // localStorage.setItem('authToken', response.data.authToken)
      const getData = await axios.get(
        getNotesUrl,
        {
          headers
        }
      );
      console.log(getData.data);
      setTimeout(() => {
        toggleSingUp();
      }, 5000);
      // Redirect on successful login
    } catch (error: any) {
      console.log(error);
      if (error.response?.data) {
        setAlertBox(true);
        setValidateMessage(error.response.data.errors || "error");
        setAlertC("red");
        setAlertBg("red");
        setAlertBo("red");
        if (logBtnRef != null) {
          logBtnRef.current!.style.cssText = `
      transform: scale(1.2);
      `;
        }
        setTimeout(() => setAlertBox(false), 5000);
      }
    }
  };
  const loginText = ["S", "i", "n", "g", "U", "p"];
  const aniWord = "Create Account";
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
      color: ["white", "white", "black"],
      opacity: [1, 0, 0, 0, 0, 0]
    }
  };

  const variants3 = {
    anim0: {
      translateX: ["-100%", "-200%", "-100%", "0%"],
      translateY: ["-100%", "-200%", "-100%", "0%"]
    },
    anim1: {
      translateX: ["-120%", "-220%", "-120%", "0%"],
      translateY: ["-100%", "-200%", "-100%", "0%"]
    },
    anim2: {
      translateX: ["-140%", "-260%", "-140%", "0%"],
      translateY: ["-100%", "-200%", "-100%", "0%"]
    },
    anim3: {
      translateX: ["-160%", "-280%", "-160%", "0%"],
      translateY: ["-100%", "-200%", "-100%", "0%"]
    },
    anim4: {
      translateX: ["-180%", "-300%", "-180%", "0%"],
      translateY: ["-100%", "-200%", "-100%", "0%"]
    },
    anim5: {
      translateX: ["-200%", "-320%", "-200%", "0%"],
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

  const toggleSingUp = () => {
    setAnime(true);
    if (anime) {
      setAnime(false);
    }
    // setIsOpen(true);
    setTimeout(() => {
      setIsOpen(true);
    }, 1000);
  };

  return (
    <>
      <motion.form
        className="singUpform"
        onSubmit={handleSubmit}
        animate={anime ? "open" : "close"}
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
        ></motion.div>
        <input
          required
          ref={nameRef}
          type="text"
          name="name"
          value={credentials.name}
          onChange={handleChange}
        />
        <input
          ref={userRef}
          required
          type="text"
          name="userName"
          value={credentials.userName}
          onChange={handleChange}
        />
        <input
          ref={emailRef}
          type="text"
          name="email"
          value={credentials.email}
          onChange={handleChange}
        />
        <input
          required
          ref={passRef}
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <motion.button
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
          SingUp
        </motion.button>
        <p>Allready have account</p>
        <button
          className="singupToggle"
          onClick={toggleSingUp}
          type="button"
          ref={logBtnRef}
        >
          Login Here
        </button>

        <AlertBox
          message={validateMessage}
          color={alertC}
          btnBg={alertBg}
          border={alertBo}
        />
      </motion.form>
      <div className="side">
        <h1>
          {aniWord.split("").map((w, i) => (
            <motion.span
              style={{
                display: "inline-block"
              }}
              animate={`anim${i}`}
              variants={variants3}
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
              .typeString("<p>Create your account</p>")
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
  );
};

export default SingUp;