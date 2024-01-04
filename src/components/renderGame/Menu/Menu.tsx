import classes from "./menu.module.css"
import {useDispatch, useSelector} from "react-redux";
import { PlayerType} from "../../common/types/commonTypes";
import {GlobalStateType} from "../../../redux/store-redux";
import {fieldActions} from "../../../redux/field-reducer";

const Menu: React.FC = () => {
    const firstStep:PlayerType  = useSelector((state: GlobalStateType) => state.chess.commonGameParam.firstStep) // кто ходит первым

    const dispatch = useDispatch()

    return <div className={classes.menuCommon}>
        <div className={classes.chooseWhooPlay}>Выбери, за кого играть</div>

        <div className={classes.radio}>
            <label className={classes.customRadio}>
                <input
                    type="radio"
                    name="site_name"
                    value="value"
                    onChange={()=>{dispatch(fieldActions.setFirstStepAC("whitePlayer"))}}
                    checked={firstStep === "whitePlayer"}
                />

                    <div>за черных</div>
            </label>
        </div>

        <div className={classes.radio}>
            <label className={classes.customRadio}>
                <input
                    type="radio"
                    name="site_name"
                    value="value"
                    onChange={()=>{dispatch(fieldActions.setFirstStepAC("blackPlayer"))}}
                    checked={firstStep === "blackPlayer"}
                />
                    <div>за белых </div>
            </label>
        </div>

    </div>
}
export default Menu