import React from "react";
import {AppDispatch, GlobalStateType} from "../../redux/store-redux";
import {useDispatch, useSelector} from "react-redux";
import {FiedlType} from "../common/types/commonTypes";
import classes from "./renderGame.module.css"
import CellRender from "./CellRender";

const RenderGame: React.FC = (() => {
    const field: FiedlType = useSelector((state: GlobalStateType) => state.chess.field)

    const commonFieldParam = useSelector((state: GlobalStateType) => state.chess.commonFieldParam)
    console.log(field)
    return <div className={classes.div1} >
        <div className={classes.div2} style={{
            width: 8*commonFieldParam.fieldWidthHeight,
            height: 8*commonFieldParam.fieldWidthHeight
        }} >
            {field.map((f, i) => {
                return <div key={i} >
                    {f.map((cell, indCell) => {
                        return <CellRender key={indCell} cell={cell} indCell={indCell} i={i}/>
                    })}
                </div>
            })}
        </div>

    </div>
})
export default RenderGame;
