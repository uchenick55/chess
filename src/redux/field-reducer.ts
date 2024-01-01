import {InferActionsTypes} from "./store-redux";
import {ComThunkTp, FiedlType, RowType} from "../components/common/types/commonTypes";
//import {apiDialog2} from "../components/api/api";
//import {ApiErrorMsgType, GetDialog2AllType, D2ItemType, SendMessageType} from "../components/api/apiTypes";
//import {ResultCodeEnum} from "../components/api/enum";
//import {appActions} from "./app-reducer";

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
//   | InferActionsTypes<typeof appActions>


export type MarkersType = {
    straightFirstUploaded: boolean, // является ли эта загрузка прямой по ссылке, (или F5)
    dialogId: number, // маркер id диалога
    dialog2FirstUploaded: boolean, // маркер первой загрузки
    needToScrollBottom: boolean // нужно ли прокрутить список сообщений
}
const initialState = {
    commonFieldParam: {
        fieldWidthHeight: 70 as number,
        leftPadding: 100 as number,
        topPadding: 100 as number,
    },
    field: [
        [
            {isLightened: false, cellFigura: {figura:  "rook", color: "black"}, cellColor: "white", cellAddress: "a8" },
            {isLightened: false, cellFigura: {figura: "knight", color: "black"}, cellColor: "black", cellAddress: "b8" },
            {isLightened: false, cellFigura: {figura: "bishop", color: "black"}, cellColor: "white", cellAddress: "c8" },
            {isLightened: false, cellFigura: {figura: "queen", color: "black"}, cellColor: "black", cellAddress: "d8" },
            {isLightened: false, cellFigura: {figura: "king", color: "black"}, cellColor: "white", cellAddress: "e8" },
            {isLightened: false, cellFigura: {figura: "bishop", color: "black"}, cellColor: "black", cellAddress: "f8" },
            {isLightened: false, cellFigura: {figura: "knight", color: "black"}, cellColor: "white", cellAddress: "g8" },
            {isLightened: false, cellFigura: {figura: "rook", color: "black"}, cellColor: "black", cellAddress: "h8" },
        ] as RowType,
        [
            {isLightened: false, cellFigura: {figura: "pawn", color: "black"}, cellColor: "black", cellAddress: "a7" },
            {isLightened: false, cellFigura: {figura: "pawn", color: "black"}, cellColor: "white", cellAddress: "b7" },
            {isLightened: false, cellFigura: {figura: "pawn", color: "black"}, cellColor: "black", cellAddress: "c7" },
            {isLightened: false, cellFigura: {figura: "pawn", color: "black"}, cellColor: "white", cellAddress: "d7" },
            {isLightened: false, cellFigura: {figura: "pawn", color: "black"}, cellColor: "black", cellAddress: "e7" },
            {isLightened: false, cellFigura: {figura: "pawn", color: "black"}, cellColor: "white", cellAddress: "f7" },
            {isLightened: false, cellFigura: {figura: "pawn", color: "black"}, cellColor: "black", cellAddress: "g7" },
            {isLightened: false, cellFigura: {figura: "pawn", color: "black"}, cellColor: "white", cellAddress: "h7" },
        ] as RowType,
        [
            {isLightened: false, cellFigura: "empty", cellColor: "white", cellAddress: "a6" },
            {isLightened: false, cellFigura: "empty", cellColor: "black", cellAddress: "b6" },
            {isLightened: false, cellFigura: "empty", cellColor: "white", cellAddress: "c6" },
            {isLightened: false, cellFigura: "empty", cellColor: "black", cellAddress: "d6" },
            {isLightened: false, cellFigura: "empty", cellColor: "white", cellAddress: "e6" },
            {isLightened: false, cellFigura: "empty", cellColor: "black", cellAddress: "f6" },
            {isLightened: false, cellFigura: "empty", cellColor: "white", cellAddress: "g6" },
            {isLightened: false, cellFigura: "empty", cellColor: "black", cellAddress: "h6" },
        ] as RowType,
        [
            {isLightened: false, cellFigura: "empty", cellColor: "black", cellAddress: "a5" },
            {isLightened: false, cellFigura: "empty", cellColor: "white", cellAddress: "b5" },
            {isLightened: false, cellFigura: "empty", cellColor: "black", cellAddress: "c5" },
            {isLightened: false, cellFigura: "empty", cellColor: "white", cellAddress: "d5" },
            {isLightened: false, cellFigura: "empty", cellColor: "black", cellAddress: "e5" },
            {isLightened: false, cellFigura: "empty", cellColor: "white", cellAddress: "f5" },
            {isLightened: false, cellFigura: "empty", cellColor: "black", cellAddress: "g5" },
            {isLightened: false, cellFigura: "empty", cellColor: "white", cellAddress: "h5" },
        ] as RowType,
        [
            {isLightened: false, cellFigura: "empty", cellColor: "white", cellAddress: "a4" },
            {isLightened: false, cellFigura: "empty", cellColor: "black", cellAddress: "b4" },
            {isLightened: false, cellFigura: "empty", cellColor: "white", cellAddress: "c4" },
            {isLightened: false, cellFigura: "empty", cellColor: "black", cellAddress: "d4" },
            {isLightened: false, cellFigura: "empty", cellColor: "white", cellAddress: "e4" },
            {isLightened: false, cellFigura: "empty", cellColor: "black", cellAddress: "f4" },
            {isLightened: false, cellFigura: "empty", cellColor: "white", cellAddress: "g4" },
            {isLightened: false, cellFigura: "empty", cellColor: "black", cellAddress: "h4" },
        ] as RowType,
        [
            {isLightened: false, cellFigura: "empty", cellColor: "black", cellAddress: "a3" },
            {isLightened: false, cellFigura: "empty", cellColor: "white", cellAddress: "b3" },
            {isLightened: false, cellFigura: "empty", cellColor: "black", cellAddress: "c3" },
            {isLightened: false, cellFigura: "empty", cellColor: "white", cellAddress: "d3" },
            {isLightened: false, cellFigura: "empty", cellColor: "black", cellAddress: "e3" },
            {isLightened: false, cellFigura: "empty", cellColor: "white", cellAddress: "f3" },
            {isLightened: false, cellFigura: "empty", cellColor: "black", cellAddress: "g3" },
            {isLightened: false, cellFigura: "empty", cellColor: "white", cellAddress: "h3" },
        ] as RowType,
        [
            {isLightened: false, cellFigura: {figura: "pawn", color: "white"}, cellColor: "white", cellAddress: "a2" },
            {isLightened: false, cellFigura: {figura: "pawn", color: "white"}, cellColor: "black", cellAddress: "b2" },
            {isLightened: false, cellFigura: {figura: "pawn", color: "white"}, cellColor: "white", cellAddress: "c2" },
            {isLightened: false, cellFigura: {figura: "pawn", color: "white"}, cellColor: "black", cellAddress: "d2" },
            {isLightened: false, cellFigura: {figura: "pawn", color: "white"}, cellColor: "white", cellAddress: "e2" },
            {isLightened: false, cellFigura: {figura: "pawn", color: "white"}, cellColor: "black", cellAddress: "f2" },
            {isLightened: false, cellFigura: {figura: "pawn", color: "white"}, cellColor: "white", cellAddress: "g2" },
            {isLightened: false, cellFigura: {figura: "pawn", color: "white"}, cellColor: "black", cellAddress: "h2"  },
        ] as RowType,
        [
            {isLightened: false, cellFigura: {figura: "rook", color: "black"}, cellColor: "black", cellAddress: "a1" },
            {isLightened: false, cellFigura: {figura: "knight", color: "black"}, cellColor: "white", cellAddress: "b1" },
            {isLightened: false, cellFigura: {figura: "bishop", color: "black"}, cellColor: "black", cellAddress: "c1" },
            {isLightened: false, cellFigura: {figura: "king", color: "black"}, cellColor: "white", cellAddress: "d1" },
            {isLightened: false, cellFigura: {figura: "queen", color: "black"}, cellColor: "black", cellAddress: "e1" },
            {isLightened: false, cellFigura: {figura: "bishop", color: "black"}, cellColor: "white", cellAddress: "f1" },
            {isLightened: false, cellFigura: {figura: "knight", color: "black"}, cellColor: "black", cellAddress: "g1" },
            {isLightened: false, cellFigura: {figura: "rook", color: "black"}, cellColor: "white", cellAddress: "h1" },
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
