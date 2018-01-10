 SAPath Germline - exome sequencing


#### General information

 * Exome analyses rarely performed due to high cost of library preparation. Exome analyses would more commonly implemented in research. An exome library preparation with gene panel masking might sometimes be conducted. Analysis may be for an untargeted gene set (full exome) or for a targeted gene list (genes of interest/GOI). refSeq genes of interest are stored with the patient metadata.
 * Raw sequence data is uploaded to SAPath servers as fastq files. Patient metadata is stored in local database.
 * Individuals may be sequenced across several lanes with several individuals multiplexed each lane OR one individual / lane. If individuals are sequenced across several lanes, samples are processed separately up to base recalibration, after which the lanes for an individual are merged using samtools -- merge version XX.

 . The following metadata is captured for an individual:

||Surname ||Given Name ||DOB ||Sex ||State || Requisition number ||Sample Type ||Date collected ||Sample received ||Extraction ID ||External DNA # ||DNA Storage Ref || NGS Number ||Referring Doctor ||Request Info ||Kit requested ||Lead Scientist ||Expected TAT ||Request Received ||Consent Received ||Phenotype ||Enquiry Comments || Library PrepID ||Sequence batch ID ||Instrument ||Sample_ID ||


#### Diagnostic Target definition
For some stages, analyses are restricted to sites defined by the library capture sites. No analyses involve exon sites only or intersect of exons and library capture sites.

#### Sample QC
 * _Illumina Sequence Analysis Viewer_ to evaluate run quality.
 * Variants which have been identified of clinical interest is visually inspected for artifacts/quality in IGV. As variants flagged of clinical interest will be visually assessed in IGV and scientists trained on the potential artifacts, filtering strategies are kept lenient to minimise removal of clinically-relevant variants.
 * Per sample, a detailed sequence performance and coverage report is generated.

#### FASTQ QC
 * Demultiplexing: _bcl2fastq version XX_ if required.
 * Adaptor removal and trimming performed with _cutadapt version XX_. Adaptors are provided in a fasta file (e.g. 5_adapters_truseq.fasta, 3_adapters_truseq.fasta).

 * Raw sequencing data quality is checked using _FastQC version 0.11.5_ with default parameters.  FastQC scanned by bioinformatician as check for run quality. Poor quality does not automatically exclude the sample from variant calling.

#### Alignment/Assembly
 * Reads are mapped to the hg19 v37+decoy reference genome with _bwa-kit v0.7.12-r1039_ using bwa-mem algorithm and default settings
 * PCR duplicates are marked using _samblaster 0.1.20_ which is part of bwa-kit. Reads are indexed using _samtools -- index_
 * Duplicate statistics calculated using _Picard CalculateHsMetrics_. PCT_PF_UQ_READ (number of reads passing filter, not marked as duplicate) extracted and viewed in the executive summary report.
 * Local indel realignment: _GATK suite v2014.4-2 RealignerTargetCreator + IndelRealigner_. Mills & 1000g gold standard indelset is used to reference and mark location of true indel sites.

 * Base quality recalibration: _GATK BaseRecalibrator + PrintReads_. Known variants are used to mask regions of true variation (dbsnp_138.b37.vcf) with recalibration performed across sites which do not exist in dbsnp. Recalibration plots are generated (pdf report) using _GATK analyzeCovariates_ (plots compared samples before and after base recalibration). Reports are provided to curators/medical scientists.

#### BAM QC
 * _samtool mpileup v_ : Coverage calculated across exons of coding RefSeq genes (+-20bp intronic) expected to be captured by the sequencing library.
 * _Picard CalculateHsMetrics version XX_ and _samtools -- mpileup_: sequence and coverage metrics. A per-sample executive summary is provided to the Medical Scientists for review. More-detailed per exon coverage reports are also generated for review if the executive summary highlights gaps in coverage.
 * _Picard CollectInsertSizeMetrics_: insert size metrics as a quality check.

#### Variant Calling
#### SNV & Indels 
 * _GATK suite v2014.4-2 HaplotypeCaller_: Indels & SNP calling (simultaneous) across the exome regions (+-20bp intronic).
 * vCF file (v4.1): with site-level (CHROM, POS, ID, REF, ALT, QUAL, FILTER) and genotype (GT, AD, DP, PL, GQ) annotations are appended to the VCF file. dbSNP.138.b37 ID added to VCF using GATK variant annotator. dbsnp version prior to 1000 genomes database.
 * Joint calling performed for all sample designs. _GATK GenotypGVCFs_ is used to merge the variant calls across samples and output a gvcf file with combined records. A minimum of 30 individuals per batch is required for joint calling. If insufficient patient samples in a batch, reference samples are added to meet the sample requirements.

#### Variant Annotation
 * Annotations are not populated to the vcf as part of the bioinformatic pipeline. Annotations are selected by the medical scientist using VariantStudio. Only relevant annotations are added in accordance with the study and diagnostic requirements.
 * SAPath has custom in-house annotation scripts developed in accordance with the requirements of specialist studies.

 * Annotations (_Variant Grid_ for WES, WGS):

ExAC freq, GERP, phyloP, PhastCons, dbSNP v142, FATHMM, MutationTaster, PolyPhen2, SIFT, NCBI RefSeq, Protein Function and Tissue specificity (UniProt), Ensembl Gene ID, OMIMM, CADD, Segmental duplication (hg19/b37), Pfam, Interpro, Gene Ontology, miRNA_binding_site, TGI TIER.

#### Variant Filtering
#### Pre-annotation filters 
 * Hard filters: _GATK variantfiltration_. The vcf file is split according to the variant type using _GATK selectvariants_ to allow different filters to applied according to mutation type. Hard filters are applied on the following parameters:

 * ''SNP'': QD, qual_by_depth_SNP, FS, fisher_strand_SNP, MQ, RMS_mapping_qality, MQRankSum, mapping_quality_rank_sum, ReadPosRankSum, read_pos_rank_sum_SNP.

 * ''INDEL'': QD, qual_by_depth_INDEL, FS, fisher_strand_INDEL, ReadPosRankSum, read_pos_rank_sum_INDEL.

 * ''Other'': mixed, mnp and symbolic are selected but no filters applied.

 * Since only small numbers of exomes are processed by SAP, hard filters rather than site-specific techniques (e.g. _GATK Variantrecalibrator_) are applied.

#### Post-annotation filters 
 * Post-annotation filters may be applied in _VariantStudio_ but will differ in accordance with experiment/diagnostic requirements.

#### Variant QC
 * Variant quality metrics are calculated in GATK suite v2014.4-2 HaplotypeCaller + BaseRecalibrator.

 * Hard filters are applied on variant quality scores.

Variants are manually reviewed for artefacts in IGV prior to classification.

#### Verification/Validation
An in-house script is used to verify the sex of the sample matches patient metadata by comparing differential mapping to chrX and Y as well as heterozygosity on chrX, using the following functions:

```
def call_vcf_sex(homo, hetero):
    # No X calls
    if homo  hetero  0:
        vcfSex  'Undetermined (no X calls)'
        ratio  'NA'
    # No homozygote calls
    elif homo  0 and hetero > 10:
        vcfSex  'F'
        ratio  'NA'
    # Not enough calls
    elif homo < 10:
        vcfSex  'Undetermined (not enough variants to call)'
        ratio  'NA'
    # Ratio
    else:
        ratio  hetero / float(homo)
        if ratio > 1.2:
            vcfSex  'F'
        elif ratio < 0.8:
            vcfSex  'M'
        else:
            vcfSex  'Undetermined (too close to call)'
    return vcfSex
```
```
    if int(x_reads) > 10000 and read_ratio < 100:
        bamSex  'M'
    elif int(x_reads) > 10000 and read_ratio > 100:
        bamSex  'F'
    elif int(x_reads) < 10000:
        bamSex  'Undetermined (not enough chrX reads)'
    return bamSex, x_reads, y_reads
```
The two options for sex check are available as for some analyses, there are insufficient variants available to reliably call the sex. When called (i.e., enough data), both sex checks must match the patient metadata to pass the verification.

Pathogenic/ Likely pathogenic variants are confirmed by Sanger sequencing prior to reporting.

#### Curation
Variants are reviewed and classified by Medical Scientists using the ACMG classification guidelines.

#### Reporting
The following QC reports are generated to allow quality control:

 1. Per-run sequencing summary report ([[attachment:SAPath_Example_RunSummary.xls|Example Run Summary]])
 1. Per-sample summary report ([[attachment:SAPath_Example_exec_sum.txt|Example Executive Summary]])

Each of these reports is examined prior to reporting. These reports are used to evaluate the quality of sequencing run and would be examined prior to vcf being passed to the medical scientists for annotation.

Each batch is validated by comparing values to 'gold standard' reference values. This range provides a benchmark for quality. Reference values have been derived through repeated testing of a set of high-quality patient samples to arrive at an expected and acceptable range of values for sets of genes/exons.

NB: although the entire medical exome may be analysed, typically, only well-characterised, subsets of diagnostic genes would be extracted from this dataset, with matching reference values available.
||'''Report description''' ||'''Tool generating and metric''' ||
||% of bases with >20x coverage across GOI ||samtools mpileup + script ||
||% of bases with >10x coverage across GOI ||samtools mpileup + script ||
||Mean coverage across GOI ||samtools mpileup + script ||
||Mean coverage across kit || ||
||Uniformity of coverage ||in-house coverage ||
||Read enrichment (%) ||Picard HS_metrics (PCT_SELECTED_BASES) ||
||Duplicated alignable reads ||Picard HS_metrics output (PCT_PF_UQ_READS) ||
||Median insert ||Picard insert_metrics output (MEDIAN INSERT SIZE) ||
||Ts/Tv || ||
||Number SNPs ||in-house scripts ||
||%SNPs in dbSNP ||in-house scripts ||
||Number indels ||in-house scripts ||
||%indels in dbSNP ||in-house scripts ||
||Sex match ||in-house scripts ||
||GOI with less than 100% of bases having at least 20x coverage || ||

#### Packages - summary
||'''Stage''' ||'''Tools & version''' ||'''Data inputs''' ||
||Quality control ||FastQC 0.11.5, Picard CollectInsertSizeMetrics, Picard [[MarkDuplicates|CalculateHsMetrics]], samblaster 0.1.20, samtools mpileup (v1.0) ||human_g1k_v37_decoy.fasta ||
||Mapping ||bwa-kit v0.7.12-r1039 ||human_g1k_v37_decoy.fasta ||
||Local realignment ||GATK suite v2014.4-2 RealignerTargetCreator + IndelRealigner ||human_g1k_v37_decoy.fasta ||
||Base recalibration ||GATK suite v2014.4-2 Base recalibrator + PrintReads + AnalyzeCovariates ||human_g1k_v37_decoy.fasta, dbSNP_138_b37 ||
||Variant calling ||GATK suite v2014.4-2 Haplotype Caller ||human_g1k_v37_decoy.fasta ||
||Variant recalibration ||Not performed || ||
||Variant normalisation ||Not performed || ||
||Variant filtering ||GATK suite v2014.4-2 GenotypeGVCF + SelectVariants + VariantFiltration ||human_g1k_v37_decoy.fasta ||
||Variant annotation ||VariantStudio, gatk VariantAnnotator ||dbSNP_138.hg19.vcf ||
||File manipulation ||samtools v1.0 || ||

Page contributors: M. Gall (AGHA), Maeley Gauthier (SAP), Julien Soubrier (SAP)
