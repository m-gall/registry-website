import "cwl-svg/src/assets/styles/themes/rabix-dark/theme.scss";
import {WorkflowFactory, WorkflowModel} from "cwlts/models";
import {Workflow} from "cwl-svg/src/graph/workflow";
import "promise/polyfill"
import "whatwg-fetch"

/**
 * Returns a promise of a workflow model
 * @param name
 * @param version
 */
function getCwlJson(name: string, version: string): Promise<WorkflowModel> {
    return fetch(`${name}/${version}/json`)
        .then(response => {
            return response.json()
        }).then(json => {
            return WorkflowFactory.from(json);
        });
}

/**
 * Provided an SVG element with the appropriate "data-workflowName" and "data-workflowVersion" properties, will fill
 * the SVG contents with the workflow in question
 * @param element
 */
function drawElement(element: SVGSVGElement): void {
    // Get the properties from the element
    const name = element.getAttribute('workflow-name');
    const version = element.getAttribute('workflow-version');

    // Get the CWL from the database, and render it
    getCwlJson(name, version)
        .then(model => {
            const workflow = new Workflow({
                editingEnabled: false,
                model,
                svgRoot: element,
            });
            workflow.fitToViewport();
            workflow.draw();
        });
}

// Wait until the DOM loads, then render the CWL
document.addEventListener("DOMContentLoaded", function () {
    const svgRoot = document.getElementById("cwl") as any;
    drawElement(svgRoot);
});
