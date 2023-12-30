import {InferActionsTypes} from "./store-redux";
import {ComThunkTp} from "../components/common/types/commonTypes";
//import {apiDialog2} from "../components/api/api";
//import {ApiErrorMsgType, GetDialog2AllType, D2ItemType, SendMessageType} from "../components/api/apiTypes";
//import {ResultCodeEnum} from "../components/api/enum";
//import {appActions} from "./app-reducer";

const SET_DIALOG_LIST = "myApp/dialog2-reducer/SET_DIALOG_LIST";
const SET_MESSAGES_NEWER_THEN = "myApp/dialog2-reducer/SET_MESSAGES_NEWER_THEN";
const SET_DIALOG2_INITIALSTATE = "myApp/dialog2-reducer/SET_DIALOG2_INITIALSTATE";
const SET_D2_ITEM = "myApp/dialog2-reducer/SET_D2_ITEM";
const SET_MARKERS = "myApp/dialog2-reducer/SET_MARKERS";


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
    dialog2All: [] as any,
    messagesNewerThen: [] as any,
    d2Item: {} as any,
    apiErrorMsg: [] as any,
    markers: {
        straightFirstUploaded: false,
        dialogId: 0,
        dialog2FirstUploaded: false,
        needToScrollBottom: false
    } as MarkersType,
    listUniqueDialog2Id: [] as Array<number> // список уникальных id пользователей, с которыми начат диалог
}

type InitialStateDialog2Type = typeof initialState

const Dialog2Reducer = (state: InitialStateDialog2Type = initialState, action: Dialog2ActionsTypes): InitialStateDialog2Type => {
    let stateCopy: InitialStateDialog2Type // объявлениечасти части стейта до изменения редьюсером
    switch (action.type) {
        case SET_DIALOG_LIST: // список всех диалогов
            const dialog2AllLocal: any = []
            const listUniqueDialog2Id: Array<number> = []
            stateCopy = {
                ...state,
                dialog2All: dialog2AllLocal,
                listUniqueDialog2Id: listUniqueDialog2Id
            }
            return stateCopy
        case SET_MESSAGES_NEWER_THEN: // сообщения по выбранному диалогу новее определенной даты
            stateCopy = {
                ...state,
                messagesNewerThen: action.messagesNewerThen,
                markers: {...state.markers, needToScrollBottom: action.needToScrollBottom}
            }
            return stateCopy
        case SET_DIALOG2_INITIALSTATE: // занулить стейт при логауте
            return initialState
        case SET_D2_ITEM: // отфильтровать DialogItem из dialog2All
            stateCopy = {
                ...state,
                d2Item: action.d2Item
            }
            return stateCopy
        case SET_MARKERS: // записать вспомогательные маркеры
            stateCopy = {
                ...state,
                markers: action.markers
            }
            return stateCopy
        default:
            return state
    }
}

type ThType = ComThunkTp<Dialog2ActionsTypes> // тип, выведенный из общего типа санок сс учетом локального типа AC

export default Dialog2Reducer
