import React from "react";
import {GlobalStateType} from "../../redux/store-redux";
import {useSelector} from "react-redux";
import {FiedlType} from "../common/types/commonTypes";
import classes from "./renderGame.module.css"
import CellRender from "./CellRender";

const RenderGame: React.FC = (() => {
    const field: FiedlType = useSelector((state: GlobalStateType) => state.chess.field)

    const commonFieldParam = useSelector((state: GlobalStateType) => state.chess.commonFieldParam)
    return <div className={classes.div1}>

        <div className={classes.div2} style={{
            width: 8 * commonFieldParam.fieldWidthHeight,
            height: 8 * commonFieldParam.fieldWidthHeight,
            left: commonFieldParam.leftPadding,
            top: commonFieldParam.topPadding
        }}>

            {field.map((f, i) => { // пробегаем по каждому ряду ячеек (i)
                return <div key={i}>
                    {f.map((cell, indCell) => { // пробегаем по каждой ячейке
                        return <CellRender key={indCell} cell={cell} indCell={indCell} i={i}
                                           fieldWHLocal={commonFieldParam.fieldWidthHeight}/> // отрисовываем каждую ячейку
                    })}
                </div>
            })}
        </div>

    </div>
})
export default RenderGame;
