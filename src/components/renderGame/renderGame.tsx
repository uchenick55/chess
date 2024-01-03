import React from "react";
import {GlobalStateType} from "../../redux/store-redux";
import {useSelector} from "react-redux";
import {FiedlType} from "../common/types/commonTypes";
import classes from "./renderGame.module.css"
import CellRender from "./CellRender";

const RenderGame: React.FC = (() => {
    console.log("RenderGame")
    const field: FiedlType = useSelector((state: GlobalStateType) => state.chess.field) // поле с ячейками и фигурами

    const firstStepLocal: "whitePlayer" | "blackPlayer" = useSelector((state: GlobalStateType) => state.chess.commonGameParam.firstStep) // кто первый ходит

    if (firstStepLocal!=="whitePlayer") { // если первыми ходят не белые
        field.reverse() // переворот поля и фигур на поле при выборе игры за черных
        field.forEach((f,rowInd)=>{
            console.log(f)
            f.reverse()
        })
    }

    const fieldWidthHeightLocal = useSelector((state: GlobalStateType) => state.chess.commonGameParam.fieldWidthHeight)
    return <div className={classes.div1} style={{ display: "flex", alignItems: "center", justifyContent: "center",}}>

        <div className={classes.div2} style={{
            width: 8 * fieldWidthHeightLocal,
            height: 8 * fieldWidthHeightLocal,
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
