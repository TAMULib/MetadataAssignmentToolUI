metadataTool.repo("DocumentRepo", function DocumentRepo(Document, WsApi) {

    this.get = function(name) {
        angular.extend(this.mapping.instantiate, {'method': 'get/' + name});
        return new Document();
    };

    this.update = function(name, status, user, notes) {
        angular.extend(this.mapping.update, {'data': {
            'name': name,
            'status': status,
            'user': user,
            'notes': notes
        }});

        return WsApi.fetch(this.mapping.update);
    };

    this.save = function(document) {
        angular.extend(this.mapping.save, {'data': JSON.parse(angular.toJson(document))});
        return WsApi.fetch(this.mapping.save);
    };

    this.push = function(name) {
        angular.extend(this.mapping.push, {'method': 'push/' + name});
        return WsApi.fetch(this.mapping.push);
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
