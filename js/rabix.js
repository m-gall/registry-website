import CWL from './cwl'
import Vue from 'vue'

Vue.config.devtools = true
Vue.config.debug = true
const vue = new Vue({
    el: '#root',
    data: {
        selectedNode: null,
        cwl: null
    },
    mounted() {
        fetch(`/pipeline/${name}/${version}`, {
            headers: new Headers({
                'Accept': 'application/json'
            })
        }).then(response => {
            this.cwl = response.json();
        });
    },
    components: {
        CWL
    }
});
