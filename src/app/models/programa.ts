import { Dispositivo } from './dispositivo';

export class Programa {
    
    id: string;
    dispositivo: Dispositivo;
    accion: string;
    hora: string;
    dias: Array<string>;
    activo?: boolean;
    estado?: boolean;

    constructor(){
        this.dispositivo = new Dispositivo();
    };
}
