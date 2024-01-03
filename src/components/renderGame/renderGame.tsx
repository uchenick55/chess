import React from "react";
import {GlobalStateType} from "../../redux/store-redux";
import {useSelector} from "react-redux";
import {FiedlType} from "../common/types/commonTypes";
import classes from "./renderGame.module.css"
import CellRender from "./CellRender";

const RenderGame: React.FC = (() => {
    console.log("RenderGame")
    const field: FiedlType = useSelector((state: GlobalStateType) => state.chess.field)

    const fieldWidthHeightLocal = useSelector((state: GlobalStateType) => state.chess.commonGameParam.fieldWidthHeight)
    return <div className={classes.div1}>

        <div className={classes.div2} style={{
            width: 8 * fieldWidthHeightLocal,
            height: 8 * fieldWidthHeightLocal,
            left: fieldWidthHeightLocal,
            top: fieldWidthHeightLocal
        }}>

            {field.map((f, rowInd) => { // пробегаем по каждому ряду ячеек (i)
                return <div key={rowInd}>
                    {f.map((cell, colInd) => { // пробегаем по каждой ячейке
                        return <CellRender key={colInd} cell={cell} colInd={colInd} rowInd={rowInd}
                                           fieldWHLocal={fieldWidthHeightLocal}/> // отрисовываем каждую ячейку
                    })}
                </div>
            })}
        </div>

    </div>
})
export default RenderGame;