import React from "react";
import {GlobalStateType} from "../../redux/store-redux";
import {useDispatch, useSelector} from "react-redux";
import {FiedType} from "../common/types/commonTypes";
import classes from "./renderGame.module.css"
import CellRender from "./CellRender";
import Menu from "./Menu/Menu";
import goBack from "../../assets/svg/go-back-white.svg"
import {fieldActions} from "../../redux/field-reducer";


const RenderGame: React.FC = (() => {
    console.log("RenderGame")
    const field: FiedType = useSelector((state: GlobalStateType) => state.chess.field) // поле с ячейками и фигурами
    const fieldWidthHeightLocal = useSelector((state: GlobalStateType) => state.chess.commonGameParam.fieldParams.fieldWidthHeight)
    const showMenu = useSelector((state: GlobalStateType) => state.chess.commonGameParam.showMenu) // нужно ли показывать меню
    const fieldParams = useSelector((state: GlobalStateType) => state.chess.commonGameParam.fieldParams) // параметры поля

    const fieldRender = field.map((f, rowInd) => { // отрисовка самого поля c ячейками и фигурами
        return <div key={rowInd}>
            {f.map((cell, colInd) => { // пробегаем по каждой ячейке
                return <CellRender key={colInd} cell={cell} colInd={colInd} rowInd={rowInd}
                                   fieldWHLocal={fieldWidthHeightLocal}
                /> // отрисовываем каждую ячейку
            })}
        </div>
    })
    const dispatch = useDispatch()

    return <div className={classes.div1} style={{display: "flex", alignItems: "center", justifyContent: "center",}}>
        <img
            src={goBack}
            alt="шаг назад"
            title="шаг назад"
            className={classes.goBackArrow}
            onClick={()=>{
                dispatch( fieldActions.clickGoBackArrowAC())
            }}

        />



        <div className={classes.div2} style={{ // основное поле помимо клеток (бордер)
            width: 8 * fieldWidthHeightLocal, // стилизация ширины и высоты ячеек от переменных в стейте
            height: 8 * fieldWidthHeightLocal,
        }}>
            {fieldParams.num123.map((num123Item, num123Index)=>{
                return <div key={num123Index}>
                    <div className={classes.num123} style={{ //
                        top: (num123Index + 0.35)*fieldWidthHeightLocal, //
                        left: "-1rem"
                    }}>
                        {num123Item}
                    </div>
                    <div className={classes.num123} style={{ //
                        top: (num123Index + 0.35)*fieldWidthHeightLocal, //
                        right: "-1rem"
                    }}>
                        {num123Item}
                    </div>
                </div>
            })}
            {fieldParams.numABC.map((numABCItem, numABCIndex)=>{
                return <div key={numABCIndex}>
                    <div className={classes.num123} style={{ //
                        left: (numABCIndex + 0.4)*fieldWidthHeightLocal, //
                        top: "-1.3rem"
                    }}>
                        {numABCItem}
                    </div>
                    <div className={classes.num123} style={{ //
                        left: (numABCIndex + 0.4)*fieldWidthHeightLocal, //
                        bottom: "-1.3rem"
                    }}>
                        {numABCItem}
                    </div>

                </div>
            })}

            {fieldRender} {/*отрисовка самого поля c ячейками и фигурами*/}

        </div>
        {showMenu && <Menu/>} {/*отрисовка меню в зависимости от флага показа меню*/}

    </div>
})
export default RenderGame;
