from flask import Flask
from sqlalchemy.sql import collate
from flask import request, render_template, url_for, redirect
from model import *
import json
from jq import jq
import operator

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./registry-v1.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.debug = True
db.init_app(app)


@app.route('/', methods=['GET', 'POST'])
def homepage():
    if request.method == 'GET':

        instituterow = Institute.query.all()
        searchterm = Pipeline.query.all()

        return render_template("main.html", searchterm=searchterm,
                               instituterow=instituterow)

    else:
        return render_template("search.html")


@app.route('/about.html')
def about():
    title = 'About'
    subhead = ''
    subheading1 = 'The organisation'

    return render_template("about.html", title=title, subhead=subhead, subheading1=subheading1)


@app.route('/search.html', methods=['GET', 'POST'])
def search():
    workflow_query = db.session.query(Workflow, Flagship).join(Pipeline, Flagship).all()
    if request.method == 'POST':
        pipeline_select_temp = request.form['search-for-pipeline']
        pipeline_id_query = db.session.query(Pipeline).filter(
            collate(Pipeline.pipeline_name == pipeline_select_temp, 'NOCASE')).all()

        if pipeline_id_query == None:
            workflow_query = db.session.query(Workflow, Flagship).join(Pipeline, Flagship).all()
            print(workflow_query)
            return render_template("searchpage.html", workflow_query=workflow_query)
        else:
            pipeline_select_temp = '%' + pipeline_select_temp + '%'
            workflow_query = db.session.query(Workflow, Flagship).join(Pipeline, Flagship).order_by(
                collate(Workflow.workflow_name, 'NOCASE')).filter(
                Workflow.workflow_name.like(pipeline_select_temp)).all()
            return render_template("searchpage.html", workflow_query=workflow_query)

    return render_template("searchpage.html", workflow_query=workflow_query)


@app.route('/registry.html')
def registry():
    workflowrows = Workflow.query.order_by(Workflow.workflow_name).all()
    workflow_join_institute = (
        db.session.query(Workflow, Pipeline, Institute, Flagship, Workflow_Description).join(Pipeline, Institute,
                                                                                             Flagship,
                                                                                             Workflow_Description)).order_by(
        Workflow.workflow_name).order_by(Workflow.workflow_name).all()
    return render_template('registry.html', workflowrows=workflowrows, workflow_join_institute=workflow_join_institute)


@app.route('/registry-overview.html')
def registryoverview():
    workflow_join_institute = (
        db.session.query(Workflow, Pipeline, Institute, Flagship, Workflow_Description).join(Pipeline, Institute,
                                                                                             Flagship,
                                                                                             Workflow_Description)).order_by(
        Workflow.workflow_name).order_by(Workflow.workflow_name).all()
    return render_template('registry-overview.html', workflow_join_institute=workflow_join_institute)


@app.route('/explorer.html')
def explorer():
    workflowrows = Workflow.query.order_by(Workflow.workflow_name).all()

    return render_template('explorer.html', workflowrows=workflowrows)


@app.route('/overview.html', methods=['GET'])
def index():
    pipelinerows = Pipeline.query.order_by(collate(Pipeline.pipeline_name, 'NOCASE')).all()
    workflowrows = Workflow.query.order_by(collate(Workflow.workflow_name, 'NOCASE')).all()
    return render_template('overview.html', title='Overview', pipelinerows=pipelinerows, workflowrows=workflowrows)


@app.route('/flagship.html', methods=['GET'])
def flagship():
    flagships = db.session.query(Flagship).order_by(Flagship.flagship_name).filter(
        Flagship.flagship_name != "Not affiliated with a Flagship").all()
    return render_template('flagship.html', title='Overview', flagships=flagships)


@app.route('/pipeline_desc.html')
def pipeline_desc():
    return render_template("pipeline_desc.html")


@app.route('/resources.html')
def resources():
    termrows = Term.query.order_by(collate(Term.term_name, 'NOCASE')).all()
    term_references = Term.query.order_by(collate(Term.term_name, 'NOCASE')).filter(
        Term.term_type == 'references').all()
    tern_select_software = '%' + 'software' + '%'
    termsoftware = Term.query.order_by(collate(Term.term_name, 'NOCASE')).filter(
        Term.term_type.like(tern_select_software)).all()
    termconcept = Term.query.order_by(collate(Term.term_name, 'NOCASE')).filter(Term.term_type == 'concept').all()

    return render_template("resources.html", termrows=termrows, termconcept=termconcept,
                           term_references=term_references, termsoftware=termsoftware)


@app.route('/searchpage.html', methods=['GET'])
def searchpage():
    return render_template("searchpage.html")


@app.route('/query.html', methods=['GET'])
def query():
    t = Workflow.query.filter(Workflow.workflow_name == 'Cpipe lymphoma exome').all()
    # with open('/Users/mailie/PycharmProjects/registry-v1/database-build/test.json') as json_file:
    #     data = json.load(json_file)

    for row in t:
        a = row.workflow_json
    z = json.loads(a)

    temp2 = jq(
        '.["$graph"] | .[] | select(.hints!=null) | .hints | .[] | select(.packages!=null) | .packages | .[]').transform(
        z, multiple_output=True)
    print(temp2)

    #    temp2 = jq('.["$graph"] | .[] | select(.class=="CommandLineTool")| .baseCommand').transform(z, multiple_output=True)
    #  temp2 = jq('.["$graph"] | .[] | select(.class=="SoftwareRequirement")| .packages').transform(z, multiple_output=True)

    # temp3 = jq('.["$graph"] | .[]').transform(a, text_output=True)
    # temp4 = jq('.').transform(a)
    return render_template("query.html", temp2=temp2)


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
        workflow_name_temp = request.form['workflow_name']
        workflow_library_temp = request.form['library_preparation']
        workflow_layout_temp = request.form['library_layout']
        workflow_strategy_temp = request.form['sequencing_strategy']
        workflow_nata_temp = request.form['nata_accreditation']
        workflow_gen_temp = request.form['reference_genome']
        workflow_usage_temp = request.form['workflow_usage']
        workflow_acc_temp = request.form['cwlexplorer_accession']

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


@app.route("/<pipelinename>")
def pipeline_view(pipelinename):
    #    workflow_id_query = db.session.query(Workflow).filter(collate(Workflow.workflow_name == pipelinename, 'NOCASE')).first()
    workflow_id_query = db.session.query(Workflow).filter(Workflow.workflow_accession == pipelinename).first()
    print(workflow_id_query)

    if workflow_id_query == None:

        return redirect(url_for('search'))
    else:
        row = (
            db.session.query(Workflow, Pipeline, Institute, Flagship, Workflow_Description).join(Pipeline, Institute,
                                                                                                 Flagship,
                                                                                                 Workflow_Description)).order_by(
            Workflow.workflow_name).filter(collate(Workflow.workflow_accession == pipelinename, 'NOCASE')).first()
        return render_template("registry-instance.html", row=row)

    return render_template("registry-instance.html", row=row)


@app.route("/<pipelinename>/<version>")
def workflow_view(pipelinename, version):
    name = pipelinename + version

    return redirect(url_for(name))


@app.route("/explorer.html/<name>")
def explorerpath(name):
    path = 'static/explorer-html/' + name

    return redirect(path)


if __name__ == '__main__':
    app.run()
