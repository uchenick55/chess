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
    if (cellItem.cellFigue.figue !== "pawn") { // если пробегаемая фигура не пешка

        const isCellNotEmpty = stateLocal.field[totalRowInd][totalCollInd].cellFigue.figue !== 'empty' // ячейка не пустая (с фигурой)
        const bittenFigue = stateLocal.field[totalRowInd][totalCollInd].cellFigue.figue // цвет фигуры, до которой доходит луч боя фигуры

        const actionFigueColor = cellItem.cellFigue.color // цвет фигуры по которой кликнули
        if (actionFigueColor === "white") {
            stateLocal.field[totalRowInd][totalCollInd].isUnderWhiteHit = true // делаем метку, что поле под ударом белых
        }
        if (actionFigueColor === "black") {
            stateLocal.field[totalRowInd][totalCollInd].isUnderBlackHit = true // делаем метку, что поле под ударом белых
        }
        if (isCellNotEmpty && bittenFigue !== "king") { // прерывание луча, если клетка не пустая и это не король
            setIsBreakRay(true)
            return
        }

    }
    return stateLocal
}