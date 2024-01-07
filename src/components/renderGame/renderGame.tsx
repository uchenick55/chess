import React, {useEffect} from "react";
import {GlobalStateType} from "../../redux/store-redux";
import {useDispatch, useSelector} from "react-redux";
import {FiedlType, PlayerType} from "../common/types/commonTypes";
import classes from "./renderGame.module.css"
import CellRender from "./CellRender";
import Menu from "./Menu/Menu";
import {fieldActions} from "../../redux/field-reducer";

const RenderGame: React.FC = (() => {
    console.log("RenderGame")
    const field: FiedlType = useSelector((state: GlobalStateType) => state.chess.field) // поле с ячейками и фигурами
    const fieldWidthHeightLocal = useSelector((state: GlobalStateType) => state.chess.commonGameParam.fieldParams.fieldWidthHeight)
    const showMenu = useSelector((state: GlobalStateType) => state.chess.commonGameParam.showMenu) // нужно ли показывать меню

    return <div className={classes.div1} style={{display: "flex", alignItems: "center", justifyContent: "center",}}>

        <div className={classes.div2} style={{ // основное поле помимо клеток (бордер)
            width: 8 * fieldWidthHeightLocal,
            height: 8 * fieldWidthHeightLocal,
        }}>

            {field.map((f, rowInd) => { // пробегаем по каждому ряду ячеек (i)
                return <div key={rowInd}>
                    {f.map((cell, colInd) => { // пробегаем по каждой ячейке
                        return <CellRender key={colInd} cell={cell} colInd={colInd} rowInd={rowInd}
                                           fieldWHLocal={fieldWidthHeightLocal}
                        /> // отрисовываем каждую ячейку
                    })}
                </div>
            })}

        </div>
        {showMenu && <Menu/>}

    </div>
})
export default RenderGame;
