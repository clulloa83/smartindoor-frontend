export class Dispositivo {
    id: string;
    nombre?: string;
    icon?: string;
    ubicacion?: string;
    categoria?: string;
    tipos?: Array<string>;
    estado: boolean;
    
    constructor(){}
}
