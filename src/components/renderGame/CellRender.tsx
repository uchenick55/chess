import React from "react";
import {CelllType, FiguraType} from "../common/types/commonTypes";
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

type CellRenderType = {
    cell: CelllType,
    indCell: number
    i: number,
    fieldWHLocal: number
}

const CellRender: React.FC<CellRenderType> = ({cell, indCell, i, fieldWHLocal}) => {
    console.log("CellRender")
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

    return <div style={{ //стилизация ячееку общая
        width: `${fieldWHLocal}px`,
        height: `${fieldWHLocal}px`,
        position: "absolute",
        left: indCell * fieldWHLocal,
        top: i * fieldWHLocal,
        backgroundColor: cell.cellColor === "white" ? "rgb(95,201,197)" : "rgb(34,166,170)", // и отличающийся цвет
        display: "flex", alignItems: "center", justifyContent: "center" // выравнивание всего внутри
    }}>
        <img alt="" style={{position: "absolute", height: `${fieldWHLocal*0.8}px`, }} // сами фигуры
             src={ Object.values(srcObj)[Object.keys(srcObj).indexOf(srcLocal)]}
            // srcLocal - составить ключ по которому ищем название ключа рисунка в массиве из объекта всех фигур
            // по этому ключу находим индекс картнки в массиве, полученном из объекта всех картинок
            // по индексу получаем сам рисунок и подставляем в поле (отрисовываем)
            onClick={()=>{
                console.log(cell)
                console.log(cell.cellAddress)
            }}
        />

    </div>
}
export default CellRender