export const panCardVisualizerEncode = (pan: string) => {
    let finalPan: string = "";
    let counter = 0;
    for (let i = 0; i < pan.length; i++, counter++) {
        if (counter > 3) {
            counter = 0;
            finalPan += " ";
        }
        if (i > 5 && i < 12)
            finalPan += "*"
        else
            finalPan += pan[i];
    }
    return finalPan;
}

export enum monedas {
    "DESCONOCIDA",
    "CUP",
    "CUC",
    "USD",
}

export const monedaCard = (pan: string): monedas => {
    switch (pan[2]) {
        case "0":
            switch (pan[3]) {
                case "0":
                    return monedas.CUC
                case "4":
                    return monedas.CUP;
                default:
                    return monedas.DESCONOCIDA
            }
        case "1":
            switch (pan[3]) {
                case "2":
                    return monedas.CUP;
                case "3":
                    return monedas.CUC;
                default:
                    return monedas.DESCONOCIDA
            }
        case "2":
            switch (pan[3]) {
                case "4":
                    return monedas.CUP;
                case "5":
                    return monedas.USD;
                default:
                    return monedas.DESCONOCIDA
            }
        default:
            return monedas.DESCONOCIDA;
    }
}

/**
 * @description Toma un numero de tarjeta que contenga espacios y los eliminas.
 * Tambien elimina si contiene algun caracter de `.` (punto)
 * @param numberCard
 */
export const cardNumberClear = (numberCard: any): string => {
    let orgCard = `${numberCard}`
    let initVal = ``;
    do {
        initVal = orgCard;
        orgCard = orgCard.replace(` `, ``)
        orgCard = orgCard.replace(`.`, ``)
    } while (orgCard !== initVal);
    return initVal;
};

/**
 * @description A partir de un numero de tarjeta que no contenga espacios ni caracteres raros devuelve
 * el numero de la tarjeta con los espacios cada cuatro numeros.
 * @description Recomendamos que antes de enviar un numero de tarjeta a este metodo lo envie al metodo
 * de cardNumberClear para obtener una numero de tarjeta limpio.
 * @param numberCard
 */
export const cardNumberReformat = (numberCard: any): string => {
    const initVal = `${numberCard}`;
    let endVal = ``;
    for (let i = 0; i < initVal.length; i++) {
        if (i % 4 === 0 && i !== 0 && initVal[i] !== " ")
            endVal += " ";
        endVal += initVal[i];
    }
    return endVal;
}

/**
 * @description Este metodo elimina de el nombre y los apellidos de una persona los dobles espacios
 * y lo pone a mayuscula.
 * @param nameCard
 */
export const cardNameClearReformat = (nameCard: any): string => {
    let orgCard = `${nameCard}`.toUpperCase()
    let initVal = ``;
    do {
        initVal = orgCard;
        orgCard = orgCard.replace(`  `, ` `)
    } while (orgCard !== initVal);
    return initVal;
};
