'use strict';

function createTask(title, note) {
  let task = 'twodo://x-callback-url/add?task=' + encodeURI(title) + '&note=' + encodeURI(note);

  //
  let iFrame = document.createElement("iframe");
  iFrame.src = task;

  document.body.appendChild(iFrame);
  document.body.removeChild(iFrame);
}


chrome.browserAction.onClicked.addListener(function (aTab) {

  chrome.tabs.executeScript(aTab.id, {

    code: "window.getSelection().toString()"

  }, function (selectedText) {

    let title = aTab.title;
    let note = aTab.url;

    if (selectedText && selectedText.length) {
      note = note + "\n--\n" + selectedText;
    }

    createTask(title, note);

  });

});
