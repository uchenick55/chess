import {InitialStateFieldType} from "../../redux/field-reducer";
import {CelllType} from "../../components/common/types/commonTypes";

export const checkLightenedOrHitCell = (cellItem: CelllType, stateLocal: InitialStateFieldType) => {

    const actionFigueColorCoeff: number = // коэффициент цвета кликнутой фигуры
        cellItem.cellFigue.figue !== "empty" //если поле содержит фигуру
        //  && figueFromAction === "pawn" // только для пешек, по которым кликнули
        && cellItem.cellFigue.color === "white"
            ? -1// разное направление для светлых и темных пешек, по которым кликнули
            : 1

    const player1ColorCoeff: number = // коэффициент цвета выбранных в начале фигур
        stateLocal.commonGameParam.player1Color === "whitePlayer" // если выбраны белые фигуры
            // && figueFromAction === "pawn" // только для пешек
            ? 1// разное направление для светлых и темных пешек в зависимости от выбора в начале игры
            : -1

    Object.keys(stateLocal.commonGameParam.figueLightenedSteps).forEach((figue, indFigue) => { // если фигура может сюда ходить, подсвечиваем поле в полной копии field

        if (figue === cellItem.cellFigue.figue) { // если название фигуры, на которую кликнули совпадает с названием фигуры в массиве проверки подсветки

            Object.values(stateLocal.commonGameParam.figueLightenedSteps)[indFigue].forEach((item, ind) => {// массив объектов с полями, со смещением от фигуры, по которой кликнули

                let isBreakRay = false // флаг прерывания луча проверки подсветки полей, если встретилась фигура, или вышли за пределы поля

                item.forEach((itemRay, indRay) => {// item это луч для каждой фигуры, а itemRay - отдельная ячейка проверки. Если есть фигура в ячеке - луч должен прерываться

                    if (!isBreakRay) { // если прерывания луча еще не было

                        const totalRowInd = cellItem.rowInd + itemRay.rowInd// итоговый индекс ряда клетки возможной подсветки
                            * actionFigueColorCoeff * player1ColorCoeff // доп коэффициенты только для пешек (цвет фигуры по которой кликнули и цвет выбранных в начале фигур)
                        const totalCollInd = cellItem.colInd + itemRay.collInd // итоговый индекс столбца клетки возможной подсветки

                        const isOutsideTheField = totalRowInd > 7 || totalRowInd < 0 || totalCollInd > 7 || totalCollInd < 0 // ячейка за пределами поля?
                        if (isOutsideTheField) { // прерывание цикла, если выходим за поле
                            isBreakRay = true
                            return
                        }

                        // здесь будет различие поведения

                        if (cellItem.cellFigue.figue === "pawn") { // если кликнули по пешке

                            const isCellNotEmptyStraight1Row = stateLocal.field[totalRowInd][totalCollInd].cellFigue.figue !== 'empty' // ячейка не пустая прямо на 1 поле (с фигурой)
                            const totalRowIndCoeff = totalRowInd + actionFigueColorCoeff * player1ColorCoeff // номер ряда с учетом коэффициентов
                            const figueLocal = totalRowIndCoeff >=0 && totalRowIndCoeff <=7 && stateLocal.field[totalRowIndCoeff][totalCollInd].cellFigue.figue // фигура, что двигается
                            const isCellNotEmptyStraight2Row =
                                totalRowIndCoeff >= 0 // не выходим за поле
                                && figueLocal !== 'empty' // ячейка не пустая прямо на 2 поля (с фигурой)

                            if (!isCellNotEmptyStraight1Row) {
                                stateLocal.field[totalRowInd][totalCollInd].isLightened = true // подсвечиваем пустую ячейку, куда фигура может ходить
                                if (figueLocal && !isCellNotEmptyStraight2Row && cellItem.cellFigue.stepCount===0) { // если это первый ход пешки и ячейка на 2 поля вперед пусто, то
                                    stateLocal.field[totalRowIndCoeff][totalCollInd].isLightened = true // подсвечиваем пустую ячейку, куда фигура может ходить
                                }
                            }

                            const isCellNotEmptyLeft = totalCollInd - 1 >= 0 && stateLocal.field[totalRowInd][totalCollInd - 1].cellFigue.figue !== 'empty' // ячейка не пустая слева (с фигурой)
                            const isCellNotEmptyRight = totalCollInd + 1 <= 7 && stateLocal.field[totalRowInd][totalCollInd + 1].cellFigue.figue !== 'empty' // ячейка не пустая справа (с фигурой)

                            const actionFigueColor = cellItem.cellFigue.color // цвет фигуры по которой кликнули

                            if (isCellNotEmptyLeft || isCellNotEmptyRight) { // прерывание цикла, если клетка справа или слева не пустая
                                isBreakRay = true
                                const isDarkenedFigueColorLeft = totalCollInd - 1 >= 0 && stateLocal.field[totalRowInd][totalCollInd - 1].cellFigue.color // цвет фигуры, которую может бить пешка слева от себя
                                const isDarkenedFigueColorRight = totalCollInd + 1 <= 7 && stateLocal.field[totalRowInd][totalCollInd + 1].cellFigue.color // цвет фигуры, которую может бить пешка справа от себя
                                const bittenFigueLeft = stateLocal.field[totalRowInd][totalCollInd- 1].cellFigue.figue // цвет фигуры, до которой доходит луч боя пешки слева
                                const bittenFigueRight = stateLocal.field[totalRowInd][totalCollInd+ 1].cellFigue.figue // цвет фигуры, до которой доходит луч боя пешки справа

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
                            const isCellNotEmpty = stateLocal.field[totalRowInd][totalCollInd].cellFigue.figue !== 'empty' // ячейка не пустая (с фигурой)

                            const actionFigueColor = cellItem.cellFigue.color // цвет фигуры по которой кликнули

                            if (isCellNotEmpty) { // прерывание цикла, если клетка не пустая
                                isBreakRay = true
                                const isDarkenedFigueColor = stateLocal.field[totalRowInd][totalCollInd].cellFigue.color // цвет фигуры, до которой доходит луч боя фигуры
                                const bittenFigue = stateLocal.field[totalRowInd][totalCollInd].cellFigue.figue // цвет фигуры, до которой доходит луч боя фигуры
                                if (actionFigueColor !== isDarkenedFigueColor && bittenFigue !== "king") {
                                    stateLocal.field[totalRowInd][totalCollInd].isDarkened = true // затемняем поле с фигурой, которую фигура что ходит, может побить
                                }
                                return
                            }
                            stateLocal.field[totalRowInd][totalCollInd].isLightened = true // подсвечиваем пустую ячейку, куда фигура может ходить
                        }

                    }
                })
            })
        }
    })
    return stateLocal
}