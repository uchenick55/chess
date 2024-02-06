import {InitialStateFieldType} from "../../redux/field-reducer";

export const checkCheckMate = (stateLocal: InitialStateFieldType) => {
    stateLocal.field.forEach((rowItem) => {
        rowItem.forEach(cellItem => { // обнулили все флаги ячеек под ударом после каждого хода
            cellItem.isUnderBlackHit = false
            cellItem.isUnderWhiteHit = false
        })
    })

    stateLocal.field.forEach((rowItem) => {
        rowItem.forEach(cellItem => {



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
                if (figue === cellItem.cellFigue.figue) { // если название пробегаемой фигуры, совпадает с названием фигуры в массиве проверки подсветки
                    Object.values(stateLocal.commonGameParam.figueLightenedSteps)[indFigue].forEach((item, ind) => {// перебираем item - лучи
                        console.log(figue)
                        console.log(item) //
                        let isBreakRay = false // флаг прерывания луча проверки подсветки полей, если встретилась фигура, или вышли за пределы поля
                        item.forEach((itemRay, indRay) => {// item это луч для каждой фигуры, а itemRay - отдельная ячейка проверки. Если есть фигура в ячеке - луч должен прерываться
                            console.log(itemRay)

                            if (!isBreakRay) { // если прерывания луча еще не было
                                const totalRowInd = cellItem.rowInd + itemRay.rowInd// итоговый индекс ряда клетки возможной подсветки
                                    * actionFigueColorCoeff * player1ColorCoeff // доп коэффициенты только для пешек (цвет фигуры по которой кликнули и цвет выбранных в начале фигур)
                                const totalCollInd = cellItem.colInd + itemRay.collInd // итоговый индекс столбца клетки возможной подсветки
                                const isOutsideTheField = totalRowInd > 7 || totalRowInd < 0 || totalCollInd > 7 || totalCollInd < 0 // ячейка за пределами поля?

                                if (isOutsideTheField) { // прерывание цикла, если выходим за поле
                                    isBreakRay = true
                                    return
                                }
                                console.log("totalRowInd",totalRowInd)
                                console.log("totalCollInd",totalCollInd)
                                if (cellItem.cellFigue.figue !== "pawn") { // если пробегаем не по пешке
                                    const isCellNotEmpty = stateLocal.field[totalRowInd][totalCollInd].cellFigue.figue !== 'empty' // ячейка не пустая (с фигурой)

                                    const actionFigueColor = cellItem.cellFigue.color // цвет фигуры по которой кликнули

                                }
                            }
                        })
                    })
                }
            })
            //
            //
            //         let isBreakRay = false // флаг прерывания луча проверки подсветки полей, если встретилась фигура, или вышли за пределы поля


        })
    })


    return stateLocal
}