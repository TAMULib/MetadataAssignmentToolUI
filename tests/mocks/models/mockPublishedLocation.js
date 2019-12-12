var dataPublishedLocation1 = {
  id: 1,
  repository: 1,
  url: "http://localhost"
};

var dataPublishedLocation2 = {
  id: 2,
  repository: 2,
  url: "http://localhost"
};

var dataPublishedLocation3 = {
  id: 3,
  repository: 3,
  url: "http://localhost"
};

var mockPublishedLocation = function($q) {
  var model = mockModel("PublishedLocation", $q, dataPublishedLocation1);

  return model;
};

angular.module('mock.publishedLocation', []).service('PublishedLocation', mockPublishedLocation);
