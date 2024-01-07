import {InferActionsTypes} from "./store-redux";
import {
    CommonGameParamType,
    ComThunkTp,
    FiedlType, FigueLightenedStepsType, OnClickFigueType, PlayerType,
    RowType
} from "../components/common/types/commonTypes";

const SET_ON_CLICK_FIGUE = "myApp/field-reducer/SET_ON_CLICK_FIGUE";
const SET_FIRST_STEP = "myApp/field-reducer/SET_FIRST_STEP";
const SHOW_MENU = "myApp/field-reducer/SHOW_MENU";

export const fieldActions = {
    setOnclickFigueAC: (onClickFigue: OnClickFigueType) => {
        return { type: SET_ON_CLICK_FIGUE, onClickFigue} as const
    },
    setFirstStepAC: (firstStep: PlayerType) => {
        return { type: SET_FIRST_STEP, firstStep} as const
    },
    showMenuAC: (showMenu: boolean) => {
        return { type: SHOW_MENU, showMenu} as const
    }
}


type FieldActionsTypes =
    InferActionsTypes<typeof fieldActions>

const initialState = {
    commonGameParam: {
        fieldWidthHeight: 55 as number,
        fieldLeftPadding: 400 as number,
        fieldTopPadding: 20 as number,
        currentStep: "whitePlayer",
        firstStep: "unchecked",
        onclickFigue: {},
        showMenu: true,
        figueLightenedSteps: {
            "knight": [
                {rowInd: -2, collInd: -1}, {rowInd: -2, collInd: 1}, {rowInd: 2, collInd: -1}, {rowInd: 2, collInd: 1},
                {rowInd: -1, collInd: -2}, {rowInd: -1, collInd: 2}, {rowInd: 1, collInd: -2}, {rowInd: 1, collInd: 2}
            ],
            "bishop": [
                {rowInd: -1, collInd: -1}, {rowInd: -2, collInd: -2}, {rowInd: -3, collInd: -3}, {rowInd: -4, collInd: -4}, {rowInd: -5, collInd: -5},{rowInd: -6, collInd: -6},{rowInd: -7, collInd: -7},
                {rowInd: -1, collInd: 1},  {rowInd: -2, collInd: 2},  {rowInd: -3, collInd: 3},  {rowInd: -4, collInd: 4},  {rowInd: -5, collInd: 5}, {rowInd: -6, collInd: 6}, {rowInd: -7, collInd: 7},
                {rowInd: 1, collInd: -1},  {rowInd: 2, collInd: -2},  {rowInd: 3, collInd: -3},  {rowInd: 4, collInd: -4},  {rowInd: 5, collInd: -5}, {rowInd: 6, collInd: -6}, {rowInd: 7, collInd: -7},
                {rowInd: 1, collInd: 1},   {rowInd: 2, collInd: 2},   {rowInd: 3, collInd: 3},   {rowInd: 4, collInd: 4},   {rowInd: 5, collInd: 5},  {rowInd: 6, collInd: 6},  {rowInd: 7, collInd: 7},
            ],
            "rook": [
                {rowInd: 0, collInd: -1},{rowInd: 0, collInd: -2},{rowInd: 0, collInd: -3},{rowInd: 0, collInd: -4},{rowInd: 0, collInd: -5},{rowInd: 0, collInd: -6},{rowInd: 0, collInd: -7},
                {rowInd: 0, collInd: 1}, {rowInd: 0, collInd: 2}, {rowInd: 0, collInd: 3}, {rowInd: 0, collInd: 4}, {rowInd: 0, collInd: 5}, {rowInd: 0, collInd: 6}, {rowInd: 0, collInd: 7},
                {rowInd: -1, collInd: 0},{rowInd: -2, collInd: 0},{rowInd: -3, collInd: 0},{rowInd: -4, collInd: 0},{rowInd: -5, collInd: 0},{rowInd: -6, collInd: 0},{rowInd: -7, collInd: 0},
                {rowInd: 1, collInd: 0}, {rowInd: 2, collInd: 0}, {rowInd: 3, collInd: 0}, {rowInd: 4, collInd: 0}, {rowInd: 5, collInd: 0}, {rowInd: 6, collInd: 0}, {rowInd: 7, collInd: 0},
            ],
            "king": [
                {rowInd: -1, collInd: -1}, {rowInd: -1, collInd: 0},{rowInd: -1, collInd: 1},
                {rowInd: 0, collInd: -1}, {rowInd: 0, collInd: 1},
                {rowInd: 1, collInd: -1},  {rowInd: 1, collInd: 0}, {rowInd: 1, collInd: 1},
            ],
            "queen": [
                {rowInd: -1, collInd: -1}, {rowInd: -2, collInd: -2}, {rowInd: -3, collInd: -3}, {rowInd: -4, collInd: -4}, {rowInd: -5, collInd: -5},{rowInd: -6, collInd: -6},{rowInd: -7, collInd: -7},
                {rowInd: -1, collInd: 1},  {rowInd: -2, collInd: 2},  {rowInd: -3, collInd: 3},  {rowInd: -4, collInd: 4},  {rowInd: -5, collInd: 5}, {rowInd: -6, collInd: 6}, {rowInd: -7, collInd: 7},
                {rowInd: 1, collInd: -1},  {rowInd: 2, collInd: -2},  {rowInd: 3, collInd: -3},  {rowInd: 4, collInd: -4},  {rowInd: 5, collInd: -5}, {rowInd: 6, collInd: -6}, {rowInd: 7, collInd: -7},
                {rowInd: 1, collInd: 1},   {rowInd: 2, collInd: 2},   {rowInd: 3, collInd: 3},   {rowInd: 4, collInd: 4},   {rowInd: 5, collInd: 5},  {rowInd: 6, collInd: 6},  {rowInd: 7, collInd: 7},
                {rowInd: 0, collInd: -1},{rowInd: 0, collInd: -2},{rowInd: 0, collInd: -3},{rowInd: 0, collInd: -4},{rowInd: 0, collInd: -5},{rowInd: 0, collInd: -6},{rowInd: 0, collInd: -7},
                {rowInd: 0, collInd: 1}, {rowInd: 0, collInd: 2}, {rowInd: 0, collInd: 3}, {rowInd: 0, collInd: 4}, {rowInd: 0, collInd: 5}, {rowInd: 0, collInd: 6}, {rowInd: 0, collInd: 7},
                {rowInd: -1, collInd: 0},{rowInd: -2, collInd: 0},{rowInd: -3, collInd: 0},{rowInd: -4, collInd: 0},{rowInd: -5, collInd: 0},{rowInd: -6, collInd: 0},{rowInd: -7, collInd: 0},
                {rowInd: 1, collInd: 0}, {rowInd: 2, collInd: 0}, {rowInd: 3, collInd: 0}, {rowInd: 4, collInd: 0}, {rowInd: 5, collInd: 0}, {rowInd: 6, collInd: 0}, {rowInd: 7, collInd: 0},
            ],
            "pawnWhite" : [
                {rowInd: 1, collInd: 0},{rowInd: 2, collInd: 0}
            ],
            "pawnBlack" : [
                {rowInd: -1, collInd: 0},{rowInd: -2, collInd: 0}
            ]
}

} as CommonGameParamType,
    field: [
        [
            {isLightened: false, cellFigue: {figue: "rook", color: "black"}, cellColor: "white", cellAddress: "a8"},
            {isLightened: false, cellFigue: {figue: "knight", color: "black"}, cellColor: "black", cellAddress: "b8"},
            {isLightened: false, cellFigue: {figue: "bishop", color: "black"}, cellColor: "white", cellAddress: "c8"},
            {isLightened: false, cellFigue: {figue: "queen", color: "black"}, cellColor: "black", cellAddress: "d8"},
            {isLightened: false, cellFigue: {figue: "king", color: "black"}, cellColor: "white", cellAddress: "e8"},
            {isLightened: false, cellFigue: {figue: "bishop", color: "black"}, cellColor: "black", cellAddress: "f8"},
            {isLightened: false, cellFigue: {figue: "knight", color: "black"}, cellColor: "white", cellAddress: "g8"},
            {isLightened: false, cellFigue: {figue: "rook", color: "black"}, cellColor: "black", cellAddress: "h8"},
        ] as RowType,
        [
            {isLightened: false, cellFigue: {figue: "pawnBlack", color: "black", isFirstStep: true}, cellColor: "black", cellAddress: "a7"},
            {isLightened: false, cellFigue: {figue: "pawnBlack", color: "black", isFirstStep: true}, cellColor: "white", cellAddress: "b7"},
            {isLightened: false, cellFigue: {figue: "pawnBlack", color: "black", isFirstStep: true}, cellColor: "black", cellAddress: "c7"},
            {isLightened: false, cellFigue: {figue: "pawnBlack", color: "black", isFirstStep: true}, cellColor: "white", cellAddress: "d7"},
            {isLightened: false, cellFigue: {figue: "pawnBlack", color: "black", isFirstStep: true}, cellColor: "black", cellAddress: "e7"},
            {isLightened: false, cellFigue: {figue: "pawnBlack", color: "black", isFirstStep: true}, cellColor: "white", cellAddress: "f7"},
            {isLightened: false, cellFigue: {figue: "pawnBlack", color: "black", isFirstStep: true}, cellColor: "black", cellAddress: "g7"},
            {isLightened: false, cellFigue: {figue: "pawnBlack", color: "black", isFirstStep: true}, cellColor: "white", cellAddress: "h7"},
        ] as RowType,
        [
            {isLightened: false, cellFigue: "empty", cellColor: "white", cellAddress: "a6"},
            {isLightened: false, cellFigue: "empty", cellColor: "black", cellAddress: "b6"},
            {isLightened: false, cellFigue: "empty", cellColor: "white", cellAddress: "c6"},
            {isLightened: false, cellFigue: "empty", cellColor: "black", cellAddress: "d6"},
            {isLightened: false, cellFigue: "empty", cellColor: "white", cellAddress: "e6"},
            {isLightened: false, cellFigue: "empty", cellColor: "black", cellAddress: "f6"},
            {isLightened: false, cellFigue: "empty", cellColor: "white", cellAddress: "g6"},
            {isLightened: false, cellFigue: "empty", cellColor: "black", cellAddress: "h6"},
        ] as RowType,
        [
            {isLightened: false, cellFigue: "empty", cellColor: "black", cellAddress: "a5"},
            {isLightened: false, cellFigue: "empty", cellColor: "white", cellAddress: "b5"},
            {isLightened: false, cellFigue: "empty", cellColor: "black", cellAddress: "c5"},
            {isLightened: false, cellFigue: "empty", cellColor: "white", cellAddress: "d5"},
            {isLightened: false, cellFigue: "empty", cellColor: "black", cellAddress: "e5"},
            {isLightened: false, cellFigue: "empty", cellColor: "white", cellAddress: "f5"},
            {isLightened: false, cellFigue: "empty", cellColor: "black", cellAddress: "g5"},
            {isLightened: false, cellFigue: "empty", cellColor: "white", cellAddress: "h5"},
        ] as RowType,
        [
            {isLightened: false, cellFigue: "empty", cellColor: "white", cellAddress: "a4"},
            {isLightened: false, cellFigue: "empty", cellColor: "black", cellAddress: "b4"},
            {isLightened: false, cellFigue: "empty", cellColor: "white", cellAddress: "c4"},
            {isLightened: false, cellFigue: "empty", cellColor: "black", cellAddress: "d4"},
            {isLightened: false, cellFigue: "empty", cellColor: "white", cellAddress: "e4"},
            {isLightened: false, cellFigue: "empty", cellColor: "black", cellAddress: "f4"},
            {isLightened: false, cellFigue: "empty", cellColor: "white", cellAddress: "g4"},
            {isLightened: false, cellFigue: "empty", cellColor: "black", cellAddress: "h4"},
        ] as RowType,
        [
            {isLightened: false, cellFigue: "empty", cellColor: "black", cellAddress: "a3"},
            {isLightened: false, cellFigue: "empty", cellColor: "white", cellAddress: "b3"},
            {isLightened: false, cellFigue: "empty", cellColor: "black", cellAddress: "c3"},
            {isLightened: false, cellFigue: "empty", cellColor: "white", cellAddress: "d3"},
            {isLightened: false, cellFigue: "empty", cellColor: "black", cellAddress: "e3"},
            {isLightened: false, cellFigue: "empty", cellColor: "white", cellAddress: "f3"},
            {isLightened: false, cellFigue: "empty", cellColor: "black", cellAddress: "g3"},
            {isLightened: false, cellFigue: "empty", cellColor: "white", cellAddress: "h3"},
        ] as RowType,
        [
            {isLightened: false, cellFigue: {figue: "pawnWhite", color: "white", isFirstStep: true}, cellColor: "white", cellAddress: "a2"},
            {isLightened: false, cellFigue: {figue: "pawnWhite", color: "white", isFirstStep: true}, cellColor: "black", cellAddress: "b2"},
            {isLightened: false, cellFigue: {figue: "pawnWhite", color: "white", isFirstStep: true}, cellColor: "white", cellAddress: "c2"},
            {isLightened: false, cellFigue: {figue: "pawnWhite", color: "white", isFirstStep: true}, cellColor: "black", cellAddress: "d2"},
            {isLightened: false, cellFigue: {figue: "pawnWhite", color: "white", isFirstStep: true}, cellColor: "white", cellAddress: "e2"},
            {isLightened: false, cellFigue: {figue: "pawnWhite", color: "white", isFirstStep: true}, cellColor: "black", cellAddress: "f2"},
            {isLightened: false, cellFigue: {figue: "pawnWhite", color: "white", isFirstStep: true}, cellColor: "white", cellAddress: "g2"},
            {isLightened: false, cellFigue: {figue: "pawnWhite", color: "white", isFirstStep: true}, cellColor: "black", cellAddress: "h2"},
        ] as RowType,
        [
            {isLightened: false, cellFigue: {figue: "rook", color: "white"}, cellColor: "black", cellAddress: "a1"},
            {isLightened: false, cellFigue: {figue: "knight", color: "white"}, cellColor: "white", cellAddress: "b1"},
            {isLightened: false, cellFigue: {figue: "bishop", color: "white"}, cellColor: "black", cellAddress: "c1"},
            {isLightened: false, cellFigue: {figue: "queen", color: "white"}, cellColor: "white", cellAddress: "e1"},
            {isLightened: false, cellFigue: {figue: "king", color: "white"}, cellColor: "black", cellAddress: "d1"},
            {isLightened: false, cellFigue: {figue: "bishop", color: "white"}, cellColor: "white", cellAddress: "f1"},
            {isLightened: false, cellFigue: {figue: "knight", color: "white"}, cellColor: "black", cellAddress: "g1"},
            {isLightened: false, cellFigue: {figue: "rook", color: "white"}, cellColor: "white", cellAddress: "h1"},
        ] as RowType,

    ] as FiedlType,

}

type InitialStateFieldType = typeof initialState

const FieldReducer = (state: InitialStateFieldType = initialState, action: FieldActionsTypes): InitialStateFieldType => {
    let stateCopy: InitialStateFieldType // объявлениечасти части стейта до изменения редьюсером
    let fieldFullCopy: FiedlType
    switch (action.type) {
        case SET_ON_CLICK_FIGUE: // записать в стейт фигуру при клике и подсветить возможные ходы

            stateCopy = {
                ...state,
                commonGameParam: {...state.commonGameParam, onclickFigue: action.onClickFigue }, // записать в стейт текущую ячейку, по чем кликнули
            }

            fieldFullCopy = structuredClone(state.field) // полная копия поля field

            fieldFullCopy.forEach((ffcItem, ffcInd )=> { // обнуление подсветки полей при каждом клике на фигуру
                ffcItem.forEach((cellItem, cellInd)=>{
                   cellItem.isLightened = false // обнуление подсветки полей при каждом клике на фигуру
                })
            })

            const onClickRowInd = action.onClickFigue.rowInd // индекс ряда фигуры, по которой кликнули
            const onClickCollInd = action.onClickFigue.colInd // индекс колонки фигуры, по которой кликнули

            const figueFromAction = action.onClickFigue.cellFigue!=="empty" && action.onClickFigue.cellFigue.figue

            Object.keys(stateCopy.commonGameParam.figueLightenedSteps).forEach((figue, indFigue)=>{ // если фигура может сюда ходить, подсвечиваем поле в полной копии field
                if (action.onClickFigue.cellFigue!=="empty" && figue===action.onClickFigue.cellFigue.figue) { // если название фигуры, как которую кликнули совпадает с названием фигуры в массиве проверки подсветки

                    Object.values(stateCopy.commonGameParam.figueLightenedSteps)[indFigue].forEach((item, ind )=>{// массив объектов с полями, со смещением от фигуры, по которой кликнули

                        const totalRowInd = onClickRowInd + item.rowInd // итоговый индекс ряда клетки возможной подсветки
                        const totalCollInd = onClickCollInd + item.collInd // итоговый индекс столбца клетки возможной подсветки

                        //if (totalRowInd > 7 || totalRowInd <0 || totalCollInd> 7 || totalCollInd <0 || fieldFullCopy[totalRowInd][totalCollInd].cellFigue !=='empty' ) { // прерывание цикла, если выходим за поле, или клетка занята фигурой
                        if (totalRowInd > 7 || totalRowInd <0 || totalCollInd> 7 || totalCollInd <0 ) { // прерывание цикла, если выходим за поле, или клетка занята фигурой
                            console.log("totalRowInd оr totalCollInd break", totalRowInd, totalCollInd)
                            return
                        }
                            fieldFullCopy[totalRowInd][totalCollInd].isLightened=true // подсвечиваем пустую ячейку, куда фигура может ходить

                    })
                }
            })

            stateCopy = { // доюавляем в итоговый стейт поля с подсветкой
                ...stateCopy,
                field: fieldFullCopy // добавляем ячейки с подсветкой возможных ходов на поле
            }

            return stateCopy
        case SET_FIRST_STEP: // установить, кто ходит первым (белые/черные)
            const fieldReversed = structuredClone(state.field) // полная копия поля field

            const reverseFieldFn = () => {
                fieldReversed.reverse() // инвертируем все ряды
                fieldReversed.forEach((f:RowType ) => { // проходим по каждому ряду, и оборачиваем его
                    f.reverse()
                })
            }
            if (state.commonGameParam.firstStep === "unchecked") { // первый ход и выбраны не белые
                if (action.firstStep !== "whitePlayer") {
                    reverseFieldFn()
                }
            } else if (action.firstStep !== state.commonGameParam.firstStep) {
                reverseFieldFn()
            }

            stateCopy = {
                ...state,
                commonGameParam: {...state.commonGameParam, firstStep: action.firstStep},
                field: fieldReversed

            }
            return stateCopy
        case SHOW_MENU: // показать/скрыть меню
            stateCopy = {
                ...state,
                commonGameParam: {...state.commonGameParam, showMenu: action.showMenu},
            }
            return stateCopy

        default:
            return state
    }
}

type ThType = ComThunkTp<FieldActionsTypes> // тип, выведенный из общего типа санок сс учетом локального типа AC

export default FieldReducer
