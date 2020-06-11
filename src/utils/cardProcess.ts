export const panCardVisualizer = (pan: string) => {
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
    "CUP",
    "CUC",
    "USD",
    "DESCONOCIDA"
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