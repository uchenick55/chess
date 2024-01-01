import React from "react";
import {AppDispatch, GlobalStateType} from "../../redux/store-redux";
import {useDispatch, useSelector} from "react-redux";
import {FiedlType} from "../common/types/commonTypes";

const RenderGame: React.FC = (() => {
    const field: FiedlType = useSelector( (state: GlobalStateType) => state.chess.field )
    const dispatch = useDispatch<AppDispatch>();
    console.log(field)
    return <div>
            555
    </div>
})
export default  RenderGame;
