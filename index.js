var svd = require('simple-virtual-dom')
var el = svd.el

function h2v (html) {
  var root = document.createElement('div')
  root.innerHTML = html
  root = (root.childNodes.length === 1)
    ? root.childNodes[0]
    : root
  return toVirtualDOM(root)
}

function toVirtualDOM (dom) {
  var tagName = dom.tagName.toLowerCase()
  var props = attrToObj(dom)
  var children = []
  for (var i = 0, len = dom.childNodes.length; i < len; i++) {
    var node = dom.childNodes[i]
    // TEXT node
    if (node.type === 3) {
      if (node.nodeValue) {
        children.push(node.nodeValue)
      } else {
        children.push(node.textContent)
      }
    } else {
      children.push(toVirtualDOM(node))
    }
  }
  return el(tagName, props, children)
}

function attrToObj (dom) {
  var attrs = dom.attributes
  var props = {}
  for (var i = 0, len = attrs.length; i < len; i++) {
    var name = attrs[i].name
    var value = attrs[i].value
    props[name] = value
  }
  return props
}

module.exports = h2v
