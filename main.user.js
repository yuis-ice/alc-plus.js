// ==UserScript==
// @name         ALC double click behavior for blank
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://eowp.alc.co.jp/*
// @match        https://eow.alc.co.jp/*
// @run-at       document-idle
// @noframes
// ==/UserScript==


// overwrite the function
function seow() {
  // 拡張検索側でダブルクリック検索が有効になっている場合はアクションしない
  if(obj=document.getElementById('exdbl')){
    if(obj.value == 'true'){
      return;
    }
  }
  var u2 = '&ref=' + REF_WL;
  var u9 = 'q=&ref';
  var bt = navigator.userAgent.indexOf('MSIE');
  var wn = WINDOW_NAME_OPTION;

  // changed
  // 参照ページのウィンドウ設定
  // if (HREF_STATUS == "0") {
  //  wn = "_self";
  // } else if (HREF_STATUS == "2") {
  //  wn = "_blank";
  // }

  // always _blank
  wn = "_blank";

  // ダブルクリック設定
  if (DBLCLICK_STATUS == "1") {
    var s = '';
    if (bt == -1) {
      s = String(getSelection()).replace(/｛.*｝/,'');
    } else {
      s = document.selection.createRange().text.replace(/｛.*｝/,'');
    }
    if ((!s)||(s == '')||(s == ' ')||(s == '.')) {
      void(0);
    } else {
      var u_op = SEARCH_URI + "?q=" + encodeURL(trim(s)) + u2;
      if (u_op.indexOf(u9) > -1) {
        void(0);
      } else {
        void(openWindow(u_op,wn));
      }
    }
  }
};

// inject the function to the end of html

addJS_Node (seow);

function addJS_Node (text, s_URL, funcToRun, runOnLoad) {
    var D                                   = document;
    var scriptNode                          = D.createElement ('script');
    if (runOnLoad) {
        scriptNode.addEventListener ("load", runOnLoad, false);
    }
    scriptNode.type                         = "text/javascript";
    if (text)       scriptNode.textContent  = text;
    if (s_URL)      scriptNode.src          = s_URL;
    if (funcToRun)  scriptNode.textContent  = '(' + funcToRun.toString() + ')()';

    var targ = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    targ.appendChild (scriptNode);
}
