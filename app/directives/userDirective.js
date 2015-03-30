metadataTool.directive('username', function () {
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
});