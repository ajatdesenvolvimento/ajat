/*** Generated by streamline 0.10.17 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb,__tryCatch=__rt.__tryCatch; var profile = require("../../util/profile");
















var utils = require("../../util/utils");

var WebsitesClient = require("./websites/websitesclient");
var $ = utils.getLocaleString;

exports.init = function(cli) {
  var site = cli.category("site");
  var siteScale = site.category("scale").description($("Commands to manage your Web Site scaling"));


  siteScale.command("mode [mode] [name]").description($("Set the web site mode")).usage("[options] <mode> [name]").option("--mode <mode>", $("the mode of the site (available are: free, basic, shared and standard)")).option("--slot <slot>", $("the name of the slot")).option("-s, --subscription <id>", $("the subscription id")).execute(function __1(mode, name, options, _) { var parsedSiteName, context, service, siteConfigurations, webHostingPlanName, webHostingPlanConfig; var __frame = { name: "__1", line: 34 }; return __func(_, this, arguments, __1, 3, __frame, function __$__1() {






      return cli.interaction.chooseIfNotGiven($("Mode: "), $("Getting modes"), mode, function(cb) {

        cb(null, ["Free","Shared","Standard",]); }, __cb(_, __frame, 1, 29, function ___(__0, __1) { mode = __1;


        parsedSiteName = WebsitesClient.parseSiteName(name);
        context = {
          subscription: profile.current.getSubscription(options.subscription).id,
          site: {
            name: parsedSiteName.name,
            slot: (options.slot ? options.slot : parsedSiteName.slot) } };



        return site.lookupSiteNameAndWebSpace(context, __cb(_, __frame, 15, 11, function __$__1() {

          return createWebsiteManagementService(context.subscription, __cb(_, __frame, 17, 20, function ___(__0, __2) { service = __2;

            return site.doSiteGet(context, __cb(_, __frame, 19, 36, function ___(__0, __3) { siteConfigurations = __3;
              webHostingPlanName = siteConfigurations.serverFarm;

              webHostingPlanConfig = { };
              webHostingPlanConfig.sKU = mode;

              return service.webHostingPlans.update(context.site.webspace, webHostingPlanName, webHostingPlanConfig, __cb(_, __frame, 25, 30, function __$__1() { _(); }, true)); }, true)); }, true)); }, true)); }, true)); }); });


  siteScale.command("instances [instances] [name]").description($("Set the web site number of instances")).usage("[options] <instances> [name]").option("--instances <instances>", $("the number of instances")).option("--size <size>", $("the size of the instances (available are: small, medium and large)")).option("--slot <slot>", $("the name of the slot")).option("-s, --subscription <id>", $("the subscription id")).execute(function __2(instances, name, options, _) { var parsedSiteName, context, service, siteConfigurations, webHostingPlanName, webHostingPlanConfig, progress; var __frame = { name: "__2", line: 69 }; return __func(_, this, arguments, __2, 3, __frame, function __$__2() {







      return cli.interaction.promptIfNotGiven($("Number of instances: "), instances, __cb(_, __frame, 1, 34, function ___(__0, __1) { instances = __1;

        parsedSiteName = WebsitesClient.parseSiteName(name);
        context = {
          subscription: profile.current.getSubscription(options.subscription).id,
          site: {
            name: parsedSiteName.name,
            slot: (options.slot ? options.slot : parsedSiteName.slot) } };



        return createWebsiteManagementService(context.subscription, __cb(_, __frame, 12, 20, function ___(__0, __2) { service = __2;

          return site.lookupSiteNameAndWebSpace(context, __cb(_, __frame, 14, 11, function __$__2() {
            return site.doSiteGet(context, __cb(_, __frame, 15, 36, function ___(__0, __3) { siteConfigurations = __3;

              if ((options.size !== null)) {

                options.size = (options.size.charAt(0).toUpperCase() + options.size.slice(1)); } ;


              if (((siteConfigurations.sku === "Free") || (siteConfigurations.sku === "Shared"))) {
                return _(new Error($("Instances cannot be changed for sites in a Free or Shared SKU."))); } ;


              webHostingPlanName = siteConfigurations.serverFarm;
              webHostingPlanConfig = { };
              webHostingPlanConfig.numberOfWorkers = instances;
              webHostingPlanConfig.sKU = siteConfigurations.sku;
              webHostingPlanConfig.workerSize = (options.size || null);

              progress = cli.interaction.progress($("Updating a web hosting plan")); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__2() {

                    return service.webHostingPlans.update(context.site.webspace, webHostingPlanName, webHostingPlanConfig, __cb(_, __frame, 34, 32, function __$__2() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__2() {

                      progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$__2() { _(); }); }); }, true)); }, true)); }, true)); }, true)); }); });



  function createWebsiteManagementService(subscription, callback) {
    return utils.createWebsiteClient(profile.current.getSubscription(subscription), callback); };};
