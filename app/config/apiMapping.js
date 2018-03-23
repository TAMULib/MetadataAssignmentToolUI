// CONVENTION: must match model name, case sensitive
var apiMapping = {
    ControlledVocabulary: {
        channel: '/channel/cv',
        all: {
            'endpoint': '/private/queue',
            'controller': 'cv',
            'method': 'all'
        },
        update: {
            'endpoint': '/private/queue',
            'controller': 'cv',
            'method': 'update'
        }
    },
    Document: {
        channel: '/channel/document',
        lazy: true,
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
            'method': 'save',
        },
        push: {
            'endpoint': '/private/queue',
            'controller': 'document',
            'method': 'push',
        }
    },
    Resource: {
        lazy: true,
        all: {
            'endpoint': '/private/queue',
            'controller': 'resource',
            'method': 'all'
        },
        allByDocumentName: {
            'endpoint': '/private/queue',
            'controller': 'resource',
            'method': 'all'
        }
    },
    Metadata: {
        channel: '/channel/metadata',
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
            'controller': 'export'
        },
        headers: {
            'endpoint': '/private/queue',
            'controller': 'export',
            'method': 'headers'
        },
        status: {
            'endpoint': '/private/queue',
            'controller': 'metadata',
            'method': 'status'
        }
    },
    Project: {
        channel: '/channel/project',
        batchpublish: {
            'endpoint': '/private/queue',
            'controller': 'project',
            'method': 'batchpublish'
        },
        all: {
            'endpoint': '/private/queue',
            'controller': 'project',
            'method': 'all'
        }
    },
    ProjectRepository: {
        channel: '/channel/project-repository',
        all: {
            'endpoint': '/private/queue',
            'controller': 'project-repository',
            'method': 'all'
        },
        create: {
            'endpoint': '/private/queue',
            'controller': 'project-repository',
            'method': 'create'
        },
        update: {
            'endpoint': '/private/queue',
            'controller': 'project-repository',
            'method': 'update'
        },
        remove: {
            'endpoint': '/private/queue',
            'controller': 'project-repository',
            'method': 'delete'
        }
    },
    User: {
        channel: '/channel/user',
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
        }
    }
};
