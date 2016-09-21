metadataTool.controller('DocumentController', function ($controller, $route, $scope, $window, DocumentRepo, UserService, UserRepo, ngTableParams) {

    angular.extend(this, $controller('AbstractController', {$scope: $scope}));
    
    var view = $window.location.pathname;
    
    $scope.user = UserService.getCurrentUser();

    $scope.users = UserRepo.getAll();

    $scope.selectedUser = null;

    $scope.showPublished = false;

    var craftAnnotatorString = function(user) {
        return user.firstName + " " + user.lastName + " (" + user.uin + ")";
    }

    $scope.setTable = function() {

        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {
                name: 'asc'
            },
            filter: {
                name: undefined,
                status: (view.indexOf('assignments') > -1 || view.indexOf('users') > -1) ? 'Assigned' : (sessionStorage.role == 'ROLE_ANNOTATOR') ? 'Open' : undefined,
                annotator: (view.indexOf('assignments') > -1 || view.indexOf('users') > -1) ? ($scope.selectedUser) ? $scope.selectedUser.uin : $scope.user.uin : undefined
            }
        }, {
            total: 0,
            getData: function($defer, params) {
                var key; for(key in params.sorting()) {}

                var filters = {
                    name: [],
                    status: [],
                    annotator: []
                };

                if(params.filter().name !== undefined) {
                    filters.name.push(params.filter().name);
                }

                if(params.filter().status !== undefined) {
                    filters.status.push(params.filter().status);
                    if(params.filter().status == 'Assigned' && params.filter().annotator !== undefined) {
                        filters.status.push('Rejected');
                        filters.status.push('!Accepted');
                    }
                }

                if(params.filter().status != 'Published' && !$scope.showPublished) {
                    filters.status.push('!Published');
                }

                if(params.filter().annotator !== undefined) {
                    filters.annotator.push(params.filter().annotator);
                }

                DocumentRepo.page(params.page(), params.count(), key, params.sorting()[key], filters).then(function(data) {
                    var page = JSON.parse(data.body).payload.PageImpl;
                    params.total(page.totalElements);
                    $defer.resolve(page.content);
                });
                
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
        for(var key in $scope.users) {
            var user = $scope.users[key];
            if(user.role == 'ROLE_ANNOTATOR' || user.role == 'ROLE_MANAGER' || user.role == 'ROLE_ADMIN') {
                annotators.push(user);
            }
        }
        return annotators;
    };
    
    $scope.updateAnnotator = function(name, status, annotator) {
        annotator = !annotator ? craftAnnotatorString($scope.user) : annotator;
        DocumentRepo.update(name, status, annotator);
    };

    DocumentRepo.listen(function(data) {
        $scope.tableParams.reload();
    });
    
});
