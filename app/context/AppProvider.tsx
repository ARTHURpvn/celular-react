'use client'
import React, { createContext, use, useContext, useEffect, useReducer } from 'react'

interface CellphoneState {
    backgroundUrl: string
    navegation: string
    muted: boolean
    volume: number
    modelo: string
    theme: string
    backgroundChanged: boolean
    isAppClosing: boolean
    // config: any,
    scale: number
    card: string
}

interface CellphoneContext extends CellphoneState {
    dispatch: React.Dispatch<any>
}

const initialState: CellphoneState = {
    backgroundUrl: 'https://i.pinimg.com/originals/e2/7d/2e/e27d2ea5f95d58130e974554c3b8850b.jpg',
    navegation: 'Home',
    muted: false,
    volume: 0,
    modelo: 'Xiaomi',
    theme: 'dark',
    backgroundChanged: false,
    isAppClosing: false,
    scale: 2,
    card: 'https://i.postimg.cc/SR5c7TBK/Frame-21.png'
}

const AppContext = createContext<CellphoneContext | undefined>(undefined);

export const useCellphoneContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useCellphoneContext deve ser usado dentro de um AppProvider');
    }
    return context;
};

type Action =
    | { type: 'setBackgroundUrl'; payload: string }
    | { type: 'setNavegation'; payload: string }
    | { type: 'setMuted'; payload: boolean }
    | { type: 'setVolume'; payload: number }
    | { type: 'setModelo'; payload: string }
    | { type: 'setTheme'; payload: string }
    | { type: 'setBackgroundChanged'; payload: boolean }
    | { type: 'setIsAppClosing'; payload: boolean }
    | { type: 'setScale'; payload: number }
    | { type: 'setCard'; payload: string }

function reducer(state: CellphoneState, action: Action): CellphoneState {
    switch (action.type) {
        case 'setBackgroundUrl':
            return { ...state, backgroundUrl: action.payload }
        case 'setNavegation':
            return { ...state, navegation: action.payload }
        case 'setMuted':
            return { ...state, muted: action.payload }
        case 'setVolume':
            return { ...state, volume: action.payload }
        case 'setModelo':
            return { ...state, modelo: action.payload }
        case 'setTheme':
            return { ...state, theme: action.payload }
        case 'setBackgroundChanged':
            return { ...state, backgroundChanged: action.payload }
        case 'setIsAppClosing':
            return { ...state, isAppClosing: action.payload }
        case 'setScale':
            return { ...state, scale: action.payload }
        case 'setCard':
            return { ...state, card: action.payload }
        default:
            return state
    }
}

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    
    useEffect(() => {  
        const saveVolume = localStorage.getItem('volume');
        const storedMuted = localStorage.getItem('muted');
        if (saveVolume) {
            dispatch({ type: 'setVolume', payload: parseInt(saveVolume) });
            dispatch({ type: 'setMuted', payload: storedMuted === 'true' });
        }    
    }, [state.volume]);

    useEffect(() => {
        const saveCard = localStorage.getItem('card');
        if (saveCard) {
            dispatch({ type: 'setCard', payload: saveCard });
        }
    }, [state.card]);

    return (
        <AppContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};