import classes from "./pawnTransform.module.css"
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "../../redux/store-redux";
import blackKnightVal from "../../assets/svg/black-knight.svg"
import blackBishopVal from "../../assets/svg/black-bishop.svg"
import blackQueenVal from "../../assets/svg/black-queen.svg"
import blackRookVal from "../../assets/svg/black-rook.svg"
import whiteKnightVal from "../../assets/svg/white-knight.svg"
import whiteBishopVal from "../../assets/svg/white-bishop.svg"
import whiteQueenVal from "../../assets/svg/white-queen.svg"
import whiteRookVal from "../../assets/svg/white-rook.svg"
import {CelllType, FigueType} from "../common/types/commonTypes";
import {fieldActions} from "../../redux/field-reducer";

type PawnTransformType = {
    cell: CelllType
}

const PawnTransform: React.FC<PawnTransformType> = ({cell}) => {
    const fieldWidthHeightLocal = useSelector((state: GlobalStateType) => state.chess.commonGameParam.fieldParams.fieldWidthHeight)

    const dispatch = useDispatch()

    const whitePawnTransformObj = { // только белые фигуры на выбор
        knight: whiteKnightVal,
        bishop: whiteBishopVal,
        rook: whiteRookVal,
        queen: whiteQueenVal,
    }
    const blackPawnTransformObj = {// только черные фигуры на выбор
        knight: blackKnightVal,
        bishop: blackBishopVal,
        rook: blackRookVal,
        queen: blackQueenVal,
    }

    const currentFiguesObject = cell.cellFigue.color === "white" // какой объект используем, с белыми или черными?
        ? whitePawnTransformObj
        : blackPawnTransformObj

    return <div className={classes.commonPawnTransform} style={{ // общая дивка всплывашки при преобразовании пешки
        width: `${fieldWidthHeightLocal * 4.5}px`,
        height: `${fieldWidthHeightLocal * 1.5}px`,
        left: `-${fieldWidthHeightLocal * 2}px`,
        top: `-${fieldWidthHeightLocal * 0.25}px`,
    }}>
        {Object.values(currentFiguesObject).map((Item, ItemInd) => { // пробегаем массив фигур на замену пешки
            return <div key={ItemInd}>
                <img src={Item} alt="" className={classes.figueItem} style={{
                    width: `${fieldWidthHeightLocal}px`,
                    left: `${(ItemInd + 0.30) * fieldWidthHeightLocal}px`,
                    top: `${(0.20) * fieldWidthHeightLocal}px`,
                }}
                     onClick={() => {
                         console.log(Object.keys(currentFiguesObject)[ItemInd])
                         console.log(cell.cellFigue.uuid)
                         dispatch(fieldActions.setPawnTransformAC(
                             cell.cellFigue.uuid,
                             cell.cellFigue.color,
                             Object.keys(currentFiguesObject)[ItemInd] as FigueType
                             )
                         )
                         //Идем в стейт, проходим поле, находим по идентификатору фигуру и присваиваем ей новую фигуру
                     }}
                />
            </div>
        })}
    </div>
}
export default PawnTransform