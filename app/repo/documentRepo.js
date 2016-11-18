metadataTool.repo("DocumentRepo", function DocumentRepo(Document, WsApi) {

    this.get = function(projectName, documentName) {
        // TODO: check repo first then fetch, requires page being pushed to repo
        angular.extend(this.mapping.instantiate, {'method': 'get/' + projectName + '/'+ documentName});
        return new Document();
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

    this.selectiveListen = function() {
        return WsApi.listen(this.mapping.selectiveListen);
    };

    return this;

});
