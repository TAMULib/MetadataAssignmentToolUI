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

        console.log(this.mapping.update)

        return WsApi.fetch(this.mapping.update);
    };

    this.save = function(document) {
        angular.extend(this.mapping.save, {'data': JSON.parse(angular.toJson(document))});
        return WsApi.fetch(this.mapping.save);
    };

    this.push = function(name) {
        angular.extend(this.mapping.push, {'method': 'get/' + name});
        return WsApi.fetch(this.mapping.push);
    };

    this.page = function(page, size, field, direction, filter) {

        if(!field) field = 'name';
        if(!direction) direction = 'asc';
        if(!filter.name) filter.name = '';
        if(!filter.status) filter.status = '';
        if(!filter.annotator) filter.annotator = '';

        angular.extend(this.mapping.page, {'data': {
            'page': page,
            'size': size,
            'field': field,
            'direction': direction,
            'name': filter.name,
            'status': filter.status,
            'annotator': filter.annotator
        }});
            
        return WsApi.fetch(this.mapping.page);
    };

    return this;

});
