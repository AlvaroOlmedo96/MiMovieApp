import React, { createContext, useEffect, useReducer } from 'react'
import { Appearance, AppState, useColorScheme } from 'react-native';
import { themeModeReducer, lightTheme, darkTheme } from './ThemeModeReducer';

interface ThemeModeContextProps{
    theme: any;
    setDarkMode: () => void;
    setLightMode: () => void;
}

export const ThemeModeContext = createContext({} as ThemeModeContextProps);

export const ThemeModeProvider = ({ children }: any) => {

    const colorScheme = useColorScheme();

    const [theme, dispatch] = useReducer(themeModeReducer, 
        ( Appearance.getColorScheme() === 'dark' ) ? darkTheme : lightTheme );

    useEffect(() => {
        console.log("USEEFFECT", theme)
        AppState.addEventListener( 'change', ( status ) => {
            if( status === 'active' ){
                ( Appearance.getColorScheme() === 'light') ? setLightMode() : setDarkMode();
            }
        });
        (colorScheme === 'light') ? setLightMode() : setDarkMode();
    }, [colorScheme]);


    const setDarkMode = () => {
        dispatch({ type: 'set_dark_theme'});
        console.log("setDarkMode");
    }
    const setLightMode = () => {
        dispatch({ type: 'set_light_theme'});
        console.log("setLightMode");
    }

    return (
        <ThemeModeContext.Provider value={{
            theme,
            setDarkMode,
            setLightMode
        }}>
            { children }
        </ThemeModeContext.Provider>
    )
}