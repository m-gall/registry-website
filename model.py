from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Flagship(db.Model):
    __tablename__ = 'flagship'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    flagship_name = db.Column(db.String(100))
    flagship_institute = db.Column(db.String(100))
    flagship_lead = db.Column(db.String(100))
    flagshipDiseaseType = db.Column(db.String(100))

    institute_id = db.Column(db.Integer, db.ForeignKey('institute.id'))

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
    cwlexplorer_accession = db.Column(db.VARCHAR(50))
    workflow_accession = db.Column(db.VARCHAR(50))
    workflow_version = db.Column(db.VARCHAR(50))
    workflow_json = db.Column(db.String(1000))

    institute_id = db.Column(db.Integer, db.ForeignKey('institute.id'))
    pipeline_id = db.Column(db.Integer, db.ForeignKey('pipeline.id'))
    flagship_id = db.Column(db.Integer, db.ForeignKey('flagship.id'))
    workflow_desc_id = db.Column(db.Integer, db.ForeignKey('workflow_Description.id'))
    pipeline_summary_id = db.Column(db.Integer, db.ForeignKey('pipeline_summary.id'))

    flagship = db.relationship('Flagship', back_populates='workflows')
  #  pipeline_summary = db.relationship('PipelineSummary', back_populates='workflows2')

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

    workflow_id = db.relationship('Workflow', backref='institute', lazy='dynamic')
    flagship_id = db.relationship('Flagship', backref='institute', lazy='dynamic')

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

    workflow_id2 = db.relationship('Workflow', backref='workflow_Description')

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


class Pipeline_summary(db.Model):
    __tablename__ = 'pipeline_summary'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    pipeline_authors = db.Column(db.String(500))
    pipeline_name = db.Column(db.String(500))
    nata_accredited = db.Column(db.String(500))
    version_controlled_pipeline = db.Column(db.String(500))
    research_or_diagnostic = db.Column(db.String(500))
    pipeline_performance_checks = db.Column(db.String(500))
    sample_type = db.Column(db.String(500))
    sequencing_provider = db.Column(db.String(500))
    somatic_or_germline = db.Column(db.String(500))
    library_prep = db.Column(db.String(500))
    target_site_definition = db.Column(db.String(500))
    scale_of_samples_processed = db.Column(db.String(500))
    workflow_pipeline_manager = db.Column(db.String(500))
    workflow_Language = db.Column(db.String(500))
    script_language = db.Column(db.String(500))
    provenance_platform = db.Column(db.String(500))
    patient_metadata_tracking = db.Column(db.String(500))
    transparent_log_files = db.Column(db.String(500))
    version = db.Column(db.String(500))
    decoy = db.Column(db.String(500))
    fastq_checks = db.Column(db.String(500))
    automatic_pipeline_exit = db.Column(db.String(500))
    pipeline_report_for_fastq_quality = db.Column(db.String(500))
    alignment = db.Column(db.String(500))
    align_parallelised = db.Column(db.String(500))
    deduplication = db.Column(db.String(500))
    indel_realignment = db.Column(db.String(500))
    indel_known_sites = db.Column(db.String(500))
    base_recal = db.Column(db.String(500))
    dbsnp_version = db.Column(db.String(500))
    base_recal_sites_ref = db.Column(db.String(500))
    padding_hard_coded_or_config_param = db.Column(db.String(500))
    annotate_parallelised = db.Column(db.String(500))
    vcf_version = db.Column(db.String(500))
    mutations_called_jointly = db.Column(db.String(500))
    limited_discovery_across_genome = db.Column(db.String(500))
    joint_genotyping_or_singleton = db.Column(db.String(500))
    joint_genotyping_min_sample_size = db.Column(db.String(500))
    joint_calling_for_somatics = db.Column(db.String(500))
    hard_or_VQSR = db.Column(db.String(500))
    vqsr_minimum_sample_size = db.Column(db.String(500))
    VQSR_training_sets = db.Column(db.String(500))
    filters_different_for_mutation_type = db.Column(db.String(500))
    location_of_databases = db.Column(db.String(500))
    cache_version = db.Column(db.String(500))
    flexibility_of_database_update_and_additions = db.Column(db.String(500))
    annotations_parallelised = db.Column(db.String(500))
    filters_on_impact_frequency = db.Column(db.String(500))
    normalisation = db.Column(db.String(500))
    multiple_transcripts = db.Column(db.String(500))
    curation_guidelines = db.Column(db.String(500))
    sex_checks = db.Column(db.String(500))
    sample_mix_up_checks = db.Column(db.String(500))
    sanger_or_orthogonal_testing = db.Column(db.String(500))
    verification = db.Column(db.String(500))
    manual_review_of_variants = db.Column(db.String(500))
    format = db.Column(db.String(500))


    def __repr__(self):
        return '<PipelineSummary %r>' % self.pipeline_name