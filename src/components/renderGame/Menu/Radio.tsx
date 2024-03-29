import React from "react";
import RadioButton from "./RadioButton";
import classes from "./radioButton.module.css"
import blackRook from "../../../assets/svg/black-rook.svg"
import whiteRook from "../../../assets/svg/white-rook.svg"
import checkboxNotChoosen from "../../../assets/svg/checkboxNotChoosen.svg";
import checkboxChoosen from "../../../assets/svg/checkboxChoosen.svg";
import {fieldActions} from "../../../redux/field-reducer";
import {PlayerType} from "../../common/types/commonTypes";
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "../../../redux/store-redux";

function Radio() {
    const player1Color: PlayerType = useSelector((state: GlobalStateType) => state.chess.commonGameParam.player1Color) // кто ходит первым
    const fieldWidthHeightLocal = useSelector((state: GlobalStateType) => state.chess.commonGameParam.fieldParams.fieldWidthHeight)
    const dispatch = useDispatch()

    return <div className={classes.menuCommon}>
        <div className={classes.radioCommon} style={{
            left: fieldWidthHeightLocal * 1.1,
            top: fieldWidthHeightLocal * 1.1,
            right: fieldWidthHeightLocal * 1.1,
            bottom: fieldWidthHeightLocal * 1.1,

        }}>
            <div style={{fontSize: `${fieldWidthHeightLocal * 0.4}px`, fontWeight: "bold"}}>Выбери, за кого играть</div>
            <div className={classes.radiobuttonDiv}
                 style={{
                     width: `${fieldWidthHeightLocal * 5}px`,
                     height: `${fieldWidthHeightLocal * 0.8}px`,

                 }}>
                <RadioButton
                    id="за белых"
                    name="за белых"
                    value="за белых"
                    text="за белых"
                    onChange={() => {
                        dispatch(fieldActions.setFirstStepAC("whitePlayer"))
                    }}
                    checked={player1Color === "whitePlayer"}
                    src={whiteRook}
                />

            </div>
            <div className={classes.radiobuttonDiv}
                 style={{
                     width: `${fieldWidthHeightLocal * 5}px`,
                     height: `${fieldWidthHeightLocal * 0.8}px`,
                 }}>
            <RadioButton
                id="за чёрных"
                name="за чёрных"
                value="за чёрных"
                text="за чёрных"
                onChange={() => {
                dispatch(fieldActions.setFirstStepAC("blackPlayer"))
            }}
                checked={player1Color === "blackPlayer"}
                src={blackRook}
                />
        </div>

        <div className={classes.checkboxCommon} >
            <img src={player1Color === "unchecked" ? checkboxNotChoosen : checkboxChoosen} alt=""
                 className={player1Color === "unchecked" ? classes.checkboxDisabled : classes.checkbox}
                 style={{
                     width: `${fieldWidthHeightLocal * 1}px`,
                     top: `${fieldWidthHeightLocal * 1}px`,

                 }}
                 onClick={() => {
                     player1Color !== "unchecked" && dispatch(fieldActions.showMenuAC(false))

                 }}
            />
        </div>
    </div>
</div>
}

export default Radio;
