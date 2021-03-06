/*** Generated by streamline 0.10.17 (callbacks) - DO NOT EDIT ***/ "use strict"; var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb; var util = require("util");

















var utils = require("../../../util/utils");
var insightsUtils = require("./insights.utils");

var $ = utils.getLocaleString;

exports.init = function(cli) {
  var log = cli.output;
  var insightsDiagnosticCommand = cli.category("insights").category("diagnostic").description($("Configure diagnostics for resources")).command("set").description($("Set the diagnostics for the resource.")).usage("[options]").option("-i, --resourceId <resourceId>", $("resource Id.")).option("-a, --storageId <storageId>", $("storage account Id.")).option("-e, --enabled <enabled>", $("whether the configuration is enabled or disabled.")).option("-c, --categories <categories>", $("categories to be affected. Valid values vary per resource type.")).option("-t, --timegrains <timegrains>", $("timegrains to be affected in ISO 8601 format. Example: 'PT1M' for 1 minute.")).execute(function __1(options, _) { var __frame = { name: "__1", line: 36 }; return __func(_, this, arguments, __1, 1, __frame, function __$__1() {










      return insightsDiagnosticCommand._prepareAndExecute(options, __cb(_, __frame, 1, 34, function __$__1() { _(); }, true)); }); });


  insightsDiagnosticCommand._prepareAndExecute = function insightsDiagnosticCommand__prepareAndExecute__2(options, _) { var client, __this = this; var __frame = { name: "insightsDiagnosticCommand__prepareAndExecute__2", line: 40 }; return __func(_, this, arguments, insightsDiagnosticCommand__prepareAndExecute__2, 1, __frame, function __$insightsDiagnosticCommand__prepareAndExecute__2() {
      client = insightsUtils.createInsightsManagementClient(log, options);
      options.enabled = JSON.parse(options.enabled);
      if (options.categories) {
        options.categories = options.categories.split(","); } ;


      if (options.timegrains) {
        options.timegrains = options.timegrains.split(","); } ;


      return __this._executeCmd(client, options, __cb(_, __frame, 11, 9, function __$insightsDiagnosticCommand__prepareAndExecute__2() { _(); }, true)); }); };


  insightsDiagnosticCommand._isEmptyOrSpaces = function(str) {
    return ((str === null) || (str.match(/^ *$/) !== null)); };


  insightsDiagnosticCommand._executeCmd = function insightsDiagnosticCommand__executeCmd__3(client, options, _) { var putParameters, getResponse, properties, i, j, logSettings, metricSettings, __this = this; var __frame = { name: "insightsDiagnosticCommand__executeCmd__3", line: 58 }; return __func(_, this, arguments, insightsDiagnosticCommand__executeCmd__3, 2, __frame, function __$insightsDiagnosticCommand__executeCmd__3() {
      putParameters = { };
      return client.serviceDiagnosticSettingsOperations.get(options.resourceId, __cb(_, __frame, 2, 65, function ___(__0, __1) { getResponse = __1;
        properties = getResponse.properties;

        insightsUtils.removeRetentionPolicy(properties);

        i = 0;
        j = 0;

        if ((options.enabled && __this._isEmptyOrSpaces(options.storageId))) {

          return _(new Error("StorageId can't be null when enabling")); } ;


        if (!__this._isEmptyOrSpaces(options.storageId)) {
          properties.storageAccountId = options.storageId; } ;


        if ((!options.categories && !options.timegrains)) {
          for (i = 0; (i < properties.logs.length); i++) {
            properties.logs[i].enabled = options.enabled; };


          for (i = 0; (i < properties.metrics.length); i++) {
            properties.metrics[i].enabled = options.enabled; }; }


         else {
          if (options.categories) {
            for (i = 0; (i < options.categories.length); i++) {
              logSettings = null;
              for (j = 0; (j < properties.logs.length); j++) {
                if ((properties.logs[j].category === options.categories[i])) {
                  logSettings = properties.logs[j]; } ; };



              if (!logSettings) {
                return _(new Error(util.format("Log category '%s' is not available for '%s'", options.categories[i], options.storageId))); } ;


              logSettings.enabled = options.enabled; }; } ;



          if (options.timegrains) {
            for (i = 0; (i < options.timegrains.length); i++) {
              metricSettings = null;

              for (j = 0; (j < properties.metrics.length); j++) {
                if ((properties.metrics[j].timeGrain.toIsoString() === options.timegrains[i].toUpperCase())) {
                  metricSettings = properties.metrics[j]; } ; };



              if (!metricSettings) {
                return _(new Error(util.format("Metric timegrain '%s' is not available for '%s'", options.timegrains[i], options.storageId))); } ;


              metricSettings.enabled = options.enabled; }; } ; } ;




        putParameters.properties = properties;

        return client.serviceDiagnosticSettingsOperations.put(options.resourceId, putParameters, __cb(_, __frame, 67, 47, function __$insightsDiagnosticCommand__executeCmd__3() {

          insightsUtils.formatOutput(cli, log, options, putParameters.properties); _(); }, true)); }, true)); }); };};
