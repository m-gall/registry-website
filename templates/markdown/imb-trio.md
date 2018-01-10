 Institute for Molecular Biology - Trio - WGS/WES pipeline

#### General Pipeline information

 * Highly-integrated, python-based workflow manager that handles all inputs/outputs (from raw input to variant output including fastq, pedigree files to reporting). Workflow manager communicates with the HPC.
 * Pipeline bifurcates at the variant calling stage

#### Target definition

 * Library capture sites defined by the library manufacturer. Defined as a bed file.

#### Sample QC

 * Sample mix-ups are checked using qsignature. Sample similarity is evaluated by comparing samples across a reference set of snps using _qsginature_ across XX number of SNPs.
 * Pedigree checks are performed using _peddy_. The pedigree is defined by a ped file.

#### FASTQ QC

 * Samples often received as a bam file - these are converted to fastq files and then re-mapped using PACKAGE.
 * Cutadapt required for exome projects - issues with sequencing into adaptor regions

#### Alignment/Assembly

 * Reads are mapped using _bwa-mem version XX_. mem is used, both for performances/accuracy reasons, but also to facilitate data sharing/comparisons with other groups and resources. Split reads are discarded.
 * Duplicates are marked using _picard MarkDuplicates version_
 * Local realignment is not performed - unnecessary as built into HaplotypeCaller algorithm
 * Base quality score recalibration by read group

#### BAM QC

 * Coverage assessment - _bedtools_ - exon (WES) and genome (WGS) coverage calculated - reported in bedgraph format

#### Variant Calling

 * Two variant callers implemented: _GATK HaplotypeCaller_ and _RTG_
 * A separate mitochondrial pipeline available - picks up the recalibrated bam

#### SNV & Indels 

 * _GATK HaplotypeCaller version xx_ with joint calling within a family only (not across families. A 2nd call across families possibly to be implemented). This is implemented via _GATK genotypeGVCF_
 * GATK genotype refinement is not performed for the following reasons:
  * 1) call quality and depth can affect refinement - limited depth of WGS
  * 2) refinement procedure improves quality of calls returned, however, at a cost of loss of some de novos and mosaic situations in children.
 * A genotype refinement step is performed as part of the _RTG_ pipeline- some risk of loss of de novos
 * For each caller, vcfs are generated and inspected separately

#### Mitochondrial variants 

 * Separate pipeline - takes the recalibrated bam
 * Forces calls of allele depth (every base) along the entire mitochondrial genomes using _bcftools_
 * expect to see change in heteroplasy level increasing from mother to child

#### Variant Annotation
 * _snpEff/snpSift_ with dbsnp. clinvar, snpeff, 1000genomes, dbnsfp annotations

#### Variant Filtering

 * Exons are filtered +- 150 bp
 * Normalisation including multi-allelic site splits
 * Variants sometimes normalised manually during inspection of variants
 * Novel variants are added to an internal database. Variants are also filtered based on frequencies against the internal variant database
 * Family-based models applied - based on various Mendelian inheritance rules

#### Pre-annotation filters 

#### Post-annotation filters 
 * Cross-comparison and check between variants using _RTG_ and _HaplotypeCaller_ -  manual inspection - normally only disagreement for complex cases

#### Variant QC

 * Variant recalibration performed as part of RTG branch

#### Verification/Validation

 * _peddy_ - for kinship test
 * _qsignature_ to check for sample mix-ups

#### Curation

 * Variants manually reviewed in IGV.
#### Reporting

#### Packages - summary


Page contributors: M. Gall (AGHA), Cas Simons (UQ)
