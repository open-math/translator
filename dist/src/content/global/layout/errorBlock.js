function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(e,n,r,t){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&n||t))throw e.message+=" on line "+r,e;var o,a,i,s;try{t=t||require("fs").readFileSync(n,{encoding:"utf8"}),o=3,a=t.split("\n"),i=Math.max(r-o,0),s=Math.min(a.length,r+o)}catch(t){return e.message+=" - could not read from "+n+" ("+t.message+")",void pug_rethrow(e,null,r)}o=a.slice(i,s).map(function(e,n){var t=n+i+1;return(t==r?"  > ":"    ")+t+"| "+e}).join("\n"),e.path=n;try{e.message=(n||"Pug")+":"+r+"\n"+o+"\n\n"+e.message}catch(e){}throw e}function errorBlock(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;
    var locals_for_with = (locals || {});
    
    (function (code, error, i18n) {
      ;pug_debug_line = 1;pug_debug_filename = "content\\block\\errorBlock\\layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"errorBlock\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "content\\block\\errorBlock\\layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"title\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "content\\block\\errorBlock\\layout.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = i18n('error')) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 3;pug_debug_filename = "content\\block\\errorBlock\\layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"errorMsg\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "content\\block\\errorBlock\\layout.pug";
pug_html = pug_html + (null == (pug_interp = error.message) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 4;pug_debug_filename = "content\\block\\errorBlock\\layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"strBlock\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "content\\block\\errorBlock\\layout.pug";
pug_html = pug_html + "\u003Cpre\u003E";
;pug_debug_line = 6;pug_debug_filename = "content\\block\\errorBlock\\layout.pug";
pug_html = pug_html + "\u003Ccode\u003E";
;pug_debug_line = 6;pug_debug_filename = "content\\block\\errorBlock\\layout.pug";
pug_html = pug_html + (null == (pug_interp = code) ? "" : pug_interp) + "\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
    }.call(this, "code" in locals_for_with ?
        locals_for_with.code :
        typeof code !== 'undefined' ? code : undefined, "error" in locals_for_with ?
        locals_for_with.error :
        typeof error !== 'undefined' ? error : undefined, "i18n" in locals_for_with ?
        locals_for_with.i18n :
        typeof i18n !== 'undefined' ? i18n : undefined));
    ;} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;} module.exports = errorBlock;