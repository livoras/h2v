var svd = require('simple-virtual-dom')
var el = svd.el

function h2v (html) {
  var root = document.createElement('div')
  root.innerHTML = html
  root = (root.childNodes.length === 1)
    ? root.childNodes[0]
    : root
  return el(root.tagName.toLowerCase())
}

module.exports = h2v
