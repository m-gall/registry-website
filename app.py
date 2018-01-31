from flask import Flask
from sqlalchemy.sql import collate
from sqlalchemy.sql.expression import and_
from flask import request, render_template, url_for, redirect, Markup
from markdown import markdown
from model import *
import json

# from jq import jq

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./registry-v1.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.debug = True
app.jinja_env.globals['include_md'] = lambda filename: Markup(
    markdown(app.jinja_loader.get_source(app.jinja_env, filename)[0]))
db.init_app(app)
Pipeline_summary.__table__.columns.keys()

app.jinja_env.filters['zip'] = zip


@app.route('/', methods=['GET', 'POST'])
def homepage():
    if request.method == 'GET':

        institute_query = db.session.query(Institute).filter(Institute.institute_lat != None).all()
        institute_query_all = db.session.query(Institute.institute_name.distinct(),
                                               Institute.institute_logo).all()

        return render_template("main.html", instituterow=institute_query,
                               institute_query_all=institute_query_all)

    else:
        return render_template("searchpage.html")


@app.route('/about.html')
def about():
    return render_template("about.html")


@app.route('/search.html', methods=['GET', 'POST'])
def search():
    workflow_query = db.session.query(Workflow, Flagship).join(Pipeline, Flagship).all()
    if request.method == 'POST':
        pipeline_select_temp = request.form['search-for-pipeline']
        pipeline_id_query = db.session.query(Pipeline).filter(
            collate(Pipeline.pipeline_name == pipeline_select_temp, 'NOCASE')).all()

        if pipeline_id_query == None:
            workflow_query = db.session.query(Workflow, Flagship).join(Pipeline, Flagship).all()

            return render_template("searchpage.html", workflow_query=workflow_query)
        else:
            pipeline_select_temp = '%' + pipeline_select_temp + '%'
            workflow_query = db.session.query(Workflow, Flagship).join(Pipeline, Flagship).order_by(
                collate(Workflow.workflow_name, 'NOCASE')).filter(
                Workflow.workflow_name.like(pipeline_select_temp)).all()
            return render_template("searchpage.html", workflow_query=workflow_query)

    return render_template("searchpage.html", workflow_query=workflow_query)


@app.route('/search.html')
def search_instance(pipelinename):
    workflow_query = db.session.query(Workflow, Flagship).join(Pipeline, Flagship).order_by(
        collate(Workflow.workflow_name, 'NOCASE')).filter(
        Workflow.workflow_name == pipelinename).all()
    return render_template("searchpage.html", workflow_query=workflow_query)


@app.route('/registry-overview.html')
def registryoverview():
    workflow_join = db.session.query(Workflow, Institute, Workflow_Description).join(Institute,
                                                                                     Workflow_Description).filter(
        Workflow.workflow_version == Workflow.workflow_version_counter).order_by(
        Workflow.workflow_name).all()
    return render_template('registry-overview.html', workflow_join_institute=workflow_join)


#
# @app.route('/explorer.html')
# def explorer():
#     workflowrows = Workflow.query.order_by(Workflow.workflow_name).all()
#
#     return render_template('explorer.html', workflowrows=workflowrows)


@app.route('/flagship.html', methods=['GET'])
def flagship():
    flagships = db.session.query(Flagship, Institute).join(Institute).order_by(
        Flagship.flagship_name).filter(
        Flagship.flagship_name != "Not affiliated with a Flagship").all()

    institutes = db.session.query(Institute).all()

    return render_template('flagship.html', flagships=flagships, institutes=institutes)


@app.route('/resources.html')
def resources():
    termrows = Term.query.order_by(collate(Term.term_name, 'NOCASE')).filter(Term.term_type != 'references').all()
    term_references = Term.query.order_by(collate(Term.term_name, 'NOCASE')).filter(
        Term.term_type == 'references').all()
    term_select_software = '%' + 'software' + '%'
    termsoftware = Term.query.order_by(collate(Term.term_name, 'NOCASE')).filter(
        Term.term_type.like(term_select_software)).all()
    termconcept = Term.query.order_by(collate(Term.term_name, 'NOCASE')).filter(
        Term.term_type == 'concept').all()

    return render_template("resources.html", termrows=termrows, termconcept=termconcept,
                           term_references=term_references, termsoftware=termsoftware)


@app.route('/searchpage.html', methods=['GET'])
def searchpage():
    return render_template("searchpage.html")


@app.route('/query.html', methods=['GET', 'POST'])
def query():
    ## extract stages from json file

    if request.method == 'GET':
        workflowrows = Workflow.query.all()

        germlineworkflows = db.session.query(Workflow).filter(Workflow.workflow_type == "germline").all()
        somaticworkflows = db.session.query(Workflow).filter(Workflow.workflow_type == "somatic").all()

        germlinedict = {}
        somaticdict = {}

        for item in germlineworkflows:
            germlinedict[item.id] = item.workflow_name

        for item in somaticworkflows:
            somaticdict[item.id] = item.workflow_name

        t = db.session.query(Workflow).filter(Workflow.workflow_name == "NCI Germline WES").first()
        # with open('/Users/mailie/PycharmProjects/registry-v1/database-build/test.json') as json_file:
        #     data = json.load(json_file)

        z = json.loads(t.workflow_sb_json)

        #     print(z.items())

        return render_template("query.html", workflowrows=workflowrows, germlineworkflows=germlineworkflows,
                               somaticworkflows=somaticworkflows)

    elif request.method == 'POST':

        comparator = request.form['comparator']
        workflow_stage = request.form['workflowstage']
        workflow_name_1 = request.form['listworkflows1']
        workflow_name_2 = request.form['listworkflows2']

        # with open('/Users/mailie/PycharmProjects/registry-v1/database-build/test.json') as json_file:
        #     data = json.load(json_file)


        print(workflow_name_1, workflow_name_2)
        return redirect(url_for('queryreturn', workflow_name_1=workflow_name_1, workflow_name_2=workflow_name_2))
    return render_template("query.html")


# for row in t:
#     a = row.workflow_json
# z = json.loads(a)

# temp2 = jq(
#     '.["$graph"] | .[] | select(.hints!=null) | .hints | .[] | select(.packages!=null) | .packages | .[]').transform(
#     z, multiple_output=True)
#
# temp3 = jq('.["$graph"] | .[] | select(.class=="CommandLineTool")| .baseCommand').transform(z,
#                                                                                             multiple_output=True)
# #  temp2 = jq('.["$graph"] | .[] | select(.class=="SoftwareRequirement")| .packages').transform(z, multiple_output=True)
#
# temp4 = jq('.["$graph"] | .[] | select(.class=="CommandLineTool")').transform(z,
# text_output=True)


# temp4 = jq('.').transform(a)


@app.route('/query-return.html/<workflow_name_1>/<workflow_name_2>', methods=['GET'])
def queryreturn(workflow_name_1, workflow_name_2):
    ## Enter a workflow name
    ## Specify whether somatic, germline
    ## Specify is subworkflows
    ## If subworkflows, then select XX [steps]{i}{run}[class if Workflow][steps{i}[run][hints]{0}{packages}
    ## Else, then select [steps][run][hints]{0}{packages}
    workflowrow1 = db.session.query(Workflow).filter(Workflow.workflow_name == workflow_name_1).first()
    workflowrow2 = db.session.query(Workflow).filter(Workflow.workflow_name == workflow_name_2).first()

    workflow1dict = json.loads(workflowrow1.workflow_sb_json)
    workflow2dict = json.loads(workflowrow2.workflow_sb_json)

    ## check if has subworkflows


    check = workflow1dict['steps'][0]['run']

    select = {'steps'}
    level2 = workflow1dict['steps'][0]['run']
    level1_w1 = workflow1dict['steps']
    level1_w2 = workflow2dict['steps']

    steps_workflow1 = (len(level1_w1))
    steps_workflow2 = (len(level1_w2))

    for i in range(1, steps_workflow1):
        check = workflow1dict['steps'][i]['run']['class']
        if check == 'Workflow':
            set_flag = True
            break


    print(set_flag)

    # temp = {key: level2[key] for key in level2.keys() & select}
    #  level2 = workflow1dict['steps'][0]['run']['hints'][0]


    return render_template("query-return.html", workflow1dict=workflow1dict, workflow2dict=workflow2dict,
                           steps_workflow1=steps_workflow1, steps_workflow2=steps_workflow2, set_flag=set_flag)


@app.route("/pipeline/<pipelinename>")
def pipeline_view(pipelinename):
    queryid = (Workflow.query.filter_by(workflow_accession=pipelinename).first())

    pipeline_summary_header = (Pipeline_summary.query.filter_by(id=queryid.pipeline_summary_id)).order_by(
        Pipeline_summary.pipeline_name)

    occurrences = db.session.query(Workflow, Workflow_Description).join(Workflow_Description).filter(
        Workflow.workflow_accession == pipelinename).count()

    workflow_json = db.session.query(Workflow).filter(and_(
        Workflow.workflow_accession == pipelinename,
        Workflow.workflow_version == occurrences
    )).first()

    if occurrences == 0:
        return redirect(url_for('search'))

    elif occurrences == 1:
        workflow_join = db.session.query(Workflow, Workflow_Description, Pipeline_summary).join(Workflow_Description,
                                                                                                Pipeline_summary).filter(
            Workflow.workflow_accession == pipelinename).filter(Workflow.workflow_version == occurrences).order_by(
            Pipeline_summary.pipeline_name).all()

        message = False

        return render_template("registry-instance.html", workflow_join=workflow_join,
                               header=pipeline_summary_header, occurrences=occurrences, message=message,
                               workflow_json=workflow_json)
    elif occurrences > 1:

        workflow_join = db.session.query(Workflow, Workflow_Description, Pipeline_summary).join(Workflow_Description,
                                                                                                Pipeline_summary).filter(
            Workflow.workflow_accession == pipelinename).filter(Workflow.workflow_version == occurrences).order_by(
            Pipeline_summary.pipeline_name).all()

        workflow_all = db.session.query(Workflow, Workflow_Description).join(Workflow_Description).filter(
            Workflow.workflow_accession == pipelinename).filter(Workflow.workflow_version != occurrences).all()

        message = True

        return render_template("registry-instance.html", workflow_join=workflow_join, workflow_all=workflow_all,
                               header=pipeline_summary_header,
                               occurences=occurrences, message=message, workflow_json=workflow_json)
    else:
        return redirect(url_for('search-instance', pipelinename=pipelinename))


@app.route("/pipeline/<pipelinename>/<version>")
def pipeline_version_view(pipelinename, version):
    if request.accept_mimetypes.best == 'application/json':
        # If the user requested JSON, we just return the CWL as JSON
        workflow = db.session.query(Workflow).filter(and_(
            Workflow.workflow_accession == pipelinename,
            Workflow.workflow_version == version
        )).first()

        return app.response_class(
            response=workflow.workflow_sb_json,
            status=200,
            mimetype='application/json'
        )

    else:
        # Otherwise, return an HTML page
        workflow_join = db.session.query(Workflow, Workflow_Description).join(Workflow_Description).filter(
            Workflow.workflow_accession == pipelinename).filter(Workflow.workflow_version == version).all()
        message = False

        return render_template('registry-instance.html', workflow_join=workflow_join, message=message)


@app.route("/<pipelinename>/<version>/visualize")
def pipeline_visualize(pipelinename, version):
    workflow = db.session.query(Workflow).filter(and_(
        Workflow.workflow_accession == pipelinename,
        Workflow.workflow_version == version
    )).first()

    return render_template('rabix-view.html', workflow_instance=workflow)


# @app.route("/explorer.html/<name>")
# def explorerpath(name):
#     path = 'static/explorer-html/' + name
#     return redirect(path)


if __name__ == '__main__':
    app.run()





    # @app.route('/upload_other.html', methods=['GET', 'POST'])  # def upload_other():
    #     if request.method == 'GET':
    #         workflowrows = Workflow.query.all()
    #         instituterows = Institute.query.all()
    #         pipelinerows = Pipeline.query.all()
    #         flagshiprows = Flagship.query.all()
    #
    #         return render_template("upload_other.html", workflowrows=workflowrows,
    #                                instituterows=instituterows, pipelinerows=pipelinerows,
    #                                flagshiprows=flagshiprows)
    #
    #     elif request.method == 'POST':
    #
    #         flagship_name_temp = request.form['flagship_name']
    #         flagship_institute_temp = request.form['flagship_institute']
    #         flagship_lead_temp = request.form['flagship_lead']
    #         flagshipDiseaseType_temp = request.form['flagshipDiseaseType']
    #
    #         query = db.session.query(Flagship).filter(
    #             Flagship.flagship_name == flagship_name_temp).first()
    #
    #         if query == None:
    #             print('i dont exist so add me')
    #             #          new_institute = Institute(institute_name_temp)
    #             #         db.session.add(new_institute)
    #             #        db_session.commit()
    #
    #             new_flagship = Flagship(flagship_name_temp, flagship_institute_temp, flagship_lead_temp,
    #                                     flagshipDiseaseType_temp)
    #             db.session.add(new_flagship)
    #             db.session.commit()
    #             return redirect(url_for('search'))
    #         else:
    #             print('I already exist in the database')
    #             return redirect(url_for('upload_to_db'))
    #
    #     else:
    #         return "Form didn't validate"
    #
    #
    # @app.route('/upload_to_db.html', methods=['GET', 'POST'])
    # def upload_to_db():
    #     if request.method == 'GET':
    #         workflowrows = Workflow.query.all()
    #         instituterows = Institute.query.all()
    #         pipelinerows = Pipeline.query.all()
    #         flagshiprows = Flagship.query.all()
    #
    #         return render_template("upload_to_db.html", workflowrows=workflowrows,
    #                                instituterows=instituterows, pipelinerows=pipelinerows,
    #                                flagshiprows=flagshiprows)
    #
    #     elif request.method == 'POST':
    #         workflow_name_temp = request.form['workflow_name']
    #         workflow_library_temp = request.form['library_preparation']
    #         workflow_layout_temp = request.form['library_layout']
    #         workflow_strategy_temp = request.form['sequencing_strategy']
    #         workflow_nata_temp = request.form['nata_accreditation']
    #         workflow_gen_temp = request.form['reference_genome']
    #         workflow_usage_temp = request.form['workflow_usage']
    #         workflow_acc_temp = request.form['cwlexplorer_accession']
    #
    #         pipeline_select_temp = request.form['selected_pipeline']
    #         flagship_select_temp = request.form['selected_flagship']
    #
    #         pipeline_id_query = db.session.query(Pipeline).filter(
    #             Pipeline.pipeline_name == pipeline_select_temp).first()
    #         flagship_id_query = db.session.query(Flagship).filter(
    #             Flagship.flagship_name == flagship_select_temp).first()
    #
    #         query = db.session.query(Workflow).filter(
    #             Workflow.workflow_name == workflow_name_temp).first()
    #
    #         if query == None:
    #             print('i dont exist so add me')
    #             new_workflow = Workflow(workflow_name_temp, workflow_library_temp, workflow_layout_temp,
    #                                     workflow_strategy_temp, workflow_nata_temp, workflow_gen_temp,
    #                                     workflow_usage_temp,
    #                                     workflow_acc_temp, pipeline_id_query.id, flagship_id_query.id)
    #
    #             db.session.add(new_workflow)
    #             db.session.commit()
    #             return redirect(url_for('upload_to_db'))
    #
    #
    #         else:
    #             print('I already exist in the database')
    #             return redirect(url_for('upload_to_db'))
    #
    #     else:
    #         return "Form didn't validate"
