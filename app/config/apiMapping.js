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
            'controller': 'project-suggestor'
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
        },
        remove: {
            'endpoint': '/private/queue',
            'controller': 'document',
            'method': 'remove',
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
        lazy: true,
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
        },
        create: {
            'endpoint': '/private/queue',
            'controller': 'project',
            'method': 'create'
        },
        update: {
            'endpoint': '/private/queue',
            'controller': 'project',
            'method': 'update'
        },
        remove: {
            'endpoint': '/private/queue',
            'controller': 'project',
            'method': 'remove'
        },
        ingestTypes: {
            'endpoint': '/private/queue',
            'controller': 'project',
            'method': 'ingest-types'
        },
        inputTypes: {
            'endpoint': '/private/queue',
            'controller': 'project',
            'method': 'input-types'
        },
        addFieldProfile: {
            'endpoint': '/private/queue',
            'controller': 'project',
            'method': 'add-field-profile'
        },
        updateFieldProfile: {
            'endpoint': '/private/queue',
            'controller': 'project',
            'method': 'update-field-profile'
        },
        getFieldProfileLabels: {
            'endpoint': '/private/queue',
            'controller': 'project',
            'method': 'get-field-profile-labels'
        },
        syncDocuments: {
            'endpoint': '/private/queue',
            'controller': 'project',
            'method': 'sync'
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
            'method': 'remove'
        },
        types: {
            'endpoint': '/private/queue',
            'controller': 'project-repository',
            'method': 'types'
        }
    },
    ProjectAuthority: {
        channel: '/channel/project-authority',
        all: {
            'endpoint': '/private/queue',
            'controller': 'project-authority',
            'method': 'all'
        },
        create: {
            'endpoint': '/private/queue',
            'controller': 'project-authority',
            'method': 'create'
        },
        update: {
            'endpoint': '/private/queue',
            'controller': 'project-authority',
            'method': 'update'
        },
        remove: {
            'endpoint': '/private/queue',
            'controller': 'project-authority',
            'method': 'remove'
        },
        types: {
            'endpoint': '/private/queue',
            'controller': 'project-authority',
            'method': 'types'
        },
        uploadCsv: {
            'endpoint': '/private/queue',
            'controller': 'project-authority',
            'method': 'upload-csv'
        }
    },
    ProjectSuggestor: {
        channel: '/channel/project-suggestor',
        all: {
            'endpoint': '/private/queue',
            'controller': 'project-suggestor',
            'method': 'all'
        },
        create: {
            'endpoint': '/private/queue',
            'controller': 'project-suggestor',
            'method': 'create'
        },
        update: {
            'endpoint': '/private/queue',
            'controller': 'project-suggestor',
            'method': 'update'
        },
        remove: {
            'endpoint': '/private/queue',
            'controller': 'project-suggestor',
            'method': 'remove'
        },
        types: {
            'endpoint': '/private/queue',
            'controller': 'project-suggestor',
            'method': 'types'
        }
    },
    PublishingEvent: {
      channel: '/channel/publishing',
      lazy: true,
      validations: false
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
