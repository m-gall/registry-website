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
from registry_model import Flagship, Pipeline, Workflow, Institute, Term, Workflow_Description

## paste the registry data into the interpreter form registry_data.py


## generate a list of names:
flagship = [flagship_kidgen, flagship_neuro, flagship_mito, flagship_som, flagship_brain, flagship_enc, flagship_imm, flagship_mgha, flagship_paed, flagship_null]
institute = [institute_imb, institute_mb, institute_pm, institute_sap, institute_atcg, institute_kccg, institute_vcgs, institute_qimr, institute_pathwest, institute_schn, institute_nci]
pipeline = [pipeline_imb, pipeline_kccg, pipeline_vcgs, pipeline_mb_cpipe, pipeline_pm, pipeline_mb_seq, pipeline_atcg, pipeline_sap, pipeline_qimr, pipeline_nci, pipeline_pathwest, pipeline_schn]
workflow = [workflow_pm_panel, workflow_pm_exome, workflow_mb_exome, workflow_vcgs_exome, workflow_vcgs_panel1, workflow_vcgs_panel2, workflow_sap_exome, workflow_sap_panel, workflow_kccg_som, workflow_kccg_germ, workflow_qimr_som, workflow_qut_som, workflow_nci, workflow_pathwest_panel, workflow_schn_panel, workflow_imb_trio]
term = [def_term1, def_term2, def_term3, def_term4, def_term5, def_term6, def_term7, def_term8, def_term39, def_term10, def_term11, def_term12, def_term13, def_term14, def_term15, def_term16, def_term17, def_term19, def_term20, def_term21, def_term22, def_term23, def_term24, def_term25, def_term26, def_term27, def_term28, def_term29]
work_desc = [desc_0, desc_1, desc_2, desc_3, desc_4, desc_5, desc_6, desc_7, desc_8, desc_9, desc_10, desc_11, desc_12]
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


for i in term:
    db.session.add(i)
    print(i, 'done')

for i in work_desc:
    db.session.add(i)
    print(i, 'done')

## commit to the database
db.session.commit()

## data to the database via registry_data.py
