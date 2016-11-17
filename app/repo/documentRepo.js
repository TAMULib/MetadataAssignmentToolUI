metadataTool.repo("DocumentRepo", function DocumentRepo(Document, WsApi) {

    this.get = function(projectName, documentName) {
        angular.extend(this.mapping.instantiate, {'method': 'get/' + projectName + '/'+ documentName});
        return new Document();
    };

    this.update = function(name, status, user, notes) {
        angular.extend(this.mapping.quickUpdate, {'data': {
            'name': name,
            'status': status,
            'user': user,
            'notes': notes
        }});
        return WsApi.fetch(this.mapping.quickUpdate);
    };

    this.page = function(number, size, field, direction, filters) {

        if(!field) field = 'name';
        if(!direction) direction = 'asc';

        angular.extend(this.mapping.page, {'data': {
            'page': {
                'number': number,
                'size': size
            },
            'sort': {
                'field': field,
                'direction': direction
            },
            'filters': filters
        }});

        return WsApi.fetch(this.mapping.page);
    };

    return this;

});
