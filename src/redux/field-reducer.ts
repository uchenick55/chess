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
import {checkLightenedOrHitCell} from "../assets/functions/checkLightenedOrHitCell";

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
            checkLightenedOrHitCell(action.cell, stateLocal)

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
