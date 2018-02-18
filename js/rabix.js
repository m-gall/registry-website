import CWL from 'vue-cwl'
import Vue from 'vue'
import {SVGArrangePlugin, SelectionPlugin} from 'cwl-svg'
import ExpansionPlugin from 'cwl-svg-expand'
import * as objectPath from 'object-path';

Vue.config.devtools = true;
Vue.config.debug = true;

const vue = new Vue({
    el: '#vue',
    data: {
        plugins: [
            new SVGArrangePlugin(),
            new ExpansionPlugin(),
            new SelectionPlugin()
        ],
        selection: {},
        workflow: {}
    },
    components: {
        cwl: CWL
    },
    methods: {
        selectionChanged(payload){
            this.selection = payload;
        },
        workflowChanged(payload){
            this.workflow = payload;
        },
        selectionPath(path){
            return objectPath.get(this.selection, path, '');
        },
        getOutputDetails(outputName){
            // return this.selection.
        }
    },
    delimiters: ['[[', ']]']
});
