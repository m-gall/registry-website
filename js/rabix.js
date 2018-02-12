import CWL from './cwl'
import Vue from 'vue'
import {SVGArrangePlugin, SelectionPlugin} from 'cwl-svg'
import ExpansionPlugin from 'cwl-svg-expand'
import * as objectPath from 'object-path';

Vue.config.devtools = true;
Vue.config.debug = true;
const selection = new SelectionPlugin();
const vue = new Vue({
    el: '#vue',
    data: {
        plugins: [
            new SVGArrangePlugin(),
            new ExpansionPlugin(),
            selection
        ],
        selection: {}
    },
    components: {
        cwl: CWL
    },
    methods: {
        selectionChanged(payload){
            this.selection = payload;
        },
        selectionPath(path){
            return objectPath.get(this.selection, path, '');
        }
    },
    delimiters: ['[[', ']]']
});
