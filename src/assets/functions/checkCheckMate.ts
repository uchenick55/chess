import {InitialStateFieldType} from "../../redux/field-reducer";
import {checkLightenedOrHitCellComm} from "./checkLightenedOrHitCellComm";
import {isKingCheckMateInitial} from "../constants/constants";

export const checkCheckMate = (stateLocal: InitialStateFieldType) => {
    stateLocal.field.forEach((rowItem) => { // обнулили все флаги ячеек под ударом и шах/мат после каждого хода
        rowItem.forEach(cellItem => {
            cellItem.isUnderBlackHit = false
            cellItem.isUnderWhiteHit = false
            cellItem.cellFigue.isKingCheckMate = {
                check: false,
                mate: false
            }
            if (cellItem.cellFigue.figue === "king") {
                console.log(cellItem.cellFigue.figue, cellItem.cellFigue.color, cellItem.cellFigue.isKingCheckMate)
            }
        })
    })

    stateLocal.field.forEach((rowItem) => {
        rowItem.forEach(cellItem => {

            checkLightenedOrHitCellComm(cellItem, stateLocal, "hit") // проверка ячейки под ударом подсветки ячейки для кликнутой фигуры

        })
    })


    return stateLocal
}