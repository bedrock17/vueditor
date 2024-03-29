
<style lang="less" rel="stylesheet/less">
    .ve-toolbar {
        display: table;
        width: 100%;
        font-size: 0;
        letter-spacing: -4px;
        background: #fff;
        border-bottom: 1px solid #ddd;
        user-select: none;
        div {
            cursor: pointer;
            position: relative;
            display: inline-block;
            padding: 10px 12px;
            color: rgba(0, 0, 0, 0.6);
        }
        div.ve-divider {
            width: 0;
            height: 26px;
            margin: 5px;
            padding: 0;
            border-right: 1px solid #ddd;
            vertical-align: top;
        }
        div.ve-active {
            background: #eee;
            color: #000;
        }
        div:hover {
            background: #eee;
        }
        div.ve-disabled {
            background: transparent;
            color: rgba(0,0,0,.6);
        }

        @media all and (max-width:768px) {
            div.ve-desktop {
                display: none;
            }    
        }
        
    }
    .font-select {
        width: 100px;
        span {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
    .code-select {
        width: 80px;
    }
</style>

<template>
<div class="ve-toolbar" ref="toolbar">
    <template v-for="item in config">
        <div v-if="item in btns" 
            @click.stop.prevent="btnHandler($event, item)" 
            :id="btns[item].btnId"
            :title="lang[item].title"
            :class="{
                've-active': states[item].status == 'actived',
                've-disabled': states[item].status == 'disabled',
                've-desktop' : btns[item].mobileDisplay == false
                }" 
            unselectable="on">
            <i :class="[btns[item].className]"></i>
        </div>
            <div v-if="item in selects" 
            @click.stop.prevent="selectHandler($event, item)" 
            :id="selects[item].btnId"
            :class="[{'ve-disabled': states[item].status == 'disabled'},
                selects[item].className,
                've-select']" 
            unselectable="on">
            <span>{{states[item].value}}</span><i :class="{'ve-triangle-down': !states[item].display, 've-triangle-up': states[item].display}"></i>
        </div>
        <div class="ve-divider" v-if="item == 'divider' || item == '|'"></div>
    </template>

</div>
</template>

<script>
  import { getLang } from '../config/lang.js'
  import { getToolbar } from '../config/toolbar.js'
  import { getConfig } from '../config/index.js'

  export default {
    data () {
      let {btns, selects} = getToolbar()
      return {
        btns,
        selects,
        lang: getLang(),
        config: getConfig('toolbar')
      }
    },
    computed: {
      states: function () {
        return this.$store.state.toolbar
      },
      view: function () {
        return this.$store.state.view
      }
    },
    watch: {
      'view': function (val) {
        let states = {}
        let exArr = ['sourceCode', 'markdown', 'fullscreen', 'divider', '|']
        this.config.forEach(item => {
          if (exArr.indexOf(item) === -1) {
            states[item] = val === 'design' ? 'default' : 'disabled'
          }
        })
        this.$store.dispatch('updateButtonStates', states)
      }
    },
    methods: {
      btnHandler (event, name) {
        if (this.states[name].status === 'disabled') return
        let btn = this.btns[name]
        if (btn.action) {
          if (btn.native) {
            this.$store.dispatch('execCommand', { name: name, value: null })
          } else {
            this.$store.dispatch('callMethod', { name: name, params: null })
          }
        }
        this.updateStates(name)
        this.showPopup(name, event.currentTarget)
      },
      selectHandler (event, name) {
        if (this.states[name].status === 'disabled') return
        this.updateStates(name)
        this.showPopup(name, event.currentTarget)
      },
      showPopup (name, obj) {
        this.$store.dispatch('updatePopupDisplay', this.states[name].showPopup !== undefined ? {name, display: !this.states[name].showPopup} :  {} )
        this.$store.dispatch('updateRect', {
          left: obj.offsetLeft,
          top: obj.offsetTop,
          width: obj.offsetWidth,
          height: obj.offsetHeight + parseInt(window.getComputedStyle(obj).marginBottom)
        })
      },
      updateStates (name) {
        let states = {}
        // update no action btn status, no action means click on it will toggle a popover menu;
        if (this.view === 'design') {
          for (let item in this.btns) {
            if (!this.btns[item].action && this.states[item] && this.states[item].status === 'actived') {
              states[item] = 'default'
            }
          }
        }
        if (['sourceCode', 'markdown'].indexOf(name) !== -1) {
          this.states['sourceCode'] && (states['sourceCode'] = 'default')
          this.states['markdown'] && (states['markdown'] = 'default')
        }
        this.states[name].status === 'actived' ? states[name] = 'default' : states[name] = 'actived'
        this.$store.dispatch('updateButtonStates', states)
      }
    }
  }
</script>