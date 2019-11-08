
let defaultToolbar = {

    btns: {
        removeFormat:           {btnId: 've-toolbar-eraser'       , className: 'icon-eraser'       , action: 'removeFormat'         , native: true  , mobileDisplay: false},
        bold:                   {btnId: 've-toolbar-bold'         , className: 'icon-bold'         , action: 'bold'                 , native: true  , mobileDisplay: true},
        italic:                 {btnId: 've-toolbar-italic'       , className: 'icon-italic'       , action: 'italic'               , native: true  , mobileDisplay: true},
        underline:              {btnId: 've-toolbar-underline'    , className: 'icon-underline'    , action: 'underline'            , native: true  , mobileDisplay: true},
        strikeThrough:          {btnId: 've-toolbar-strikethrough', className: 'icon-strikethrough', action: 'strikeThrough'        , native: true  , mobileDisplay: true},
        superscript:            {btnId: 've-toolbar-superscript'  , className: 'icon-superscript'  , action: 'superscript'          , native: true  , mobileDisplay: false},
        subscript:              {btnId: 've-toolbar-subscript'    , className: 'icon-subscript'    , action: 'subscript'            , native: true  , mobileDisplay: false},
        indent:                 {btnId: 've-toolbar-indent'       , className: 'icon-indent'       , action: 'indent'               , native: true  , mobileDisplay: true},
        outdent:                {btnId: 've-toolbar-outdent'      , className: 'icon-outdent'      , action: 'outdent'              , native: true  , mobileDisplay: true},
        justifyLeft:            {btnId: 've-toolbar-align-left'   , className: 'icon-align-left'   , action: 'justifyLeft'          , native: true  , mobileDisplay: true},
        justifyCenter:          {btnId: 've-toolbar-align-center' , className: 'icon-align-center' , action: 'justifyCenter'        , native: true  , mobileDisplay: true},
        justifyRight:           {btnId: 've-toolbar-align-right'  , className: 'icon-align-right'  , action: 'justifyRight'         , native: true  , mobileDisplay: true},
        justifyFull:            {btnId: 've-toolbar-align-justify', className: 'icon-align-justify', action: 'justifyFull'          , native: true  , mobileDisplay: true},
        insertOrderedList:      {btnId: 've-toolbar-list-ol'      , className: 'icon-list-ol'      , action: 'insertOrderedList'    , native: true  , mobileDisplay: true},
        insertUnorderedList:    {btnId: 've-toolbar-list-ul'      , className: 'icon-list-ul'      , action: 'insertUnorderedList'  , native: true  , mobileDisplay: true},
        foreColor:              {btnId: 've-toolbar-file-text-o'  , className: 'icon-file-text-o'                                                   , mobileDisplay: true},
        backColor:              {btnId: 've-toolbar-file-text'    , className: 'icon-file-text'                                                     , mobileDisplay: true},
        link:                   {btnId: 've-toolbar-link'         , className: 'icon-link'                                                          , mobileDisplay: true},
        unLink:                 {btnId: 've-toolbar-unlink'       , className: 'icon-unlink'       , action: 'unLink'                               , mobileDisplay: true},
        markdown:               {btnId: 've-toolbar-markdown'     , className: 'icon-markdown'     , action: 'markdown'                             , mobileDisplay: true},
        picture:                {btnId: 've-toolbar-file-image-o' , className: 'icon-file-image-o'                                                  , mobileDisplay: true},
        sourceCode:             {btnId: 've-toolbar-code'         , className: 'icon-code'         , action: 'sourceCode'                           , mobileDisplay: true},
        table:                  {btnId: 've-toolbar-table'        , className: 'icon-table'                                                         , mobileDisplay: false},
        undo:                   {btnId: 've-toolbar-undo'         , className: 'icon-undo'         , action: 'undo'                                 , mobileDisplay: true},
        redo:                   {btnId: 've-toolbar-redo'         , className: 'icon-repeat'       , action: 'redo'                                 , mobileDisplay: true},
        fullscreen:             {btnId: 've-toolbar-fullscreen'   , className: 'icon-fullscreen'   , action: 'fullscreen'                           , mobileDisplay: false}
    },

    selects: {
        fontName:               {btnId: 've-toolbar-font-select'  , className: 'font-select'                                                        , mobileDisplay: true},
        fontSize:               {btnId: 've-toolbar-font-size'    , className: ''                                                                   , mobileDisplay: true},
        element:                {btnId: 've-toolbar-element'      , className: ''                                                                   , mobileDisplay: true},
        code:                   {btnId: 've-toolbar-code-select'  , className: 'code-select'                                                        , mobileDisplay: true}
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
