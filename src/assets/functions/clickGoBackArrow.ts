import {InitialStateFieldType} from "../../redux/field-reducer";
import {clearLightenedDarkened} from "./clearLightenedDarkened";

export const clickGoBackArrow = (state: InitialStateFieldType) => { // в функцию вынесли нажатие на кнопку шага назад

    const stateLocal = structuredClone(state) // полная копия стейта

    stateLocal.field = stateLocal.history.fieldHistory[stateLocal.history.fieldHistory.length-1] // взять последний элемент истории поля
    stateLocal.commonGameParam = stateLocal.history.commonGameParamHistory[stateLocal.history.commonGameParamHistory.length-1] // взять последний элемент истории параметров игры

    stateLocal.history.fieldHistory.pop() // удалить последний элемент истории поля
    stateLocal.history.commonGameParamHistory.pop() // удалить последний элемент истории параметров игры

    stateLocal.field = clearLightenedDarkened(stateLocal.field) // зачистка засветок и затемнений

    return stateLocal
}