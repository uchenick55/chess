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
import {useDispatch, useSelector} from "react-redux";
import {fieldActions} from "../../redux/field-reducer";
import {GlobalStateType} from "../../redux/store-redux";
import circle from "../../assets/svg/circle.svg"


type CellRenderType = {
    cell: CelllType,
    colInd: number
    rowInd: number,
    fieldWHLocal: number,
}

const CellRender: React.FC<CellRenderType> = ({cell, colInd, rowInd, fieldWHLocal}) => {
    console.log("CellRender")
    const dispatch = useDispatch()
    const player1Color: PlayerType = useSelector((state: GlobalStateType) => state.chess.commonGameParam.player1Color) // кто первый ходит

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

    return <div style={{ //стилизация ячееки общая
        width: `${fieldWHLocal}px`,// ширина
        height: `${fieldWHLocal}px`, // высота
        position: "absolute", // абсолютное позиционирование
        left: colInd * fieldWHLocal,// смещение слева для текущей ячейки
        top: rowInd * fieldWHLocal,// смещение сверху для текущей ячейки
        display: "flex", alignItems: "center", justifyContent: "center", // выравнивание всего внутри

        backgroundColor: cell.cellColor === "white" ? cellColorWhite : cellColorBlack, // и отличающийся цвет
    }}>
        {player1Color !== "unchecked" &&
        <img alt="" style={{position: "absolute", height: `${fieldWHLocal * 0.8}px`,
            transform: isDarkenedLocal? "scale(1.05)" : "scale(1)",// увеличение фигуры под боем 50%
            transition: "0.5s ease-in-out"

        }} // сами фигуры
             src={Object.values(srcObj)[Object.keys(srcObj).indexOf(srcLocal)]}
            // alt={`r:${rowInd},c:${colInd}`}

            // srcLocal - составить ключ по которому ищем название ключа рисунка в массиве из объекта всех фигур
            // по этому ключу находим индекс картнки в массиве, полученном из объекта всех картинок
            // по индексу получаем сам рисунок и подставляем в поле (отрисовываем)
             onClick={() => {
                 dispatch(fieldActions.setOnclickFigueAC({
                     cellFigue: cell.cellFigue, // фигура по которой кликнули
                     rowInd: rowInd, // адрес ряда
                     colInd: colInd, // адрес колонки
                     cellAddress: cell.cellAddress // буквенный адрес ячейки
                 })) // записать в стейт текущую фигуру, по чем мы кликнули
             }}
        />}
       {isLightenedLocal && <img src={circle} style={{width: "1rem", opacity: "50%"}} alt=""/>}  {/*рисуем кружок возможного хода фигуры*/}
    </div>
}
export default CellRender