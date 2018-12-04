metadataTool.controller('DocumentController', function ($controller, $location, $route, $routeParams, $scope, $window, ApiResponseActions, AlertService, Document, DocumentRepo, UserService, UserRepo, NgTableParams, ProjectRepo) {

    angular.extend(this, $controller('AbstractController', {
        $scope: $scope
    }));

    var view = $window.location.pathname;

    var assignmentsView = function () {
        return view.indexOf('assignments') > -1;
    };

    var usersView = function () {
        return view.indexOf('users') > -1;
    };

    $scope.user = UserService.getCurrentUser();

    $scope.users = UserRepo.getAll();

    $scope.projects = ProjectRepo.getAll();

    $scope.selectedUser = null;

    $scope.showPublished = false;

    $scope.showProjectsFilter = false;

    $scope.tableNeedsUpdating = false;

    var initialPage = $location.search().page ? $location.search().page : 1;

    $scope.setTable = function () {
        $scope.tableParams = new NgTableParams({
            page: initialPage,
            count: 10,
            sorting: {
                name: 'asc'
            },
            filter: {
                name: undefined,
                status: (assignmentsView() || usersView()) ? 'Assigned' : (sessionStorage.role === 'ROLE_ANNOTATOR') ? 'Open' : undefined,
                annotator: (assignmentsView() || usersView()) ? ($scope.selectedUser) ? $scope.selectedUser.username : $scope.user.username : undefined,
                projects: undefined
            }
        }, {
            total: 0,
            getData: function (params) {

                var key;
                for (key in params.sorting()) {}

                var filters = {
                    name: [],
                    status: [],
                    annotator: [],
                    projects: []
                };

                if (params.filter().name !== undefined) {
                    filters.name.push(params.filter().name);
                }

                if (params.filter().status !== undefined) {
                    filters.status.push(params.filter().status);
                    if (params.filter().status === 'Assigned' && params.filter().annotator !== undefined) {
                        filters.status.push('Rejected');
                        filters.status.push('!Accepted');
                    }
                }

                if (params.filter().status !== 'Published' && !$scope.showPublished) {
                    filters.status.push('!Published');
                }

                if (params.filter().annotator !== undefined) {
                    filters.annotator.push(params.filter().annotator);
                }

                if ($scope.tableParams.filter().projects !== undefined) {
                    filters.projects.push($scope.tableParams.filter().projects);
                }

                return DocumentRepo.page(params.page(), params.count(), key, params.sorting()[key], filters).then(function (page) {
                    params.total(page.totalElements);
                    $location.search('page', params.page());
                    return angular.extend([], DocumentRepo.getAll());
                });
            }
        });

    };

    UserService.userReady().then(function(event) {
      $scope.setTable();
    });

    $scope.setSelectedUser = function (user) {
        $scope.selectedUser = user;
        $scope.setTable();
    };

    $scope.togglePublished = function () {
        $scope.showPublished = !$scope.showPublished;
        $scope.tableParams.reload();
    };

    $scope.availableAnnotators = function () {
        var annotators = [];
        for (var key in $scope.users) {
            var user = $scope.users[key];
            if (user.role === 'ROLE_ANNOTATOR' || user.role === 'ROLE_MANAGER' || user.role === 'ROLE_ADMIN') {
                annotators.push(user);
            }
        }
        return annotators;
    };

    $scope.update = function (document, status) {
        document.status = status;
        if (document.status === 'Open') {
            delete document.annotator;
        } else {
            if (!document.annotator) {
                document.annotator = $scope.user.firstName + ' ' + $scope.user.lastName;
            }
        }
        document.save();
    };

    $scope.toggleProjectsFilter = function () {
        $scope.showProjectsFilter = !$scope.showProjectsFilter;
    };

    $scope.updateTable = function() {
      $scope.tableParams.reload();
      $scope.tableNeedsUpdating = false;
    };

    DocumentRepo.listen([ApiResponseActions.CREATE, ApiResponseActions.DELETE], function () {
        $scope.tableNeedsUpdating = true;
    });

});
