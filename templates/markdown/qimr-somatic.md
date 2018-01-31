 QIMR Berghofer Somatic Whole Genomes

This is the primary next-generation sequencing analytical pipeline for QIMR Berghofer and most other pipelines are based directly upon it or borrow heavily in terms of tools and workflows. For details of other QIMR Berghofer pipelines see the main [[PipelineRegistry/QIMRBerghofer|QIMR Berghofer]] pipeline page.



#### General
 * Workflows written in wdl and executed by Cromwell
 * pipeline metadata stored in an in-house database (grafli)

#### Sample/Library Prep

 * Samples can be processed as either a fastq, bam or vcf format
 * If received in bam format (except TCGA bams), converted back to fastq format for realignment
 * Generally, an entire HiSeq X10 lane would be reserved for the normal sample and 2 lanes for the tumour
 * Generally, an entire HiSeq X10 lane would be reserved for the normal sample and 2 lanes for the tumour
 * If we are sent DNA prior to sequencing then we run an Illumina genotype array (usually 2.5M) and use [[https://sourceforge.net/projects/qpure/|qpure]] to assess tumour content


#### Sample verification 

 * Samples are sequenced using Illumina SNP array (usually omni 2.5M) and use [[https://sourceforge.net/projects/qpure/|qpure]] to assess tumour content.
 * Sequencing is largely outsourced with samples normally received with adaptors removed and demultiplexing performed (responsibility of the sequencer provider).

'''Establish sufficient tumour content'''

 * Illumina SNP array (typically omni 2.5M) is run to establish purity of sample
 * The SNP profile for paired tumour-normal samples are compared using _qpure version 1.1_
 * Generally, 40-50 % tumour content is considered sufficient for high-throughput sequencing
 * Generally, 40-50 % tumour content is considered sufficient for high-throughput sequencing

'''Verify sample identity'''

 * Illumina SNP array is also used to check for sample mix-ups
 * _qsignature version 0.1_ performs pairwise comparisons between a tumour-normal pair to determine level of similarity between the samples based on XX snps.
 * Patient mix-ups will be evident based on similarity scores, patient pairs should have higher similarity to each other than to other patient samples.
 * qprofiler output can also be used to diagnose sample mix-ups - for instance CNV's and large insertions and deletions should be evident in metrics such as RNAME (number of reads at a position along a chromosome). An absence of a mutation signature in a tumour sample (if expected) would indicate a sample mix-up (e.g. tumour-normal mix-up, patient mix-up, barcoding issue).

'''VCF checks'''

 * _qprofiler_ -- vcf-mode (in development) will verify features of the VCF file (e.g. headers, format). The number of snps will be compared to a known reference values/rang e.g. expect ~ 3 million snps in a normal sample, which have been determined empirically from previous verified sequencing runs.
 * Samples must pass qsignature and qpure checks to proceed to the alignment stage.

#### FASTQ QC


 * capacity for in-house library preparation and sequencing but this part of the workflow is Generally outsourced
 * _cutadapt_ - if adaptor removal is required - although normally the responsibility of the sequencing provider
 * fastq quality metrics are generated and visualised using an in-house tool _qprofiler_.
 * quality of the fastq is checked at various stages: prior to bwa, after de-duplication, and on the merged bam file
 * quality is evaluated at the fastq level but almost never used as a cut-off point
 * Normally, the qprofiler output would be examined by a bioinformatician prior to curation.
 * example qprofiler output: [[attachment:qprofiler_results.html]]

Common metrics examined for troubleshooting:
|| '''Field''' || '''Description''' ||
|| '''TAG MED''' || ||
|| '''TLEN'''  || Frequently evaluated and required to detect structural variants. Insert size (gap size plus read length) - this provides an estimate of the expected insert size. Insert size should be relatively similar across read pairs providing an indication of quality of library prep. ||
|| '''RNAME'''  || Useful for evaluating problems sample mixups. Can quickly visualise and verify the presence of mutations such as copy number variations & deletions. ||
|| '''MAPQ'''  || quality value- 60 is maximum. Check for mapping quality ||

 * checks are mostly visual with no 'hard' criteria or quality threshold as a reference

#### Alignment/Assembly

[[PipelineRegistry/QIMRBerghofer/Mapping|Mapping]]

 * Samples must pass qpure and qsignature quality checks (i.e. verify sample mix-identity and sufficient tumour content) to undergo alignment.
 * Paired-end reads are mapped to reference assembly using bwa version XX implementing bwa-mem algorithm, as part of bwa-kit version XX. GrCH37.75 reference genome with no decoy. Each read group (representing a flow-cell lane) is mapped separately to the reference assembly. Historically, the bwa-backtrack algorithm was used but through extensive testing, mem was found to provide better alignment. Novoalign was also considered but only fractionally better at aligning, slower and has very aggressive filtering with many hard clipped reads. Prefer flexibility to apply aggressive filters rather than lose information at the alignment stage.
 * A first round of de-duplication is performed using samblaster version XX (part of bwa-kit) at level of readgroup. This provides information on library complexity at the lane level and helpful for down-stream troubleshooting (although rarely examined). Duplicate metrics are collected at this stage mostly due to its convenience (built into bwa-kit) rather than necessity. Metrics are effectively overridden downstream by Picard markduplicates.

 * Following alignment, the bam files are merged with picard mergeSamFiles version XX. A second duplicate check is performed at the library level using picard markduplicates version XX.
 * Following de-duplication, read-groups are merged using qbammerge version X by sample type (tumour vs normal). File indexing is performed by samtools version xx. File sorting (by genomic coordinates) is performed using samtools sort.
 * continued use of GrCH37.75 assembly to comply with historic datasets
#### BAM QC

 * _qprofiler_ calculates bam file metrics output as an XML file. This is converted into a HTML report via qVisualise. The report provides basic summary statistics for the bam file. qprofiler.xml files are generated at several levels: fastq, read group (merged, deduped bams) and library, and can assist in diagnosing problems.
 * _qsignature_ is run at the level of read group to check for sample and patient mix ups.
 * _qcoverage version 0.1_ calculates metrics on the merged bam file. The default filter calculates coverage for on reads which have had duplicates removed, mapped and primary reads.
 * coverage is calculated across a chromosomes defined by a bed file
 * for whole exome studies, coverage is calculated across reference exons and/or target (library) sites. Values of expected coverage are generated by taking the first 100 exomes sequenced for a platform, and assessing the rate or successful target coverage/capture
 * coverage for each target and the region surrounding is calculated. This enables more precise distinctions between on, off, and 'true off' target coverage, where on  bait sites defined by the library prep, off  shoulder around bait (300 bp either side of target), true-off  sequence not adjacent to a target.

#### Variant Calling

Two variant callers are implemented: qSNP (for SNPs) and GATK HaplotypeCaller (for indels). The decision on whether a call should be classed as 'somatic' is largely based on a heuristic set of rules. For snps, these rules are defined by qsnp, which both has an internal variant caller but also accepts paired vcfs. For indels, calls from HaplotypeCaller are parsed to q3indel for somatic vs germline assignment.

#### SNV 

 * A dual tool strategy to identify high confidence variants. _GATK HaplotypeCaller_ plus _qSNP_.
 * Tumour and normal samples are uploaded as separate BAM files for joint calling in qsnp. A reference set of germline snps can be provided as a vcf to assist in cases where coverage for the normal sample is low.
 * Rules for variant calls are largely based on level of coverage for a variant in the tumour vs normal sample.
 * Post-variant calling, additional filters are applied to reduce false discovery rates. These experimentally-derived and verified filters are based on rules of coverage, strand bias and presence/absence in tumour vs normal sample. As part of this procedure, somatic reads are compared to a germline database to detect cases where a normal sample may have been been under-sequenced. These parameters would not ordinarily be configured from the default.
 * Samples meeting criteria are annotated PASS in xxx vcf field. Variants annotated PASS are considered high confidence somatic calls.
 * qSNP may return to the bam file to apply bam-related filters.
 * Stringent duplicate filtering is also performed as part of qSNP. Considers duplicate calls where the reads mate may have been mapped to homologous positions.

#### indels 
 * _GATK HaplotypeCaller_ is used to call indels on the tumour and normal bams. SNP calls are filtered from the vcf files using GATK selectvariants. Indel calls (vcf) are picked up by _q3 indel_ for a somatic vs germline decision. q3indel may return to the bam file to apply quality filters associated with the bam file only???


#### somatic vs germline assignment

 * snps: a 4 column vcf file produced with calls from qsnp and HaplotypeCaller. qannoate makes the final decision on the status of the variant. Decisions take into consideration: normal qsnp - tumour qsnp - normal gatk - tumour gatk calls. Splits into high confidence vs other calls.

#### Variant Annotation

 * _qannotate_ is used to has multiple functionalities - it provides criteria for assigning somatic vs germline call and also incorporates SNPeff for variant annotation/prediction. Annotations are encoded to the INFO field on a 4 column, single sample vcf. The vcf is converted to a MAF format using snpEff functionalities.

#### Variant Filtering

 * Hard and biological filters are applied in snpEff as part of the qannotate package. Annotation criteria are highly experiment specific.
 * Filters which might be applied in snpEFF include:
 * Variant normalisation procedures are not applied


#### Variant QC
 * Variants are manually inspected in qvisualise (???)
#### Verification/Validation

 * Wet-lab verification/validation is experiment specific and do not do wet-lab verification/validation unless it is specifically funded by the data holder
 * An in-house ''in silico'' verification tool called _qverify_ will provide variant verification based on additional sequencing such as RNA, exomes, panels, whole genome matched metastases, etc.
 * _qsignature_ - in-silico genotyper effectively creating an artificial 'array'. Genotype at omni 1M (1.1 million positions) and dbsnp (inside coding regions) positions is called and snp concordance estimates are called between tumour vs normal samples to verify samples originate from the same patient



#### Reporting

Page edited by: M. Gall (AGHA), John Pearson (QIMR), Katia Nones (QIMR)
