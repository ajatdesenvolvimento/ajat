/*** Generated by streamline 0.10.17 (callbacks) - DO NOT EDIT ***/ "use strict"; var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb,__tryCatch=__rt.__tryCatch; var util = require("util");


















var profile = require("../../../util/profile");
var utils = require("../../../util/utils");

var $ = utils.getLocaleString;

exports.init = function(cli) {
  var log = cli.output;
  var tagCommand = cli.category("tag").description($("Commands to manage your resource manager tags"));


  tagCommand.command("create [name] [value]").description($("add a tag")).usage("[options] <name> <value>").option("-n --name <name>", $(("Name of the tag. If the tag name doesn't exist, create the tag name; " + "Otherwise, add the value to the existing tag name."))).option("--value <value>", $(("Value of the tag. If specified, add the tag value to the tag name; " + "Otherwise, keep the tag values unchanged."))).option("--subscription <subscription>", $("The subscription identifier.")).execute(function __1(name, value, options, _) { var subscription, client, progress, tag; var __frame = { name: "__1", line: 38 }; return __func(_, this, arguments, __1, 3, __frame, function __$__1() {








      if (!name) {
        return _(null, cli.missingArgument("name")); } ;

      subscription = profile.current.getSubscription(options.subscription);
      client = utils.createResourceClient(subscription);

      progress = cli.interaction.progress(util.format($("Creating tag '%s'"), name)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__1() {

            return client.tags.createOrUpdate(name, __cb(_, __frame, 9, 20, function __$__1() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__1() {

              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$__1() { return (function __$__1(__then) {


            if (value) {
              progress = cli.interaction.progress(util.format($("Setting tag value '%s'"), value)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__1() {

                    return client.tags.createOrUpdateValue(name, value, __cb(_, __frame, 17, 22, function __$__1() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__1() {

                      progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, __then); }); } else { __then(); } ; })(function __$__1() { return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__1() {





                  return findTag(name, client, __cb(_, __frame, 25, 14, function ___(__0, __1) { tag = __1;
                    showTagDetails(tag, log); _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__1() {

                    progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$__1() { _(); }); }); }); }); }); }); });



  tagCommand.command("delete [name] [value]").description($("Remove an entire tag or a tag value")).usage("[options] <name> <value>").option("-n --name <name>", $("Name of the tag to remove.")).option("--value <value>", $(("Value of the tag to remove. If not specified, remove the entire tag. " + "If specified, only remove the tag value."))).option("-q, --quiet", $("If not specified, will prompt for confirmation. If specified, won't prompt.")).option("--subscription <subscription>", $("The subscription identifier.")).execute(function __2(name, value, options, _) { var subscription, client, promptText, progressText, progress, tag, i, valueEntry; var __frame = { name: "__2", line: 78 }; return __func(_, this, arguments, __2, 3, __frame, function __$__2() {








      if (!name) {
        return _(null, cli.missingArgument("name")); } ;


      subscription = profile.current.getSubscription(options.subscription);
      client = utils.createResourceClient(subscription);


      promptText = (value ? util.format($("Delete tag value '%s'? [y/n] "), value) : util.format($("Delete entire tag '%s'? [y/n] "), name)); return (function __$__2(_) {


        var __1 = !options.quiet; if (!__1) { return _(null, __1); } ; return cli.interaction.confirm(promptText, __cb(_, __frame, 12, 45, function ___(__0, __3) { var __2 = !__3; return _(null, __2); }, true)); })(__cb(_, __frame, -77, 17, function ___(__0, __2) { return (function __$__2(__then) { if (__2) { return _(null); } else { __then(); } ; })(function __$__2() {



          progressText = (value ? $("Deleting tag value") : $("Deleting tag"));
          progress = cli.interaction.progress(progressText); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__2() { return (function __$__2(__then) {

                  if (value) {
                    return client.tags.deleteValue(name, value, __cb(_, __frame, 20, 22, __then, true)); } else {


                    return findTag(name, client, __cb(_, __frame, 23, 20, function ___(__0, __3) { tag = __3;
                      if (!tag) {
                        log.info(util.format($("Tag '%s' does not exist."), name)); return _(null); } ; return (function __$__2(__then) {


                        if ((tag.values && tag.values.length)) {
                          i = 0; var __8 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$__2() { __more = false; if (__8) { i++; } else { __8 = true; } ; var __7 = (i < tag.values.length); if (__7) {
                                valueEntry = extractValueName(tag.values[i].id); return (function __$__2(__then) {
                                  if (valueEntry) {
                                    return client.tags.deleteValue(name, valueEntry, __cb(_, __frame, 32, 28, __then, true)); } else { __then(); } ; })(function __$__2() { while (__more) { __loop(); }; __more = true; }); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); } else { __then(); } ; })(function __$__2() {



                        return client.tags.deleteMethod(name, __cb(_, __frame, 36, 22, __then, true)); }); }, true)); } ; })(function __$__2() { _(null, null, true); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__2() {


                  progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$__2() { _(); }); }); }); }, true)); }); });



  tagCommand.command("list").description($("Lists the tag information")).option("-d, --details", $("Show tag values information as well.")).option("--subscription <subscription>", $("The subscription identifier.")).execute(function __3(options, _) { var subscription, client, progress, tags, i; var __frame = { name: "__3", line: 125 }; return __func(_, this, arguments, __3, 1, __frame, function __$__3() {




      subscription = profile.current.getSubscription(options.subscription);
      client = utils.createResourceClient(subscription);
      progress = cli.interaction.progress($("Listing tags")); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__3() {



            return getTags(client, __cb(_, __frame, 7, 13, function ___(__0, __1) { tags = __1; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__3() {

              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$__3() {


          if (options.details) {
            for (i = 0; (i < tags.length); i++) {
              showTagDetails(tags[i], log); }; }

           else {
            cli.interaction.formatOutput(tags, function(data) {
              if ((data.length === 0)) {
                log.info($("No tags are defined")); }
               else {
                log.table(data, function(row, tag) {
                  row.cell($("Name"), tag.name);
                  row.cell($("Count"), getTagCountInfo(tag.count)); }); } ; }); } ; _(); }); }); }); });






  tagCommand.command("show [name]").description($("Get a tag")).option("-n, --name <name>", $("The tag name.")).option("--subscription <subscription>", $("The subscription identifier.")).execute(function __4(name, options, _) { var subscription, client, progress, tags, tag, i; var __frame = { name: "__4", line: 159 }; return __func(_, this, arguments, __4, 2, __frame, function __$__4() {




      if (!name) {
        return _(null, cli.missingArgument("name")); } ;

      subscription = profile.current.getSubscription(options.subscription);
      client = utils.createResourceClient(subscription);
      progress = cli.interaction.progress($("Getting tags")); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__4() {



            return getTags(client, __cb(_, __frame, 10, 13, function ___(__0, __1) { tags = __1; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__4() {

              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$__4() {




          for (i = 0; (i < tags.length); i++) {
            if (utils.ignoreCaseEquals(tags[i].name, name)) {
              tag = tags[i];
              break; } ; };



          if (tag) {
            showTagDetails(tag, log); }
           else {
            log.info(util.format($("tag '%s' does not exist."), name)); } ; _(); }); }); }); });};





function showTagDetails(tag, log) {
  log.data($("Name:  "), tag.name);
  log.data($("Count: "), getTagCountInfo(tag.count));

  if ((tag.values && (tag.values.length > 0))) {
    log.data("");
    log.table(tag.values, function(row, item) {
      row.cell($("Value"), extractValueName(item.id));
      row.cell($("Count"), getTagCountInfo(item.count)); });

    log.data(""); }
   else {
    log.data($("Values:  []"));
    log.data($("")); } ;};



function getTagCountInfo(tagCount) {
  var count = ((tagCount.value || 0)).toString();
  if ((tagCount.type === "Partial")) {
    count = (count + "+"); } ;

  return count;};


function getTags(client, _) { var result, tags; var __frame = { name: "getTags", line: 217 }; return __func(_, this, arguments, getTags, 1, __frame, function __$getTags() {
    return client.tags.list(__cb(_, __frame, 1, 27, function ___(__0, __1) { result = __1;
      tags = result.tags; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$getTags() { __more = false;
          var __4 = result.nextLink; if (__4) {
            return client.tags.listNext(result.nextLink, __cb(_, __frame, 4, 25, function ___(__0, __2) { result = __2;
              tags = tags.concat(result.tags); while (__more) { __loop(); }; __more = true; }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(function __$getTags() {

        return _(null, tags); }); }, true)); });};


function findTag(name, client, _) { var tags, tag, i; var __frame = { name: "findTag", line: 227 }; return __func(_, this, arguments, findTag, 2, __frame, function __$findTag() {
    return getTags(client, __cb(_, __frame, 1, 13, function ___(__0, __1) { tags = __1;

      for (i = 0; (i < tags.length); i++) {
        if (utils.ignoreCaseEquals(tags[i].name, name)) {
          tag = tags[i];
          break; } ; };


      return _(null, tag); }, true)); });};


function extractValueName(valueFullName) {
  var valueName;
  if (valueFullName) {
    var index = valueFullName.lastIndexOf("/");
    if ((index !== -1)) {
      valueName = valueFullName.substring((index + 1)); } ; } ;


  return valueName;};
