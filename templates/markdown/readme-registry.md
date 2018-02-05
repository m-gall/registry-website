
## What is the Australian Genomics registry?

The Australian Genomics registry aims to provide bioinformaticians, clinicians and medical scientists with information on the bioinformatics processes used to generate data by the Flagships.

## Objectives

The main objectives are to:

-	Build a comprehensive registry containing detailed description of the bioinformatics pipelines in use across the Flagships
-	Provide a framework for describing bioinformatics pipelines including:
    - A structured document format as a medium for capturing pipeline descriptions
    - Link to other standards and controlled vocabularies to start a common language for pipeline description
    - Tools for pipeline query and visualisation so that the details of the document are transparent and can be explored, compared and queried in textual and visual forms.

## Scope

The scope of registry is bioinformatic pipelines, documenting but not limited to describing:

1. stages
2. tools
3. data inputs/outputs
4. data and tool versions
5. command-line arguments
6. parameters

The structure of each pipeline is described by mapping the input/outputs of each stage. The descriptions are an abstracted overview of key operations, data inputs and outputs required by the pipeline. The descriptions might be considered ‘declarative’- that is, each of the stages are described but the details of implementation are assumed.

For these descriptions, the bioinformatics pipeline is considered to start when the sequencing files are produced. The pipeline ends with variant curation. If variant annotation was manually handled as part of the curation process, this stage was not documented as part of the registry.

Bioinformatic pipelines of various types were described including:

-	Research and diagnostic
-	Whole exome sequencing (WES), whole genome sequencing (WGS) and diagnostic panel
-	Germline and somatic (tumour-normal pair)
-	Trio

## Technical components

-	Common workflow language (CWL) is a platform-agnostic specification for describing workflows and tools. The structured document (yaml/json format), where the core of the information about each pipeline is stored, is written using and are valid CWL documents. It should be noted these documents do not contain all the details required to implement the pipeline and are purely descriptive.
-	EDAM ontology is a controlled vocabulary for description of common bioinformatics concepts, operations, data and data formats. CWL supports referencing of EDAM identifiers and was included as part of the structured document.
-	SCICRUNCH is a database of resources, facilitating access to resources, databases and tools. Referencing the SCICRUNCH RRID provides access to a portal of information about each tool including documentation, literature, citations and other useful metadata.
-	Reproducible Computational Analyses for Bioinformatics (rabix) composer is a graphical and code editor capable of composing and editing CWL documents. This tool was used to assist with construction of the structured documents.
-	CWL-svg TypeScript library by rabix was used to generate the website pipeline visualisations. Additional plug-ins for subworkflow visualisation were developed by Michael Milton (https://github.com/TMiguelT/todo).
-	Information for the website is dynamically generated from an sqlite3 database.

-   The database has seven tables:

    - Flagship
    - Institute
    - PipelineSummary
    - Pipeline
    - Term
    - Workflow
    - WorkflowDescription

- Flask microframework for Python was used to generate the website supported by Jinja2 templating engine and SQLalchemy as an abstraction to the sqlite3 database.
- The code for the website is maintained on a git repository: [html]: (https://github.com/m-gall/registry-website)

## Contributors Guide

Currently, there is no process for collaborators to maintain or upload new workflows directly to the website/database. However, upon request, it is a simple process for the current version of the information to be exported for modification and re-upload to the registry.

The information about each workflow is stored in several locations:

- CWL document is stored as a json object in ‘Workflow’ table
- Each workflow instance has a version number, with the facility to store and access deprecated versions via the workflow URI handle (/pipeline/<handle>/<version>)
- Workflow attributes, or a ‘checklist’ of workflow features are stored in ‘WorkflowDescription’ table. This information can be downloaded and edited as a CSV file
- A markdown document containing un-structured free-text is associated with each workflow. This can be edited in any text editor.

Contributors may find the rabix composer helpful for constructing and editing the CWL code. This can be downloaded as a pre-compiled package for windows, linux or mac operating systems.

## Curation

There is currently no formal curation procedure, although all information has been gathered from bioinformaticians directly involved in the pipeline development process.

‘cpipe-mb-exome’ and ‘seqliner-xx-xx’ provide exemplars for the level of detail which should be included in the pipeline descriptions, although detail beyond this is encouraged.

Depending on the resources produced by the pipeline, documentation and expertise of the bioinformaticians, fully capturing this information is not necessarily simple. However, even incomplete descriptions can be useful and enhance the resource. Workflows have been graded so that the completeness of a description can be quickly identified.

## User information - page descriptions & navigation

#### Flagship page
-	An overview of the Flagships and associated workflows

#### Pipeline registry page

##### Overview page

-	Provides an overview of all the workflow instances stored in the database
-	Summary of basic workflow information

##### Full description page

- Details of the workflow including:

  * Summary of key information about important aspects of the pipelines
  * Visualisation which provides a dynamic rendering of information captured in the CWL document
  * Additional workflow metadata stored in an sqlite3 database
  * Unstructured description stored as free-text
  * Link to other versions of workflows stored in the database

## Terms of description

### Pipeline vs workflow

In this registry, the terms pipeline and workflow represent similar but not always interchangeable concepts.

For the purposes of the database model, pipeline describes the overarching framework with workflow instances of the pipeline. Configuration details for an analysis run (e.g. annotation libraries, interval padding values) would be described in the workflow instance. The description of a pipeline framework would be broad enough to contain workflows of different chemistries (e.g. panel vs exome). In cases where there is only a single pipeline in operation, pipeline and workflow are effectively describing the same object.

### Workflow instance

Each workflow instance has a unique reference ID, which is a combination of {institute} - {workflow type} - {chemistry type} - {version}.

A workflow typically starts with either:

- sequencer files
- fastq files

A workflow is typically described up to the curation stage. The curation is typically a manual process with decisions dependent on project requirements and with some judgement of the curator. For some pipelines, the process of annotating variants is manual and curator dependent. This process has not been described in this registry.

A new instance of a workflow generally would be distinguished by differences in sequencing chemistry (e.g. exome vs genome), tools or restructuring of the workflow configuration.

In contrast, modifications to parameters, tool versions, and reference datasets might constitute a new version.

Updates and filling out descriptions, appending more extensive documentation to a workflow already described would be considered an update to a version. New updates are tracked via a timestamp in the database Workflow table.

### CWL descriptions

The purpose of these descriptions is not to capture the exact implementation details of the pipeline, but rather to document important key information about the different pipelines so there is understanding of how the data from an AGHA flagship was generated. CWL provides a convenient structured format with fields providing useful prompts and sufficient flexibility to capture the details of pipelines with diverse structures.

For each workflow, every stage should be defined, including the packages/tools and their versions. In-house scripts should be accompanied by a brief description of the scripts purpose.

A workflow represents a single individual. For a germline pipeline, this would represent a single sample. For a somatic pipeline, an individual would have both a tumour and normal sample.

The inputs and outputs should be specified in the tool object. The connection of the tool objects should be specified in the workflow object.

Tools may be grouped into subworkflows and can be defined as 1) repeated units of work, 2) sets of tools which operate towards a similar endpoint.

### CWL concepts

Subworkflows are used to represent 1) operations which are repeated over block of data, 2) a set of operations which should be performed as a unit of work normally with a dependency integral to its function with a data input generated at run-time e.g. GATK indel realignment is a two part process.
Scatter/gather is a similar concept, but was used to represent processes which have been split and are run parallel in the workflow. In contrast to subworkflows, a scatter/gather input is split within the workflow, whereas for these descriptions, a subworkflow would have multiple inputs generated independently e.g. biological or flow-cell lane replicates.

## Limitations & registry interpretation on the CWL

CWL is a specification for running workflows or the ‘plumbing’. As it is a specification, not a language, it does not have full programming capabilities, for instance it lacks conditionals and loops, which limits the ability to describe some programming concepts. The specification provides limited scope to describe the workings of customised workflow elements such as scripts, which represent     an important distinction between workflows. To provide some transparency over the scripts operation, a representation of its purpose has been provided in the CWL, although it is acknowledged this is not intended to model the code, only its purpose.

## Limitations of the visual rendering

-	Visualise scattering/gather parallelism
-	Expand/collapse subworkflows
-	Construct and expose command line argument
-	Expose other metadata captured in CWL e.g. EDAM identifier
-	Change symbols/colour of tools vs subworkflows
-	Provide a legend

## URI handles

Each workflow instance has also been given a unique, human-readable 'handle'. Pipeline descriptions can be accessed directly via url using the handle: www.XXX/pipeline/<handle>/<version number>.

Entering the workflow uri without providing a version number (www.XXX/pipeline/<handle>) will default to the newest version of a workflow. A list of older versions in the database will be generated on the page.



## Data access and storage

CWL:

-	CWL document is stored in the database as a single json file. A backup of each pipeline is stored as a json file in '/database-build'.
-	To be compatible with the rabix cwl-svg library, the cwl has been converted to sbg json, which is similar to cwl-json format.
-	Conversion back to a valid CWL document can be performed via rabix composer ???
-	Sevenbridges (sbg) tools automatically append sbg information to the file which must be removed from the document for it to pass the cwl validator. This can be performed using sed and regular expressions to select for sbg fields.

Summary information:

-	A complementary workflow ‘checklist’ is stored in the database ‘WorkflowDescription’ table. This information can be downloaded and edited as a csv.
-	Some of this information does not have an intuitive place to be stored in the CWL but is important metadata about the pipelines.
-	Other information is a summary of details of the pipeline
-	Nb: an absence of a stage does not mean poor pipeline quality, for instance, base quality score recalibration does not improve read quality for all types of workflows and may reduce performance.

Additional information:

-	Unstructured textual descriptions stored as a markdown document (/static/templates/markdown)
-	‘Prose’ description of the pipelines. Some overlap with CWL document and summary tables.

rabix visualisation library:

-	To compile the library:
    - npm run build
    - or npm run watch
-	Once the library has compiled, the source code necessary to render the visualisations is executed from XXX.

