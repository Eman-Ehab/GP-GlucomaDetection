/*
 * JavaScript Load Image Demo JS
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global loadImage, HTMLCanvasElement, $ */

$(function () {
  'use strict'

  var result = $('#result')
  var exifNode = $('#exif')
  var iptcNode = $('#iptc')
  var thumbNode = $('#thumbnail')
  var actionsNode = $('#actions')
  var currentFile
  var coordinates
  var jcropAPI

  function updateResults (img, data) {
    var fileName = currentFile.name
    var href = img.src
    var dataURLStart
    var content
    if (!(img.src || img instanceof HTMLCanvasElement)) {
      content = $('<span>Loading image file failed</span>')
    } else {
      if (!href) {
        href = img.toDataURL(currentFile.type + 'REMOVEME')
        // Check if file type is supported for the dataURL export:
        dataURLStart = 'data:' + currentFile.type
        if (href.slice(0, dataURLStart.length) !== dataURLStart) {
          fileName = fileName.replace(/\.\w+$/, '.png')
        }
      }
      content = $('<a target="_blank">')
        .append(img)
        .attr('download', fileName)
        .attr('href', href)
    }
    result.children().replaceWith(content)
    if (img.getContext) {
      actionsNode.show()
    }
    displayMetaData(data)
  }

  function displayImage (file, options) {
    currentFile = file
    if (!loadImage(file, updateResults, options)) {
      result
        .children()
        .replaceWith(
          $(
            '<span>' +
              'Your browser does not support the URL or FileReader API.' +
              '</span>'
          )
        )
    }
  }

 function dropChangeHandler (e) {
    e.preventDefault()
    e = e.originalEvent
    var target = e.dataTransfer || e.target
    var file = target && target.files && target.files[0]
    var options = {
      maxWidth: result.width(),
      canvas: true,
      pixelRatio: window.devicePixelRatio,
      downsamplingRatio: 0.5,
      orientation: true
    }
    if (!file) {
      return
    }
    exifNode.hide()
    iptcNode.hide()
    thumbNode.hide()
    displayImage(file, options)
  }

  // Hide URL/FileReader API requirement message in capable browsers:
  if (
    window.createObjectURL ||
    window.URL ||
    window.webkitURL ||
    window.FileReader
  ) {
    result.children().hide()
  }

  $(document)
    .on('dragover', function (e) {
      e.preventDefault()
      e = e.originalEvent
      e.dataTransfer.dropEffect = 'copy'
    })
    .on('drop', dropChangeHandler)

  $('#file-input').on('change', dropChangeHandler)


})
