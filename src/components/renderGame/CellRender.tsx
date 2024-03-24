import React from "react";
import {CelllType, PlayerType} from "../common/types/commonTypes";
import blackBishopVal from "../../assets/svg/black-bishop.svg"
import blackKingVal from "../../assets/svg/black-king.svg"
import blackKnightVal from "../../assets/svg/black-knight.svg"
import blackPawnVal from "../../assets/svg/black-pawn.svg"
import blackQueenVal from "../../assets/svg/black-queen.svg"
import blackRookVal from "../../assets/svg/black-rook.svg"
import whiteBishopVal from "../../assets/svg/white-bishop.svg"
import whiteKingVal from "../../assets/svg/white-king.svg"
import whiteKnightVal from "../../assets/svg/white-knight.svg"
import whitePawnVal from "../../assets/svg/white-pawn.svg"
import whiteQueenVal from "../../assets/svg/white-queen.svg"
import whiteRookVal from "../../assets/svg/white-rook.svg"
import nonEmpty from "../../assets/svg/non-empty.svg"
import classes from "./renderGame.module.css"

import {useDispatch, useSelector} from "react-redux";
import {fieldActions} from "../../redux/field-reducer";
import {GlobalStateType} from "../../redux/store-redux";
import circle from "../../assets/svg/circle.svg"
import PawnTransform from "../PawnTransform/PawnTransform";


type CellRenderType = {
    cell: CelllType,
    colInd: number
    rowInd: number,
    fieldWHLocal: number,
}

const CellRender: React.FC<CellRenderType> = ({cell, colInd, rowInd, fieldWHLocal}) => {
    //console.log("CellRender")
    const dispatch = useDispatch()
    const player1Color: PlayerType = useSelector((state: GlobalStateType) => state.chess.commonGameParam.player1Color) // кто первый ходит
    const currentStep: PlayerType = useSelector((state: GlobalStateType) => state.chess.commonGameParam.currentStep) // кто сейчас ходит
    const isWhiteUnderCheck: boolean = useSelector((state: GlobalStateType) => state.chess.commonGameParam.isCheckMate.isWhiteUnderCheck) // белые под шахом?
    const isBlackUnderCheck: boolean = useSelector((state: GlobalStateType) => state.chess.commonGameParam.isCheckMate.isBlackUnderCheck) // черные под шахом?

    let srcLocal = ""// srcLocal - составить ключ по которому ищем название ключа рисунка в объекте рисунков
    const figueColor = cell.cellFigue.color
    const figueLocal = cell.cellFigue.figue
    srcLocal = `${figueColor}${figueLocal}Key`.toLowerCase()

    const srcObj = {  // объект со всеми картинками фигур
        blackbishopkey: blackBishopVal,
        blackkingkey: blackKingVal,
        blackknightkey: blackKnightVal,
        blackpawnkey: blackPawnVal,
        blackqueenkey: blackQueenVal,
        blackrookkey: blackRookVal,
        whitebishopkey: whiteBishopVal,
        whitekingkey: whiteKingVal,
        whiteknightkey: whiteKnightVal,
        whitepawnkey: whitePawnVal,
        whitequeenkey: whiteQueenVal,
        whiterookkey: whiteRookVal,
    }
    const isLightenedLocal = cell.isLightened // подсвечена ли ячейка (куда может ходить фигура после клика)

    const isDarkenedLocal = cell.isDarkened // затемненное поле с фигурой, которую можно побить выбранной фигурой

    const cellColorWhite = // цвет всетлой ячейки, в зависимости от затемнения (боя фигуры врага)
        isDarkenedLocal
            ? "rgb(95,181,167)"
            : "rgb(95,201,197)"
    const cellColorBlack = // цвет темной ячейки, в зависимости от затемнения (боя фигуры врага)
        isDarkenedLocal
            ? "rgb(34,166,150)"
            : "rgb(34,166,170)"

    const isKingUnderCheck = cell.cellFigue.figue === "king" && ( // условие что королю шах
        (cell.cellFigue.color === "white" && isWhiteUnderCheck) || // и белый король с флагом белым шах
        (cell.cellFigue.color === "black" && isBlackUnderCheck) // или черный король с флагом черным шах
    )

    return <div style={{ //стилизация ячееки общая
        width: `${fieldWHLocal}px`,// ширина
        height: `${fieldWHLocal}px`, // высота
        position: "absolute", // абсолютное позиционирование
        left: colInd * fieldWHLocal,// смещение слева для текущей ячейки
        top: rowInd * fieldWHLocal,// смещение сверху для текущей ячейки
        display: "flex", alignItems: "center", justifyContent: "center", // выравнивание всего внутри

        backgroundColor: cell.cellColor === "white" ? cellColorWhite : cellColorBlack, // и отличающийся цвет
        // backgroundColor: cell.cellFigue.isKingCheckMate?.check? "red" : cellColorBlack,
    }}>
        {isLightenedLocal &&
        <img src={circle} style={{width: `${fieldWHLocal / 3.5}px`, opacity: "50%"}} alt=""/>

        } {/*рисуем кружок возможного хода фигуры*/}

        {player1Color !== "unchecked" &&// если уже определились с выбором фигур

        <img alt="" style={{
            position: "absolute", height: `${fieldWHLocal * 0.8}px`,
            transform: isDarkenedLocal ? "scale(1.05)" : "scale(1)",// увеличение фигуры под боем 50%
            transition: "0.5s ease-in-out",
            opacity: isLightenedLocal || cell.cellFigue.color === "unset" ? "0%" : "100%",
            backgroundColor: isKingUnderCheck ? "rgba(253,17,0, 0.5)" : "unset", // фон шаха королю
            boxShadow: isKingUnderCheck ? '0 0 10px red' : "unset", // тень подсветки шаха королю
            borderRadius: isKingUnderCheck ? "0.5rem" : "unset" // радиус красной подсветки шаха королю
        }} // сами фигуры
             src={
                 cell.cellFigue.color === "unset"
                     ? nonEmpty
                     : Object.values(srcObj)[Object.keys(srcObj).indexOf(srcLocal)]
             }
            // srcLocal - составить ключ по которому ищем название ключа рисунка в массиве из объекта всех фигур
            // по этому ключу находим индекс картнки в массиве, полученном из объекта всех картинок
            // по индексу получаем сам рисунок и подставляем в поле (отрисовываем)
             onClick={() => {
                 if (cell.cellFigue.color !== "unset" && currentStep.includes(cell.cellFigue.color)) { // если кликнули по своей фигуре
                     dispatch(fieldActions.setOnClickCellAC(cell))// записать в стейт текущую ячейку, по чем мы кликнули
                 }
                 if (
                     cell.cellFigue.color !== "unset" // если это не пустая ячейка
                     && !currentStep.includes(cell.cellFigue.color) // и фигура противника
                     && isDarkenedLocal // и фигура затемнена (ее можно побить нашей фигурой)
                 ) {
                     dispatch(fieldActions.clickByOppositeFigueAC(cell))//бьем фигуру противника фигурой из onclickFigue, а побитую фигуру перемещаем в отстойник для своего цвета, очищаем засветы и затемнения, передаем ход
                 }
                 if (cell.cellFigue.color === "unset") { // если кликнули по пустой ячейке,
                     if (isLightenedLocal) {//и в ней есть кружок (засветление - можно сюда походить)
                         dispatch(fieldActions.clickByLightenedCellAC(cell))//перемещаем сюда фигуру из кликнутой ячейки, и зачищаем в стейте onclickFigue, очищаем засветы и затемнения, передаем ход
                     }
                     if (!isLightenedLocal) {//просто пустая клетка
                         dispatch(fieldActions.clickByEmptyCellAC()) //очищаем засветы и затемнения
                     }
                 }

             }}
        />}
        {cell.cellFigue.pawnTransform && <div><PawnTransform cell={cell}/></div>}
        {cell.isUnderWhiteHit && <span className={classes.WHit}>W</span>}
        {cell.isUnderBlackHit && <span className={classes.BHit}>B</span>}
    </div>
}
export default CellRender