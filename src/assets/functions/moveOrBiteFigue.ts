import {clearLightenedDarkened} from "./clearLightenedDarkened";
import {CelllType} from "../../components/common/types/commonTypes";
import {InitialStateFieldType} from "../../redux/field-reducer";
const {v4: uuidv4} = require('uuid');

export const moveOrBiteFigue = (state: InitialStateFieldType, cell: CelllType) => {
    const stateLocal: InitialStateFieldType = structuredClone(state) // полная копия стейта

    stateLocal.field.forEach((rowItem ) => { // пробегаем по всему field
        rowItem.forEach(cellItem => {
            if (cellItem.cellFigue.uuid === cell.cellFigue.uuid) { // если нашли ячейку для боя по ее ключу

                if (cellItem.cellFigue.figue !== "empty") {// если мы бьем фигуру, а не просто перемещаем в пустую ячейку
                    const figueColorIndex = cellItem.cellFigue.color === "white" ? "white" : "black" // в какой массив закинуть побитую фигуру
                    stateLocal.commonGameParam.beatenFigures[figueColorIndex].push(cell) // переносим побитую фигуру в массив побитых белых/черных
                }
                cellItem.cellFigue = {...stateLocal.commonGameParam.onClickCell.cellFigue} // копируем фигуру из onClickCell в ячейку, куда ходим (перемещение/побитие)
            }
        })
    })
    const rowIndToClear = stateLocal.commonGameParam.onClickCell.rowInd // индекс ряда для зачистик
    const colIndToClear = stateLocal.commonGameParam.onClickCell.colInd // индекс колонки для зачистки

    stateLocal.field[rowIndToClear][colIndToClear].cellFigue = { // зачиищаем ячейку, где раньше была фигура до удара
        "figue": "empty",
        "color": "unset",
        "uuid": uuidv4()// генерируем новый id для очищенной фигуры ячейки
    }
    stateLocal.field = clearLightenedDarkened(stateLocal.field) // очищаем все подсветки и затемнения
    stateLocal.commonGameParam.onClickCell = {} as CelllType // зачищаем onClickCell в стейте

    stateLocal.commonGameParam.currentStep = stateLocal.commonGameParam.currentStep === "whitePlayer"
        ? "blackPlayer"
        : "whitePlayer"
    return stateLocal

}
