import {registerCodeModel} from "../reducers/ConfigsApp";

export const validateRegister = (msg: string): boolean => {
    return normalizeString(msg)
        .includes(normalizeString("Banco Bandec:  La operacion de registro fue completada."));
}

export const extractRegisterCode = (msg: string): registerCodeModel | null => {
    const valid = validateRegister(msg);
    if (!valid) return null;
    const msgNormaliced = normalizeString(msg);
    const code = msgNormaliced.split("CLAVE DE AUTENTICACION: ")[1].split(" EJEMPLO: ")[0]
        .replace(/\./g, '').replace(/\,/g, '')
        .replace(/\s{1,}/g, '');
    return {
        posPIN: parseInt(code[0]),
        coord1: code.slice(1, 3),
        coord2: code.slice(3, 5)
    }
}

export const normalizeString = (msg: string): string => {
    return msg.replace(/\n{1,}/g, ' ').replace(/\s{2,}/g, ' ').toUpperCase();
}

export const normalizeStringAvanced = (msg: string): string => {
    return msg
        .replace(/\.{1,}/g, ' ')
        .replace(/\,{1,}/g, ' ')
        .replace(/\:{1,}/g, ' ')
        .replace(/\;{1,}/g, ' ')
        .replace(/\n{1,}/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .toUpperCase();
}

export const validateAuth = (msg: string): boolean => {
    return normalizeString(msg).includes(normalizeString(
        `Usted se ha autenticado en la plataforma de pagos moviles, en el Banco Bandec`
    ))
}

export const extractCuenta = (msg: string): string | null => {
    // if (!validateAuth(msg)) return null;
    const norm = normalizeString(msg);
    const splitBy = [
        normalizeStringAvanced(
            "en el Banco Bandec con la cuenta"),
        normalizeStringAvanced(", puede comenzar a utilizar nuestros servicios ")
    ]
    const splEnd = norm.split(splitBy[0])[1].split(splitBy[1])[0];
    return normalizeStringAvanced(splEnd).replace(/\s{1,}/g, '');
}