'use strict'
const TestRunner = require('test-runner')
const cp = require('child_process')
const fs = require('fs')
const hbjs = require('../')
const a = require('assert')
const Counter = require('test-runner-counter')

const runner = new TestRunner()

runner.test('cli: --preset-list', function () {
  const counter = Counter.create(1)
  cp.exec('node bin/cli.js --preset-list', function (err, stdout, stderr) {
    if (err) {
      counter.fail(stderr)
    } else {
      counter.pass()
    }
  })
  return counter.promise
})

runner.test('cli: simple encode', function () {
  const counter = Counter.create(1)
  try {
    fs.mkdirSync('tmp')
  } catch (err) {
    // dir already exists
  }
  cp.exec('node bin/cli.js -i test/video/demo.mkv -o tmp/test.mp4 --rotate angle=90:hflip=1 -v', function (err, stdout, stderr) {
    if (err) {
      counter.fail(stderr)
    } else {
      a.ok(/avfilter \(transpose='dir=clock_flip'\)/.test(stdout))
      counter.pass()
    }
  })
  return counter.promise
})

runner.test('exec: --preset-list', function () {
  const counter = Counter.create(1)
  hbjs.exec({ 'preset-list': true }, function (err, stdout, stderr) {
    if (err) {
      counter.fail(stderr)
    } else if (/Devices/.test(stderr)) {
      counter.pass()
    }
  })
  return counter.promise
})

runner.test('.cancel()', function () {
  const counter = Counter.create(1)
  const handbrake = hbjs.spawn({ input: 'test/video/demo.mkv', output: 'tmp/cancelled.mp4' })
  handbrake.on('begin', function () {
    handbrake.cancel()
  })
  handbrake.on('cancelled', function () {
    counter.pass()
  })
  return counter.promise
})
