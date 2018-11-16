metadataTool.repo("ProjectAuthorityRepo", function ProjectAuthorityRepo(WsApi) {
    this.getTypes = function () {
        return WsApi.fetch(this.mapping.types);
    };

    this.uploadCsv = function(file) {
        var formData = new FormData();
        formData.append("file",file,file.name);
        return WsApi.fetch(this.mapping.uploadCsv,
            {
                method: "POST",
                headers: {
                    "Content-Type": undefined
                },
                data: formData
            }
        );
    };

    return this;

});