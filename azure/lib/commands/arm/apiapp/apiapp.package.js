/*** Generated by streamline 0.10.17 (callbacks) - DO NOT EDIT ***/ "use strict"; var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb; var fs = require("fs");

















var path = require("path");
var util = require("util");
var utils = require("../../../util/utils");
var packagingLib = require("./lib/packaging");

var $ = utils.getLocaleString;


exports.init = function initApiAppCommands(cli) {
  var log = cli.output;

  var apiapp = cli.category("apiapp").description($("Commands to manage ApiApps"));


  var packageCommand = apiapp.category("package").description($("Commands to create and publish ApiApp packages"));


  packageCommand.command("create [packageSource]").description($("Create an ApiApp package that can be published")).option("-p, --package-source <packageSource>", $("Directory containing source to be packaged")).option("-o, --output <dest>", $("Directory or filename to generate")).execute(function __1(packageSource, options, _) { var dest, result; var __frame = { name: "__1", line: 40 }; return __func(_, this, arguments, __1, 2, __frame, function __$__1() {





      return cli.interaction.promptIfNotGiven($("Package source: "), packageSource, __cb(_, __frame, 2, 38, function ___(__0, __2) { packageSource = __2;
        dest = (options.output || ".");

        return packagingLib.validate(packageSource, __cb(_, __frame, 5, 32, function ___(__0, __3) { result = __3;
          if (!result.isValid) {
            log.error($("Package errors:"));
            result.errors.forEach(function(err) { log.error(err); });
            return _(new Error(util.format($("Package source %s failed validation."), packageSource))); } ; return (function __$__1(_) {


            var __1 = fs.existsSync(dest); if (!__1) { return _(null, __1); } ; return fs.stat(dest, __cb(_, __frame, 12, 36, function ___(__0, __3) { var __2 = __3.isDirectory(); return _(null, __2); }, true)); })(__cb(_, __frame, -39, 17, function ___(__0, __4) { return (function __$__1(__then) { if (__4) {
                return packagingLib.defaultPackageName(packageSource, __cb(_, __frame, 13, 44, function ___(__0, __5) { dest = path.join(dest, __5); __then(); }, true)); } else { __then(); } ; })(function __$__1() {


              return packagingLib.createPackage(packageSource, dest, __cb(_, __frame, 16, 19, function __$__1() {
                log.info(util.format($("Created package file %s"), dest)); _(); }, true)); }); }, true)); }, true)); }, true)); }); });};