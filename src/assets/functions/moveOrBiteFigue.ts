import {clearLightenedDarkened} from "./clearLightenedDarkened";
import {CelllType} from "../../components/common/types/commonTypes";
import {InitialStateFieldType} from "../../redux/field-reducer";
import {checkCheckMate} from "./checkCheckMate";
import {isKingCheckMateInitial} from "../constants/constants";

const {v4: uuidv4} = require('uuid');

export const moveOrBiteFigue = (state: InitialStateFieldType, cell: CelllType) => {

    if (cell.cellFigue.figue === "king") {
        return state
    }

    const stateLocal: InitialStateFieldType = structuredClone(state) // полная копия стейта

    stateLocal.history.fieldHistory.push(structuredClone(stateLocal.field)) // делаем копию field
    stateLocal.history.commonGameParamHistory.push(structuredClone((stateLocal.commonGameParam))) // архивируем общие параметры игры

    stateLocal.field.forEach((rowItem) => { // пробегаем по всему field
        rowItem.forEach(cellItem => {
            if (cellItem.cellFigue.uuid === cell.cellFigue.uuid) { // если нашли ячейку для боя/перемещения по ее ключу

                if (cellItem.cellFigue.figue !== "empty") {// если мы бьем фигуру, а не просто перемещаем в пустую ячейку
                    const figueColorIndex = cellItem.cellFigue.color === "white" ? "white" : "black" // в какой массив закинуть побитую фигуру
                    stateLocal.commonGameParam.beatenFigures[figueColorIndex].push(cell) // переносим побитую фигуру в массив побитых белых/черных
                }
                cellItem.cellFigue = {
                    ...stateLocal.commonGameParam.onClickCell.cellFigue,// копируем фигуру из onClickCell в ячейку, куда ходим (перемещение/побитие)
                    stepCount: state.commonGameParam.onClickCell.cellFigue.stepCount + 1, // увеличиваем счетчик ходов
                }
                if (cellItem.cellFigue.figue === "pawn") { // проверяем достижение пешкой противоположного края доски
                    if (cellItem.rowInd === 0 || cellItem.rowInd === 7) {
                        cellItem.cellFigue.pawnTransform = true // помечаем флаг трансформации пешки
                    }
                }

            }
        })
    })
    const rowIndToClear = stateLocal.commonGameParam.onClickCell.rowInd // индекс ряда для зачистик
    const colIndToClear = stateLocal.commonGameParam.onClickCell.colInd // индекс колонки для зачистки

    stateLocal.field[rowIndToClear][colIndToClear].cellFigue = { // зачиищаем ячейку, где раньше была фигура до удара/хода
        "figue": "empty",
        "color": "unset",
        "uuid": uuidv4(),// генерируем новый id для очищенной фигуры ячейки
        stepCount: 0,
        pawnTransform: false,
    }
    stateLocal.field = clearLightenedDarkened(stateLocal.field) // зачистка засветок и затемнений
    stateLocal.commonGameParam.onClickCell = {} as CelllType // зачищаем onClickCell в стейте

    stateLocal.commonGameParam.currentStep = stateLocal.commonGameParam.currentStep === "whitePlayer"
        ? "blackPlayer"
        : "whitePlayer"

    if (stateLocal.commonGameParam.showMenu) {
        stateLocal.commonGameParam.showMenu = false //скрытие меню выбора цвета фигур после первого хода
    }
    checkCheckMate(stateLocal)


    return stateLocal

}
