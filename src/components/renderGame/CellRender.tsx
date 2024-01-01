import React from "react";
import {useSelector} from "react-redux";
import {GlobalStateType} from "../../redux/store-redux";
import {CelllType} from "../common/types/commonTypes";

type CellRenderType = {
    cell: CelllType,
    indCell: number
    i: number
}

const CellRender: React.FC<CellRenderType> = ({cell, indCell, i}) => {
    const commonFieldParam = useSelector((state: GlobalStateType) => state.chess.commonFieldParam)
    const fieldWHLocal = commonFieldParam.fieldWidthHeight
    return <div style={{
        width: `${fieldWHLocal}px`,
        height: `${fieldWHLocal}px`,
        position: "absolute",
        left: indCell * fieldWHLocal,
        top: i * fieldWHLocal,
        backgroundColor: cell.cellColor==="white"? "rgb(95,201,197)": "rgb(34,166,170)"
    }}>


    </div>
}
export default CellRender