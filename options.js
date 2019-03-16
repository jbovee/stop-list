function save_options() {
  var color = parseInt(document.getElementById('index').value);
  var focus = (document.getElementById('tab-focus').value === "true");
  chrome.storage.local.set({
    startIndex: color,
    tabFocus: focus,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.local.get({
    startIndex: 0,
    tabFocus: true,
  }, function(items) {
  	document.getElementById('index').value = items.startIndex;
  	document.getElementById('tab-focus').value = items.tabFocus;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);