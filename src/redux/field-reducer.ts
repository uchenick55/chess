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
                {rowInd: 0, collInd: -1},  {rowInd: 0, collInd: 0}, {rowInd: 0, collInd: 1},
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
            "pawn" : [
                {rowInd: 0, collInd: -1},{rowInd: 0, collInd: -2}
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
            {isLightened: false, cellFigue: {figue: "pawn", color: "black", isFirstStep: true}, cellColor: "black", cellAddress: "a7"},
            {isLightened: false, cellFigue: {figue: "pawn", color: "black", isFirstStep: true}, cellColor: "white", cellAddress: "b7"},
            {isLightened: false, cellFigue: {figue: "pawn", color: "black", isFirstStep: true}, cellColor: "black", cellAddress: "c7"},
            {isLightened: false, cellFigue: {figue: "pawn", color: "black", isFirstStep: true}, cellColor: "white", cellAddress: "d7"},
            {isLightened: false, cellFigue: {figue: "pawn", color: "black", isFirstStep: true}, cellColor: "black", cellAddress: "e7"},
            {isLightened: false, cellFigue: {figue: "pawn", color: "black", isFirstStep: true}, cellColor: "white", cellAddress: "f7"},
            {isLightened: false, cellFigue: {figue: "pawn", color: "black", isFirstStep: true}, cellColor: "black", cellAddress: "g7"},
            {isLightened: false, cellFigue: {figue: "pawn", color: "black", isFirstStep: true}, cellColor: "white", cellAddress: "h7"},
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
            {isLightened: false, cellFigue: {figue: "pawn", color: "white", isFirstStep: true}, cellColor: "white", cellAddress: "a2"},
            {isLightened: false, cellFigue: {figue: "pawn", color: "white", isFirstStep: true}, cellColor: "black", cellAddress: "b2"},
            {isLightened: false, cellFigue: {figue: "pawn", color: "white", isFirstStep: true}, cellColor: "white", cellAddress: "c2"},
            {isLightened: false, cellFigue: {figue: "pawn", color: "white", isFirstStep: true}, cellColor: "black", cellAddress: "d2"},
            {isLightened: false, cellFigue: {figue: "pawn", color: "white", isFirstStep: true}, cellColor: "white", cellAddress: "e2"},
            {isLightened: false, cellFigue: {figue: "pawn", color: "white", isFirstStep: true}, cellColor: "black", cellAddress: "f2"},
            {isLightened: false, cellFigue: {figue: "pawn", color: "white", isFirstStep: true}, cellColor: "white", cellAddress: "g2"},
            {isLightened: false, cellFigue: {figue: "pawn", color: "white", isFirstStep: true}, cellColor: "black", cellAddress: "h2"},
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
    switch (action.type) {
        case SET_ON_CLICK_FIGUE: // задать ячейку при клике в стейт
            stateCopy = {
                ...state,
                commonGameParam: {...state.commonGameParam, onclickFigue: action.onClickFigue } // записать в стейт текущую ячейку, по чем кликнули
            }
            Object.keys(stateCopy.commonGameParam.figueLightenedSteps).forEach((figue, indFigue)=>{
                if (action.onClickFigue.cellFigue!=="empty" && figue===action.onClickFigue.cellFigue.figue) { // если название фигуры, как которую кликнули совпадает с названием фигуры в массиве проверки подсветки
                    console.log(figue)
                    console.log(Object.values(stateCopy.commonGameParam.figueLightenedSteps)[indFigue]) // массив объектов с полями, со смещением
                    Object.values(stateCopy.commonGameParam.figueLightenedSteps)[indFigue].forEach((item, ind )=>{
                     //  console.log(item)

                    })
                }
            })
         //   const src={ Object.values(state.commonGameParam.figueLightenedSteps)[Object.keys(state.commonGameParam.figueLightenedSteps).indexOf("knight")]}
            // srcLocal - составить ключ по которому ищем название ключа рисунка в массиве из объекта всех фигур
            // по этому ключу находим индекс картнки в массиве, полученном из объекта всех картинок
            // по индексу получаем сам рисунок и подставляем в поле (отрисовываем)

            return stateCopy
        case SET_FIRST_STEP: // установить, кто ходит первым (белые/черные)
            const fieldReversed = structuredClone(state.field) // полная копия поля field
            fieldReversed.reverse() // инвертируем все ряды
            fieldReversed.forEach((f:RowType ) => { // проходим по каждому ряду, и оборачиваем его
                f.reverse()
            })
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
