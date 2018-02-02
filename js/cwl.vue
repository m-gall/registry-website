<template>
    <svg ref="svg" class="cwl-workflow"></svg>
</template>

<script>
    import "cwl-svg/src/assets/styles/themes/rabix-dark/theme.scss";
    import "cwl-svg/src/plugins/port-drag/theme.dark.scss";
    import "cwl-svg/src/plugins/selection/theme.dark.scss";

    import {WorkflowFactory} from "cwlts/models";
    import {Workflow} from "cwl-svg";

    export default {
        data() {
            return {
                selectedNode: null,
                workflow: null
            };
        },

        computed: {
            cwlModel() {
                return WorkflowFactory.from(this.cwl);
            }
        },

        props: {
            cwl: {
                type: Object,
                default: null
            },

            editingEnabled: {
                type: Boolean,
                default: false
            },
            plugins: {
                type: Array,
                default: []
            }
        },

        watch: {
            cwl() {
                this.workflow = new Workflow({
                    editingEnabled: this.editingEnabled,
                    model: this.cwlModel,
                    svgRoot: this.$refs.svg,
                    plugins: this.plugins
                });
            }
        }
    }
</script>

<style lang="css">
    .cwl-workflow {
        height: 500px;
        position: relative;
    }
</style>