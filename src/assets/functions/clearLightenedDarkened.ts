import {FiedType} from "../../components/common/types/commonTypes";

export const clearLightenedDarkened = (field: FiedType) => {

    field.forEach((ffcItem, ffcInd) => { // обнуление подсветки полей при каждом клике на фигуру
        ffcItem.forEach((cellItem, cellInd) => {
            cellItem.isLightened = false // обнуление подсветки полей при каждом клике на фигуру
            cellItem.isDarkened = false // обнуление подсветки полей при каждом клике на фигуру
        })
    })

    return field
}