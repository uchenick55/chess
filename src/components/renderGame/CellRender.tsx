import React from "react";
import {CelllType} from "../common/types/commonTypes";
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
import {useDispatch} from "react-redux";
import {fieldActions} from "../../redux/field-reducer";

type CellRenderType = {
    cell: CelllType,
    colInd: number
    rowInd: number,
    fieldWHLocal: number
}

const CellRender: React.FC<CellRenderType> = ({cell, colInd, rowInd, fieldWHLocal}) => {
    console.log("CellRender")
    const dispatch = useDispatch()

    let srcLocal=""// srcLocal - составить ключ по которому ищем название ключа рисунка в объекте рисунков
    if (cell.cellFigue!=="empty") {
        const figueColor = cell.cellFigue.color
        const figueLocal = cell.cellFigue.figue
        srcLocal = `${figueColor}${figueLocal}Key`.toLowerCase()
    }
    const srcObj={  // объект со всеми картинками фигур
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

    return <div style={{ //стилизация ячееки общая
        width: `${fieldWHLocal}px`,// ширина
        height: `${fieldWHLocal}px`, // высота
        position: "absolute", // абсолютное позиционирование
        left: colInd * fieldWHLocal,// смещение слева для текущей ячейки
        top: rowInd * fieldWHLocal,// смещение сверху для текущей ячейки
        backgroundColor: cell.cellColor === "white" ? "rgb(95,201,197)" : "rgb(34,166,170)", // и отличающийся цвет
        display: "flex", alignItems: "center", justifyContent: "center" // выравнивание всего внутри
    }}>
        <img alt="" style={{position: "absolute", height: `${fieldWHLocal*0.8}px`, }} // сами фигуры
             src={ Object.values(srcObj)[Object.keys(srcObj).indexOf(srcLocal)]}
            // srcLocal - составить ключ по которому ищем название ключа рисунка в массиве из объекта всех фигур
            // по этому ключу находим индекс картнки в массиве, полученном из объекта всех картинок
            // по индексу получаем сам рисунок и подставляем в поле (отрисовываем)
            onClick={()=>{
                dispatch(fieldActions.setOnclickFigueAC({
                    cellFigue: cell.cellFigue, // фигура по которой кликнули
                    rowInd: rowInd, // адрес ряда
                    colInd: colInd, // адрес колонки
                    cellAddress: cell.cellAddress // буквенный адрес ячейки
                })) // записать в стейт текущую фигуру, по чем мы кликнули
            }}
        />

    </div>
}
export default CellRender