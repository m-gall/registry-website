#!/usr/bin/env python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Table, Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base


app= Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']= 'sqlite:////Users/mailie/PycharmProjects/registry-v1/registry-v1.db'

db = SQLAlchemy(app)

class Flagship(db.Model):
    __tablename__='flagship'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    flagship_name = db.Column(db.String(100))
    flagship_institute = db.Column(db.String(100))
    flagship_lead = db.Column(db.String(100))
    flagshipDiseaseType = db.Column(db.String(100))

    workflow_id = Column(Integer, ForeignKey('flagship.id'))
    workflow = db.relationship('Workflow', backref='flagship', lazy='dynamic')
    #
    # def __init__(self, flagship_name, flagship_institute, flagship_lead, flagshipDiseaseType):
    #     self.flagship_name = flagship_name
    #     self.flagship_institute = flagship_institute
    #     self.flagship_lead = flagship_lead
    #     self.flagshipDiseaseType = flagshipDiseaseType
    #
    # def __repr__(self):
    #      return '<Flagship %r>' % self.flagship_name


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
    workflow_desc_id = db.Column(db.Integer, db.ForeignKey('workflow_Description.id'))

    # def __init__(self, workflow_name, library_preparation, library_layout, sequencing_strategy, nata_accreditation, reference_genome, workflow_usage, workflow_accession):
    #     self.workflow_name = workflow_name
    #     self.library_preparation = library_preparation
    #     self.library_layout = library_layout
    #     self.sequencing_strategy = sequencing_strategy
    #     self.nata_accreditation = nata_accreditation
    #     self.reference_genome = reference_genome
    #     self.workflow_usage = workflow_usage
    #     self.workflow_accession = workflow_accession

    def __repr__(self):
         return '<Workflow %r>' % self.workflow_name

class Pipeline(db.Model):
    __tablename__='pipeline'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    pipeline_name = db.Column(db.String(100))
  #  pipeline_provider = db.Column(db.String(200))

    institute_id = db.Column(db.Integer, db.ForeignKey('institute.id'))

    workflow_id = db.relationship('Workflow', backref='pipeline', lazy='dynamic')
    #
    # def __init__(self, pipeline_name, institute_id = []):
    #     self.pipeline_name = pipeline_name
    #     self.institute_id = institute_id
    #  #   self.pipeline_provider = pipeline_provider
    #
    # def __repr__(self):
    #      return '<Pipeline %r>' % self.pipeline_name


class Institute(db.Model):
    __tablename__='institute'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    institute_name = db.Column(db.String(100))
    institute_logo = db.Column(db.String(200))
    institute_long = db.Column(db.Integer)
    institute_lat = db.Column(db.Integer)

    pipeline_id = db.relationship('Pipeline', backref='institute', lazy='dynamic')
    #
    # def __init__(self, institute_name, institute_logo, institute_long, institute_lat):
    #     self.institute_name = institute_name
    #     self.institute_logo = institute_logo
    #     self.institute_long = institute_long
    #     self.institute_lat = institute_lat
    #
    # def __repr__(self):
    #     return '<Institute %r>' % self.institute_name


class Workflow_Description(db.Model):
    __tablename__='workflow_Description'
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
    #
    # def __init__(self, description, cwl_link):
    #     self.description = description
    #     self.cwl_link = cwl_link
    #
    # def __repr__(self):
    #     return '<Workflow_Description %r>' % self.description

class Term(db.Model):
    __tablename__='term'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    term_name = db.Column(db.String(50))
    term_definition = db.Column(db.String(500))
    term_type = db.Column(db.String(50))
    provenance = db.Column(db.String(50))

#    def __init__(self, term_name, term_definition, term_type, term_provenance):
#        self.term_name = term_name
#         self.term_definition = term_definition
#         self.term_type = term_type
#         self.term_provenance = term_provenance
#
#     def __repr__(self):
#         return '<term_name %r>' % self.term_name


print('db model built successfully - woo hoo!')


### database creation:
## from registry-v1 import db
##db.create_all()
