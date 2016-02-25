/*** Generated by streamline 0.10.17 (callbacks) - DO NOT EDIT ***/ "use strict"; var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb; var profile = require("../../../util/profile");

















var utils = require("../../../util/utils");
var util = require("util");
var providerOperationConstants = require("./providerUtils").providerOperationConstants;
var Wildcard = utils.Wildcard;
var __ = require("underscore");
var $ = utils.getLocaleString;

exports.init = function(cli) {
  var log = cli.output;
  var withProgress = cli.interaction.withProgress.bind(cli.interaction);

  var provider = cli.category("provider");
  var providerOperations = provider.category("operations").description($("Commands to get the operations or actions allowed by an Azure resource provider."));


  providerOperations.command("show [operationSearchString]").description($("Show operations for the requested provider operation search string. Operations can be composed to create custom roles in Azure RBAC. The command takes as input a operation search string (with wildcard (*) character(s)) which determines the action details to display.")).usage(((((((((("[options] <operationSearchString>" + "\n") + "\n     --------------------------  Get all actions for all providers  --------------------------") + "\n     azure provider operations show --operationSearchString *") + "\n") + "\n     --------------------------  Get actions for a particular resource provider  --------------------------") + "\n     azure provider operations show --operationSearchString Microsoft.Insights/*") + "\n") + "\n     --------------------------  Get all actions that can be performed on virtual machines  --------------------------") + "\n     azure provider operations show --operationSearchString */virtualMachines/*")).option("-o --operationSearchString <operationSearchString>", $("The provider operation string (with wildcard (*) character). Example: \"*\" to get all actions for all providers, \"Microsoft.Insights/*\" to get actions for a particular provider, \"*/virtualMachines/*\" to get all actions that can be performed on virtual machines.")).option("-s --subscription <subscription>", $("Subscription to show provider operations for")).execute(function __1(operationSearchString, options, _) { var subscription, client, flattenedProviderOperations; var __frame = { name: "__1", line: 48 }; return __func(_, this, arguments, __1, 2, __frame, function __$__1() {














      subscription = profile.current.getSubscription(options.subscription);
      client = utils.createResourceClient(subscription);

      validateOperationString(operationSearchString);
      flattenedProviderOperations = []; return (function __$__1(__then) {

        if (Wildcard.containWildcards(operationSearchString)) {

          return getProviderOperationsWithWildCard(client, operationSearchString, __cb(_, __frame, 9, 36, function ___(__0, __1) { flattenedProviderOperations = __1; __then(); }, true)); } else {


          return getProviderOperationsWithoutWildCard(client, operationSearchString, __cb(_, __frame, 12, 36, function ___(__0, __2) { flattenedProviderOperations = __2; __then(); }, true)); } ; })(function __$__1() {


        cli.interaction.formatOutput(flattenedProviderOperations, function(data) {
          if ((!data || (data.length === 0))) {
            log.info($("No operations available matching the input action string")); }
           else {
            data.forEach(function(operation) {
              displayAProviderOperation(operation); }); } ; }); _(); }); }); });





  function validateOperationString(operationString) {
    if (__.contains(operationString, providerOperationConstants.UnsupportedWildCardCharacter)) {
      throw new Error($("Only (*) wildcard character is supported.")); } ;


    var components = operationString.split(providerOperationConstants.Separator);
    components.forEach(function(component) {
      if ((__.contains(component, providerOperationConstants.WildCardCharacter) && (component.length != 1))) {
        throw new Error($("Individual parts in the search string should either be just a * or not contain *.")); } ; });



    if (((components.length == 1) && (components[0] != providerOperationConstants.WildCardCharacter))) {
      throw new Error(util.format($("To get all operations under \"%s\", please specify the search string as \"%s/*\""), operationString, operationString)); } ; };



  function getProviderOperationsWithWildCard(client, actionString, _) { var operationsToDisplay, providersData, unflattenedOperationsForAllProviders, providerFullName, unflattenedOperationsForSpecificProvider; var __frame = { name: "getProviderOperationsWithWildCard", line: 91 }; return __func(_, this, arguments, getProviderOperationsWithWildCard, 2, __frame, function __$getProviderOperationsWithWildCard() {
      operationsToDisplay = [];
      providersData = [];

      providerFullName = getProviderFullNameOrDefault(actionString); return (function __$getProviderOperationsWithWildCard(__then) {
        if ((providerFullName === providerOperationConstants.WildCardCharacter)) {

          return listAllProviderOperationsMetadata(client, __cb(_, __frame, 7, 45, function ___(__0, __1) { unflattenedOperationsForAllProviders = __1;
            providersData = providersData.concat(unflattenedOperationsForAllProviders); __then(); }, true)); } else {


          return getProviderOperationsMetadata(client, providerFullName, __cb(_, __frame, 11, 53, function ___(__0, __2) { unflattenedOperationsForSpecificProvider = __2;
            providersData.push(unflattenedOperationsForSpecificProvider); __then(); }, true)); } ; })(function __$getProviderOperationsWithWildCard() {


        providersData.forEach(function(unflattenedProviderData) {
          var operations = getFlattenedOperationsFromProviderOperationsMetadata(unflattenedProviderData);

          operations.forEach(function(operation) {
            if (Wildcard.isMatchCaseInsensitive(operation.operation, actionString)) {
              operationsToDisplay.push(operation); } ; }); });




        return _(null, operationsToDisplay); }); }); };


  function getProviderOperationsWithoutWildCard(client, actionString, _) { var operationsToDisplay, providerFullName, unflattenedProviderOperations, operations; var __frame = { name: "getProviderOperationsWithoutWildCard", line: 119 }; return __func(_, this, arguments, getProviderOperationsWithoutWildCard, 2, __frame, function __$getProviderOperationsWithoutWildCard() {
      operationsToDisplay = [];

      providerFullName = getProviderFullNameOrDefault(actionString); return (function __$getProviderOperationsWithoutWildCard(__then) {

        if (!__.isEmpty(providerFullName)) {
          return getProviderOperationsMetadata(client, providerFullName, __cb(_, __frame, 6, 42, function ___(__0, __1) { unflattenedProviderOperations = __1;
            operations = getFlattenedOperationsFromProviderOperationsMetadata(unflattenedProviderOperations);

            operationsToDisplay = operations.filter(function(operationObj) {
              return utils.ignoreCaseEquals(operationObj.operation, actionString.toLowerCase()); }); __then(); }, true)); } else { __then(); } ; })(function __$getProviderOperationsWithoutWildCard() {


        return _(null, operationsToDisplay); }); }); };


  function getProviderFullNameOrDefault(actionString) {
    var index = actionString.indexOf(providerOperationConstants.Separator);
    var fullName = actionString;
    if ((index > 0)) {
      fullName = actionString.substring(0, index); } ;

    return fullName; };


  function displayAProviderOperation(resourceProviderOperation) {
    log.data($("Operation         : "), resourceProviderOperation.operation);
    log.data($("OperationName     : "), resourceProviderOperation.operationName);
    log.data($("ProviderNamespace : "), resourceProviderOperation.providerNamespace);
    log.data($("ResourceName      : "), resourceProviderOperation.resourceName);
    log.data($("Description       : "), resourceProviderOperation.description);
    log.data(""); };


  function getProviderOperationsMetadata(client, providerFullName, _) { var __frame = { name: "getProviderOperationsMetadata", line: 153 }; return __func(_, this, arguments, getProviderOperationsMetadata, 2, __frame, function __$getProviderOperationsMetadata() {
      return withProgress($("Getting providerOperations metadata"), function __1(log, _) { var __frame = { name: "__1", line: 155 }; return __func(_, this, arguments, __1, 1, __frame, function __$__1() {

          return client.providerOperationsMetadata.get(providerFullName, __cb(_, __frame, 1, 47, function ___(__0, __2) { var __1 = __2.provider; return _(null, __1); }, true)); }); }, __cb(_, __frame, 1, 11, _, true)); }); };



  function listAllProviderOperationsMetadata(client, _) { var __frame = { name: "listAllProviderOperationsMetadata", line: 160 }; return __func(_, this, arguments, listAllProviderOperationsMetadata, 1, __frame, function __$listAllProviderOperationsMetadata() {
      return withProgress($("Getting providerOperations metadata"), function __1(log, _) { var __frame = { name: "__1", line: 162 }; return __func(_, this, arguments, __1, 1, __frame, function __$__1() {

          return client.providerOperationsMetadata.list(__cb(_, __frame, 1, 47, function ___(__0, __2) { var __1 = __2.providers; return _(null, __1); }, true)); }); }, __cb(_, __frame, 1, 11, _, true)); }); };



  function getFlattenedOperationsFromProviderOperationsMetadata(provider) {
    var flattenedOperations = [];
    provider.operations.forEach(function(operation) {
      if (isUserOperation(operation)) {
        flattenedOperations.push(getFlattenedOperationObject(operation, provider.displayName)); } ; });



    if (provider.resourceTypes) {
      provider.resourceTypes.forEach(function(rt) {
        rt.operations.forEach(function(operation) {
          if (isUserOperation(operation)) {
            flattenedOperations.push(getFlattenedOperationObject(operation, provider.displayName, rt.displayName)); } ; }); }); } ;




    return flattenedOperations; };


  function isUserOperation(operation) {
    return ((!operation.origin || (operation.origin.indexOf("user") > -1))); };


  function getFlattenedOperationObject(operation, providerDisplayName, resourceDisplayName) {

    var operationObject = {
      operation: operation.name,
      operationName: operation.displayName,
      description: operation.description,
      providerNamespace: providerDisplayName,
      resourceName: (!resourceDisplayName ? "" : resourceDisplayName) };


    return operationObject; };};