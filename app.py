from flask import Flask
from sqlalchemy.sql import collate
from flask import request, render_template, url_for, redirect
from model import *

#import csv
#import pandas as pd
#import tablib
#import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./registry-v1.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.debug = True
db.init_app(app)

#dataset = tablib.Dataset()
#with open(os.path.join(os.path.dirname(__file__),'/Users/mailie/PycharmProjects/registry-v1/registry-v1.csv')) as f:
#    dataset.csv = f.read()

#def get_csv():
#    f = open('/Users/mailie/PycharmProjects/registry-v1/registry-v1.csv', 'r')
#    return list(csv.DictReader(f))







@app.route('/', methods=['GET', 'POST'])
def homepage():
    global workflow_query
    if request.method == 'GET':

        title = 'Australian Genomics Registry of Pipelines'
        subhead = 'This is the home of the Australian Genomics Bioinformatics pipeline registry.'
        subheading1 = 'Purpose and scope'
        subheading3 = 'Links'
        subheadtext1 = 'The Australian Genomics registry provides a standardised description of the bioinformatic pipelines.This includes the pipelines in operation across key ' \
                       'Australian Healthcare organisations including those used by Australian Genomics Flagships. ' \
                       'The pipelines have been described using a community-developed and engineered standard, the Common Workflow language (CWL). ' \
                       'Using CWL explorer, the documents can be rendered into a dynamic graphical visualisation, ' \
                       'enabling detailed exploration of the structure and composition of a pipeline.'

        instituterow = Institute.query.all()
        searchterm = Pipeline.query.all()

        return render_template("main.html", title=title, subhead=subhead, subheading1=subheading1,
                               subheadtext1=subheadtext1, subheading3=subheading3, searchterm=searchterm,
                               instituterow=instituterow)

    elif request.method == 'POST':
        pipeline_select_temp = request.form['search-for-pipeline']
        pipeline_id_query = db.session.query(Pipeline).filter(collate(Pipeline.pipeline_name == pipeline_select_temp, 'NOCASE')).all()

        if pipeline_id_query == None:
            return render_template("search.html", workflow_query=workflow_query)
        else:
            pipeline_select_temp = '%' + pipeline_select_temp + '%'
            workflow_query = db.session.query(Workflow, Flagship).join(Pipeline, Flagship).order_by(collate(Workflow.workflow_name, 'NOCASE')).filter(Workflow.workflow_name.like(pipeline_select_temp)).all()
            return render_template("search.html", workflow_query=workflow_query)
    else:
        return render_template("search.html")


@app.route('/about.html')
def about():
    title = 'About'
    subhead = ''
    subheading1 = 'The organisation'

    return render_template("about.html", title=title, subhead=subhead, subheading1=subheading1)


@app.route('/registry.html')
def registry():
    title = 'Bioinformatics Pipeline Registry'
    subhead = ''
    subheading1 = 'Summary'
    subheadtext1 = ''
    workflowrows = Workflow.query.order_by(Workflow.workflow_name).all()
    workflow_join_institute = (db.session.query(Workflow, Pipeline, Institute, Flagship, Workflow_Description).join(Pipeline, Institute, Flagship, Workflow_Description)).order_by(Workflow.workflow_name).order_by(Workflow.workflow_name).all()
    return render_template('registry.html', title=title, subhead=subhead, subheading1=subheading1,
                           subheadtext1=subheadtext1, workflowrows=workflowrows, workflow_join_institute=workflow_join_institute)


@app.route('/explorer.html')
def explorer():
    title = 'CWL explorer'
    subhead = ''
    subheading1 = 'Purpose and scope'
    subheadtext1 = 'This tool accepts CWL workflow and tool definitions as inputs and renders tjhe pipelines as an interactive di-acyclic (DAG) graphic visualisation.'
    subheading2 = 'Demo'
    urllink = 'https://bjpop.github.io/cwl_explorer/'
    workflowrows = Workflow.query.order_by(Workflow.workflow_name).all()

    return render_template('explorer.html', title=title, subhead=subhead, subheading1=subheading1,
                           subheadtext1=subheadtext1, subheading2=subheading2, urllink=urllink,
                           workflowrows=workflowrows)


@app.route('/overview.html', methods=['GET'])
def index():
    pipelinerows = Pipeline.query.order_by(collate(Pipeline.pipeline_name, 'NOCASE')).all()
    workflowrows = Workflow.query.order_by(collate(Workflow.workflow_name, 'NOCASE')).all()
    return render_template('overview.html', title='Overview', pipelinerows=pipelinerows, workflowrows=workflowrows)


@app.route('/flagship.html', methods=['GET'])
def flagship():
    flagships = db.session.query(Flagship).order_by(Flagship.flagship_name).filter(Flagship.flagship_name != "Not affiliated with a Flagship").all()
    return render_template('flagship.html', title='Overview', flagships=flagships)


@app.route('/pipeline_desc.html')
def pipeline_desc():
    return render_template("pipeline_desc.html")


@app.route('/resources.html')
def resources():
    termrows = Term.query.order_by(collate(Term.term_name, 'NOCASE')).all()
    term_references = Term.query.order_by(collate(Term.term_name, 'NOCASE')).filter(Term.term_type == 'references').all()
    tern_select_software = '%' + 'software' + '%'
    termsoftware = Term.query.order_by(collate(Term.term_name, 'NOCASE')).filter(Term.term_type.like(tern_select_software)).all()
    termconcept = Term.query.order_by(collate(Term.term_name, 'NOCASE')).filter(Term.term_type == 'concept').all()

    return render_template("resources.html", termrows=termrows, termconcept = termconcept, term_references=term_references, termsoftware=termsoftware)


@app.route('/registry-v1.html')
def test():
    return render_template("test.html")


@app.route('/search.html', methods=['GET'])
def search():
    return render_template("search.html")


@app.route('/upload_other.html', methods=['GET', 'POST'])
def upload_other():
    if request.method == 'GET':
        workflowrows = Workflow.query.all()
        instituterows = Institute.query.all()
        pipelinerows = Pipeline.query.all()
        flagshiprows = Flagship.query.all()

        return render_template("upload_other.html", workflowrows=workflowrows,
                               instituterows=instituterows, pipelinerows=pipelinerows, flagshiprows=flagshiprows)

    elif request.method == 'POST':

        #       institute_name_temp = request.form['institute_name']


        flagship_name_temp = request.form['flagship_name']
        flagship_institute_temp = request.form['flagship_institute']
        flagship_lead_temp = request.form['flagship_lead']
        flagshipDiseaseType_temp = request.form['flagshipDiseaseType']

        query = db.session.query(Flagship).filter(Flagship.flagship_name == flagship_name_temp).first()

        if query == None:
            print('i dont exist so add me')
            #          new_institute = Institute(institute_name_temp)
            #         db.session.add(new_institute)
            #        db_session.commit()

            new_flagship = Flagship(flagship_name_temp, flagship_institute_temp, flagship_lead_temp,
                                    flagshipDiseaseType_temp)
            db.session.add(new_flagship)
            db.session.commit()
            return redirect(url_for('search'))
        else:
            print('I already exist in the database')
            return redirect(url_for('upload_to_db'))

    else:
        return "Form didn't validate"


@app.route('/upload_to_db.html', methods=['GET', 'POST'])
def upload_to_db():
    if request.method == 'GET':
        workflowrows = Workflow.query.all()
        instituterows = Institute.query.all()
        pipelinerows = Pipeline.query.all()
        flagshiprows = Flagship.query.all()

        return render_template("upload_to_db.html", workflowrows=workflowrows,
                               instituterows=instituterows, pipelinerows=pipelinerows, flagshiprows=flagshiprows)

    elif request.method == 'POST':

        print('HERE1')

        workflow_name_temp = request.form['workflow_name']
        workflow_library_temp = request.form['library_preparation']
        workflow_layout_temp = request.form['library_layout']
        workflow_strategy_temp = request.form['sequencing_strategy']
        workflow_nata_temp = request.form['nata_accreditation']
        workflow_gen_temp = request.form['reference_genome']
        workflow_usage_temp = request.form['workflow_usage']
        workflow_acc_temp = request.form['workflow_accession']

        pipeline_select_temp = request.form['selected_pipeline']
        flagship_select_temp = request.form['selected_flagship']

        pipeline_id_query = db.session.query(Pipeline).filter(Pipeline.pipeline_name == pipeline_select_temp).first()
        flagship_id_query = db.session.query(Flagship).filter(Flagship.flagship_name == flagship_select_temp).first()

        query = db.session.query(Workflow).filter(Workflow.workflow_name == workflow_name_temp).first()

        if query == None:
            print('i dont exist so add me')
            new_workflow = Workflow(workflow_name_temp, workflow_library_temp, workflow_layout_temp,
                                    workflow_strategy_temp, workflow_nata_temp, workflow_gen_temp, workflow_usage_temp,
                                    workflow_acc_temp, pipeline_id_query.id, flagship_id_query.id)

            db.session.add(new_workflow)
            db.session.commit()
            return redirect(url_for('upload_to_db'))


        else:
            print('I already exist in the database')
            return redirect(url_for('upload_to_db'))

    else:
        return "Form didn't validate"


@app.route("/explorer-html/cpipe-index-v1.html")
def cpipe():
    return render_template("explorer-html/cpipe-index-v1.html")


@app.route("/explorer-html/garvan-germline-index-v1.html")
def garvan_germline():
    return render_template("explorer-html/garvan-germline-index-v1.html")

@app.route("/explorer-html/pathwest-index-v1.html")
def pathwest():
    return render_template("explorer-html/pathwest-index-v1.html")

@app.route("/explorer-html/qimr-index-v1.html")
def qimr_somatic():
    return render_template("explorer-html/qimr-index-v1.html")

@app.route("/explorer-html/qut-index-v1.html")
def qut():
    return render_template("explorer-html/qut-index-v1.html")

@app.route("/explorer-html/sap-exome-index-v1.html")
def sap_exome():
    return render_template("explorer-html/sap-exome-index-v1.html")

@app.route("/explorer-html/seqliner-clinical-index-v1.html")
def seqliner_clinical():
    return render_template("explorer-html/seqliner-clinical-index-v1.html")

@app.route("/explorer-html/seqliner-t-n-index-v1.html")
def seqliner_t_n():
    return render_template("explorer-html/seqliner-t-n-index-v1.html")

@app.route("/explorer-html/nci-index-v1.html")
def nci():
    return render_template("explorer-html/nci-index-v1.html")

if __name__ == '__main__':
    app.run()
