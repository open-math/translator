function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(e,n,r,t){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&n||t))throw e.message+=" on line "+r,e;var o,a,i,s;try{t=t||require("fs").readFileSync(n,{encoding:"utf8"}),o=3,a=t.split("\n"),i=Math.max(r-o,0),s=Math.min(a.length,r+o)}catch(t){return e.message+=" - could not read from "+n+" ("+t.message+")",void pug_rethrow(e,null,r)}o=a.slice(i,s).map(function(e,n){var t=n+i+1;return(t==r?"  > ":"    ")+t+"| "+e}).join("\n"),e.path=n;try{e.message=(n||"Pug")+":"+r+"\n"+o+"\n\n"+e.message}catch(e){}throw e}function secondary(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;
    var locals_for_with = (locals || {});
    
    (function (content, contentType, icon, title) {
      ;pug_debug_line = 1;pug_debug_filename = "content\\block\\secondary\\layout.pug";
pug_html = pug_html + "\u003Csection" + (" class=\"secondary\""+pug_attr("data-type", contentType, true, false)) + "\u003E";
;pug_debug_line = 2;pug_debug_filename = "content\\block\\secondary\\layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"icon\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "content\\block\\secondary\\layout.pug";
pug_html = pug_html + "\u003Cimg" + (pug_attr("src", icon, true, false)) + "\u002F\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 5;pug_debug_filename = "content\\block\\secondary\\layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"dataContainer\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "content\\block\\secondary\\layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"triangle\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 7;pug_debug_filename = "content\\block\\secondary\\layout.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 8;pug_debug_filename = "content\\block\\secondary\\layout.pug";
pug_html = pug_html + "\u003Cimg" + (pug_attr("src", icon, true, false)) + "\u002F\u003E";
;pug_debug_line = 9;pug_debug_filename = "content\\block\\secondary\\layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"title\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "content\\block\\secondary\\layout.pug";
pug_html = pug_html + (null == (pug_interp = title) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 10;pug_debug_filename = "content\\block\\secondary\\layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "content\\block\\secondary\\layout.pug";
pug_html = pug_html + (null == (pug_interp = content) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E";
    }.call(this, "content" in locals_for_with ?
        locals_for_with.content :
        typeof content !== 'undefined' ? content : undefined, "contentType" in locals_for_with ?
        locals_for_with.contentType :
        typeof contentType !== 'undefined' ? contentType : undefined, "icon" in locals_for_with ?
        locals_for_with.icon :
        typeof icon !== 'undefined' ? icon : undefined, "title" in locals_for_with ?
        locals_for_with.title :
        typeof title !== 'undefined' ? title : undefined));
    ;} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;} module.exports = secondary;