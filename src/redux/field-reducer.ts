import {InferActionsTypes} from "./store-redux";
import {
    CommonGameParamType,
    ComThunkTp,
    FiedlType, OnClickFigueType, PlayerType,
    RowType
} from "../components/common/types/commonTypes";

const SET_ON_CLICK_FIGUE = "myApp/field-reducer/SET_ON_CLICK_FIGUE";
const SET_PLAYER1_COLOR = "myApp/field-reducer/SET_PLAYER1_COLOR";
const SHOW_MENU = "myApp/field-reducer/SHOW_MENU";
const SET_INITIALISED_APP = "myApp/field-reducer/SET_INITIALISED_APP";
const GET_UUID = "myApp/field-reducer/GET_UUID";


export const fieldActions = {
    setOnclickFigueAC: (onClickFigue: OnClickFigueType) => {// экшн креатор клика по фигуре для хода
        return {type: SET_ON_CLICK_FIGUE, onClickFigue} as const
    },
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
        onclickFigue: {},// фигура, по которой кликнули
        showMenu: true, // флаг, показать ли меню выбора цвета фигур в начале
        figueLightenedSteps: { // возможные комбинации подсветки в зависимости от имени фигуры
            "knight": [
                [{rowInd: -2, collInd: -1}],
                [{rowInd: -2, collInd: 1}],
                [{rowInd: 2, collInd: -1}],
                [{rowInd: 2, collInd: 1}],
                [{rowInd: -1, collInd: -2}],
                [{rowInd: -1, collInd: 2}],
                [{rowInd: 1, collInd: -2}],
                [{rowInd: 1, collInd: 2}]
            ],
            "bishop": [
                [{rowInd: -1, collInd: -1}, {rowInd: -2, collInd: -2}, {rowInd: -3, collInd: -3}, {
                    rowInd: -4,
                    collInd: -4
                }, {rowInd: -5, collInd: -5}, {rowInd: -6, collInd: -6}, {rowInd: -7, collInd: -7}],
                [{rowInd: -1, collInd: 1}, {rowInd: -2, collInd: 2}, {rowInd: -3, collInd: 3}, {
                    rowInd: -4,
                    collInd: 4
                }, {rowInd: -5, collInd: 5}, {rowInd: -6, collInd: 6}, {rowInd: -7, collInd: 7}],
                [{rowInd: 1, collInd: -1}, {rowInd: 2, collInd: -2}, {rowInd: 3, collInd: -3}, {
                    rowInd: 4,
                    collInd: -4
                }, {rowInd: 5, collInd: -5}, {rowInd: 6, collInd: -6}, {rowInd: 7, collInd: -7}],
                [{rowInd: 1, collInd: 1}, {rowInd: 2, collInd: 2}, {rowInd: 3, collInd: 3}, {
                    rowInd: 4,
                    collInd: 4
                }, {rowInd: 5, collInd: 5}, {rowInd: 6, collInd: 6}, {rowInd: 7, collInd: 7}]
            ],
            "rook": [
                [
                    {rowInd: 0, collInd: -1}, {rowInd: 0, collInd: -2}, {rowInd: 0, collInd: -3}, {
                    rowInd: 0,
                    collInd: -4
                },
                    {rowInd: 0, collInd: -5}, {rowInd: 0, collInd: -6}, {rowInd: 0, collInd: -7}],
                [{rowInd: 0, collInd: 1}, {rowInd: 0, collInd: 2}, {rowInd: 0, collInd: 3}, {
                    rowInd: 0,
                    collInd: 4
                }, {rowInd: 0, collInd: 5}, {rowInd: 0, collInd: 6}, {rowInd: 0, collInd: 7}],
                [{rowInd: -1, collInd: 0}, {rowInd: -2, collInd: 0}, {rowInd: -3, collInd: 0}, {
                    rowInd: -4,
                    collInd: 0
                }, {rowInd: -5, collInd: 0}, {rowInd: -6, collInd: 0}, {rowInd: -7, collInd: 0}],
                [{rowInd: 1, collInd: 0}, {rowInd: 2, collInd: 0}, {rowInd: 3, collInd: 0},
                    {
                        rowInd: 4,
                        collInd: 0
                    }, {rowInd: 5, collInd: 0}, {rowInd: 6, collInd: 0}, {rowInd: 7, collInd: 0},]
            ],
            "king": [
                [{rowInd: -1, collInd: -1}],
                [{rowInd: -1, collInd: 0}],
                [{rowInd: -1, collInd: 1}],
                [{rowInd: 0, collInd: -1}],
                [{rowInd: 0, collInd: 1}],
                [{rowInd: 1, collInd: -1}],
                [{rowInd: 1, collInd: 0}],
                [{rowInd: 1, collInd: 1}]
            ],
            "queen": [
                [{rowInd: -1, collInd: -1}, {rowInd: -2, collInd: -2}, {rowInd: -3, collInd: -3}, {
                    rowInd: -4,
                    collInd: -4
                }, {rowInd: -5, collInd: -5}, {rowInd: -6, collInd: -6}, {rowInd: -7, collInd: -7}],
                [{rowInd: -1, collInd: 1}, {rowInd: -2, collInd: 2}, {rowInd: -3, collInd: 3}, {
                    rowInd: -4,
                    collInd: 4
                }, {rowInd: -5, collInd: 5}, {rowInd: -6, collInd: 6}, {rowInd: -7, collInd: 7}],
                [{rowInd: 1, collInd: -1}, {rowInd: 2, collInd: -2}, {rowInd: 3, collInd: -3}, {
                    rowInd: 4,
                    collInd: -4
                }, {rowInd: 5, collInd: -5}, {rowInd: 6, collInd: -6}, {rowInd: 7, collInd: -7}],
                [{rowInd: 1, collInd: 1}, {rowInd: 2, collInd: 2}, {rowInd: 3, collInd: 3}, {
                    rowInd: 4,
                    collInd: 4
                }, {rowInd: 5, collInd: 5}, {rowInd: 6, collInd: 6}, {rowInd: 7, collInd: 7}],
                [{rowInd: 0, collInd: -1}, {rowInd: 0, collInd: -2}, {rowInd: 0, collInd: -3}, {
                    rowInd: 0,
                    collInd: -4
                }, {rowInd: 0, collInd: -5}, {rowInd: 0, collInd: -6}, {rowInd: 0, collInd: -7}],
                [{rowInd: 0, collInd: 1}, {rowInd: 0, collInd: 2}, {rowInd: 0, collInd: 3}, {
                    rowInd: 0,
                    collInd: 4
                }, {rowInd: 0, collInd: 5}, {rowInd: 0, collInd: 6}, {rowInd: 0, collInd: 7}],
                [{rowInd: -1, collInd: 0}, {rowInd: -2, collInd: 0}, {rowInd: -3, collInd: 0}, {
                    rowInd: -4,
                    collInd: 0
                }, {rowInd: -5, collInd: 0}, {rowInd: -6, collInd: 0}, {rowInd: -7, collInd: 0}],
                [{rowInd: 1, collInd: 0}, {rowInd: 2, collInd: 0}, {rowInd: 3, collInd: 0}, {
                    rowInd: 4,
                    collInd: 0
                }, {rowInd: 5, collInd: 0}, {rowInd: 6, collInd: 0}, {rowInd: 7, collInd: 0}],
            ],
            "pawn": [
                [{rowInd: 1, collInd: 0}]
            ]
        }

    } as CommonGameParamType,
    field: [
        [
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "rook", color: "black"},
                cellColor: "white",
                cellAddress: "a8"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "knight", color: "black"},
                cellColor: "black",
                cellAddress: "b8"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "bishop", color: "black"},
                cellColor: "white",
                cellAddress: "c8"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "queen", color: "black"},
                cellColor: "black",
                cellAddress: "d8"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "king", color: "black"},
                cellColor: "white",
                cellAddress: "e8"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "bishop", color: "black"},
                cellColor: "black",
                cellAddress: "f8"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "knight", color: "black"},
                cellColor: "white",
                cellAddress: "g8"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "rook", color: "black"},
                cellColor: "black",
                cellAddress: "h8"
            },
        ] as RowType,
        [
            {
                isLightened: false, isDarkened: false,
                cellFigue: {figue: "pawn", color: "black", isFirstStep: true},
                cellColor: "black",
                cellAddress: "a7"
            },
            {
                isLightened: false, isDarkened: false,
                cellFigue: {figue: "pawn", color: "black", isFirstStep: true},
                cellColor: "white",
                cellAddress: "b7"
            },
            {
                isLightened: false, isDarkened: false,
                cellFigue: {figue: "pawn", color: "black", isFirstStep: true},
                cellColor: "black",
                cellAddress: "c7"
            },
            {
                isLightened: false, isDarkened: false,
                cellFigue: {figue: "pawn", color: "black", isFirstStep: true},
                cellColor: "white",
                cellAddress: "d7"
            },
            {
                isLightened: false, isDarkened: false,
                cellFigue: {figue: "pawn", color: "black", isFirstStep: true},
                cellColor: "black",
                cellAddress: "e7"
            },
            {
                isLightened: false, isDarkened: false,
                cellFigue: {figue: "pawn", color: "black", isFirstStep: true},
                cellColor: "white",
                cellAddress: "f7"
            },
            {
                isLightened: false, isDarkened: false,
                cellFigue: {figue: "pawn", color: "black", isFirstStep: true},
                cellColor: "black",
                cellAddress: "g7"
            },
            {
                isLightened: false, isDarkened: false,
                cellFigue: {figue: "pawn", color: "black", isFirstStep: true},
                cellColor: "white",
                cellAddress: "h7"
            },
        ] as RowType,
        [
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "empty", color: "unset"},
                cellColor: "white",
                cellAddress: "a6"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "knight", color: "black"},
                cellColor: "black",
                cellAddress: "b6"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "knight", color: "black"},
                cellColor: "white",
                cellAddress: "c6"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "knight", color: "black"},
                cellColor: "black",
                cellAddress: "d6"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "knight", color: "white"},
                cellColor: "white",
                cellAddress: "e6"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "knight", color: "white"},
                cellColor: "black",
                cellAddress: "f6"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "knight", color: "white"},
                cellColor: "white",
                cellAddress: "g6"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "empty", color: "unset"},
                cellColor: "black",
                cellAddress: "h6"
            },
        ] as RowType,
        [
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "empty", color: "unset"},
                cellColor: "black",
                cellAddress: "a5"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "empty", color: "unset"},
                cellColor: "white",
                cellAddress: "b5"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "empty", color: "unset"},
                cellColor: "black",
                cellAddress: "c5"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "empty", color: "unset"},
                cellColor: "white",
                cellAddress: "d5"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "empty", color: "unset"},
                cellColor: "black",
                cellAddress: "e5"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "empty", color: "unset"},
                cellColor: "white",
                cellAddress: "f5"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "knight", color: "white"},
                cellColor: "black",
                cellAddress: "g5"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "knight", color: "black"},
                cellColor: "white",
                cellAddress: "h5"
            },
        ] as RowType,
        [
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "knight", color: "white"},
                cellColor: "white",
                cellAddress: "a4"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "knight", color: "black"},
                cellColor: "black",
                cellAddress: "b4"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "empty", color: "unset"},
                cellColor: "white",
                cellAddress: "c4"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "empty", color: "unset"},
                cellColor: "black",
                cellAddress: "d4"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "empty", color: "unset"},
                cellColor: "white",
                cellAddress: "e4"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "empty", color: "unset"},
                cellColor: "black",
                cellAddress: "f4"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "empty", color: "unset"},
                cellColor: "white",
                cellAddress: "g4"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "empty", color: "unset"},
                cellColor: "black",
                cellAddress: "h4"
            },
        ] as RowType,
        [
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "empty", color: "unset"},
                cellColor: "black",
                cellAddress: "a3"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "empty", color: "unset"},
                cellColor: "white",
                cellAddress: "b3"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "empty", color: "unset"},
                cellColor: "black",
                cellAddress: "c3"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "empty", color: "unset"},
                cellColor: "white",
                cellAddress: "d3"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "empty", color: "unset"},
                cellColor: "black",
                cellAddress: "e3"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "empty", color: "unset"},
                cellColor: "white",
                cellAddress: "f3"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "empty", color: "unset"},
                cellColor: "black",
                cellAddress: "g3"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "empty", color: "unset"},
                cellColor: "white",
                cellAddress: "h3"
            },
        ] as RowType,
        [
            {
                isLightened: false, isDarkened: false,
                cellFigue: {figue: "pawn", color: "white", isFirstStep: true},
                cellColor: "white",
                cellAddress: "a2"
            },
            {
                isLightened: false, isDarkened: false,
                cellFigue: {figue: "pawn", color: "white", isFirstStep: true},
                cellColor: "black",
                cellAddress: "b2"
            },
            {
                isLightened: false, isDarkened: false,
                cellFigue: {figue: "pawn", color: "white", isFirstStep: true},
                cellColor: "white",
                cellAddress: "c2"
            },
            {
                isLightened: false, isDarkened: false,
                cellFigue: {figue: "pawn", color: "white", isFirstStep: true},
                cellColor: "black",
                cellAddress: "d2"
            },
            {
                isLightened: false, isDarkened: false,
                cellFigue: {figue: "pawn", color: "white", isFirstStep: true},
                cellColor: "white",
                cellAddress: "e2"
            },
            {
                isLightened: false, isDarkened: false,
                cellFigue: {figue: "pawn", color: "white", isFirstStep: true},
                cellColor: "black",
                cellAddress: "f2"
            },
            {
                isLightened: false, isDarkened: false,
                cellFigue: {figue: "pawn", color: "white", isFirstStep: true},
                cellColor: "white",
                cellAddress: "g2"
            },
            {
                isLightened: false, isDarkened: false,
                cellFigue: {figue: "pawn", color: "white", isFirstStep: true},
                cellColor: "black",
                cellAddress: "h2"
            },
        ] as RowType,
        [
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "rook", color: "white"},
                cellColor: "black",
                cellAddress: "a1"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "knight", color: "white"},
                cellColor: "white",
                cellAddress: "b1"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "bishop", color: "white"},
                cellColor: "black",
                cellAddress: "c1"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "queen", color: "white"},
                cellColor: "white",
                cellAddress: "e1"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "king", color: "white"},
                cellColor: "black",
                cellAddress: "d1"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "bishop", color: "white"},
                cellColor: "white",
                cellAddress: "f1"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "knight", color: "white"},
                cellColor: "black",
                cellAddress: "g1"
            },
            {
                isLightened: false,
                isDarkened: false,
                cellFigue: {figue: "rook", color: "white"},
                cellColor: "white",
                cellAddress: "h1"
            },
        ] as RowType,

    ] as FiedlType,

}

type InitialStateFieldType = typeof initialState

const FieldReducer = (state: InitialStateFieldType = initialState, action: FieldActionsTypes): InitialStateFieldType => {
    let stateCopy: InitialStateFieldType // объявлениечасти части стейта до изменения редьюсером
    let fieldFullCopy: FiedlType
    switch (action.type) {
        case SET_ON_CLICK_FIGUE: // записать в стейт фигуру при клике и подсветить возможные ходы
            console.log(action.onClickFigue)
            stateCopy = {
                ...state,
                commonGameParam: {...state.commonGameParam, onclickFigue: action.onClickFigue}, // записать в стейт текущую ячейку, по чем кликнули
            }

            fieldFullCopy = structuredClone(state.field) // полная копия поля field

            fieldFullCopy.forEach((ffcItem, ffcInd) => { // обнуление подсветки полей при каждом клике на фигуру
                ffcItem.forEach((cellItem, cellInd) => {
                    cellItem.isLightened = false // обнуление подсветки полей при каждом клике на фигуру
                    cellItem.isDarkened = false // обнуление подсветки полей при каждом клике на фигуру
                })
            })

            const onClickRowInd = action.onClickFigue.rowInd // индекс ряда фигуры, по которой кликнули
            const onClickCollInd = action.onClickFigue.colInd // индекс колонки фигуры, по которой кликнули

            const figueFromAction = action.onClickFigue.cellFigue.figue // получаем фигуру из экшена

            let actionFigueColorCoeffForPawn = 1 // коэффициент цвета кликнутой фигуры для всех кроме пешек равен 1

            actionFigueColorCoeffForPawn = action.onClickFigue.cellFigue.figue !== "empty" //если поле содержит фигуру
            && figueFromAction === "pawn" // только для пешек, по которым кликнули
            && action.onClickFigue.cellFigue.color === "white"
                ? -1// разное направление для светлых и темных пешек, по которым кликнули
                : 1

            let player1ColorCoeffForPawn = 1 // коэффициент цвета выбранных в начале фигур для всех кроме пешек равен 1

            player1ColorCoeffForPawn = state.commonGameParam.player1Color === "whitePlayer" // если выбраны белые фигуры
            && figueFromAction === "pawn" // только для пешек
                ? 1// разное направление для светлых и темных пешек в зависимости от выбора в начале игры
                : -1

            Object.keys(stateCopy.commonGameParam.figueLightenedSteps).forEach((figue, indFigue) => { // если фигура может сюда ходить, подсвечиваем поле в полной копии field

                if (figue === action.onClickFigue.cellFigue.figue) { // если название фигуры, на которую кликнули совпадает с названием фигуры в массиве проверки подсветки

                    Object.values(stateCopy.commonGameParam.figueLightenedSteps)[indFigue].forEach((item, ind) => {// массив объектов с полями, со смещением от фигуры, по которой кликнули

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

                                if (action.onClickFigue.cellFigue.figue === "pawn") { // если кликнули по пешке

                                    const isCellNotEmptyStraight1Row = fieldFullCopy[totalRowInd][totalCollInd].cellFigue.figue !== 'empty' // ячейка не пустая прямо на 1 поле (с фигурой)
                                    const isCellNotEmptyStraight2Row =
                                        totalRowInd + 1 * actionFigueColorCoeffForPawn * player1ColorCoeffForPawn >= 0 //проверяем непустое поле перед пешкой в зависимости от выбора цвета фигур в начале и цвета пешки, по которой клинкули
                                        && fieldFullCopy[totalRowInd + 1 * actionFigueColorCoeffForPawn * player1ColorCoeffForPawn][totalCollInd].cellFigue.figue !== 'empty' // ячейка не пустая прямо на 2 поля (с фигурой)

                                    if (!isCellNotEmptyStraight1Row) {
                                        fieldFullCopy[totalRowInd][totalCollInd].isLightened = true // подсвечиваем пустую ячейку, куда фигура может ходить
                                        if (!isCellNotEmptyStraight2Row && action.onClickFigue.cellFigue.isFirstStep) { // если это первый ход пешки и ячейка на 2 поля вперед пусто, то
                                            fieldFullCopy[totalRowInd + 1 * actionFigueColorCoeffForPawn * player1ColorCoeffForPawn][totalCollInd].isLightened = true // подсвечиваем пустую ячейку, куда фигура может ходить
                                        }
                                    }

                                    const isCellNotEmptyLeft = totalCollInd - 1 >= 0 && fieldFullCopy[totalRowInd][totalCollInd - 1].cellFigue.figue !== 'empty' // ячейка не пустая слева (с фигурой)
                                    const isCellNotEmptyRight = totalCollInd + 1 <= 7 && fieldFullCopy[totalRowInd][totalCollInd + 1].cellFigue.figue !== 'empty' // ячейка не пустая справа (с фигурой)

                                    const actionFigueColor = action.onClickFigue.cellFigue.color // цвет фигуры по которой кликнули

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
                                if (action.onClickFigue.cellFigue.figue !== "pawn") { // если кликнули не по пешке
                                    const isCellNotEmpty = fieldFullCopy[totalRowInd][totalCollInd].cellFigue.figue !== 'empty' // ячейка не пустая (с фигурой)

                                    const actionFigueColor = action.onClickFigue.cellFigue.color // цвет фигуры по которой кликнули

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

            stateCopy = { // доюавляем в итоговый стейт поля с подсветкой
                ...stateCopy,
                field: fieldFullCopy // добавляем ячейки с подсветкой возможных ходов на поле
            }

            return stateCopy
        case SET_PLAYER1_COLOR: // установить, кто ходит первым (белые/черные)
            const fieldReversed = structuredClone(state.field) // полная копия поля field

            const reverseFieldFn = () => {
                fieldReversed.reverse() // инвертируем все ряды
                fieldReversed.forEach((f: RowType) => { // проходим по каждому ряду, и оборачиваем его
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

            stateCopy = {
                ...state,
                commonGameParam: {...state.commonGameParam, player1Color: action.player1Color},
                field: fieldReversed

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
            const { v4: uuidv4 } = require('uuid');

            fieldFullCopy = structuredClone(state.field) // полная копия поля field
            fieldFullCopy.forEach((rowItem, indItem) => {
                rowItem.forEach((cellItem, cellInd) => {
                    cellItem.cellFigue.uuid = uuidv4()
                })
            })
            stateCopy = {
                ...state, // копия всего стейта
                field: fieldFullCopy, // смена флага инициализации приложения на true
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
