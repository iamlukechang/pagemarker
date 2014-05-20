// store the statuses of each activated pagemarker
var pagemarkerConf = {};

chrome.browserAction.onClicked.addListener(function (tab) {
  // Doesn't work for chrome pdf viewer
  if (_isSupported(tab)) {
    // execute the main content script
    chrome.tabs.executeScript(null, {file: "contentscript.js"});
  } else{
    // execute the alert script
    /*
    chrome.tabs.insertCSS(null, {file: "alert.css"});
    chrome.tabs.executeScript(null, {file: "alert.js"});
    */
  }
});

// receive the change icon message from content script
chrome.runtime.onMessage.addListener(function (req, sender, sendRes) {
  // update the pagemarkerConf and icon 
  pagemarkerConf[sender.tab.id] = req.OnOff;
  _updateIcon(req.OnOff);
});

// create the data in pagemarkerConf
chrome.tabs.onCreated.addListener(function (tab) {
  _updateIcon("OFF");
});

// remove the data in pagemarkerConf
chrome.tabs.onRemoved.addListener(function (tabId) {
  delete pagemarkerConf[tabId];
});

// update the icon when a tab is activated
chrome.tabs.onActivated.addListener(function (info) {
  if (pagemarkerConf[info.tabId]) {
    _updateIcon(pagemarkerConf[info.tabId]);
  } else {
    _updateIcon("OFF");
  }
});

// the pagemarker is off when page is reload
// set a counter to avoid the onUpdated multiple fire problem
var counter = 0;
chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
  if (tab.url !== undefined && info.status == "loading") {
    counter++;
    // update the icon and pagemarkerConf object only on the first "loading"
    if (counter == 1) {
      if (pagemarkerConf[tabId]) pagemarkerConf[tabId] = "OFF";
      _updateIcon("OFF");
    }
  } else if (info.status == "complete") {
    counter = 0;
  }
});

// disable the pagemarker
function _isSupported(tab){
  if (/\.pdf$/gi.test(tab.url)) return false;
  
  return true;
}

// update the icon
function _updateIcon(OnOff) {
  chrome.browserAction.setIcon({path:"Pagemarker19_" + OnOff + ".png"});
}
