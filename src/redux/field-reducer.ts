import {InferActionsTypes} from "./store-redux";
import {
    CelllType,
    CommonGameParamType,
    ComThunkTp,
    FiedType, FigueLightenedStepsType, FigueType, PlayerType,
    RowType
} from "../components/common/types/commonTypes";
import {clearLightenedDarkened} from "../assets/functions/clearLightenedDarkened";
import {field, figueLightenedSteps} from "../assets/constants/constants";

const SET_ON_CLICK_FIGUE = "myApp/field-reducer/SET_ON_CLICK_FIGUE";
const SET_PLAYER1_COLOR = "myApp/field-reducer/SET_PLAYER1_COLOR";
const SHOW_MENU = "myApp/field-reducer/SHOW_MENU";
const SET_INITIALISED_APP = "myApp/field-reducer/SET_INITIALISED_APP";
const GET_UUID = "myApp/field-reducer/GET_UUID";
const CLICK_BY_OPPOSITE_FIGIUE = "myApp/field-reducer/CLICK_BY_OPPOSITE_FIGIUE";
const CLICK_BY_EMPTY_CELL = "myApp/field-reducer/CLICK_BY_EMPTY_CELL";
const SET_ON_CLICK_CELL = "myApp/field-reducer/SET_ON_CLICK_CELL";

export const fieldActions = {

    setFirstStepAC: (player1Color: PlayerType) => { // экшн креатор выбора цвета фигур
        return {type: SET_PLAYER1_COLOR, player1Color} as const
    },
    showMenuAC: (showMenu: boolean) => {// экшн креатор показа меню
        return {type: SHOW_MENU, showMenu} as const
    },
    setInitialisedApp: () => { // экшн креатор  инициализации приложения
        return {type: SET_INITIALISED_APP} as const
    },
    getUuidAC: () => { // экшн креатор  получения уникального id для фигур
        return {type: GET_UUID} as const
    },
    clickByOppositeFigueAC: (cell: CelllType) => { // экшн креатор  клика по вражеской фигуре
        return {type: CLICK_BY_OPPOSITE_FIGIUE, cell} as const
    },
    clickByEmptyCellAC: () => { // экшн креатор  клика по пустой ячейке
        return {type: CLICK_BY_EMPTY_CELL} as const
    },
    setOnClickCellAC: (cell: CelllType) => { // экшн креатор записи в стейт ячейки с фигурой, куда кликнули
        return {type: SET_ON_CLICK_CELL, cell} as const
    },
}

type FieldActionsTypes =
    InferActionsTypes<typeof fieldActions>

const initialState = {
    initialisedApp: false,
    commonGameParam: {
        fieldParams: {
            fieldWidthHeight: 55 as number,
            numABC: ["a", "b", "c", "d", "e", "f", "g", "h"],
            num123: ["1", "2", "3", "4", "5", "6", "7", "8"]
        },
        currentStep: "whitePlayer", // текущий ход (пока не чередуется)
        player1Color: "unchecked",//какие фигуры будут снизу
        onClickCell: {}, // ячейка с фигурой текущего хода
        beatenFigures: {
            white: [] as Array<CelllType>,
            black: [] as Array<CelllType>
        },
        showMenu: true, // флаг, показать ли меню выбора цвета фигур в начале
        figueLightenedSteps: figueLightenedSteps
    } as CommonGameParamType,
    field: field as FiedType,

}

export type InitialStateFieldType = typeof initialState

const FieldReducer = (state: InitialStateFieldType = initialState, action: FieldActionsTypes): InitialStateFieldType => {
    let stateCopy: InitialStateFieldType // объявлениечасти части стейта до изменения редьюсером
    let stateLocal: InitialStateFieldType
    let fieldFullCopy: FiedType
    const {v4: uuidv4} = require('uuid');

    switch (action.type) {

        case SET_PLAYER1_COLOR: // установить, кто ходит первым (белые/черные)
            fieldFullCopy = structuredClone(state.field) // полная копия поля field

            const reverseFieldFn = () => {
                fieldFullCopy.reverse() // инвертируем все ряды
                fieldFullCopy.forEach((f: RowType) => { // проходим по каждому ряду, и оборачиваем его
                    f.reverse()
                })
            }
            if (state.commonGameParam.player1Color === "unchecked") { // первый ход и выбраны не белые
                if (action.player1Color !== "whitePlayer") {
                    reverseFieldFn()
                }
            } else if (action.player1Color !== state.commonGameParam.player1Color) {
                reverseFieldFn()
            }

            fieldFullCopy.forEach((rowItem, rowInd) => {
                rowItem.forEach((cellItem, colInd) => {
                    //  cellItem.cellFigue.uuid = uuidv4()
                    cellItem.rowInd = rowInd // заполнили индекс ячейки по горизонтали
                    cellItem.colInd = colInd// заполнили индекс ячейки по вертикали
                })
            })

            stateCopy = {
                ...state,
                commonGameParam: {
                    ...state.commonGameParam,
                    player1Color: action.player1Color,
                    currentStep: action.player1Color
                },
                field: fieldFullCopy

            }
            return stateCopy
        case SHOW_MENU: // показать/скрыть меню
            stateCopy = {
                ...state,
                commonGameParam: {...state.commonGameParam, showMenu: action.showMenu},
            }
            return stateCopy
        case SET_INITIALISED_APP: // экшн инициализации приложения
            stateCopy = {
                ...state, // копия всего стейта
                initialisedApp: true, // смена флага инициализации приложения на true
            }
            return stateCopy; // возврат копии стейта после изменения
        case GET_UUID: // экшн получения Uuid для фигур

            fieldFullCopy = structuredClone(state.field) // полная копия поля field
            fieldFullCopy.forEach((rowItem, rowInd) => {
                rowItem.forEach((cellItem, colInd) => {
                    cellItem.cellFigue.uuid = uuidv4()
                })
            })
            stateCopy = {
                ...state, // копия всего стейта
                field: fieldFullCopy, // смена флага инициализации приложения на true
            }
            return stateCopy; // возврат копии стейта после изменения
        case CLICK_BY_OPPOSITE_FIGIUE: // экшн клика по вражеской фигуре

            stateLocal = structuredClone(state)

            stateLocal.field.forEach((rowItem) => {
                rowItem.forEach(cellItem => {
                    if (cellItem.cellFigue.uuid === action.cell.cellFigue.uuid) {
                        cellItem.cellFigue = stateLocal.commonGameParam.onClickCell.cellFigue
                        stateLocal.commonGameParam.beatenFigures["white"].push(action.cell)

                    }
                })
            })
            const rowIndToClear = stateLocal.commonGameParam.onClickCell.rowInd
            const colIndToClear = stateLocal.commonGameParam.onClickCell.colInd

            stateLocal.field[rowIndToClear][colIndToClear].cellFigue = { // зачиищаем ячейку, где раньше была фигура до удара
                "figue": "empty",
                "color": "unset",
                "uuid": uuidv4()// генерируем новый id для очищенной фигуры ячейки
            }
            stateLocal.field = clearLightenedDarkened(stateLocal.field)
            stateLocal.commonGameParam.onClickCell = {} as CelllType
/*
                {
                    "isLightened": false,
                    "isDarkened": false,
                    "cellFigue": {
                        "figue": "empty",
                        "color": "unset",
                        "uuid": "ca537d3a-5f40-4fbb-9b6d-33ba7ef9d1d7"
                    },
                    "cellColor": "black",
                    "cellAddress": "b6",
                    "rowInd": 5,
                    "colInd": 6
                }*/

             stateLocal.commonGameParam.currentStep = stateLocal.commonGameParam.currentStep === "whitePlayer"
                 ? "blackPlayer"
                 : "whitePlayer"

            stateCopy = {
                ...stateLocal, // копия всего стейта
            }
            return stateCopy; // возврат копии стейта после изменения
        case CLICK_BY_EMPTY_CELL: // экшн клика по пустой ячейке
            stateLocal = structuredClone(state)

            stateLocal.field = clearLightenedDarkened(stateLocal.field) // полная копия поля field с зачисткой засветок и затемнений


            stateCopy = {
                ...stateLocal, // копия всего стейта
            }
            return stateCopy; // возврат копии стейта после изменения
        case SET_ON_CLICK_CELL: // экшн клика записи в стейт ячейки, куда кликнули
            console.log("мы кликнули по ячейке:", action.cell)
            stateLocal = structuredClone(state)

            ///////////////
            fieldFullCopy = clearLightenedDarkened(stateLocal.field) // очищаем затемнения и засветы (кружки)

            const onClickRowInd = action.cell.rowInd // индекс ряда фигуры, по которой кликнули
            const onClickCollInd = action.cell.colInd // индекс колонки фигуры, по которой кликнули

            const figueFromAction = action.cell.cellFigue.figue // получаем фигуру из экшена

            let actionFigueColorCoeffForPawn = 1 // коэффициент цвета кликнутой фигуры для всех кроме пешек равен 1

            actionFigueColorCoeffForPawn = action.cell.cellFigue.figue !== "empty" //если поле содержит фигуру
            && figueFromAction === "pawn" // только для пешек, по которым кликнули
            && action.cell.cellFigue.color === "white"
                ? -1// разное направление для светлых и темных пешек, по которым кликнули
                : 1

            let player1ColorCoeffForPawn = 1 // коэффициент цвета выбранных в начале фигур для всех кроме пешек равен 1

            player1ColorCoeffForPawn = stateLocal.commonGameParam.player1Color === "whitePlayer" // если выбраны белые фигуры
            && figueFromAction === "pawn" // только для пешек
                ? 1// разное направление для светлых и темных пешек в зависимости от выбора в начале игры
                : -1

            Object.keys(stateLocal.commonGameParam.figueLightenedSteps).forEach((figue, indFigue) => { // если фигура может сюда ходить, подсвечиваем поле в полной копии field

                if (figue === action.cell.cellFigue.figue) { // если название фигуры, на которую кликнули совпадает с названием фигуры в массиве проверки подсветки

                    Object.values(stateLocal.commonGameParam.figueLightenedSteps)[indFigue].forEach((item, ind) => {// массив объектов с полями, со смещением от фигуры, по которой кликнули

                        let isBreakRay = false // флаг прерывания луча проверки подсветки полей, если встретилась фигура, или вышли за пределы поля

                        item.forEach((itemRay, indRay) => {// item это луч для каждой фигуры, а itemRay - отдельная ячейка проверки. Если есть фигура в ячеке - луч должен прерываться

                            if (!isBreakRay) { // если прерывания луча еще не было

                                const totalRowInd = onClickRowInd + itemRay.rowInd// итоговый индекс ряда клетки возможной подсветки
                                    * actionFigueColorCoeffForPawn * player1ColorCoeffForPawn // доп коэффициенты только для пешек (цвет фигуры по которой кликнули и цвет выбранных в начале фигур)
                                const totalCollInd = onClickCollInd + itemRay.collInd // итоговый индекс столбца клетки возможной подсветки

                                const isOutsideTheField = totalRowInd > 7 || totalRowInd < 0 || totalCollInd > 7 || totalCollInd < 0 // ячейка за пределами поля?
                                if (isOutsideTheField) { // прерывание цикла, если выходим за поле
                                    isBreakRay = true
                                    return
                                }

                                if (action.cell.cellFigue.figue === "pawn") { // если кликнули по пешке

                                    const isCellNotEmptyStraight1Row = fieldFullCopy[totalRowInd][totalCollInd].cellFigue.figue !== 'empty' // ячейка не пустая прямо на 1 поле (с фигурой)
                                    const isCellNotEmptyStraight2Row =
                                        totalRowInd + 1 * actionFigueColorCoeffForPawn * player1ColorCoeffForPawn >= 0 //проверяем непустое поле перед пешкой в зависимости от выбора цвета фигур в начале и цвета пешки, по которой клинкули
                                        && fieldFullCopy[totalRowInd + 1 * actionFigueColorCoeffForPawn * player1ColorCoeffForPawn][totalCollInd].cellFigue.figue !== 'empty' // ячейка не пустая прямо на 2 поля (с фигурой)

                                    if (!isCellNotEmptyStraight1Row) {
                                        fieldFullCopy[totalRowInd][totalCollInd].isLightened = true // подсвечиваем пустую ячейку, куда фигура может ходить
                                        if (!isCellNotEmptyStraight2Row && action.cell.cellFigue.isFirstStep) { // если это первый ход пешки и ячейка на 2 поля вперед пусто, то
                                            fieldFullCopy[totalRowInd + 1 * actionFigueColorCoeffForPawn * player1ColorCoeffForPawn][totalCollInd].isLightened = true // подсвечиваем пустую ячейку, куда фигура может ходить
                                        }
                                    }

                                    const isCellNotEmptyLeft = totalCollInd - 1 >= 0 && fieldFullCopy[totalRowInd][totalCollInd - 1].cellFigue.figue !== 'empty' // ячейка не пустая слева (с фигурой)
                                    const isCellNotEmptyRight = totalCollInd + 1 <= 7 && fieldFullCopy[totalRowInd][totalCollInd + 1].cellFigue.figue !== 'empty' // ячейка не пустая справа (с фигурой)

                                    const actionFigueColor = action.cell.cellFigue.color // цвет фигуры по которой кликнули

                                    if (isCellNotEmptyLeft || isCellNotEmptyRight) { // прерывание цикла, если клетка справа или слева не пустая
                                        isBreakRay = true
                                        const isDarkenedFigueColorLeft = totalCollInd - 1 >= 0 && fieldFullCopy[totalRowInd][totalCollInd - 1].cellFigue.color // цвет фигуры, которую может бить пешка слева от себя
                                        const isDarkenedFigueColorRight = totalCollInd + 1 <= 7 && fieldFullCopy[totalRowInd][totalCollInd + 1].cellFigue.color // цвет фигуры, которую может бить пешка справа от себя
                                        if (actionFigueColor !== isDarkenedFigueColorLeft && // цвет пешки и фигуры под боем слева отдичается
                                            isDarkenedFigueColorLeft !== "unset" && // не бьем пустые поля
                                            totalCollInd - 1 >= 0) { // и не выходим слева за поле
                                            fieldFullCopy[totalRowInd][totalCollInd - 1].isDarkened = true // затемняем поле слева с фигурой, которую пешка может побить
                                        }
                                        if (actionFigueColor !== isDarkenedFigueColorRight && // цвет пешки и фигуры под боем справа отдичается
                                            isDarkenedFigueColorRight !== "unset" && // не бьем пустые поля
                                            totalCollInd + 1 <= 7) {// и не выходим справа за поле
                                            fieldFullCopy[totalRowInd][totalCollInd + 1].isDarkened = true // затемняем поле справа с фигурой, которую пешка может побить
                                        }
                                        return
                                    }
                                }
                                if (action.cell.cellFigue.figue !== "pawn") { // если кликнули не по пешке
                                    const isCellNotEmpty = fieldFullCopy[totalRowInd][totalCollInd].cellFigue.figue !== 'empty' // ячейка не пустая (с фигурой)

                                    const actionFigueColor = action.cell.cellFigue.color // цвет фигуры по которой кликнули

                                    if (isCellNotEmpty) { // прерывание цикла, если клетка не пустая
                                        isBreakRay = true
                                        const isDarkenedFigueColor = fieldFullCopy[totalRowInd][totalCollInd].cellFigue.color // цвет фигуры, до которой доходит луч боя фигуры
                                        if (actionFigueColor !== isDarkenedFigueColor) {
                                            fieldFullCopy[totalRowInd][totalCollInd].isDarkened = true // затемняем поле с фигурой, которую фигура что ходит, может побить
                                        }
                                        return
                                    }
                                    fieldFullCopy[totalRowInd][totalCollInd].isLightened = true // подсвечиваем пустую ячейку, куда фигура может ходить
                                }

                            }
                        })
                    })
                }
            })

            ///////////////

            stateCopy = {
                ...state, // копия всего стейта
                commonGameParam: {...state.commonGameParam, onClickCell: action.cell},
                field: fieldFullCopy
            }
            return stateCopy; // возврат копии стейта после изменения

        default:
            return state
    }
}

type ThType = ComThunkTp<FieldActionsTypes> // тип, выведенный из общего типа санок сс учетом локального типа AC

export const initialisedAppThunkCreator = (): ComThunkTp<FieldActionsTypes> => {// санкреатор инициализации приложения
    return (dispatch, getState) => { // санки  инициализации приложения

        const promise1 = dispatch((fieldActions.getUuidAC())) // проверка статуса авторизации
        Promise.all([promise1]) // если все промисы зарезолвились
            .then(() => {
                dispatch(fieldActions.setInitialisedApp()) // смена флага инициализации на true
            })
    };
}

export default FieldReducer
