function pug_rethrow(e,n,r,t){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&n||t))throw e.message+=" on line "+r,e;var o,a,i,s;try{t=t||require("fs").readFileSync(n,{encoding:"utf8"}),o=3,a=t.split("\n"),i=Math.max(r-o,0),s=Math.min(a.length,r+o)}catch(t){return e.message+=" - could not read from "+n+" ("+t.message+")",void pug_rethrow(e,null,r)}o=a.slice(i,s).map(function(e,n){var t=n+i+1;return(t==r?"  > ":"    ")+t+"| "+e}).join("\n"),e.path=n;try{e.message=(n||"Pug")+":"+r+"\n"+o+"\n\n"+e.message}catch(e){}throw e}function array(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;
    var locals_for_with = (locals || {});
    
    (function (items) {
      ;pug_debug_line = 1;pug_debug_filename = "content\\block\\array\\layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"array\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "content\\block\\array\\layout.pug";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var item = $$obj[pug_index0];
;pug_debug_line = 3;pug_debug_filename = "content\\block\\array\\layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"item\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "content\\block\\array\\layout.pug";
pug_html = pug_html + (null == (pug_interp = item) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var item = $$obj[pug_index0];
;pug_debug_line = 3;pug_debug_filename = "content\\block\\array\\layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"item\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "content\\block\\array\\layout.pug";
pug_html = pug_html + (null == (pug_interp = item) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
    }.call(this, "items" in locals_for_with ?
        locals_for_with.items :
        typeof items !== 'undefined' ? items : undefined));
    ;} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;} module.exports = array;