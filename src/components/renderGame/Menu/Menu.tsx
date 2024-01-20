import classes from "./menu.module.css"
import {useDispatch, useSelector} from "react-redux";
import {PlayerType} from "../../common/types/commonTypes";
import {GlobalStateType} from "../../../redux/store-redux";
import {fieldActions} from "../../../redux/field-reducer";
import blackRook from "../../../assets/svg/black-rook.svg"
import whiteRook from "../../../assets/svg/white-rook.svg"
import checkboxNotChoosen from "../../../assets/svg/checkboxNotChoosen.svg"
import checkboxChoosen from "../../../assets/svg/checkboxChoosen.svg"

const Menu: React.FC = () => {
    const player1Color: PlayerType = useSelector((state: GlobalStateType) => state.chess.commonGameParam.player1Color) // кто ходит первым
    const showMenu = useSelector((state: GlobalStateType) => state.chess.commonGameParam.showMenu) // нужно ли показывать меню
    const fieldWidthHeightLocal = useSelector((state: GlobalStateType) => state.chess.commonGameParam.fieldParams.fieldWidthHeight)

    const dispatch = useDispatch()

    return <div className={classes.menuCommon} style={{width: fieldWidthHeightLocal*8, height:fieldWidthHeightLocal*8 }}>
        <div className={classes.chooseWhooPlay}>Выбери, за кого играть</div>

        <div className={classes.radio}>
            <label className={classes.customRadio}>
                <input
                    type="radio"
                    name="site_name"
                    value="value"
                    onChange={() => {
                        dispatch(fieldActions.setFirstStepAC("whitePlayer"))
                    }}
                    checked={player1Color === "whitePlayer"}
                />

                <div>
                    <img src={whiteRook} alt="" className={classes.rook}/>
                    за белых

                </div>

            </label>
        </div>

        <div className={classes.radio}>
            <label className={classes.customRadio}>
                <input
                    type="radio"
                    name="site_name"
                    value="value"
                    onChange={() => {
                        dispatch(fieldActions.setFirstStepAC("blackPlayer"))
                    }}
                    checked={player1Color === "blackPlayer"}
                />
                <div>
                    <img src={blackRook} alt="" className={classes.rook}/>
                    за чёрных

                </div>
            </label>
        </div>
        <div className={classes.checkboxCommon} >
            <img src={player1Color==="unchecked" ?checkboxNotChoosen :checkboxChoosen} alt=""
                 className={player1Color==="unchecked"?classes.checkboxDisabled: classes.checkbox}
                onClick={()=>{
                    player1Color!=="unchecked" && dispatch(fieldActions.showMenuAC(false))
                }}
            />
        </div>

    </div>
}
export default Menu