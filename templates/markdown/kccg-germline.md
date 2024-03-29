 The Kinghorn Centre for Clinical Genomics

#### General Pipeline information
#### Sample QC
 * Laboratory instrumentation QC metrics are captured within Clarity LIMS system.
 * Metrics are visualised and compared using Tableau, both interactively, and via live, data-generated Wallboards.

#### FASTQ QC
 * demultpliex - bcl2fastq2. No trimming.
 * _FastQC_
 * QC metrics for each run from Illumina _HAS_ (HiSeq Analysis Suite).
 * ''FastQC report is checked by bioinformaticians prior to reporting''

#### Alignment/Assembly
 * Read alignment -  PCR duplicate marking and coordinate sorting - _novosort v1.03.01_
 * Read improvement: _GATK Indel Realignment v3.3_, _GATK Base Recalibration v3.3_

#### BAM QC
 * _Picard WgsMetrics_
 * _GATK DepthOfCoverage_ over all genes

#### Variant Calling

 * vcf 4.1 from GATK v3.3 standard output.

#### SNV & Indels 
 * _GATK HaplotypeCaller v3.3_
 * Joint-calling but if proband-only, no other samples are included.
 * ''A minimum of X samples is required for joint calling. If insufficient samples, gold standard reference sets are added to the analyses''

#### Structural variants & CNV's 
 * _VarPipeSV_ (manuscript in preparation). This starts with calls from _CNVnator_ (CNV) and _lumpy_ (SV), and performs extensive downstream annotation, filtering and variant enrichment

#### mtDNA SNV + INDEL 
 * In progress

#### Variant Annotation
 * _VEP v74_
 * _Gemini_  - annotations in Gemini are over-ridden with up-to-date OMIM, ClinVar, COSMIC monthly updates. Orphanet is less frequently updated.
 * Custom variant filtration tool, Seave (www.seave.bio) with in house databases: OMIM, ClinVar, COSMIC, Orphanet

#### Variant Filtering
 * _GATK VQSR_
 * SNP & indel - _GATK applyrecalibration_ truth sensitivity: ts_filter_level:99.9 - prior to annotation

#### Variant QC
 * _GATK VariantEval_
 * In house VCF report (vs PED file, kinship coefficients, variant quality and number of categories)

#### Verification/Validation
 * Sample mixups: ExomeID via sendaway DNA sample to AGRF, and integrated with calls from WGS BAM file.
 * System-wide updates: NA12878 samples sequenced, or WGS data analysed, and run through KCCG Performance Reporter.
 * Kinship tests - [[http://people.virginia.edu/~wc9c/KING/|KING]]

#### Curation

 * Clinical SOP for phenotype-driven gene-list selection and filtering.

#### Reporting
 * Clinically relevant variants managed in Patient Archive
 * Report template drafted in Patient Archive, then manually edited.
 * Quality report: mark_duplicates, depth of coverage


Page contributors: M. Gall (AGHA), Mark Cowley (TKCC)
