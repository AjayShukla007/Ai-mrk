// import React from "react";//debug
import "../styles/AlertBox.css";
import { useValue, usingValue } from "../../Contaxt";

const AlertBox = (props:any) => {
  const { alertBox, setAlertBox } = useValue() as usingValue;

  const handleClose = () => {
    console.log(alertBox);
    setAlertBox(false);
    console.log("closed");
    console.log(alertBox);
  };

  return (
    <>
      {alertBox && (
        <div
          style={{
            color: props.color,
            borderColor:props.border
          }}
          className="alert-box"
        >
          <p>{props.message}</p>
          <button 
          style={{
            backgroundColor:props.btnBg
          }}
          type="button" 
          onClick={handleClose}>
            X
          </button>
        </div>
      )}
    </>
  );
};

export default AlertBox;