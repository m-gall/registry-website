import CWL from './cwl'
import Vue from 'vue'
import {SVGArrangePlugin} from 'cwl-svg'
import ExpansionPlugin from 'cwl-svg-expand'

Vue.config.devtools = true;
Vue.config.debug = true;

const vue = new Vue({
    el: '#vue',
    data: {
        plugins: [
            new SVGArrangePlugin,
            new ExpansionPlugin
        ]
    },
    components: {
        cwl: CWL
    },
    computed: {
        /**
         * Returns an array of selected CWL nodes for all the child <cwl> components
         */
        selcted(){
            const refs =this.$refs.vue;
            if (!refs)
                return null;
            else if (Array.isArray(refs))
                return refs;
            else
                return [refs]
        }
    }
});
