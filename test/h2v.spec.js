/* global describe, it */

var h2v = require('../index.js')
var chai = require('chai')

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
})
