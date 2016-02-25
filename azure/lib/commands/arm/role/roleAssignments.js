/*** Generated by streamline 0.10.17 (callbacks) - DO NOT EDIT ***/ "use strict"; var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb,__catch=__rt.__catch,__tryCatch=__rt.__tryCatch; var underscore = require("underscore");


















var adUtils = require("../ad/adUtils");
var resourceUtils = require("../resource/resourceUtils");
var utils = require("../../../util/utils");
var $ = utils.getLocaleString;
var util = require("util");
var roleUtils = require("./roleUtils");

exports = module.exports = RoleAssignments;

function RoleAssignments(authzClient, graphClient) {
  this.authzClient = authzClient;
  this.graphClient = graphClient;};


underscore.extend(RoleAssignments.prototype, {

  queryAssignmentsForList: function queryAssignmentsForList__1(principal, scope, roleName, roleId, shouldExpandPrincipalGroups, shouldIncludeClassicAdmins, cli, subscription, _) { var assignments, objectType, shouldRetrieveObjectType, principalId, parameters, scopeForRoleDefinitions, filterParameters, roleDefinitions, excludeAssignmentsForDeletedPrincipals, admins, adminsAsAssignments, objects, __this = this; var __frame = { name: "queryAssignmentsForList__1", line: 36 }; return __func(_, this, arguments, queryAssignmentsForList__1, 8, __frame, function __$queryAssignmentsForList__1() {

      objectType = { };
      shouldRetrieveObjectType = shouldIncludeClassicAdmins;
      return adUtils.getObjectId(principal, __this.graphClient, false, shouldRetrieveObjectType, objectType, __cb(_, __frame, 4, 30, function ___(__0, __1) { principalId = __1;
        parameters = { atScope: false }; return (function __$queryAssignmentsForList__1(__then) {

          if (principalId) {
            if (shouldExpandPrincipalGroups) {
              if ((objectType.value && !utils.ignoreCaseEquals(objectType.value, "user"))) {
                return _(new Error($(("expandprincipalgroups option is only supported for a user principal. Given principal is a " + objectType.value)))); } ;

              parameters["assignedToPrincipalId"] = principalId; }
             else {
              parameters["principalId"] = principalId; } ;


            return __this.getAssignmentsList(parameters, __cb(_, __frame, 17, 25, function ___(__0, __2) { assignments = __2;


              assignments = __this.filterByScopeAtOrAbove(assignments, scope); __then(); }, true)); } else { return (function __$queryAssignmentsForList__1(__then) {

              if (scope) {
                parameters.atScope = true;
                return __this.getAssignmentsListForScope(scope, parameters, __cb(_, __frame, 24, 25, function ___(__0, __3) { assignments = __3; __then(); }, true)); } else {


                return __this.getAssignmentsList(parameters, __cb(_, __frame, 27, 25, function ___(__0, __4) { assignments = __4; __then(); }, true)); } ; })(__then); } ; })(function __$queryAssignmentsForList__1() {


          scopeForRoleDefinitions = scope;
          if (!scopeForRoleDefinitions) {
            scopeForRoleDefinitions = ("/subscriptions/" + subscription.id); } ;

          filterParameters = { atScopeAndBelow: true };
          return __this.authzClient.roleDefinitions.list(scopeForRoleDefinitions, filterParameters, __cb(_, __frame, 35, 59, function ___(__0, __5) { roleDefinitions = __5.roleDefinitions;

            if (roleName) {
              assignments = __this.filterByRoleName(assignments, roleName, roleDefinitions); } ;


            excludeAssignmentsForDeletedPrincipals = true;
            return __this.filterForDeletedPrincipalsAndFillInPrincipalInfo(assignments, excludeAssignmentsForDeletedPrincipals, __cb(_, __frame, 42, 23, function ___(__0, __6) { assignments = __6;
              assignments = __this.fillInRoleDetails(assignments, roleDefinitions);

              if (roleId) {

                assignments = assignments.filter(function(r) {
                  return utils.ignoreCaseEquals(r.properties.roleDefinitionId, roleId); }); } ; return (function __$queryAssignmentsForList__1(__then) {



                if (shouldIncludeClassicAdmins) {
                  return __this.authzClient.classicAdministrators.list(__cb(_, __frame, 53, 58, function ___(__0, __7) { admins = __7;
                    adminsAsAssignments = __this.convertAdminsToAssignments(admins, subscription); return (function __$queryAssignmentsForList__1(__then) {


                      if ((__this.optionIsSet(principal) && principalId)) {
                        if ((objectType.value && !utils.ignoreCaseEquals(objectType.value, "user"))) {
                          return _(new Error($(("includeClassicAdministrators option is only supported for a user principal. Given principal is a " + objectType.value)))); } ;


                        return __this.graphClient.objects.getObjectsByObjectIds({ ids: new Array(principalId), includeDirectoryObjectReferences: true }, __cb(_, __frame, 62, 47, function ___(__0, __8) { objects = __8.aADObject;

                          if ((objects && (objects.length > 0))) {
                            adminsAsAssignments = adminsAsAssignments.filter(function(r) {
                              return utils.ignoreCaseEquals(r.properties.aADObject.displayName, objects[0].signInName); }); }

                           else {
                            console.log("Warning: failed to retrieve graph object details for principal:%s. Falling back to non-filtered list of classic administrators.", principalId); } ; __then(); }, true)); } else { __then(); } ; })(function __$queryAssignmentsForList__1() {


                      assignments = assignments.concat(adminsAsAssignments); __then(); }); }, true)); } else { __then(); } ; })(function __$queryAssignmentsForList__1() {


                return _(null, assignments); }); }, true)); }, true)); }); }, true)); }); },



  queryAssignmentsForDelete: function queryAssignmentsForDelete__2(principal, scope, roleName, roleId, cli, subscription, _) { var assignments, objectType, principalId, parameters, roleDefinitions, filterParameters, roleDefinition, excludeAssignmentsForDeletedPrincipals, __this = this; var __frame = { name: "queryAssignmentsForDelete__2", line: 115 }; return __func(_, this, arguments, queryAssignmentsForDelete__2, 6, __frame, function __$queryAssignmentsForDelete__2() {


      objectType = { };
      return adUtils.getObjectId(principal, __this.graphClient, false, false, objectType, __cb(_, __frame, 4, 30, function ___(__0, __1) { principalId = __1;
        parameters = { atScope: false }; return (function __$queryAssignmentsForDelete__2(__then) {

          if (principalId) {
            parameters["principalId"] = principalId;
            return __this.getAssignmentsList(parameters, __cb(_, __frame, 9, 25, function ___(__0, __2) { assignments = __2;


              assignments = __this.filterByScopeExact(assignments, scope); __then(); }, true)); } else { __then(); } ; })(function __$queryAssignmentsForDelete__2() {


          roleDefinitions = []; return (function __$queryAssignmentsForDelete__2(__then) {

            if (roleName) {

              filterParameters = { roleName: roleName };
              return __this.authzClient.roleDefinitions.list(scope, filterParameters, __cb(_, __frame, 20, 57, function ___(__0, __3) { roleDefinitions = __3.roleDefinitions; __then(); }, true)); } else {



              return __this.authzClient.roleDefinitions.get(roleId, scope, __cb(_, __frame, 24, 60, function ___(__0, __4) { roleDefinition = __4.roleDefinition;
                roleDefinitions.push(roleDefinition); __then(); }, true)); } ; })(function __$queryAssignmentsForDelete__2() {


            assignments = __this.filterByRoleName(assignments, roleName, roleDefinitions);
            excludeAssignmentsForDeletedPrincipals = false;
            return __this.filterForDeletedPrincipalsAndFillInPrincipalInfo(assignments, excludeAssignmentsForDeletedPrincipals, __cb(_, __frame, 30, 23, function ___(__0, __5) { assignments = __5;
              assignments = __this.fillInRoleDetails(assignments, roleDefinitions);

              return _(null, assignments); }, true)); }); }); }, true)); }); },



  getAssignmentsList: function getAssignmentsList__3(parameter, _) { var assignmentsToReturn, tempResult, nextLink, __this = this; var __frame = { name: "getAssignmentsList__3", line: 152 }; return __func(_, this, arguments, getAssignmentsList__3, 1, __frame, function __$getAssignmentsList__3() {
      assignmentsToReturn = [];
      return __this.authzClient.roleAssignments.list(parameter, __cb(_, __frame, 2, 54, function ___(__0, __1) { tempResult = __1;
        assignmentsToReturn = assignmentsToReturn.concat(tempResult.roleAssignments);
        nextLink = tempResult.nextLink; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$getAssignmentsList__3() { __more = false;

            var __4 = nextLink; if (__4) {
              return __this.authzClient.roleAssignments.listNext(nextLink, __cb(_, __frame, 7, 52, function ___(__0, __2) { tempResult = __2;
                assignmentsToReturn = assignmentsToReturn.concat(tempResult.roleAssignments);
                nextLink = tempResult.nextLink; while (__more) { __loop(); }; __more = true; }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(function __$getAssignmentsList__3() {


          return _(null, assignmentsToReturn); }); }, true)); }); },


  convertAdminsToAssignments: function(classicAdmins, subscription) {
    var roleAssignments = [];
    if ((classicAdmins && classicAdmins.classicAdministrators)) {
      for (var i = 0; (i < classicAdmins.classicAdministrators.length); i++) {
        var ra = { };
        ra.properties = { };
        ra.properties.aADObject = { };
        ra.properties.roleName = classicAdmins.classicAdministrators[i].properties.role;
        ra.properties.scope = ("/subscriptions/" + subscription.id);
        ra.properties.aADObject.displayName = classicAdmins.classicAdministrators[i].properties.emailAddress;
        ra.properties.aADObject.signInName = classicAdmins.classicAdministrators[i].properties.emailAddress;
        ra.properties.aADObject.objectType = "User";
        roleAssignments.push(ra); }; } ;



    return roleAssignments; },


  getAssignmentsListForScope: function getAssignmentsListForScope__4(scope, parameter, _) { var assignmentsToReturn, tempResult, nextLink, __this = this; var __frame = { name: "getAssignmentsListForScope__4", line: 186 }; return __func(_, this, arguments, getAssignmentsListForScope__4, 2, __frame, function __$getAssignmentsListForScope__4() {
      assignmentsToReturn = [];
      return __this.authzClient.roleAssignments.listForScope(scope, parameter, __cb(_, __frame, 2, 54, function ___(__0, __1) { tempResult = __1;
        assignmentsToReturn = assignmentsToReturn.concat(tempResult.roleAssignments);
        nextLink = tempResult.nextLink; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$getAssignmentsListForScope__4() { __more = false;

            var __4 = nextLink; if (__4) {
              return __this.authzClient.roleAssignments.listForScopeNext(nextLink, __cb(_, __frame, 7, 52, function ___(__0, __2) { tempResult = __2;
                assignmentsToReturn = assignmentsToReturn.concat(tempResult.roleAssignments);
                nextLink = tempResult.nextLink; while (__more) { __loop(); }; __more = true; }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(function __$getAssignmentsListForScope__4() {


          return _(null, assignmentsToReturn); }); }, true)); }); },


  filterByScopeAtOrAbove: function(assignments, scope) {
    if (scope) {
      assignments = assignments.filter(function(assignment) {
        return utils.stringStartsWith(scope, assignment.properties.scope, true); }); } ;


    return assignments; },


  filterByScopeExact: function(assignments, scope) {
    if (scope) {
      assignments = assignments.filter(function(assignment) {
        return utils.ignoreCaseEquals(scope, assignment.properties.scope); }); } ;


    return assignments; },


  filterForDeletedPrincipalsAndFillInPrincipalInfo: function filterForDeletedPrincipalsAndFillInPrincipalInfo__5(assignments, excludeAssignmentsForDeletedPrincipals, _) { var allIds, graphCallSucceeded, objects, assignmentsForValidPrincipals, __this = this; var __frame = { name: "filterForDeletedPrincipalsAndFillInPrincipalInfo__5", line: 219 }; return __func(_, this, arguments, filterForDeletedPrincipalsAndFillInPrincipalInfo__5, 2, __frame, function __$filterForDeletedPrincipalsAndFillInPrincipalInfo__5() {
      allIds = underscore.map(assignments, function(assignment) {
        return assignment.properties.principalId; });

      graphCallSucceeded = true; return (function __$filterForDeletedPrincipalsAndFillInPrincipalInfo__5(__then) {

        if ((allIds.length > 0)) {
          objects = []; return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$filterForDeletedPrincipalsAndFillInPrincipalInfo__5() {


                return __this.graphClient.objects.getObjectsByObjectIds({ ids: allIds, includeDirectoryObjectReferences: true }, __cb(_, __frame, 10, 43, function ___(__0, __1) { objects = __1.aADObject; __then(); }, true)); }); })(function ___(ex, __result) { __catch(function __$filterForDeletedPrincipalsAndFillInPrincipalInfo__5() { if (ex) {

                  graphCallSucceeded = false; __then(); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$filterForDeletedPrincipalsAndFillInPrincipalInfo__5() {


              assignmentsForValidPrincipals = [];
              assignments.forEach(function(assignment) {
                var adObjectDetails = underscore.chain(objects).where({
                  objectId: assignment.properties.principalId
                }).first().value();

                if ((graphCallSucceeded && adObjectDetails)) {
                  assignment.properties.aADObject = adObjectDetails;
                  assignmentsForValidPrincipals.push(assignment); }


                 else if ((!graphCallSucceeded || !excludeAssignmentsForDeletedPrincipals)) {
                  assignment.properties.aADObject = {
                    objectId: assignment.properties.principalId,
                    objectType: "",
                    displayName: "",
                    signInName: "" };

                  assignmentsForValidPrincipals.push(assignment); }  ; });


              assignments = assignmentsForValidPrincipals; __then(); }); }); } else { __then(); } ; })(function __$filterForDeletedPrincipalsAndFillInPrincipalInfo__5() {

        return _(null, assignments); }); }); },


  filterByRoleName: function(assignments, roleName, roleDefinitions) {
    if (roleName) {


      var roleDefinitionNames = [];

      for (var i = 0; (i < roleDefinitions.length); i++) {
        if (utils.ignoreCaseEquals(roleDefinitions[i].properties.roleName, roleName)) {
          roleDefinitionNames.push(roleDefinitions[i].name); } ; };


      if ((!roleDefinitionNames || (roleDefinitionNames.length === 0))) {
        throw new Error(util.format($("Role with name '%s' was not found"), roleName)); } ;

      assignments = assignments.filter(function(assignment) {
        for (var i = 0; (i < roleDefinitionNames.length); i++) {
          if (utils.ignoreCaseEquals(roleUtils.getRoleDefinitionName(assignment.properties.roleDefinitionId), roleDefinitionNames[i])) {
            return true; } ; };


        return false; }); } ;


    return assignments; },


  fillInRoleDetails: function(assignments, roleDefinitions) {
    if ((assignments && (assignments.length > 0))) {
      var roleNames = [];
      var roleDefinitionId;
      for (var i = 0; (i < roleDefinitions.length); i++) {
        var roleDefinition = roleDefinitions[i];
        roleDefinitionId = roleDefinition.name;
        roleNames[roleDefinitionId] = roleDefinition.properties.roleName; };


      assignments.forEach(function(assignment) {
        roleDefinitionId = assignment.properties.roleDefinitionId;
        assignment.properties.roleName = roleNames[roleUtils.getRoleDefinitionName(roleDefinitionId)];
        assignment.properties.roleDefinitionId = roleUtils.getRoleDefinitionName(roleDefinitionId); }); } ;



    return assignments; },


  fillRoleAndPrincipalDetailsForAssignment: function fillRoleAndPrincipalDetailsForAssignment__6(assignment, roleDefinition, _) { var assignments, __this = this; var __frame = { name: "fillRoleAndPrincipalDetailsForAssignment__6", line: 306 }; return __func(_, this, arguments, fillRoleAndPrincipalDetailsForAssignment__6, 2, __frame, function __$fillRoleAndPrincipalDetailsForAssignment__6() {
      return __this.filterForDeletedPrincipalsAndFillInPrincipalInfo(new Array(assignment), true, __cb(_, __frame, 1, 27, function ___(__0, __1) { assignments = __1;
        assignment = assignments[0];
        assignment.properties.roleName = roleDefinition.properties.roleName;
        assignment.properties.roleDefinitionId = roleDefinition.name;
        return _(null, assignment); }, true)); }); },


  activeFilterADObject: function(principal) {
    if (principal.objectId) {
      return principal.objectId; }

     else if (principal.signInName) {
      return principal.signInName; }

     else if (principal.spn) {
      return principal.spn; }   ;

    return null; },


  optionIsSet: function(option) {
    var properties = (option ? Object.keys(option) : []);
    var propertyValues = properties.filter(function(p) {
      return !!option[p]; });

    return ((propertyValues.length > 0)); }});



RoleAssignments.buildScopeString = function(scopeInfo) {
  if ((scopeInfo.scope && ((scopeInfo.resourceGroup || scopeInfo.resourceName)))) {
    throw new Error($("Please specify either scope or resource group and resource name")); } ;


  if ((scopeInfo.resourceName && !scopeInfo.resourceGroup)) {
    throw new Error($("Please specify a valid resourcegroup name")); } ;


  if (scopeInfo.scope) {
    return scopeInfo.scope; } ;

  var scope;
  if (scopeInfo.subscriptionId) {
    scope = ("/subscriptions/" + scopeInfo.subscriptionId);
    if (scopeInfo.resourceGroup) {
      scope = ((scope + "/resourcegroups/") + scopeInfo.resourceGroup.trim());
      if (scopeInfo.resourceName) {
        if (!scopeInfo.resourceType) {
          throw new Error($("Please specify a valid resource type")); } ;

        var resourceTypeName = resourceUtils.getResourceTypeName(scopeInfo.resourceType);
        var provider = resourceUtils.getProviderName(scopeInfo.resourceType);
        scope = ((((((scope + "/providers/") + provider.trim()) + "/") + ((scopeInfo.parent ? ((scopeInfo.parent.trim() + "/") + resourceTypeName.trim()) : resourceTypeName.trim()))) + "/") + scopeInfo.resourceName.trim()); } ; } ; } ;





  return scope;};
