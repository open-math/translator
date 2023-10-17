function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)(s=pug_classes(r[g]))&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_rethrow(e,n,r,t){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&n||t))throw e.message+=" on line "+r,e;var o,a,i,s;try{t=t||require("fs").readFileSync(n,{encoding:"utf8"}),o=3,a=t.split("\n"),i=Math.max(r-o,0),s=Math.min(a.length,r+o)}catch(t){return e.message+=" - could not read from "+n+" ("+t.message+")",void pug_rethrow(e,null,r)}o=a.slice(i,s).map(function(e,n){var t=n+i+1;return(t==r?"  > ":"    ")+t+"| "+e}).join("\n"),e.path=n;try{e.message=(n||"Pug")+":"+r+"\n"+o+"\n\n"+e.message}catch(e){}throw e}function task(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;
    var locals_for_with = (locals || {});
    
    (function (Object, i18n, isEditor, similar, tags) {
      ;pug_debug_line = 1;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_mixins["task"] = pug_interp = function(task, isSimilar){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 2;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes(["task",isSimilar ? task.classes : null,task.script ? 'genTask' : null], [false,true,true]), false, false)+pug_attr("id", isSimilar ? task.id : null, true, false)+pug_attr("data-hint-open", isEditor, true, false)+pug_attr("data-solution-open", isEditor, true, false)+pug_attr("data-answer-open", isEditor, true, false)+pug_attr("data-similar-open", isEditor, true, false)+pug_attr("data-script-id", task.scriptId ? task.scriptId : null, true, false)+pug_attr("data-script", task.script ? task.script : null, true, false)) + "\u003E";
;pug_debug_line = 13;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 14;pug_debug_filename = "content\\block\\task\\layout.pug";
if ((isSimilar)) {
;pug_debug_line = 15;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Ci class=\"ic-clone analogIcon\"\u003E\u003C\u002Fi\u003E";
}
;pug_debug_line = 17;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"info\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"title\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + (null == (pug_interp = task.title) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 20;pug_debug_filename = "content\\block\\task\\layout.pug";
if ((isSimilar)) {
;pug_debug_line = 21;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"desc\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = i18n('task.similarNum') + ' ' + task.num) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 23;pug_debug_filename = "content\\block\\task\\layout.pug";
if ((tags)) {
;pug_debug_line = 24;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"tags\"\u003E";
;pug_debug_line = 25;pug_debug_filename = "content\\block\\task\\layout.pug";
// iterate task.tags
;(function(){
  var $$obj = task.tags;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var tag = $$obj[pug_index0];
;pug_debug_line = 26;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"tag\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + (null == (pug_interp = tag) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var tag = $$obj[pug_index0];
;pug_debug_line = 26;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"tag\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + (null == (pug_interp = tag) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 28;pug_debug_filename = "content\\block\\task\\layout.pug";
let sectionNames = Object.keys(task.sections);
;pug_debug_line = 30;pug_debug_filename = "content\\block\\task\\layout.pug";
if ((sectionNames.length > 0 || similar)) {
;pug_debug_line = 31;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"controls\"\u003E";
;pug_debug_line = 32;pug_debug_filename = "content\\block\\task\\layout.pug";
// iterate sectionNames
;(function(){
  var $$obj = sectionNames;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var sectionName = $$obj[pug_index1];
;pug_debug_line = 33;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Cbutton" + (pug_attr("data-section", sectionName, true, false)+pug_attr("title", i18n(`task.${sectionName}`), true, false)) + "\u003E";
;pug_debug_line = 34;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Ci\u003E\u003C\u002Fi\u003E\u003C\u002Fbutton\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var sectionName = $$obj[pug_index1];
;pug_debug_line = 33;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Cbutton" + (pug_attr("data-section", sectionName, true, false)+pug_attr("title", i18n(`task.${sectionName}`), true, false)) + "\u003E";
;pug_debug_line = 34;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Ci\u003E\u003C\u002Fi\u003E\u003C\u002Fbutton\u003E";
    }
  }
}).call(this);

;pug_debug_line = 36;pug_debug_filename = "content\\block\\task\\layout.pug";
if ((task.similar)) {
;pug_debug_line = 37;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Cbutton" + (" data-section=\"similar\""+pug_attr("title", i18n(`task.similar`), true, false)) + "\u003E";
;pug_debug_line = 38;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Ci\u003E\u003C\u002Fi\u003E\u003C\u002Fbutton\u003E";
}
;pug_debug_line = 40;pug_debug_filename = "content\\block\\task\\layout.pug";
if ((task.script)) {
;pug_debug_line = 41;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Cbutton" + (" class=\"generate\""+pug_attr("title", i18n('task.generate'), true, false)) + "\u003E";
;pug_debug_line = 42;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Ci class=\"ic-arrows-rotate\"\u003E\u003C\u002Fi\u003E\u003C\u002Fbutton\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fheader\u003E";
;pug_debug_line = 44;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"statement\"\u003E";
;pug_debug_line = 44;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + (null == (pug_interp = task.statement) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 46;pug_debug_filename = "content\\block\\task\\layout.pug";
// iterate task.sections
;(function(){
  var $$obj = task.sections;
  if ('number' == typeof $$obj.length) {
      for (var name = 0, $$l = $$obj.length; name < $$l; name++) {
        var content = $$obj[name];
;pug_debug_line = 47;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Csection" + (pug_attr("data-name", name, true, false)) + "\u003E";
;pug_debug_line = 48;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"inner\"\u003E";
;pug_debug_line = 49;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 50;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Ci\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 51;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 51;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = i18n(`task.${name}`)) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 52;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 52;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + (null == (pug_interp = content) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E";
      }
  } else {
    var $$l = 0;
    for (var name in $$obj) {
      $$l++;
      var content = $$obj[name];
;pug_debug_line = 47;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Csection" + (pug_attr("data-name", name, true, false)) + "\u003E";
;pug_debug_line = 48;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"inner\"\u003E";
;pug_debug_line = 49;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 50;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Ci\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 51;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 51;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = i18n(`task.${name}`)) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 52;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 52;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + (null == (pug_interp = content) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
;pug_debug_line = 54;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"taskHolder\"\u003E";
;pug_debug_line = 55;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_mixins["task"](locals);
;pug_debug_line = 57;pug_debug_filename = "content\\block\\task\\layout.pug";
if ((similar)) {
;pug_debug_line = 58;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"similarTasks\"\u003E";
;pug_debug_line = 59;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"inner\"\u003E";
;pug_debug_line = 60;pug_debug_filename = "content\\block\\task\\layout.pug";
// iterate similar
;(function(){
  var $$obj = similar;
  if ('number' == typeof $$obj.length) {
      for (var i = 0, $$l = $$obj.length; i < $$l; i++) {
        var sTask = $$obj[i];
;pug_debug_line = 61;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_mixins["task"](sTask, true);
      }
  } else {
    var $$l = 0;
    for (var i in $$obj) {
      $$l++;
      var sTask = $$obj[i];
;pug_debug_line = 61;pug_debug_filename = "content\\block\\task\\layout.pug";
pug_mixins["task"](sTask, true);
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
    }.call(this, "Object" in locals_for_with ?
        locals_for_with.Object :
        typeof Object !== 'undefined' ? Object : undefined, "i18n" in locals_for_with ?
        locals_for_with.i18n :
        typeof i18n !== 'undefined' ? i18n : undefined, "isEditor" in locals_for_with ?
        locals_for_with.isEditor :
        typeof isEditor !== 'undefined' ? isEditor : undefined, "similar" in locals_for_with ?
        locals_for_with.similar :
        typeof similar !== 'undefined' ? similar : undefined, "tags" in locals_for_with ?
        locals_for_with.tags :
        typeof tags !== 'undefined' ? tags : undefined));
    ;} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;} module.exports = task;