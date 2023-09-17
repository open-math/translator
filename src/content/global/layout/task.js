function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)(s=pug_classes(r[g]))&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_rethrow(e,n,r,t){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&n||t))throw e.message+=" on line "+r,e;var o,a,i,s;try{t=t||require("fs").readFileSync(n,{encoding:"utf8"}),o=3,a=t.split("\n"),i=Math.max(r-o,0),s=Math.min(a.length,r+o)}catch(t){return e.message+=" - could not read from "+n+" ("+t.message+")",void pug_rethrow(e,null,r)}o=a.slice(i,s).map(function(e,n){var t=n+i+1;return(t==r?"  > ":"    ")+t+"| "+e}).join("\n"),e.path=n;try{e.message=(n||"Pug")+":"+r+"\n"+o+"\n\n"+e.message}catch(e){}throw e}function task(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;
    var locals_for_with = (locals || {});
    
    (function (Object, classes, i18n, id, sections, statement, tags, title) {
      ;pug_debug_line = 1;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes(["task",classes], [false,true]), false, false)+pug_attr("id", id, true, false)) + "\u003E";
;pug_debug_line = 2;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 3;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
pug_html = pug_html + "\u003Cdiv class=\"info\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
pug_html = pug_html + "\u003Cdiv class=\"title\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
pug_html = pug_html + (null == (pug_interp = title) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 5;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
if ((tags)) {
;pug_debug_line = 6;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
pug_html = pug_html + "\u003Cdiv class=\"tags\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
// iterate tags
;(function(){
  var $$obj = tags;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var tag = $$obj[pug_index0];
;pug_debug_line = 8;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
pug_html = pug_html + "\u003Cdiv class=\"tag\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
pug_html = pug_html + (null == (pug_interp = tag) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var tag = $$obj[pug_index0];
;pug_debug_line = 8;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
pug_html = pug_html + "\u003Cdiv class=\"tag\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
pug_html = pug_html + (null == (pug_interp = tag) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 10;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
let sectionNames = Object.keys(sections);
;pug_debug_line = 12;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
if ((sectionNames.length > 0)) {
;pug_debug_line = 13;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
pug_html = pug_html + "\u003Cdiv class=\"controls\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
// iterate sectionNames
;(function(){
  var $$obj = sectionNames;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var sectionName = $$obj[pug_index1];
;pug_debug_line = 15;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
pug_html = pug_html + "\u003Cbutton" + (pug_attr("data-section", sectionName, true, false)+pug_attr("title", i18n(`task.${sectionName}`), true, false)) + "\u003E";
;pug_debug_line = 16;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
pug_html = pug_html + "\u003Ci\u003E\u003C\u002Fi\u003E\u003C\u002Fbutton\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var sectionName = $$obj[pug_index1];
;pug_debug_line = 15;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
pug_html = pug_html + "\u003Cbutton" + (pug_attr("data-section", sectionName, true, false)+pug_attr("title", i18n(`task.${sectionName}`), true, false)) + "\u003E";
;pug_debug_line = 16;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
pug_html = pug_html + "\u003Ci\u003E\u003C\u002Fi\u003E\u003C\u002Fbutton\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fheader\u003E";
;pug_debug_line = 18;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
pug_html = pug_html + "\u003Cdiv class=\"statement\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
pug_html = pug_html + (null == (pug_interp = statement) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 20;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
// iterate sections
;(function(){
  var $$obj = sections;
  if ('number' == typeof $$obj.length) {
      for (var name = 0, $$l = $$obj.length; name < $$l; name++) {
        var content = $$obj[name];
;pug_debug_line = 21;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
pug_html = pug_html + "\u003Csection" + (pug_attr("data-name", name, true, false)) + "\u003E";
;pug_debug_line = 22;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
pug_html = pug_html + "\u003Cdiv class=\"inner\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 24;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
pug_html = pug_html + "\u003Ci\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 25;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 25;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = i18n(`task.${name}`)) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 26;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
pug_html = pug_html + (null == (pug_interp = content) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E";
      }
  } else {
    var $$l = 0;
    for (var name in $$obj) {
      $$l++;
      var content = $$obj[name];
;pug_debug_line = 21;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
pug_html = pug_html + "\u003Csection" + (pug_attr("data-name", name, true, false)) + "\u003E";
;pug_debug_line = 22;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
pug_html = pug_html + "\u003Cdiv class=\"inner\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 24;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
pug_html = pug_html + "\u003Ci\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 25;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 25;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = i18n(`task.${name}`)) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 26;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "content\u002Fblock\u002Ftask\u002Flayout.pug";
pug_html = pug_html + (null == (pug_interp = content) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
    }.call(this, "Object" in locals_for_with ?
        locals_for_with.Object :
        typeof Object !== 'undefined' ? Object : undefined, "classes" in locals_for_with ?
        locals_for_with.classes :
        typeof classes !== 'undefined' ? classes : undefined, "i18n" in locals_for_with ?
        locals_for_with.i18n :
        typeof i18n !== 'undefined' ? i18n : undefined, "id" in locals_for_with ?
        locals_for_with.id :
        typeof id !== 'undefined' ? id : undefined, "sections" in locals_for_with ?
        locals_for_with.sections :
        typeof sections !== 'undefined' ? sections : undefined, "statement" in locals_for_with ?
        locals_for_with.statement :
        typeof statement !== 'undefined' ? statement : undefined, "tags" in locals_for_with ?
        locals_for_with.tags :
        typeof tags !== 'undefined' ? tags : undefined, "title" in locals_for_with ?
        locals_for_with.title :
        typeof title !== 'undefined' ? title : undefined));
    ;} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;} module.exports = task;