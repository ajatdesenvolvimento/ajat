/*** Generated by streamline 0.10.17 (callbacks) - DO NOT EDIT ***/ "use strict"; var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb,__catch=__rt.__catch,__tryCatch=__rt.__tryCatch; var __ = require("underscore");

















var util = require("util");

var groupUtils = require("../group/groupUtils");
var permissionsUtils = require("../role/permissionsUtils");
var rbacClients = require("../role/rbacClients");
var profile = require("../../../util/profile");
var resourceUtils = require("./resourceUtils");
var tagUtils = require("../tag/tagUtils");
var utils = require("../../../util/utils");

var $ = utils.getLocaleString;

exports.init = function(cli) {
  var log = cli.output;
  var withProgress = cli.interaction.withProgress.bind(cli.interaction);

  var resource = cli.category("resource").description($("Commands to manage your resources"));


  resource.command("create [resource-group] [name] [resource-type] [location] [api-version]").description($("Creates a resource in a resource group")).usage("[options] <resource-group> <name> <resource-type> <location> <api-version>").option("-g --resource-group <resource-group>", $("the resource group name")).option("-n --name <name>", $("the resource name")).option("-l --location <location>", $("the location where we will create the resource")).option("-r --resource-type <resource-type>", $("the resource type")).option("-o --api-version <api-version>", $("the API version of the resource provider")).option("--parent <parent>", $("the name of the parent resource (if needed), in path/path/path format")).option("-p --properties <properties>", $("a JSON-formatted string containing properties")).option("-t --tags <tags>", $(("Tags to set to the resource group. Can be mutliple. " + "In the format of 'name=value'. Name is required and value is optional. For example, -t tag1=value1;tag2"))).option("--subscription <subscription>", $("the subscription identifier")).execute(function __1(resourceGroup, name, resourceType, location, apiVersion, options, _) { var __frame = { name: "__1", line: 51 }; return __func(_, this, arguments, __1, 6, __frame, function __$__1() {













      return resource.createResource(resourceGroup, name, resourceType, location, apiVersion, options.properties, options, __cb(_, __frame, 1, 15, function __$__1() { _(); }, true)); }); });


  resource.command("set [resource-group] [name] [resource-type] [properties] [api-version]").usage("[options] <resource-group> <name> <resource-type> <properties> <api-version>").description($("Updates a resource in a resource group without any templates or parameters")).option("-g --resource-group <resource-group>", $("the resource group name")).option("-n --name <name>", $("the resource name")).option("-r --resource-type <resource-type>", $("the resource type")).option("-p --properties <properties>", $("a JSON-formatted string containing properties")).option("-o --api-version <api-version>", $("the API version of the resource provider")).option("--parent <parent>", $("the name of the parent resource (if needed), in path/path/path format")).option("-t --tags <tags>", $(("Tags to set to the resource. Can be multiple. " + "In the format of 'name=value'. Name is required and value is optional. For example, -t tag1=value1;tag2"))).option("--no-tags", $("remove all existing tags")).option("--subscription <subscription>", $("the subscription identifier")).execute(function __2(resourceGroup, name, resourceType, properties, apiVersion, options, _) { var __frame = { name: "__2", line: 68 }; return __func(_, this, arguments, __2, 6, __frame, function __$__2() {













      return resource.createResource(resourceGroup, name, resourceType, "", apiVersion, properties, options, __cb(_, __frame, 1, 15, function __$__2() { _(); }, true)); }); });


  resource.createResource = function resource_createResource__3(resourceGroup, name, resourceType, location, apiVersion, propertiesParam, options, _) { var subscription, client, identity, resource, properties, tags, message, doneMessage, resourceLocation, newResource; var __frame = { name: "resource_createResource__3", line: 72 }; return __func(_, this, arguments, resource_createResource__3, 7, __frame, function __$resource_createResource__3() {
      if (!resourceGroup) {
        return _(null, cli.missingArgument("resourceGroup")); } else {
        if (!name) {
          return _(null, cli.missingArgument("name")); } else {
          if (!resourceType) {
            return _(null, cli.missingArgument("resourceType")); } else {
            if (!apiVersion) {
              return _(null, cli.missingArgument("apiVersion")); } ; } ; } ; } ;


      subscription = profile.current.getSubscription(options.subscription);
      client = utils.createResourceClient(subscription);

      identity = {
        resourceName: name,
        resourceProviderNamespace: resourceUtils.getProviderName(resourceType),
        resourceProviderApiVersion: apiVersion,
        resourceType: resourceUtils.getResourceTypeName(resourceType),

        parentResourcePath: (__.isString(options.parent) ? options.parent : "") };


      return withProgress(util.format($("Getting resource %s"), name), function __1(log, _) { var __frame = { name: "__1", line: 96 }; return __func(_, this, arguments, __1, 1, __frame, function __$__1() {

          return groupUtils.getResource(client, resourceGroup, identity, __cb(_, __frame, 1, 26, _, true)); }); }, __cb(_, __frame, 23, 19, function ___(__0, __3) { resource = __3;


        resource = (resource || { });
        properties = { };
        if (propertiesParam) {
          properties = JSON.parse(propertiesParam); } ;


        tags = { };
        tags = tagUtils.buildTagsParameter(tags, options);

        message = util.format($("Creating resource %s"), name);
        doneMessage = util.format($("Created resource %s"), name);
        if (resource) {
          message = util.format($("Updating resource %s"), name);
          doneMessage = util.format($("Resource %s is updated"), name); } ;


        resourceLocation = (location || resource.location);
        if (!resourceLocation) {
          cli.missingArgument("location"); } ;



        return cli.interaction.withProgress(util.format($("Creating resource %s"), name), function __2(log, _) { var __frame = { name: "__2", line: 123 }; return __func(_, this, arguments, __2, 1, __frame, function __$__2() {

            return client.resources.createOrUpdate(resourceGroup, identity, {


              location: resourceLocation,
              resource: resource,
              properties: properties,
              resourceProviderApiVersion: apiVersion,
              tags: tags }, __cb(_, __frame, 1, 39, function ___(__0, __1) { newResource = __1.resource; _(); }, true)); }); }, __cb(_, __frame, 50, 20, function __$resource_createResource__3() {



          log.info(doneMessage);
          log.data("");
          showResource(newResource); _(); }, true)); }, true)); }); };


  resource.command("list [resource-group]").description($("Lists the resources")).option("-g --resource-group <resource-group>", $("the resource group name")).option("-r --resource-type <resource-type>", $("the resource type")).option("--details", $("show details such as permissions, etc.")).option("-t --tags <tags>", $((("Tag to use to filter to the resource group. Can only take 1 tag. " + "In the format of \"name=value\". Name is required and value is optional. ") + "For example, -t tag1 or -t tag1=value1."))).option("--subscription <subscription>", $("the subscription identifier")).execute(function __4(resourceGroup, options, _) { var subscription, client, progress, resources, parameters, authzClient, i, resourceInformation; var __frame = { name: "__4", line: 149 }; return __func(_, this, arguments, __4, 2, __frame, function __$__4() {









      subscription = profile.current.getSubscription(options.subscription);
      client = utils.createResourceClient(subscription);
      progress = cli.interaction.progress(util.format($("Listing resources"))); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__4() {



            parameters = { };
            if (options) {
              if (options.resourceType) {
                parameters.resourceType = options.resourceType; } ;

              if (options.tags) {
                tagUtils.populateQueryFilterWithTagInfo(options.tags, parameters); } ; } ;



            if (resourceGroup) {
              parameters.resourceGroupName = resourceGroup; } ;


            return client.resources.list(parameters, __cb(_, __frame, 21, 37, function ___(__0, __1) { resources = __1.resources; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__4() {

              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$__4() { return (function __$__4(__then) {


            if (options.details) {
              authzClient = rbacClients.getAuthzClient(subscription);
              i = 0; var __5 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$__4() { __more = false; if (__5) { i++; } else { __5 = true; } ; var __4 = (i < resources.length); if (__4) {
                    resourceInformation = resourceUtils.getResourceInformation(resources[i].id);
                    return authzClient.permissions.listForResource(resourceInformation.resourceGroup, {
                      resourceName: resourceInformation.resourceName,
                      resourceType: resourceUtils.getResourceTypeName(resourceInformation.resourceType),
                      resourceProviderNamespace: resourceUtils.getProviderName(resourceInformation.resourceType),
                      parentResourcePath: (resourceInformation.parentResource ? resourceInformation.parentResource : "") }, __cb(_, __frame, 30, 61, function ___(__0, __2) { resources[i].permissions = __2.permissions; while (__more) { __loop(); }; __more = true; }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } else { __then(); } ; })(function __$__4() {





            if ((resources.length === 0)) {
              log.info($("No matched resources were found.")); }
             else {
              log.table(resources, function(row, item) {
                var resourceInformation = resourceUtils.getResourceInformation(item.id);
                row.cell($("Id"), item.id);
                row.cell($("Name"), (resourceInformation.resourceName || item.name));
                row.cell($("Resource Group"), (resourceInformation.resourceGroup || ""));
                row.cell($("Type"), (resourceInformation.resourceType || item.type));
                row.cell($("Parent"), (resourceInformation.parentResource ? resourceInformation.parentResource : ""));
                row.cell($("Location"), item.location);
                row.cell($("Tags"), tagUtils.getTagsInfo(item.tags));
                if (item.permissions) {
                  var permissionDetails = permissionsUtils.getPermissionDetails(item.permissions);
                  row.cell($("Actions"), permissionDetails.actions);
                  row.cell($("NotActions"), permissionDetails.notActions); } ; }); } ; _(); }); }); }); }); });





  resource.command("show [resource-group] [name] [resource-type] [api-version]").description($("Gets one resource within a resource group or subscription")).usage("[options] <resource-group> <name> <resource-type> <api-version>").option("-g --resource-group <resource-group>", $("the resource group name")).option("-n --name <name>", $("the resource name")).option("-r --resource-type <resource-type>", $("the resource type")).option("-o --api-version <api-version>", $("the API version of the resource provider")).option("--parent <parent>", $("the name of the parent resource (if needed), in path/path/path format")).option("--subscription <subscription>", $("the subscription identifier")).execute(function __5(resourceGroup, name, resourceType, apiVersion, options, _) { var subscription, client, authzClient, progress, resource, identity; var __frame = { name: "__5", line: 219 }; return __func(_, this, arguments, __5, 5, __frame, function __$__5() {









      if (!resourceGroup) {
        return _(null, cli.missingArgument("resourceGroup")); } else {
        if (!name) {
          return _(null, cli.missingArgument("name")); } else {
          if (!resourceType) {
            return _(null, cli.missingArgument("resourceType")); } else {
            if (!apiVersion) {
              return _(null, cli.missingArgument("apiVersion")); } ; } ; } ; } ;


      subscription = profile.current.getSubscription(options.subscription);
      client = utils.createResourceClient(subscription);
      authzClient = rbacClients.getAuthzClient(subscription);

      progress = cli.interaction.progress(util.format($("Getting resource %s"), name)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__5() {



            identity = {
              resourceName: name,
              resourceProviderNamespace: resourceUtils.getProviderName(resourceType),
              resourceProviderApiVersion: apiVersion,
              resourceType: resourceUtils.getResourceTypeName(resourceType),

              parentResourcePath: (__.isString(options.parent) ? options.parent : "") };


            return client.resources.get(resourceGroup, identity, __cb(_, __frame, 28, 36, function ___(__0, __1) { resource = __1.resource;
              return authzClient.permissions.listForResource(resourceGroup, identity, __cb(_, __frame, 29, 55, function ___(__0, __2) { resource.permissions = __2.permissions; _(null, null, true); }, true)); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__5() {

              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$__5() {


          cli.interaction.formatOutput(resource, function(resource) {
            showResource(resource, true); }); _(); }); }); }); });



  resource.command("delete [resource-group] [name] [resource-type] [api-version]").description($("Deletes a resource in a resource group")).usage("[options] <resource-group> <name> <resource-type> <api-version>").option("-g --resource-group <resource-group>", $("the resource group name")).option("-n --name <name>", $("the resource name")).option("-r --resource-type <resource-type>", $("the resource type")).option("-o --api-version <api-version>", $("the API version of the resource provider")).option("--parent <parent>", $("the name of the parent resource (if needed), in path/path/path format")).option("-q, --quiet", $("quiet mode (do not ask for delete confirmation)")).option("--subscription <subscription>", $("the subscription identifier")).execute(function __6(resourceGroup, name, resourceType, apiVersion, options, _) { var subscription, client, progress, identity; var __frame = { name: "__6", line: 268 }; return __func(_, this, arguments, __6, 5, __frame, function __$__6() {










      if (!resourceGroup) {
        return _(null, cli.missingArgument("resourceGroup")); } else {
        if (!name) {
          return _(null, cli.missingArgument("name")); } else {
          if (!resourceType) {
            return _(null, cli.missingArgument("resourceType")); } else {
            if (!apiVersion) {
              return _(null, cli.missingArgument("apiVersion")); } ; } ; } ; } ; return (function __$__6(_) {


        var __1 = !options.quiet; if (!__1) { return _(null, __1); } ; return cli.interaction.confirm(util.format($("Delete resource %s? [y/n] "), name), __cb(_, __frame, 11, 45, function ___(__0, __3) { var __2 = !__3; return _(null, __2); }, true)); })(__cb(_, __frame, -267, 17, function ___(__0, __2) { return (function __$__6(__then) { if (__2) { return _(null); } else { __then(); } ; })(function __$__6() {



          subscription = profile.current.getSubscription(options.subscription);
          client = utils.createResourceClient(subscription);
          progress = cli.interaction.progress(util.format($("Deleting resource %s"), name)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__6() {

                identity = {
                  resourceName: name,
                  resourceProviderNamespace: resourceUtils.getProviderName(resourceType),
                  resourceProviderApiVersion: apiVersion,
                  resourceType: resourceUtils.getResourceTypeName(resourceType),

                  parentResourcePath: (__.isString(options.parent) ? options.parent : "") }; return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__6() {



                      return client.resources.get(resourceGroup, identity, __cb(_, __frame, 29, 27, __then, true)); }); })(function ___(e, __result) { __catch(function __$__6() { if (e) {

                        return _(new Error($("Resource does not exist"))); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$__6() {


                    return client.resources.deleteMethod(resourceGroup, identity, __cb(_, __frame, 34, 25, function __$__6() { _(null, null, true); }, true)); }); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__6() {

                  progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$__6() { _(); }); }); }); }, true)); }); });



  resource.command("move [ids] [destination-group]").description($("Moves resources from one resource group to another")).usage("[options] <ids> <destination-group>").option("-i --ids <ids>", $("the comma-delimitied resource ids to be moved")).option("-d --destination-group <destination-group>", $("the destination resource group name")).option("--destination-subscriptionId <destination-subscriptionId>", $("the destination subscription identifier")).option("-q, --quiet", $("quiet mode (do not ask for move confirmation)")).option("--subscription <subscription>", $("the subscription identifier")).execute(function __7(ids, destinationGroup, apiVersion, options, _) { var resources, sourceGroup, subscription, client, progress, destinationSubId, parameters; var __frame = { name: "__7", line: 316 }; return __func(_, this, arguments, __7, 4, __frame, function __$__7() {








      if (!ids) {
        return _(null, cli.missingArgument("ids")); } else {
        if (!destinationGroup) {
          return _(null, cli.missingArgument("destinationGroup")); } ; } ;



      resources = (ids ? ids.split(",") : []);
      sourceGroup = resourceUtils.getSourceResourceGroupForMove(resources); return (function __$__7(_) {

        var __1 = !options.quiet; if (!__1) { return _(null, __1); } ; return cli.interaction.confirm(util.format($("Move selected resources in %s to %s? [y/n] "), sourceGroup, destinationGroup), __cb(_, __frame, 11, 45, function ___(__0, __3) { var __2 = !__3; return _(null, __2); }, true)); })(__cb(_, __frame, -315, 17, function ___(__0, __2) { return (function __$__7(__then) { if (__2) { return _(null); } else { __then(); } ; })(function __$__7() {



          subscription = profile.current.getSubscription(options.subscription);
          client = utils.createResourceClient(subscription);
          progress = cli.interaction.progress(util.format($("Moving selected resources to %s"), destinationGroup)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__7() { return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__7() {

                      destinationSubId = subscription.id;
                      if (options.destinationSubscriptionId) {
                        destinationSubId = options.destinationSubscriptionId; } ;

                      parameters = {
                        targetResourceGroup: ((("/subscriptions/" + destinationSubId) + "/resourceGroups/") + destinationGroup),
                        resources: resources };

                      return client.resources.moveResources(sourceGroup, parameters, __cb(_, __frame, 27, 25, __then, true)); }); })(function ___(e, __result) { __catch(function __$__7() { if (e) {


                        if (e.details) {
                          e.details.forEach(function(detail) {
                            if (detail.Message) {
                              log.error(detail.Message); } ; }); } ;



                        return _((e)); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$__7() { _(null, null, true); }); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__7() {


                  progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$__7() { _(); }); }); }); }, true)); }); });




  function showResource(resource, showDetail) {
    var resourceInformation = resourceUtils.getResourceInformation(resource.id);
    log.data($("Id:       "), resource.id);
    log.data($("Name:     "), (resourceInformation.resourceName || resource.name));
    log.data($("Type:     "), (resourceInformation.resourceType || resource.type));
    log.data($("Parent:   "), (resourceInformation.parentResource || ""));
    log.data($("Location: "), resource.location);
    log.data($("Tags:     "), tagUtils.getTagsInfo(resource.tags));
    log.data("");
    if (showDetail) {
      log.data($("Properties:"));
      cli.interaction.logEachData($("Property"), resource.properties);
      log.data("");
      var permissionDetails = permissionsUtils.getPermissionDetails(resource.permissions);
      log.data($("Permissions:"));
      log.data(($("  Actions: ") + permissionDetails.actions));
      log.data(($("  NotActions: ") + permissionDetails.notActions)); } ; };};
