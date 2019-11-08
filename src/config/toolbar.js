
let defaultToolbar = {

  btns: {
    removeFormat: {className: 'icon-eraser', action: 'removeFormat', native: true, mobileDisplay: false},
    bold: {className: 'icon-bold', action: 'bold', native: true, mobileDisplay: true},
    italic: {className: 'icon-italic', action: 'italic', native: true, mobileDisplay: true},
    underline: {className: 'icon-underline', action: 'underline', native: true, mobileDisplay: true},
    strikeThrough: {className: 'icon-strikethrough', action: 'strikeThrough', native: true, mobileDisplay: true},
    superscript: {className: 'icon-superscript', action: 'superscript', native: true, mobileDisplay: false},
    subscript: {className: 'icon-subscript', action: 'subscript', native: true, mobileDisplay: false},
    indent: {className: 'icon-indent', action: 'indent', native: true, mobileDisplay: true},
    outdent: {className: 'icon-outdent', action: 'outdent', native: true, mobileDisplay: true},
    justifyLeft: {className: 'icon-align-left', action: 'justifyLeft', native: true, mobileDisplay: true},
    justifyCenter: {className: 'icon-align-center', action: 'justifyCenter', native: true, mobileDisplay: true},
    justifyRight: {className: 'icon-align-right', action: 'justifyRight', native: true, mobileDisplay: true},
    justifyFull: {className: 'icon-align-justify', action: 'justifyFull', native: true, mobileDisplay: true},
    insertOrderedList: {className: 'icon-list-ol', action: 'insertOrderedList', native: true, mobileDisplay: true},
    insertUnorderedList: {className: 'icon-list-ul', action: 'insertUnorderedList', native: true, mobileDisplay: true},
    foreColor: {className: 'icon-file-text-o', mobileDisplay: true},
    backColor: {className: 'icon-file-text', mobileDisplay: true},
    link: {className: 'icon-link', mobileDisplay: true},
    unLink: {className: 'icon-unlink', action: 'unLink', mobileDisplay: true},
    markdown: {className: 'icon-markdown', action: 'markdown', mobileDisplay: true},
    picture: {className: 'icon-file-image-o', mobileDisplay: true},
    sourceCode: {className: 'icon-code', action: 'sourceCode', mobileDisplay: true},
    table: {className: 'icon-table', mobileDisplay: false},
    undo: {className: 'icon-undo', action: 'undo', mobileDisplay: true},
    redo: {className: 'icon-repeat', action: 'redo', mobileDisplay: true},
    fullscreen: {className: 'icon-fullscreen', action: 'fullscreen', mobileDisplay: false}
  },

  selects: {
    fontName: {className: 'font-select'},
    fontSize: {className: ''},
    element: {className: ''},
    code: {className: 'code-select'}
  }

}

let toolbar = JSON.parse(JSON.stringify(defaultToolbar))

export default {
  resetToolbar () {
    toolbar = JSON.parse(JSON.stringify(defaultToolbar))
  },
  modifyToolbar (name, element) {
    if (element.type === 'button') {
      toolbar.btns[name] = {
        className: element.className
      }
      element.action && (toolbar.btns[name].action = element.action)
    } else {
      toolbar.selects[name] = {
        className: element.className
      }
    }
  },
  getToolbar () {
    return toolbar
  }
}
