import React from "react";
import {AppDispatch, GlobalStateType} from "../../redux/store-redux";
import {useDispatch, useSelector} from "react-redux";
import {FiedlType} from "../common/types/commonTypes";
import classes from "./renderGame.module.css"

const RenderGame: React.FC = (() => {
    const field: FiedlType = useSelector((state: GlobalStateType) => state.chess.field)

    const commonFieldParam = useSelector((state: GlobalStateType) => state.chess.commonFieldParam)
    const dispatch = useDispatch<AppDispatch>();
    console.log(field)
    return <div  >
        {field.map((f, i) => {
            return <div key={i} >
                {f.map((cell, indCell) => {
                    return <div style={cell.cellColor === "white"
                        ? {
                            width: `${commonFieldParam.fieldWidthHeight}px`,
                            height: `${commonFieldParam.fieldWidthHeight}px`,
                            backgroundColor: "rgb(95,201,197)",
                            position: "fixed",
                            left: indCell * commonFieldParam.fieldWidthHeight,
                            top: i * commonFieldParam.fieldWidthHeight
                        }
                        : {
                            width: `${commonFieldParam.fieldWidthHeight}px`,
                            height: `${commonFieldParam.fieldWidthHeight}px`,
                            backgroundColor: "rgb(34,166,170)",
                            position: "fixed",
                            left: indCell * commonFieldParam.fieldWidthHeight,
                            top: i * commonFieldParam.fieldWidthHeight
                        }
                    }>
                    </div>
                })}
            </div>
        })}
    </div>
})
export default RenderGame;
