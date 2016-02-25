/*** Generated by streamline 0.10.17 (callbacks) - DO NOT EDIT ***/ "use strict"; var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb; var util = require("util");


















var ADGraphClient = require("azure-extra");
var log = require("../../../../lib/util/logging");
var utils = require("../../../util/utils");
var $ = utils.getLocaleString;

exports.getADGraphClient = function getADGraphClient(subscription) {
  var client = new ADGraphClient.createGraphRbacManagementClient(subscription.tenantId, subscription._createCredentials(), subscription.activeDirectoryGraphResourceId).withFilter(log.createLogFilter());



  return client;};


exports.getObjectId = function exports_getObjectId__1(principal, graphClient, throwIfNoOption, shouldRetrieveObjectType, objectType, _) { var objects, graphQueryResult; var __frame = { name: "exports_getObjectId__1", line: 33 }; return __func(_, this, arguments, exports_getObjectId__1, 5, __frame, function __$exports_getObjectId__1() { return (function __$exports_getObjectId__1(__then) {
      if (principal.objectId) { return (function __$exports_getObjectId__1(__then) {

          if (shouldRetrieveObjectType) {
            return graphClient.objects.getObjectsByObjectIds({ ids: new Array(principal.objectId), includeDirectoryObjectReferences: true }, __cb(_, __frame, 4, 40, function ___(__0, __1) { objects = __1.aADObject;
              if ((objects && (objects.length > 0))) {
                objectType.value = objects[0].objectType; } ; __then(); }, true)); } else { __then(); } ; })(function __$exports_getObjectId__1() {



          return _(null, principal.objectId); }); } else { __then(); } ; })(function __$exports_getObjectId__1() {


      graphQueryResult = null; return (function __$exports_getObjectId__1(__then) {
        if (principal.signInName) {
          return graphClient.user.getBySignInName(principal.signInName, __cb(_, __frame, 15, 40, function ___(__0, __2) { graphQueryResult = __2;
            if ((graphQueryResult.users.length > 0)) {
              objectType.value = "user";
              return _(null, graphQueryResult.users[0].objectId); }
             else {
              return _(new Error($("Invalid user signInName"))); } ; __then(); }, true)); } else { __then(); } ; })(function __$exports_getObjectId__1() { return (function __$exports_getObjectId__1(__then) {



          if (principal.spn) {
            return graphClient.servicePrincipal.getByServicePrincipalName(principal.spn, __cb(_, __frame, 25, 52, function ___(__0, __3) { graphQueryResult = __3;
              if ((graphQueryResult.servicePrincipals.length > 0)) {
                objectType.value = "servicePrincipal";
                return _(null, graphQueryResult.servicePrincipals[0].objectId); }
               else {
                return _(new Error($("Invalid service principal name"))); } ; __then(); }, true)); } else { __then(); } ; })(function __$exports_getObjectId__1() {


          if (throwIfNoOption) {
            return _(new Error($("Failed to retrieve Active Dirctory Object Id"))); }
           else {
            objectType.value = "";
            return _(null, ""); } ; _(); }); }); }); });};



exports.validateParameters = function(parameters, throwOnNoValues) {
  throwOnNoValues = (((typeof throwOnNoValues !== "undefined") ? throwOnNoValues : true));
  var parameterNames = Object.keys(parameters);


  if ((parameterNames.length === 0)) {
    return; } ;


  var values = parameterNames.filter(function(p) {
    return (!!parameters[p]); });


  if (((values.length === 0) && throwOnNoValues)) {
    throw new Error(util.format(("Please provide a value to one of the parameters '%s'"), parameterNames.join())); } ;


  if ((values.length > 1)) {
    throw new Error(util.format($("You can only specify value to one of '%s'"), values.join())); } ;};



exports.listGraphObjects = function exports_listGraphObjects__2(client, objectType, interaction, log, _) { var isServicePrincipal, response, nextLink;

  function displayObjects(objects) {
    if ((objects.length === 0)) {
      return; } ;

    if (utils.ignoreCaseEquals(objectType, "user")) {
      exports.displayUsers(objects, interaction, log); }
     else if (utils.ignoreCaseEquals(objectType, "group")) {
      exports.displayGroups(objects, interaction, log); }
     else if (isServicePrincipal) {
      exports.displayServicePrincipals(objects, interaction, log); }   ; }; var __frame = { name: "exports_listGraphObjects__2", line: 96 }; return __func(_, this, arguments, exports_listGraphObjects__2, 4, __frame, function __$exports_listGraphObjects__2() { isServicePrincipal = utils.ignoreCaseEquals(objectType, "servicePrincipal"); return (function __$exports_listGraphObjects__2(__then) {



      if (isServicePrincipal) {
        return client[objectType].list(null, __cb(_, __frame, 16, 34, function ___(__0, __1) { response = __1; __then(); }, true)); } else {

        return client[objectType].list(null, null, __cb(_, __frame, 18, 34, function ___(__0, __2) { response = __2; __then(); }, true)); } ; })(function __$exports_listGraphObjects__2() {


      displayObjects(response[(objectType + "s")]);
      nextLink = response.nextLink; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$exports_listGraphObjects__2() { __more = false;

          var __6 = nextLink; if (__6) {
            return client[objectType].listNext(nextLink, __cb(_, __frame, 25, 34, function ___(__0, __3) { response = __3;
              displayObjects(response[(objectType + "s")]);
              nextLink = response.nextLink; while (__more) { __loop(); }; __more = true; }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(_); }); });};



exports.listGroupMembers = function exports_listGroupMembers__3(client, groupId, interaction, log, _) { var response, nextLink; var __frame = { name: "exports_listGroupMembers__3", line: 127 }; return __func(_, this, arguments, exports_listGroupMembers__3, 4, __frame, function __$exports_listGroupMembers__3() {
    return client.group.getGroupMembers(groupId, __cb(_, __frame, 1, 30, function ___(__0, __1) { response = __1;
      displayGroupMembers(response.aADObject, interaction, log);
      nextLink = response.nextLink; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$exports_listGroupMembers__3() { __more = false;

          var __4 = nextLink; if (__4) {
            return client.group.getGroupMembersNext(nextLink, __cb(_, __frame, 6, 28, function ___(__0, __2) { response = __2;
              displayGroupMembers(response.aADObject, interaction, log);
              nextLink = response.nextLink; while (__more) { __loop(); }; __more = true; }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(_); }, true)); });};



exports.displayApplications = function(applications, interaction, log) {
  interaction.formatOutput(applications, function(data) {
    for (var i = 0; (i < data.length); i++) {
      exports.displayAApplication(data[i], log);
      log.data(""); }; });};




exports.displayUsers = function(users, interaction, log) {
  interaction.formatOutput(users, function(data) {
    for (var i = 0; (i < data.length); i++) {
      displayAUser(data[i], log);
      log.data(""); }; });};




exports.displayGroups = function(groups, interaction, log) {
  interaction.formatOutput(groups, function(data) {
    for (var i = 0; (i < data.length); i++) {
      displayAGroup(data[i], log);
      log.data(""); }; });};




exports.displayServicePrincipals = function(servicePrincipals, interaction, log) {
  interaction.formatOutput(servicePrincipals, function(data) {
    for (var i = 0; (i < data.length); i++) {
      exports.displayAServicePrincipal(data[i], log);
      log.data(""); }; });};




exports.displayAServicePrincipal = function(servicePrincipal, log, showType) {
  log.data($("Object Id:              "), servicePrincipal.objectId);
  log.data($("Display Name:           "), servicePrincipal.displayName);
  log.data($("Service Principal Names:"));
  servicePrincipal.servicePrincipalNames.forEach(function(name) {
    log.data($("                        "), name); });

  if (showType) {
    log.data($("Object Type:          "), "ServicePrincipal"); } ;};



exports.displayAApplication = function(application, log) {
  log.data($("AppId:                  "), application.appId);
  log.data($("ObjectId:               "), application.objectId);
  log.data($("DisplayName:            "), application.displayName);
  log.data($("IdentifierUris:         "), application.identifierUris);
  log.data($("ReplyUrls:              "), application.replyUrls);
  log.data($("AvailableToOtherTenants: "), (application.availableToOtherTenants ? "True" : "False"));
  if (application.appPermissions) {
    log.data($("AppPermissions:       "));
    Object.keys(application.appPermissions).forEach(function(item) {
      if (application.appPermissions[item]) {
        Object.keys(application.appPermissions[item]).forEach(function(subItem) {
          log.data($((("                         " + subItem) + ": ")), application.appPermissions[item][subItem]); }); } ; }); } ;};






function displayGroupMembers(members, interaction, log) {
  interaction.formatOutput(members, function(data) {
    for (var i = 0; (i < data.length); i++) {
      if ((data[i].objectType === "User")) {
        displayAUser(data[i], log, true); }
       else if ((data[i].objectType === "Group")) {
        displayAGroup(data[i], log, true); }
       else {
        log.warn(("an unexpected object type:" + data[i].objectType)); }  ;

      log.data(""); }; });};




function displayAUser(user, log, showType) {
  log.data($("Object Id:      "), user.objectId);
  log.data($("Principal Name: "), user.userPrincipalName);
  log.data($("Display Name:   "), user.displayName);
  log.data($("E-Mail:         "), (user.mail || user.signInName));
  if (showType) {
    log.data($("Object Type:    "), "User"); } ;};



function displayAGroup(group, log, showType) {
  log.data($("Display Name:     "), group.displayName);
  log.data($("ObjectId:         "), group.objectId);
  log.data($("Security Enabled: "), group.securityEnabled);
  log.data($("Mail Enabled:     "), group.mailEnabled);
  if (showType) {
    log.data($("Object Type:      "), "Group"); } ;};
