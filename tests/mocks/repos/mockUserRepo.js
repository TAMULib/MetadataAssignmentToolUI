var mockUserRepo1 = {
    'HashMap': {
        '0': {
            firstName: "Jack",
            lastName: "Daniels",
            role: "ROLE_ADMIN",
            uin: "123456789"
        },
        '1': {
            firstName: "Jill",
            lastName: "Daniels",
            role: "ROLE_USER",
            uin: "987654321"
        },
        '2': {
            firstName: "Jacob",
            lastName: "Smith",
            role: "ROLE_USER",
            uin: "192837465"
        }
    }
};

var mockUserRepo2 = {
    'HashMap': {
        '0': {
            firstName: "John",
            lastName: "Daniels",
            role: "ROLE_ADMIN",
            uin: "321654987"
        },
        '1': {
            firstName: "Joann",
            lastName: "Daniels",
            role: "ROLE_USER",
            uin: "789456123"
        },
        '2': {
            firstName: "Joseph",
            lastName: "Smith",
            role: "ROLE_USER",
            uin: "564738291"
        }
    }
};

var mockUserRepo3 = {
    'HashMap': {
        '0': {
            firstName: "Test",
            lastName: "User1",
            role: "ROLE_ADMIN",
            uin: "111111111"
        },
        '1': {
            firstName: "Test",
            lastName: "User2",
            role: "ROLE_USER",
            uin: "222222222"
        },
        '2': {
            firstName: "Test",
            lastName: "User3",
            role: "ROLE_USER",
            uin: "333333333"
        }
    }
};

angular.module('mock.userRepo', []).service('UserRepo', function ($q) {
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

    repo.mock(mockUserRepo1);

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
        return "UserRepo";
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
        payloadResponse();
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
