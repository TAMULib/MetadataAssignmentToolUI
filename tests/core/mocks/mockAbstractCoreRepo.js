var payloadPromise = function (defer, payload, messageStatus, httpStatus) {
    defer.resolve({
        body: angular.toJson({
            meta: {
                status: messageStatus ? messageStatus : 'SUCCESS',
            },
            payload: payload,
            status: httpStatus ? httpStatus : 200
        })
    });
    return defer.promise;
};

var messageResponse = function (defer, message, messageStatus, httpStatus) {
     defer.resolve({
        body: angular.toJson({
            meta: {
                status: messageStatus ? messageStatus : 'SUCCESS',
                message: message
            },
            status: httpStatus ? httpStatus : 200
        })
    });
    return defer.promise;
};

var mockRepo = function ($q, mockModelCtor, mockDataArray) {
    var repo = {};

    var validations = {};

    var validationResults = {};

    var originalList;

    repo.mockedList = [];

    repo.mock = function(toMock) {
        repo.mockedList = [];
        originalList = [];
        for (var i in toMock) {
            var model = angular.extend(mockModelCtor($q), toMock[i]);
            repo.mockedList.push(model);
            originalList.push(model);
        }
    };

    repo.mock(mockDataArray);

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
        model.id = repo.mockedList.length + 1;
        repo.mockedList.push(angular.copy(model));
        return payloadPromise($q.defer(), model);
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
        for (var i in repo.mockedList) {
            if (repo.mockedList[i].id === model.id) {
                repo.mockedList.splice(i, 1);
                break;
            }
        }
        return payloadPromise($q.defer());
    };

    repo.deleteById = function (id) {
        for (var i in repo.mockedList) {
            if (repo.mockedList[i].id === id) {
                repo.mockedList.splice(i, 1);
                break;
            }
        }
        return payloadPromise($q.defer());
    };

    repo.fetch = function () {
        return payloadPromise($q.defer(), mockDataArray);
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
        return "DocumentRepo";
    };

    repo.getValidations = function () {
        return angular.copy(validations);
    };

    repo.getValidationResults = function () {
        return angular.copy(validationResults);
    };

    repo.listen = function (cbOrActionOrActionArray, cb) {
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
        return payloadPromise($q.defer());
    };

    repo.ready = function () {
        return payloadPromise($q.defer(), mockDataArray);
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
        repo.mockedList = repo.originalList;
        return payloadPromise($q.defer());
    };

    repo.save = function (model) {
        // TODO
        return payloadPromise($q.defer(), {});
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
        var updated;
        for (var i in repo.mockedList) {
            if (repo.mockedList[i].id === model.id) {
                updated = angular.copy(repo.mockedList[i]);
                angular.extend(updated, model);
                break;
            }
        }
        return payloadPromise($q.defer(), updated);
    };

    return repo;
}