 National Computing Infrastructure 

#### General Pipeline information 

Perl-based workflow manager, which manages job queues and logs/tracks sample information. A mysql database stores this information. The pipeline itself is largely composed of perl-based scripts with XML configurations. All variants are uploaded to an in-house database. Prior to variant annotation, variants are compared against the in-house database. Only variants novel to the database are annotated which improves the efficiency of the annotation stages.

In-house scripts remove variants discovered which are outside of exon boundaries and splice-sites.

#### Target definition 

 * Bed file containing library capture sites
 * Bed file containing exon boundaries from XX

#### Sample QC 

 * Adaptor trimming performed by sequencing provider.
 * Individuals may be split across a lane (representing a flow-cell). Alignment is performed by lane and the bam files merged.
 * Some variant stages are split by chromosome to improve processing time.

#### FASTQ QC 

 * Exon depth of coverage checked - cursory check for evidence of sequencing errors such as high levels of duplication, under or over-represented sequences. Thresholds set which indicate error. Uses _samtools version 0.1.18_ - mpileup to calculate read depth over exon regions (intersect of exons and library capture sites).

#### Alignment/Assembly 

 * _bwa-mem version 0.6.1-r104_  - align reads by lane then perform bam merge.

#### BAM QC 

 * exon depth: _samtools version 1.3.1_ - calculate coverage across intersection of exon and library capture sites -> output to exon report -> parallel by chr. Its functions largely as a check to detect instances where samples may have been undersequenced or many PCR duplicates indicative of a sequencing error. Hard-cut offs for coverage set as thresholds for detection of errors.
 * Indel realignment: _GATK RealignerTargetCreator + IndelRealigner_
 * base recalibration: _GATK BaseRecalibrator + PrintReads_

#### Variant Calling 

#### SNV & Indels 
 * _GATK HaplotypeCaller_ - call by chromosome - followed by a merge of the vcf files
 * _GATK genotypeGVCF_ - sample-by-sample calling

#### Structural variants 
 * _Lumpy version 0.2.13_
 * _Delly version 0.7.3_
 * Structural variants are called using both delly and lumpy, with the results from outputs considered separately.

#### Variant Annotation 

 * _VEP version 88_ with offline cache - flags: --canonical --domains --af --pubmed --check_existing --numbers --canonical --coding_only --poly b --sift b
 * plugins: CADD
 * annotation against DGV updated 230715 - a curated catalogue of structural variants

<<BR>>
_____________________________________________________________
||_Type of annotation_____||_Source of annotation/Software_||
|| Population frequencies || dbSNP                         ||
|| Clinical annotations   || clinvar last updated 070515   ||
|| variant annotations    || dbsnp version 138, exac 0.3   ||
|| Structural based       ||                               ||
|| Prediction based       || VEP                           ||
||________________________||_______________________________||

#### Variant Filtering 
Variants may be filtered for the following:

 * splice site variants
 * exon variants

#### Pre-annotation filters 

 * Comparison of variants to internal databases. Only novel variants are then annotated to reduce computation time for annotation.
 * Select for splice-site mutations

#### Post-annotation filters 

 * SNVS's and indels: flags on minor allele, exac and clinvar frequencies

#### Variant QC 

 * _GATK VariantRecalibrator_ with default priors and truth sets

#### Verification/Validation 

* No sex or sample checks performed.

#### Curation 


#### Reporting 
 * duplicate metrics file
 * exonReport.summary.tsv - generated from the merged bam
 * readReport.summary.txt - generated from the merged bam
 * final list of variants with annotations output as a table

Page contributors: M. Gall (AGHA), Aaron Chuah (NCI), Dan Andrews (NCI)
