import "cwl-svg/src/assets/styles/themes/rabix-dark/theme.scss";
import "cwl-svg/src/plugins/port-drag/theme.dark.scss";
import "cwl-svg/src/plugins/selection/theme.dark.scss";

import {WorkflowFactory, WorkflowModel} from "cwlts/models";
import {
    SVGArrangePlugin, Workflow, SVGNodeMovePlugin, SVGEdgeHoverPlugin,
    SVGPortDragPlugin, SelectionPlugin, ZoomPlugin
} from "cwl-svg";
import "promise/polyfill"
import "whatwg-fetch"

/**
 * Returns a promise of a workflow model
 * @param name
 * @param version
 */
function getCwlJson(name: string, version: string): Promise<WorkflowModel> {
    return fetch(`/${name}/${version}`, {
        headers: new Headers({
            'Accept': 'application/json'
        })
    })
        .then(response => {
            return response.json()
        }).then(json => {
            for (let element of json.$graph){
                if (element.class == 'workflow')
                    return WorkflowFactory.from(element);
            }
        });
}

/**
 * Provided an SVG element with the appropriate "data-workflowName" and "data-workflowVersion" properties, will fill
 * the SVG contents with the workflow in question
 * @param element
 */
function drawElement(element: SVGSVGElement): void {
    // Get the properties from the element
    const name = element.dataset.workflowName;
    const version = element.dataset.workflowVersion;

    // Get the CWL from the database, and render it
    getCwlJson(name, version)
        .then(model => {
            const workflow = new Workflow({
                editingEnabled: false,
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
                ]
            });
            workflow.fitToViewport();
        });
}

// Wait until the DOM loads, then render the CWL
document.addEventListener("DOMContentLoaded", function () {
    const svgRoot = document.getElementById("cwl") as any;
    drawElement(svgRoot);
});
