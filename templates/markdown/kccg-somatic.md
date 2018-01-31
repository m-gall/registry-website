 KCCG Somatic T-N pipeline

#### General Pipeline information


#### Sample QC

#### FASTQ QC

 * fastQC for read quality evaluation
 * not inspected, but stored to assist with troubleshooting

#### Alignment/Assembly

 * Read alignment - _bwa-mem 0.7.10-r789_
 * PCR duplicate marking and coordinate sorting performed simultaneously - _novosort V1.03.01_ - duplicates marked
 * duplicate marking performed prior to merging
 * Following duplication, sorted tumour and normal bams are merged using Novosort Merge
 * Indel realignment and base recalibration performed with GATK

#### BAM QC

 * _Picard WgsMetrics_ and metrics collated with _Picard Collate Metrics_
 * _GATK DepthOfCoverage_ over all genes
 * metrics/statistics are calculated over sorted & merged tumour/normal bam

#### Variant Calling

#### SNV & Indels 

 * _GATK HaplotypeCaller v3.3_
 * _strelka version XX_ - matched tumour- normal bam files.
 * gvcf generated using GATK genotypeGVCF but only a single sample called if proband only

#### Structural variants & CNV's 
 * _Manta_ - reference sites discovered in Manta as used by strelka
 * _sequenza_

#### mtDNA SNV + INDEL 
 * In progress

#### Variant Annotation

 * _VEP v74_
 * _Gemini_
 * Custom variant filtration tool, Seave (www.seave.bio) with in house databases: OMIM, ClinVar, COSMIC, Orphanet
 * Variant normalisation not performed

#### Variant Filtering

 * _GATK VQSR_ for variant recalibration
 * _GATK VariantEval for collection of statistics_

#### Pre-annotation filters 

#### Post-annotation filters 

#### Variant QC

 * _GATK VariantEval_
 * In house VCF report (vs PED file, kinship coefficients, variant quality and number of categories)

#### Verification/Validation

 * Sample mixups: ExomeID via sendaway DNA sample to AGRF, and integrated with calls from WGS BAM file.
 * System-wide updates: NA12878 samples sequenced, or WGS data analysed, and run through KCCG Performance Reporter.

#### Curation


#### Reporting

 * Clinically relevant variants managed in Patient Archive
 * Report template drafted in Patient Archive, then manually edited.
<<BR>>
