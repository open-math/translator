function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)(s=pug_classes(r[g]))&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_rethrow(e,n,r,t){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&n||t))throw e.message+=" on line "+r,e;var o,a,i,s;try{t=t||require("fs").readFileSync(n,{encoding:"utf8"}),o=3,a=t.split("\n"),i=Math.max(r-o,0),s=Math.min(a.length,r+o)}catch(t){return e.message+=" - could not read from "+n+" ("+t.message+")",void pug_rethrow(e,null,r)}o=a.slice(i,s).map(function(e,n){var t=n+i+1;return(t==r?"  > ":"    ")+t+"| "+e}).join("\n"),e.path=n;try{e.message=(n||"Pug")+":"+r+"\n"+o+"\n\n"+e.message}catch(e){}throw e}
function pug_style(r){if(!r)return"";if("object"==typeof r){var t="";for(var e in r)pug_has_own_property.call(r,e)&&(t=t+e+":"+r[e]+";");return t}return r+""}function image(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;
    var locals_for_with = (locals || {});
    
    (function (caption, classes, height, id, invertible, maxWidth, src, width) {
      ;pug_debug_line = 1;pug_debug_filename = "content\\block\\image\\layout.pug";
pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes(["image",classes], [false,true]), false, false)+pug_attr("id", id, true, false)) + "\u003E";
;pug_debug_line = 2;pug_debug_filename = "content\\block\\image\\layout.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", src, true, false)+pug_attr("data-pswp-width", width, true, false)+pug_attr("data-pswp-height", height, true, false)+" data-pswp-single=\"\" target=\"_blank\"") + "\u003E";
;pug_debug_line = 3;pug_debug_filename = "content\\block\\image\\layout.pug";
pug_html = pug_html + "\u003Cimg" + (pug_attr("src", src, true, false)+" loading=\"lazy\""+pug_attr("data-invertible", invertible ? '' : null, true, false)+pug_attr("style", pug_style(maxWidth ? `width: 100%; max-width: ${maxWidth}px` : null), true, false)) + "\u002F\u003E\u003C\u002Fa\u003E";
;pug_debug_line = 5;pug_debug_filename = "content\\block\\image\\layout.pug";
if ((caption)) {
;pug_debug_line = 6;pug_debug_filename = "content\\block\\image\\layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"caption\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "content\\block\\image\\layout.pug";
pug_html = pug_html + (null == (pug_interp = caption) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
    }.call(this, "caption" in locals_for_with ?
        locals_for_with.caption :
        typeof caption !== 'undefined' ? caption : undefined, "classes" in locals_for_with ?
        locals_for_with.classes :
        typeof classes !== 'undefined' ? classes : undefined, "height" in locals_for_with ?
        locals_for_with.height :
        typeof height !== 'undefined' ? height : undefined, "id" in locals_for_with ?
        locals_for_with.id :
        typeof id !== 'undefined' ? id : undefined, "invertible" in locals_for_with ?
        locals_for_with.invertible :
        typeof invertible !== 'undefined' ? invertible : undefined, "maxWidth" in locals_for_with ?
        locals_for_with.maxWidth :
        typeof maxWidth !== 'undefined' ? maxWidth : undefined, "src" in locals_for_with ?
        locals_for_with.src :
        typeof src !== 'undefined' ? src : undefined, "width" in locals_for_with ?
        locals_for_with.width :
        typeof width !== 'undefined' ? width : undefined));
    ;} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;} module.exports = image;