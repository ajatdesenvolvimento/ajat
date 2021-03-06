/*** Generated by streamline 0.10.17 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb,__tryCatch=__rt.__tryCatch; var util = require("util");
















var commander = require("commander");
var StorageUtil = require("../../util/storage.util");
var utils = require("../../util/utils");
var validation = require("../../util/validation");
var performStorageOperation = StorageUtil.performStorageOperation;
var startProgress = StorageUtil.startProgress;
var endProgress = StorageUtil.endProgress;

var $ = utils.getLocaleString;




commander.Command.prototype.addStorageAccountOption = function() {
  this.option("-a, --account-name <accountName>", $("the storage account name"));
  this.option("-k, --account-key <accountKey>", $("the storage account key"));
  this.option("-c, --connection-string <connectionString>", $("the storage connection string"));
  this.option("-vv", $("run storage command in debug mode"));
  return this;};





exports.init = function(cli) {


  StorageUtil.init(cli);

  var MAX_RULES = 5;
  var SupportedMethods = { DELETE: 0, GET: 1, HEAD: 2, MERGE: 3, POST: 4, OPTIONS: 5, PUT: 6, TRACE: 7, CONNECT: 8 };




  var storage = cli.category("storage").description($("Commands to manage your Storage objects"));


  var logger = cli.output;

  var logging = storage.category("logging").description($("Commands to manage your Storage logging properties"));


  logging.command("show").description($("Show the logging properties of the storage services ")).option("--blob", $("show logging properties for blob service")).option("--table", $("show logging properties for table service")).option("--queue", $("show logging properties for queue service")).addStorageAccountOption().execute(showLoggingProperties);







  logging.command("set").description($("Set the logging properties of the storage service")).option("--blob", $("set logging properties for blob service")).option("--table", $("set logging properties for table service")).option("--queue", $("set logging properties for queue service")).option("--version <version>", $("the version string")).option("--retention <retention>", $("set logging retention in days")).option("--read", $("enable logging for read requests")).option("--read-off", $("disable logging for read requests")).option("--write", $("enable logging for write requests")).option("--write-off", $("disable logging for write requests")).option("--delete", $("enable logging for delete requests")).option("--delete-off", $("disable logging for delete requests")).addStorageAccountOption().execute(setLoggingProperties);















  var metrics = storage.category("metrics").description($("Commands to manage your Storage metrics properties"));


  metrics.command("show").description($("Show the metrics properties of the storage services ")).option("--blob", $("show metrics properties for blob service")).option("--table", $("show metrics properties for table service")).option("--queue", $("show metrics properties for queue service")).addStorageAccountOption().execute(showMetricsProperties);







  metrics.command("set").description($("Set the metrics properties of the storage service")).option("--blob", $("set metrics properties for blob service")).option("--table", $("set metrics properties for table service")).option("--queue", $("set metrics properties for queue service")).option("--version <version>", $("the version string")).option("--retention <retention>", $("set metrics retention in days")).option("--hour", $("set hourly metrics properties")).option("--hour-off", $("turn off hourly metrics properties")).option("--minute", $("set minute metrics properties")).option("--minute-off", $("turn off minute metrics properties")).option("--api", $("include API in metrics ")).option("--api-off", $("exclude API from metrics")).addStorageAccountOption().execute(setMetricsProperties);















  var cors = storage.category("cors").description($("Commands to manage your Storage CORS (Cross-Origin Resource Sharing)"));


  cors.command("set").description($("Set the CORS rules of the storage service")).option("--blob", $("set CORS rules for blob service")).option("--table", $("set CORS rules for table service")).option("--queue", $("set CORS rules for queue service")).option("--file", $("set CORS rules for file service")).option("--cors <cors>", $("the CORS rules array in json format")).addStorageAccountOption().execute(setCORS);









  cors.command("show").description($("Show the CORS rules of the storage service")).option("--blob", $("show CORS rules for blob service")).option("--table", $("show CORS rules for table service")).option("--queue", $("show CORS rules for queue service")).option("--file", $("show CORS rules for file service")).addStorageAccountOption().execute(showCORS);








  cors.command("delete").description($("Delete all the CORS rules of the storage service")).option("--blob", $("delete CORS rules for blob service")).option("--table", $("delete CORS rules for table service")).option("--queue", $("delete CORS rules for queue service")).option("--file", $("delete CORS rules for file service")).option("-q, --quiet", $("delete the CORS rules without confirmation")).addStorageAccountOption().execute(deleteCORS);


















  function showLoggingProperties(options, _) { var types, operations, tips, serviceProperties, index, property, output; var __frame = { name: "showLoggingProperties", line: 153 }; return __func(_, this, arguments, showLoggingProperties, 1, __frame, function __$showLoggingProperties() {
      types = getServiceTypes(options, false);
      operations = [];

      types.forEach(function(type) {
        var client = getServiceClient(type, options);
        operations.push(StorageUtil.getStorageOperation(client, type, "getServiceProperties")); });


      tips = util.format($("Getting storage logging properties for service: %s"), types);
      startProgress(tips);

      serviceProperties = []; return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$showLoggingProperties() {

            index = 0; var __3 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$showLoggingProperties() { __more = false; if (__3) { index++; } else { __3 = true; } ; var __2 = (index < operations.length); if (__2) {
                  return performStorageOperation(operations[index], __cb(_, __frame, 15, 23, function ___(__0, __1) { property = __1;
                    property.type = operations[index].type;
                    serviceProperties.push(property); while (__more) { __loop(); }; __more = true; }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(function __$showLoggingProperties() { _(null, null, true); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$showLoggingProperties() {


              endProgress(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$showLoggingProperties() {


          output = [];
          serviceProperties.forEach(function(property) {
            property.Logging.Type = property.type;
            output.push(property.Logging); });


          cli.interaction.formatOutput(output, function(outputData) {
            logger.table(outputData, function(row, item) {
              row.cell($("Service Type"), item.Type);
              row.cell($("Version"), item.Version);
              row.cell($("Retention Days"), getRetentionString(item.RetentionPolicy));
              row.cell($("Read Requests"), getStatusString(item.Read));
              row.cell($("Write Requests"), getStatusString(item.Write));
              row.cell($("Delete Requests"), getStatusString(item.Delete)); }); }); _(); }); }); }); };









  function setLoggingProperties(options, _) { var types, client, getOperation, setOperation, tips, serviceProperties; var __frame = { name: "setLoggingProperties", line: 199 }; return __func(_, this, arguments, setLoggingProperties, 1, __frame, function __$setLoggingProperties() {
      types = getServiceTypes(options, true);
      client = getServiceClient(types[0], options);
      getOperation = StorageUtil.getStorageOperation(client, types[0], "getServiceProperties");
      setOperation = StorageUtil.getStorageOperation(client, types[0], "setServiceProperties");

      tips = util.format($("Setting storage logging properties for service: %s"), types);
      startProgress(tips); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$setLoggingProperties() {

            return performStorageOperation(getOperation, __cb(_, __frame, 9, 30, function ___(__0, __1) { serviceProperties = __1;
              generateServiceLoggingProperties(serviceProperties, options);
              return performStorageOperation(setOperation, __cb(_, __frame, 11, 6, function __$setLoggingProperties() { _(null, null, true); }, true), serviceProperties); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$setLoggingProperties() {

              endProgress(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$setLoggingProperties() {


          return showLoggingProperties(options, __cb(_, __frame, 16, 4, function __$setLoggingProperties() { _(); }, true)); }); }); }); };







  function showMetricsProperties(options, _) { var types, operations, tips, serviceProperties, index, property, output; var __frame = { name: "showMetricsProperties", line: 223 }; return __func(_, this, arguments, showMetricsProperties, 1, __frame, function __$showMetricsProperties() {
      types = getServiceTypes(options, false);
      operations = [];

      types.forEach(function(type) {
        var client = getServiceClient(type, options);
        operations.push(StorageUtil.getStorageOperation(client, type, "getServiceProperties")); });


      tips = util.format($("Getting storage metrics properties for service: %s"), types);
      startProgress(tips);

      serviceProperties = []; return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$showMetricsProperties() {

            index = 0; var __3 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$showMetricsProperties() { __more = false; if (__3) { index++; } else { __3 = true; } ; var __2 = (index < operations.length); if (__2) {
                  return performStorageOperation(operations[index], __cb(_, __frame, 15, 23, function ___(__0, __1) { property = __1;
                    property.type = operations[index].type;
                    serviceProperties.push(property); while (__more) { __loop(); }; __more = true; }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(function __$showMetricsProperties() { _(null, null, true); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$showMetricsProperties() {


              endProgress(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$showMetricsProperties() {


          output = [];
          serviceProperties.forEach(function(property) {
            var properties = { type: property.type, HourMetrics: [], MinuteMetrics: [] };
            properties.HourMetrics.push(property.HourMetrics);
            properties.MinuteMetrics.push(property.MinuteMetrics);
            output.push(properties); });


          cli.interaction.formatOutput(output, function(outputData) {
            outputData.forEach(function(properties) {
              logger.data(util.format($("The metrics properties for %s service are: "), properties.type));
              logger.table(properties.HourMetrics, function(row, item) {
                row.cell($("Metrics Type"), "Hourly");
                row.cell($("Enabled"), getStatusString(item.Enabled));
                row.cell($("Version"), item.Version);
                row.cell($("Retention Days"), getRetentionString(item.RetentionPolicy));
                row.cell($("Include APIs"), getStatusString(item.IncludeAPIs)); });

              logger.data("");
              logger.table(properties.MinuteMetrics, function(row, item) {
                row.cell($("Metrics Type"), "Minute");
                row.cell($("Enabled"), getStatusString(item.Enabled));
                row.cell($("Version"), item.Version);
                row.cell($("Retention Days"), getRetentionString(item.RetentionPolicy));
                row.cell($("Include APIs"), getStatusString(item.IncludeAPIs)); });

              logger.data("\n"); }); }); _(); }); }); }); };









  function setMetricsProperties(options, _) { var types, client, getOperation, setOperation, tips, serviceProperties; var __frame = { name: "setMetricsProperties", line: 282 }; return __func(_, this, arguments, setMetricsProperties, 1, __frame, function __$setMetricsProperties() {
      types = getServiceTypes(options, true);
      client = getServiceClient(types[0], options);
      getOperation = StorageUtil.getStorageOperation(client, types[0], "getServiceProperties");
      setOperation = StorageUtil.getStorageOperation(client, types[0], "setServiceProperties");

      tips = util.format($("Setting storage metric properties for service: %s"), types);
      startProgress(tips); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$setMetricsProperties() {

            return performStorageOperation(getOperation, __cb(_, __frame, 9, 30, function ___(__0, __1) { serviceProperties = __1;
              generateServiceMetricsProperties(serviceProperties, options);
              return performStorageOperation(setOperation, __cb(_, __frame, 11, 6, function __$setMetricsProperties() { _(null, null, true); }, true), serviceProperties); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$setMetricsProperties() {

              endProgress(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$setMetricsProperties() {


          return showMetricsProperties(options, __cb(_, __frame, 16, 4, function __$setMetricsProperties() { _(); }, true)); }); }); }); };







  function setCORS(options, _) { var types, client, getOperation, setOperation, tips, serviceProperties, rules; var __frame = { name: "setCORS", line: 306 }; return __func(_, this, arguments, setCORS, 1, __frame, function __$setCORS() {
      types = getServiceTypes(options, true, true);
      client = getServiceClient(types[0], options);
      getOperation = StorageUtil.getStorageOperation(client, types[0], "getServiceProperties");
      setOperation = StorageUtil.getStorageOperation(client, types[0], "setServiceProperties");

      if (!options.cors) {
        return _(new Error($("Please set the --cors value"))); } ;


      tips = util.format($("Setting storage CORS rules for service: %s"), types[0]);
      startProgress(tips); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$setCORS() {

            return performStorageOperation(getOperation, __cb(_, __frame, 13, 30, function ___(__0, __1) { serviceProperties = __1;
              serviceProperties.Cors.CorsRule = [];

              rules = JSON.parse(options.cors);
              rules.forEach(function(rule) {
                var ruleOptions = options;
                ruleOptions.add = true;
                ruleOptions.allowedOrigins = (rule.AllowedOrigins ? rule.AllowedOrigins.toString() : "");
                ruleOptions.allowedMethods = (rule.AllowedMethods ? rule.AllowedMethods.toString() : "");
                ruleOptions.allowedHeaders = (rule.AllowedHeaders ? rule.AllowedHeaders.toString() : "");
                ruleOptions.exposedHeaders = (rule.ExposedHeaders ? rule.ExposedHeaders.toString() : "");
                ruleOptions.maxAge = (rule.MaxAgeInSeconds ? rule.MaxAgeInSeconds.toString() : "");
                generateCORSRules(serviceProperties, ruleOptions); });

              return performStorageOperation(setOperation, __cb(_, __frame, 27, 6, function __$setCORS() { _(null, null, true); }, true), serviceProperties); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$setCORS() {

              endProgress(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$setCORS() {


          return showCORS(options, __cb(_, __frame, 32, 4, function __$setCORS() { _(); }, true)); }); }); }); };







  function showCORS(options, _) { var types, client, getOperation, tips, serviceProperties, output; var __frame = { name: "showCORS", line: 346 }; return __func(_, this, arguments, showCORS, 1, __frame, function __$showCORS() {
      types = getServiceTypes(options, true, true);
      client = getServiceClient(types[0], options);
      getOperation = StorageUtil.getStorageOperation(client, types[0], "getServiceProperties");

      tips = util.format($("Getting storage CORS rules for service: %s"), types[0]);
      serviceProperties = { };
      startProgress(tips); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$showCORS() {

            return performStorageOperation(getOperation, __cb(_, __frame, 9, 26, function ___(__0, __1) { serviceProperties = __1; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$showCORS() {

              endProgress(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$showCORS() {


          output = (serviceProperties.Cors.CorsRule ? serviceProperties.Cors.CorsRule : { });

          cli.interaction.formatOutput(output, function(outputData) {
            var number = 1;
            if ((outputData.length > 0)) {
              outputData.forEach(function(rule) {
                logger.data(util.format($("CORS rule %s: "), number++));
                logger.data(util.format($("  Allowed Origins: %s"), rule.AllowedOrigins));
                logger.data(util.format($("  Allowed Methods: %s"), rule.AllowedMethods));
                logger.data(util.format($("  Allowed Headers: %s"), rule.AllowedHeaders));
                logger.data(util.format($("  Exposed Headers: %s"), rule.ExposedHeaders));
                logger.data(util.format($("  Maximum Age: %s"), rule.MaxAgeInSeconds));
                logger.data(""); }); }

             else {
              logger.info(util.format($("No CORS rule is set"))); } ; }); _(); }); }); }); };









  function deleteCORS(options, _) { var types, client, getOperation, setOperation, force, tips, serviceProperties; var __frame = { name: "deleteCORS", line: 385 }; return __func(_, this, arguments, deleteCORS, 1, __frame, function __$deleteCORS() {
      types = getServiceTypes(options, true, true);
      client = getServiceClient(types[0], options);
      getOperation = StorageUtil.getStorageOperation(client, types[0], "getServiceProperties");
      setOperation = StorageUtil.getStorageOperation(client, types[0], "setServiceProperties");
      force = !!options.quiet; return (function __$deleteCORS(__then) {

        if ((force !== true)) {
          return cli.interaction.confirm($("Do you want to delete the CORS rules? [y/n]"), __cb(_, __frame, 8, 30, function ___(__0, __1) { force = __1;
            if ((force !== true)) { return _(null); } ; __then(); }, true)); } else { __then(); } ; })(function __$deleteCORS() {




        tips = util.format($("Deleting storage CORS rules for service: %s"), types[0]);
        startProgress(tips); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$deleteCORS() {

              return performStorageOperation(getOperation, __cb(_, __frame, 17, 30, function ___(__0, __2) { serviceProperties = __2;
                options.add = false;
                generateCORSRules(serviceProperties, options);
                return performStorageOperation(setOperation, __cb(_, __frame, 20, 6, function __$deleteCORS() { _(null, null, true); }, true), serviceProperties); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$deleteCORS() {

                endProgress(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$deleteCORS() {


            logger.info(util.format($("CORS rules for %s service have been deleted successfully"), types[0])); _(); }); }); }); }); };










  function getServiceTypes(options, exclusive, supportFile) {
    var isBlob = options.blob;
    var isTable = options.table;
    var isQueue = options.queue;
    var isFile = options.file;

    var count = 0;
    count = (isBlob ? (count + 1) : count);
    count = (isTable ? (count + 1) : count);
    count = (isQueue ? (count + 1) : count);
    if (supportFile) {
      count = (isFile ? (count + 1) : count); }
     else if (isFile) {
      throw new Error($("File service doesn't support the operation")); }  ;


    if ((count === 0)) {
      if (exclusive) {
        throw new Error($("Please define the service type")); }
       else {
        isBlob = isTable = isQueue = true;
        isFile = supportFile; } ; }

     else if (((count > 1) && exclusive)) {
      throw new Error($("Please define only one service type")); }  ;


    var types = [];
    if (isBlob) {
      types.push(StorageUtil.OperationType.Blob); } ;

    if (isTable) {
      types.push(StorageUtil.OperationType.Table); } ;

    if (isQueue) {
      types.push(StorageUtil.OperationType.Queue); } ;

    if (isFile) {
      types.push(StorageUtil.OperationType.File); } ;

    return types; };








  function getServiceClient(type, options) {
    switch (type) {
    case StorageUtil.OperationType.Blob: return StorageUtil.getServiceClient(StorageUtil.getBlobService, options);
    case StorageUtil.OperationType.Queue:
      return StorageUtil.getServiceClient(StorageUtil.getQueueService, options);
    case StorageUtil.OperationType.Table:
      return StorageUtil.getServiceClient(StorageUtil.getTableService, options);
    case StorageUtil.OperationType.File:
      return StorageUtil.getServiceClient(StorageUtil.getFileService, options);
    }; };










  function generateServiceLoggingProperties(serviceProperties, options) {
    if (options.Version) {
      serviceProperties.Logging.Version = "1.0"; } ;


    if (options.retention) {
      if (!StorageUtil.isValidRetention(options.retention)) {
        throw new Error($("--retention must be set with a positive integer")); } ;

      if ((typeof options.retention === "string")) {
        options.retention = parseInt(options.retention, 10); } ;

      serviceProperties.Logging.RetentionPolicy = { };
      if ((options.retention !== 0)) {
        serviceProperties.Logging.RetentionPolicy.Enabled = true;
        serviceProperties.Logging.RetentionPolicy.Days = options.retention; }
       else {
        serviceProperties.Logging.RetentionPolicy.Enabled = false;
        delete serviceProperties.Logging.RetentionPolicy.Days; } ; } ;



    if ((options.read && options.readOff)) {
      throw new Error($("--read and --read-off cannot be both defined")); }
     else if (options.read) {
      serviceProperties.Logging.Read = true; }
     else if (options.readOff) {
      serviceProperties.Logging.Read = false; }   ;


    if ((options.write && options.writeOff)) {
      throw new Error($("--write and --write-off cannot be both defined")); }
     else if (options.write) {
      serviceProperties.Logging.Write = true; }
     else if (options.writeOff) {
      serviceProperties.Logging.Write = false; }   ;


    if ((options.delete && options.deleteOff)) {
      throw new Error($("--delete and --delete-off cannot be both defined")); }
     else if (options.delete) {
      serviceProperties.Logging.Delete = true; }
     else if (options.deleteOff) {
      serviceProperties.Logging.Delete = false; }   ; };










  function generateServiceMetricsProperties(serviceProperties, options) {
    if ((((!options.hour && !options.minute) && !options.hourOff) && !options.minuteOff)) {
      throw new Error($("Please define one of them: --hour, --minute, --hour-off or --minute-off")); }
     else if ((options.hour && options.minute)) {
      throw new Error($("Only one of --hour and --minute should be defined")); }  ;


    if ((options.hour && options.hourOff)) {
      throw new Error($("--hour and --hour-off cannot be both defined")); }
     else if (options.hour) {
      setMetrics(serviceProperties.HourMetrics, options); }
     else if (options.hourOff) {
      disableMetrics(serviceProperties.HourMetrics); }   ;


    if ((options.minute && options.minuteOff)) {
      throw new Error($("--minute and --minute-off cannot be both defined")); }
     else if (options.minute) {
      setMetrics(serviceProperties.MinuteMetrics, options); }
     else if (options.minuteOff) {
      disableMetrics(serviceProperties.MinuteMetrics); }   ; };









  function setMetrics(metrics, options) {
    metrics.Enabled = true;

    if (options.Version) {
      metrics.Version = "1.0"; } ;


    if (options.retention) {
      if (!StorageUtil.isValidRetention(options.retention)) {
        throw new Error($("--retention must be set with a positive integer")); } ;

      if ((typeof options.retention === "string")) {
        options.retention = parseInt(options.retention, 10); } ;

      metrics.RetentionPolicy = { };
      if ((options.retention !== 0)) {
        metrics.RetentionPolicy.Enabled = true;
        metrics.RetentionPolicy.Days = options.retention; }
       else {
        metrics.RetentionPolicy.Enabled = false;
        delete metrics.RetentionPolicy.Days; } ; } ;



    if ((options.api && options.apiOff)) {
      throw new Error($("--api and --api-off cannot be both defined")); }
     else if (options.api) {
      metrics.IncludeAPIs = true; }
     else if (options.apiOff) {
      metrics.IncludeAPIs = false; }   ; };








  function disableMetrics(metrics) {
    if (metrics) {
      metrics.Enabled = false;
      delete metrics.IncludeAPIs; } ; };









  function getStatusString(isOn) {
    return (isOn ? $("on") : $("off")); };








  function getRetentionString(retention) {
    if ((retention && retention.Enabled)) {
      return retention.Days.toString(); }
     else {
      return $("Not set"); } ; };










  function generateCORSRules(serviceProperties, options) {
    if (options.add) {
      var rule = {
        AllowedOrigins: options.allowedOrigins.split(","),
        AllowedMethods: parseAndValidateCORSRuleMethods(options.allowedMethods),
        AllowedHeaders: options.allowedHeaders.split(","),
        ExposedHeaders: options.exposedHeaders.split(","),
        MaxAgeInSeconds: parseAndValidateCORSRuleMaxAge(options.maxAge) };

      serviceProperties.Cors.CorsRule.push(rule);

      if ((serviceProperties.Cors.CorsRule.length > MAX_RULES)) {
        throw new Error(util.format($("You can only specify up to %s CORS rules per storage service"), MAX_RULES)); } ; }

     else {
      serviceProperties.Cors = { }; } ; };










  function parseAndValidateCORSRuleMethods(methods) {
    var allowed = methods.toUpperCase().split(",");
    allowed.forEach(function(method) {
      method = method.trim();
      validation.isValidEnumValue(method, Object.keys(SupportedMethods)); });

    return allowed; };







  function parseAndValidateCORSRuleMaxAge(maxAge) {
    if ((maxAge && !validation.isInt(maxAge))) {
      throw new Error($("The maximum age should be an integer")); } ;

    return parseInt(maxAge); };};
