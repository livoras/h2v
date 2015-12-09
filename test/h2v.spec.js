/* global describe, it */

var h2v = require('../index.js')
var chai = require('chai')
var fs = require('fs')

chai.should()

var jsdom = require('mocha-jsdom')
jsdom()

describe('Make virtual-dom from html', function () {
  it('Making a single root.', function () {
    var el = h2v('<ul></ul>')
    el.tagName.should.be.equal('ul')
  })

  it('If has multiple roots, make a div wrapp them all.', function () {
    var el = h2v('<ul></ul><p></p>')
    el.tagName.should.be.equal('div')
  })

  it('DOM\'s innerHTML generated from virtual-dom should be the same with original html string', function () {
    var breakREG = /\\r\\n/g
    var htmls = [
      fs.readFileSync(__dirname + '/fixtures/test1.html', 'utf-8'),
      fs.readFileSync(__dirname + '/fixtures/test2.html', 'utf-8'),
      fs.readFileSync(__dirname + '/fixtures/test3.html', 'utf-8')
    ]
    for (var i = 0, len = htmls.length; i < len; i++) {
      var htmlString = htmls[i]
      var el = h2v(htmlString)
      var dom = el.render()
      var div = document.createElement('div')
      div.appendChild(dom)
      var domString = div.innerHTML.replace(breakREG, '\\n')
      htmlString = htmlString.replace(/\r\n/g, '\n')
      domString.length.should.be.equal(htmlString.length)
      domString.should.be.equal(htmlString)
    }
  })
})
