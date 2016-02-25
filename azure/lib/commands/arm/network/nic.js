/*** Generated by streamline 0.10.17 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb,__catch=__rt.__catch,__tryCatch=__rt.__tryCatch; var __ = require("underscore");















var util = require("util");
var utils = require("../../../util/utils");
var $ = utils.getLocaleString;
var tagUtils = require("../tag/tagUtils");
var resourceUtils = require("../resource/resourceUtils");
var Subnet = require("./subnet");
var LoadBalancer = require("./loadBalancer");
var Nsg = require("./nsg");
var PublicIp = require("./publicIp");
var VNetUtil = require("../../../util/vnet.util");

function Nic(cli, networkManagementClient) {
  this.networkManagementClient = networkManagementClient;
  this.subnetCrud = new Subnet(cli, networkManagementClient);
  this.loadBalancerCrud = new LoadBalancer(cli, networkManagementClient);
  this.nsgCrud = new Nsg(cli, networkManagementClient);
  this.publicIpCrud = new PublicIp(cli, networkManagementClient);
  this.vnetUtil = new VNetUtil();
  this.output = cli.output;
  this.interaction = cli.interaction;};


__.extend(Nic.prototype, {



  create: function create__1(resourceGroupName, nicName, options, _) { var self, parameters, nic, progress, __this = this; var __frame = { name: "create__1", line: 43 }; return __func(_, this, arguments, create__1, 3, __frame, function __$create__1() { self = __this;


      if (((!options.subnetId && !options.subnetName) && !options.subnetVnetName)) {
        return _(new Error($("--subnet-id or --subnet-name, --subnet-vnet-name parameters must be provided"))); } ;


      parameters = {
        location: options.location,
        ipConfigurations: [{
          name: "Nic-IP-config" },] };



      return self._parseNic(resourceGroupName, parameters, options, __cb(_, __frame, 14, 22, function ___(__0, __1) { parameters = __1;

        return self.get(resourceGroupName, nicName, __cb(_, __frame, 16, 19, function ___(__0, __2) { nic = __2;
          if (nic) {
            return _(new Error(util.format($("A network interface with name \"%s\" already exists in the resource group \"%s\""), nicName, resourceGroupName))); } ;


          progress = self.interaction.progress(util.format($("Creating network interface \"%s\""), nicName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$create__1() {

                return self.networkManagementClient.networkInterfaces.createOrUpdate(resourceGroupName, nicName, parameters, __cb(_, __frame, 23, 59, function ___(__0, __3) { nic = __3; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$create__1() {

                  progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$create__1() {


              self._showNic(nic); _(); }); }); }, true)); }, true)); }); },


  set: function set__2(resourceGroupName, nicName, options, _) { var self, nic, progress, __this = this; var __frame = { name: "set__2", line: 74 }; return __func(_, this, arguments, set__2, 3, __frame, function __$set__2() { self = __this;


      return self.get(resourceGroupName, nicName, __cb(_, __frame, 3, 19, function ___(__0, __1) { nic = __1;
        if (!nic) {
          return _(new Error(util.format($("A network interface with name \"%s\" not found in the resource group \"%s\""), nicName, resourceGroupName))); } ;


        return self._parseNic(resourceGroupName, nic, options, __cb(_, __frame, 8, 15, function ___(__0, __2) { nic = __2;

          progress = self.interaction.progress(util.format($("Updating network interface \"%s\""), nicName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$set__2() {

                return self.networkManagementClient.networkInterfaces.createOrUpdate(resourceGroupName, nicName, nic, __cb(_, __frame, 12, 59, function ___(__0, __3) { nic = __3; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$set__2() {

                  progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$set__2() {


              self._showNic(nic); _(); }); }); }, true)); }, true)); }); },


  list: function list__3(options, _) { var self, nics, progress, __this = this; var __frame = { name: "list__3", line: 94 }; return __func(_, this, arguments, list__3, 1, __frame, function __$list__3() { self = __this;


      nics = null;
      progress = self.interaction.progress($("Getting the network interfaces")); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$list__3() { return (function __$list__3(__then) {


              if (options.resourceGroup) { return (function __$list__3(__then) {
                  if (options.virtualMachineScaleSetName) { return (function __$list__3(__then) {
                      if (options.virtualMachineIndex) {
                        return self.networkManagementClient.networkInterfaces.listVirtualMachineScaleSetVMNetworkInterfaces(options.resourceGroup, options.virtualMachineScaleSetName, options.virtualMachineIndex, __cb(_, __frame, 10, 66, function ___(__0, __1) { nics = __1; __then(); }, true)); } else {

                        return self.networkManagementClient.networkInterfaces.listVirtualMachineScaleSetNetworkInterfaces(options.resourceGroup, options.virtualMachineScaleSetName, __cb(_, __frame, 12, 66, function ___(__0, __2) { nics = __2; __then(); }, true)); } ; })(__then); } else {


                    return self.networkManagementClient.networkInterfaces.list(options.resourceGroup, __cb(_, __frame, 15, 64, function ___(__0, __3) { nics = __3; __then(); }, true)); } ; })(__then); } else {


                return self.networkManagementClient.networkInterfaces.listAll(__cb(_, __frame, 18, 62, function ___(__0, __4) { nics = __4; __then(); }, true)); } ; })(function __$list__3() { _(null, null, true); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$list__3() {


              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$list__3() {


          self.interaction.formatOutput(nics, function(nics) {
            if ((nics.length === 0)) {
              self.output.warn($("No network interfaces found")); }
             else {
              self.output.table(nics, function(row, nic) {
                row.cell($("Name"), nic.name);
                row.cell($("Location"), (nic.location || ""));
                var resInfo = resourceUtils.getResourceInformation(nic.id);
                row.cell($("Resource group"), resInfo.resourceGroup);
                row.cell($("Provisioning state"), nic.provisioningState);
                row.cell($("MAC Address"), (nic.macAddress || ""));
                row.cell($("IP forwarding"), nic.enableIPForwarding);
                row.cell($("Internal DNS name"), (nic.dnsSettings.internalDnsNameLabel || ""));
                row.cell($("Internal FQDN"), (nic.dnsSettings.internalFqdn || "")); }); } ; }); _(); }); }); }); },





  show: function show__4(resourceGroupName, nicName, options, _) { var self, nic, __this = this; var __frame = { name: "show__4", line: 137 }; return __func(_, this, arguments, show__4, 3, __frame, function __$show__4() { self = __this;

      nic = null; return (function __$show__4(__then) {

        if ((options.virtualMachineScaleSetName || options.virtualMachineIndex)) {
          if (!((options.virtualMachineScaleSetName && options.virtualMachineIndex))) {
            return _(new Error(util.format($("--virtual-machine-scale-set-name and --virtual-machine-index must be specified")))); } ;

          return self.getFromScaleSet(resourceGroupName, options.virtualMachineScaleSetName, options.virtualMachineIndex, nicName, __cb(_, __frame, 8, 17, function ___(__0, __1) { nic = __1; __then(); }, true)); } else {

          return self.get(resourceGroupName, nicName, __cb(_, __frame, 10, 17, function ___(__0, __2) { nic = __2; __then(); }, true)); } ; })(function __$show__4() {


        self.interaction.formatOutput(nic, function(nic) {
          if ((nic === null)) {
            self.output.warn(util.format($("A network interface with name \"%s\" not found in the resource group \"%s\""), nicName, resourceGroupName)); }
           else {
            self._showNic(nic); } ; }); _(); }); }); },




  get: function get__5(resourceGroupName, nicName, _) { var self, progress, nic, __this = this; var __frame = { name: "get__5", line: 159 }; return __func(_, this, arguments, get__5, 2, __frame, function __$get__5() { self = __this;

      progress = self.interaction.progress(util.format($("Looking up the network interface \"%s\""), nicName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$get__5() { return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$get__5() {

                  return self.networkManagementClient.networkInterfaces.get(resourceGroupName, nicName, null, __cb(_, __frame, 4, 63, function ___(__0, __1) { nic = __1;
                    return _(null, nic); }, true)); }); })(function ___(e, __result) { __catch(function __$get__5() { if (e) {

                    if ((e.statusCode === 404)) {
                      return _(null, null); } ;

                    return _(e); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$get__5() { _(null, null, true); }); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$get__5() {

              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$get__5() { _(); }); }); }); },



  getFromScaleSet: function getFromScaleSet__6(resourceGroupName, virtualMachineScaleSetName, virtualMachineIndex, nicName, _) { var self, progress, nic, __this = this; var __frame = { name: "getFromScaleSet__6", line: 175 }; return __func(_, this, arguments, getFromScaleSet__6, 4, __frame, function __$getFromScaleSet__6() { self = __this;

      progress = self.interaction.progress(util.format($("Looking up the network interface \"%s\" in scale set \"%s\""), nicName, virtualMachineScaleSetName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$getFromScaleSet__6() { return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$getFromScaleSet__6() {

                  return self.networkManagementClient.networkInterfaces.getVirtualMachineScaleSetNetworkInterface(resourceGroupName, virtualMachineScaleSetName, virtualMachineIndex, nicName, null, __cb(_, __frame, 4, 63, function ___(__0, __1) { nic = __1;
                    return _(null, nic); }, true)); }); })(function ___(e, __result) { __catch(function __$getFromScaleSet__6() { if (e) {

                    if ((e.statusCode === 404)) {
                      return _(null, null); } ;

                    return _(e); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$getFromScaleSet__6() { _(null, null, true); }); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$getFromScaleSet__6() {

              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$getFromScaleSet__6() { _(); }); }); }); },



  delete: function delete__7(resourceGroupName, nicName, options, _) { var self, nic, progress, __this = this; var __frame = { name: "delete__7", line: 191 }; return __func(_, this, arguments, delete__7, 3, __frame, function __$delete__7() { self = __this;

      return self.get(resourceGroupName, nicName, __cb(_, __frame, 2, 19, function ___(__0, __2) { nic = __2;

        if (!nic) {
          return _(new Error(util.format($("A network interface with name \"%s\" not found in the resource group \"%s\""), nicName, resourceGroupName))); } ; return (function __$delete__7(_) {


          var __1 = !options.quiet; if (!__1) { return _(null, __1); } ; return self.interaction.confirm(util.format($("Delete network interface \"%s\"? [y/n] "), nicName), __cb(_, __frame, 8, 44, function ___(__0, __3) { var __2 = !__3; return _(null, __2); }, true)); })(__cb(_, __frame, -190, 17, function ___(__0, __3) { return (function __$delete__7(__then) { if (__3) { return _(null); } else { __then(); } ; })(function __$delete__7() {



            progress = self.interaction.progress(util.format($("Deleting network interface \"%s\""), nicName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$delete__7() {

                  return self.networkManagementClient.networkInterfaces.deleteMethod(resourceGroupName, nicName, __cb(_, __frame, 14, 53, function __$delete__7() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$delete__7() {

                    progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$delete__7() { _(); }); }); }); }, true)); }, true)); }); },



  update: function update__8(resourceGroupName, nicName, nic, _) { var self, progress, __this = this; var __frame = { name: "update__8", line: 211 }; return __func(_, this, arguments, update__8, 3, __frame, function __$update__8() { self = __this;

      progress = self.interaction.progress(util.format($("Updating network interface \"%s\""), nicName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$update__8() {

            return self.networkManagementClient.networkInterfaces.createOrUpdate(resourceGroupName, nicName, nic, __cb(_, __frame, 4, 59, function ___(__0, __1) { nic = __1;
              return _(null, nic); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$update__8() {

              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$update__8() { _(); }); }); }); },



  addBackendAddressPool: function addBackendAddressPool__9(resourceGroupName, nicName, options, _) { var __this = this; var __frame = { name: "addBackendAddressPool__9", line: 222 }; return __func(_, this, arguments, addBackendAddressPool__9, 3, __frame, function __$addBackendAddressPool__9() {
      return __this._updateBackendAddressPool(resourceGroupName, nicName, options, true, __cb(_, __frame, 1, 9, function __$addBackendAddressPool__9() { _(); }, true)); }); },


  removeBackendAddressPool: function removeBackendAddressPool__10(resourceGroupName, nicName, options, _) { var __this = this; var __frame = { name: "removeBackendAddressPool__10", line: 226 }; return __func(_, this, arguments, removeBackendAddressPool__10, 3, __frame, function __$removeBackendAddressPool__10() {
      return __this._updateBackendAddressPool(resourceGroupName, nicName, options, false, __cb(_, __frame, 1, 9, function __$removeBackendAddressPool__10() { _(); }, true)); }); },


  addInboundNatRule: function addInboundNatRule__11(resourceGroupName, nicName, options, _) { var __this = this; var __frame = { name: "addInboundNatRule__11", line: 230 }; return __func(_, this, arguments, addInboundNatRule__11, 3, __frame, function __$addInboundNatRule__11() {
      return __this._updateInboundNatRule(resourceGroupName, nicName, options, true, __cb(_, __frame, 1, 9, function __$addInboundNatRule__11() { _(); }, true)); }); },


  removeInboundNatRule: function removeInboundNatRule__12(resourceGroupName, nicName, options, _) { var __this = this; var __frame = { name: "removeInboundNatRule__12", line: 234 }; return __func(_, this, arguments, removeInboundNatRule__12, 3, __frame, function __$removeInboundNatRule__12() {
      return __this._updateInboundNatRule(resourceGroupName, nicName, options, false, __cb(_, __frame, 1, 9, function __$removeInboundNatRule__12() { _(); }, true)); }); },





  _parseNic: function _parseNic__13(resourceGroupName, nic, options, _) { var self, ipValidationResult, subnet, publicip, nsg, poolIds, natIds, __this = this; var __frame = { name: "_parseNic__13", line: 241 }; return __func(_, this, arguments, _parseNic__13, 3, __frame, function __$_parseNic__13() { self = __this;


      if (options.privateIpAddress) {
        ipValidationResult = self.vnetUtil.parseIPv4(options.privateIpAddress);
        if (ipValidationResult.error) {
          return _(new Error($("--private-ip-address parameter must be valid IPv4"))); } ;

        nic.ipConfigurations[0].privateIPAllocationMethod = "Static";
        nic.ipConfigurations[0].privateIPAddress = options.privateIpAddress; } ;


      if (options.internalDnsNameLabel) {
        if (utils.argHasValue(options.internalDnsNameLabel)) {
          if (!nic.dnsSettings) { nic.dnsSettings = { }; } ;
          nic.dnsSettings.internalDnsNameLabel = options.internalDnsNameLabel; }
         else {
          delete nic.dnsSettings; } ; } ;



      if (options.enableIpForwarding) {
        nic.enableIPForwarding = utils.parseBool(options.enableIpForwarding, "--enable-ip-forwarding"); } ;


      if (options.tags) {
        if (utils.argHasValue(options.tags)) {
          tagUtils.appendTags(nic, options); }
         else {
          nic.tags = { }; } ; } ; return (function __$_parseNic__13(__then) {



        if (options.subnetId) {
          if ((options.subnetName || options.subnetVnetName)) {
            self.output.warn($("--subnet-name, --subnet-vnet-name parameters will be ignored because --subnet-name, --subnet-vnet-name and --subnet-id are mutually exclusive")); } ;

          nic.ipConfigurations[0].subnet = {
            id: options.subnetId }; __then(); } else { return (function __$_parseNic__13(__then) {

            if ((options.subnetName && options.subnetVnetName)) {
              return self.subnetCrud.get(resourceGroupName, options.subnetVnetName, options.subnetName, __cb(_, __frame, 41, 35, function ___(__0, __1) { subnet = __1;
                if (!subnet) {
                  return _(new Error(util.format($("A subnet with name \"%s\" not found in the resource group \"%s\""), options.subnetName, resourceGroupName))); } ;

                nic.ipConfigurations[0].subnet = {
                  id: subnet.id }; __then(); }, true)); } else { __then(); } ; })(__then); } ; })(function __$_parseNic__13() { return (function __$_parseNic__13(__then) {



          if (options.publicIpId) {
            if (options.publicIpName) { self.output.warn($("--public-ip-name parameter will be ignored because --public-ip-id and --public-ip-name are mutually exclusive")); } ;
            if (utils.argHasValue(options.publicIpId)) {
              nic.ipConfigurations[0].publicIPAddress = {
                id: options.publicIpId }; }

             else {
              delete nic.ipConfigurations[0].publicIPAddress; } ; __then(); } else { return (function __$_parseNic__13(__then) {

              if (options.publicIpName) { return (function __$_parseNic__13(__then) {
                  if (utils.argHasValue(options.publicIpName)) {
                    return self.publicIpCrud.get(resourceGroupName, options.publicIpName, __cb(_, __frame, 61, 41, function ___(__0, __2) { publicip = __2;
                      if (!publicip) {
                        return _(new Error(util.format($("A public ip address with name \"%s\" not found in the resource group \"%s\""), options.publicIpName, resourceGroupName))); } ;

                      nic.ipConfigurations[0].publicIPAddress = {
                        id: publicip.id }; __then(); }, true)); } else {


                    delete nic.ipConfigurations[0].publicIPAddress; __then(); } ; })(__then); } else { __then(); } ; })(__then); } ; })(function __$_parseNic__13() { return (function __$_parseNic__13(__then) {



            if (options.networkSecurityGroupId) {
              if (options.networkSecurityGroupName) { self.output.warn($("--network-security-group-name parameter will be ignored because --network-security-group-id and --network-security-group-name are mutually exclusive")); } ;
              if (utils.argHasValue(options.networkSecurityGroupId)) {
                nic.networkSecurityGroup = {
                  id: options.networkSecurityGroupId }; }

               else {
                delete nic.networkSecurityGroup; } ; __then(); } else { return (function __$_parseNic__13(__then) {

                if (options.networkSecurityGroupName) { return (function __$_parseNic__13(__then) {
                    if (utils.argHasValue(options.networkSecurityGroupName)) {
                      return self.nsgCrud.get(resourceGroupName, options.networkSecurityGroupName, __cb(_, __frame, 84, 31, function ___(__0, __3) { nsg = __3;
                        if (!nsg) {
                          return _(new Error(util.format($("A network security group with name \"%s\" not found in the resource group \"%s\""), options.networkSecurityGroupName, resourceGroupName))); } ;

                        nic.networkSecurityGroup = {
                          id: nsg.id }; __then(); }, true)); } else {


                      delete nic.networkSecurityGroup; __then(); } ; })(__then); } else { __then(); } ; })(__then); } ; })(function __$_parseNic__13() {



            if (options.lbAddressPoolIds) {
              if (utils.argHasValue(options.lbAddressPoolIds)) {
                nic.ipConfigurations[0].loadBalancerBackendAddressPools = [];
                poolIds = options.lbAddressPoolIds.split(",");
                poolIds.forEach(function(poolId) {
                  poolId = poolId.replace(/'|''$/gm, "");
                  var pool = {
                    id: poolId };

                  nic.ipConfigurations[0].loadBalancerBackendAddressPools.push(pool); }); }

               else {
                nic.ipConfigurations[0].loadBalancerBackendAddressPools = []; } ; } ;



            if (options.lbInboundNatRuleIds) {
              if (utils.argHasValue(options.lbInboundNatRuleIds)) {
                nic.ipConfigurations[0].loadBalancerInboundNatRules = [];
                natIds = options.lbInboundNatRuleIds.split(",");
                natIds.forEach(function(natId) {
                  natId = natId.replace(/'|''$/gm, "");
                  var nat = {
                    id: natId };

                  nic.ipConfigurations[0].loadBalancerInboundNatRules.push(nat); }); }

               else {
                nic.ipConfigurations[0].loadBalancerInboundNatRules = []; } ; } ;



            return _(null, nic); }); }); }); }); },


  _showNic: function(nic) {
    var self = this;
    self.output.nameValue($("Id"), nic.id);
    self.output.nameValue($("Name"), nic.name);
    self.output.nameValue($("Type"), nic.type);
    self.output.nameValue($("Location"), nic.location);
    self.output.nameValue($("Provisioning state"), nic.provisioningState);
    self.output.nameValue($("Tags"), tagUtils.getTagsInfo(nic.tags));
    self.output.nameValue($("MAC address"), nic.macAddress);
    self.output.nameValue($("Internal DNS name label"), nic.dnsSettings.internalDnsNameLabel);
    self.output.nameValue($("Internal FQDN"), nic.dnsSettings.internalFqdn);
    self.output.nameValue($("Enable IP forwarding"), nic.enableIPForwarding);

    if (nic.networkSecurityGroup) {
      self.output.nameValue($("Network security group"), nic.networkSecurityGroup.id); } ;

    if (nic.virtualMachine) {
      self.output.nameValue($("Virtual machine"), nic.virtualMachine.id); } ;


    self.output.header($("IP configurations"));
    nic.ipConfigurations.forEach(function(config) {
      self.output.nameValue($("Name"), config.name, 2);
      self.output.nameValue($("Provisioning state"), config.provisioningState, 2);
      if (config.publicIPAddress) {
        self.output.nameValue($("Public IP address"), config.publicIPAddress.id, 2); } ;

      self.output.nameValue($("Private IP address"), config.privateIPAddress, 2);
      self.output.nameValue($("Private IP allocation method"), config.privateIPAllocationMethod, 2);
      self.output.nameValue($("Subnet"), config.subnet.id, 2);

      if ((config.loadBalancerBackendAddressPools && (config.loadBalancerBackendAddressPools.length > 0))) {
        self.output.header($("Load balancer backend address pools"), 2);
        config.loadBalancerBackendAddressPools.forEach(function(pool) {
          self.output.nameValue($("Id"), pool.id, 4); }); } ;



      if ((config.loadBalancerInboundNatRules && (config.loadBalancerInboundNatRules.length > 0))) {
        self.output.header($("Load balancer inbound NAT rules"), 2);
        config.loadBalancerInboundNatRules.forEach(function(rule) {
          self.output.nameValue($("Id"), rule.id, 4); }); } ;



      self.output.data($(""), ""); }); },



  _updateBackendAddressPool: function _updateBackendAddressPool__14(resourceGroupName, nicName, options, isAdding, _) { var self, nic, poolId, ipConfiguration, lb, pool, index, __this = this; var __frame = { name: "_updateBackendAddressPool__14", line: 421 }; return __func(_, this, arguments, _updateBackendAddressPool__14, 4, __frame, function __$_updateBackendAddressPool__14() { self = __this;


      return self.get(resourceGroupName, nicName, __cb(_, __frame, 3, 19, function ___(__0, __1) { nic = __1;
        if (!nic) {
          return _(new Error(util.format($("A network interface with name \"%s\" not found in the resource group \"%s\""), nicName, resourceGroupName))); } ;


        poolId = null;
        ipConfiguration = nic.ipConfigurations[0];

        if (!ipConfiguration.loadBalancerBackendAddressPools) {
          ipConfiguration.loadBalancerBackendAddressPools = []; } ;


        if (((!options.lbAddressPoolId && !options.lbName) && !options.lbAddressPoolName)) {
          return _(new Error($("You must specify --lb-address-pool-id or --lb-name, --lb-address-pool-name"))); } ; return (function __$_updateBackendAddressPool__14(__then) {


          if (options.lbAddressPoolId) {
            if ((options.lbName || options.lbAddressPoolName)) {
              self.output.warn("--lb-name parameter, --lb-address-pool-name will be ignored"); } ;

            poolId = options.lbAddressPoolId; __then(); } else { return (function __$_updateBackendAddressPool__14(__then) {
              if ((options.lbName || options.lbAddressPoolName)) {
                if (!options.lbName) {
                  return _(new Error($("You must specify --lb-name parameter if --lb-address-pool-name is specified"))); } ;

                if (!options.lbAddressPoolName) {
                  return _(new Error($("You must specify --lb-address-pool-name parameter if --lb-name is specified"))); } ;


                return self.loadBalancerCrud.get(resourceGroupName, options.lbName, __cb(_, __frame, 32, 37, function ___(__0, __2) { lb = __2;
                  if (!lb) {
                    return _(new Error(util.format($("A load balancer with name \"%s\" not found in the resource group \"%s"), options.lbName, resourceGroupName))); } ;


                  pool = utils.findFirstCaseIgnore(lb.backendAddressPools, { name: options.lbAddressPoolName });
                  if (!pool) {
                    return _(new Error(util.format($("A backend address pool with name \"%s\" not found in the load balancer \"%s\" resource group \"%s\""), options.lbAddressPoolName, options.lbName, resourceGroupName))); } ;

                  poolId = pool.id; __then(); }, true)); } else { __then(); } ; })(__then); } ; })(function __$_updateBackendAddressPool__14() {


          if (isAdding) {
            if (utils.findFirstCaseIgnore(ipConfiguration.loadBalancerBackendAddressPools, { id: poolId })) {
              return _(new Error(util.format($("Specified backend address pool already attached to NIC \"%s\" in the resource group \"%s\""), nicName, resourceGroupName))); } ;

            ipConfiguration.loadBalancerBackendAddressPools.push({ id: poolId }); }
           else {
            index = utils.indexOfCaseIgnore(ipConfiguration.loadBalancerBackendAddressPools, { id: poolId });
            if ((index === -1)) {
              return _(new Error(util.format($("Backend address pool is not attached to NIC \"%s\" in the resource group \"%s\""), nicName, resourceGroupName))); } ;

            ipConfiguration.loadBalancerBackendAddressPools.splice(index, 1); } ;


          return self.update(resourceGroupName, nicName, nic, __cb(_, __frame, 57, 15, function ___(__0, __3) { nic = __3;
            self._showNic(nic); _(); }, true)); }); }, true)); }); },


  _updateInboundNatRule: function _updateInboundNatRule__15(resourceGroupName, nicName, options, isAdding, _) { var self, nic, ruleId, ipConfiguration, lb, rule, index, __this = this; var __frame = { name: "_updateInboundNatRule__15", line: 482 }; return __func(_, this, arguments, _updateInboundNatRule__15, 4, __frame, function __$_updateInboundNatRule__15() { self = __this;


      return self.get(resourceGroupName, nicName, __cb(_, __frame, 3, 19, function ___(__0, __1) { nic = __1;
        if (!nic) {
          return _(new Error(util.format($("A network interface with name \"%s\" not found in the resource group \"%s\""), nicName, resourceGroupName))); } ;


        ruleId = null;
        ipConfiguration = nic.ipConfigurations[0];

        if (!ipConfiguration.loadBalancerInboundNatRules) {
          ipConfiguration.loadBalancerInboundNatRules = []; } ;


        if (((!options.lbInboundNatRuleId && !options.lbName) && !options.lbInboundNatRuleName)) {
          return _(new Error($("You must specify --lb-inbound-nat-rule-id or --lb-name, --lb-inbound-nat-rule-name"))); } ; return (function __$_updateInboundNatRule__15(__then) {


          if (options.lbInboundNatRuleId) {
            if ((options.lbName || options.lbInboundNatRuleName)) {
              self.output.warn("--lb-name, --lb-inbound-nat-rule-name will be ignored"); } ;

            ruleId = options.lbInboundNatRuleId; __then(); } else { return (function __$_updateInboundNatRule__15(__then) {
              if ((options.lbName || options.lbInboundNatRuleName)) {
                if (!options.lbName) {
                  return _(new Error($("You must specify --lb-name parameter if --lb-inbound-nat-rule-name is specified"))); } ;

                if (!options.lbInboundNatRuleName) {
                  return _(new Error($("You must specify --lb-inbound-nat-rule-name parameter if --lb-name is specified"))); } ;


                return self.loadBalancerCrud.get(resourceGroupName, options.lbName, __cb(_, __frame, 32, 37, function ___(__0, __2) { lb = __2;
                  if (!lb) {
                    return _(new Error(util.format($("A load balancer with name \"%s\" not found in the resource group \"%s"), options.lbName, resourceGroupName))); } ;


                  rule = utils.findFirstCaseIgnore(lb.inboundNatRules, { name: options.lbInboundNatRuleName });
                  if (!rule) {
                    return _(new Error(util.format($("An inbound NAT rule with name \"%s\" not found in the load balancer \"%s\""), options.lbInboundNatRuleName, options.lbName))); }
                   else {
                    ruleId = rule.id; } ; __then(); }, true)); } else { __then(); } ; })(__then); } ; })(function __$_updateInboundNatRule__15() {



          if (isAdding) {
            if (!utils.findFirstCaseIgnore(ipConfiguration.loadBalancerInboundNatRules, { id: ruleId })) {
              ipConfiguration.loadBalancerInboundNatRules.push({ id: ruleId }); }
             else {
              return _(new Error(util.format($("Inbound NAT rule already attached to NIC \"%s\" in the resource group \"%s\""), nicName, resourceGroupName))); } ; }

           else {
            index = utils.indexOfCaseIgnore(ipConfiguration.loadBalancerInboundNatRules, { id: ruleId });
            if ((index !== -1)) {
              ipConfiguration.loadBalancerInboundNatRules.splice(index, 1); }
             else {
              return _(new Error(util.format($("Inbound NAT rule is not attached to NIC \"%s\" in the resource group \"%s\""), nicName, resourceGroupName))); } ; } ;



          return self.update(resourceGroupName, nicName, nic, __cb(_, __frame, 60, 15, function ___(__0, __3) { nic = __3;
            self._showNic(nic); _(); }, true)); }); }, true)); }); }});



module.exports = Nic;