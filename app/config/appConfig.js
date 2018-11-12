var appConfig = {

    'version': 'metadataTool',

    'allowAnonymous': false,

    // Set this to the webService if mocking AuthService

    'authService': 'http://labs.library.tamu.edu/auth3',
    'webService': 'http://localhost:9001',
    'iiifService': 'http://localhost:9003',
    //If cantaloupeService is null, a simple image viewer will be used instead of the OpenSeaDragon viewer
    'cantaloupeService': 'http://localhost:8182/iiif/2/',

    'basePath': '/metadatatool',

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

    'contentMap': {"image": ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/svg", "image/bmp", "image/jp2", "image/jpx", "image/tif", "image/tiff"],"pdf": ["application/pdf"], "text": ["text/plain"]},

    // Set this to 'admin' or 'user' if using mock AuthService
    // otherwise set to null or false

    'mockRole': null
};
