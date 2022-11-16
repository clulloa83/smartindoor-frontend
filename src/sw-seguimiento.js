const DB_NAME = '_ionicstorage';
const STORE_NAME = '_ionickv';
const URL_BASE = 'http://localhost:8080';
// const URL_BASE = 'https://smartindoor.herokuapp.com';
const OBJ_USUARIO = 'usuario';
const OBJ_SEGUIMIENTOS = 'seguimientos';
const OBJ_SEGUIMIENTOS_SYNC = 'seguimientos-sync';

const getDataAndSend = async() => {

    let db;
    let usuario;
    let seguimientos;
    let seguimientosEliminar;

    return await new Promise((resolve, reject) => {

        return initDb()
        .then(result => {
            db = result;
            return getUsuario(db);
        })
        .then(result => {
            usuario = result;
            return getSeguimientos(db);
        })
        .then(result => {
            seguimientos = result;
            return sendData(usuario, seguimientos);
        })
        .then(result => {
            seguimientosEliminar = result;
            const promesas = [];
            seguimientosEliminar.forEach(s => {
                promesas.push(
                    eliminarSeguimientoPorIndice(s, seguimientos, db)
                );
            });
            return Promise.all(promesas);
        })
        .then(seguimientosSync => {

            const promesas = [];
            seguimientosSync.forEach(s => {
                agregarSincronizados(s, db)
            })
            return Promise.all(promesas);
        })
        .then(() => {
            console.log('sincronización correctamente ejecutada');
            resolve();
        })
        .catch((error) => {
            console.log('getDataAndSend error:', error);
            reject(error);
        });

    });

};

const initDb = async() => {
    
    return await new Promise((resolve, reject) => {

        try {

            const reqDB = indexedDB.open(DB_NAME);
            reqDB.onsuccess = (event) => {
                const db = event.target.result;
                resolve(db);
            };
            reqDB.onerror = (event) => {
                console.log('initDb promise onerror event', event);
                reject('initDb promise onerror');
            };            
        } catch (error) {
            reject(error);
        }

    });
   
};

const sendData = async(usuario, seguimientos) => {
    
    return await new Promise((resolve, reject) => {
        
        try {
            
            const seguimientosBorrar = [];

            seguimientos.forEach((seguimiento, indice) => {

                let form = {
                    cultivo: seguimiento.cultivo.id,
                    observacion: seguimiento.observacion,
                    fecha: seguimiento.fecha,
                };
                
                for (let i = 0; i < seguimiento.capturas.length; i++) {
                    const captura = seguimiento.capturas[i];
                    form[`capture${ i }`] = captura;
                };
                
                fetch(URL_BASE + '/api/seguimiento', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': usuario.token
                    },
                    body: JSON.stringify(form)
                });

                seguimientosBorrar.push(indice);

            });

            resolve(seguimientosBorrar);
        
        } catch (error) {
            console.log('onerror sendData, error:', error);
            reject(error);
        };
    
    });
};

const getUsuario = async(db) => {

    return await new Promise((resolve, reject) => {
        
        const objectStore = db.transaction([STORE_NAME], 'readwrite').objectStore(STORE_NAME);
        const usuarioStore = objectStore.get(OBJ_USUARIO);
        usuarioStore.onsuccess = function(event) {
            const usuario = event.target.result;
            resolve(usuario);
        };
        usuarioStore.onerror = (event) => {
            console.log('getUsuario onerror event', event);
            reject('getUsuario onerror');
        };

    });

};

const getSeguimientos = async(db) => {

    return await new Promise((resolve, reject) => {

        const objectStore = db.transaction([STORE_NAME], 'readwrite').objectStore(STORE_NAME);
        const seguimientosStore = objectStore.get(OBJ_SEGUIMIENTOS);
        seguimientosStore.onsuccess = function(event) {
            const seguimientos = event.target.result;
            resolve(seguimientos);
        };
        seguimientosStore.onerror = (event) => {
            console.log('getSeguimientos onerror event', event);
            reject('getSeguimientos onerror');
        };

    });

};

const eliminarSeguimientoPorIndice = async(indice, seguimientos, db) => {

    return await new Promise((resolve, reject) => {

        try {

            //obtiene el seguimiento para registrarlo en su storage sincronizados
            const seguimientoSync = seguimientos.find((s, i) => i === indice);

            //se filtra lista excluyendo el seguimiento sincronizado
            const seguimientosNew = seguimientos.filter((s,i) => i != indice);

            const objectStore = db.transaction([STORE_NAME], 'readwrite').objectStore(STORE_NAME);
            const objectStoreSeguimientoRequest = objectStore.get(OBJ_SEGUIMIENTOS);
            objectStoreSeguimientoRequest.onsuccess = () => {

                const updateSeguimientoRequest = objectStore.put(seguimientosNew, OBJ_SEGUIMIENTOS);
                updateSeguimientoRequest.onsuccess = () => {
                    resolve(seguimientoSync);
                };
                updateSeguimientoRequest.onerror = (event) => {
                    console.log(`updateSeguimientoRequest error agregar seguimiento a lista sincronizados`);
                    reject('error');
                };

            };
            objectStoreSeguimientoRequest.onerror = (event) => {
                console.log(`objectStoreSeguimientoRequest error al obtener seguimientos`);
                reject('error');
            };

        } catch (error) {
            console.log('eliminarSeguimientoPorIndice error', error);
            reject(error);
        };

    });

};

const agregarSincronizados = async(seguimiento, db) => {

    return await new Promise((resolve, reject) => {

        try {
            
            const objectStore = db.transaction([STORE_NAME], 'readwrite').objectStore(STORE_NAME);
            const objectStoreSeguimientoRequest = objectStore.get(OBJ_SEGUIMIENTOS_SYNC);
            objectStoreSeguimientoRequest.onsuccess = () => {
                
                const seguimientosSyncStore = objectStoreSeguimientoRequest.result;
                seguimientosSyncStore.push(seguimiento);

                const updateSeguimientoRequest = objectStore.put(seguimientosSyncStore, OBJ_SEGUIMIENTOS_SYNC);
                updateSeguimientoRequest.onsuccess = () => {
                    resolve();
                };
                updateSeguimientoRequest.onerror = (event) => {
                    console.log(`updateSeguimientoRequest error agregar seguimiento a lista sincronizados`);
                    reject('error');
                };
            };
            objectStoreSeguimientoRequest.onerror = (event) => {
                console.log(`objectStoreSeguimientoRequest error agregar seguimiento a lista sincronizados`);
                reject('error');
            };


        } catch (error) {
            console.log('agregarSincronizados error', error);
            reject('agregarSincronizados error');
        };

    });

};

