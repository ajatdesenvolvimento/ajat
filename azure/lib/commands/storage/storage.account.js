/*** Generated by streamline 0.10.17 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb,__catch=__rt.__catch,__tryCatch=__rt.__tryCatch; var __ = require("underscore");
















var util = require("util");

var profile = require("../../util/profile");
var utils = require("../../util/utils");
var validation = require("../../util/validation");
var storageUtil = require("../../util/storage.util");

var $ = utils.getLocaleString;

exports.init = function(cli) {
  var log = cli.output;
  var isResourceMode = (cli.getMode() === "arm");
  var storage = cli.category("storage");

  var storageAccount = storage.category("account").description($("Commands to manage your Storage accounts"));


  var keys = storageAccount.category("keys").description($("Commands to manage your Storage account keys"));


  var usage = { };
  if (isResourceMode) {
    usage = storageAccount.category("usage").description($("Commands to manage your Storage accounts usage")); } ;



  var connectionString = storageAccount.category("connectionstring").description($("Commands to show your Storage connection string"));


  var serviceType = { blob: 0, queue: 1, table: 2, file: 3 };

  function wrapEndpoint(uri, type) {
    if (!uri) {
      return ""; } ;


    if ((((uri.indexOf("//") != -1) && !utils.stringStartsWith(uri, "http://")) && !utils.stringStartsWith(uri, "https://"))) {
      throw new Error($((("The provided URI \"" + uri) + "\" is not supported."))); } ;


    if (validation.isValidUri(uri)) {
      var tag;
      switch (type) {
      case serviceType.blob: tag = "BlobEndpoint="; break; case serviceType.queue:
        tag = "QueueEndpoint="; break; case serviceType.table:
        tag = "TableEndpoint="; break; case serviceType.file:
        tag = "FileEndpoint="; break; };

      return ((tag + uri) + ";"); } ;


    return ""; };


  function showProgress(message) {
    return cli.interaction.progress(message); };


  function endProgress(progress) {

    if (progress) {
      progress.end(); } ; };



  function createStorageManagementClient(subscriptionOrName) {
    var client;
    if ((__.isString(subscriptionOrName) || !subscriptionOrName)) {
      subscriptionOrName = profile.current.getSubscription(subscriptionOrName); } ;

    if (isResourceMode) {
      client = utils.createStorageResourceProviderClient(subscriptionOrName); }
     else {
      client = utils.createStorageClient(subscriptionOrName); } ;

    return client; };


  function validateResourceGroupName(options, _) { var __frame = { name: "validateResourceGroupName", line: 96 }; return __func(_, this, arguments, validateResourceGroupName, 1, __frame, function __$validateResourceGroupName() {
      return cli.interaction.promptIfNotGiven($("Resource group name: "), options.resourceGroup, __cb(_, __frame, 1, 44, function ___(__0, __1) { options.resourceGroup = __1; _(); }, true)); }); };


  function listAccounts(serviceClient, options, _) { var progress, storageAccounts; var __frame = { name: "listAccounts", line: 100 }; return __func(_, this, arguments, listAccounts, 2, __frame, function __$listAccounts() {
      progress = showProgress($("Getting storage accounts")); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$listAccounts() { return (function __$listAccounts(__then) {


              if (isResourceMode) { return (function __$listAccounts(__then) {
                  if (options.resourceGroup) {
                    return serviceClient.storageAccounts.listByResourceGroup(options.resourceGroup, __cb(_, __frame, 6, 71, function ___(__0, __1) { storageAccounts = __.toArray(__1); __then(); }, true)); } else {


                    return serviceClient.storageAccounts.list(__cb(_, __frame, 9, 71, function ___(__0, __2) { storageAccounts = __.toArray(__2); __then(); }, true)); } ; })(__then); } else {


                return serviceClient.storageAccounts.list(__cb(_, __frame, 12, 56, function ___(__0, __3) { storageAccounts = __3.storageAccounts; __then(); }, true)); } ; })(function __$listAccounts() { _(null, null, true); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$listAccounts() {


              endProgress(progress); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$listAccounts() {


          return _(null, storageAccounts); }); }); }); };


  function showAccount(serviceClient, accountName, options, _) { var progress, message, storageAccount; var __frame = { name: "showAccount", line: 121 }; return __func(_, this, arguments, showAccount, 3, __frame, function __$showAccount() {

      message = $("Getting storage account"); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$showAccount() { return (function __$showAccount(__then) {


              if (isResourceMode) {
                return validateResourceGroupName(options, __cb(_, __frame, 6, 8, function __$showAccount() {
                  progress = showProgress(message);
                  return serviceClient.storageAccounts.getProperties(options.resourceGroup, accountName, __cb(_, __frame, 8, 55, function ___(__0, __1) { storageAccount = __1; __then(); }, true)); }, true)); } else {

                progress = showProgress(message);
                return serviceClient.storageAccounts.get(accountName, __cb(_, __frame, 11, 55, function ___(__0, __2) { storageAccount = __2.storageAccount; __then(); }, true)); } ; })(function __$showAccount() { _(null, null, true); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$showAccount() {


              endProgress(progress); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$showAccount() {


          return _(null, storageAccount); }); }); }); };


  function createAccount(serviceClient, parameters, options, _) { var progress, message, storageAccount; var __frame = { name: "createAccount", line: 141 }; return __func(_, this, arguments, createAccount, 3, __frame, function __$createAccount() {

      message = $("Creating storage account"); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$createAccount() { return (function __$createAccount(__then) {



              if (isResourceMode) {
                return validateResourceGroupName(options, __cb(_, __frame, 7, 8, function __$createAccount() {
                  progress = showProgress(message);
                  return serviceClient.storageAccounts.create(options.resourceGroup, parameters.name, parameters, __cb(_, __frame, 9, 55, function ___(__0, __1) { storageAccount = __1; __then(); }, true)); }, true)); } else {

                progress = showProgress(message);
                return serviceClient.storageAccounts.create(parameters, __cb(_, __frame, 12, 55, function ___(__0, __2) { storageAccount = __2; __then(); }, true)); } ; })(function __$createAccount() { _(null, null, true); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$createAccount() {


              endProgress(progress); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$createAccount() {


          return _(null, storageAccount); }); }); }); };


  function updateAccount(serviceClient, accountName, parameters, options, _) { var progress, message, storageAccount; var __frame = { name: "updateAccount", line: 162 }; return __func(_, this, arguments, updateAccount, 4, __frame, function __$updateAccount() {

      message = $("Updating storage account"); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$updateAccount() { return (function __$updateAccount(__then) {



              if (isResourceMode) {
                return validateResourceGroupName(options, __cb(_, __frame, 7, 8, function __$updateAccount() {
                  progress = showProgress(message);
                  return serviceClient.storageAccounts.update(options.resourceGroup, accountName, parameters, __cb(_, __frame, 9, 45, _, true)); }, true)); } else {

                progress = showProgress(message);
                return serviceClient.storageAccounts.update(accountName, parameters, __cb(_, __frame, 12, 45, _, true)); } ; })(function __$updateAccount() { _(null, null, true); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$updateAccount() {


              endProgress(progress); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$updateAccount() {


          return _(null, storageAccount); }); }); }); };


  function deleteAccount(serviceClient, accountName, options, _) { var progress, message, storageAccount; var __frame = { name: "deleteAccount", line: 183 }; return __func(_, this, arguments, deleteAccount, 3, __frame, function __$deleteAccount() {

      message = $("Deleting storage account"); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$deleteAccount() { return (function __$deleteAccount(__then) {



              if (isResourceMode) {
                return validateResourceGroupName(options, __cb(_, __frame, 7, 8, function __$deleteAccount() {
                  progress = showProgress(message);
                  return serviceClient.storageAccounts.deleteMethod(options.resourceGroup, accountName, __cb(_, __frame, 9, 55, function ___(__0, __1) { storageAccount = __1; __then(); }, true)); }, true)); } else {

                progress = showProgress(message);
                return serviceClient.storageAccounts.deleteMethod(accountName, __cb(_, __frame, 12, 55, function ___(__0, __2) { storageAccount = __2; __then(); }, true)); } ; })(function __$deleteAccount() { _(null, null, true); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$deleteAccount() {


              endProgress(progress); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$deleteAccount() {


          return _(null, storageAccount); }); }); }); };


  function checkNameAvailability(serviceClient, accountName, _) { var progress, message, availability; var __frame = { name: "checkNameAvailability", line: 204 }; return __func(_, this, arguments, checkNameAvailability, 2, __frame, function __$checkNameAvailability() {

      message = $("Checking availability of the storage account name");
      availability = { }; return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$checkNameAvailability() { return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$checkNameAvailability() {


                  progress = showProgress(message);
                  return serviceClient.storageAccounts.checkNameAvailability(accountName, __cb(_, __frame, 7, 51, function ___(__0, __1) { availability = __1; __then(); }, true)); }); })(function ___(e, __result) { __catch(function __$checkNameAvailability() { if (e) {

                    if (!isResourceMode) {
                      availability.isAvailable = false;
                      availability.reason = e.message;
                      availability.statusCode = e.statusCode;
                      availability.requestId = e.requestId; }
                     else {
                      return _(e); } ; __then(); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$checkNameAvailability() { _(null, null, true); }); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$checkNameAvailability() {


              endProgress(progress); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$checkNameAvailability() {


          if (!isResourceMode) {
            availability.nameAvailable = availability.isAvailable;
            delete availability.isAvailable; } ;


          return _(null, availability); }); }); }); };


  function showSubscriptionUsage(serviceClient, subscriptionId, _) { var progress, message, usage, usageList, i; var __frame = { name: "showSubscriptionUsage", line: 233 }; return __func(_, this, arguments, showSubscriptionUsage, 2, __frame, function __$showSubscriptionUsage() {

      message = $("Showing the subscription usage");
      usage = { subscription: subscriptionId };

      if (!subscriptionId) {
        usage.subscriptionId = profile.current.getSubscription().id; } ; return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$showSubscriptionUsage() {



            progress = showProgress(message);
            return serviceClient.usageOperations.list(__cb(_, __frame, 11, 52, function ___(__0, __1) { usageList = __1;
              for (i = 0; (i < usageList.length); i++) {
                if ((usageList[i].name.value === "StorageAccounts")) {
                  usage.used = usageList[i].currentValue;
                  usage.limit = usageList[i].limit;
                  break; } ; }; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$showSubscriptionUsage() {



              endProgress(progress); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$showSubscriptionUsage() {


          return _(null, usage); }); }); }); };


  function getAccountKeys(serviceClient, accountName, options, _) { var progress, message, keys; var __frame = { name: "getAccountKeys", line: 259 }; return __func(_, this, arguments, getAccountKeys, 3, __frame, function __$getAccountKeys() {

      message = $("Getting storage account keys"); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$getAccountKeys() { return (function __$getAccountKeys(__then) {



              if (isResourceMode) {
                return validateResourceGroupName(options, __cb(_, __frame, 7, 8, function __$getAccountKeys() {
                  progress = showProgress(message);
                  return serviceClient.storageAccounts.listKeys(options.resourceGroup, accountName, __cb(_, __frame, 9, 45, function ___(__0, __1) { keys = __1; __then(); }, true)); }, true)); } else {

                progress = showProgress(message);
                return serviceClient.storageAccounts.getKeys(accountName, __cb(_, __frame, 12, 45, function ___(__0, __2) { keys = __2; __then(); }, true)); } ; })(function __$getAccountKeys() { _(null, null, true); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$getAccountKeys() {


              endProgress(progress); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$getAccountKeys() {


          return _(null, keys); }); }); }); };


  function regenerateAccountKeys(serviceClient, accountName, options, _) { var progress, message, keys, keyType, parameters; var __frame = { name: "regenerateAccountKeys", line: 280 }; return __func(_, this, arguments, regenerateAccountKeys, 3, __frame, function __$regenerateAccountKeys() {

      message = $("Renewing storage account key"); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$regenerateAccountKeys() { return (function __$regenerateAccountKeys(__then) {




              if (isResourceMode) {
                return validateResourceGroupName(options, __cb(_, __frame, 8, 8, function __$regenerateAccountKeys() {
                  progress = showProgress(message);
                  keyType = (options.primary ? "key1" : "key2");
                  return serviceClient.storageAccounts.regenerateKey(options.resourceGroup, accountName, keyType, __cb(_, __frame, 11, 45, function ___(__0, __1) { keys = __1; __then(); }, true)); }, true)); } else {

                keyType = (options.primary ? "primary" : "secondary");
                parameters = { name: accountName, keyType: keyType };
                progress = showProgress(message);
                return serviceClient.storageAccounts.regenerateKeys(parameters, __cb(_, __frame, 16, 45, function ___(__0, __2) { keys = __2; __then(); }, true)); } ; })(function __$regenerateAccountKeys() { _(null, null, true); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$regenerateAccountKeys() {


              endProgress(progress); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$regenerateAccountKeys() {


          return _(null, keys); }); }); }); };


  function parseResourceGroupNameFromId(id) {
    if (!id) { return ""; } ;
    var keyword = "/resourceGroups/";
    var startIndex = (id.indexOf(keyword) + keyword.length);
    var endIndex = id.indexOf("/", startIndex);
    return id.substring(startIndex, endIndex); };


  storageAccount.listCommand = function storageAccount_listCommand__1(options, _) { var service, storageAccounts; var __frame = { name: "storageAccount_listCommand__1", line: 313 }; return __func(_, this, arguments, storageAccount_listCommand__1, 1, __frame, function __$storageAccount_listCommand__1() {
      service = createStorageManagementClient(options.subscription);

      return listAccounts(service, options, __cb(_, __frame, 3, 26, function ___(__0, __1) { storageAccounts = __1;

        storageAccounts.forEach(function(storageAccount) {
          storageAccount.resourceGroup = parseResourceGroupNameFromId(storageAccount.id); });


        cli.interaction.formatOutput(storageAccounts, function(outputData) {
          if ((outputData.length === 0)) {
            log.info($("No storage accounts defined")); }
           else {
            log.table(outputData, function(row, item) {
              row.cell($("Name"), item.name);
              if (isResourceMode) {
                row.cell($("Type"), item.accountType);
                row.cell($("Location"), item.location);
                row.cell($("Resource Group"), item.resourceGroup); }
               else {
                row.cell($("Type"), item.properties.accountType);
                row.cell($("Label"), (item.label ? item.properties.label : ""));
                row.cell($("Location"), (item.properties.location || (((item.properties.affinityGroup || "")) + ((item.properties.geoPrimaryRegion ? ((" (" + item.properties.geoPrimaryRegion) + ")") : "")))));


                row.cell($("Resource Group"), item.extendedProperties.ResourceGroup); } ; }); } ; }); _(); }, true)); }); };






  storageAccount.showCommand = function storageAccount_showCommand__2(name, options, _) { var service, storageAccount; var __frame = { name: "storageAccount_showCommand__2", line: 345 }; return __func(_, this, arguments, storageAccount_showCommand__2, 2, __frame, function __$storageAccount_showCommand__2() {
      service = createStorageManagementClient(options.subscription);

      return showAccount(service, name, options, __cb(_, __frame, 3, 25, function ___(__0, __1) { storageAccount = __1;

        if (storageAccount) {
          storageAccount.resourceGroup = parseResourceGroupNameFromId(storageAccount.id);
          cli.interaction.formatOutput(storageAccount, function(outputData) {
            log.data($("Name:"), outputData.name);
            if (isResourceMode) {
              log.data($("Url:"), outputData.id);
              log.data($("Type:"), outputData.accountType);
              log.data($("Resource Group:"), outputData.resourceGroup);
              log.data($("Location:"), outputData.location);
              log.data($("Provisioning State:"), outputData.provisioningState);
              log.data($("Primary Location:"), outputData.primaryLocation);
              log.data($("Primary Status:"), outputData.statusOfPrimary);
              if (outputData.customDomain) {
                log.data($("Custom Domain:"), outputData.customDomain.name); } ;

              log.data($("Secondary Location:"), outputData.secondaryLocation);
              log.data($("Creation Time:"), outputData.creationTime);
              cli.interaction.logEachData($("Primary Endpoints:"), outputData.primaryEndpoints);
              if (outputData.tags) {
                cli.interaction.logEachData($("Tags:"), outputData.tags); } ; }

             else {
              log.data($("Url:"), outputData.uri);

              cli.interaction.logEachData($("Account Properties:"), outputData.properties);
              cli.interaction.logEachData($("Extended Properties:"), outputData.extendedProperties);
              cli.interaction.logEachData($("Capabilities:"), outputData.capabilities); } ; }); }


         else {
          log.info($("No storage account found")); } ; _(); }, true)); }); };



  storageAccount.createCommand = function storageAccount_createCommand__3(name, options, _) { var service, managementService, storageOptions; var __frame = { name: "storageAccount_createCommand__3", line: 384 }; return __func(_, this, arguments, storageAccount_createCommand__3, 2, __frame, function __$storageAccount_createCommand__3() {
      service = createStorageManagementClient(options.subscription);
      managementService = utils.createManagementClient(profile.current.getSubscription(options.subscription), log);

      storageOptions = {
        name: name,
        label: (options.label ? options.label : name) }; return (function __$storageAccount_createCommand__3(__then) {


        if (options.type) {
          validation.isValidEnumValue(options.type, Object.keys(storageUtil.AccountTypeForCreating)); __then(); } else {

          return cli.interaction.chooseIfNotGiven($("Account Type: "), $("Getting type"), options.type, function(cb) {

            cb(null, Object.keys(storageUtil.AccountTypeForCreating)); }, __cb(_, __frame, 12, 37, function ___(__0, __1) { options.type = __1; __then(); }, true)); } ; })(function __$storageAccount_createCommand__3() {


        storageOptions.accountType = storageUtil.AccountTypeForCreating[options.type.toUpperCase()];

        if (__.isString(options.description)) {
          storageOptions.description = options.description; } ; return (function __$storageAccount_createCommand__3(__then) {


          if (options.affinityGroup) {
            storageOptions.affinityGroup = options.affinityGroup; __then(); } else {

            return cli.interaction.chooseIfNotGiven($("Location: "), $("Getting locations"), options.location, function(cb) {

              managementService.locations.list(function(err, result) {
                if (err) { return cb(err); } ;

                cb(null, result.locations.map(function(location) { return location.name; })); }); }, __cb(_, __frame, 26, 48, function ___(__0, __2) { storageOptions.location = __2; __then(); }, true)); } ; })(function __$storageAccount_createCommand__3() {




          if (options.tags) {
            storageOptions.tags = storageUtil.parseKvParameterInvariant(options.tags); } ;


          return createAccount(service, storageOptions, options, __cb(_, __frame, 40, 4, function __$storageAccount_createCommand__3() { _(); }, true)); }); }); }); };


  storageAccount.updateCommand = function storageAccount_updateCommand__4(name, options, _) { var service, storageOptions, customDomain; var __frame = { name: "storageAccount_updateCommand__4", line: 427 }; return __func(_, this, arguments, storageAccount_updateCommand__4, 2, __frame, function __$storageAccount_updateCommand__4() {
      service = createStorageManagementClient(options.subscription);

      storageOptions = { };
      if (__.isString(options.description)) {
        storageOptions.description = options.description; } ;


      if (options.label) {
        storageOptions.label = options.label; } ;


      if (options.type) {
        validation.isValidEnumValue(options.type, Object.keys(storageUtil.AccountTypeForChanging));
        storageOptions.accountType = storageUtil.AccountTypeForChanging[options.type.toUpperCase()]; } ;


      if (options.customDomain) {
        customDomain = { };
        if ((options.customDomain === storageUtil.SPACE_PARAMETER)) {
          customDomain.name = ""; }
         else {
          customDomain.name = options.customDomain;
          if ((options.subdomain === true)) {
            customDomain.useSubDomain = true; } ; } ;



        storageOptions.customDomain = customDomain; } ;


      if (options.tags) {
        storageOptions.tags = storageUtil.parseKvParameterInvariant(options.tags); } ;


      return updateAccount(service, name, storageOptions, options, __cb(_, __frame, 35, 4, function __$storageAccount_updateCommand__4() { _(); }, true)); }); };


  storageAccount.deleteCommand = function storageAccount_deleteCommand__5(name, options, _) { var service; var __frame = { name: "storageAccount_deleteCommand__5", line: 465 }; return __func(_, this, arguments, storageAccount_deleteCommand__5, 2, __frame, function __$storageAccount_deleteCommand__5() {
      service = createStorageManagementClient(options.subscription); return (function __$storageAccount_deleteCommand__5(_) {

        var __1 = !options.quiet; if (!__1) { return _(null, __1); } ; return cli.interaction.confirm(util.format($("Delete storage account %s? [y/n] "), name), __cb(_, __frame, 3, 43, function ___(__0, __3) { var __2 = !__3; return _(null, __2); }, true)); })(__cb(_, __frame, -464, 18, function ___(__0, __2) { return (function __$storageAccount_deleteCommand__5(__then) { if (__2) { return _(null); } else { __then(); } ; })(function __$storageAccount_deleteCommand__5() {



          return deleteAccount(service, name, options, __cb(_, __frame, 7, 4, function __$storageAccount_deleteCommand__5() { _(); }, true)); }); }, true)); }); };


  storageAccount.checkCommand = function storageAccount_checkCommand__6(name, options, _) { var service, availability; var __frame = { name: "storageAccount_checkCommand__6", line: 475 }; return __func(_, this, arguments, storageAccount_checkCommand__6, 2, __frame, function __$storageAccount_checkCommand__6() {
      service = createStorageManagementClient();
      return checkNameAvailability(service, name, __cb(_, __frame, 2, 23, function ___(__0, __1) { availability = __1;

        cli.interaction.formatOutput(availability, function(outputData) {
          log.data($("Availability:"), outputData.nameAvailable.toString());
          if (!outputData.nameAvailable) {
            log.data($("Reason:"), outputData.reason);
            if (outputData.message) {
              log.data($("Message:"), outputData.message); } ; } ; }); _(); }, true)); }); };





  usage.usageCommand = function usage_usageCommand__7(subscription, options, _) { var service, usage; var __frame = { name: "usage_usageCommand__7", line: 490 }; return __func(_, this, arguments, usage_usageCommand__7, 2, __frame, function __$usage_usageCommand__7() {
      service = createStorageManagementClient(subscription);
      return showSubscriptionUsage(service, subscription, __cb(_, __frame, 2, 16, function ___(__0, __1) { usage = __1;

        cli.interaction.formatOutput(usage, function(outputData) {
          log.data($("Subscription:"), outputData.subscriptionId);
          log.data($("Used:"), outputData.used);
          log.data($("Limit:"), outputData.limit); }); _(); }, true)); }); };



  keys.listCommand = function keys_listCommand__8(name, options, _) { var service, keys; var __frame = { name: "keys_listCommand__8", line: 501 }; return __func(_, this, arguments, keys_listCommand__8, 2, __frame, function __$keys_listCommand__8() {
      service = createStorageManagementClient(options.subscription);

      return getAccountKeys(service, name, options, __cb(_, __frame, 3, 15, function ___(__0, __1) { keys = __1;

        if (keys) {
          if (isResourceMode) {
            cli.interaction.formatOutput(keys, function(outputData) {
              log.data($("Primary:"), outputData.key1);
              log.data($("Secondary:"), outputData.key2); }); }

           else {
            cli.interaction.formatOutput(keys, function(outputData) {
              log.data($("Primary:"), outputData.primaryKey);
              log.data($("Secondary:"), outputData.secondaryKey); }); } ; }


         else {
          log.info($("No storage account keys found")); } ; _(); }, true)); }); };



  keys.renewCommand = function keys_renewCommand__9(name, options, _) { var service, keys; var __frame = { name: "keys_renewCommand__9", line: 523 }; return __func(_, this, arguments, keys_renewCommand__9, 2, __frame, function __$keys_renewCommand__9() {
      service = createStorageManagementClient(options.subscription);

      if ((!options.primary && !options.secondary)) {
        return _(new Error($("Need to specify either --primary or --secondary"))); } else {
        if ((options.primary && options.secondary)) {
          return _(new Error($("Only one of primary or secondary keys can be renewed at a time"))); } ; } ;


      return regenerateAccountKeys(service, name, options, __cb(_, __frame, 9, 15, function ___(__0, __1) { keys = __1;

        if (keys) {
          if (isResourceMode) {
            cli.interaction.formatOutput(keys, function(outputData) {
              log.data($("Primary:"), outputData.key1);
              log.data($("Secondary:"), outputData.key2); }); }

           else {
            cli.interaction.formatOutput(keys, function(outputData) {
              log.data($("Primary:"), outputData.primaryKey);
              log.data($("Secondary:"), outputData.secondaryKey); }); } ; }


         else {
          log.info($("No storage account keys found")); } ; _(); }, true)); }); };



  connectionString.showCommand = function connectionString_showCommand__10(name, options, _) { var service, keys, connection; var __frame = { name: "connectionString_showCommand__10", line: 551 }; return __func(_, this, arguments, connectionString_showCommand__10, 2, __frame, function __$connectionString_showCommand__10() {
      service = createStorageManagementClient(options.subscription);
      return getAccountKeys(service, name, options, __cb(_, __frame, 2, 15, function ___(__0, __1) { keys = __1;
        connection = { string: "" };
        connection.string = ("DefaultEndpointsProtocol=" + ((options.useHttp ? "http;" : "https;")));
        connection.string += wrapEndpoint(options.blobEndpoint, serviceType.blob);
        connection.string += wrapEndpoint(options.queueEndpoint, serviceType.queue);
        connection.string += wrapEndpoint(options.tableEndpoint, serviceType.table);
        connection.string += wrapEndpoint(options.fileEndpoint, serviceType.file);
        connection.string += (("AccountName=" + name) + ";");
        connection.string += ("AccountKey=" + ((keys.primaryKey || keys.key1)));
        cli.interaction.formatOutput(connection, function(outputData) {
          log.data($("connectionstring:"), outputData.string); }); _(); }, true)); }); };



  Object.getPrototypeOf(storage).appendSubscriptionAndResourceGroupOption = function() {
    if (isResourceMode) {
      this.option("-g, --resource-group <resourceGroup>", $("the resource group name")); } ;

    this.option("-s, --subscription <id>", $("the subscription id"));
    return this; };



  storageAccount.command("list").description($("List storage accounts")).appendSubscriptionAndResourceGroupOption().execute(storageAccount.listCommand);





  storageAccount.command("show <name>").description($("Show a storage account")).appendSubscriptionAndResourceGroupOption().execute(storageAccount.showCommand);





  var accountCreateCommand = storageAccount.command("create <name>").description($("Create a storage account"));
  if (isResourceMode) {
    accountCreateCommand.option("--tags <tags>", $("the account tags. Tags are key=value pairs and separated with semicolon(;)")); }
   else {
    accountCreateCommand.option("-e, --label <label>", $("the storage account label")).option("-d, --description <description>", $("the storage account description")).option("-a, --affinity-group <affinityGroup>", $("the affinity group")); } ;



  accountCreateCommand.option("-l, --location <location>", $("the location")).option("--type <type>", $("the account type(LRS/ZRS/GRS/RAGRS/PLRS)")).appendSubscriptionAndResourceGroupOption().execute(storageAccount.createCommand);





  var accountSetCommand;
  if (isResourceMode) {
    accountSetCommand = storageAccount.command("set <name>").description($("Update a storage account (Only one property can be updated at a time)")).option("--custom-domain <customDomain>", $("the custom domain")).option("--subdomain", $("whether uses the 'asverify' subdomain to preregister the custom domain")).option("--tags <tags>", $("the account tags. Tags are key=value pairs and separated with semicolon(;)")); }



   else {
    accountSetCommand = storageAccount.command("set <name>").description($("Update a storage account")).option("-e, --label <label>", $("the storage account label")).option("-d, --description <description>", $("the storage account description")); } ;



  accountSetCommand.option("--type <type>", $("the account type(LRS/GRS/RAGRS)")).appendSubscriptionAndResourceGroupOption().execute(storageAccount.updateCommand);




  storageAccount.command("delete <name>").description($("Delete a storage account")).appendSubscriptionAndResourceGroupOption().option("-q, --quiet", $("quiet mode, do not ask for delete confirmation")).execute(storageAccount.deleteCommand);





  storageAccount.command("check <name>").description($("Check whether the account name is valid and is not in use.")).execute(storageAccount.checkCommand);



  if (isResourceMode) {
    usage.command("show [subscription]").description($("Show the current count and the limit of the storage accounts under the subscription.")).option("-s, --subscription <id>", $("the subscription id")).execute(usage.usageCommand); } ;






  keys.command("list <name>").description($("List the keys for a storage account")).appendSubscriptionAndResourceGroupOption().execute(keys.listCommand);





  keys.command("renew <name>").description($("Renew a key for a storage account from your account")).option("--primary", $("Update the primary key")).option("--secondary", $("Update the secondary key")).appendSubscriptionAndResourceGroupOption().execute(keys.renewCommand);







  connectionString.command("show <name>").description($("Show the connection string for your account")).appendSubscriptionAndResourceGroupOption().option("--use-http", $("Use http as default endpoints protocol")).option("--blob-endpoint <blobEndpoint>", $("the blob endpoint")).option("--queue-endpoint <queueEndpoint>", $("the queue endpoint")).option("--table-endpoint <tableEndpoint>", $("the table endpoint")).option("--file-endpoint <fileEndpoint>", $("the file endpoint")).execute(connectionString.showCommand);};