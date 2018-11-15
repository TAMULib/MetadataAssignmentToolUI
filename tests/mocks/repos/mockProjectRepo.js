var mockProjectRepo1 = {
    'HashMap':{
        '0':{
            file: null,
            filename: "disseration001.txt",
            name: "Dissertation 001",
            status: "Open",
            annotator: "111111111"
        },
        '1':{
            file: null,
            filename: "disseration002.txt",
            name: "Dissertation 002",
            status: "Open",
            annotator: "222222222"
        },
        '2':{
            file: null,
            filename: "disseration003.txt",
            name: "Dissertation 003",
            status: "Open",
            annotator: "333333333"
        }
    }
};

var mockProjectRepo2 = {
    'HashMap':{
        '0':{
            file: null,
            filename: "disseration002.txt",
            name: "Dissertation 002",
            status: "Open",
            annotator: "222222222"
        },
        '1':{
            file: null,
            filename: "disseration003.txt",
            name: "Dissertation 003",
            status: "Open",
            annotator: "333333333"
        },
        '2':{
            file: null,
            filename: "disseration004.txt",
            name: "Dissertation 004",
            status: "Open",
            annotator: "444444444"
        }
    }
};

var mockProjectRepo3 = {
    'HashMap':{
        '0':{
            file: null,
            filename: "disseration003.txt",
            name: "Dissertation 003",
            status: "Open",
            annotator: "333333333"
        }
    }
};

angular.module('mock.projectRepo', []).service('ProjectRepo', function($q) {
    var repo = this;
    var defer;
    var validations = {};
    var validationResults = {};
    var originalList;

    var payloadResponse = function (payload) {
        return defer.resolve({
            body: angular.toJson({
                meta: {
                    status: 'SUCCESS'
                },
                payload: payload
            })
        });
    };

    var messageResponse = function (message) {
        return defer.resolve({
            body: angular.toJson({
                meta: {
                    status: 'SUCCESS',
                    message: message
                }
            })
        });
    };

    repo.mockedList = [];

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

    repo.mock(mockProjectRepo1);

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

    repo.addFieldProfile = function (projectId, fieldProfile, labels) {
        defer = $q.defer();
        // TODO
        payloadResponse(true);
        return defer.promise;
    };

    repo.batchPublishDocuments = function (projectId, repositoryId) {
        defer = $q.defer();
        // TODO
        payloadResponse(true);
        return defer.promise;
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
        payloadResponse(mockProjectRepo3);
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

    repo.findByName = function (projectName) {
        defer = $q.defer();

        var found;
        for (var i in repo.mockedList) {
            if (repo.mockedList[i].name == projectName) {
                found = angular.copy(repo.mockedList[i]);
            }
        }
        payloadResponse(found);
        return defer.promise;
    };

    repo.getAll = function () {
        return angular.copy(repo.mockedList);
    };

    repo.getAllByRole = function (role) {
        var found;
        for (var i in repo.mockedList) {
            if (repo.mockedList[i].role == role) {
                found = angular.copy(repo.mockedList[i]);
                break;
            }
        }

        return found;
    };

    repo.getAllFiltered = function(predicate) {
        var data = repo.mockedList;
        var filteredData = [];
        // TODO
        return filteredData;
    };

    repo.getAssignableUsers = function (roles) {
        var payload = {};
        defer = $q.defer();
        // TODO
        payloadResponse(payload);
        return defer.promise;
    };

    repo.getContents = function () {
        return angular.copy(repo.mockedList);
    };

    repo.getEntityName = function () {
        return "ProjectRepo";
    };

    repo.getFieldProfileLabels = function (fieldProfileId) {
        defer = $q.defer();
        // TODO
        payloadResponse({});
        return defer.promise;
    };

    repo.getInjectTypes = function () {
        defer = $q.defer();
        // TODO
        payloadResponse({});
        return defer.promise;
    };

    repo.getInputTypes = function () {
        defer = $q.defer();
        // TODO
        payloadResponse({});
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
        payloadResponse(mockProjectRepo3);
        return defer.promise;
    };

    repo.ready = function () {
        defer = $q.defer();
        payloadResponse(mockProjectRepo3);
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

    repo.updateFieldProfile = function (projectId, fieldProfile, labels) {
        defer = $q.defer();
        // TODO
        payloadResponse(true);
        return defer.promise;
    };

    return repo;
});
