import React from "react";
import {AppDispatch, GlobalStateType} from "../../redux/store-redux";
import {useDispatch, useSelector} from "react-redux";
import {FiedlType} from "../common/types/commonTypes";
import classes from '../renderGame/renderGame.module.css'

const RenderGame: React.FC = (() => {
    const field: FiedlType = useSelector( (state: GlobalStateType) => state.chess.field )
    const dispatch = useDispatch<AppDispatch>();
    console.log(field)
    return <div>
        {field.map((f, i)=>{
            console.log(f)
            return <div key={i}>
                {f.map((cell, indCell)=>{
                    console.log(cell)
                    return <div className={ cell.cellColor==="white"? classes.cellWhite: classes.cellBlack}>

                    </div>
                })}

            </div>
        })}
    </div>
})
export default  RenderGame;
