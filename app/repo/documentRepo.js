metadataTool.repo("DocumentRepo", function DocumentRepo($q, Document, WsApi) {

    var documentRepo = this;

    var resolver = function(resolve) {
        documentDefer.resolve(d);
    };

    documentRepo.get = function(projectName, documentName) {
      var documentDefer = $q.defer();
      var doc;
      for (var d in documentRepo.getAll()) {
        if (d.project === projectName && d.name === documentName) {
          doc = d;
          break;
        }
      }

      if (document === undefined) {

          angular.extend(documentRepo.mapping.instantiate, {
            'method': 'get/' + projectName + '/' + documentName
          });
          documentPromise = WsApi.fetch(documentRepo.mapping.instantiate).then(function(data) {
            var documentPayload = angular.fromJson(data.body).payload.Document;
            document = new Document(documentPayload);
            documentRepo.empty();
            documentRepo.add(document);
            documentRepo.makeReady();
            documentDefer.resolve(document);
          });

      }

      if (doc === undefined) {
        angular.extend(documentRepo.mapping.instantiate, {
          'method': 'get/' + projectName + '/' + documentName
        });
        documentPromise = WsApi.fetch(documentRepo.mapping.instantiate).then(function(data) {
          var documentPayload = angular.fromJson(data.body).payload.Document;
          doc = new Document(documentPayload);
          documentRepo.empty();
          documentRepo.add(doc);
          documentRepo.makeReady();
          documentDefer.resolve(documentRepo.findById(doc.id));
        });
      } else {
        documentDefer.resolve(doc);
      }

      return documentDefer.promise;
    };

    documentRepo.page = function(number, size, field, direction, filters) {

        return $q(function(resolve) {
            if (!field) field = 'name';
            if (!direction) direction = 'asc';

            angular.extend(documentRepo.mapping.page, {
                'data': {
                    'page': {
                        'number': number,
                        'size': size
                    },
                    'sort': {
                        'field': field,
                        'direction': direction
                    },
                    'filters': filters
                }
            });

            WsApi.fetch(documentRepo.mapping.page).then(function(data) {
                var page = angular.fromJson(data.body).payload.PageImpl;
                documentRepo.empty();
                documentRepo.addAll(page.content);
                resolve(page);
            });
        });

    };

    return documentRepo;

});
