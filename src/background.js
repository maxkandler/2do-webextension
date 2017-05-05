'use strict';

function createTask(chrome, title, note) {
  let task = 'twodo://x-callback-url/add?task=' + encodeURI(title) + '&note=' + encodeURI(note);
  chrome.tabs.update({
   url: task
  });
}
chrome.browserAction.onClicked.addListener(function(aTab) {
  chrome.tabs.executeScript(aTab.id, {

    code: "window.getSelection().toString()"

  }, function(selectedText) {

    let title = aTab.title;
    let note = aTab.url;

    if (selectedText instanceof Array && selectedText.length > 0) {
      selectedText = selectedText[0];
    }

    if (selectedText && selectedText.length) {
      note = note + "\n--\n" + selectedText;
    }

    createTask(chrome, title, note);

  });
});