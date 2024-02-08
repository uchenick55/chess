import {CelllType} from "../../components/common/types/commonTypes";
import {InitialStateFieldType} from "../../redux/field-reducer";

export const checkHitCell = (
    cellItem: CelllType, // ячейка, по которой кликнули
    stateLocal: InitialStateFieldType, // локальный стейт весь
    totalRowInd: number, // ряд со смещением подсветки, в пределах поля
    totalCollInd: number, // колонка со смещением подсветки, в пределах поля
    actionFigueColorCoeff: number, // коэффициент цвета фигуры текущего хода (поворот доски и направление хода фигур)
    player1ColorCoeff: number, // коэффициент выбора цвета фигур в начале
    setIsBreakRay: (isBreak: boolean) => void  // колбек обрыва луча

) => {
    const actionFigueColor = cellItem.cellFigue.color // цвет фигуры по которой кликнули

    if (cellItem.cellFigue.figue !== "pawn") { // если пробегаемая фигура не пешка

        const isCellNotEmpty = stateLocal.field[totalRowInd][totalCollInd].cellFigue.figue !== 'empty' // ячейка не пустая (с фигурой)
        const bittenFigue = stateLocal.field[totalRowInd][totalCollInd].cellFigue.figue // фигура, до которой доходит луч боя фигуры
        const bittenFigueColor = stateLocal.field[totalRowInd][totalCollInd].cellFigue.color // цвет фигуры, до которой доходит луч боя

        if (actionFigueColor === "white") { // если мы перебираем белую фигуру
            stateLocal.field[totalRowInd][totalCollInd].isUnderWhiteHit = true // делаем метку, что поле под ударом белых
            if (bittenFigue === "king" && bittenFigueColor === "black") { // если фигура до которой дошел луч - король и его цвет черный
               stateLocal.commonGameParam.isCheckMate.isBlackUnderCheck = true  // в общих параметрах помечаем шах королю черных
            }
        }
        if (actionFigueColor === "black") {// если мы перебираем черную фигуру
            stateLocal.field[totalRowInd][totalCollInd].isUnderBlackHit = true // делаем метку, что поле под ударом белых
            if (bittenFigue === "king" && bittenFigueColor === "white") { // если фигура до которой дошел луч - король и его цвет белый
                stateLocal.commonGameParam.isCheckMate.isWhiteUnderCheck = true// в общих параметрах помечаем шах королю белых
            }
        }
        if (isCellNotEmpty) { // прерывание луча, если клетка не пустая и это не король
            setIsBreakRay(true)
            return
        }
        if (bittenFigue === "king" && bittenFigueColor === cellItem.cellFigue.color) {
            setIsBreakRay(true)
            return
        }


    }

    if (cellItem.cellFigue.figue === "pawn") { // если кликнули по пешке

        const isCellLeftExists = totalCollInd-1 >=0 // ячейка слева от пешки в пределах поля
        const isCellRightExists = totalCollInd+1 <=7 // ячейка справа от пешки в пределах поля

       // const totalRowIndCoeff = totalRowInd + actionFigueColorCoeff * player1ColorCoeff // номер ряда с учетом коэффициентов

        if (actionFigueColor === "white") {
            if (isCellLeftExists) {
                stateLocal.field[totalRowInd][totalCollInd-1].isUnderWhiteHit = true // делаем метку, что поле под ударом белых
            }
            if (isCellRightExists) {
                stateLocal.field[totalRowInd][totalCollInd+1].isUnderWhiteHit = true // делаем метку, что поле под ударом белых
            }
        }
        if (actionFigueColor === "black") {
            if (isCellLeftExists) {
                stateLocal.field[totalRowInd][totalCollInd-1].isUnderBlackHit = true // делаем метку, что поле под ударом белых
            }
            if (isCellRightExists) {
                stateLocal.field[totalRowInd][totalCollInd+1].isUnderBlackHit = true // делаем метку, что поле под ударом белых
            }
        }
    }
    return stateLocal
}