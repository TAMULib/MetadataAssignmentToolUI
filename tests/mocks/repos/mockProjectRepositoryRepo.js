var mockProjectRepositoryRepo1 = {
    'HashMap': {
        '0': {
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
        '1': {
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
        '2': {
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
    }
};

var mockProjectRepositoryRepo2 = {
    'HashMap': {
        '0': {
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
        '1': {
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
        '2': {
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
    }
};

var mockProjectRepositoryRepo3 = {
    'HashMap': {
        '0': {
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
    }
};

angular.module('mock.projectRepositoryRepo', []).service('ProjectRepositoryRepo', function($q) {
    var repo = this;
    var defer;
    var validations = {};
    var validationResults = {};
    var originalList;

    var payloadResponse = function (payload, messageStatus, httpStatus) {
        return defer.resolve({
            body: angular.toJson({
                meta: {
                    status: messageStatus ? messageStatus : 'SUCCESS',
                },
                payload: payload,
                status: httpStatus ? httpStatus : 200
            })
        });
    };

    var messageResponse = function (message, messageStatus, httpStatus) {
        return defer.resolve({
            body: angular.toJson({
                meta: {
                    status: messageStatus ? messageStatus : 'SUCCESS',
                    message: message
                },
                status: httpStatus ? httpStatus : 200
            })
        });
    };

    repo.mockedList = [];
    repo.mockedTypes = {};

    repo.mock = function(toMock) {
        repo.mockedList = [];
        originalList = [];

        if (toMock.HashMap) {
            for (var i in toMock.HashMap) {
                repo.mockedList.push(toMock.HashMap[i]);
                originalList.push(toMock.HashMap[i]);
            }
        }
    };

    repo.mockTypes = function(toMock) {
        repo.mockedTypes = toMock;
    };

    repo.mock(mockProjectRepositoryRepo1);

    repo.add = function (modelJson) {
        if (!repo.contains(modelJson)) {
            repo.mockedList.push(modelJson);
        }
    };

    repo.addAll = function (modelJsons) {
        for (var i in modelJsons) {
            repo.add(modelJsons[i]);
        }
    };

    repo.clearValidationResults = function () {
        validationResults = {};
    };

    repo.create = function (model) {
        defer = $q.defer();
        model.id = repo.mockedList.length + 1;
        repo.mockedList.push(angular.copy(model));
        payloadResponse(model);
        return defer.promise;
    };

    repo.contains = function (model) {
        var found = false;
        for (var i in repo.mockedList) {
            if (repo.mockedList[i].id === model.id) {
                found = true;
                break;
            }
        }
        return found;
    };

    repo.count = function () {
        return repo.mockedList.length;
    };

    repo.delete = function (model) {
        defer = $q.defer();
        for (var i in repo.mockedList) {
            if (repo.mockedList[i].id === model.id) {
                repo.mockedList.splice(i, 1);
                break;
            }
        }
        payloadResponse();
        return defer.promise;
    };

    repo.deleteById = function (id) {
        defer = $q.defer();
        for (var i in repo.mockedList) {
            if (repo.mockedList[i].id === id) {
                repo.mockedList.splice(i, 1);
                break;
            }
        }
        payloadResponse();
        return defer.promise;
    };

    repo.fetch = function () {
        defer = $q.defer();
        payloadResponse(mockProjectRepositoryRepo3);
        return defer.promise;
    };

    repo.findById = function (id) {
        var found;
        for (var i in repo.mockedList) {
            if (repo.mockedList[i].id == id) {
                found = angular.copy(repo.mockedList[i]);
            }
        }
        return found;
    };

    repo.getAll = function () {
        return angular.copy(repo.mockedList);
    };

    repo.getContents = function () {
        return angular.copy(repo.mockedList);
    };

    repo.getEntityName = function () {
        return "ProjectRepositoryRepo";
    };

    repo.getTypes = function() {
        defer = $q.defer();
        payloadResponse(repo.mockedTypes);
        return defer.promise;
    };

    repo.getValidations = function () {
        return angular.copy(validations);
    };

    repo.getValidationResults = function () {
        return angular.copy(validationResults);
    };

    repo.listen = function (cbOrActionOrActionArray, cb) {
        defer = $q.defer();
        if (typeof cbOrActionOrActionArray === "function") {
            cbOrActionOrActionArray();
        }
        else if (typeof cbOrActionOrActionArray === "array") {
            for (var cbAction in cbOrActionOrActionArray) {
                if (typeof cbAction === "function") {
                    cbAction();
                }
            }
        }
        else if (typeof cb === "function") {
            cb();
        }
        payloadResponse();
        return defer.promise;
    };

    repo.ready = function () {
        defer = $q.defer();
        payloadResponse(mockProjectRepositoryRepo3);
        return defer.promise;
    };

    repo.remove = function (modelToRemove) {
        for (var i in repo.mockedList) {
            if (repo.mockedList[i].id === modelToRemove.id) {
                repo.mockedList.splice(i, 1);
                break;
            }
        }
    };

    repo.reset = function () {
        defer = $q.defer();
        repo.mockedList = repo.originalList;
        payloadResponse();
        return defer.promise;
    };

    repo.save = function (model) {
        defer = $q.defer();
        // TODO
        payloadResponse({});
        return defer.promise;
    };

    repo.saveAll = function () {
        angular.forEach(repo.mockedList, function (model) {
            repo.save(model);
        });
    };

    repo.setToDelete = function (id) {
        // TODO
    };
    repo.setToUpdate = function (id) {
        // TODO
    };

    repo.unshift = function (modelJson) {
        // TODO
    };

    repo.update = function (model) {
        defer = $q.defer();
        var updated;
        for (var i in repo.mockedList) {
            if (repo.mockedList[i].id === model.id) {
                updated = angular.copy(repo.mockedList[i]);
                angular.extend(updated, model);
                break;
            }
        }
        payloadResponse(updated);
        return defer.promise;
    };

    return repo;
});
