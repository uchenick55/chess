import React from "react";
import {GlobalStateType} from "../../redux/store-redux";
import {useSelector} from "react-redux";
import {FiedType} from "../common/types/commonTypes";
import classes from "./renderGame.module.css"
import CellRender from "./CellRender";
import Menu from "./Menu/Menu";

const RenderGame: React.FC = (() => {
    console.log("RenderGame")
    const field: FiedType = useSelector((state: GlobalStateType) => state.chess.field) // поле с ячейками и фигурами
    const fieldWidthHeightLocal = useSelector((state: GlobalStateType) => state.chess.commonGameParam.fieldParams.fieldWidthHeight)
    const showMenu = useSelector((state: GlobalStateType) => state.chess.commonGameParam.showMenu) // нужно ли показывать меню

    const fieldRender = field.map((f, rowInd) => { // отрисовка самого поля c ячейками и фигурами
        return <div key={rowInd}>
            {f.map((cell, colInd) => { // пробегаем по каждой ячейке
                return <CellRender key={colInd} cell={cell} colInd={colInd} rowInd={rowInd}
                                   fieldWHLocal={fieldWidthHeightLocal}
                /> // отрисовываем каждую ячейку
            })}
        </div>
    })

    return <div className={classes.div1} style={{display: "flex", alignItems: "center", justifyContent: "center",}}>

        <div className={classes.div2} style={{ // основное поле помимо клеток (бордер)
            width: 8 * fieldWidthHeightLocal, // стилизация ширины и высоты ячеек от переменных в стейте
            height: 8 * fieldWidthHeightLocal,
        }}>

            {fieldRender} {/*отрисовка самого поля c ячейками и фигурами*/}

        </div>
        {showMenu && <Menu/>} {/*отрисовка меню в зависимости от флага показа меню*/}

    </div>
})
export default RenderGame;
