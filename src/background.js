'use strict';

function createTask(chrome, title, note, url) {
  let task = 'twodo://x-callback-url/add?task=' + encodeURI(title) + '&note=' + encodeURI(note) + '&action=url:' + encodeURI(url);
  chrome.tabs.update({
   url: task
  });
}
chrome.browserAction.onClicked.addListener(function(aTab) {
  chrome.tabs.executeScript(aTab.id, {

    code: "window.getSelection().toString()"

  }, function(selectedText) {

    let title = aTab.title;
    let url = aTab.url;
    let note = '';

    if (selectedText instanceof Array && selectedText.length > 0) {
      selectedText = selectedText[0];
    }

    if (selectedText && selectedText.length) {
      note = selectedText;
    }

    createTask(chrome, title, note, url);

  });
});
