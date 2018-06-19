var appConfig = {

    'version': 'metadataTool',

    'allowAnonymous': false,

    // Set this to the webService if mocking AuthService

    'authService': 'http://labs.library.tamu.edu/auth3',
    'webService': 'http://localhost:9001',

    'iiifService': 'http://localhost:9003',

    'storageType': 'session',

    'logging': {
        'log': true,
        'info': true,
        'warn': true,
        'error': true,
        'debug': true
    },

    'stompDebug': false,

    /*
    Determines the type of connection stomp will attempt to make with the service.
    TYPES:  websocket, xhr-streaming, xdr-streaming, eventsource, iframe-eventsource,
            htmlfile, iframe-htmlfile, xhr-polling, xdr-polling, iframe-xhr-polling,
            jsonp-polling
    */
    'sockJsConnectionType': ['websocket', 'iframe-eventsource', 'iframe-htmlfile', 'jsonp-polling'],

    // Set this to 'admin' or 'user' if using mock AuthService
    // otherwise set to null or false

    'mockRole': null
};
