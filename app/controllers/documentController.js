metadataTool.controller('DocumentController', function($controller, $location, $route, $routeParams, $scope, $window, AlertService, Document, DocumentRepo, UserService, UserRepo, ngTableParams) {

    angular.extend(this, $controller('AbstractController', {
        $scope: $scope
    }));

    var view = $window.location.pathname;

    var assignmentsView = function() {
        return view.indexOf('assignments') > -1;
    };

    var usersView = function() {
        return view.indexOf('users') > -1;
    };

    $scope.user = UserService.getCurrentUser();

    $scope.users = UserRepo.getAll();

    $scope.selectedUser = null;

    $scope.showPublished = false;

    $scope.setTable = function() {

        $scope.tableParams = new ngTableParams({
            page: $routeParams.page,
            count: 10,
            sorting: {
                name: 'asc'
            },
            filter: {
                name: undefined,
                status: (assignmentsView() || usersView()) ? 'Assigned' : (sessionStorage.role == 'ROLE_ANNOTATOR') ? 'Open' : undefined,
                annotator: (assignmentsView() || usersView()) ? ($scope.selectedUser) ? $scope.selectedUser.uin : $scope.user.uin : undefined
            }
        }, {
            total: 0,
            getData: function($defer, params) {
                var key;
                for (key in params.sorting()) {}

                var filters = {
                    name: [],
                    status: [],
                    annotator: []
                };

                if (params.filter().name !== undefined) {
                    filters.name.push(params.filter().name);
                }

                if (params.filter().status !== undefined) {
                    filters.status.push(params.filter().status);
                    if (params.filter().status == 'Assigned' && params.filter().annotator !== undefined) {
                        filters.status.push('Rejected');
                        filters.status.push('!Accepted');
                    }
                }

                if (params.filter().status != 'Published' && !$scope.showPublished) {
                    filters.status.push('!Published');
                }

                if (params.filter().annotator !== undefined) {
                    filters.annotator.push(params.filter().annotator);
                }

                DocumentRepo.page(params.page(), params.count(), key, params.sorting()[key], filters).then(function(page) {
                    params.total(page.totalElements);
                    $defer.resolve(DocumentRepo.getAll());
                });

                $location.path('/documents/' + params.page(), false);

            }
        });

    };

    $scope.setTable();

    $scope.setSelectedUser = function(user) {
        $scope.selectedUser = user;
        $scope.setTable();
    };

    $scope.togglePublished = function() {
        $scope.showPublished = !$scope.showPublished;
        $scope.tableParams.reload();
    };

    $scope.availableAnnotators = function() {
        var annotators = [];
        for (var key in $scope.users) {
            var user = $scope.users[key];
            if (user.role == 'ROLE_ANNOTATOR' || user.role == 'ROLE_MANAGER' || user.role == 'ROLE_ADMIN') {
                annotators.push(user);
            }
        }
        return annotators;
    };

    $scope.update = function(document, status) {
        document.status = status;
        if (document.status == 'Open') {
            delete document.annotator;
        } else {
            if (!document.annotator) {
                document.annotator = $scope.user.firstName + ' ' + $scope.user.lastName + ' (' + $scope.user.uin + ')';
            }
        }
        document.save();
    };

    DocumentRepo.listenForNew().then(null, null, function(data) {
        $scope.tableParams.reload();
    });

});
