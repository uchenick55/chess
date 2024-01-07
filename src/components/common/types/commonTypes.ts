import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {GlobalStateType} from "../../../redux/store-redux";

export type FigueType = { // тип фигуры
    figue: "rook" | "knight" | "bishop" | 'king' | "queen" | "pawn", // все возможные фигуры
    color: "white" | "black" // цвет фигуры
    isFirstStep?: boolean
}

type CellAddressType = // возможные варианты ячеек
    "a8" | "b8" | "c8" | "d8" | "e8" | "f8" | "g8" | "h8" |
    "a7" | "b7" | "c7" | "d7" | "e7" | "f7" | "g7" | "h7" |
    "a6" | "b6" | "c6" | "d6" | "e6" | "f6" | "g6" | "h6" |
    "a5" | "b5" | "c5" | "d5" | "e5" | "f5" | "g5" | "h5" |
    "a4" | "b4" | "c4" | "d4" | "e4" | "f4" | "g4" | "h4" |
    "a3" | "b3" | "c3" | "d3" | "e3" | "f3" | "g3" | "h3" |
    "a2" | "b2" | "c2" | "d2" | "e2" | "f2" | "g2" | "h2" |
    "a1" | "b1" | "c1" | "d1" | "e1" | "f1" | "g1" | "h1"

export type CelllType = { // тип ячейки
    isLightened: boolean, // ячейка подсвечена?
    cellFigue: FigueType | "empty", // тип фигуры - либо фигура, либо пустая ячейка
    cellColor: "white" | "black", // цвет ячейки
    cellAddress: CellAddressType // адрес ячейки
}

export type OnClickFigueType = { // фигура, по которой кликнули
    cellFigue: FigueType | "empty", // либо сама фигура, либо пустое поле (на пустое поле не реагирует)
    rowInd: number, // индес ряда
    colInd: number // индекс колонки
    cellAddress: CellAddressType
}

export type RowType = [CelllType, CelllType, CelllType, CelllType, CelllType, CelllType, CelllType, CelllType]

export type FiedlType = [RowType, RowType, RowType, RowType, RowType, RowType, RowType, RowType]

export type ComThunkTp<A extends Action> = ThunkAction<void,    // санка ничего не возвращает
    GlobalStateType,    // глобальный стейт из redux
    unknown,    // нет доп параметров
    A // все типы ActionCreator
    >
export type PlayerType =    "whitePlayer" | "blackPlayer" | "unchecked"

export type CommonGameParamType = {
    fieldParams: {
        fieldWidthHeight: number,
    },
    currentStep: PlayerType,
    player1Color: PlayerType,
    onclickFigue: OnClickFigueType,
    showMenu: boolean
    figueLightenedSteps: FigueLightenedStepsType
}

export type FigueLightenedStepsType = {
    "knight": [
        { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number },
        { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }
    ],
    "bishop": [
        { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number },
        { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number },
        { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number },
        { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number },
    ],
    "rook": [
        { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number },
        { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number },
        { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number },
        { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number },
    ],
    "king": [
        { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number },
        { rowInd: number, collInd: number }, { rowInd: number, collInd: number },
        { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number },
    ],
    "queen": [
        { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number },
        { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number },
        { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number },
        { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number },
        { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number },
        { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number },
        { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number },
        { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number }, { rowInd: number, collInd: number },
    ],
    "pawnWhite" : [
        { rowInd: number, collInd: number }, { rowInd: number, collInd: number }
    ],
    "pawnBlack" : [
        { rowInd: number, collInd: number }, { rowInd: number, collInd: number }
    ],
    "pawn" : [
        { rowInd: number, collInd: number }, { rowInd: number, collInd: number }
    ]

}