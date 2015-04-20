var globalConfig = { 
		
		// Set this to the webService if mocking AuthService
		
		'authService':'https://labs.library.tamu.edu/authservice-dev',
		'webService':'http://imacdev.tamu.edu:9000', 
		
		'logging': {
			'log': true,
			'info': true,
			'warn': true,
			'error': true,
			'debug': true
		},
		
		'stompDebug': false,
		
		// Set this to 'admin' or 'user' if using mock AuthService
		// otherwise set to null or false
		
		'mockRole': null
};
;var metadataTool = angular.module('metadataTool', 
		[
		 'ngRoute',
		 'ngTable',
		 'ngSanitize',
		 'ngCsv',
		 'metadataTool.version'
		 ]).constant('globalConfig',globalConfig);

setUpApp(function() {
	angular.bootstrap(document, ['metadataTool']);
});
;var globalConfig = { 
		
		// Set this to the webService if mocking AuthService
		
		'authService':'https://labs.library.tamu.edu/authservice-dev',
		'webService':'http://osd144.library.tamu.edu/mylibrary-dev', 
		
		'logging': {
			'log': true,
			'info': true,
			'warn': true,
			'error': true,
			'debug': true
		},
		
		'stompDebug': false,
		
		// Set this to 'admin' or 'user' if using mock AuthService
		// otherwise set to null or false
		
		'mockRole': null
};
;var logger = {
	'log':
		function(message) {
			if(globalConfig.logging.log) {
				console.log("");
				console.log("***** OUT *****");
		        console.log(new Date());
		        console.log(message);
			}
		},
	'info':
		function(message) { 
			if(globalConfig.logging.info) {
				console.log("");
				console.info("***** INFO *****");
		        console.log(new Date());
		        console.log(message);
			}
		},
	'warn':
		function(message) { 
			if(globalConfig.logging.warn) {
				console.log("");
				console.warn("***** WARN *****");
		        console.log(new Date());
		        console.log(message);
			}
		},
	'error':
		function(message) { 
			if(globalConfig.logging.error) {
				console.log("");
				console.error("***** ERROR *****");
		        console.log(new Date());
		        console.log(message);
			}
		},
	'debug':
		function(message) { 
			if(globalConfig.logging.debug) {
				console.log("");
				console.debug("***** DEBUG *****");
		        console.log(new Date());
		        console.log(message);
			}
		}
};;metadataTool.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider.
		when('/users', {
			templateUrl: 'views/users.html'
		}).
		when('/assignments', {
			templateUrl: 'views/assignments.html'
		}).
		when('/documents', {
			templateUrl: 'views/documents.html'
		}).
		when('/myview', {
			templateUrl: 'views/myview.html'
		}).
		when('/annotate/:documentKey/:action', {
			templateUrl: 'views/annotate.html'
		}).
		when('/admin', {
			templateUrl: 'views/admin.html'
		}).
		otherwise({redirectTo: '/',
			templateUrl: 'views/home.html'
		});
}]);;metadataTool.run(function($rootScope, wsservice) {
	
	angular.element("body").fadeIn(300);
	
	// Add runtime tasks here
	
});;metadataTool.controller('AbstractController', function ($scope) {

	$scope.isAdmin = function() {
		return (sessionStorage.role == "ROLE_ADMIN");
	};
	
	$scope.isManager = function() {
		return (sessionStorage.role == "ROLE_MANAGER");
	};
	
	$scope.isAnnotator = function() {
		return (sessionStorage.role == "ROLE_ANNOTATOR");
	};
		
});
;metadataTool.controller('AdminController', function ($controller, $scope, $location, $route, $window, $http, User, UserRepo, Metadata, AuthServiceApi) {
	
    angular.extend(this, $controller('AbstractController', {$scope: $scope}));
    
    $scope.user = User.get();
	
	$scope.userRepo = UserRepo.get();

	$scope.showModal = false;
	
	$scope.selectedUser = null;
	
	if(sessionStorage.assumedUser) {
		$scope.assume = JSON.parse(sessionStorage.assumedUser);
		$scope.assumeBtn = 'Unassume';
	} else {
		$scope.assumeBtn = 'Assume';
	}
	
	$scope.$watch('user.role', function() {		
		sessionStorage.role = $scope.user.role;
		if ($scope.user.role == 'ROLE_ADMIN') {
			$scope.admin = true;
		} 
		else if ($scope.user.role == 'ROLE_MANAGER') {
			$scope.admin = false;
		}
		else {
			$scope.admin = false;
		}
	});
	
	$scope.allowableRoles = function(userRole) {
		if(sessionStorage.role == 'ROLE_ADMIN') {
			return ['ROLE_ADMIN','ROLE_MANAGER','ROLE_ANNOTATOR','ROLE_USER'];
		}
		else if(sessionStorage.role == 'ROLE_MANAGER') {
			if(userRole == 'ROLE_ADMIN') {
				return ['ROLE_ADMIN'];
			}
			return ['ROLE_MANAGER','ROLE_ANNOTATOR','ROLE_USER'];
		}
		else {
			return [userRole];
		}
	};

	$scope.updateRole = function(uin, role) {
		UserRepo.updateRole(uin, role);
	};
	
	$scope.showAssignmentsModal = function(user) {
		$scope.selectedUser = user;
		$scope.showModal = !$scope.showModal;
	};
	
	$scope.isMocking = function() {
		if(globalConfig.mockRole) {
			return true;
		}
		else {
			return false;
		}
	};

	$scope.assumeUser = function(assume) {
		
		if(!sessionStorage.assumedUser) {
			if ((typeof assume !== 'undefined') && assume.netid) {				
				console.log("Assuming user");
				console.log(assume);
				sessionStorage.adminToken = sessionStorage.token;
								
				sessionStorage.assumedUser = JSON.stringify(assume);

				AuthServiceApi.getAssumedUser(assume).then(function(data) {
					if(data) {
						User.get("assume");
						
						$scope.assumeBtn = 'Unassume';
						$scope.assumeStatus = '';
						
						$scope.showModal = false;
						
						$window.location.reload();
						$location.path('/assignments');
						
					}
					else {
						$scope.assumeStatus = 'invalid netid';
						delete sessionStorage.assumedUser;
						$scope.assumeBtn = 'Assume';
					}
				});
			}
		} else {
			console.log("Unassuming user");

			sessionStorage.token = sessionStorage.adminToken;
			delete sessionStorage.assumedUser;

			User.get("unassume");

			$scope.assumeBtn = 'Assume';
			
			$location.path('/admin');
		}		
		
	};
	
	$scope.exportMetadata = function() {
		console.log("Export metadata");
		return Metadata.getAllPublished().then(function(metadata) {
			return  JSON.parse(metadata.body).content["ArrayList<ArrayList>"];
		});
	};
	
	UserRepo.listen().then(null, null, function(data) {
		if(JSON.parse(data.body).content.HashMap.changedUserUin == $scope.user.uin) {
			User.get(true);
			$route.reload();
		}			
	});
	
});


;metadataTool.controller('AnnotateController', function($controller, $scope, $location, $routeParams, DocumentRepo, Metadata, User, TXT, PDF) {
	
	angular.extend(this, $controller('AbstractController', {$scope: $scope}));
	
	var user = User.get();
	
	$scope.document = DocumentRepo.get($routeParams.documentKey);
	
	$scope.document.name = $routeParams.documentKey;
	
	$scope.document.metadata = {};
	
	$scope.txt = TXT.get($scope.document.name);

	$scope.pdf = PDF.get($scope.document.name);

	$scope.showModal = false;
	
	DocumentRepo.ready().then(function() {
		
		angular.extend($scope.document, {'metadata':Metadata.get($scope.document)});
		
		Metadata.ready().then(function() {
				
			console.log($scope.document);
			
			
			for(var key in $scope.document.metadataLabels) {
				var metadataLabel = $scope.document.metadataLabels[key];
				if(!$scope.document.metadata[metadataLabel.label]) {
					$scope.document.metadata[metadataLabel.label] = [''];
				}
			}
			
			$scope.removeMetadataField = function(label) {
				$scope.document.metadata[label].splice(Object.keys($scope.document.metadata[label]).length-1, 1);
			};
			
			$scope.addMetadataField = function(label) {
				$scope.document.metadata[label][Object.keys($scope.document.metadata[label]).length] = '';
			};
			
			$scope.getMetadataFieldCount = function(label) {
				return Object.keys($scope.document.metadata[label]).length;
			};
			
			$scope.updateMetadata = function(document) {
				Metadata.clear(document.name).then(function(data) {								
					Metadata.add(document.name, document.metadata);
				});
			};
			
			$scope.submit = function(document) {
				console.log(document);
				Metadata.clear(document.name).then(function(data) {					
					Metadata.add(document.name, document.metadata);
					DocumentRepo.update(document.name, user.uin, 'Annotated', '');
					$location.path('/assignments');					
				});
			};
			
			$scope.accept = function(document) {
				console.log(document);
				Metadata.clear(document.name).then(function(data) {					
					Metadata.add(document.name, document.metadata);
					DocumentRepo.update(document.name, document.annotator, 'Published', '');
					$location.path('/documents');					
				});
			};
			
			$scope.reject = function(document) {
				$scope.showModal = true;
			};
			
			$scope.managerAnnotating = function() {
				return ($routeParams.action == 'annotate');
			};
			
			$scope.managerReviewing = function() {
				return ($routeParams.action == 'review');
			};
			
			$scope.submitRejection = function(document, rejectionNotes) {
				if(rejectionNotes) {
					DocumentRepo.update(document.name, document.annotator, 'Rejected', rejectionNotes);
					$scope.showModal = false;
					$location.path('/documents');
				}
				else {
					$scope.validation = "Please enter text.";
				}
			};
			
			$scope.requiresCuration = function(name) {
				DocumentRepo.update(name, user.uin, 'Requires Curation');
				$location.path('/assignments');
			};
			
		});	
		
	});
	
});;metadataTool.controller('DocumentController', function ($controller, $scope, $timeout, $window, DocumentPage, DocumentRepo, User, UserRepo, ngTableParams) {

	angular.extend(this, $controller('AbstractController', {$scope: $scope}));
	
	var view = $window.location.pathname;
	
	var userRepo;
	
	var annotators = [];
	
	$scope.user = User.get();
	
	$scope.setTable = function() {
	
		$scope.tableParams = new ngTableParams({
	        page: 1,
	        count: 10,
	        sorting: {
	            name: 'asc'
	        },
	        filter: {
	        	name: '',
	        	status: (view == '/metadatatool/assignments' || view == '/metadatatool/users') ? 'Assigned' : (sessionStorage.role == 'ROLE_ANNOTATOR') ? 'Open' : '',
	            annotator: (view == '/metadatatool/assignments' || view == '/metadatatool/users') ? ($scope.selectedUser) ? $scope.selectedUser.uin : $scope.user.uin : ''
	        }
	    }, {
	        total: 0,
	        getData: function($defer, params) {
	        	
	        	var key; for(key in params.sorting()) {}
	        	
	        	if(view == '/metadatatool/assignments' || view == '/metadatatool/users') {
	        		if(!params.filter().annotator) {
	            		$timeout(function() {
	            			params.filter().annotator = ($scope.selectedUser) ? $scope.selectedUser.uin : $scope.user.uin;
	            		}, 500);
	            	}
	        	}

	        	DocumentPage.get(params.page(), params.count(), key, params.sorting()[key], params.filter()).then(function(data) {
	        		var page = JSON.parse(data.body).content.PageImpl;
	        		params.total(page.totalElements);
	        		$scope.docs = page.content;
	        		$defer.resolve($scope.docs);
	        	});
	        	
	        }
	    });
	
	};
		
	$scope.setTable();
	
	$scope.$watch('selectedUser.uin', function() {		
		$scope.setTable();
	});
	
	$scope.availableAnnotators = function() {
		if(!userRepo) {
			userRepo = UserRepo.get();
			for(var key in userRepo.list) {
				var user = userRepo.list[key];
				if(user.role == 'ROLE_ANNOTATOR' || user.role == 'ROLE_MANAGER') {
					annotators.push(user);
				}
			}
		}
		return annotators;
	};
	
	$scope.updateAnnotator = function(name, status, annotator) {
		if(!annotator) {
			annotator = $scope.user.uin;
		}
		else {
			annotator = JSON.parse(annotator);
		}
		DocumentRepo.update(name, annotator, status);		
	};
	
	$scope.reviewDocument = function(name) {
		console.log("Review " + name);
	};

	DocumentPage.listen().then(null, null, function(data) {
		$scope.tableParams.reload();
	});
	
});
;metadataTool.controller('UserController', function ($scope, User) {

	$scope.user = User.get();
	
});

;metadataTool.directive('modal', function () {
	return {
		template: '<div class="modal fade">' + 
		'<div class="modal-dialog" style="z-index:9999;">' + 
		'<div class="modal-content">' + 
		'<div class="modal-header">' + 
		'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
		'<h4 class="modal-title">{{ title }}</h4>' + 
		'</div>' + 
		'<div class="modal-body" ng-transclude></div>' + 
		'</div>' + 
		'</div>' + 
		'</div>',
		restrict: 'E',
		transclude: true,
		replace:true,
		scope:true,
		link: function postLink(scope, element, attrs) {
			scope.title = attrs.title;
			scope.$watch(attrs.visible, function(value){
				if(value === true)
					angular.element(element).modal('show');
				else
					angular.element(element).modal('hide');
			});

			angular.element(element).on('shown.bs.modal', function(){
				scope.$apply(function(){
					scope.$parent[attrs.visible] = true;
				});
			});

			angular.element(element).on('hidden.bs.modal', function(){
				scope.$apply(function(){
					scope.$parent[attrs.visible] = false;
				});
			});
		}
	};
});;metadataTool.directive('username', function () {
	return {
		template: '<span>{{user.firstName || "Obtaining User..."}} {{user.lastName}}</span>',
		restrict: 'E',
		scope:true,
		controller: 'UserController'
	};
});

metadataTool.directive('useremail', function () {
	return {
		template: '<span>{{user.email}}</span>',
		restrict: 'E',
		scope:true,
		controller: 'UserController'
	};
});

metadataTool.directive('useruin', function () {
	return {
		template: '<span>{{user.uin}}</span>',
		restrict: 'E',
		scope:true,
		controller: 'UserController'
	};
});

metadataTool.directive('userrole', function () {
	return {
		template: '<span>{{user.role}}</span>',
		restrict: 'E',
		scope:true,
		controller: 'UserController'
	};
});;metadataTool.service("AbstractModel", function () {

	var AbstractModel = function(data) {
		angular.extend(this, data);
	};

	/*
	* All abstracted methods can go here: (e.g. AbstractModel.myMethod = funciton() {} )
	* A model can then extend this my including "self = this;" and "angular.extend(self, AbstractModel);"
	* in its contructor.
	*/ 
	
	AbstractModel.unwrap = function(self, futureData, modelString) {
		
		if(!futureData.$$state) {
			angular.extend(self, futureData);
			return;
		}

		futureData.then(
			function(data) {
				angular.extend(self, JSON.parse(data.body).content[modelString]);		
			},
			function(data) {
				console.error(data);
			},
			function(data) {
				angular.extend(self, JSON.parse(data.body).content[modelString]);		
		});
	};
	
	return AbstractModel;

});;metadataTool.service("DocumentPage", function(WsApi, AbstractModel) {

	var self;

	var Documents = function(futureData) {
		self = this;

		//This causes our model to extend AbstractModel
		angular.extend(self, AbstractModel);
		
		self.unwrap(self, futureData, "PageImpl");
		
	};
	
	Documents.listener = WsApi.listen({
		endpoint: 'channel', 
		controller: 'documents', 
		method: '',
	});
	
	Documents.set = function(data) {
		self.unwrap(self, data, "PageImpl");
	};

	Documents.get = function(page, size, field, direction, filter) {
		
		if(!field) field = 'name';
		if(!direction) direction = 'asc';
		if(!filter.name) filter.name = '';
		if(!filter.status) filter.status = '';
		if(!filter.annotator) filter.annotator = '';
			
		return WsApi.fetch({
			endpoint: '/private/queue', 
			controller: 'document', 
			method: 'page',
			data: JSON.stringify({
				'page': page,
				'size': size,
				'field': field,
				'direction': direction,
				'name': filter.name,
				'status': filter.status,
				'annotator': filter.annotator
			})
		});
		
	};
	
	Documents.listen = function() {
		return Documents.listener;
	};
			
	return Documents;
	
});
;metadataTool.service("DocumentRepo", function(WsApi, AbstractModel) {

	var self;

	var Document = function(futureData) {
		self = this;

		//This causes our model to extend AbstractModel
		angular.extend(self, AbstractModel);
		
		self.unwrap(self, futureData, "HashMap");
		
	};

	Document.data = null;
	
	Document.promise = null;
	
	Document.listener = WsApi.listen({
		endpoint: 'channel', 
		controller: 'documents', 
		method: '',
	});

	Document.set = function(data) {
		self.unwrap(self, data, "HashMap");
	};

	Document.get = function(name) {

		var newDocumentPromise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'document', 
				method: 'get',
				data: JSON.stringify({'name': name})
		});
		
		Document.data = new Document(newDocumentPromise);
		
		Document.promise = newDocumentPromise;
		
		return Document.data;
	
	};
		
	Document.update = function(name, uin, status, notes) {
		
		var change = {
			'name': name,
			'uin': uin,
			'status': status,
			'notes': notes
		};
				
		var updateUserRolePromise = WsApi.fetch({
			endpoint: '/private/queue', 
			controller: 'document', 
			method: 'update',
			data: JSON.stringify(change)
		});
				
		if(updateUserRolePromise.$$state) {
			updateUserRolePromise.then(function(data) {	
				logger.log(data);
			});
		}
		
	};

	Document.listen = function() {
		return Document.listener;
	};
	
	Document.ready = function() {
		return Document.promise;
	};
	
	return Document;
	
});
;metadataTool.service("Metadata", function(WsApi, AbstractModel) {

	var self;

	var Metadata = function(futureData) {
		self = this;

		//This causes our model to extend AbstractModel
		angular.extend(self, AbstractModel);
		
		self.unwrap(self, futureData, "HashMap");
		
	};

	Metadata.data = null;
	
	Metadata.promise = null;
	
	Metadata.set = function(data) {
		self.unwrap(self, data);
	};
	
	Metadata.get = function(document) {
		var newMetadataPromise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'metadata', 
				method: 'get',
				data: JSON.stringify({'name': document.name})
		});
		
		Metadata.data = new Metadata(newMetadataPromise);
		
		Metadata.promise = newMetadataPromise;
		
		return Metadata.data;
	};
	
	Metadata.add = function(name, metadata) {
		var addMetadataSubmitPromise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'metadata', 
				method: 'add',
				data: JSON.stringify({
					'name': name,
					'metadata': metadata
				})
		});
		if(addMetadataSubmitPromise.$$state) {
			addMetadataSubmitPromise.then(function(data) {
				logger.log(data);
			});
		}		
	};
		
	Metadata.getAll = function() {
		return WsApi.fetch({
			endpoint: '/private/queue', 
			controller: 'metadata', 
			method: 'all',
		});	
	};
	
	Metadata.clear = function(name) {
		return WsApi.fetch({
			endpoint: '/private/queue', 
			controller: 'metadata', 
			method: 'clear',
			data: JSON.stringify({'name': name})
		});		
	};
	
	Metadata.getAllPublished = function() {
		return WsApi.fetch({
			endpoint: '/private/queue', 
			controller: 'metadata', 
			method: 'published'
		});
	};
	
	Metadata.ready = function() {
		return Metadata.promise;
	};
			
	return Metadata;
	
});
;metadataTool.service("PDF", function(WsApi, AbstractModel) {

	var self;

	var PDF = function(futureData) {
		self = this;

		//This causes our model to extend AbstractModel
		angular.extend(self, AbstractModel);
		self.unwrap(self, futureData, "HashMap");
		
	};

	PDF.data = null;
	
	PDF.set = function(data) {
		self.unwrap(self, data);
	};

	PDF.get = function(name) {

		var newPDFPromise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'document', 
				method: 'pdf',
				data: JSON.stringify({'name': name})
		});

		PDF.data = new PDF(newPDFPromise);

		return PDF.data;
	
	};
	
	return PDF;
	
});;metadataTool.service("TXT", function(WsApi, AbstractModel, $http) {

	var self;

	var TXT = function(futureData) {
		self = this;

		//This causes our model to extend AbstractModel
		angular.extend(self, AbstractModel);
		self.unwrap(self, futureData, "HashMap");
		
	};

	TXT.data = null;
	
	TXT.set = function(data) {
		self.unwrap(self, data);
	};

	TXT.get = function(name) {

		var newTxtPromise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'document', 
				method: 'txt',
				data: JSON.stringify({'name': name})
		});

		TXT.data = new TXT(newTxtPromise);
		
		if(newTxtPromise.$$state) {
			newTxtPromise.then(function(data) {
				$http.get(JSON.parse(data.body).content.HashMap.uri).then(function(res) {
					TXT.set({'verbage': res.data});
				});			
			});
		}
		
		return TXT.data;
	
	};
	
	return TXT;
	
});;metadataTool.service("User", function(WsApi, AbstractModel) {

	var self;

	var User = function(futureData) {
		self = this;

		//This causes our model to extend AbstractModel
		angular.extend(self, AbstractModel);
		
		self.unwrap(self, futureData, "Credentials");
		
	};
	
	User.data = null;
	
	User.set = function(data) {
		self.unwrap(self, data);
	};

	User.get = function(action) {

		if(User.data && !action) return User.data;

		var newUserPromise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'user', 
				method: 'credentials',
		});

		if(action) {
			newUserPromise.then(function(data) {
				User.set(JSON.parse(data.body).content.Credentials);
			});
		}
		else {
			User.data = new User(newUserPromise);	
		}

		return User.data;
	
	};

	return User;
	
});
;metadataTool.service("UserRepo", function($route, WsApi, AbstractModel) {

	var self;
	
	var Users = function(futureData) {
		self = this;

		//This causes our model to extend AbstractModel
		angular.extend(self, AbstractModel);
		
		self.unwrap(self, futureData, "HashMap");
		
	};
	
	Users.data = null;
	
	Users.listener = null;
	
	Users.set = function(data) {
		self.unwrap(self, data, "HashMap");
	};

	Users.get = function(action) {

		if(Users.data && !action) return Users.data;

		var newAllUsersPromise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'user', 
				method: 'all',
		});

		if(action) {
			newAllUsersPromise.then(function(data) {
				Users.set(JSON.parse(data.body).content.HashMap);
			});
		}
		else {
			Users.data = new Users(newAllUsersPromise);	
		}
		
		Users.listener = WsApi.listen({
			endpoint: 'channel', 
			controller: 'users', 
			method: '',
		});
				
		Users.set(Users.listener);
		

		return Users.data;
	
	};
	
	Users.updateRole = function(uin, role) {
		var change = {
			'uin': uin,
			'role': role
		};
		
		var updateUserRolePromise = WsApi.fetch({
			endpoint: '/private/queue', 
			controller: 'user', 
			method: 'update_role',
			data: JSON.stringify(change)
		});
		
		if(updateUserRolePromise.$$state) {
			updateUserRolePromise.then(function(data) {
				logger.log(data);
			});
		}		
	};
	
	Users.listen = function() {
		return Users.listener;
	};
	
	return Users;
	
});
;metadataTool.service("AuthServiceApi",function($http, $timeout) {

	var AuthServiceApi = this;

	AuthServiceApi.pendingRefresh = null;
	AuthServiceApi.pendingAssumptions = {};

	AuthServiceApi.getAssumedUser = function(assume, cb) {
		if (!AuthServiceApi.pendingAssumptions[assume.netid]) {
			AuthServiceApi.pendingAssumptions[assume.netid] = $http.get(globalConfig.authService+"/admin?netid="+assume.netid,{withCredentials: true}).
				then(function(response) { 
					if(response.data.assumed) {
						sessionStorage.token = response.data.assumed.tokenAsString;
					}

					// This timeout ensures that pending request is not nulled to early
					$timeout(function() {
						AuthServiceApi.pendingAssumptions[assume.netid] = null;
					});
					if(cb) cb();
					return response;   
			});
		}
		return AuthServiceApi.pendingAssumptions[assume.netid];
	};

	AuthServiceApi.getRefreshToken = function(cb) {
		if (!AuthServiceApi.pendingRefresh) {
			AuthServiceApi.pendingRefresh = $http.get(globalConfig.authService+"/refresh", {withCredentials: true}).
				then(function(response) {
					
						sessionStorage.token = response.data.tokenAsString;
						
						// This timeout ensures that pending request is not nulled to early
						$timeout(function() {
							AuthServiceApi.pendingRefresh = null;
						});
						
						if(cb) cb();
					},
					function(response) {
						delete sessionStorage.token;

						if(globalConfig.mockRole) {
							window.open(globalConfig.authService + "/token?referer="+location.href + "&mock=" + globalConfig.mockRole, "_self");
						}
						else {
							window.open(globalConfig.authService + "/token?referer="+location.href, "_self");
						}

				});
		} 
		
		return AuthServiceApi.pendingRefresh;
	};	

});
;metadataTool.service("WsApi",function($q, $http, wsservice, AuthServiceApi) {

	var WsApi = this;

	WsApi.listen = function(apiReq) {
		var request = '/ws/'+apiReq.controller+'/' + apiReq.method;
		var channel = '/' + apiReq.endpoint + "/" + apiReq.controller;
		
		if(apiReq.method) {
			channel +=  "/" + apiReq.method;
		}
		return wsservice.subscribe(channel);
	};

	WsApi.fetch = function(apiReq) {
		var request = '/ws/'+apiReq.controller+'/' + apiReq.method;	  
		var channel = apiReq.endpoint + "/" + apiReq.controller + "/" + apiReq.method;

		var fetchPromise = wsservice.send(request, {'jwt':sessionStorage.token, 'data':apiReq.data}, {}, channel);

		fetchPromise.then(null, null, function(data) {
			if(JSON.parse(data.body).content.String == "EXPIRED_JWT") {
				if(sessionStorage.assumedUser) {
					
					AuthServiceApi.getAssumedUser(JSON.parse(sessionStorage.assumedUser)).then(function() {
						wsservice.pendingReq[JSON.parse(data.body).content.RequestId.id].resend();
					});
					
				} else {
					
					AuthServiceApi.getRefreshToken().then(function() {
						wsservice.pendingReq[JSON.parse(data.body).content.RequestId.id].resend();
					});
					
				}

			}
			
		});

		return fetchPromise;
	};
	
});
;metadataTool.service("wsservice",function($q) { 
	
	var wsservice = this;
	
	wsservice.pendingReqCounter = 0;
	
	wsservice.pendingReq = {};
	
	wsservice.subscriptions = {};

	wsservice.client = window.stompClient;
	delete window.stompClient;

	wsservice.subscribe = function(channel, persist) {
		
		var id = "sub-"+wsservice.client.counter;
		
		var defer;

		if(!persist) persist = false;

		var subObj;

		if((subObj = wsservice.subExist(channel))) {
			defer = subObj.defer;
		} else {
			
			defer = $q.defer();
			subObj = {
				channel: channel,
				defer: defer
			};

			wsservice.client.subscribe(channel, function(data) {
				
				var requestId = JSON.parse(data.body).content.RequestId ? JSON.parse(data.body).content.RequestId.id : null;
				
				var response = JSON.parse(data.body).response;

				if(wsservice.pendingReq[requestId]) {

					/*logger.info("");
					logger.debug(channel);
					logger.info("Resolving Request " + requestId + ": " + wsservice.pendingReq[requestId].request);
					logger.log(JSON.parse(data.body));*/
					
					if(response != "refresh") {
						
						if (response != 'failure') {
							wsservice.pendingReq[requestId].defer.resolve(data);
						} else {
							wsservice.pendingReq[requestId].defer.reject(data);
						}
						
						delete wsservice.pendingReq[requestId];	
						
					} else {
						wsservice.pendingReq[requestId].defer.notify(data);
					}
					
				}
				
				defer.notify(data);

			});

			wsservice.subscriptions[id] = subObj;
		}

		return defer.promise;
	};

	wsservice.send = function(request, headers, payload, channel) {

		if(!wsservice.subExist(channel)) wsservice.subscribe(channel);

		var reqDefer = $q.defer();
		
		headers.id = wsservice.pendingReqCounter++;

		wsservice.client.send(request, headers, payload);
		
		wsservice.pendingReq[headers.id] = {
			defer: reqDefer,
			resend: function() {
				headers.jwt = sessionStorage.token;
				wsservice.client.send(request, headers, payload);
			}
		};

		return wsservice.pendingReq[headers.id].defer.promise;
		
	};

	wsservice.subExist = function(channel) {
		for(var key in wsservice.subscriptions) {
			var subObj = wsservice.subscriptions[key];
			if(subObj.channel == channel) return subObj;
		}
		return false;
	};
	
	wsservice.unsubscribe = function(sub) {
		wsservice.client.unsubscribe(sub);
		delete wsservice.subscriptions[sub];
	};

	wsservice.unsubscribeAll = function() {
		for(var key in wsservice.subscriptions){
			var sub = wsservice.subscriptions[key];
			if(!sub.persist) wsservice.unsubscribe(key);
		}
	};

});
;function setUpApp(bootstrapApp) {

	window.stompClient = Stomp.over(new SockJS(globalConfig.webService+"/connect"));
	
	var jwt = getJWT();

	if(!globalConfig.stompDebug)
		window.stompClient.debug = null; 

	if(jwt) {
		if(!sessionStorage.token)
			sessionStorage.token = jwt;

		angular.element(document).ready(function() {
			window.stompClient.connect({"jwt": sessionStorage.token}, function() {	
		  		bootstrapApp();
			});
		});

	} else {

		if(globalConfig.mockRole) {
			window.open(globalConfig.authService + "/token?referer="+location.href + "&mock=" + globalConfig.mockRole, "_self");
		}
		else {
			window.open(globalConfig.authService + "/token?referer="+location.href, "_self");
		}

	} 

	function getJWT() {

		if(sessionStorage.token) return sessionStorage.token;

		var queriesString = location.search;

		if(typeof(queriesString) == "undefined") return null;

		var queries = queriesString.substring(1).split("&");

		var jwt = null;
		
		for(var key in queries) {
			
			var queryString = queries[key];
			var query = queryString.split("=");
			if(query[0] == "jwt") jwt = query[1];

		}

		if(jwt) {
			var uri = location.toString();
			if (uri.indexOf("?") > 0) {
			    var clean_uri = uri.substring(0, uri.indexOf("?"));
			    history.replaceState({}, document.title, clean_uri);
			}
		}

		return jwt;
	}	

}

