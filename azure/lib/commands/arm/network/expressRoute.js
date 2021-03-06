/*** Generated by streamline 0.10.17 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb,__catch=__rt.__catch,__tryCatch=__rt.__tryCatch; var __ = require("underscore");















var util = require("util");
var utils = require("../../../util/utils");
var $ = utils.getLocaleString;
var constants = require("./constants");
var resourceUtils = require("../resource/resourceUtils");
var tagUtils = require("../tag/tagUtils");

function ExpressRoute(cli, networkManagementClient) {
  this.networkManagementClient = networkManagementClient;
  this.output = cli.output;
  this.interaction = cli.interaction;};


__.extend(ExpressRoute.prototype, {




  createCircuit: function createCircuit__1(resourceGroupName, circuitName, options, _) { var self, parameters, circuit, progress, __this = this; var __frame = { name: "createCircuit__1", line: 35 }; return __func(_, this, arguments, createCircuit__1, 3, __frame, function __$createCircuit__1() { self = __this;


      parameters = {
        name: circuitName,
        location: options.location,
        sku: { },
        serviceProviderProperties: {
          serviceProviderName: options.serviceProviderName,
          peeringLocation: options.peeringLocation } };



      parameters = self._parseCircuit(parameters, options, true);

      return self.getCircuit(resourceGroupName, circuitName, __cb(_, __frame, 15, 23, function ___(__0, __1) { circuit = __1;
        if (circuit) {
          return _(new Error(util.format($("An express route circuit with name \"%s\" already exists in the resource group \"%s\""), circuitName, resourceGroupName))); } ;


        progress = self.interaction.progress(util.format($("Creating express route circuit \"%s\""), circuitName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$createCircuit__1() {

              return self.networkManagementClient.expressRouteCircuits.createOrUpdate(resourceGroupName, circuitName, parameters, __cb(_, __frame, 22, 66, function ___(__0, __2) { circuit = __2; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$createCircuit__1() {

                progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$createCircuit__1() {

            self._showCircuit(circuit); _(); }); }); }, true)); }); },


  setCircuit: function setCircuit__2(resourceGroupName, circuitName, options, _) { var self, circuit, progress, __this = this; var __frame = { name: "setCircuit__2", line: 64 }; return __func(_, this, arguments, setCircuit__2, 3, __frame, function __$setCircuit__2() { self = __this;


      return self.getCircuit(resourceGroupName, circuitName, __cb(_, __frame, 3, 23, function ___(__0, __1) { circuit = __1;
        if (!circuit) {
          return _(new Error(util.format($("A express route circuit with name \"%s\" not found in the resource group \"%s\""), circuitName, resourceGroupName))); } ;


        circuit = self._parseCircuit(circuit, options, false);

        progress = self.interaction.progress(util.format($("Updating express route circuit \"%s\""), circuitName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$setCircuit__2() {

              return self.networkManagementClient.expressRouteCircuits.createOrUpdate(resourceGroupName, circuitName, circuit, __cb(_, __frame, 12, 66, function ___(__0, __2) { circuit = __2; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$setCircuit__2() {

                progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$setCircuit__2() {

            self._showCircuit(circuit); _(); }); }); }, true)); }); },


  listCircuits: function listCircuits__3(options, _) { var self, progress, circuits, __this = this; var __frame = { name: "listCircuits__3", line: 83 }; return __func(_, this, arguments, listCircuits__3, 1, __frame, function __$listCircuits__3() { self = __this;


      progress = self.interaction.progress($("Looking up express route circuits"));
      circuits = null; return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$listCircuits__3() { return (function __$listCircuits__3(__then) {


              if (options.resourceGroup) {
                return self.networkManagementClient.expressRouteCircuits.list(options.resourceGroup, __cb(_, __frame, 8, 69, function ___(__0, __1) { circuits = __1; __then(); }, true)); } else {

                return self.networkManagementClient.expressRouteCircuits.listAll(__cb(_, __frame, 10, 69, function ___(__0, __2) { circuits = __2; __then(); }, true)); } ; })(function __$listCircuits__3() { _(null, null, true); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$listCircuits__3() {


              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$listCircuits__3() {


          self.interaction.formatOutput(circuits, function(circuits) {
            if ((circuits.length === 0)) {
              self.output.warn($("No express route circuits found")); }
             else {
              self.output.table(circuits, function(row, circuit) {
                row.cell($("Name"), circuit.name);
                row.cell($("Location"), circuit.location);
                var resInfo = resourceUtils.getResourceInformation(circuit.id);
                row.cell($("Resource group"), resInfo.resourceGroup);
                row.cell($("Provisioning state"), circuit.provisioningState);
                row.cell($("Provider name"), circuit.serviceProviderProperties.serviceProviderName);
                row.cell($("Peering location"), circuit.serviceProviderProperties.peeringLocation);
                row.cell($("Bandwidth, Mbps"), circuit.serviceProviderProperties.bandwidthInMbps);
                row.cell($("Circuit state"), circuit.circuitProvisioningState);
                row.cell($("SKU"), circuit.sku.name); }); } ; }); _(); }); }); }); },





  showCircuit: function showCircuit__4(resourceGroupName, circuitName, options, _) { var self, circuit, __this = this; var __frame = { name: "showCircuit__4", line: 119 }; return __func(_, this, arguments, showCircuit__4, 3, __frame, function __$showCircuit__4() { self = __this;

      return self.getCircuit(resourceGroupName, circuitName, __cb(_, __frame, 2, 23, function ___(__0, __1) { circuit = __1;

        self.interaction.formatOutput(circuit, function(circuit) {
          if ((circuit === null)) {
            self.output.warn(util.format($("An express route circuit with name \"%s\" not found in the resource group \"%s\""), circuitName, resourceGroupName)); }
           else {
            self._showCircuit(circuit); } ; }); _(); }, true)); }); },




  deleteCircuit: function deleteCircuit__5(resourceGroupName, circuitName, options, _) { var self, circuit, progress, __this = this; var __frame = { name: "deleteCircuit__5", line: 132 }; return __func(_, this, arguments, deleteCircuit__5, 3, __frame, function __$deleteCircuit__5() { self = __this;


      return self.getCircuit(resourceGroupName, circuitName, __cb(_, __frame, 3, 23, function ___(__0, __2) { circuit = __2;
        if (!circuit) {
          return _(new Error(util.format($("An express route circuit with name \"%s\" not found in the resource group \"%s\""), circuitName, resourceGroupName))); } ; return (function __$deleteCircuit__5(_) {


          var __1 = !options.quiet; if (!__1) { return _(null, __1); } ; return self.interaction.confirm(util.format($("Delete express route circuit \"%s\"? [y/n] "), circuitName), __cb(_, __frame, 8, 44, function ___(__0, __3) { var __2 = !__3; return _(null, __2); }, true)); })(__cb(_, __frame, -131, 17, function ___(__0, __3) { return (function __$deleteCircuit__5(__then) { if (__3) { return _(null); } else { __then(); } ; })(function __$deleteCircuit__5() {



            progress = self.interaction.progress(util.format($("Deleting express route circuit \"%s\""), circuitName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$deleteCircuit__5() {

                  return self.networkManagementClient.expressRouteCircuits.deleteMethod(resourceGroupName, circuitName, __cb(_, __frame, 14, 56, function __$deleteCircuit__5() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$deleteCircuit__5() {

                    progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$deleteCircuit__5() { _(); }); }); }); }, true)); }, true)); }); },



  getCircuit: function getCircuit__6(resourceGroupName, circuitName, _) { var self, progress, circuit, __this = this; var __frame = { name: "getCircuit__6", line: 152 }; return __func(_, this, arguments, getCircuit__6, 2, __frame, function __$getCircuit__6() { self = __this;

      progress = self.interaction.progress(util.format($("Looking up the express route circuit \"%s\""), circuitName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$getCircuit__6() { return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$getCircuit__6() {

                  return self.networkManagementClient.expressRouteCircuits.get(resourceGroupName, circuitName, null, __cb(_, __frame, 4, 70, function ___(__0, __1) { circuit = __1;
                    return _(null, circuit); }, true)); }); })(function ___(e, __result) { __catch(function __$getCircuit__6() { if (e) {

                    if ((e.statusCode === 404)) {
                      return _(null, null); } ;

                    return _(e); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$getCircuit__6() { _(null, null, true); }); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$getCircuit__6() {

              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$getCircuit__6() { _(); }); }); }); },






  listProviders: function listProviders__7(options, _) { var self, progress, providers, __this = this; var __frame = { name: "listProviders__7", line: 171 }; return __func(_, this, arguments, listProviders__7, 1, __frame, function __$listProviders__7() { self = __this;


      progress = self.interaction.progress($("Looking up express route service providers"));
      providers = null; return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$listProviders__7() {


            return self.networkManagementClient.expressRouteServiceProviders.list(__cb(_, __frame, 7, 76, function ___(__0, __1) { providers = __1; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$listProviders__7() {

              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$listProviders__7() {


          self.interaction.formatOutput(providers, function(providers) {
            if ((providers.length === 0)) {
              self.output.warn($("No express route service providers found")); }
             else {
              self.output.table(providers, function(row, provider) {
                row.cell($("Name"), provider.name);
                var bandwidths = provider.properties.bandwidthsOffered.map(function(b) {
                  return b.offerName; });

                row.cell($("Bandwidths offered"), bandwidths);
                row.cell($("Peering locations"), provider.properties.peeringLocations.join()); }); } ; }); _(); }); }); }); },








  createAuthorization: function createAuthorization__8(resourceGroupName, circuitName, authName, options, _) { var self, circuit, circuitAuth, progress, circuitAuthorization, __this = this; var __frame = { name: "createAuthorization__8", line: 202 }; return __func(_, this, arguments, createAuthorization__8, 4, __frame, function __$createAuthorization__8() { self = __this;

      return self.getCircuit(resourceGroupName, circuitName, __cb(_, __frame, 2, 23, function ___(__0, __1) { circuit = __1;
        if (!circuit) {
          return _(new Error(util.format($("An express route circuit with name \"%s\" not found in the resource group \"%s\""), circuitName, resourceGroupName))); } ;

        return self.getAuthorization(resourceGroupName, circuitName, authName, __cb(_, __frame, 6, 27, function ___(__0, __2) { circuitAuth = __2;
          if (circuitAuth) {
            return _(new Error(util.format($("An express route circuit authorization with name \"%s\" already exists in circuit \"%s\" in the resource group \"%s\""), authName, circuitName, resourceGroupName))); } ;


          circuitAuth = {
            name: authName };

          if (options.key) {
            circuitAuth.authorizationKey = options.key.toString("base64"); } ;

          progress = self.interaction.progress(util.format($("Creating express route circuit authorization \"%s\" in circuit \"%s\""), authName, circuitName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$createAuthorization__8() {


                return self.networkManagementClient.expressRouteCircuitAuthorizations.createOrUpdate(resourceGroupName, circuitName, authName, circuitAuth, __cb(_, __frame, 20, 92, function ___(__0, __3) { circuitAuthorization = __3; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$createAuthorization__8() {

                  progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$createAuthorization__8() {

              self._showCircuitAuthorization(circuitAuthorization); _(); }); }); }, true)); }, true)); }); },


  setAuthorization: function setAuthorization__9(resourceGroupName, circuitName, authName, options, _) { var self, circuit, circuitAuth, progress, circuitAuthorization, __this = this; var __frame = { name: "setAuthorization__9", line: 229 }; return __func(_, this, arguments, setAuthorization__9, 4, __frame, function __$setAuthorization__9() { self = __this;

      return self.getCircuit(resourceGroupName, circuitName, __cb(_, __frame, 2, 23, function ___(__0, __1) { circuit = __1;
        if (!circuit) {
          return _(new Error(util.format($("An express route circuit with name \"%s\" not found in the resource group \"%s\""), circuitName, resourceGroupName))); } ;

        return self.getAuthorization(resourceGroupName, circuitName, authName, __cb(_, __frame, 6, 27, function ___(__0, __2) { circuitAuth = __2;
          if (!circuitAuth) {
            return _(new Error(util.format($("An express route circuit authorization with name \"%s\" not found in circuit \"%s\" in the resource group \"%s\""), authName, circuitName, resourceGroupName))); } ;


          if (options.key) {
            circuitAuth.authorizationKey = options.key.toString("base64"); } ;

          progress = self.interaction.progress(util.format($("Setting express route circuit authorization \"%s\"in circuit \"%s\""), authName, circuitName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$setAuthorization__9() {


                return self.networkManagementClient.expressRouteCircuitAuthorizations.createOrUpdate(resourceGroupName, circuitName, authName, circuitAuth, __cb(_, __frame, 17, 92, function ___(__0, __3) { circuitAuthorization = __3; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$setAuthorization__9() {

                  progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$setAuthorization__9() {

              self._showCircuitAuthorization(circuitAuthorization); _(); }); }); }, true)); }, true)); }); },


  showAuthorization: function showAuthorization__10(resourceGroupName, circuitName, authName, options, _) { var self, circuit, circuitAuth, __this = this; var __frame = { name: "showAuthorization__10", line: 253 }; return __func(_, this, arguments, showAuthorization__10, 4, __frame, function __$showAuthorization__10() { self = __this;

      return self.getCircuit(resourceGroupName, circuitName, __cb(_, __frame, 2, 23, function ___(__0, __1) { circuit = __1;
        if (!circuit) {
          return _(new Error(util.format($("An express route circuit with name \"%s\" not found in the resource group \"%s\""), circuitName, resourceGroupName))); } ;

        return self.getAuthorization(resourceGroupName, circuitName, authName, __cb(_, __frame, 6, 27, function ___(__0, __2) { circuitAuth = __2;
          if (!circuitAuth) {
            return _(new Error(util.format($("An express route circuit authorization with name \"%s\" not found in the circuit \"%s\" in resource group \"%s\""), authName, circuitName, resourceGroupName))); } ;

          self._showCircuitAuthorization(circuitAuth); _(); }, true)); }, true)); }); },


  deleteAuthorization: function deleteAuthorization__11(resourceGroupName, circuitName, authName, options, _) { var self, circuit, circuitAuth, progress, __this = this; var __frame = { name: "deleteAuthorization__11", line: 266 }; return __func(_, this, arguments, deleteAuthorization__11, 4, __frame, function __$deleteAuthorization__11() { self = __this;

      return self.getCircuit(resourceGroupName, circuitName, __cb(_, __frame, 2, 23, function ___(__0, __2) { circuit = __2;
        if (!circuit) {
          return _(new Error(util.format($("An express route circuit with name \"%s\" not found in the resource group \"%s\""), circuitName, resourceGroupName))); } ;

        return self.getAuthorization(resourceGroupName, circuitName, authName, __cb(_, __frame, 6, 27, function ___(__0, __3) { circuitAuth = __3;
          if (!circuitAuth) {
            return _(new Error(util.format($("An express route circuit authorization with name \"%s\" not found in the circuit \"%s\" in resource group \"%s\""), authName, circuitName, resourceGroupName))); } ; return (function __$deleteAuthorization__11(_) {


            var __1 = !options.quiet; if (!__1) { return _(null, __1); } ; return self.interaction.confirm(util.format($("Delete express route circuit authorization \"%s\" in circuit \"%s\"? [y/n] "), authName, circuitName), __cb(_, __frame, 11, 44, function ___(__0, __3) { var __2 = !__3; return _(null, __2); }, true)); })(__cb(_, __frame, -265, 17, function ___(__0, __4) { return (function __$deleteAuthorization__11(__then) { if (__4) { return _(null); } else { __then(); } ; })(function __$deleteAuthorization__11() {



              progress = self.interaction.progress(util.format($("Deleting express route circuit authorization \"%s\" in circuit \"%s\""), authName, circuitName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$deleteAuthorization__11() {

                    return self.networkManagementClient.expressRouteCircuitAuthorizations.deleteMethod(resourceGroupName, circuitName, authName, null, __cb(_, __frame, 17, 69, function __$deleteAuthorization__11() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$deleteAuthorization__11() {

                      progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$deleteAuthorization__11() { _(); }); }); }); }, true)); }, true)); }, true)); }); },



  listAuthorization: function listAuthorization__12(resourceGroupName, circuitName, options, _) { var self, circuit, progress, circuits, __this = this; var __frame = { name: "listAuthorization__12", line: 289 }; return __func(_, this, arguments, listAuthorization__12, 3, __frame, function __$listAuthorization__12() { self = __this;

      return self.getCircuit(resourceGroupName, circuitName, __cb(_, __frame, 2, 23, function ___(__0, __1) { circuit = __1;
        if (!circuit) {
          return _(new Error(util.format($("An express route circuit with name \"%s\" not found in the resource group \"%s\""), circuitName, resourceGroupName))); } ;


        progress = self.interaction.progress($("Getting the express route circuit authorizations"));
        circuits = null; return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$listAuthorization__12() {

              return self.networkManagementClient.expressRouteCircuitAuthorizations.list(resourceGroupName, circuitName, __cb(_, __frame, 10, 80, function ___(__0, __2) { circuits = __2; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$listAuthorization__12() {

                progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$listAuthorization__12() {

            self.interaction.formatOutput(circuits, function(circuits) {
              if ((circuits.length === 0)) {
                self.output.warn($("No express route circuit authorizations found")); }
               else {
                self.output.table(circuits, function(row, circuitAuth) {
                  row.cell($("Name"), circuitAuth.name);
                  row.cell($("Use status"), circuitAuth.authorizationUseStatus);
                  row.cell($("Provisioning state"), circuitAuth.provisioningState); }); } ; }); _(); }); }); }, true)); }); },





  getAuthorization: function getAuthorization__13(resourceGroupName, circuitName, authName, _) { var self, progress, circuit, __this = this; var __frame = { name: "getAuthorization__13", line: 316 }; return __func(_, this, arguments, getAuthorization__13, 3, __frame, function __$getAuthorization__13() { self = __this;

      progress = self.interaction.progress(util.format($("Looking up the express route circuit authorization \"%s\" in circuit \"%s\""), authName, circuitName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$getAuthorization__13() { return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$getAuthorization__13() {

                  return self.networkManagementClient.expressRouteCircuitAuthorizations.get(resourceGroupName, circuitName, authName, null, __cb(_, __frame, 4, 83, function ___(__0, __1) { circuit = __1;
                    return _(null, circuit); }, true)); }); })(function ___(e, __result) { __catch(function __$getAuthorization__13() { if (e) {

                    if ((e.statusCode === 404)) {
                      return _(null, null); } ;

                    return _(e); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$getAuthorization__13() { _(null, null, true); }); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$getAuthorization__13() {

              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$getAuthorization__13() { _(); }); }); }); },






  _parseCircuit: function(circuit, options, useDefaults) {
    var self = this;

    if (options.bandwidthInMbps) {
      if (isNaN(options.bandwidthInMbps)) {
        throw new Error($("--bandwidth-in-mbps parameter must be an integer")); } ;

      circuit.serviceProviderProperties.bandwidthInMbps = parseInt(options.bandwidthInMbps); }
     else if (useDefaults) {
      var defBandwidth = constants.expressRoute.defBandwidthInMbps;
      self.output.warn(util.format($("Using default bandwidth: %s"), defBandwidth));
      circuit.serviceProviderProperties.bandwidthInMbps = defBandwidth; }  ;


    if (options.skuTier) {
      circuit.sku.tier = utils.verifyParamExistsInCollection(constants.expressRoute.tier, options.skuTier, "--sku-tier"); }
     else if (useDefaults) {
      var defTier = constants.expressRoute.tier[0];
      self.output.warn(util.format($("Using default sku tier: %s"), defTier));
      circuit.sku.tier = defTier; }  ;


    if (options.skuFamily) {
      circuit.sku.family = utils.verifyParamExistsInCollection(constants.expressRoute.family, options.skuFamily, "--sku-family"); }
     else if (useDefaults) {
      var defFamily = constants.expressRoute.family[0];
      self.output.warn(util.format($("Using default sku family: %s"), defFamily));
      circuit.sku.family = defFamily; }  ;


    if ((circuit.sku.tier && circuit.sku.family)) {
      circuit.sku.name = ((circuit.sku.tier + "_") + circuit.sku.family); } ;


    if (options.tags) {
      if (utils.argHasValue(options.tags)) {
        tagUtils.appendTags(circuit, options); }
       else {
        circuit.tags = { }; } ; } ;



    return circuit; },


  _showCircuit: function(circuit) {
    var self = this;

    self.output.nameValue($("Id"), circuit.id);
    self.output.nameValue($("Name"), circuit.name);
    self.output.nameValue($("Type"), circuit.type);
    self.output.nameValue($("Location"), circuit.location);
    self.output.nameValue($("Provisioning state"), circuit.provisioningState);
    self.output.nameValue($("Tags"), tagUtils.getTagsInfo(circuit.tags));
    self.output.nameValue($("Circuit provisioning state"), circuit.circuitProvisioningState);
    self.output.nameValue($("Service Key"), circuit.serviceKey);

    self.output.header($("Service provider"));
    self.output.nameValue($("Name"), circuit.serviceProviderProperties.serviceProviderName, 2);
    self.output.nameValue($("Provisioning state"), circuit.serviceProviderProvisioningState, 2);
    self.output.nameValue($("Peering location"), circuit.serviceProviderProperties.peeringLocation, 2);
    self.output.nameValue($("Bandwidth in Mbps"), circuit.serviceProviderProperties.bandwidthInMbps, 2);

    self.output.header($("SKU"));
    self.output.nameValue($("Name"), circuit.sku.name, 2);
    self.output.nameValue($("Tier"), circuit.sku.tier, 2);
    self.output.nameValue($("Family"), circuit.sku.family, 2); },


  _showCircuitAuthorization: function(circuitAuth) {
    var self = this;
    self.interaction.formatOutput(circuitAuth, function(circuitAuth) {
      if ((circuitAuth === null)) {
        self.output.warn(util.format($("An express route circuit authorization with name \"%s\" not found in the circuit \"%s\" in resource group \"%s\""), name, circuitName, resourceGroupName)); }
       else {
        var resourceInfo = resourceUtils.getResourceInformation(circuitAuth.id);
        self.output.nameValue($("Id"), circuitAuth.id);
        self.output.nameValue($("Name"), circuitAuth.name);
        self.output.nameValue($("Type"), resourceInfo.resourceType);
        self.output.nameValue($("Use status"), circuitAuth.authorizationUseStatus);
        self.output.nameValue($("Authorization Key"), circuitAuth.authorizationKey);
        self.output.nameValue($("Provisioning state"), circuitAuth.provisioningState); } ; }); }});





module.exports = ExpressRoute;
