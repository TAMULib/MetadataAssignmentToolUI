metadataTool.repo("DocumentRepo", function DocumentRepo($q, Document, WsApi) {

    var documentRepo = this;

    documentRepo.get = function(projectName, documentName) {
        var document;

        for (var d in documentRepo.getAll()) {
            if (d.project === projectName && d.name === documentName) {
                document = d;
                break;
            }
        }

        if (document === undefined) {
            document = new Document();
            angular.extend(documentRepo.mapping.instantiate, {
                'method': 'get/' + projectName + '/' + documentName
            });
            document.fetch();
        }

        return document;
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

    WsApi.listen(documentRepo.mapping.listenForUpdate).then(null, null, function(data) {
        var document = angular.fromJson(data.body).payload.Document;
        var docInRepo = documentRepo.findById(document.id);
        if (docInRepo !== undefined) {
            angular.extend(docInRepo, document);
        }
    });

    documentRepo.listenForNew = function() {
        return WsApi.listen(documentRepo.mapping.listenForNew);
    };

    return documentRepo;

});
