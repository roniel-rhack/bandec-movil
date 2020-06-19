import {useEffect, useState} from "react";
import {Keyboard} from "react-native";

export interface useKeyboardHandleProps {
    keyboardOpen: boolean;
    removeListener: Function;
}

/**
 * @description Este hook permite capturar cuando el teclado se abre o cierra
 * @description Recomendamos que el componente o pantalla donde use este hook tenga la opcion unmountOnBlur: true
 */
const useKeyboardHandle = (): useKeyboardHandleProps => {
    const [keyboardOpen, setKeyboardOpen] = useState(false);

    const handleKeyboard = {
        open: () => setKeyboardOpen(true),
        close: () => setKeyboardOpen(false),
    };

    const removeListener = () => {
        Keyboard.removeListener("keyboardDidShow", handleKeyboard.open);
        Keyboard.removeListener("keyboardDidHide", handleKeyboard.close);
    };

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", handleKeyboard.open);
        Keyboard.addListener("keyboardDidHide", handleKeyboard.close);

        return removeListener;
    }, []);

    return {
        keyboardOpen,
        removeListener,
    };
};

export default useKeyboardHandle;