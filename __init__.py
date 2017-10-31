from flask import Flask, render_template, request, redirect



from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)

app.config[
    'SQLALCHEMY_DATABASE_URI'] = 'sqlite:////Users/mailie/Documents/code/scratch/sqlalchemy/sqlalchemy-workspace/registry-v1.db'

db= SQLAlchemy(app)


class Flagship(db.Model):
    __tablename__='flagship'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    flagship_name = db.Column(db.String(100))
    flagship_institute = db.Column(db.String(100))
    flagship_lead = db.Column(db.String(100))
    flagshipDiseaseType = db.Column(db.String(100))

    workflow_id = db.relationship('Workflow', backref='flagship', lazy='dynamic')


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

    pipeline_id= db.Column(db.Integer, db.ForeignKey('pipeline.id'))
    flagship_id = db.Column(db.Integer, db.ForeignKey('flagship.id'))


class Pipeline(db.Model):
    __tablename__='pipeline'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    pipeline_name = db.Column(db.String(100))
    pipeline_institute = db.Column(db.String(200))

    workflow_id = db.relationship('Workflow', backref='pipeline', lazy='dynamic')

@app.route('/', methods=['GET'])
def homepage():
    title = 'Australian Genomics Health Alliance Registry of Pipelines'
    subhead = 'This is the home of the Australian Genomics pipeline registry.'
    subheading1 = 'Purpose and scope'
    subheading2 = ''
    subheading3 = 'Links'
    subheadtext1 = 'The Australian Genomics registry provides a standardised description of the bioinformatic pipelines.This includes the pipelines in operation across key' \
                   'Australian Healthcare organisations. including those used by Australian Genomics Flagships. ' \
                   'The pipelines have been described using a community-developed and engineered standard, the Common Workflow language (CWL). ' \
                   'Using CWL explorer, the documents can be rendered into a dynamic graphical visualisation, ' \
                   'enabling detailed exploration of the structure and composition of a pipeline.'
    subheadtext2 = ''

    myname=Pipeline.query.all()

    return render_template("main.html", title=title, subhead=subhead, subheading1=subheading1, subheading2=subheading2,
                           subheadtext1=subheadtext1,
                           subheadtext2=subheadtext2, subheading3=subheading3, myname=myname)


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
    return render_template('registry.html', title=title, subhead=subhead, subheading1=subheading1,
                           subheadtext1=subheadtext1)


@app.route('/explorer.html')
def explorer():
    title = 'CWL explorer'
    subhead = ''
    subheading1 = 'Purpose and scope'
    subheadtext1 = 'This tool accepts CWL workflow and tool definitions as inputs and renders tjhe pipelines as an interactive di-acyclic (DAG) graphic visualisation.'
    return render_template('explorer.html', title=title, subhead=subhead, subheading1=subheading1,
                           subheadtext1=subheadtext1)



@app.route('/overview.html', methods=['GET'])
def index():
    pipelinerows = Pipeline.query.all()
    workflowrows = Workflow.query.all()
    return render_template('overview.html', title='Overview',pipelinerows=pipelinerows, workflowrows=workflowrows)


@app.route('/flagship.html', methods=['GET'])
def flagship():
    flagshiprows = Flagship.query.all()
    return render_template('flagship.html', title='Overview',flagshiprows=flagshiprows)

@app.route('/add.html', methods=['GET'])
def add():
    name = request.form("myname")
    return render_template('add.html', title='Overview')


if __name__ == '__main__':
    app.run()
