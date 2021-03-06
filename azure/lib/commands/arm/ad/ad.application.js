/*** Generated by streamline 0.10.17 (callbacks) - DO NOT EDIT ***/ "use strict"; var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb,__catch=__rt.__catch,__tryCatch=__rt.__tryCatch; var adUtils = require("./adUtils");
















var profile = require("../../../util/profile");
var utils = require("../../../util/utils");
var util = require("util");

var $ = utils.getLocaleString;

exports.init = function(cli) {
  var log = cli.output;
  var withProgress = cli.interaction.withProgress.bind(cli.interaction);

  var ad = cli.category("ad").description($("Commands to display active directory objects"));

  var adApp = ad.category("app").description($("Commands to display active directory applications"));


  adApp.command("create").description($("Creates a new active directory application")).option("-n --name <name>", $("the display name for the application")).option("--home-page <home-page>", $("the URL to the application homepage")).option("-a --available", $("indicates if the application will be available to other tenants")).option("-p --password <password>", $("the value for the password credential associated with the application that will be valid for one year by default")).option("-i --identifier-uris <identifier-uris>", $("the comma-delimitied URIs that identify the application")).option("--key-value <key-value>", $("the value for the key credentials associated with the application that will be valid for one year by default")).option("--key-type <key-type>", $("the type of the key credentials associated with the application. Acceptable values are AsymmetricX509Cert, Password and Symmetric")).option("--key-usage <key-usage>", $("the usage of the key credentials associated with the application. Acceptable values are Sign and Verify")).option("--start-date <start-date>", $("the start date after which password or key would be valid. Default value is current time")).option("--end-date <end-date>", $("the end date till which password or key is valid. Default value is one year after current time")).execute(function __1(options, _) { var startDate, endDate, keyType, keyUsage, uris, appParams, subscription, client, application, currentUserObject; var __frame = { name: "__1", line: 45 }; return __func(_, this, arguments, __1, 1, __frame, function __$__1() {












      if (((!options.name || !options.homePage) || !options.identifierUris)) {
        return _(new Error($("--name, --home-page and --identifier-uris are all required parameters."))); } ;

      if ((options.password && options.keyValue)) {
        return _(new Error($("specify either --password or --key-value, but not both"))); } ;


      startDate = (options.startDate ? new Date(Date.parse(options.startDate)) : new Date(Date.now()));








      return (function ___closure(_) { var date; if (options.endDate) { return _(null, new Date(Date.parse(options.endDate))); } else { date = new Date(startDate); date.setFullYear((startDate.getFullYear() + 1)); return _(null, date); } ; _(); })(__cb(_, __frame, 9, 20, function ___(__0, __2) { endDate = __2;

        keyType = (options.keyType ? options.KeyType : "AsymmetricX509Cert");
        keyUsage = (options.keyUsage ? options.keyUsage : "Verify");

        uris = (options.identifierUris ? options.identifierUris.split(",") : []);

        appParams = {
          availableToOtherTenants: (options.available ? true : false),
          displayName: options.name,
          homepage: options.homePage,
          identifierUris: uris };


        if (options.password) {
          appParams.passwordCredentials = [{
            startDate: startDate,
            endDate: endDate,
            keyId: utils.uuidGen(),
            value: options.password },]; } else {

          if (options.keyValue) {
            appParams.keyCredentials = [{
              startDate: startDate,
              endDate: endDate,
              keyId: utils.uuidGen(),
              value: options.keyValue,
              usage: keyUsage,
              type: keyType },]; } ; } ;



        subscription = profile.current.getSubscription(options.subscription);
        client = adUtils.getADGraphClient(subscription);

        application = null; return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__1() {

              return withProgress(util.format($("Creating application %s"), options.name), function __1(log, _) { var __frame = { name: "__1", line: 100 }; return __func(_, this, arguments, __1, 1, __frame, function __$__1() {

                  return client.application.create(appParams, __cb(_, __frame, 1, 36, function ___(__0, __2) { var __1 = __2.application; return _(null, __1); }, true)); }); }, __cb(_, __frame, 54, 22, function ___(__0, __4) { application = __4; __then(); }, true)); }); })(function ___(ex, __result) { __catch(function __$__1() { if (ex) { return (function __$__1(__then) {


                  if ((ex.statusCode && (ex.statusCode === 403))) {

                    return client.objects.getCurrentUser(__cb(_, __frame, 61, 49, function ___(__0, __3) { currentUserObject = __3.aADObject;
                      if (((currentUserObject && currentUserObject.userType) && (currentUserObject.userType === "Guest"))) {
                        return _(new Error($("Creating an application is not allowed for a Guest user. Please contact your administrator to be added as a member in your tenant."))); } ; __then(); }, true)); } else { __then(); } ; })(function __$__1() {


                  return _(ex); }); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$__1() {


            cli.interaction.formatOutput(application, function(data) {
              if (data) {
                adUtils.displayAApplication(data, log); } ; }); _(); }); }); }, true)); }); });




  adApp.command("delete [objectId]").description($("Deletes the active directory application")).usage("[options] <object-id>").option("--objectId <objectId>", $("the object id of the application to remove")).option("-q, --quiet", $("quiet mode (do not ask for delete confirmation)")).execute(function __2(objectId, options, _) { var subscription, client, progress; var __frame = { name: "__2", line: 126 }; return __func(_, this, arguments, __2, 2, __frame, function __$__2() {





      if (!objectId) {
        return _(null, cli.missingArgument("objectId")); } ; return (function __$__2(_) {


        var __1 = !options.quiet; if (!__1) { return _(null, __1); } ; return cli.interaction.confirm(util.format($("Delete application %s? [y/n] "), objectId), __cb(_, __frame, 5, 45, function ___(__0, __3) { var __2 = !__3; return _(null, __2); }, true)); })(__cb(_, __frame, -125, 17, function ___(__0, __2) { return (function __$__2(__then) { if (__2) { return _(null); } else { __then(); } ; })(function __$__2() {


          subscription = profile.current.getSubscription(options.subscription);
          client = adUtils.getADGraphClient(subscription);
          progress = cli.interaction.progress(util.format($("Deleting application %s"), objectId)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__2() {

                return client.application.deleteMethod(objectId, __cb(_, __frame, 12, 27, function __$__2() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__2() {

                  progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$__2() { _(); }); }); }); }, true)); }); });



  adApp.command("list").description($("Get all active directory applications in current subscription's tenant")).execute(function __3(options, _) { var subscription, client, appParams, applications; var __frame = { name: "__3", line: 146 }; return __func(_, this, arguments, __3, 1, __frame, function __$__3() {



      subscription = profile.current.getSubscription(options.subscription);
      client = adUtils.getADGraphClient(subscription);
      appParams = { };

      return withProgress(util.format($("Listing applications")), function __1(log, _) { var __frame = { name: "__1", line: 153 }; return __func(_, this, arguments, __1, 1, __frame, function __$__1() {

          return client.application.list(appParams, __cb(_, __frame, 1, 34, function ___(__0, __2) { var __1 = __2.applications; return _(null, __1); }, true)); }); }, __cb(_, __frame, 6, 25, function ___(__0, __2) { applications = __2;


        adUtils.displayApplications(applications, cli.interaction, log); _(); }, true)); }); });


  adApp.command("show").description($("Get active directory applications")).option("--appId <appId>", $("the name of the application to return")).option("--objectId <objectId>", $("the object id of the application to return")).option("--identifierUri <identifierUri>", $("the identifier uri of the application to return")).option("--search <search>", $("search display name of the application starting with the provided value")).execute(function __4(options, _) { var appId, objectId, identifierUri, search, subscription, client, progress, applications, parameters, app; var __frame = { name: "__4", line: 166 }; return __func(_, this, arguments, __4, 1, __frame, function __$__4() {






      appId = options.appId;
      objectId = options.objectId;
      identifierUri = options.identifierUri;
      search = options.search;

      adUtils.validateParameters({
        appId: appId,
        objectId: objectId,
        identifierUri: identifierUri,
        search: search });


      subscription = profile.current.getSubscription(options.subscription);
      client = adUtils.getADGraphClient(subscription);
      progress = cli.interaction.progress($("Getting active directory application(s)"));
      applications = [];
      parameters = null; return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__4() { return (function __$__4(__then) {

              if (appId) {
                parameters = { appId: appId };
                return client.application.list(parameters, __cb(_, __frame, 21, 44, function ___(__0, __1) { applications = __1.applications; __then(); }, true)); } else { return (function __$__4(__then) {
                  if (objectId) {
                    return client.application.get(objectId, __cb(_, __frame, 23, 39, function ___(__0, __2) { app = __2.application;
                      if (app) {
                        applications.push(app); } ; __then(); }, true)); } else { return (function __$__4(__then) {

                      if (identifierUri) {
                        parameters = { identifierUri: identifierUri };
                        return client.application.list(parameters, __cb(_, __frame, 29, 44, function ___(__0, __3) { applications = __3.applications; __then(); }, true)); } else { return (function __$__4(__then) {
                          if (search) {
                            parameters = { displayNameStartsWith: search };
                            return client.application.list(parameters, __cb(_, __frame, 32, 44, function ___(__0, __4) { applications = __4.applications; __then(); }, true)); } else { __then(); } ; })(__then); } ; })(__then); } ; })(__then); } ; })(function __$__4() { _(null, null, true); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__4() {


              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$__4() {


          if ((applications.length > 0)) {
            adUtils.displayApplications(applications, cli.interaction, log); }
           else {
            log.data($("No matching application was found")); } ; _(); }); }); }); });};
