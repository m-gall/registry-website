 Melbourne Bioinformatics Germline Exome Singleton Pipeline

#### General Cpipe information

Supports individual and trio design configurations. Only a subset of the exome is of clinical interest with masking of exome via gene panels/lists. Restriction of gene discovery may be applied during the bioinformatic processing (i.e. before vcf uploaded to LOVD+) or during curation.

Raw sequence data is uploaded to VLSCI servers as fastq files. Patient metadata is stored in Redcap. refSeq genes of clinical interest may be requested to be examined, stored in the patient metadata. Typically an individual would sequenced across several lanes with several individuals multiplexed each lane.

The bioinformatic pipeline begins with a fastq file provided by sequencing provider and ends with upload of annotated table containing a filtered set of variants to LOVD+. LOVD+ does not annotate variants. Guidelines for curation and variant reporting have been developed by VCGS.

#### Target definition
For many of the tools used in Cpipe, analyses are limited to discovery/calculation across exome regions only. Exon definitions downloaded from UCSC (.txt) are converted to a bed file to restrict the region of analyses. The exon definition file defines the start and end of each exon based on UCSC refGENE database. For some analyses, a capture definition file is necessary and restricts computations to regions captured by the sequencing library kit. This is provided as a bed file - with genomic coordinates for these regions defined by the kit manufacturer. The library preparation kit information is stored in the patient metadata.
<<BR>>

#### Sample QC
 * Adaptor removal, demultiplexing and trimming: not part of Cpipe workflow. Performed by the sequencing provider.
 * FastQC to check raw sequencing quality including adaptor contamination.

#### FASTQ QC
 * _FastQC version 0.11.5_: Quality of the raw sequencing data is conducted in using default parameters. FastQC metrics (.txt and .html outputs) and quality flags (PASS, FAIL, WARN see FastQC for definitions) are evaluated by bioinformaticans. Aside from 'Per base sequence content', and 'Per base GC content'  which are known to regularly fail in exome studies, samples which fail a FastQC flag require intervention for further processing in Cpipe. NB: failure of a sample does not it exclude the sample from further analyses.

#### Alignment/Assembly
 * Read mapping: hg19 reference genome using _bwa version 0.7.13_ with bwa-mem algorithm. Separate flow cells (lanes) are mapped to the genome separately.
 * sorting by genomic coordinates and indexing: _samtools version 1.3_
 * Mapped reads (bam) per lane merged using _Picard MergeSamFiles v2.6.0_.
 * Duplicate marking: duplicates removed using _Picard MarkDuplicates version 2.6.0_. Duplicate metrics are included in the stage summary report.
 * Local indel realignment: _GATK RealignerTargetCreator_ & _GATK IndelRealigner_. At sites where an indel was flagged in atleast one read, a likelihood ratio test performed. Known indel sites assist indel discovery (Mills & Gold 1000g gold standard indels).
 *Base quality score recalibration: _GATK BaseRecalibrator_. Known variants provided to exclude regions of true variation (dbsnp_138.hg19.vcf). Recalibration is only performed over sites not in dbsnp.

#### BAM QC
 * Coverage: across select regions using _bedtools_ coverageBed. Coverage is calculated across 1) all exons 2) exons captured by library prep kit. Coverage metrics generated using bedtools and Picard MarkDuplicates form part of the stage summary report.

 * Detailed read coverage metrics are generated using _GATK DepthOfCoverage_ across all exons. Metrics are passed to the curation platform (LOVD+).
 * Insert sizes: _Picard CollectInsertSizeMetrics_. These results are passed without additional processing to _LOVD+_.

#### Variant Calling
#### SNV & Indels 
 * Simultaneous indel & SNP discovery with _GATK HaplotypeCaller version 3.6_
 * VCF file (v4.2): site-level (CHROM, POS, ID, REF, ALT, QUAL, FILTER) and genotype (GT, AD, DP, PL, GQ) annotations are added to the VCF file. dnSNP dataset ID annotated to vcf. A deprecated version of dbsnp used which does not contain 1000 genomes.
 * Sample-by-sample calling is performed for individual samples

 * VCF file format: [[attachment:cpipe.raw.vcf.header.example|raw.variants.vcf]] [[attachment:cpipe.prevep.vcf.header.example|pre-VEP.variants.vcf]] [[attachment:cpipe.post-vep.vcf.header.example|post-VEP.variants.vcf]]

#### Variant Annotation
 * Variant standardisation: _bcftools version 1.3_ prior to annotation. This includes left-alignment of indels, parsing of variants, and decomposition of multi-allelic sites. These standardisations are recommended for VCF files to be parsed in VEP, although by default, VEP features are not left normalised.

 * Variant annotation: _VEP version 85_. The deprecated version of VEP is used which supports hg19. NB: all versions of VEP dating back to version 75 are built on the same database. VEP cache is offline and contains transcript, regulatory and variant annotations.

Additional annotations are appended to the VCF with plug-ins dbSNFP, Condel and Grantham.

#### Variant Filtering
#### Pre-annotation filters 
 * Hard-filters: variants with a Phred score (QUAL) < 5 are discarded using the package _{GATK GenotypeGVCF_.
 * _GATK SelectVariants_: splits variants by type to allow customied interval_padding rules by variant type (SNP, MIXED, MNP, SYMBOLIC, NOVARIATION, INDEL) to be applied.
 * Indels: interval_padding  25
 * SNPs & other: interval_padding  10
 * Variant types merged with _GATK CombineVariants_.

#### Post-annotation filters 
 * VEP script (filter_vep.pl) to discard annotations outside of protein coding regions (BIOTYPE MATCH protein coding) and if ‘consequence type’ is ‘upstream’ or ‘downstream’ (consequence not matches ‘stream’). These selections are a requirement of LOVD. Variants outside these regions not accepted by LOVD+. The following annotated regions are imported into LOVD: 3_prime_UTR_variant, 5_prime_UTR_variant, intron_variant, splice_acceptor_variant, splice_donor_variant, splice_donor_variant&intron_variant, splice_region_variant&3_prime_UTR_variant, splice_region_variant&5_prime_UTR_variant, splice_region_variant&intron_variant.

 * Hard filters are applied with an in-house script (filter_tsv.py). Variants which fail to meet the following quality thresholds are discarded: Allele depth (AD)  2, Allele frequency (AF)  0.15, Depth (DP)  5, and Quality (QUAL)  5. These lenient quality thresholds are intended to remove variants of the very lowest quality.

 * Transcript filtering: in-house script (filter_transcript.py) selects known ('NM') over predicted ('XM') transcripts. All NM transcripts kept and uploaded to the curation platform.

#### Variant QC
 * Variant quality metrics are calculated in GATK HaplotypeCaller + BaseRecalibrator + DepthOfCoverage. Hard filters are applied on: Allele depth (AD), filtered allele depth (DP), allele frequency (AF).

#### Verification/Validation
 * An in-house script is used to verify the sex of the sample matches patient metadata (check_karyotype.py). This verifies by calculating coverage across the chrX, chrY, chr1, chr22. Coverage is mean number of reads overlapping exon library capture sites/ total number of positions.

 * A sample is confirmed female if coverage of chrY < 5 and chrX > 30. Because there is an enrichment bias for some kits for chrY and coverage is unexpectedly high, verification of male is not calculated based on chrY only. A sample is verified as male: Mean coverage across chrX / mean coverage across chr1. If < 0.7, sample is considered male.

 * UNDER DEVELOPMENT. Kinship verification tests are currently under development which will verify relationships between family members in trio studies. This will be based on Peddy.

#### Curation
 * Variants are uploaded to _LOVD+_ as a table (.tsv) with sample metadata uploaded as a separate file. An in-house script is used to convert the VCF file a .tsv file. There are minimum column requirements for LOVD+ for the .tsv file.
 * Prior to upload to LOVD, gene and transcripts are compared against the LOVD+ database to see if already discovered in MGHA instance of LOVD+. Format of new transcripts is verified using [[https://bio.tools/tool/Mutalyzer/version/none|Mutalyzer]] which validates HGNC format before upload to the database.
 * Variants of clinical interest are manually checked by the curators prior to reporting.

#### Reporting
Within Cpipe, several summary reports are generated:

 1. Stage summary report
 1. Batch summary report

Each of these reports is examined prior to variant list being uploaded to LOVD+.


Page contributors: M. Gall (AGHA), Gayle Philip (Melbourne Bioinformatics), Peter Georgeson (Melbourne Bioinformatics)
