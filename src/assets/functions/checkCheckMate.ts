import {InitialStateFieldType} from "../../redux/field-reducer";
import {checkLightenedOrHitCellComm} from "./checkLightenedOrHitCellComm";

export const checkCheckMate = (stateLocal: InitialStateFieldType) => {
    stateLocal.field.forEach((rowItem) => { // обнулили все флаги ячеек под ударом после каждого хода
        rowItem.forEach(cellItem => {
            cellItem.isUnderBlackHit = false
            cellItem.isUnderWhiteHit = false
        })
    })

    stateLocal.field.forEach((rowItem) => {
        rowItem.forEach(cellItem => {

            checkLightenedOrHitCellComm(cellItem, stateLocal, "hit") // проверка ячейки под ударом подсветки ячейки для кликнутой фигуры

        })
    })


    return stateLocal
}