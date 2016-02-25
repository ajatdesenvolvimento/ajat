/*** Generated by streamline 0.10.17 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb,__catch=__rt.__catch,__tryCatch=__rt.__tryCatch; var __ = require("underscore");















var util = require("util");
var utils = require("../../../util/utils");
var $ = utils.getLocaleString;
var constants = require("./constants");
var EndPointUtil = require("../../../util/endpointUtil");

function TrafficManager(cli, trafficManagerManagementClient) {
  this.trafficManagerManagementClient = trafficManagerManagementClient;
  this.endpointUtil = new EndPointUtil();
  this.output = cli.output;
  this.interaction = cli.interaction;};


__.extend(TrafficManager.prototype, {



  createProfile: function createProfile__1(profileName, options, _) { var self, tmProfile, profileProgress, tmDefConfig, definitionProgress, tmDefinition, __this = this; var __frame = { name: "createProfile__1", line: 34 }; return __func(_, this, arguments, createProfile__1, 2, __frame, function __$createProfile__1() { self = __this;

      return self.getProfile(profileName, __cb(_, __frame, 2, 25, function ___(__0, __1) { tmProfile = __1; return (function __$createProfile__1(__then) {
          if (!tmProfile) {
            profileProgress = self.interaction.progress(util.format($("Creating Traffic Manager profile \"%s\""), profileName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$createProfile__1() {

                  return self.trafficManagerManagementClient.profiles.create(profileName, options.domainName, __cb(_, __frame, 6, 53, function __$createProfile__1() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$createProfile__1() {

                    profileProgress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$createProfile__1() {

                return self.getProfile(profileName, __cb(_, __frame, 10, 23, function ___(__0, __2) { tmProfile = __2; __then(); }, true)); }); }); } else { __then(); } ; })(function __$createProfile__1() {


          if ((tmProfile.profile.definitions.length > 0)) {
            return _(new Error(util.format($("Traffic Manager profile \"%s\" already exists"), profileName))); } ;


          tmDefConfig = self._prepareDefinition(options);
          definitionProgress = self.interaction.progress(util.format($("Creating Traffic Manager definition for profile \"%s\""), profileName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$createProfile__1() {

                return self.trafficManagerManagementClient.definitions.create(profileName, tmDefConfig, __cb(_, __frame, 20, 54, function __$createProfile__1() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$createProfile__1() {

                  definitionProgress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$createProfile__1() {


              return self.getDefinition(profileName, __cb(_, __frame, 25, 28, function ___(__0, __3) { tmDefinition = __3;
                self._showProfile(profileName, tmProfile, tmDefinition); _(); }, true)); }); }); }); }, true)); }); },


  setProfile: function setProfile__2(profileName, options, _) { var self, tmProfile, tmDefinition, definitionProgress, __this = this; var __frame = { name: "setProfile__2", line: 63 }; return __func(_, this, arguments, setProfile__2, 2, __frame, function __$setProfile__2() { self = __this;

      return self.getProfile(profileName, __cb(_, __frame, 2, 25, function ___(__0, __1) { tmProfile = __1;
        if (!tmProfile) {
          return _(new Error(util.format($("Traffic Manager \"%s\" not found"), profileName))); } ;


        return self.getDefinition(profileName, __cb(_, __frame, 7, 28, function ___(__0, __2) { tmDefinition = __2;
          if (!tmDefinition) {
            tmDefinition = self._prepareDefinition(options); }
           else {
            tmDefinition = tmDefinition.definition;
            self._validateDefinitionOptions(options, false);
            if (options.ttl) { tmDefinition.dnsOptions.timeToLiveInSeconds = options.ttl; } ;
            if (options.monitorRelativePath) { tmDefinition.monitors[0].httpOptions.relativePath = options.monitorRelativePath; } ;
            if (options.monitorPort) { tmDefinition.monitors[0].port = options.monitorPort; } ;
            if (options.monitorProtocol) { tmDefinition.monitors[0].protocol = options.monitorProtocol; } ;
            if (options.loadBalancingMethod) { tmDefinition.policy.loadBalancingMethod = options.loadBalancingMethod; } ; } ;


          definitionProgress = self.interaction.progress(util.format($("Updating Traffic Manager \"%s\""), profileName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$setProfile__2() {

                return self.trafficManagerManagementClient.definitions.create(profileName, tmDefinition, __cb(_, __frame, 22, 54, function __$setProfile__2() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$setProfile__2() {

                  definitionProgress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$setProfile__2() {


              return self.getDefinition(profileName, __cb(_, __frame, 27, 24, function ___(__0, __3) { tmDefinition = __3;
                self._showProfile(profileName, tmProfile, tmDefinition); _(); }, true)); }); }); }, true)); }, true)); }); },


  showProfile: function showProfile__3(profileName, options, _) { var self, tmProfile, tmDefinition, __this = this; var __frame = { name: "showProfile__3", line: 94 }; return __func(_, this, arguments, showProfile__3, 2, __frame, function __$showProfile__3() { self = __this;

      return self.getProfile(profileName, __cb(_, __frame, 2, 25, function ___(__0, __1) { tmProfile = __1;
        return self.getDefinition(profileName, __cb(_, __frame, 3, 28, function ___(__0, __2) { tmDefinition = __2;
          self._showProfile(profileName, tmProfile, tmDefinition); _(); }, true)); }, true)); }); },


  listProfiles: function listProfiles__4(options, _) { var self, progress, tmProfiles, __this = this; var __frame = { name: "listProfiles__4", line: 101 }; return __func(_, this, arguments, listProfiles__4, 1, __frame, function __$listProfiles__4() { self = __this;

      progress = self.interaction.progress($("Getting Traffic Manager profiles"));

      tmProfiles = null; return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$listProfiles__4() {

            return self.trafficManagerManagementClient.profiles.list(__cb(_, __frame, 6, 64, function ___(__0, __1) { tmProfiles = __1; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$listProfiles__4() {

              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$listProfiles__4() {


          self.interaction.formatOutput(tmProfiles.profiles, function(data) {
            if ((data.length === 0)) {
              self.output.warn($("No Traffic Manager profiles found")); }
             else {
              self.output.table(data, function(row, item) {
                row.cell($("Name"), item.name);
                row.cell($("Domain name"), item.domainName);
                row.cell($("Status"), item.status); }); } ; }); _(); }); }); }); },





  deleteProfile: function deleteProfile__5(profileName, options, _) { var self, tmProfile, progress, __this = this; var __frame = { name: "deleteProfile__5", line: 125 }; return __func(_, this, arguments, deleteProfile__5, 2, __frame, function __$deleteProfile__5() { self = __this;

      return self.getProfile(profileName, __cb(_, __frame, 2, 25, function ___(__0, __2) { tmProfile = __2;
        if (!tmProfile) {
          return _(new Error(util.format("Traffic manager profile with name \"%s\" not found", profileName))); } ; return (function __$deleteProfile__5(_) {


          var __1 = !options.quiet; if (!__1) { return _(null, __1); } ; return self.interaction.confirm(util.format($("Delete Traffic Manager profile \"%s\"? [y/n] "), profileName), __cb(_, __frame, 7, 44, function ___(__0, __3) { var __2 = !__3; return _(null, __2); }, true)); })(__cb(_, __frame, -124, 17, function ___(__0, __3) { return (function __$deleteProfile__5(__then) { if (__3) { return _(null); } else { __then(); } ; })(function __$deleteProfile__5() {



            progress = self.interaction.progress(util.format($("Deleting Traffic Manager profile \"%s\""), profileName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$deleteProfile__5() {

                  return self.trafficManagerManagementClient.profiles.deleteMethod(profileName, __cb(_, __frame, 13, 51, function __$deleteProfile__5() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$deleteProfile__5() {

                    progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$deleteProfile__5() { _(); }); }); }); }, true)); }, true)); }); },



  enableProfile: function enableProfile__6(profileName, options, _) { var self, tmProfile, definitionVersionNumber, __this = this; var __frame = { name: "enableProfile__6", line: 144 }; return __func(_, this, arguments, enableProfile__6, 2, __frame, function __$enableProfile__6() { self = __this;

      return self.getProfile(profileName, __cb(_, __frame, 2, 25, function ___(__0, __1) { tmProfile = __1; return (function __$enableProfile__6(__then) {
          if (!tmProfile) {
            if (self.output.format().json) {
              self.output.json({ }); }
             else {
              return _(new Error(util.format("Traffic manager profile with name \"%s\" not found", profileName))); } ; __then(); } else {


            definitionVersionNumber = tmProfile.profile.definitions[0].version;
            return self.updateProfile(profileName, "Enabled", definitionVersionNumber, __cb(_, __frame, 11, 11, function __$enableProfile__6() {
              return self.showProfile(profileName, options, __cb(_, __frame, 12, 11, __then, true)); }, true)); } ; })(_); }, true)); }); },



  disableProfile: function disableProfile__7(profileName, options, _) { var self, tmProfile, definitionVersionNumber, __this = this; var __frame = { name: "disableProfile__7", line: 160 }; return __func(_, this, arguments, disableProfile__7, 2, __frame, function __$disableProfile__7() { self = __this;

      return self.getProfile(profileName, __cb(_, __frame, 2, 25, function ___(__0, __1) { tmProfile = __1; return (function __$disableProfile__7(__then) {
          if (!tmProfile) {
            if (self.output.format().json) {
              self.output.json({ }); }
             else {
              return _(new Error(util.format("Traffic manager profile with name \"%s\" not found", profileName))); } ; __then(); } else {


            definitionVersionNumber = tmProfile.profile.definitions[0].version;
            return self.updateProfile(profileName, "Disabled", definitionVersionNumber, __cb(_, __frame, 11, 11, function __$disableProfile__7() {
              return self.showProfile(profileName, options, __cb(_, __frame, 12, 11, __then, true)); }, true)); } ; })(_); }, true)); }); },



  getDefinition: function getDefinition__8(profileName, _) { var self, progress, tmDefinition, __this = this; var __frame = { name: "getDefinition__8", line: 176 }; return __func(_, this, arguments, getDefinition__8, 1, __frame, function __$getDefinition__8() { self = __this;

      progress = self.interaction.progress(util.format($("Looking up the Traffic Manager definition \"%s\""), profileName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$getDefinition__8() { return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$getDefinition__8() {

                  return self.trafficManagerManagementClient.definitions.get(profileName, __cb(_, __frame, 4, 73, function ___(__0, __1) { tmDefinition = __1;
                    return _(null, tmDefinition); }, true)); }); })(function ___(e, __result) { __catch(function __$getDefinition__8() { if (e) {

                    if ((e.code === "ResourceNotFound")) {
                      return _(null, null); } ;

                    return _(e); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$getDefinition__8() { _(null, null, true); }); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$getDefinition__8() {

              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$getDefinition__8() { _(); }); }); }); },



  getProfile: function getProfile__9(profileName, _) { var self, progress, tmProfile, __this = this; var __frame = { name: "getProfile__9", line: 192 }; return __func(_, this, arguments, getProfile__9, 1, __frame, function __$getProfile__9() { self = __this;

      progress = self.interaction.progress(util.format($("Looking up the Traffic Manager profile \"%s\""), profileName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$getProfile__9() { return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$getProfile__9() {

                  return self.trafficManagerManagementClient.profiles.get(profileName, __cb(_, __frame, 4, 67, function ___(__0, __1) { tmProfile = __1;
                    return _(null, tmProfile); }, true)); }); })(function ___(e, __result) { __catch(function __$getProfile__9() { if (e) {

                    if ((e.code === "ResourceNotFound")) {
                      return _(null, null); } ;

                    return _(e); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$getProfile__9() { _(null, null, true); }); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$getProfile__9() {

              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$getProfile__9() { _(); }); }); }); },



  updateProfile: function updateProfile__10(profileName, profileStatus, definitionVersionNumber, _) { var self, progress, __this = this; var __frame = { name: "updateProfile__10", line: 208 }; return __func(_, this, arguments, updateProfile__10, 3, __frame, function __$updateProfile__10() { self = __this;

      progress = self.interaction.progress(util.format($("Updating Traffic Manager profile \"%s\""), profileName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$updateProfile__10() {

            return self.trafficManagerManagementClient.profiles.update(profileName, profileStatus, definitionVersionNumber, __cb(_, __frame, 4, 51, function __$updateProfile__10() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$updateProfile__10() {

              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$updateProfile__10() { _(); }); }); }); },






  createEndpoint: function createEndpoint__11(profileName, domainName, endpointType, options, _) { var self, tmProfile, tmDefinition, endpoint, progress, __this = this; var __frame = { name: "createEndpoint__11", line: 221 }; return __func(_, this, arguments, createEndpoint__11, 4, __frame, function __$createEndpoint__11() { self = __this;

      return self.getProfile(profileName, __cb(_, __frame, 2, 25, function ___(__0, __1) { tmProfile = __1;
        if (!tmProfile) {
          return _(new Error(util.format($("Traffic manager profile with name \"%s\" not found"), profileName))); } ;


        return self.getDefinition(profileName, __cb(_, __frame, 7, 28, function ___(__0, __2) { tmDefinition = __2.definition;
          if (utils.findFirstCaseIgnore(tmDefinition.policy.endpoints, { domainName: domainName })) {
            return _(new Error(util.format($("An endpoint with name \"%s\" already exists for Traffic Manager profile \"%s\""), domainName, profileName))); } ;


          endpoint = {
            domainName: domainName,
            status: constants.trafficManager.endpoints.statuses[0],
            type: utils.verifyParamExistsInCollection(constants.trafficManager.endpoints.types, endpointType, "endpoint type") };



          if (options.endpointLocation) {
            endpoint.location = options.endpointLocation; } ;

          if (options.endpointStatus) {
            endpoint.status = utils.verifyParamExistsInCollection(constants.trafficManager.endpoints.statuses, options.endpointStatus, "--endpoint-status"); } ;


          if (options.weight) {
            endpoint.weight = options.weight; } ;

          if (options.minChildEndpoint) {
            if ((endpoint.type === constants.trafficManager.endpoints.types[0])) {
              endpoint.minChildEndpoint = options.minChildEndpoint; }
             else {
              self.output.warn(util.format($("--min-child-endpoint will be ignored for %s endpoint type"), options.type)); } ; } ;



          tmDefinition.policy.endpoints.push(endpoint);

          progress = self.interaction.progress(util.format($("Creating endpoint %s for Traffic Manager profile \"%s\""), domainName, profileName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$createEndpoint__11() {

                return self.trafficManagerManagementClient.definitions.create(profileName, tmDefinition, __cb(_, __frame, 41, 54, function __$createEndpoint__11() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$createEndpoint__11() {

                  progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$createEndpoint__11() {

              return self.showProfile(profileName, options, __cb(_, __frame, 45, 9, function __$createEndpoint__11() { _(); }, true)); }); }); }, true)); }, true)); }); },


  setEndpoint: function setEndpoint__12(profileName, domainName, options, _) { var self, tmProfile, tmDefinition, endpoint, progress, __this = this; var __frame = { name: "setEndpoint__12", line: 269 }; return __func(_, this, arguments, setEndpoint__12, 3, __frame, function __$setEndpoint__12() { self = __this;

      return self.getProfile(profileName, __cb(_, __frame, 2, 25, function ___(__0, __1) { tmProfile = __1;
        if (!tmProfile) {
          return _(new Error(util.format($("Traffic manager profile with name \"%s\" not found"), profileName))); } ;


        return self.getDefinition(profileName, __cb(_, __frame, 7, 28, function ___(__0, __2) { tmDefinition = __2.definition;
          endpoint = utils.findFirstCaseIgnore(tmDefinition.policy.endpoints, { domainName: domainName });
          if (!endpoint) {
            return _(new Error(util.format($("An endpoint with name \"%s\" not found for Traffic Manager profile \"%s\""), domainName, profileName))); } ;


          if (options.endpointLocation) {
            endpoint.location = options.endpointLocation; } ;

          if (options.endpointStatus) {
            endpoint.status = utils.verifyParamExistsInCollection(constants.trafficManager.endpoints.statuses, options.endpointStatus, "--endpoint-status"); } ;


          if (options.weight) {
            endpoint.weight = options.weight; } ;

          if (options.type) {
            endpoint.type = utils.verifyParamExistsInCollection(constants.trafficManager.endpoints.types, options.type, "endpoint type"); } ;


          if (options.minChildEndpoint) {
            if ((endpoint.type === constants.trafficManager.endpoints.types[0])) {
              endpoint.minChildEndpoint = options.minChildEndpoint; }
             else {
              self.output.warn(util.format($("--min-child-endpoint will be ignored for %s endpoint type"), options.type)); } ; } ;



          progress = self.interaction.progress(util.format($("Updating endpoint \"%s\" for Traffic Manager profile \"%s\""), domainName, profileName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$setEndpoint__12() {

                return self.trafficManagerManagementClient.definitions.create(profileName, tmDefinition, __cb(_, __frame, 37, 54, function __$setEndpoint__12() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$setEndpoint__12() {

                  progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$setEndpoint__12() {

              return self.showProfile(profileName, options, __cb(_, __frame, 41, 9, function __$setEndpoint__12() { _(); }, true)); }); }); }, true)); }, true)); }); },


  deleteEndpoint: function deleteEndpoint__13(profileName, domainName, options, _) { var self, tmProfile, tmDefinition, index, progress, __this = this; var __frame = { name: "deleteEndpoint__13", line: 313 }; return __func(_, this, arguments, deleteEndpoint__13, 3, __frame, function __$deleteEndpoint__13() { self = __this;

      return self.getProfile(profileName, __cb(_, __frame, 2, 25, function ___(__0, __2) { tmProfile = __2;
        if (!tmProfile) {
          return _(new Error(util.format($("Traffic manager profile with name \"%s\" not found"), profileName))); } ;


        return self.getDefinition(profileName, __cb(_, __frame, 7, 28, function ___(__0, __3) { tmDefinition = __3.definition;
          index = utils.indexOfCaseIgnore(tmDefinition.policy.endpoints, { domainName: domainName }); return (function __$deleteEndpoint__13(__then) {
            if ((index !== -1)) { return (function __$deleteEndpoint__13(_) {
                var __1 = !options.quiet; if (!__1) { return _(null, __1); } ; return self.interaction.confirm(util.format($("Delete endpoint %s for Traffic Manager profile \"%s\"? [y/n] "), domainName, profileName), __cb(_, __frame, 10, 46, function ___(__0, __3) { var __2 = !__3; return _(null, __2); }, true)); })(__cb(_, __frame, -312, 17, function ___(__0, __4) { return (function __$deleteEndpoint__13(__then) { if (__4) { return _(null); } else { __then(); } ; })(function __$deleteEndpoint__13() {


                  tmDefinition.policy.endpoints.splice(index, 1); __then(); }); }, true)); } else {

              return _(new Error(util.format($("An endpoint with name \"%s\" not found for Traffic Manager profile \"%s\""), domainName, profileName))); } ; })(function __$deleteEndpoint__13() {


            progress = self.interaction.progress(util.format($("Deleting endpoint %s for Traffic Manager profile \"%s\""), domainName, profileName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$deleteEndpoint__13() {

                  return self.trafficManagerManagementClient.definitions.create(profileName, tmDefinition, __cb(_, __frame, 20, 54, function __$deleteEndpoint__13() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$deleteEndpoint__13() {

                    progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$deleteEndpoint__13() { _(); }); }); }); }, true)); }, true)); }); },






  _showProfile: function(profileName, tmProfile, tmDefinition) {
    var self = this;

    var tm = {
      profile: tmProfile.profile,
      definition: tmDefinition.definition };


    if (tmProfile) {
      self.interaction.formatOutput(tm, function(tm) {
        self.output.nameValue($("Name"), tm.profile.name);
        self.output.nameValue($("Domain name"), tm.profile.domainName);
        self.output.nameValue($("Status"), tm.profile.status);
        if (tm.definition) {
          self.output.nameValue($("TTL"), tm.definition.dnsOptions.timeToLiveInSeconds);
          self.output.nameValue($("Load balancing method"), tm.definition.policy.loadBalancingMethod);
          self.output.nameValue($("Monitor status"), tm.definition.policy.monitorStatus);

          var monitors = tm.definition.monitors;
          if ((monitors.length !== 0)) {
            self.output.header($("Monitors"));
            self.output.table(monitors, function(row, monitor) {
              row.cell($("Verb"), monitor.httpOptions.verb);
              row.cell($("Protocol"), monitor.protocol);
              row.cell($("Port"), monitor.port);
              row.cell($("Relative path"), monitor.httpOptions.relativePath);
              row.cell($("Expected status code"), monitor.httpOptions.expectedStatusCode);
              row.cell($("Interval, seconds"), monitor.intervalInSeconds);
              row.cell($("Timeout, seconds"), monitor.timeoutInSeconds);
              row.cell($("Tolerated number of failures"), monitor.toleratedNumberOfFailures); }); } ;



          var endpoints = tm.definition.policy.endpoints;
          if ((endpoints.length !== 0)) {
            self.output.header($("Endpoints"));
            self.output.table(endpoints, function(row, ep) {
              row.cell($("Domain name"), ep.domainName);
              row.cell($("Location"), ep.location);
              row.cell($("Status"), ep.status);
              row.cell($("Type"), ep.type);
              row.cell($("Monitor status"), ep.monitorStatus);
              row.cell($("Weight"), ep.weight); }); } ; } ; }); }




     else {
      if (self.output.format().json) {
        self.output.json({ }); }
       else {
        self.output.warn(util.format($("A Traffic Manager profile with name \"%s\" not found"), profileName)); } ; } ; },




  _validateDefinitionOptions: function(options, useDefaults) {
    var self = this;
    if ((!options.monitorRelativePath && useDefaults)) {
      throw new Error($("--monitor-relative-path parameter must be set")); } ;


    if (options.ttl) {
      var validatedTtl = self.endpointUtil.validateTtl(options.ttl, "--ttl");
      if (validatedTtl.error) {
        throw new Error(validatedTtl.error); } ; }

     else if (useDefaults) {
      self.output.warn(("--ttl parameter is not set. Using default TTL: " + constants.trafficManager.ttl));
      options.ttl = constants.trafficManager.ttl; }  ;


    if (options.monitorPort) {
      var validatedPort = self.endpointUtil.validatePort(options.monitorPort, "--monitor-port");
      if (validatedPort.error) {
        throw new Error(validatedPort.error); } ; }

     else if (useDefaults) {
      self.output.warn(("--monitor-port parameter is not set. Using default port: " + constants.trafficManager.port));
      options.monitorPort = constants.trafficManager.ttl; }  ;


    if (options.monitorProtocol) {
      self._validateProtocol(options.monitorProtocol); }
     else if (useDefaults) {
      self.output.warn(("--monitor-protocol parameter is not set. Using default protocol: " + constants.trafficManager.protocol));
      options.monitorProtocol = constants.trafficManager.protocol; }  ;


    if (options.loadBalancingMethod) {
      self._validateLoadBalancingMethod(options.loadBalancingMethod); }
     else if (useDefaults) {
      self.output.warn(("--load-balancing-method parameter is not set. Using default load balancing method: " + constants.trafficManager.loadBalancingMethod));
      options.loadBalancingMethod = constants.trafficManager.loadBalancingMethod; }  ; },



  _prepareDefinition: function(options) {
    var self = this;
    self._validateDefinitionOptions(options, true);

    return {
      dnsOptions: {
        timeToLiveInSeconds: options.ttl },

      monitors: [{

        httpOptions: {
          relativePath: options.monitorRelativePath,
          verb: constants.trafficManager.verb,
          expectedStatusCode: constants.trafficManager.statusCode },

        intervalInSeconds: constants.trafficManager.interval,
        port: options.monitorPort,
        protocol: options.monitorProtocol,
        timeoutInSeconds: constants.trafficManager.timeout,
        toleratedNumberOfFailures: constants.trafficManager.numberOfFailures },],


      policy: {
        endpoints: [],
        loadBalancingMethod: options.loadBalancingMethod } }; },




  _validateProtocol: function(protocol) {
    protocol = protocol.toLowerCase();
    if (!__.contains(constants.trafficManager.protocols, protocol)) {
      throw new Error(util.format($("--monitor-protocol is invalid. Valid values are [%s]."), constants.trafficManager.protocols)); } ; },



  _validateLoadBalancingMethod: function(loadBalancingMethod) {
    loadBalancingMethod = loadBalancingMethod.toLowerCase();
    if (!__.contains(constants.trafficManager.loadBalancingMethods, loadBalancingMethod)) {
      throw new Error(util.format($("--load-balancing-method is invalid. Valid values are [%s]."), constants.trafficManager.loadBalancingMethods)); } ; }});




module.exports = TrafficManager;