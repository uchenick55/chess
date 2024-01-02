import {InferActionsTypes} from "./store-redux";
import {
    CommonGameParamType,
    ComThunkTp,
    FiedlType,
    RowType
} from "../components/common/types/commonTypes";

const SET_DIALOG_LIST = "myApp/dialog2-reducer/SET_DIALOG_LIST";

export const dialog2Actions = {
    /*
        getDialog2AllAC: (dialog2All: GetDialog2AllType) => {
            return {type: SET_DIALOG_LIST, dialog2All} as const
        },
        setMessagesNewerThen: (messagesNewerThen: Array<SendMessageType>, needToScrollBottom: boolean) => {
            return {type: SET_MESSAGES_NEWER_THEN, messagesNewerThen, needToScrollBottom} as const
        },
        setDialog2InitialState: () => {
            return {type: SET_DIALOG2_INITIALSTATE} as const
        },
        setD2Item: (d2Item: D2ItemType) => {
            return {type: SET_D2_ITEM, d2Item} as const
        },
        setMarkers: (markers: MarkersType) => {
            return {type: SET_MARKERS, markers} as const
        },*/
}


type Dialog2ActionsTypes =
    InferActionsTypes<typeof dialog2Actions>

const initialState = {
    commonGameParam: {
        fieldWidthHeight: 70 as number,
        fieldLeftPadding: 400 as number,
        fieldTopPadding: 40 as number,
        currentPlayer: "whitePlayer"
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
            {isLightened: false, cellFigue: {figue: "pawn", color: "black"}, cellColor: "black", cellAddress: "a7"},
            {isLightened: false, cellFigue: {figue: "pawn", color: "black"}, cellColor: "white", cellAddress: "b7"},
            {isLightened: false, cellFigue: {figue: "pawn", color: "black"}, cellColor: "black", cellAddress: "c7"},
            {isLightened: false, cellFigue: {figue: "pawn", color: "black"}, cellColor: "white", cellAddress: "d7"},
            {isLightened: false, cellFigue: {figue: "pawn", color: "black"}, cellColor: "black", cellAddress: "e7"},
            {isLightened: false, cellFigue: {figue: "pawn", color: "black"}, cellColor: "white", cellAddress: "f7"},
            {isLightened: false, cellFigue: {figue: "pawn", color: "black"}, cellColor: "black", cellAddress: "g7"},
            {isLightened: false, cellFigue: {figue: "pawn", color: "black"}, cellColor: "white", cellAddress: "h7"},
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
            {isLightened: false, cellFigue: {figue: "pawn", color: "white"}, cellColor: "white", cellAddress: "a2"},
            {isLightened: false, cellFigue: {figue: "pawn", color: "white"}, cellColor: "black", cellAddress: "b2"},
            {isLightened: false, cellFigue: {figue: "pawn", color: "white"}, cellColor: "white", cellAddress: "c2"},
            {isLightened: false, cellFigue: {figue: "pawn", color: "white"}, cellColor: "black", cellAddress: "d2"},
            {isLightened: false, cellFigue: {figue: "pawn", color: "white"}, cellColor: "white", cellAddress: "e2"},
            {isLightened: false, cellFigue: {figue: "pawn", color: "white"}, cellColor: "black", cellAddress: "f2"},
            {isLightened: false, cellFigue: {figue: "pawn", color: "white"}, cellColor: "white", cellAddress: "g2"},
            {isLightened: false, cellFigue: {figue: "pawn", color: "white"}, cellColor: "black", cellAddress: "h2"},
        ] as RowType,
        [
            {isLightened: false, cellFigue: {figue: "rook", color: "white"}, cellColor: "black", cellAddress: "a1"},
            {isLightened: false, cellFigue: {figue: "knight", color: "white"}, cellColor: "white", cellAddress: "b1"},
            {isLightened: false, cellFigue: {figue: "bishop", color: "white"}, cellColor: "black", cellAddress: "c1"},
            {isLightened: false, cellFigue: {figue: "king", color: "white"}, cellColor: "white", cellAddress: "d1"},
            {isLightened: false, cellFigue: {figue: "queen", color: "white"}, cellColor: "black", cellAddress: "e1"},
            {isLightened: false, cellFigue: {figue: "bishop", color: "white"}, cellColor: "white", cellAddress: "f1"},
            {isLightened: false, cellFigue: {figue: "knight", color: "white"}, cellColor: "black", cellAddress: "g1"},
            {isLightened: false, cellFigue: {figue: "rook", color: "white"}, cellColor: "white", cellAddress: "h1"},
        ] as RowType,

    ] as FiedlType,

}

type InitialStateDialog2Type = typeof initialState

const FieldReducer = (state: InitialStateDialog2Type = initialState, action: Dialog2ActionsTypes): InitialStateDialog2Type => {
    let stateCopy: InitialStateDialog2Type // объявлениечасти части стейта до изменения редьюсером
    switch (action.type) {
        case SET_DIALOG_LIST: // список всех диалогов
            const dialog2AllLocal: any = []
            const listUniqueDialog2Id: Array<number> = []
            stateCopy = {
                ...state,
            }
            return stateCopy

        default:
            return state
    }
}

type ThType = ComThunkTp<Dialog2ActionsTypes> // тип, выведенный из общего типа санок сс учетом локального типа AC

export default FieldReducer
