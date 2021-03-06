/*** Generated by streamline 0.10.17 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb,__catch=__rt.__catch,__tryCatch=__rt.__tryCatch; var util = require("util");

















var profile = require("../../util/profile");
var utils = require("../../util/utils");

var allowAzureRuleName = "AllowAllWindowsAzureIps";
var allowAzureRuleIp = "0.0.0.0";

var azureCommon = require("azure-common");
var SqlAzureConstants = azureCommon.Constants.SqlAzureConstants;

var $ = utils.getLocaleString;

exports.init = function(cli) {
  var log = cli.output;

  var sql = cli.category("sql").description($("Commands to manage your SQL Server accounts"));


  var server = sql.category("server").description($("Commands to manage your SQL Server database servers"));


  server.command("create [administratorLogin] [administratorPassword] [location]").description($("Create a database server")).usage("[options] <administratorLogin> <administratorPassword> <location>").option("--administratorLogin <administratorLogin>", $("the new administrator login")).option("--administratorPassword <administratorPassword>", $("the new administrator password")).option("--location <location>", $("the location")).option("--defaultFirewallRule", $("Add a firewall rule allowing access from Microsoft Azure")).option("-s, --subscription <id>", $("the subscription id")).execute(function __1(administratorLogin, administratorPassword, location, options, _) { var sqlService, managementService, progress, serverName; var __frame = { name: "__1", line: 47 }; return __func(_, this, arguments, __1, 4, __frame, function __$__1() {








      sqlService = utils.createSqlClient(profile.current.getSubscription(options.subscription));
      managementService = utils.createManagementClient(profile.current.getSubscription(options.subscription));

      return cli.interaction.promptIfNotGiven($("New Administrator login: "), administratorLogin, __cb(_, __frame, 4, 43, function ___(__0, __1) { administratorLogin = __1;
        return cli.interaction.promptPasswordIfNotGiven($("New administrator password: "), administratorPassword, __cb(_, __frame, 5, 46, function ___(__0, __2) { administratorPassword = __2;
          return cli.interaction.chooseIfNotGiven($("Location: "), $("Getting locations"), location, function(cb) {

            managementService.locations.list(function(err, result) {
              if (err) { return cb(err); } ;

              cb(null, result.locations.map(function(location) { return location.name; })); }); }, __cb(_, __frame, 6, 33, function ___(__0, __3) { location = __3;



            progress = cli.interaction.progress($("Creating SQL Server")); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__1() {


                  return sqlService.servers.create({
                    administratorUserName: administratorLogin,
                    administratorPassword: administratorPassword,
                    location: location }, __cb(_, __frame, 18, 40, function ___(__0, __4) { serverName = __4.serverName; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__1() {


                    progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$__1() { return (function __$__1(__then) {


                  if (options.defaultFirewallRule) {
                    progress = cli.interaction.progress(util.format($("Creating %s firewall rule"), allowAzureRuleName));
                    return sqlService.firewallRules.create(serverName, {
                      name: allowAzureRuleName,
                      startIPAddress: allowAzureRuleIp,
                      endIPAddress: allowAzureRuleIp }, __cb(_, __frame, 29, 33, function __$__1() {

                      progress.end(); __then(); }, true)); } else { __then(); } ; })(function __$__1() {

                  cli.interaction.formatOutput({ name: serverName }, function(outputData) {
                    log.data($("Server Name"), outputData.name); }); _(); }); }); }); }, true)); }, true)); }, true)); }); });



  server.command("show [serverName]").description($("Show server details")).usage("[options] <serverName>").option("--serverName <serverName>", $("the SQL Server name")).option("-s, --subscription <id>", $("the subscription id")).execute(function __2(serverName, options, _) { var sqlService, progress, servers, server; var __frame = { name: "__2", line: 93 }; return __func(_, this, arguments, __2, 2, __frame, function __$__2() {





      sqlService = utils.createSqlClient(profile.current.getSubscription(options.subscription));

      return cli.interaction.promptIfNotGiven($("Server name: "), serverName, __cb(_, __frame, 3, 35, function ___(__0, __1) { serverName = __1;

        progress = cli.interaction.progress($("Getting SQL server")); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__2() {


              return sqlService.servers.list(__cb(_, __frame, 8, 37, function ___(__0, __2) { servers = __2.servers; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__2() {

                progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$__2() {




            server = servers.filter(function(server) { return utils.ignoreCaseEquals(server.name, serverName); })[0];

            cli.interaction.formatOutput(server, function(outputData) {
              if (!outputData) {
                log.error($("Server not found")); }
               else {
                cli.interaction.logEachData("SQL Server", server); } ; }); _(); }); }); }, true)); }); });




  server.command("list").description($("List the servers")).option("-s, --subscription <id>", $("the subscription id")).execute(function __3(options, _) { var sqlService, progress, servers; var __frame = { name: "__3", line: 122 }; return __func(_, this, arguments, __3, 1, __frame, function __$__3() {



      sqlService = utils.createSqlClient(profile.current.getSubscription(options.subscription));
      progress = cli.interaction.progress($("Getting SQL server")); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__3() {


            return sqlService.servers.list(__cb(_, __frame, 5, 37, function ___(__0, __1) { servers = __1.servers; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__3() {

              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$__3() {


          cli.interaction.formatOutput(servers, function(outputData) {
            if ((outputData.length === 0)) {
              log.info($("No SQL Servers exist")); }
             else {
              log.table(servers, function(row, item) {
                row.cell($("Name"), item.name);
                row.cell($("Location"), item.location); }); } ; }); _(); }); }); }); });





  server.command("delete [serverName]").description($("Delete a server")).usage("[options] <serverName>").option("--serverName <serverName>", $("the SQL Server name")).option("-q, --quiet", $("quiet mode, do not ask for delete confirmation")).option("-s, --subscription <id>", $("the subscription id")).execute(function __4(serverName, options, _) { var sqlService, progress; var __frame = { name: "__4", line: 150 }; return __func(_, this, arguments, __4, 2, __frame, function __$__4() {






      sqlService = utils.createSqlClient(profile.current.getSubscription(options.subscription));

      return cli.interaction.promptIfNotGiven($("Server name: "), serverName, __cb(_, __frame, 3, 35, function ___(__0, __2) { serverName = __2; return (function __$__4(_) {

          var __1 = !options.quiet; if (!__1) { return _(null, __1); } ; return cli.interaction.confirm(util.format($("Delete server %s? [y/n] "), serverName), __cb(_, __frame, 5, 45, function ___(__0, __3) { var __2 = !__3; return _(null, __2); }, true)); })(__cb(_, __frame, -149, 18, function ___(__0, __3) { return (function __$__4(__then) { if (__3) { return _(null); } else { __then(); } ; })(function __$__4() {



            progress = cli.interaction.progress($("Removing SQL Server")); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__4() {

                  return sqlService.servers.deleteMethod(serverName, __cb(_, __frame, 11, 27, function __$__4() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__4() {

                    progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$__4() { _(); }); }); }); }, true)); }, true)); }); });



  var firewallrule = sql.category("firewallrule").description($("Commands to manage your SQL Server firewall rules"));


  firewallrule.command("create [serverName] [ruleName] [startIPAddress] [endIPAddress]").description($("Create a firewall rule for a SQL Server")).usage("[options] <serverName> <ruleName> <startIPAddress> <endIPAddress>").option("--serverName <serverName>", $("the SQL Server name")).option("--ruleName <ruleName>", $("the firewall rule name")).option("--startIPAddress <startIPAddress>", $("the starting IP address for the firewall rule")).option("--endIPAddress <endIPAddress>", $("the ending IP address for the firewall rule")).option("-s, --subscription <id>", $("the subscription id")).execute(function __5(serverName, ruleName, startIPAddress, endIPAddress, options, _) { var sqlService, progress; var __frame = { name: "__5", line: 178 }; return __func(_, this, arguments, __5, 5, __frame, function __$__5() {








      sqlService = utils.createSqlClient(profile.current.getSubscription(options.subscription));

      return cli.interaction.promptIfNotGiven($("Server name: "), serverName, __cb(_, __frame, 3, 35, function ___(__0, __1) { serverName = __1;
        return cli.interaction.promptIfNotGiven($("Rule name: "), ruleName, __cb(_, __frame, 4, 33, function ___(__0, __2) { ruleName = __2;
          return cli.interaction.promptIfNotGiven($("Start IP address: "), startIPAddress, __cb(_, __frame, 5, 39, function ___(__0, __3) { startIPAddress = __3; return (function __$__5(__then) {

              if ((endIPAddress || !startIPAddress)) {
                return cli.interaction.promptIfNotGiven($("End IP Address: "), endIPAddress, __cb(_, __frame, 8, 39, function ___(__0, __4) { endIPAddress = __4; __then(); }, true)); } else {


                endIPAddress = startIPAddress; __then(); } ; })(function __$__5() { return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__5() {



                    progress = cli.interaction.progress($("Creating Firewall Rule")); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__5() {

                          return sqlService.firewallRules.create(serverName, {
                            name: ruleName,
                            startIPAddress: startIPAddress,
                            endIPAddress: endIPAddress }, __cb(_, __frame, 17, 35, function __$__5() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__5() {


                            progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, __then); }); }); })(function ___(e, __result) { __catch(function __$__5() { if (e) {


                      if ((e.code === "ResourceNotFound")) {
                        e.message = $("SQL Server and/or firewall rule not found"); }
                       else {
                        e.message = e.message.replace(/[R|r]esource/g, "SQL Server and/or firewall rule"); } ;


                      return _(e); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$__5() { _(); }); }); }); }, true)); }, true)); }, true)); }); });



  firewallrule.command("show [serverName] [ruleName]").description($("Show firewall rule details")).usage("[options] <serverName> <ruleName>").option("--serverName <serverName>", $("the SQL Server name")).option("--ruleName <ruleName>", $("the firewall rule name")).option("-s, --subscription <id>", $("the subscription id")).execute(function __6(serverName, ruleName, options, _) { var sqlService, progress, rules, rule; var __frame = { name: "__6", line: 220 }; return __func(_, this, arguments, __6, 3, __frame, function __$__6() {






      sqlService = utils.createSqlClient(profile.current.getSubscription(options.subscription));

      return cli.interaction.promptIfNotGiven($("Server name: "), serverName, __cb(_, __frame, 3, 35, function ___(__0, __1) { serverName = __1;
        return cli.interaction.promptIfNotGiven($("Rule name: "), ruleName, __cb(_, __frame, 4, 33, function ___(__0, __2) { ruleName = __2; return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__6() {


                progress = cli.interaction.progress($("Getting firewall rule")); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__6() {


                      return sqlService.firewallRules.list(serverName, __cb(_, __frame, 10, 43, function ___(__0, __3) { rules = __3.firewallRules; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__6() {

                        progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$__6() {




                    rule = rules.filter(function(rule) { return utils.ignoreCaseEquals(rule.name, ruleName); })[0];

                    cli.interaction.formatOutput(rule, function(outputData) {
                      if (!outputData) {
                        log.error($("Firewall Rule not found")); }
                       else {
                        cli.interaction.logEachData($("Firewall rule"), rule); } ; }); __then(); }); }); }); })(function ___(e, __result) { __catch(function __$__6() { if (e) {



                  if (((e.code == "ResourceNotFound") || utils.stringStartsWith(e.message, "Resource with the name"))) {
                    return _(new Error($("SQL Server and/or firewall rule not found"))); }
                   else {

                    return _(e); } ; __then(); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$__6() { _(); }); }); }, true)); }, true)); }); });




  firewallrule.command("list [serverName]").description($("List the firewall rules")).usage("[options] <serverName>").option("--serverName <serverName>", $("the SQL Server name")).option("-s, --subscription <id>", $("the subscription id")).execute(function __7(serverName, options, _) { var sqlService, progress, rules; var __frame = { name: "__7", line: 261 }; return __func(_, this, arguments, __7, 2, __frame, function __$__7() {





      sqlService = utils.createSqlClient(profile.current.getSubscription(options.subscription));

      return cli.interaction.promptIfNotGiven($("Server name: "), serverName, __cb(_, __frame, 3, 35, function ___(__0, __1) { serverName = __1;

        progress = cli.interaction.progress($("Getting firewall rules")); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__7() { return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__7() {

                    return sqlService.firewallRules.list(serverName, __cb(_, __frame, 7, 45, function ___(__0, __2) { rules = __2.firewallRules;
                      cli.interaction.formatOutput(rules, function(outputData) {
                        if ((outputData.length === 0)) {
                          log.info($("No Firewall Rules exist")); }
                         else {
                          log.table(outputData, function(row, item) {
                            row.cell($("Name"), item.name);
                            row.cell($("Start IP address"), item.startIPAddress);
                            row.cell($("End IP address"), item.endIPAddress); }); } ; }); __then(); }, true)); }); })(function ___(e, __result) { __catch(function __$__7() { if (e) {




                      if (((e.code == "ResourceNotFound") || utils.stringStartsWith(e.message, "Resource with the name"))) {
                        return _(new Error($("SQL Server and/or firewall rule not found"))); }
                       else {

                        return _(e); } ; __then(); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$__7() { _(null, null, true); }); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__7() {


                progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$__7() { _(); }); }); }, true)); }); });



  firewallrule.command("delete [serverName] [ruleName]").description($("Delete a firewall rule")).usage("[options] <serverName> <ruleName>").option("--serverName <serverName>", $("the SQL server name")).option("--ruleName <ruleName>", $("the firewall rule name")).option("-q, --quiet", $("quiet mode, do not ask for delete confirmation")).option("-s, --subscription <id>", $("the subscription id")).execute(function __8(serverName, ruleName, options, _) { var sqlService, progress; var __frame = { name: "__8", line: 299 }; return __func(_, this, arguments, __8, 3, __frame, function __$__8() {







      sqlService = utils.createSqlClient(profile.current.getSubscription(options.subscription));

      return cli.interaction.promptIfNotGiven($("Server name: "), serverName, __cb(_, __frame, 3, 35, function ___(__0, __2) { serverName = __2;
        return cli.interaction.promptIfNotGiven($("Rule name: "), ruleName, __cb(_, __frame, 4, 33, function ___(__0, __3) { ruleName = __3; return (function __$__8(_) {

            var __1 = !options.quiet; if (!__1) { return _(null, __1); } ; return cli.interaction.confirm(util.format($("Delete rule %s? [y/n] "), ruleName), __cb(_, __frame, 6, 45, function ___(__0, __3) { var __2 = !__3; return _(null, __2); }, true)); })(__cb(_, __frame, -298, 18, function ___(__0, __4) { return (function __$__8(__then) { if (__4) { return _(null); } else { __then(); } ; })(function __$__8() {



              progress = cli.interaction.progress($("Removing firewall rule")); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__8() { return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__8() {

                          return sqlService.firewallRules.deleteMethod(serverName, ruleName, __cb(_, __frame, 12, 33, __then, true)); }); })(function ___(e, __result) { __catch(function __$__8() { if (e) {

                            if (((e.code == "ResourceNotFound") || utils.stringStartsWith(e.message, "Resource with the name"))) {
                              return _(new Error($("SQL Server and/or firewall rule not found"))); }
                             else {

                              return _(e); } ; __then(); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$__8() { _(null, null, true); }); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__8() {


                      progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$__8() { _(); }); }); }); }, true)); }, true)); }, true)); }); });



  var db = sql.category("db").description($("Commands to manage your SQL Server databases"));


  db.command("create [serverName] [databaseName] [administratorLogin] [administratorPassword] [collationName] [edition] [maxSizeInGB]").description($("Create a database")).usage("[options] <serverName> <databaseName> <administratorLogin> <administratorPassword> [collationName] [edition] [maxSizeInGB]").option("--serverName <serverName>", $("the SQL server name")).option("--databaseName <databaseName>", $("the database name")).option("--administratorLogin <administratorLogin>", $("the administrator login")).option("--administratorPassword <administratorPassword>", $("the administrator password")).option("--collationName <collationName>", $("the database collation name")).option("--edition <edition>", $("the database edition")).option("--maxSizeInGB <maxSizeInGB>", $("the database maximum size in GB")).option("--location <location>", $("the location")).option("-s, --subscription <id>", $("the subscription id")).execute(function __9(serverName, databaseName, administratorLogin, administratorPassword, collationName, edition, maxSizeInGB, options, _) { var sqlManagementService, useAdminCredentials, createFunc, createOptions, sqlService, progress; var __frame = { name: "__9", line: 339 }; return __func(_, this, arguments, __9, 8, __frame, function __$__9() {












      sqlManagementService = utils.createSqlClient(profile.current.getSubscription(options.subscription));

      useAdminCredentials = (administratorLogin || administratorPassword);

      return cli.interaction.promptIfNotGiven($("Server name: "), serverName, __cb(_, __frame, 5, 35, function ___(__0, __1) { serverName = __1;
        return cli.interaction.promptIfNotGiven($("Database name: "), databaseName, __cb(_, __frame, 6, 37, function ___(__0, __2) { databaseName = __2; return (function __$__9(__then) {

            if (useAdminCredentials) {
              return cli.interaction.promptIfNotGiven($("Administrator login: "), administratorLogin, __cb(_, __frame, 9, 45, function ___(__0, __3) { administratorLogin = __3;
                return cli.interaction.promptPasswordOnceIfNotGiven($("Administrator password: "), administratorPassword, __cb(_, __frame, 10, 48, function ___(__0, __4) { administratorPassword = __4; __then(); }, true)); }, true)); } else { __then(); } ; })(function __$__9() {

            collationName = collationName;
            edition = edition;
            maxSizeInGB = maxSizeInGB;



            createOptions = setDefaultDbCreationOptions({
              name: databaseName,
              edition: edition,
              maximumDatabaseSizeInGB: maxSizeInGB,
              collationName: collationName });


            if (useAdminCredentials) {
              sqlService = createSqlService(serverName, administratorLogin, administratorPassword);

              createOptions.maxSizeInGB = createOptions.maximumDatabaseSizeInGB;
              delete createOptions.maximumDatabaseSizeInGB;

              createFunc = function(callback) {
                sqlService.createServerDatabase(databaseName, createOptions, callback); }; }

             else {
              createFunc = function(callback) {
                sqlManagementService.databases.create(serverName, createOptions, callback); }; } ;



            progress = cli.interaction.progress($("Creating SQL Server Database")); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__9() { return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__9() {

                        return createFunc(__cb(_, __frame, 42, 8, __then, true)); }); })(function ___(e, __result) { __catch(function __$__9() { if (e) {

                          if ((e.code == "ENOTFOUND")) {
                            return _(new Error($("SQL Server not found"))); }
                           else {

                            return _(e); } ; __then(); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$__9() { _(null, null, true); }); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__9() {


                    progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$__9() { _(); }); }); }); }, true)); }, true)); }); });



  db.command("list [serverName] [administratorLogin] [administratorPassword]").description($("List the databases")).usage("[options] <serverName> <administratorLogin> <administratorPassword>").option("--serverName <serverName>", $("the SQL server name")).option("--administratorLogin <administratorLogin>", $("the administrator login")).option("--administratorPassword <administratorPassword>", $("the administrator password")).option("-s, --subscription <id>", $("the subscription id")).execute(function __10(serverName, administratorLogin, administratorPassword, options, _) { var sqlService, progress, databases; var __frame = { name: "__10", line: 401 }; return __func(_, this, arguments, __10, 4, __frame, function __$__10() {







      return cli.interaction.promptIfNotGiven($("Server name: "), serverName, __cb(_, __frame, 1, 35, function ___(__0, __1) { serverName = __1;
        return cli.interaction.promptIfNotGiven($("Administrator login: "), administratorLogin, __cb(_, __frame, 2, 43, function ___(__0, __2) { administratorLogin = __2;
          return cli.interaction.promptPasswordOnceIfNotGiven($("Administrator password: "), administratorPassword, __cb(_, __frame, 3, 46, function ___(__0, __3) { administratorPassword = __3;

            sqlService = createSqlService(serverName, administratorLogin, administratorPassword);

            progress = cli.interaction.progress($("Getting SQL server databases")); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__10() {


                  return sqlService.listServerDatabases(__cb(_, __frame, 10, 31, function ___(__0, __4) { databases = __4; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__10() {

                    progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$__10() {


                cli.interaction.formatOutput(databases, function(outputData) {
                  if ((outputData.length === 0)) {
                    log.info($("No SQL Server Databases exist")); }
                   else {
                    log.table(outputData, function(row, item) {
                      row.cell($("Name"), item.Name);
                      row.cell($("Edition"), item.Edition);
                      row.cell($("Collation"), item.CollationName);
                      row.cell($("MaxSizeInGB"), item.MaxSizeGB); }); } ; }); _(); }); }); }, true)); }, true)); }, true)); }); });





  db.command("show [serverName] [databaseName] [administratorLogin] [administratorPassword]").description($("Show database details")).usage("[options] <serverName> <databaseName> <administratorLogin> <administratorPassword>").option("--serverName <serverName>", $("the SQL server name")).option("--databaseName <databaseName>", $("the database name")).option("--administratorLogin <administratorLogin>", $("the administrator login")).option("--administratorPassword <administratorPassword>", $("the administrator password")).option("-s, --subscription <id>", $("the subscription id")).execute(function __11(serverName, databaseName, administratorLogin, administratorPassword, options, _) { var sqlService, database; var __frame = { name: "__11", line: 438 }; return __func(_, this, arguments, __11, 5, __frame, function __$__11() {








      return cli.interaction.promptIfNotGiven($("Server name: "), serverName, __cb(_, __frame, 1, 35, function ___(__0, __1) { serverName = __1;
        return cli.interaction.promptIfNotGiven($("Database name: "), databaseName, __cb(_, __frame, 2, 37, function ___(__0, __2) { databaseName = __2;
          return cli.interaction.promptIfNotGiven($("Administrator login: "), administratorLogin, __cb(_, __frame, 3, 43, function ___(__0, __3) { administratorLogin = __3;
            return cli.interaction.promptPasswordOnceIfNotGiven($("Administrator password: "), administratorPassword, __cb(_, __frame, 4, 46, function ___(__0, __4) { administratorPassword = __4;

              sqlService = createSqlService(serverName, administratorLogin, administratorPassword);
              return getDatabase(sqlService, databaseName, __cb(_, __frame, 7, 21, function ___(__0, __5) { database = __5;

                cli.interaction.formatOutput(database, function(outputData) {
                  if (!outputData) {
                    log.error($("Database not found")); }
                   else {
                    delete outputData["_"];
                    cli.interaction.logEachData("Database", outputData); } ; }); _(); }, true)); }, true)); }, true)); }, true)); }, true)); }); });




  db.command("delete [serverName] [databaseName] [administratorLogin] [administratorPassword]").description($("Delete a database")).usage("[options] <serverName> <databaseName> <administratorPassword>").option("--serverName <serverName>", $("the SQL server name")).option("--databaseName <databaseName>", $("the database name")).option("--administratorLogin <administratorLogin>", $("the administrator login")).option("--administratorPassword <administratorPassword>", $("the administrator password")).option("-q, --quiet", $("quiet mode, do not ask for delete confirmation")).option("-s, --subscription <id>", $("the subscription id")).execute(function __12(serverName, databaseName, administratorLogin, administratorPassword, options, _) { var sqlService, database, progress; var __frame = { name: "__12", line: 466 }; return __func(_, this, arguments, __12, 5, __frame, function __$__12() {









      return cli.interaction.promptIfNotGiven($("Server name: "), serverName, __cb(_, __frame, 1, 35, function ___(__0, __2) { serverName = __2;
        return cli.interaction.promptIfNotGiven($("Database name: "), databaseName, __cb(_, __frame, 2, 37, function ___(__0, __3) { databaseName = __3;
          return cli.interaction.promptIfNotGiven($("Administrator login: "), administratorLogin, __cb(_, __frame, 3, 43, function ___(__0, __4) { administratorLogin = __4;
            return cli.interaction.promptPasswordOnceIfNotGiven($("Administrator password: "), administratorPassword, __cb(_, __frame, 4, 46, function ___(__0, __5) { administratorPassword = __5; return (function __$__12(_) {

                var __1 = !options.quiet; if (!__1) { return _(null, __1); } ; return cli.interaction.confirm(util.format($("Delete database %s? [y/n] "), databaseName), __cb(_, __frame, 6, 45, function ___(__0, __3) { var __2 = !__3; return _(null, __2); }, true)); })(__cb(_, __frame, -465, 18, function ___(__0, __6) { return (function __$__12(__then) { if (__6) { return _(null); } else { __then(); } ; })(function __$__12() {



                  sqlService = createSqlService(serverName, administratorLogin, administratorPassword);
                  return getDatabase(sqlService, databaseName, __cb(_, __frame, 11, 21, function ___(__0, __7) { database = __7; return (function __$__12(__then) {

                      if (database) {
                        progress = cli.interaction.progress($("Removing database"));
                        return sqlService.deleteServerDatabase(database.Id, __cb(_, __frame, 15, 19, function __$__12() {
                          progress.end(); __then(); }, true)); } else {

                        return _(new Error(util.format($("Database with name \"%s\" does not exist"), databaseName))); } ; })(_); }, true)); }); }, true)); }, true)); }, true)); }, true)); }, true)); }); });



  function createSqlService(serverName, administratorLogin, administratorPassword) {
    return utils.createSqlService(serverName, administratorLogin, administratorPassword); };


  function setDefaultDbCreationOptions(opts) {
    if (!opts.edition) {
      opts.edition = SqlAzureConstants.WEB_EDITION; } ;


    if (!opts.maximumDatabaseSizeInGB) {
      if ((opts.edition === SqlAzureConstants.WEB_EDITION)) {
        opts.maximumDatabaseSizeInGB = SqlAzureConstants.WEB_1GB; }
       else {
        opts.maximumDatabaseSizeInGB = SqlAzureConstants.BUSINESS_10GB; } ; } ;



    if (!opts.collationName) {
      opts.collationName = SqlAzureConstants.DEFAULT_COLLATION_NAME; } ;


    return opts; };


  function getDatabase(sqlService, databaseName, _) { var progress, databases; var __frame = { name: "getDatabase", line: 512 }; return __func(_, this, arguments, getDatabase, 2, __frame, function __$getDatabase() {
      progress = cli.interaction.progress($("Getting SQL server databases")); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$getDatabase() {



            return sqlService.listServerDatabases(__cb(_, __frame, 5, 29, function ___(__0, __1) { databases = __1; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$getDatabase() {

              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$getDatabase() {




          return _(null, databases.filter(function(database) { return utils.ignoreCaseEquals(database.Name, databaseName); })[0]); }); }); }); };};
