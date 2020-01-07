metadataTool.filter('logTypeClass', function () {
    return function (type) {
      var classes = type ? "log-type-" + type.toLowerCase() : "";

      switch (type) {
        case "ALERT":
          classes += " alert alert-danger";
          break;
        case "WARNING":
          classes += " alert alert-warning";
          break;
        case "ATTACHMENT":
        case "CONNECTION":
        case "ITEM":
        case "MESSAGE":
          break;
        default:
          return "";
      }

      return classes;
    };
});
