export interface PaisFronteras {
    borders?: string[],
    name: string,
}
export interface PaisSmall {
    name: Name,
    cca3: string,
}


export interface Name {
    common:     string;
    official:   string;
    nativeName: { [key: string]: Translation };
}

export interface Translation {
    official: string;
    common:   string;
}