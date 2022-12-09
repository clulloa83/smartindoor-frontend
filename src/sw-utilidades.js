importScripts('./sw-url-api.js');

/*** obtiene conexión de store requerido de indexedDB
* @param {*} storeName nombre de store
* @returns retorna conexion db store
*/
const obtenerConexion = async () => {    
    return await new Promise((resolve, reject) => {
        try {

            const db_name = '_ionicstorage';

            const request = indexedDB.open(db_name);
            request.onsuccess = (event) => {
                const db = event.target.result;
                resolve(db);
            };

        } catch (error) {
            console.log('error', error);
            reject(error);
        }
    });
};

/**
* obtiene storeKey de store
* @param {*} storeName nombre de store
* @param {*} storeKey clave de valor store
* @returns retorna el storeKey de store
*/
const obtenerStore = async (storeKey) => {    
    const db = await obtenerConexion();
    const store = '_ionickv';

    return await new Promise((resolve, reject) => {
        try {

            const objectStore = db.transaction([store], 'readwrite').objectStore(store);
            const objectStoreRequest = objectStore.get(storeKey);
            objectStoreRequest.onsuccess = (event) => {
                const store = event.target.result;
                resolve(store);
            };
        } catch (error) {
            console.log('error', error);
            reject(error);
        }
    });
};

/**
* registra o actualiza en BD la observación del movimiento
* @param {*} seguimiento objeto movimiento con id y observaciones ingresada
* @param {*} token token de usuario logeado
* @param {*} endpoint url de endpoint api movimientos
* @returns 
*/
const registrarSeguimiento = async (seguimiento, token, endpoint) => {

    const URL = API.url + endpoint;

    const form = {
        cultivo: seguimiento.cultivo.id,
        observacion: seguimiento.observacion,
        fecha: seguimiento.fecha,
    };

    for (let i = 0; i < seguimiento.capturas.length; i++) {
        const captura = seguimiento.capturas[i];
        form[`capture${i}`] = captura;
    };

    return await new Promise((resolve, reject) => {

        try {

            fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(form)
            })
                .then(() => {
                    resolve({ ...seguimiento, sincronizado: true });
                });

        } catch (error) {
            console.log('error', error);
            reject(error);
        }

    });

};

const guardarSeguimientoSync = async (sincronizados, storeKey) => {

    const db = await obtenerConexion();
    const store = '_ionickv';

    return await new Promise((resolve, reject) => {
        try {

            const objectStore = db.transaction([store], 'readwrite').objectStore(store);
            const request = objectStore.get(storeKey);
            request.onsuccess = () => {

                const requestUpdate = objectStore.put(sincronizados, storeKey);
                requestUpdate.onsuccess = () => {
                    resolve();
                };
            };

        } catch (error) {
            console.log('error', error);
            reject(error);
        }
    });
};
