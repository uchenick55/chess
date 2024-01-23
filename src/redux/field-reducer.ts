import {InferActionsTypes} from "./store-redux";
import {
    CelllType, ColorType,
    CommonGameParamType,
    ComThunkTp,
    FiedType, FigueType, PlayerType,
    RowType
} from "../components/common/types/commonTypes";
import {clearLightenedDarkened} from "../assets/functions/clearLightenedDarkened";
import {field, figueLightenedSteps} from "../assets/constants/constants";
import {moveOrBiteFigue} from "../assets/functions/moveOrBiteFigue";

const SET_ON_CLICK_FIGUE = "myApp/field-reducer/SET_ON_CLICK_FIGUE";
const SET_PLAYER1_COLOR = "myApp/field-reducer/SET_PLAYER1_COLOR";
const SHOW_MENU = "myApp/field-reducer/SHOW_MENU";
const SET_INITIALISED_APP = "myApp/field-reducer/SET_INITIALISED_APP";
const GET_UUID = "myApp/field-reducer/GET_UUID";
const CLICK_BY_OPPOSITE_FIGIUE = "myApp/field-reducer/CLICK_BY_OPPOSITE_FIGIUE";
const CLICK_BY_EMPTY_CELL = "myApp/field-reducer/CLICK_BY_EMPTY_CELL";
const CLICK_BY_LIGHTENED_CELL = "myApp/field-reducer/CLICK_BY_LIGHTENED_CELL";
const ON_CELL_CLICK = "myApp/field-reducer/ON_CELL_CLICK";
const CLICK_GO_BACK_ARROW = "myApp/field-reducer/CLICK_GO_BACK_ARROW";
const SET_PAWN_TRANSFORM = "myApp/field-reducer/SET_PAWN_TRANSFORM";

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
    setOnClickCellAC: (cell: CelllType) => { // экшн креатор записи в стейт ячейки с фигурой, куда кликнули
        return {type: ON_CELL_CLICK, cell} as const
    },
    clickByEmptyCellAC: () => { // экшн креатор  клика по пустой ячейке
        return {type: CLICK_BY_EMPTY_CELL} as const
    },
    clickByOppositeFigueAC: (cell: CelllType) => { // экшн креатор  клика по вражеской фигуре
        return {type: CLICK_BY_OPPOSITE_FIGIUE, cell} as const
    },
    clickByLightenedCellAC: (cell: CelllType) => { // экшн креатор записи в стейт ячейки с фигурой, куда кликнули
        return {type: CLICK_BY_LIGHTENED_CELL, cell} as const
    },
    clickGoBackArrowAC: () => { // экшн креатор записи в стейт ячейки с фигурой, куда кликнули
        return {type: CLICK_GO_BACK_ARROW} as const
    },
    setPawnTransformAC: (uuid: string, color: ColorType, figue: FigueType  ) => { // экшн креатор трансформации пешки после клика мышью
        return {type: SET_PAWN_TRANSFORM, uuid, color, figue } as const
    },
}

type FieldActionsTypes =
    InferActionsTypes<typeof fieldActions>

const initialState = {
    initialisedApp: false,// инициализация приложения
    popoverBlockScreen: false,// блокировка кликов при всплывающем окне
    commonGameParam: {
        fieldParams: {
            fieldWidthHeight: document.documentElement.scrollHeight>document.documentElement.scrollWidth
                ? document.documentElement.scrollWidth/9.5 // если ширина меньше (мобильный или горизонтальный мобильнник)
                : document.documentElement.scrollHeight/9.5 , // если высота меньше (десктоп)
            numABC: [] as Array<string>,
            num123: [] as Array<string>
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
    history: {
        fieldHistory: [] as Array<FiedType>,
        commonGameParamHistory: [] as Array<CommonGameParamType>
    }
}

export type InitialStateFieldType = typeof initialState

const FieldReducer = (state: InitialStateFieldType = initialState, action: FieldActionsTypes): InitialStateFieldType => {
    let stateCopy: InitialStateFieldType // объявлениечасти части стейта до изменения редьюсером
    let stateLocal: InitialStateFieldType
    const {v4: uuidv4} = require('uuid');
    let rowIndToClear: number
    let colIndToClear: number

    switch (action.type) {

        case SET_PLAYER1_COLOR: // установить, кто ходит первым (белые/черные)
            stateLocal = structuredClone(state) // полная копия стейта

            const reverseFieldFn = () => {

                stateLocal.field.reverse() // инвертируем все ряды

                stateLocal.field.forEach((f: RowType) => { // проходим по каждому ряду, и оборачиваем его
                    f.reverse()
                })
            }
            if (stateLocal.commonGameParam.player1Color === "unchecked") { // первый ход и выбраны не белые
                if (action.player1Color !== "whitePlayer") {
                    reverseFieldFn()
                }
            } else if (action.player1Color !== stateLocal.commonGameParam.player1Color) {
                reverseFieldFn()
            }

            stateLocal.field.forEach((rowItem, rowInd) => {
                rowItem.forEach((cellItem, colInd) => {
                    //  cellItem.cellFigue.uuid = uuidv4()
                    cellItem.rowInd = rowInd // заполнили индекс ячейки по горизонтали
                    cellItem.colInd = colInd// заполнили индекс ячейки по вертикали
                })
            })

            stateLocal.commonGameParam.player1Color = action.player1Color
            stateLocal.commonGameParam.currentStep = action.player1Color

            if (action.player1Color === "whitePlayer") {
                stateLocal.commonGameParam.fieldParams.num123 = ["8", "7", "6", "5", "4", "3", "2", "1"]
                stateLocal.commonGameParam.fieldParams.numABC = ["a", "b", "c", "d", "e", "f", "g", "h"]
            }
            if (action.player1Color === "blackPlayer") {
                stateLocal.commonGameParam.fieldParams.num123 = ["1", "2", "3", "4", "5", "6", "7", "8"]
                stateLocal.commonGameParam.fieldParams.numABC = ["h", "g", "f", "e", "d", "c", "b", "a"]
           }

            stateCopy = {...stateLocal} // копия всего стейта
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
            stateLocal = structuredClone(state) // полная копия стейта

            stateLocal.field.forEach((rowItem, rowInd) => {
                rowItem.forEach((cellItem, colInd) => {
                    cellItem.cellFigue.uuid = uuidv4()
                    cellItem.cellFigue.stepCount = 0
                })
            })
            stateCopy = {...stateLocal} // копия всего стейта

            return stateCopy; // возврат копии стейта после изменения
        case CLICK_BY_OPPOSITE_FIGIUE: // экшн клика по вражеской фигуре

            stateLocal = moveOrBiteFigue(state, action.cell)

            stateCopy = {...stateLocal} // копия всего стейта

            return stateCopy; // возврат копии стейта после изменения
        case CLICK_BY_LIGHTENED_CELL: // экшн клика по вражеской фигуре

            stateLocal = moveOrBiteFigue(state, action.cell)

            stateCopy = {...stateLocal} // копия всего стейта

            return stateCopy; // возврат копии стейта после изменения
        case CLICK_BY_EMPTY_CELL: // экшн клика по пустой ячейке
            stateLocal = structuredClone(state) // полная копия стейта

            stateLocal.field = clearLightenedDarkened(stateLocal.field) // зачистка засветок и затемнений

            stateCopy = {...stateLocal} // копия всего стейта

            return stateCopy; // возврат копии стейта после изменения
        case CLICK_GO_BACK_ARROW: // экшн клика по стрелке шаг назад

            stateLocal = structuredClone(state) // полная копия стейта

            stateLocal.field = stateLocal.history.fieldHistory[stateLocal.history.fieldHistory.length-1] // взять последний элемент истории поля
            stateLocal.commonGameParam = stateLocal.history.commonGameParamHistory[stateLocal.history.commonGameParamHistory.length-1] // взять последний элемент истории параметров игры

            stateLocal.history.fieldHistory.pop() // удалить последний элемент истории поля
            stateLocal.history.commonGameParamHistory.pop() // удалить последний элемент истории параметров игры

            stateLocal.field = clearLightenedDarkened(stateLocal.field) // зачистка засветок и затемнений

            stateCopy = {...stateLocal} // копия всего стейта

            return stateCopy; // возврат копии стейта после изменения
        case SET_PAWN_TRANSFORM: // экшн трансформации пешки в конце поля

            stateLocal = structuredClone(state) // полная копия стейта

            stateLocal.field.forEach((rowItem)=>{
                rowItem.forEach((collItem)=>{
                    if (collItem.cellFigue.uuid === action.uuid) { // если мы наши изменяемую фигуру
                        collItem.cellFigue.figue = action.figue // сменяем тип фигуры с пешки на выбранную
                        collItem.cellFigue.pawnTransform = false // убираем флаг смена пешки (скрытие меню)
                    }
                })
            })

            stateCopy = {...stateLocal} // копия всего стейта

            return stateCopy; // возврат копии стейта после изменения
        case ON_CELL_CLICK: // экшн клика записи в стейт ячейки, куда кликнули
            console.log(action.cell)

            stateLocal = structuredClone(state) // полная копия стейта

            stateLocal.field = clearLightenedDarkened(stateLocal.field) // зачистка засветок и затемнений

            ///////////////

            const actionFigueColorCoeff: number = // коэффициент цвета кликнутой фигуры
                action.cell.cellFigue.figue !== "empty" //если поле содержит фигуру
              //  && figueFromAction === "pawn" // только для пешек, по которым кликнули
                && action.cell.cellFigue.color === "white"
                    ? -1// разное направление для светлых и темных пешек, по которым кликнули
                    : 1

            const player1ColorCoeff: number = // коэффициент цвета выбранных в начале фигур
                stateLocal.commonGameParam.player1Color === "whitePlayer" // если выбраны белые фигуры
               // && figueFromAction === "pawn" // только для пешек
                    ? 1// разное направление для светлых и темных пешек в зависимости от выбора в начале игры
                    : -1

            Object.keys(stateLocal.commonGameParam.figueLightenedSteps).forEach((figue, indFigue) => { // если фигура может сюда ходить, подсвечиваем поле в полной копии field

                if (figue === action.cell.cellFigue.figue) { // если название фигуры, на которую кликнули совпадает с названием фигуры в массиве проверки подсветки

                    Object.values(stateLocal.commonGameParam.figueLightenedSteps)[indFigue].forEach((item, ind) => {// массив объектов с полями, со смещением от фигуры, по которой кликнули

                        let isBreakRay = false // флаг прерывания луча проверки подсветки полей, если встретилась фигура, или вышли за пределы поля

                        item.forEach((itemRay, indRay) => {// item это луч для каждой фигуры, а itemRay - отдельная ячейка проверки. Если есть фигура в ячеке - луч должен прерываться

                            if (!isBreakRay) { // если прерывания луча еще не было

                                const totalRowInd = action.cell.rowInd + itemRay.rowInd// итоговый индекс ряда клетки возможной подсветки
                                    * actionFigueColorCoeff * player1ColorCoeff // доп коэффициенты только для пешек (цвет фигуры по которой кликнули и цвет выбранных в начале фигур)
                                const totalCollInd = action.cell.colInd + itemRay.collInd // итоговый индекс столбца клетки возможной подсветки

                                const isOutsideTheField = totalRowInd > 7 || totalRowInd < 0 || totalCollInd > 7 || totalCollInd < 0 // ячейка за пределами поля?
                                if (isOutsideTheField) { // прерывание цикла, если выходим за поле
                                    isBreakRay = true
                                    return
                                }

                                if (action.cell.cellFigue.figue === "pawn") { // если кликнули по пешке

                                    const isCellNotEmptyStraight1Row = stateLocal.field[totalRowInd][totalCollInd].cellFigue.figue !== 'empty' // ячейка не пустая прямо на 1 поле (с фигурой)
                                    const totalRowIndCoeff = totalRowInd + actionFigueColorCoeff * player1ColorCoeff // номер ряда с учетом коэффициентов
                                    const figueLocal = totalRowIndCoeff >=0 && totalRowIndCoeff <=7 && stateLocal.field[totalRowIndCoeff][totalCollInd].cellFigue.figue // фигура, что двигается
                                    const isCellNotEmptyStraight2Row =
                                        totalRowIndCoeff >= 0 // не выходим за поле
                                        && figueLocal !== 'empty' // ячейка не пустая прямо на 2 поля (с фигурой)

                                    if (!isCellNotEmptyStraight1Row) {
                                        stateLocal.field[totalRowInd][totalCollInd].isLightened = true // подсвечиваем пустую ячейку, куда фигура может ходить
                                        if (figueLocal && !isCellNotEmptyStraight2Row && action.cell.cellFigue.stepCount===0) { // если это первый ход пешки и ячейка на 2 поля вперед пусто, то
                                            stateLocal.field[totalRowIndCoeff][totalCollInd].isLightened = true // подсвечиваем пустую ячейку, куда фигура может ходить
                                        }
                                    }

                                    const isCellNotEmptyLeft = totalCollInd - 1 >= 0 && stateLocal.field[totalRowInd][totalCollInd - 1].cellFigue.figue !== 'empty' // ячейка не пустая слева (с фигурой)
                                    const isCellNotEmptyRight = totalCollInd + 1 <= 7 && stateLocal.field[totalRowInd][totalCollInd + 1].cellFigue.figue !== 'empty' // ячейка не пустая справа (с фигурой)

                                    const actionFigueColor = action.cell.cellFigue.color // цвет фигуры по которой кликнули

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
                                if (action.cell.cellFigue.figue !== "pawn") { // если кликнули не по пешке
                                    const isCellNotEmpty = stateLocal.field[totalRowInd][totalCollInd].cellFigue.figue !== 'empty' // ячейка не пустая (с фигурой)

                                    const actionFigueColor = action.cell.cellFigue.color // цвет фигуры по которой кликнули

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

            stateLocal.commonGameParam.onClickCell = action.cell

            ///////////////

            stateCopy = {
                ...stateLocal, // копия всего стейта
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
