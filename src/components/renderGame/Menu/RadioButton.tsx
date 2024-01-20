import classes from "./radioButton.module.css"
import React from "react";
import {useSelector} from "react-redux";
import {GlobalStateType} from "../../../redux/store-redux";

type RadioButtonType = {
    id: any, text:any, name:any, onChange:any, checked:any, value:any, src: any
}

const RadioButton: React.FC< RadioButtonType> = ({ id, text, name, onChange, checked, value, src }) => {
    const fieldWidthHeightLocal = useSelector((state: GlobalStateType) => state.chess.commonGameParam.fieldParams.fieldWidthHeight)
    return (
        <label htmlFor={id} className={classes.radiobuttonLabel} >
            <input
                className= {classes.radiobuttonInput}
                type="radio"
                name={name}
                id={id}
                value={value}
                onChange={onChange}
                checked={checked}
            />
            <span className={classes.customRadiobutton} style={{
                height: `${fieldWidthHeightLocal * 0.3}px`,
                width: `${fieldWidthHeightLocal * 0.3}px`,
                left:`${fieldWidthHeightLocal*0.1}px`
            }}/>
            <img src={src} alt="" className={classes.rook} style={{left:`${fieldWidthHeightLocal*1.2}px`,height:`${fieldWidthHeightLocal*0.5}px`
            }}/>
            <div className={classes.text} style={{fontSize:`${fieldWidthHeightLocal*0.4}px`, left:`${fieldWidthHeightLocal*1.8}px`}}>{text}</div>
        </label>
    );
};

export default RadioButton;
