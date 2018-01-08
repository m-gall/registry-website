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
from registry_model import Flagship, Pipeline, Workflow, Institute, Term, Workflow_Description, PipelineSummary

## paste the registry data into the interpreter form registry_data.py


## generate a list of names:

flagship = [flagship_kidgen, flagship_neuro, flagship_mito, flagship_som, flagship_brain, flagship_enc, flagship_imm, flagship_mgha, flagship_paed, flagship_null]
institute = [institute_imb, institute_mb, institute_pm, institute_sap, institute_atcg, institute_kccg, institute_vcgs, institute_qimr, institute_pathwest, institute_schn, institute_nci]
pipeline = [pipeline_imb, pipeline_kccg, pipeline_vcgs, pipeline_mb_cpipe, pipeline_pm, pipeline_mb_seq, pipeline_atcg, pipeline_sap, pipeline_qimr, pipeline_nci, pipeline_pathwest, pipeline_schn]
workflow = [workflow_pm_panel, workflow_pm_exome, workflow_mb_exome, workflow_vcgs_exome, workflow_vcgs_panel1, workflow_vcgs_panel2, workflow_sap_exome, workflow_sap_panel, workflow_kccg_som, workflow_kccg_germ, workflow_qimr_som, workflow_qut_som, workflow_nci, workflow_pathwest_panel, workflow_schn_panel, workflow_imb_trio]
work_desc = [desc_0, desc_1, desc_2, desc_3, desc_4, desc_5, desc_6, desc_7, desc_8, desc_9, desc_10, desc_11, desc_12]
term = [def_term1, def_term2, def_term3, def_term4, def_term5, def_term6, def_term7, def_term8, def_term9, def_term10, def_term11, def_term12, def_term13, def_term14, def_term15, def_term16, def_term17, def_term18, def_term18, def_term19, def_term20, def_term21, def_term22, def_term23, def_term24, def_term25, def_term26, def_term27, def_term28, def_term29, def_term30, def_term31, def_term32, def_term33, def_term34, def_term35, def_term36, def_term37, def_term38, def_term39, def_term40, def_term41, def_term42, def_term43, def_term44, def_term45, def_term46, def_term47, def_term48, def_term49, def_term50, def_term51, def_term52, def_term53, def_term54, def_term55, def_term56, def_term57, def_term58, def_term59, def_term60, def_term61, def_term62, def_term63, def_term64, def_term65, def_term66, def_term67, def_term68, def_term69, def_term70, def_term71, def_term72, def_term73, def_term74, def_term75, def_term76, def_term77, def_term78, def_term79, def_term80, def_term81, def_term82, def_term83, def_term84, def_term85, def_term86, def_term87, def_term88, def_term89, def_term90, def_term91, def_term92, def_term93, def_term94, def_term95, def_term96, def_term97, def_term98, def_term99, def_term100, def_term101, def_term102, def_term103, def_term104, def_term105, def_term106, def_term107, def_term108, def_term109, def_term110, def_term111, def_term112, def_term113, def_term114, def_term115, def_term116, def_term117, def_term118, def_term119, def_term120, def_term121, def_term122, def_term123, def_term124, def_term125, def_term126, def_term127, def_term128, def_term129, def_term130, def_term131, def_term132, def_term133, def_term134, def_term135, def_term136, def_term137, def_term138, def_term139, def_term140, def_term141]



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


sqlite3 registry-v1.db

.mode csv

.import PipelineSummary.csv PipelineSummary

.UPDATE Workflow SET workflow_json = '' WHERE workflow_name= '';