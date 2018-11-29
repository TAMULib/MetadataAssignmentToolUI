var mockProjectRepositoryRepo1 = [
    {
        id: 1,
        projects: [],
        type: "FEDORA_PCDM",
        settings: [
            {
                key: 'repoUrl',
                values: ['localhost-repo1']
            },
            {
                key: 'restPath',
                values: ['rest']
            }
        ]
    },
    {
        id: 2,
        projects: [],
        type: "DSPACE",
        settings: [
            {
                key: 'repoUrl',
                values: ['localhost-repo2']
            },
            {
                key: 'repoContextPath',
                values: ['rest']
            }
        ]
    },
    {
        id: 3,
        projects: [],
        type: "DSPACE",
        settings: [
            {
                key: 'repoUrl',
                values: ['localhost-repo3']
            },
            {
                key: 'repoContextPath',
                values: ['rest']
            }
        ]
    }
];

var mockProjectRepositoryRepo2 = [
    {
        id: 4,
        projects: [],
        type: "FEDORA_PCDM",
        settings: [
            {
                key: 'repoUrl',
                values: ['localhost-repo4']
            },
            {
                key: 'restPath',
                values: ['rest']
            }
        ]
    },
    {
        id: 5,
        projects: [],
        type: "FEDORA_PCDM",
        settings: [
            {
                key: 'repoUrl',
                values: ['localhost-repo5']
            },
            {
                key: 'restPath',
                values: ['rest']
            }
        ]
    },
    {
        id: 6,
        projects: [],
        type: "DSPACE",
        settings: [
            {
                key: 'repoUrl',
                values: ['localhost-repo6']
            },
            {
                key: 'repoContextPath',
                values: ['rest']
            }
        ]
    }
];

var mockProjectRepositoryRepo3 = [
    {
        id: 3,
        projects: [],
        type: "DSPACE",
        settings: [
            {
                key: 'repoUrl',
                values: ['localhost-repo3']
            },
            {
                key: 'repoContextPath',
                values: ['rest']
            }
        ]
    }
];

angular.module('mock.projectRepositoryRepo', []).service('ProjectRepositoryRepo', function($q) {
    var repo = mockRepo('ProjectRepositoryRepo', $q, mockProjectRepository, mockProjectRepositoryRepo1);
    var mockedTypes = {};

    repo.mockTypes = function(toMock) {
        mockedTypes = toMock;
    };

    repo.getTypes = function() {
        return payloadPromise($q.defer(), mockedTypes);
    };

    return repo;
});
