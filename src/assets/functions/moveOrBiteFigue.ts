import {clearLightenedDarkened} from "./clearLightenedDarkened";
import {
    CellAddressType,
    CelllType,
    ColorType,
    FigueType,
    FigueTypeCommon
} from "../../components/common/types/commonTypes";
import {InitialStateFieldType} from "../../redux/field-reducer";
import {checkCheckMate} from "./checkCheckMate";

const {v4: uuidv4} = require('uuid');

export const moveOrBiteFigue = (state: InitialStateFieldType, cell: CelllType) => {
    console.log(cell)
    if (cell.cellFigue.figue === "king") { // бить короля мы не можем
        return state // возврат входящего стейта
    }
    const stateLocal: InitialStateFieldType = structuredClone(state) // полная копия стейта

    const moveRook = (rooK: CellAddressType, rooVe: number) => {
        stateLocal.field.forEach(itemRow => {
            itemRow.forEach(itemCell => {
                if (itemCell.cellAddress === rooK) {
                    stateLocal.field[cell.rowInd][cell.colInd + rooVe].cellFigue = structuredClone(itemCell.cellFigue)
                    itemCell.cellFigue = {
                        uuid: "",
                        stepCount: 0,
                        color: "unset",
                        pawnTransform: false,
                        figue: "empty"
                    }
                }
            })
        })
    }

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
                if (cellItem.rookRove.rooK !== "") {
                    moveRook(cellItem.rookRove.rooK, cellItem.rookRove.rooVe)
                }

            }
        })
    })
    const rowIndToClear = stateLocal.commonGameParam.onClickCell.rowInd // индекс ряда для зачистки
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

    stateLocal.commonGameParam.currentStep = stateLocal.commonGameParam.currentStep === "whitePlayer" // передаем ход
        ? "blackPlayer"
        : "whitePlayer"

    if (stateLocal.commonGameParam.showMenu) {//скрытие меню выбора цвета фигур после первого хода
        stateLocal.commonGameParam.showMenu = false
    }
    checkCheckMate(stateLocal) // проверка шаха и мата


    return stateLocal

}
