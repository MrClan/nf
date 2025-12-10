// No modern JS. Only basic navigation support for anchor links.
function goToAnchor(anchor) {
  if (document.getElementById(anchor)) {
    location.hash = anchor;
  }
}
// No menu toggle or advanced features for legacy browsers.