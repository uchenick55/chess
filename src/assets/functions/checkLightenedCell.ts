import {CelllType} from "../../components/common/types/commonTypes";
import {InitialStateFieldType} from "../../redux/field-reducer";

export const checkLightenedCell = ( // проверка подсветок возможных ходов по лучам
    cellItem: CelllType, // ячейка, по которой кликнули
    stateLocal: InitialStateFieldType, // локальный стейт весь
    totalRowInd: number, // ряд со смещением подсветки, в пределах поля
    totalCollInd: number, // колонка со смещением подсветки, в пределах поля
    actionFigueColorCoeff: number, // коэффициент цвета фигуры текущего хода (поворот доски и направление хода фигур)
    player1ColorCoeff: number, // коэффициент выбора цвета фигур в начале
    setIsBreakRay: (isBreak: boolean) => void  // колбек обрыва луча
) => {
    const actionFigueColor = cellItem.cellFigue.color // цвет фигуры по которой кликнули

    const isWhiteUnderCheck = stateLocal.commonGameParam.isCheckMate.isWhiteUnderCheck // белые под шахом?
    const isBlackUnderCheck = stateLocal.commonGameParam.isCheckMate.isBlackUnderCheck // черные под шахом?

/*
    if (cellItem.cellFigue.figue !== "king") { // если фигура, по которой кликнули, не король
        // и либо белым шах, либо черным шах и цвет кто ходит совпадает со стороной под шахом
        if ((actionFigueColor === "white" && isWhiteUnderCheck) || (actionFigueColor ==="black" && isBlackUnderCheck)) {
            return // никто ходить кроме короля не может
        }
    }
*/

    if (cellItem.cellFigue.figue === "pawn") { // если кликнули по пешке

        const isCellNotEmptyStraight1Row = stateLocal.field[totalRowInd][totalCollInd].cellFigue.figue !== 'empty' // ячейка не пустая прямо на 1 поле (с фигурой)
        const totalRowIndCoeff = totalRowInd + actionFigueColorCoeff * player1ColorCoeff // номер ряда с учетом коэффициентов
        const figueLocal = totalRowIndCoeff >= 0 && totalRowIndCoeff <= 7 && stateLocal.field[totalRowIndCoeff][totalCollInd].cellFigue.figue // фигура, что двигается
        const isCellNotEmptyStraight2Row =
            totalRowIndCoeff >= 0 // не выходим за поле
            && figueLocal !== 'empty' // ячейка не пустая прямо на 2 поля (с фигурой)

        if (!isCellNotEmptyStraight1Row) {
            stateLocal.field[totalRowInd][totalCollInd].isLightened = true // подсвечиваем пустую ячейку, куда фигура может ходить
            if (figueLocal && !isCellNotEmptyStraight2Row && cellItem.cellFigue.stepCount === 0) { // если это первый ход пешки и ячейка на 2 поля вперед пусто, то
                stateLocal.field[totalRowIndCoeff][totalCollInd].isLightened = true // подсвечиваем пустую ячейку, куда фигура может ходить
            }
        }

        const isCellNotEmptyLeft = totalCollInd - 1 >= 0 && stateLocal.field[totalRowInd][totalCollInd - 1].cellFigue.figue !== 'empty' // ячейка не пустая слева (с фигурой)
        const isCellNotEmptyRight = totalCollInd + 1 <= 7 && stateLocal.field[totalRowInd][totalCollInd + 1].cellFigue.figue !== 'empty' // ячейка не пустая справа (с фигурой)

        if (isCellNotEmptyLeft || isCellNotEmptyRight) { // прерывание цикла, если клетка справа или слева не пустая
            setIsBreakRay(true)
            const isDarkenedFigueColorLeft = totalCollInd - 1 >= 0 && stateLocal.field[totalRowInd][totalCollInd - 1].cellFigue.color // цвет фигуры, которую может бить пешка слева от себя
            const isDarkenedFigueColorRight = totalCollInd + 1 <= 7 && stateLocal.field[totalRowInd][totalCollInd + 1].cellFigue.color // цвет фигуры, которую может бить пешка справа от себя
            const bittenFigueLeft = totalCollInd - 1 >= 0 && stateLocal.field[totalRowInd][totalCollInd - 1].cellFigue.figue // цвет фигуры, до которой доходит луч боя пешки слева
            const bittenFigueRight = totalCollInd + 1 <= 7 && stateLocal.field[totalRowInd][totalCollInd + 1].cellFigue.figue // цвет фигуры, до которой доходит луч боя пешки справа

            if (actionFigueColor !== isDarkenedFigueColorLeft && // цвет пешки и фигуры под боем слева отдичается
                isDarkenedFigueColorLeft !== "unset" && // не бьем пустые поля
                totalCollInd - 1 >= 0 &&
                bittenFigueLeft !== "king"

            ) { // и не выходим слева за поле
                stateLocal.field[totalRowInd][totalCollInd - 1].isDarkened = true // затемняем поле слева с фигурой, которую пешка может побить
            }
            if (actionFigueColor !== isDarkenedFigueColorRight && // цвет пешки и фигуры под боем справа отдичается
                isDarkenedFigueColorRight !== "unset" && // не бьем пустые поля
                totalCollInd + 1 <= 7 &&
                bittenFigueRight !== "king"

            ) {// и не выходим справа за поле
                stateLocal.field[totalRowInd][totalCollInd + 1].isDarkened = true // затемняем поле справа с фигурой, которую пешка может побить
            }
            return
        }
    }
    if (cellItem.cellFigue.figue !== "pawn") { // если кликнули не по пешке

        if (cellItem.cellFigue.figue === "king") {
            if (cellItem.cellFigue.color === "white" && stateLocal.field[totalRowInd][totalCollInd].isUnderBlackHit) { // обрыв хода для белого короля под ударом ячейки от черных
                return
            }
            if (cellItem.cellFigue.color === "black" && stateLocal.field[totalRowInd][totalCollInd].isUnderWhiteHit) { // обрыв хода для черного короля под ударом ячейки от белых
                return
            }
        }
        const isCellNotEmpty = stateLocal.field[totalRowInd][totalCollInd].cellFigue.figue !== 'empty' // ячейка не пустая (с фигурой)

        if (isCellNotEmpty) { // прерывание цикла, если клетка не пустая
            setIsBreakRay(true)
            const isDarkenedFigueColor = stateLocal.field[totalRowInd][totalCollInd].cellFigue.color // цвет фигуры, до которой доходит луч боя фигуры
            const bittenFigue = stateLocal.field[totalRowInd][totalCollInd].cellFigue.figue // цвет фигуры, до которой доходит луч боя фигуры
            if (actionFigueColor !== isDarkenedFigueColor && bittenFigue !== "king") { // бить можно всех кроме короля
                stateLocal.field[totalRowInd][totalCollInd].isDarkened = true // затемняем поле с фигурой, которую фигура что ходит, может побить
            }
            return
        }

        stateLocal.field[totalRowInd][totalCollInd].isLightened = true // подсвечиваем пустую ячейку, куда фигура может ходить
    }

    return stateLocal
}