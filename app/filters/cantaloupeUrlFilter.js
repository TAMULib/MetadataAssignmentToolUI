metadataTool.filter('cantaloupeUrl', function () {
    return function (fileUrl) {
        return appConfig.cantaloupeService + btoa(fileUrl) + "/info.json";
    };
});
