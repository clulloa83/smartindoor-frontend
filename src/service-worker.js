importScripts('./ngsw-worker.js');
importScripts('./sw-seguimiento.js');

/**
 * arreglo de tags registrados en SW por sincronizar
 */
const TAGS_SYNC = ['sync-seguimiento',];

/**
 * evento de sincronización al reconectar la red
 */
self.addEventListener('sync', (event) => {

  if (TAGS_SYNC.includes(event.tag))
  {
    switch (event.tag) {
      case TAGS_SYNC[0]:
        event.waitUntil(getDataAndSend());
        break;
      default:
        break;
    }
  }

});
