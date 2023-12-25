function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)(s=pug_classes(r[g]))&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_rethrow(e,n,r,t){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&n||t))throw e.message+=" on line "+r,e;var o,a,i,s;try{t=t||require("fs").readFileSync(n,{encoding:"utf8"}),o=3,a=t.split("\n"),i=Math.max(r-o,0),s=Math.min(a.length,r+o)}catch(t){return e.message+=" - could not read from "+n+" ("+t.message+")",void pug_rethrow(e,null,r)}o=a.slice(i,s).map(function(e,n){var t=n+i+1;return(t==r?"  > ":"    ")+t+"| "+e}).join("\n"),e.path=n;try{e.message=(n||"Pug")+":"+r+"\n"+o+"\n\n"+e.message}catch(e){}throw e}function figure(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;
    var locals_for_with = (locals || {});
    
    (function (caption, classes, content, id, uuid, widthCss) {
      ;pug_debug_line = 1;pug_debug_filename = "content\\block\\figure\\layout.pug";
pug_mixins["figureContent"] = pug_interp = function(content){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 2;pug_debug_filename = "content\\block\\figure\\layout.pug";
switch (content.type){
case 'image':
;pug_debug_line = 4;pug_debug_filename = "content\\block\\figure\\layout.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", content.src, true, false)+pug_attr("data-pswp-width", content.size.width, true, false)+pug_attr("data-pswp-height", content.size.height, true, false)+" data-pswp-single=\"\" target=\"_blank\"") + "\u003E";
;pug_debug_line = 11;pug_debug_filename = "content\\block\\figure\\layout.pug";
pug_html = pug_html + "\u003Cimg" + (pug_attr("src", content.src, true, false)+" loading=\"lazy\""+pug_attr("data-invert", content.invert, true, false)) + "\u002F\u003E\u003C\u002Fa\u003E";
  break;
case 'video':
;pug_debug_line = 13;pug_debug_filename = "content\\block\\figure\\layout.pug";
pug_html = pug_html + "\u003Cvideo" + (pug_attr("src", content.src, true, false)+" preload=\"metadata\" loop=\"\" muted=\"\" controls=\"\""+pug_attr("data-invert", content.invert, true, false)) + "\u003E\u003C\u002Fvideo\u003E";
  break;
}
};
;pug_debug_line = 15;pug_debug_filename = "content\\block\\figure\\layout.pug";
pug_mixins["figureCaption"] = pug_interp = function(caption){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 16;pug_debug_filename = "content\\block\\figure\\layout.pug";
pug_html = pug_html + "\u003Cfigcaption" + (pug_attr("class", pug_classes([{ centered: caption.centered }], [true]), false, false)) + "\u003E";
;pug_debug_line = 17;pug_debug_filename = "content\\block\\figure\\layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"main\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "content\\block\\figure\\layout.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", caption.link, true, false)) + "\u003E";
;pug_debug_line = 18;pug_debug_filename = "content\\block\\figure\\layout.pug";
pug_html = pug_html + (null == (pug_interp = caption.main) ? "" : pug_interp) + "\u003C\u002Fa\u003E";
;pug_debug_line = 19;pug_debug_filename = "content\\block\\figure\\layout.pug";
if ((caption.link)) {
;pug_debug_line = 20;pug_debug_filename = "content\\block\\figure\\layout.pug";
pug_html = pug_html + "\u003Ci class=\"ic-up-right-from-square\"\u003E\u003C\u002Fi\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 22;pug_debug_filename = "content\\block\\figure\\layout.pug";
if ((caption.secondary)) {
;pug_debug_line = 23;pug_debug_filename = "content\\block\\figure\\layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"secondary\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "content\\block\\figure\\layout.pug";
pug_html = pug_html + (null == (pug_interp = caption.secondary) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Ffigcaption\u003E";
};
;pug_debug_line = 25;pug_debug_filename = "content\\block\\figure\\layout.pug";
pug_html = pug_html + "\u003Cfigure" + (pug_attr("class", pug_classes([classes], [true]), false, false)+pug_attr("data-type", content.type, true, false)+pug_attr("data-uuid", uuid, true, false)+pug_attr("id", id, true, false)) + "\u003E";
;pug_debug_line = 26;pug_debug_filename = "content\\block\\figure\\layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"figureContent\"\u003E";
;pug_debug_line = 27;pug_debug_filename = "content\\block\\figure\\layout.pug";
pug_mixins["figureContent"](content);
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 28;pug_debug_filename = "content\\block\\figure\\layout.pug";
if ((caption)) {
;pug_debug_line = 29;pug_debug_filename = "content\\block\\figure\\layout.pug";
pug_mixins["figureCaption"](caption);
}
;pug_debug_line = 31;pug_debug_filename = "content\\block\\figure\\layout.pug";
pug_html = pug_html + "\u003Cstyle\u003E";
;pug_debug_line = 31;pug_debug_filename = "content\\block\\figure\\layout.pug";
pug_html = pug_html + (null == (pug_interp = widthCss) ? "" : pug_interp) + "\u003C\u002Fstyle\u003E\u003C\u002Ffigure\u003E";
    }.call(this, "caption" in locals_for_with ?
        locals_for_with.caption :
        typeof caption !== 'undefined' ? caption : undefined, "classes" in locals_for_with ?
        locals_for_with.classes :
        typeof classes !== 'undefined' ? classes : undefined, "content" in locals_for_with ?
        locals_for_with.content :
        typeof content !== 'undefined' ? content : undefined, "id" in locals_for_with ?
        locals_for_with.id :
        typeof id !== 'undefined' ? id : undefined, "uuid" in locals_for_with ?
        locals_for_with.uuid :
        typeof uuid !== 'undefined' ? uuid : undefined, "widthCss" in locals_for_with ?
        locals_for_with.widthCss :
        typeof widthCss !== 'undefined' ? widthCss : undefined));
    ;} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;} module.exports = figure;