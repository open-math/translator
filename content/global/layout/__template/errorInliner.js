function pug_rethrow(e,n,r,t){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&n||t))throw e.message+=" on line "+r,e;var o,a,i,s;try{t=t||require("fs").readFileSync(n,{encoding:"utf8"}),o=3,a=t.split("\n"),i=Math.max(r-o,0),s=Math.min(a.length,r+o)}catch(t){return e.message+=" - could not read from "+n+" ("+t.message+")",void pug_rethrow(e,null,r)}o=a.slice(i,s).map(function(e,n){var t=n+i+1;return(t==r?"  > ":"    ")+t+"| "+e}).join("\n"),e.path=n;try{e.message=(n||"Pug")+":"+r+"\n"+o+"\n\n"+e.message}catch(e){}throw e}function errorInliner(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;
    var locals_for_with = (locals || {});
    
    (function (error) {
      ;pug_debug_line = 1;pug_debug_filename = "content\\inliner\\errorInliner\\layout.pug";
pug_html = pug_html + "\u003Cspan class=\"errorInliner\"\u003E";
;pug_debug_line = 1;pug_debug_filename = "content\\inliner\\errorInliner\\layout.pug";
pug_html = pug_html + (null == (pug_interp = error.message) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
    }.call(this, "error" in locals_for_with ?
        locals_for_with.error :
        typeof error !== 'undefined' ? error : undefined));
    ;} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;} module.exports = errorInliner;