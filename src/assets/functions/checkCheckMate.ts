import {InitialStateFieldType} from "../../redux/field-reducer";
import {checkLightenedOrHitCellComm} from "./checkLightenedOrHitCellComm";

export const checkCheckMate = (stateLocal: InitialStateFieldType) => {

    stateLocal.field.forEach((rowItem) => { // обнулили все флаги ячеек под ударом и шах/мат после каждого хода
        rowItem.forEach(cellItem => {
            cellItem.isUnderBlackHit = false
            cellItem.isUnderWhiteHit = false
        })
    })
    stateLocal.commonGameParam.isCheckMate = { // обнулили флаги король под шахом и матом
        isWhiteUnderCheck: false,
        isBlackUnderCheck: false,
        isBlackUnderMate: false,
        isWhiteUnderMate: false,
        shouldClickGoBack: false
    }

    stateLocal.field.forEach((rowItem) => {
        rowItem.forEach(cellItem => {

            checkLightenedOrHitCellComm(cellItem, stateLocal, "hit") // проверка ячейки под ударом подсветки ячейки для кликнутой фигуры

        })
    })
    const currentStep = stateLocal.commonGameParam.currentStep
    const isWhiteUnderCheck = stateLocal.commonGameParam.isCheckMate.isWhiteUnderCheck
    const isBlackUnderCheck = stateLocal.commonGameParam.isCheckMate.isBlackUnderCheck
    if ((isWhiteUnderCheck && currentStep === "blackPlayer") || (isBlackUnderCheck && currentStep === "whitePlayer")) {
        console.log("должно было откатить ход назад")
        stateLocal.commonGameParam.isCheckMate.shouldClickGoBack = true
    }



    return stateLocal
}