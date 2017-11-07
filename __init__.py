from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask import request, render_template, url_for, redirect

app = Flask(__name__)

app.config[
    'SQLALCHEMY_DATABASE_URI'] = 'sqlite:////Users/mailie/Documents/code/flask_projects/registry-v1/database-build/registry-v1.db'

app.debug = True

db = SQLAlchemy(app)

class Flagship(db.Model):
    __tablename__='flagship'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    flagship_name = db.Column(db.String(100))
    flagship_institute = db.Column(db.String(100))
    flagship_lead = db.Column(db.String(100))
    flagshipDiseaseType = db.Column(db.String(100))

    workflow_id = db.relationship('Workflow', backref='flagship', lazy='dynamic')

    def __init__(self, flagship_name, flagship_institute, flagship_lead, flagshipDiseaseType):
        self.flagship_name = flagship_name
        self.flagship_institute = flagship_institute
        self.flagship_lead = flagship_lead
        self.flagshipDiseaseType = flagshipDiseaseType

    def __repr__(self):
        return '<Flagship %r>' % self.flagship_name


class Workflow(db.Model):
    __tablename__='workflow'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    workflow_name = db.Column(db.String(100))
    library_preparation = db.Column(db.String(100))
    library_layout = db.Column(db.String(200))
    sequencing_strategy = db.Column(db.String(50))
    nata_accreditation = db.Column(db.String(50))
    reference_genome = db.Column(db.String(50))
    workflow_usage = db.Column(db.String(50))
    workflow_accession = db.Column(db.VARCHAR(50))

    pipeline_id= db.Column(db.Integer, db.ForeignKey('pipeline.id'))
    flagship_id = db.Column(db.Integer, db.ForeignKey('flagship.id'))
    workflow_desc_id = db.Column(db.Integer, db.ForeignKey('workflow_desc.id'))

    def __init__(self, workflow_name, library_preparation, library_layout, sequencing_strategy, nata_accreditation, reference_genome, workflow_usage, workflow_accession):
        self.workflow_name = workflow_name
        self.library_preparation = library_preparation
        self.library_layout = library_layout
        self.sequencing_strategy = sequencing_strategy
        self.nata_accreditation = nata_accreditation
        self.reference_genome = reference_genome
        self.workflow_usage = workflow_usage
        self.workflow_accession = workflow_accession

    def __repr__(self):
         return '<Workflow %r>' % self.workflow_name

class Pipeline(db.Model):
    __tablename__='pipeline'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    pipeline_name = db.Column(db.String(100))
    pipeline_provider = db.Column(db.String(200))

    institute_id= db.Column(db.Integer, db.ForeignKey('institute.id'))

    workflow_id = db.relationship('Workflow', backref='pipeline', lazy='dynamic')

    def __init__(self, pipeline_name, pipeline_provider):
        self.pipeline_name = pipeline_name
        self.pipeline_provider = pipeline_provider

    def __repr__(self):
         return '<Pipeline %r>' % self.pipeline_name

class Institute(db.Model):
    __tablename__='institute'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    institute_name = db.Column(db.String(100))
    institute_logo = db.Column(db.String(200))
    institute_long = db.Column(db.Integer)
    institute_lat = db.Column(db.Integer)

    pipeline_id = db.relationship('Pipeline', backref='institute', lazy='dynamic')

    def __init__(self, institute_name):
        self.institute_name = institute_name

    def __repr__(self):
        return '<Institute %r>' % self.institute_name

class Workflow_Description(db.Model):
    __tablename__='workflow_desc'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    description = db.Column(db.String(500))
    cwl_link= db.Column(db.String(50))

    workflow_id = db.relationship('Workflow', backref='workflow_desc', lazy='dynamic')

    def __init__(self, description, cwl_link):
        self.description = description
        self.cwl_link = cwl_link

    def __repr__(self):
        return '<Workflow_Description %r>' % self.description

@app.route('/')
def homepage():
    title = 'Australian Genomics Registry of Pipelines'
    subhead = 'This is the home of the Australian Genomics Bioinformatics pipeline registry.'
    subheading1 = 'Purpose and scope'
    subheading2 = 'Rationale'
    subheading3 = 'Links'
    subheadtext1 = 'The Australian Genomics registry provides a standardised description of the bioinformatic pipelines.This includes the pipelines in operation across key' \
                   'Australian Healthcare organisations. including those used by Australian Genomics Flagships. ' \
                   'The pipelines have been described using a community-developed and engineered standard, the Common Workflow language (CWL). ' \
                   'Using CWL explorer, the documents can be rendered into a dynamic graphical visualisation, ' \
                   'enabling detailed exploration of the structure and composition of a pipeline.'
    subheadtext2 = 'Pipelines are complex series of operations, packages and libraries layered and held together by one or many workflow languages, scripts and code. ' \
                   'It is not unusual for a pipeline to have been built for a different use-case ' \
                   'with the structure changing and evolving as the project or institute direction changes and new features are appended to the code. ' \
                   'Pipeline often contain many legacy features which might still be executed despite their redundancy for the current project.' \
                   'One barrier to pipeline transparency is a lack of standards for describing pipelines.' \
                   'The AGHA registry '

    searchterm=Pipeline.query.all()
    instituterow = Institute.query.all()

    return render_template("main.html", title=title, subhead=subhead, subheading1=subheading1,
                           subheadtext1=subheadtext1, subheading3=subheading3, searchterm=searchterm, instituterow=instituterow)


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
    pipelinerows = Pipeline.query.order_by(Pipeline.pipeline_name).all()

    return render_template('registry.html', title=title, subhead=subhead, subheading1=subheading1,
                           subheadtext1=subheadtext1, pipelinerows=pipelinerows)


@app.route('/explorer.html')
def explorer():
    title = 'CWL explorer'
    subhead = ''
    subheading1 = 'Purpose and scope'
    subheadtext1 = 'This tool accepts CWL workflow and tool definitions as inputs and renders tjhe pipelines as an interactive di-acyclic (DAG) graphic visualisation.'
    subheading2 = 'Demo'
    urllink = 'https://bjpop.github.io/cwl_explorer/'
    pipelinerows = Pipeline.query.order_by(Pipeline.pipeline_name).all()

    return render_template('explorer.html', title=title, subhead=subhead, subheading1=subheading1,
                           subheadtext1=subheadtext1, subheading2=subheading2, urllink=urllink, pipelinerows=pipelinerows)


@app.route('/overview.html', methods=['GET'])
def index():
    pipelinerows = Pipeline.query.order_by(Pipeline.pipeline_name).all()
    workflowrows = Workflow.query.order_by(Workflow.workflow_name).all()
    return render_template('overview.html', title='Overview', pipelinerows=pipelinerows, workflowrows=workflowrows)


@app.route('/flagship.html', methods=['GET'])
def flagship():
    flagshiprows = Flagship.query.order_by(Flagship.flagship_name).all()
    return render_template('flagship.html', title='Overview',flagshiprows=flagshiprows)

@app.route('/pipeline_desc.html')
def pipeline_desc():
    return render_template("pipeline_desc.html")

@app.route('/resources.html')
def resources():
    return render_template("resources.html")

@app.route('/search.html', methods=['GET'])
def search():
    return render_template("search.html")


@app.route('/upload_to_db.html', methods=['GET','POST'])
def upload_to_db():

    searchterm = Pipeline.query.all()

    if request.method == 'GET':
        workflowrows = Workflow.query.all()
        instituterows = Institute.query.all()
        pipelinerows = Pipeline.query.all()

        return render_template("upload_to_db.html", workflowrows=workflowrows,
                               instituterows=instituterows, pipelinerows=pipelinerows, searchterm=searchterm)

    elif request.method == 'POST':

        flagship_name_temp = request.form['flagship_name']
        flagship_institute_temp = request.form['flagship_institute']
        flagship_lead_temp = request.form['flagship_lead']
        flagshipDiseaseType_temp = request.form['flagshipDiseaseType']

        query = db.session.query(Flagship).filter(Flagship.flagship_name == flagship_name_temp).first()

        if query == None:
            print('i dont exist so add me')
            new_flagship = Flagship(flagship_name_temp, flagship_institute_temp, flagship_lead_temp, flagshipDiseaseType_temp)
            db.session.add(new_flagship)
            db.session.commit()
            return redirect(url_for('search'))
        else:
            print('I already exist in the database')
            return redirect(url_for('upload_to_db'))

    else:
        return "Form didn't validate"

if __name__ == '__main__':
    app.run()
