from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Flagship(db.Model):
    __tablename__ = 'flagship'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    flagship_name = db.Column(db.String(100))
    flagship_institute = db.Column(db.String(100))
    flagship_lead = db.Column(db.String(100))
    flagshipDiseaseType = db.Column(db.String(100))

    workflows = db.relationship('Workflow', back_populates='flagship')

    def __init__(self, flagship_name, flagship_institute, flagship_lead, flagshipDiseaseType):
        self.flagship_name = flagship_name
        self.flagship_institute = flagship_institute
        self.flagship_lead = flagship_lead
        self.flagshipDiseaseType = flagshipDiseaseType

    def __repr__(self):
        return '<Flagship %r>' % self.flagship_name


class Workflow(db.Model):
    __tablename__ = 'workflow'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    workflow_name = db.Column(db.String(100))
    library_preparation = db.Column(db.String(100))
    library_layout = db.Column(db.String(200))
    sequencing_strategy = db.Column(db.String(50))
    nata_accreditation = db.Column(db.String(50))
    reference_genome = db.Column(db.String(50))
    workflow_usage = db.Column(db.String(50))
    workflow_accession = db.Column(db.VARCHAR(50))

    pipeline_id = db.Column(db.Integer, db.ForeignKey('pipeline.id'))
    flagship_id = db.Column(db.Integer, db.ForeignKey('flagship.id'))
    workflow_desc_id = db.Column(db.Integer, db.ForeignKey('workflow_Description.id'))

    flagship = db.relationship('Flagship', back_populates='workflows')

    def __repr__(self):
        return '<Workflow %r>' % self.workflow_name


class Pipeline(db.Model):
    __tablename__ = 'pipeline'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    pipeline_name = db.Column(db.String(100))
    institute_id = db.Column(db.Integer, db.ForeignKey('institute.id'))
    workflow_id = db.relationship('Workflow', backref='pipeline', lazy='dynamic')

    def __repr__(self):
        return '<Pipeline %r>' % self.pipeline_name


class Institute(db.Model):
    __tablename__ = 'institute'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    institute_name = db.Column(db.String(100))
    institute_logo = db.Column(db.String(200))
    institute_long = db.Column(db.Integer)
    institute_lat = db.Column(db.Integer)

    pipeline_id = db.relationship('Pipeline', backref='institute', lazy='dynamic')

    def __repr__(self):
        return '<Institute %r>' % self.institute_name


class Workflow_Description(db.Model):
    __tablename__ = 'workflow_Description'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    description = db.Column(db.String(500))
    workflow_manager = db.Column(db.String(200))
    cwl_link = db.Column(db.String(200))
    sample_qc = db.Column(db.String(200))
    fastq_qc = db.Column(db.String(200))
    alignment = db.Column(db.String(200))
    bam_qc = db.Column(db.String(200))
    variant_calling = db.Column(db.String(200))
    variant_annotation = db.Column(db.String(200))
    variant_filtering = db.Column(db.String(200))
    variant_qc = db.Column(db.String(200))
    verification = db.Column(db.String(200))
    reporting = db.Column(db.String(200))

    workflow_id2 = db.relationship('Workflow', backref='workflow_Description', lazy='dynamic')

    def __repr__(self):
        return '<Workflow_Description %r>' % self.description


class Term(db.Model):
    __tablename__ = 'term'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    term_name = db.Column(db.String(50))
    term_definition = db.Column(db.String(500))
    term_type = db.Column(db.String(50))
    provenance = db.Column(db.String(50))

    def __repr__(self):
        return '<term_name %r>' % self.term_name
