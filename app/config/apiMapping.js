// CONVENTION: must match model name, case sensitive
var apiMapping = {
    ControlledVocabulary: {
        all: {
            'endpoint': '/private/queue',
            'controller': 'cv',
            'method': 'all'
        },
        update: {
            'endpoint': '/private/queue',
            'controller': 'cv',
            'method': 'update'
        },
        listen: {
            'endpoint': '/channel',
            'controller': 'cv'
        }
    },
    Document: {
        instantiate: {
            'endpoint': '/private/queue', 
            'controller': 'document', 
            'method': 'get'
        },
        suggest: {
            'endpoint': '/private/queue',
            'controller': 'suggest'
        },
        page: {
            'endpoint': '/private/queue', 
            'controller': 'document', 
            'method': 'page',
        },
        update: {
            'endpoint': '/private/queue', 
            'controller': 'document', 
            'method': 'update',
        },
        save: {
            'endpoint': '/private/queue', 
            'controller': 'document', 
            'method': 'save',
        },
        push: {
            'endpoint': '/private/queue', 
            'controller': 'document', 
            'method': 'push',
        },
        listen: {
            'endpoint': '/channel', 
            'controller': 'document', 
        }
    },
    Metadata: {
        instantiate: {
            'endpoint': '/private/queue', 
            'controller': 'metadata', 
            'method': 'get'
        },
        all: {
            'endpoint': '/private/queue',
            'controller': 'metadata',
            'method': 'all'
        },
        unlock: {
            'endpoint': '/private/queue',
            'controller': 'metadata',
            'method': 'unlock'
        },
        export: {
            'endpoint': '/private/queue',
            'controller': 'metadata'
        },
        headers: {
            'endpoint': '/private/queue',
            'controller': 'metadata',
            'method': 'headers'
        },
        status: {
            'endpoint': '/private/queue',
            'controller': 'metadata',
            'method': 'status'
        },
        listen: {
            'endpoint': '/channel',
            'controller': 'metadata'
        }
    },
    Project: {
        all: {
            'endpoint': '/private/queue',
            'controller': 'project',
            'method': 'all'
        },
        listen: {
            'endpoint': '/channel',
            'controller': 'project'
        }
    },
    User: {
        instantiate: {
            'endpoint': '/private/queue', 
            'controller': 'user', 
            'method': 'credentials'
        },
        all: {
            'endpoint': '/private/queue',
            'controller': 'user',
            'method': 'all'
        },
        update: {
            'endpoint': '/private/queue',
            'controller': 'user',
            'method': 'update'
        },
        remove: {
            'endpoint': '/private/queue',
            'controller': 'user',
            'method': 'delete'
        },
        listen: {
            'endpoint': '/channel',
            'controller': 'user'
        }
    }
};
