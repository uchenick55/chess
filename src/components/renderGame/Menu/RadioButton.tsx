import classes from "./radioButton.module.css"
import blackRook from "../../../assets/svg/black-rook.svg";
import React from "react";

type RadioButtonType = {
    id: any, text:any, name:any, onChange:any, checked:any, value:any, src: any
}

const RadioButton: React.FC< RadioButtonType> = ({ id, text, name, onChange, checked, value, src }) => {
    return (
        <label htmlFor={id} className={classes.radiobuttonLabel}>
            <input
                className= {classes.radiobuttonInput}
                type="radio"
                name={name}
                id={id}
                value={value}
                onChange={onChange}
                checked={checked}
            />
            <span className={classes.customRadiobutton}/>
            <img src={src} alt="" className={classes.rook}/>
            <div className={classes.text}>text</div>
        </label>
    );
};

export default RadioButton;
