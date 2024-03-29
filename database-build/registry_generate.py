## create database instance:
cd
cd Documents/code/flask_projects

#virtualenv registry-v1
#cd registry-v1
#source bin/activate

#pip3 install flask
#pip3 install flask_sqlalchemy

#python3

## load the database schema
from registry_model import db

## create the database
db.create_all()

## add tables to the database
from registry_model import Flagship, Pipeline, Workflow, Institute, Workflow_Description

## paste the registry data into the interpreter form registry_data.py


## generate a list of names:
flagship = [flagship_kidgen, flagship_neuro, flagship_mito, flagship_som, flagship_brain, flagship_enc, flagship_imm, flagship_mgha, flagship_paed, flagship_null]
institute = [institute_imb, institute_mb, institute_pm, institute_sap, institute_atcg, institute_kccg, institute_vcgs, institute_qimr, institute_pathwest, institute_schn]
pipeline = [pipeline_imb, pipeline_kccg, pipeline_vcgs, pipeline_mb_cpipe, pipeline_pm, pipeline_mb_seq, pipeline_atcg, pipeline_sap]
workflow = [workflow_pm_panel, workflow_pm_exome, workflow_mb_exome, workflow_vcgs_exome, workflow_vcgs_panel1, workflow_vcgs_panel2, workflow_sap_exome, workflow_sap_panel]


## add and commit to the database

for i in flagship:
    db.session.add(i)
    print(i, 'done')


for i in institute:
    db.session.add(i)
    print(i, 'done')

for i in pipeline:
    db.session.add(i)
    print(i, 'done')


for i in workflow:
    db.session.add(i)
    print(i, 'done')


## commit to the database
db.session.commit()

## data to the database via registry_data.py
