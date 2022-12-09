import { Cultivo } from './cultivo';

export class Seguimiento {
    id: string;
    cultivo: Cultivo;
    observacion: string;
    fecha: Date;
    estado: boolean;
    capturas?: any[];
    sincronizado: boolean;

    constructor(){
        this.cultivo = new Cultivo();
    }
}
