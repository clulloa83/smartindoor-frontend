import { Semilla } from './semilla';

export class Cultivo {
    id: string;
    usuario: string;
    semilla: Semilla;
    fecha: Date;
    activo: boolean;
    estado: boolean;

    constructor(){
        this.semilla = new Semilla();
    }
}
