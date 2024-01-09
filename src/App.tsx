import React, {useEffect} from 'react';
import RenderGame from "./components/renderGame/renderGame";
import {useDispatch} from "react-redux";
import {initialisedAppThunkCreator} from "./redux/field-reducer";
import {AppDispatch} from "./redux/store-redux";

const App = () => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(initialisedAppThunkCreator()) // запускаем инициализацию приложения
    }, [])//dispatch

    console.log("App")
    return <RenderGame/>
}

export default App;
