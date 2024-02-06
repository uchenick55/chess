import {InitialStateFieldType} from "../../redux/field-reducer";
import {CelllType} from "../../components/common/types/commonTypes";
import {checkLightenedCell} from "./checkLightenedCell";
import {checkHitCell} from "./checkHitCell";

export const checkLightenedOrHitCellComm = (cellItem: CelllType, stateLocal: InitialStateFieldType, direction: "lightened" | "hit") => {
    // проверка подсветки хода фигуры, либо проверка под ударом ли ячейка

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

                        const setIsBreakRay = (isBreak:boolean) => {
                            isBreakRay = isBreak
                        }

                        // здесь будет различие поведения

                        if (direction === "lightened") { // проверка подсветок
                            checkLightenedCell( cellItem, stateLocal, totalRowInd,
                                totalCollInd, actionFigueColorCoeff, player1ColorCoeff, setIsBreakRay )
                        }
                        if (direction === "hit") { // проверка клеток под ударом
                            checkHitCell( cellItem, stateLocal, totalRowInd,
                                totalCollInd, actionFigueColorCoeff, player1ColorCoeff, setIsBreakRay )
                        }
                        //

                    }
                })
            })
        }
    })
    return stateLocal
}