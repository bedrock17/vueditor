
<template>
  <div class="vueditor" :id="config.id" :class="[{'ve-fullscreen': fullscreen}].concat(config.classList)">
    <ve-toolbar></ve-toolbar>
    <ve-design></ve-design>
    <template v-for="item in list">
      <component v-if="config.toolbar.indexOf(item) !== -1" :tagName="item" :is="'ve-' + item.toLowerCase()"></component>
    </template>
  </div>
</template>

<script>
  import toolbar from './toolbar.vue'
  import design from './design.vue'
  
  import color from './color.vue'
  import fontName from './fontname.vue'
  import fontSize from './fontsize.vue'
  import sourceCode from './sourcecode.vue'
  import code from './code.vue'
  import element from './element.vue'
  import table from './table.vue'
  import undo from './undo.vue'
  import link from './link.vue'
  import picture from './picture.vue'
  import markdown from './markdown.vue'
  import fullscreen from './fullscreen.vue'

  import '../style/style.less'

  export default {
    components: {
      've-toolbar': toolbar,
      've-design': design,
      've-sourcecode': sourceCode,
      've-code': code,
      've-forecolor': color,
      've-backcolor': color,
      've-fontname': fontName,
      've-fontsize': fontSize,
      've-element': element,
      've-table': table,
      've-link': link,
      've-undo': undo,
      've-picture': picture,
      've-markdown': markdown,
      've-fullscreen': fullscreen
    },
    computed: {
      fullscreen: function () {
        return this.$store.state.fullscreen
      }
    },
    methods: {
      setContent (content) {
        this.$store.dispatch('updateContent', content)
      },
      getContent () {
        return this.$store.state.content
      },

      //font
      getFontList () {
        let arr = []
        this.config.fontName.forEach(item => {
          arr.push(item.val)
        })
        return arr
      },
      getFont () {
        return this.$store.state.toolbar.fontName.value
      },
      setFont (font) { //string 
        let val = font
        this.$store.dispatch('execCommand', {name: 'fontName', value: val + ', sans-serif'})
        this.$store.dispatch('updateSelectValue', {name: 'fontName', value: val})
        this.$store.dispatch('updatePopupDisplay')
      },

      //font-size
      getFontSizeList() {
        let arr = []
        this.config.fontSize.forEach(item => {
          arr.push(item)
        })
        return arr
      },
      getFontSize () {
        return this.$store.state.toolbar.fontSize.value
      },
      setFontSize (size) {
        this.$store.dispatch('execCommand', {name: 'fontSize', value: size})
        this.$store.dispatch('updateSelectValue', {name: 'fontSize', value: size})
        this.$store.dispatch('updatePopupDisplay')
      },

      //code
      getCodeTypeList () {
        let arr = []
        this.config.code.forEach(item => {
          arr.push(item)
        })
        return arr
      },
      getCodeType () {
        return this.state.toolbar.code.value
      },
      setCodeType (type) {
        this.$store.dispatch('execCommand', {name: 'insertHTML', value: this.tpl.replace(/#type#/igm, type)})
        this.$store.dispatch('updateSelectValue', {name: 'code', value: type})
        this.$store.dispatch('updatePopupDisplay')
      },

      //color
      setFrontColorCode (color) {
        this.$store.dispatch('execCommand', {name: 'foreColor', value: color})
      },
      setBackColorCode (color) {
        this.$store.dispatch('execCommand', {name: 'backColor', value: color})
      },

      //table
      createTable(rows, cols) {
        let html = ((rows, cols) => {
          let oTable = document.createElement('table')
          let oTbody = document.createElement('tbody')
          oTable.style.cssText = 'border-collapse: collapse;'
          oTable.appendChild(oTbody)
          for (let i = 0; i < rows; i++) {
            let tr = document.createElement('tr')
            for (let j = 0; j < cols; j++) {
              let td = document.createElement('td')
              td.innerHTML = '<br>'
              td.style.cssText = 'width: 50px; border: 1px #ddd solid;'
              tr.appendChild(td)
            }
            oTbody.appendChild(tr)
          }
          return oTable.outerHTML
        })(rows, cols)

        this.$store.dispatch('execCommand', { name: 'insertHTML', value: html })
        this.$store.dispatch('updatePopupDisplay')
      },

      //Tag
      getTagList () {
        return ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
      },
      getTag () {
        return this.$store.state.toolbar.element.value
      },
      setTag (tagName) { //string
        this.$store.dispatch('execCommand', {name: 'formatBlock', value: tagName})
        this.$store.dispatch('updateSelectValue', {name: 'element', value: tagName})
        this.$store.dispatch('updatePopupDisplay')
      },      


    }
  }
</script>