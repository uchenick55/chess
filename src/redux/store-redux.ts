import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {thunk} from 'redux-thunk'; // thunkMiddleWare позволяет диспатчить санки помимо экшенов дл обновления стейта

import FieldReducer from "./field-reducer"

const reducers = combineReducers({ // объединяем стейт редьюсеров в один объект store
    chess: FieldReducer, // стейт диалог2

});

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// @ts-ignore
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(thunk)
));

type ReducersType = typeof reducers
export type GlobalStateType = ReturnType<ReducersType> // глобальный тип стейта

//https://habr.com/ru/companies/alfa/articles/452620/ + https://www.youtube.com/watch?v=2yJXFMqEbJs&list=PLcvhF2Wqh7DM3z1XqMw0kPuxpbyMo3HvN&index=9&t=870s
//Конструкция, позволяющая автоматически получать общий тип, основываясь на объекте из ActionCreator для каждого редьюсера
type PropertiesTypes<T>= T extends {[key:string]: infer U}? U : never
//определяем тип переменной T = если переменная T является объектом {}, у которой ключ key является строкой (setStatus)
// например setStatus: (newStatus: string) => { return {type: SET_STATUS, newStatus} as const},
// то определяем тип экшн креатора (infer U) и возвращаем определенный тип, иначе ничего не возвращаем (never)

export type InferActionsTypes<T extends {[key:string]: (...args: any) => any} > = ReturnType<PropertiesTypes<T>>
// теперь нужно определить тип экшнркеаторов (U). Ты уточняем, что T это объект, в ключе которого строка,
// а в значении функция, котороая может принмать в виде аргументов что угодно, и возвращать что угодною.
//Мы пробегаем по объекту, и если ключи отличаются (а они отличаются в любом случае), опрределяем тип значений ъ
// (функций экшнкреаторов) и добавляем в общий тип. Его по итогу и ретурним

// @ts-ignore
window.store = store; // возможность смотреть стор через консоль

export type AppDispatch = typeof store.dispatch;

export default store

export const getState = () => store.getState() // получаем и экспортируем стейт

export const getDispatch = () => store.dispatch // получаем и экспортируем dispatch


