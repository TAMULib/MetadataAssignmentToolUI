metadataTool.filter('cantaloupeUrl', function () {
    return function (fileUrl) {
        var fedoraPath = appConfig.fedoraPath;

        if (fileUrl.indexOf(fedoraPath) !== -1) {
            fileUrl = fileUrl.split(fedoraPath, 2)[1];
        }

        return appConfig.cantaloupeService + btoa(fileUrl) + "/info.json";
    };
});
