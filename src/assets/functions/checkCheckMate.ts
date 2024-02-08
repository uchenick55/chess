import {InitialStateFieldType} from "../../redux/field-reducer";
import {checkLightenedOrHitCellComm} from "./checkLightenedOrHitCellComm";
import {isKingCheckMateInitial} from "../constants/constants";

export const checkCheckMate = (stateLocal: InitialStateFieldType) => {
    stateLocal.field.forEach((rowItem) => { // обнулили все флаги ячеек под ударом и шах/мат после каждого хода
        rowItem.forEach(cellItem => {
            cellItem.isUnderBlackHit = false
            cellItem.isUnderWhiteHit = false
        })
    })
    stateLocal.commonGameParam.isCheckMate = {
        isWhiteUnderCheck: false,
        isBlackUnderCheck: false,
        isBlackUnderMate: false,
        isWhiteUnderMate: false
    }

    stateLocal.field.forEach((rowItem) => {
        rowItem.forEach(cellItem => {

            checkLightenedOrHitCellComm(cellItem, stateLocal, "hit") // проверка ячейки под ударом подсветки ячейки для кликнутой фигуры

        })
    })


    return stateLocal
}