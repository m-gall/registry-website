 Translational genomics group

#### General Pipeline information
 * Group conducts sample collection through to variant reporting
 * Workflow execution on Broad queue workflow engine, with some in-house modifications
 * Tracking database for runs/trend analysis storing sample history. In-house based on postgresSQL with django app
 * Patient metadata de-identified through run
 * Target site defined as capture sites as defined by the library prep
 * Pipeline used for both clinical and research projects, with json parameter file defining parameters
 * json file for clinical pipeline containing set of configurables which rarely change
 * Individuals may be sequenced across several lanes
 * Limited to 3 individuals (6 samples) processed in a batch for consistency and expediency
 * Pipeline runs through to completion, irrespective of run quality


#### Sample QC

 * Paired tumour-normal configuration
 * In-house script provides sample verification based on identity by descent calculations

#### FASTQ QC

 * Demultiplex - _bcl2fastq_ - bcl to fastq conversion.
 * Adaptor removal performed as part of bwa.

#### Alignment/Assembly

 * _bwa-mem version XX_ for assembly with default parameters [XXX]
 * XX used for sorting and file indexing
 * Alignment is performed for each lane separately, after which bam files are merged
 * Duplicates are marked using _Novosort_. Duplicates are marked with statistics also returned to a txt file
 * Indel realignment using _GATK Indelrealigner_. Mills and 1000G indels used as known sites from GATK resource bundle.
 * Base recalibration using _GATK BaseRecalibrator_ with germline control cohort used as a reference dataset. Known sites from GATK resource bundle.

#### BAM QC

 * In-house scripts - generate metrics at the fastq and bam level
 * In-house script for coverage metrics, calculated across:
  * regions of interest - capture, custom regions, genes of interest
  * entirely custom script to generating coverage calculations
 * Uses samtools and R
 * Generates a json file - goes to report
 * Calculations stored in Rdata file - in case data needs to be re-checked

#### Variant Calling

 * vcf version XX
 * _GATK Unified genotyper_ (SNPs), _GATK HaplotypeCaller_ (indels)
 * NB: Unified genotyper does not call SNVs and indels simultaneously
 * calling performed on a batch containing the paired samples and other individuals

#### SNV & Indels 

 * SNPs called with _Unified Genotyper_. Joint-calling implemented. UnifiedGenotyper used for historic reasons and also in-house testing suggests HC misses calls. UnifiedGenotyper does not accept GVCFs.
 * Indels called with GATK HaplotyeCaller with joint-calling implemented. UnifiedGenotyper performs poorly for indels. GATK GVCF used to generate the cohort gvcf for HC.
 * Variants called across target (library capture sites)
 * Padding values set in configuration file rather than an extended bed
 * Restricted calling across target region
 * 6 samples per batch - with addition of ~400 germline cohort control samples (sample sizes never altered)

#### Structural variants & CNV's 

 * _Crest version XX_

#### Variant Annotation

 * in-house annotation tool
 * call VEP _VEP version XX_ (cache version XX) and Annovar
 * vcf is subset by chromosome prior to annotation to improve pipeline performance
 * Annotations are all appended to the vcf
 * Annotation resources built into script with limited flexibility to quickly update
 * Normalisation built into script - split multi-allelic sites, left alignment

#### Variant Filtering

 * Default filters specified by Unified genotyper: AD, DP set with UnifiedGenotyper pipeline - flag - to catch known variants which are known to be poorly covered.
 * Hard filters part of Unified genotyper: --min-qd 2.0000 --min-gqx 30.0000 --min-mq 20.0000
 * Filters are appended to file as flags with information preserved
 * in-house script make decision on somatic call - calculation based mostly on subtraction of germline from normal
 * Filters to flag rather than discard data

#### Annotation filters 

#### Post-annotation filters 

 * Filter based on disease specific gene and variant lists for clinically actionable variants - CivicDB level A and B
  * Population frequency
  * Technical artifact search using control dataset filtering based on frequency
  * Filters based on genome coverage and VAF (reported variants only)
 * All transcripts recorded but transcript of worst impact flagged

#### Variant QC

 * Variant quality score re-calibration - _GATK variantrecalibrator_ and _GATK applyrecalibration_ with GATK resource package
 * Variant statistics calculated by GATK variantEval (standard metrics to fulfil NATA requirements)
 * Transition/transversion calculated over exons using in-house script which calls on snpSift

#### Verification/Validation

 * GeneticQC - in-house script (publication in prep)
 * Verification of sample identity and contamination through identity by state calculations
  * Level of sample relatedness can be used to confirm:
   * Tumour-normal mix-ups
   * Patient mix-ups
  * Contamination of tumour with normal also assessed

 * Scheduled validation testing:
  * _WashU_: in-silico proficiency testing
  * HapMap genomes - serial dilutions
  * Comparison with other NATA accredited lab results

#### Curation

 * Separate pipeline which generates the clinical report
 * Takes output from pipeline including quality metrics and collates into a pdf

#### Reporting

 * Use NPAAC guidelines where applicable
 * Variants reported in HGSV format on Refseq transcripts
 * HGSV nomenclature for reporting

#### Packages - summary

||'''Stage''' ||'''Tools & version''' ||'''Data inputs''' ||
||Quality control || bam quality metrics generated using in-house scripts ||  ||
||Duplicate marking || Novosort ||
||Mapping || bwa-mem || hg19.fasta ||
||Local realignment || GATK Indelrealigner || hg19.fasta, Mills & 1000G gold standard indels ||
||Base recalibration || GATK Base recalibrator || germline control cohort, standard GATK resources ||
||Variant calling || Unified Genotyper (SNPs), HaplotypeCaller (indels) ||hg19.fasta ||
||Genotype refinement || Not applicable ||  ||
||Variant normalisation || Part of in-house annotation script  || hg19.fasta ||
||Variant filtering || GATK VariantRecalibrator ||  ||
||Variant annotation || VEP, VEP cache 88, Annovar ||   ||
||File manipulation || picard MergeSamFiles ||

Page Authors: M. Gall (AGHA), Jonathan Ellis (QUT), Paul Leo (QUT)
