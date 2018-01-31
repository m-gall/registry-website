import "cwl-svg/src/assets/styles/themes/rabix-dark/theme.scss";
import "cwl-svg/src/plugins/port-drag/theme.dark.scss";
import "cwl-svg/src/plugins/selection/theme.dark.scss";

import {WorkflowFactory} from "cwlts/models";
import {
    SVGArrangePlugin, Workflow, SVGNodeMovePlugin, SVGEdgeHoverPlugin,
    SVGPortDragPlugin, SelectionPlugin, ZoomPlugin
} from "cwl-svg";
import WorkflowExpansionPlugin from "cwl-svg-expand";
import "promise/polyfill"
import "whatwg-fetch"

/**
 * Returns a promise of a workflow model
 * @param name
 * @param version
 */
function getCwlJson(name, version) {
    return fetch(`/pipeline/${name}/${version}`, {
        headers: new Headers({
            'Accept': 'application/json'
        })
    })
        .then(response => {
            return response.json()
        });
}

/**
 * Provided an SVG element with the appropriate "data-workflowName" and "data-workflowVersion" properties, will fill
 * the SVG contents with the workflow in question
 * @param element
 */
function drawElement(element) {
    // Get the properties from the element
    const name = element.dataset.workflowName;
    const version = element.dataset.workflowVersion;

    // Get the CWL from the database, and render it
    getCwlJson(name, version)
        .then(json => {
            const model = WorkflowFactory.from(json);
            const workflow = new Workflow({
                editingEnabled: true,
                model,
                svgRoot: element,
                plugins: [
                    new SVGArrangePlugin(),
                    new SVGEdgeHoverPlugin(),
                    new SVGNodeMovePlugin({
                        movementSpeed: 10
                    }),
                    new SVGPortDragPlugin(),
                    new SelectionPlugin(),
                    new ZoomPlugin(),
                    new WorkflowExpansionPlugin(json)
                ]
            });
            workflow.getPlugin(SVGArrangePlugin).arrange();
            workflow.getPlugin(SVGEdgeHoverPlugin);
            workflow.getPlugin(SVGNodeMovePlugin);
            workflow.getPlugin(SelectionPlugin);
            workflow.getPlugin(ZoomPlugin);
            workflow.getPlugin(SVGPortDragPlugin);
        });
}

// Wait until the DOM loads, then render the CWL
document.addEventListener("DOMContentLoaded", function () {
    const svgRoot = document.getElementById("cwl");
    drawElement(svgRoot);
});
