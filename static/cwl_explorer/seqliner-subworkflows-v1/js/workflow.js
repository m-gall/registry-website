"use strict";
 const input_workflow =
{
    "$graph": [
        {
            "class": "CommandLineTool",
            "id": "#addbamstats.cwl",
            "baseCommand": [
                "addbamstats.pl"
            ],
            "inputs": [
                {
                    "id": "#addbamstats.cwl/reference_assembly",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#addbamstats.cwl/bam1",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#addbamstats.cwl/bamstats.vcf",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "addbamstats"
        },
        {
            "class": "CommandLineTool",
            "id": "#bedtools-intersect.cwl",
            "baseCommand": [
                "bedtools",
                "intersect"
            ],
            "inputs": [
                {
                    "id": "#bedtools-intersect.cwl/vcf_a",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#bedtools-intersect.cwl/bed_b",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#bedtools-intersect.cwl/tumour--normal_combined.bedFiltered.vcf",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "bedtools-intersect",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "-header"
                },
                {
                    "position": 0,
                    "prefix": "-wa"
                }
            ]
        },
        {
            "class": "CommandLineTool",
            "baseCommand": [
                "bwa",
                "mem"
            ],
            "inputs": [
                {
                    "format": "http://edamontology.org/format_1930",
                    "id": "#bwa-mem.cwl/forward_reads.gz",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    },
                    "doc": "Forward reads produced as a part of a paired-end sequencing experiment. Multiple file inputs when libraries are pooled across >1 lanes"
                },
                {
                    "format": "http://edamontology.org/data_2340",
                    "id": "#bwa-mem.cwl/reference_assembly",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    },
                    "doc": "hg19 human reference genome",
                    "secondaryFiles": [
                        ".fai",
                        ".bwt",
                        ".sa",
                        ".ann",
                        ".amb",
                        ".pac",
                        ".alt"
                    ]
                },
                {
                    "format": "http://edamontology.org/format_1930",
                    "id": "#bwa-mem.cwl/reverse_reads.gz",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    },
                    "doc": "Reverse reads produced as a part of a paired-end sequencing experiment. Multiple file inputs when libraries are pooled across >1 lanes"
                }
            ],
            "outputs": [
                {
                    "id": "#bwa-mem.cwl/ref_aligned_bam",
                    "doc": "bam file containing aligned sequences.",
                    "type": "File",
                    "outputBinding": {},
                    "format": "http://edamontology.org/format_2572"
                }
            ],
            "doc": "http://bio-bwa.sourceforge.net/bwa.shtml",
            "label": "mapping of forward and reverse reads to the reference assembly",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "-k",
                    "valueFrom": "19"
                },
                {
                    "position": 0,
                    "prefix": "-a"
                },
                {
                    "position": 0,
                    "prefix": "-t",
                    "valueFrom": "8"
                }
            ],
            "hints": [
                {
                    "class": "SoftwareRequirement",
                    "packages": [
                        {
                            "specs": [
                                "https://identifiers.org/rrid/RRID:SCR_010910"
                            ],
                            "version": [
                                "0.7.13"
                            ],
                            "package": "bwa-mem"
                        }
                    ]
                }
            ],
            "id": "#bwa-mem.cwl"
        },
        {
            "class": "CommandLineTool",
            "id": "#combinevariants.cwl",
            "baseCommand": [
                "java",
                "GenomeAnalysisTK.jar",
                "-T",
                "CombineVariants"
            ],
            "inputs": [
                {
                    "id": "#combinevariants.cwl/reference_assembly",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#combinevariants.cwl/tumour--normal_eda_vardict_somatic.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#combinevariants.cwl/tumour--normal_varscan_somatic.recode.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#combinevariants.cwl/tumour--normal_mutect2.vcf.org.recode.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#combinevariants.cwl/output",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "combineVariants",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "--downsampling_type",
                    "valueFrom": "NONE"
                },
                {
                    "position": 0,
                    "prefix": "--genotypemergeoption",
                    "valueFrom": "PRIORITIZE"
                },
                {
                    "position": 0,
                    "prefix": "--setKey"
                }
            ]
        },
        {
            "class": "CommandLineTool",
            "id": "#cutadapt.cwl",
            "baseCommand": [
                "cutadapt"
            ],
            "inputs": [
                {
                    "id": "#cutadapt.cwl/read1.fastq.gz",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#cutadapt.cwl/read2.fastq.gz",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#cutadapt.cwl/read1.clean.fastq.gz",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#cutadapt.cwl/read2.clean.fastq.gz",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "cutadapt",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "-q",
                    "valueFrom": "15"
                },
                {
                    "position": 0,
                    "prefix": "-m",
                    "valueFrom": "50"
                }
            ]
        },
        {
            "class": "CommandLineTool",
            "id": "#fastq-qc.cwl",
            "baseCommand": [
                "fastqqc"
            ],
            "inputs": [
                {
                    "id": "#fastq-qc.cwl/forward_reads",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#fastq-qc.cwl/reverse_reads",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#fastq-qc.cwl/fastqc_report_forward",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#fastq-qc.cwl/fastqc_report_reverse",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#fastq-qc.cwl/read1.fastqc.gz",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#fastq-qc.cwl/read2.fastqc.gz",
                    "type": "File",
                    "outputBinding": {}
                }
            ]
        },
        {
            "class": "CommandLineTool",
            "id": "#filtersomatic.cwl",
            "baseCommand": [
                "vcftools"
            ],
            "inputs": [
                {
                    "id": "#filtersomatic.cwl/tumour--normal_varscan.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#filtersomatic.cwl/tumour--normal_varscan_somatic",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "filterSomatic",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "--recode"
                },
                {
                    "position": 0,
                    "prefix": "--recode-INFO-all"
                },
                {
                    "position": 0,
                    "prefix": "--keep-INFO",
                    "valueFrom": "SOMATIC"
                }
            ]
        },
        {
            "class": "CommandLineTool",
            "baseCommand": [
                "java",
                "GenomeAnalysisTK.jar",
                "-T",
                "BaseRecalibrator"
            ],
            "inputs": [
                {
                    "format": "http://edamontology.org/format_2572",
                    "id": "#gatk_baseRecalibrator.cwl/deduped_realigned_bam",
                    "type": "File"
                },
                {
                    "format": "http://edamontology.org/format_XXXX",
                    "id": "#gatk_baseRecalibrator.cwl/reference_assembly",
                    "type": "File",
                    "inputBinding": {
                        "position": 0,
                        "valueFrom": "/ref/reference_assembly"
                    },
                    "secondaryFiles": [
                        ".fai",
                        ".bwt",
                        ".sa",
                        ".ann",
                        ".amb",
                        ".pac",
                        ".alt"
                    ]
                },
                {
                    "format": "http://edamontology.org/format_3003",
                    "id": "#gatk_baseRecalibrator.cwl/target_sites.bed",
                    "type": "File",
                    "inputBinding": {
                        "position": 0,
                        "valueFrom": "/ref/target_sites"
                    },
                    "doc": "bed file containing the coordinates for genes/regions to be targeted."
                },
                {
                    "id": "#gatk_baseRecalibrator.cwl/dbsnp_138",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#gatk_baseRecalibrator.cwl/recalibrated_table",
                    "type": "File",
                    "outputBinding": {},
                    "format": null
                }
            ],
            "doc": "https://bio.tools/tool/gatk2_base_recalibrator-/version/none\n",
            "label": "Calculate recalibration values for base recalibration.",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "known_sites",
                    "separate": false,
                    "valueFrom": "=dbsnp_138"
                }
            ],
            "hints": [
                {
                    "class": "SoftwareRequirement",
                    "packages": [
                        {
                            "specs": [
                                "https://identifiers.org/rrid/RRID:SCR_001876"
                            ],
                            "version": [
                                "3.6"
                            ],
                            "package": "gatk-toolkit"
                        }
                    ]
                }
            ],
            "id": "#gatk_baseRecalibrator.cwl"
        },
        {
            "class": "CommandLineTool",
            "id": "#gatk_catvariants.cwl",
            "baseCommand": [
                "java",
                "GenomeAnalysisTK.jar",
                "org.broadinstitute.gatk.tools.CatVariants"
            ],
            "inputs": [
                {
                    "id": "#gatk_catvariants.cwl/reference_assembly",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_catvariants.cwl/chr.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#gatk_catvariants.cwl/chr-combined.vcf",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "gatk_catvariants",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "-assumeSorted"
                }
            ]
        },
        {
            "class": "CommandLineTool",
            "id": "#gatk_haplotypecaller.cwl",
            "baseCommand": [
                "java",
                "GenomeAnalysisTK.jar",
                "-T",
                "HaplotypeCaller"
            ],
            "inputs": [
                {
                    "id": "#gatk_haplotypecaller.cwl/bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_haplotypecaller.cwl/target_sites.bed",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_haplotypecaller.cwl/reference_assembly",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_haplotypecaller.cwl/dbsnp_138",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#gatk_haplotypecaller.cwl/hap.vcf",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "gatk_haplotypecaller",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "-nct",
                    "valueFrom": "8"
                },
                {
                    "position": 0,
                    "prefix": "--emitRefConfidence",
                    "valueFrom": "NONE"
                }
            ]
        },
        {
            "class": "CommandLineTool",
            "baseCommand": [
                "GenomeAnalysisTK.jar",
                "IndelRealigner"
            ],
            "inputs": [
                {
                    "format": "http://edamontology.org/format_2572",
                    "id": "#gatk_indelRealigner.cwl/bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0,
                        "valueFrom": "/align/deduped.bam"
                    }
                },
                {
                    "format": "http://edamontology.org/format_3475",
                    "id": "#gatk_indelRealigner.cwl/interval_list",
                    "type": "File",
                    "inputBinding": {
                        "position": 0,
                        "valueFrom": "/align/interval_list"
                    },
                    "doc": "Coordinates for regions discovered requiring realignment."
                },
                {
                    "format": "http://edamontology.org/data_2340",
                    "id": "#gatk_indelRealigner.cwl/reference_assembly",
                    "type": "File",
                    "inputBinding": {
                        "position": 0,
                        "valueFrom": "/ref/reference_assembly"
                    },
                    "doc": "hg19 human reference genome",
                    "secondaryFiles": [
                        ".fai",
                        ".bwt",
                        ".sa",
                        ".ann",
                        ".amb",
                        ".pac",
                        ".alt"
                    ]
                },
                {
                    "id": "#gatk_indelRealigner.cwl/target_sites.bed",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#gatk_indelRealigner.cwl/deduped_realigned_bam",
                    "type": "File",
                    "outputBinding": {},
                    "secondaryFiles": [
                        "bam.index"
                    ],
                    "format": "http://edamontology.org/format_2572"
                }
            ],
            "doc": "https://bio.tools/tool/gatk2_indel_realigner-IP/version/none\n",
            "label": "perform local realignment of indel sites.",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "--targetIntervals",
                    "valueFrom": "=intervals"
                },
                {
                    "position": 0,
                    "prefix": "--downsampling_type",
                    "valueFrom": "=none"
                },
                {
                    "position": 0,
                    "prefix": "--filter_bases_not_stored"
                }
            ],
            "hints": [
                {
                    "class": "SoftwareRequirement",
                    "packages": [
                        {
                            "specs": [
                                "https://identifiers.org/rrid/RRID:SCR_001876"
                            ],
                            "version": [
                                "3.6"
                            ],
                            "package": "gatk-toolkit"
                        }
                    ]
                }
            ],
            "id": "#gatk_indelRealigner.cwl"
        },
        {
            "class": "CommandLineTool",
            "baseCommand": [
                "GenomeAnalysisTK.jar",
                "-",
                "T",
                "PrintReads"
            ],
            "inputs": [
                {
                    "format": "http://edamontology.org/format_2572",
                    "id": "#gatk_printReads.cwl/merged_bam",
                    "type": "File"
                }
            ],
            "outputs": [
                {
                    "id": "#gatk_printReads.cwl/recalibrated_bam",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "id": "#gatk_printReads.cwl"
        },
        {
            "class": "CommandLineTool",
            "baseCommand": [
                "GenomeAnalysisTK.jar",
                "-T",
                "RealignerTargetCreator"
            ],
            "inputs": [
                {
                    "format": "http://edamontology.org/format_2572",
                    "id": "#gatk_realignerTargetCreator.cwl/bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0,
                        "valueFrom": "/align/deduped_bam"
                    },
                    "secondaryFiles": [
                        "bam.ai"
                    ]
                },
                {
                    "format": null,
                    "id": "#gatk_realignerTargetCreator.cwl/Mills_and_1000G_gold",
                    "type": "File",
                    "inputBinding": {
                        "position": 0,
                        "valueFrom": "/ref/known_indel_sites"
                    },
                    "doc": "Mills & 1000G reference indels"
                },
                {
                    "format": "http://edamontology.org/data_2340",
                    "id": "#gatk_realignerTargetCreator.cwl/reference_assembly",
                    "type": "File",
                    "inputBinding": {
                        "position": 0,
                        "valueFrom": "/ref/reference_assembly"
                    },
                    "doc": "hg19 human reference genome",
                    "secondaryFiles": [
                        ".fai",
                        ".bwt",
                        ".sa",
                        ".ann",
                        ".amb",
                        ".pac",
                        ".alt"
                    ]
                },
                {
                    "format": "http://edamontology.org/format_3003",
                    "id": "#gatk_realignerTargetCreator.cwl/target_sites.bed",
                    "type": "File",
                    "inputBinding": {
                        "position": 0,
                        "valueFrom": "/ref/target_sites"
                    },
                    "doc": "bed file containing the coordinates for genes/regions to be targeted."
                },
                {
                    "id": "#gatk_realignerTargetCreator.cwl/1000G_phase1.indels",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#gatk_realignerTargetCreator.cwl/realigned_intervals",
                    "doc": "Coordinates for regions discovered requiring realignment.",
                    "type": "File",
                    "outputBinding": {},
                    "format": "http://edamontology.org/format_3475"
                }
            ],
            "doc": "https://bio.tools/tool/gatk2_realigner_target_c/version/none\n",
            "label": "discover indel sites in need of realignment.",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "interval_padding",
                    "separate": false,
                    "valueFrom": "=25"
                },
                {
                    "position": 0,
                    "prefix": "known",
                    "separate": false,
                    "valueFrom": "=Mills_and_1000G_gold_standard.indels"
                }
            ],
            "hints": [
                {
                    "class": "SoftwareRequirement",
                    "packages": [
                        {
                            "specs": [
                                "https://identifiers.org/rrid/RRID:SCR_001876"
                            ],
                            "version": [
                                "3.6"
                            ],
                            "package": "gatk-toolkit"
                        }
                    ]
                }
            ],
            "id": "#gatk_realignerTargetCreator.cwl"
        },
        {
            "class": "CommandLineTool",
            "id": "#grep_bash.cwl",
            "baseCommand": [
                "grep"
            ],
            "inputs": [
                {
                    "id": "#grep_bash.cwl/regions.bed",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#grep_bash.cwl/chr.bed",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "grep_bash",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "-v GL"
                }
            ]
        },
        {
            "class": "CommandLineTool",
            "id": "#index_vcf_by_tabix.cwl",
            "baseCommand": [
                "bgzip"
            ],
            "inputs": [
                {
                    "id": "#index_vcf_by_tabix.cwl/tumour--normal_eda_vardict.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#index_vcf_by_tabix.cwl/tumour--normal_eda_vardict.vcf.gz",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "index_vcf_by_Tabix"
        },
        {
            "class": "CommandLineTool",
            "baseCommand": [
                "java",
                "MergeSamFiles.jar"
            ],
            "inputs": [
                {
                    "format": null,
                    "id": "#merge_bams.cwl/merged.sorted.bam.1",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    },
                    "doc": "Merge of bam files if multiple bams due to an individual being sequenced over several lanes."
                },
                {
                    "id": "#merge_bams.cwl/merged.sorted.bam.2",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#merge_bams.cwl/aligned_merged_bam",
                    "doc": "Merged and sorted bam file.",
                    "type": "File",
                    "outputBinding": {},
                    "format": "http://edamontology.org/format_2572"
                }
            ],
            "label": "merge bam files",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "CREATE_INDEX",
                    "separate": false,
                    "valueFrom": "=true"
                },
                {
                    "position": 0,
                    "prefix": "USE_THREADING",
                    "separate": false,
                    "valueFrom": "=true"
                },
                {
                    "position": 0,
                    "prefix": "VALIDATION_STRINGENCY",
                    "valueFrom": "=SILENT"
                }
            ],
            "hints": [
                {
                    "class": "SoftwareRequirement",
                    "packages": [
                        {
                            "specs": [
                                "https://identifiers.org/rrid/RRID:SCR_006525"
                            ],
                            "version": [
                                "2.6.0"
                            ],
                            "package": "picard--mergeSamFiles"
                        }
                    ]
                }
            ],
            "id": "#merge_bams.cwl"
        },
        {
            "class": "CommandLineTool",
            "id": "#merge_vcf_vep.cwl",
            "baseCommand": [
                "export",
                "merge_vcf_vep.pl"
            ],
            "inputs": [
                {
                    "id": "#merge_vcf_vep.cwl/bamstats.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#merge_vcf_vep.cwl/bamstats.vep",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#merge_vcf_vep.cwl/bamstats.tsv",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "merge_vcf_vep"
        },
        {
            "class": "CommandLineTool",
            "id": "#mutect2.cwl",
            "baseCommand": [
                "java",
                "GenomeAnalysisTK.jar",
                "-T",
                "MuTect2"
            ],
            "inputs": [
                {
                    "id": "#mutect2.cwl/chr.bed",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#mutect2.cwl/tumour.bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#mutect2.cwl/normal.bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#mutect2.cwl/dbsnp_138.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#mutect2.cwl/cosmic.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#mutect2.cwl/chr.vcf",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "mutect2",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "| grep -v GL"
                }
            ]
        },
        {
            "class": "CommandLineTool",
            "baseCommand": [
                "java",
                "MarkDuplicates.jar"
            ],
            "inputs": [
                {
                    "format": null,
                    "id": "#picard_mark_duplicates.cwl/sorted_aligned_bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0,
                        "valueFrom": "/align/sorted.aligned.bam"
                    },
                    "doc": "Check secondary file requirement.",
                    "secondaryFiles": [
                        "index.ai"
                    ]
                }
            ],
            "outputs": [
                {
                    "id": "#picard_mark_duplicates.cwl/dedup_metrics",
                    "doc": "Text file containing summaries of duplicate metrics.",
                    "type": "File",
                    "outputBinding": {},
                    "format": "http://edamontology.org/format_3475"
                },
                {
                    "id": "#picard_mark_duplicates.cwl/deduped_bam",
                    "doc": "Deduped, merged and sorted bam file.",
                    "type": "File",
                    "outputBinding": {},
                    "format": "http://edamontology.org/format_2572"
                }
            ],
            "doc": "http://picard.sourceforge.net\n",
            "label": "identify and mark pcr duplicates.",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "CREATE_INDEX",
                    "separate": false,
                    "valueFrom": "=true"
                },
                {
                    "position": 0,
                    "prefix": "VALIDATION_STRINGENCY",
                    "separate": false,
                    "valueFrom": "=SILENT"
                }
            ],
            "hints": [
                {
                    "class": "SoftwareRequirement",
                    "packages": [
                        {
                            "specs": [
                                "https://identifiers.org/rrid/RRID:SCR_006525"
                            ],
                            "version": [
                                "2.6.0"
                            ],
                            "package": "picard--markduplicates"
                        }
                    ]
                }
            ],
            "id": "#picard_mark_duplicates.cwl"
        },
        {
            "class": "CommandLineTool",
            "id": "#picard_sortsam.cwl",
            "baseCommand": [
                "java",
                "SortSam.jar"
            ],
            "inputs": [
                {
                    "id": "#picard_sortsam.cwl/bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#picard_sortsam.cwl/sorted.bam",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "picard_sortsam",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "SORT_ORDER=",
                    "valueFrom": "coordinate"
                },
                {
                    "position": 0,
                    "prefix": "VALIDATION_STRINGENCY=",
                    "valueFrom": "SILENT"
                },
                {
                    "position": 0,
                    "prefix": "CREATE_INDEX=",
                    "valueFrom": "true"
                }
            ]
        },
        {
            "class": "CommandLineTool",
            "id": "#samtools-mpileup.cwl",
            "baseCommand": [
                "samtools",
                "mpileup"
            ],
            "inputs": [
                {
                    "id": "#samtools-mpileup.cwl/bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#samtools-mpileup.cwl/reference_assembly",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#samtools-mpileup.cwl/pileup",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "samtools-mpileup"
        },
        {
            "class": "CommandLineTool",
            "id": "#somaticvcfaveragedpad.cwl",
            "baseCommand": [
                "vcfGetAverageDP_AD.py"
            ],
            "inputs": [
                {
                    "id": "#somaticvcfaveragedpad.cwl/tumour--normal_combined.bedFiltered.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#somaticvcfaveragedpad.cwl/tumour--normal_combined.bedFiltered.avgDpAd.vcf",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "somaticVcfAverageDpAd"
        },
        {
            "class": "CommandLineTool",
            "id": "#trimiupac_vcf.cwl",
            "baseCommand": [
                "vcf-trimIUPAC.py"
            ],
            "inputs": [
                {
                    "id": "#trimiupac_vcf.cwl/tumour--normal_chr_vardict",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#trimiupac_vcf.cwl/output",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "trimIUPAC_vcf"
        },
        {
            "class": "CommandLineTool",
            "id": "#vardict.cwl",
            "baseCommand": [
                "VarDict",
                "testsomatic.R",
                "var2vcf_somatic.pl"
            ],
            "inputs": [
                {
                    "id": "#vardict.cwl/chr.bed",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#vardict.cwl/reference_assembly",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#vardict.cwl/tumour.bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#vardict.cwl/normal.bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#vardict.cwl/tumour--normal_vardict.vcf",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "vardict",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "-f",
                    "valueFrom": "0.05"
                },
                {
                    "position": 0,
                    "prefix": "-c",
                    "valueFrom": "1"
                },
                {
                    "position": 0,
                    "prefix": "-S",
                    "valueFrom": "2"
                },
                {
                    "position": 0,
                    "prefix": "-E",
                    "valueFrom": "3"
                },
                {
                    "position": 0,
                    "prefix": "| grep -v GL"
                }
            ]
        },
        {
            "class": "CommandLineTool",
            "id": "#varscan.cwl",
            "baseCommand": [
                "java",
                "-jar",
                "VarScan.v2.3.7.jar"
            ],
            "inputs": [
                {
                    "id": "#varscan.cwl/tumour.pileup",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#varscan.cwl/normal.pileup",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#varscan.cwl/tumour--normal_varscan_snv.vcf",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#varscan.cwl/tumour--normal_varscan_indel.vcf",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "varscan"
        },
        {
            "class": "CommandLineTool",
            "id": "#varscan_somatic_concatvcf.cwl",
            "baseCommand": [],
            "inputs": [
                {
                    "id": "#varscan_somatic_concatvcf.cwl/tumour--normal_varscan_indel.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#varscan_somatic_concatvcf.cwl/tumour--normal_varscan_snv.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#varscan_somatic_concatvcf.cwl/tumour--normal_varscan.vcf",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "_varscan_somatic_concatVcf"
        },
        {
            "class": "CommandLineTool",
            "id": "#vcfextractdp_ad-py.cwl",
            "baseCommand": [
                "vcfExtractDP_AD.py"
            ],
            "inputs": [
                {
                    "id": "#vcfextractdp_ad-py.cwl/combined.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#vcfextractdp_ad-py.cwl/vcf",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "vcfExtractDP_AD"
        },
        {
            "class": "CommandLineTool",
            "id": "#vcftools-filter.cwl",
            "baseCommand": [
                "vcftools"
            ],
            "inputs": [
                {
                    "id": "#vcftools-filter.cwl/vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#vcftools-filter.cwl/output",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "filterPASS",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "--remove-filtered-all"
                },
                {
                    "position": 0,
                    "prefix": "--recode"
                },
                {
                    "position": 0,
                    "prefix": "--recode-INFO-all"
                }
            ]
        },
        {
            "class": "CommandLineTool",
            "id": "#vep_annotation.cwl",
            "baseCommand": [
                "mp-vep-0.3.9.sh"
            ],
            "inputs": [
                {
                    "id": "#vep_annotation.cwl/bamstats.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#vep_annotation.cwl/output",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "vep_annotation"
        },
        {
            "class": "Workflow",
            "id": "#post-alignment-processing.cwl",
            "label": "post-alignment-processing",
            "inputs": [
                {
                    "id": "#post-alignment-processing.cwl/target_sites.bed",
                    "type": "File"
                },
                {
                    "id": "#post-alignment-processing.cwl/reference_assembly",
                    "type": "File"
                },
                {
                    "id": "#post-alignment-processing.cwl/Mills_and_1000G_gold",
                    "type": "File"
                },
                {
                    "id": "#post-alignment-processing.cwl/1000G_phase1.indels",
                    "type": "File"
                },
                {
                    "id": "#post-alignment-processing.cwl/dbsnp_138",
                    "type": "File"
                },
                {
                    "id": "#post-alignment-processing.cwl/sorted_aligned_bam",
                    "type": "File"
                }
            ],
            "outputs": [
                {
                    "id": "#post-alignment-processing.cwl/recalibrated_bam",
                    "outputSource": [
                        "#post-alignment-processing.cwl/gatk_print_reads/recalibrated_bam"
                    ],
                    "type": "File"
                },
                {
                    "id": "#post-alignment-processing.cwl/dedup_metrics",
                    "outputSource": [
                        "#post-alignment-processing.cwl/picard_mark_duplicates/dedup_metrics"
                    ],
                    "type": "File"
                }
            ],
            "steps": [
                {
                    "id": "#post-alignment-processing.cwl/picard_mark_duplicates",
                    "in": [
                        {
                            "id": "#post-alignment-processing.cwl/picard_mark_duplicates/sorted_aligned_bam",
                            "source": [
                                "#post-alignment-processing.cwl/sorted_aligned_bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post-alignment-processing.cwl/picard_mark_duplicates/dedup_metrics"
                        },
                        {
                            "id": "#post-alignment-processing.cwl/picard_mark_duplicates/deduped_bam"
                        }
                    ],
                    "run": "#picard_mark_duplicates.cwl",
                    "label": "identify and mark pcr duplicates."
                },
                {
                    "id": "#post-alignment-processing.cwl/gatk_base_recalibrator",
                    "in": [
                        {
                            "id": "#post-alignment-processing.cwl/gatk_base_recalibrator/deduped_realigned_bam",
                            "source": [
                                "#post-alignment-processing.cwl/gatk_indel_realigner/deduped_realigned_bam"
                            ]
                        },
                        {
                            "id": "#post-alignment-processing.cwl/gatk_base_recalibrator/reference_assembly",
                            "source": [
                                "#post-alignment-processing.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#post-alignment-processing.cwl/gatk_base_recalibrator/target_sites.bed",
                            "source": [
                                "#post-alignment-processing.cwl/target_sites.bed"
                            ]
                        },
                        {
                            "id": "#post-alignment-processing.cwl/gatk_base_recalibrator/dbsnp_138",
                            "source": [
                                "#post-alignment-processing.cwl/dbsnp_138"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post-alignment-processing.cwl/gatk_base_recalibrator/recalibrated_table"
                        }
                    ],
                    "run": "#gatk_baseRecalibrator.cwl",
                    "label": "Calculate recalibration values for base recalibration."
                },
                {
                    "id": "#post-alignment-processing.cwl/gatk_indel_realigner",
                    "in": [
                        {
                            "id": "#post-alignment-processing.cwl/gatk_indel_realigner/bam",
                            "source": [
                                "#post-alignment-processing.cwl/picard_mark_duplicates/deduped_bam"
                            ]
                        },
                        {
                            "id": "#post-alignment-processing.cwl/gatk_indel_realigner/interval_list",
                            "source": [
                                "#post-alignment-processing.cwl/gatk_realigner_target_creator/realigned_intervals"
                            ]
                        },
                        {
                            "id": "#post-alignment-processing.cwl/gatk_indel_realigner/reference_assembly",
                            "source": [
                                "#post-alignment-processing.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#post-alignment-processing.cwl/gatk_indel_realigner/target_sites.bed",
                            "source": [
                                "#post-alignment-processing.cwl/target_sites.bed"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post-alignment-processing.cwl/gatk_indel_realigner/deduped_realigned_bam"
                        }
                    ],
                    "run": "#gatk_indelRealigner.cwl",
                    "label": "perform local realignment of indel sites."
                },
                {
                    "id": "#post-alignment-processing.cwl/gatk_print_reads",
                    "in": [
                        {
                            "id": "#post-alignment-processing.cwl/gatk_print_reads/merged_bam",
                            "source": [
                                "#post-alignment-processing.cwl/gatk_indel_realigner/deduped_realigned_bam"
                            ]
                        },
                        {
                            "id": "#post-alignment-processing.cwl/gatk_print_reads/recalibrated_table",
                            "source": [
                                "#post-alignment-processing.cwl/gatk_base_recalibrator/recalibrated_table"
                            ]
                        },
                        {
                            "id": "#post-alignment-processing.cwl/gatk_print_reads/reference_assembly",
                            "source": [
                                "#post-alignment-processing.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#post-alignment-processing.cwl/gatk_print_reads/target_sites.bed",
                            "source": [
                                "#post-alignment-processing.cwl/target_sites.bed"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post-alignment-processing.cwl/gatk_print_reads/recalibrated_bam"
                        }
                    ],
                    "run": "#gatk_printReads.cwl",
                    "label": "Apply recalibration to bam file. Overwrites values"
                },
                {
                    "id": "#post-alignment-processing.cwl/gatk_realigner_target_creator",
                    "in": [
                        {
                            "id": "#post-alignment-processing.cwl/gatk_realigner_target_creator/bam",
                            "source": [
                                "#post-alignment-processing.cwl/picard_mark_duplicates/deduped_bam"
                            ]
                        },
                        {
                            "id": "#post-alignment-processing.cwl/gatk_realigner_target_creator/Mills_and_1000G_gold",
                            "source": [
                                "#post-alignment-processing.cwl/Mills_and_1000G_gold"
                            ]
                        },
                        {
                            "id": "#post-alignment-processing.cwl/gatk_realigner_target_creator/reference_assembly",
                            "source": [
                                "#post-alignment-processing.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#post-alignment-processing.cwl/gatk_realigner_target_creator/target_sites.bed",
                            "source": [
                                "#post-alignment-processing.cwl/target_sites.bed"
                            ]
                        },
                        {
                            "id": "#post-alignment-processing.cwl/gatk_realigner_target_creator/1000G_phase1.indels",
                            "source": [
                                "#post-alignment-processing.cwl/1000G_phase1.indels"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post-alignment-processing.cwl/gatk_realigner_target_creator/realigned_intervals"
                        }
                    ],
                    "run": "#gatk_realignerTargetCreator.cwl",
                    "label": "discover indel sites in need of realignment."
                }
            ]
        },
        {
            "class": "Workflow",
            "id": "#read-quality-alignment.cwl",
            "label": "tumour-fastq_cwl",
            "inputs": [
                {
                    "id": "#read-quality-alignment.cwl/reverse_reads",
                    "type": "File"
                },
                {
                    "id": "#read-quality-alignment.cwl/forward_reads",
                    "type": "File"
                },
                {
                    "id": "#read-quality-alignment.cwl/reference_assembly",
                    "type": "File"
                }
            ],
            "outputs": [
                {
                    "id": "#read-quality-alignment.cwl/fastqc_report_reverse",
                    "outputSource": [
                        "#read-quality-alignment.cwl/fastq_qc_cwl/fastqc_report_reverse"
                    ],
                    "type": "File"
                },
                {
                    "id": "#read-quality-alignment.cwl/fastqc_report_forward",
                    "outputSource": [
                        "#read-quality-alignment.cwl/fastq_qc_cwl/fastqc_report_forward"
                    ],
                    "type": "File"
                },
                {
                    "id": "#read-quality-alignment.cwl/sorted.bam",
                    "outputSource": [
                        "#read-quality-alignment.cwl/picard_sortsam_cwl/sorted.bam"
                    ],
                    "type": "File"
                }
            ],
            "steps": [
                {
                    "id": "#read-quality-alignment.cwl/fastq_qc_cwl",
                    "in": [
                        {
                            "id": "#read-quality-alignment.cwl/fastq_qc_cwl/forward_reads",
                            "source": [
                                "#read-quality-alignment.cwl/forward_reads"
                            ]
                        },
                        {
                            "id": "#read-quality-alignment.cwl/fastq_qc_cwl/reverse_reads",
                            "source": [
                                "#read-quality-alignment.cwl/reverse_reads"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#read-quality-alignment.cwl/fastq_qc_cwl/fastqc_report_forward"
                        },
                        {
                            "id": "#read-quality-alignment.cwl/fastq_qc_cwl/fastqc_report_reverse"
                        },
                        {
                            "id": "#read-quality-alignment.cwl/fastq_qc_cwl/read1.fastqc.gz"
                        },
                        {
                            "id": "#read-quality-alignment.cwl/fastq_qc_cwl/read2.fastqc.gz"
                        }
                    ],
                    "run": "#fastq-qc.cwl"
                },
                {
                    "id": "#read-quality-alignment.cwl/cutadapt_cwl",
                    "in": [
                        {
                            "id": "#read-quality-alignment.cwl/cutadapt_cwl/read1.fastq.gz",
                            "source": [
                                "#read-quality-alignment.cwl/fastq_qc_cwl/read1.fastqc.gz"
                            ]
                        },
                        {
                            "id": "#read-quality-alignment.cwl/cutadapt_cwl/read2.fastq.gz",
                            "source": [
                                "#read-quality-alignment.cwl/fastq_qc_cwl/read2.fastqc.gz"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#read-quality-alignment.cwl/cutadapt_cwl/read1.clean.fastq.gz"
                        },
                        {
                            "id": "#read-quality-alignment.cwl/cutadapt_cwl/read2.clean.fastq.gz"
                        }
                    ],
                    "run": "#cutadapt.cwl",
                    "label": "cutadapt"
                },
                {
                    "id": "#read-quality-alignment.cwl/bwa_mem",
                    "in": [
                        {
                            "id": "#read-quality-alignment.cwl/bwa_mem/forward_reads.gz",
                            "source": [
                                "#read-quality-alignment.cwl/cutadapt_cwl/read1.clean.fastq.gz"
                            ]
                        },
                        {
                            "id": "#read-quality-alignment.cwl/bwa_mem/reference_assembly",
                            "source": [
                                "#read-quality-alignment.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#read-quality-alignment.cwl/bwa_mem/reverse_reads.gz",
                            "source": [
                                "#read-quality-alignment.cwl/cutadapt_cwl/read2.clean.fastq.gz"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#read-quality-alignment.cwl/bwa_mem/ref_aligned_bam"
                        }
                    ],
                    "run": "#bwa-mem.cwl",
                    "label": "mapping of forward and reverse reads to the reference assembly"
                },
                {
                    "id": "#read-quality-alignment.cwl/picard_sortsam_cwl",
                    "in": [
                        {
                            "id": "#read-quality-alignment.cwl/picard_sortsam_cwl/bam",
                            "source": [
                                "#read-quality-alignment.cwl/bwa_mem/ref_aligned_bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#read-quality-alignment.cwl/picard_sortsam_cwl/sorted.bam"
                        }
                    ],
                    "run": "#picard_sortsam.cwl",
                    "label": "picard_sortsam"
                }
            ]
        },
        {
            "class": "Workflow",
            "id": "#main",
            "requirements": [
                {
                    "class": "SubworkflowFeatureRequirement"
                },
                {
                    "class": "ScatterFeatureRequirement"
                }
            ],
            "label": "seqliner-lymphoma(1)",
            "inputs": [
                {
                    "id": "#main/reverse_reads",
                    "type": "File",
                    "label": "normal-reverse-fastq"
                },
                {
                    "id": "#main/forward_reads",
                    "type": "File",
                    "label": "normal-reverse-fastq"
                },
                {
                    "id": "#main/reverse_reads_1",
                    "type": "File",
                    "label": "tumour-reverse-fastq"
                },
                {
                    "id": "#main/forward_reads_1",
                    "type": "File",
                    "label": "tumour-forward-fastq"
                },
                {
                    "id": "#main/target_sites.bed",
                    "type": "File"
                },
                {
                    "id": "#main/reference_assembly",
                    "type": "File"
                },
                {
                    "id": "#main/dbsnp_138",
                    "type": "File"
                },
                {
                    "id": "#main/cosmic.vcf",
                    "type": "File"
                },
                {
                    "id": "#main/Mills_and_1000G_gold",
                    "type": "File"
                },
                {
                    "id": "#main/1000G_phase1.indels",
                    "type": "File"
                }
            ],
            "outputs": [
                {
                    "id": "#main/bamstats.tsv_2",
                    "outputSource": [
                        "#main/variant_calling_hc_cwl/bamstats.tsv_2"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/bamstats.tsv_1",
                    "outputSource": [
                        "#main/variant_calling_hc_cwl/bamstats.tsv_1"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/bamstats.tsv",
                    "outputSource": [
                        "#main/variant_calling_hc_cwl/bamstats.tsv"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/fastqc_report_reverse",
                    "outputSource": [
                        "#main/tumour_fastq_cwl/fastqc_report_reverse"
                    ],
                    "type": "File",
                    "label": "tumour-fastqc_report_reverse"
                },
                {
                    "id": "#main/fastqc_report_forward",
                    "outputSource": [
                        "#main/tumour_fastq_cwl/fastqc_report_forward"
                    ],
                    "type": "File",
                    "label": "tumour-fastqc_report_forward"
                },
                {
                    "id": "#main/fastqc_report_reverse_1",
                    "outputSource": [
                        "#main/normal_fastq_cwl/fastqc_report_reverse"
                    ],
                    "type": "File",
                    "label": "normal-fastqc_report_reverse"
                },
                {
                    "id": "#main/fastqc_report_forward_1",
                    "outputSource": [
                        "#main/normal_fastq_cwl/fastqc_report_forward"
                    ],
                    "type": "File",
                    "label": "normal-fastqc_report_forward"
                },
                {
                    "id": "#main/bamstats.tsv_3",
                    "outputSource": [
                        "#main/variant_calling_cwl/bamstats.tsv"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/dedup_metrics",
                    "outputSource": [
                        "#main/post_alignment_processing_cwl_2/dedup_metrics"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/dedup_metrics_1",
                    "outputSource": [
                        "#main/post_alignment_processing_cwl/dedup_metrics"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/dedup_metrics_2",
                    "outputSource": [
                        "#main/post_alignment_processing_cwl_1/dedup_metrics"
                    ],
                    "type": "File"
                }
            ],
            "steps": [
                {
                    "id": "#main/normal_fastq_cwl",
                    "in": [
                        {
                            "id": "#main/normal_fastq_cwl/reverse_reads",
                            "source": [
                                "#main/reverse_reads"
                            ]
                        },
                        {
                            "id": "#main/normal_fastq_cwl/forward_reads",
                            "source": [
                                "#main/forward_reads"
                            ]
                        },
                        {
                            "id": "#main/normal_fastq_cwl/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/normal_fastq_cwl/fastqc_report_reverse"
                        },
                        {
                            "id": "#main/normal_fastq_cwl/fastqc_report_forward"
                        },
                        {
                            "id": "#main/normal_fastq_cwl/sorted.bam"
                        }
                    ],
                    "run": "#read-quality-alignment.cwl",
                    "label": "normal-fastq-alignment_cwl"
                },
                {
                    "id": "#main/tumour_fastq_cwl",
                    "in": [
                        {
                            "id": "#main/tumour_fastq_cwl/reverse_reads",
                            "source": [
                                "#main/reverse_reads_1"
                            ]
                        },
                        {
                            "id": "#main/tumour_fastq_cwl/forward_reads",
                            "source": [
                                "#main/forward_reads_1"
                            ]
                        },
                        {
                            "id": "#main/tumour_fastq_cwl/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/tumour_fastq_cwl/fastqc_report_reverse"
                        },
                        {
                            "id": "#main/tumour_fastq_cwl/fastqc_report_forward"
                        },
                        {
                            "id": "#main/tumour_fastq_cwl/sorted.bam"
                        }
                    ],
                    "run": "#read-quality-alignment.cwl",
                    "label": "tumour-fastq-alignment_cwl"
                },
                {
                    "id": "#main/post_alignment_processing_cwl",
                    "in": [
                        {
                            "id": "#main/post_alignment_processing_cwl/target_sites.bed",
                            "source": [
                                "#main/target_sites.bed"
                            ]
                        },
                        {
                            "id": "#main/post_alignment_processing_cwl/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/post_alignment_processing_cwl/Mills_and_1000G_gold",
                            "source": [
                                "#main/Mills_and_1000G_gold"
                            ]
                        },
                        {
                            "id": "#main/post_alignment_processing_cwl/1000G_phase1.indels",
                            "source": [
                                "#main/1000G_phase1.indels"
                            ]
                        },
                        {
                            "id": "#main/post_alignment_processing_cwl/dbsnp_138",
                            "source": [
                                "#main/dbsnp_138"
                            ]
                        },
                        {
                            "id": "#main/post_alignment_processing_cwl/sorted_aligned_bam",
                            "source": [
                                "#main/merge_bams/aligned_merged_bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/post_alignment_processing_cwl/recalibrated_bam"
                        },
                        {
                            "id": "#main/post_alignment_processing_cwl/dedup_metrics"
                        }
                    ],
                    "run": "#post-alignment-processing.cwl",
                    "label": "normal--post-alignment-processing"
                },
                {
                    "id": "#main/merge_bams",
                    "in": [
                        {
                            "id": "#main/merge_bams/merged.sorted.bam.1",
                            "source": [
                                "#main/normal_fastq_cwl/sorted.bam"
                            ]
                        },
                        {
                            "id": "#main/merge_bams/merged.sorted.bam.2",
                            "source": [
                                "#main/normal_fastq_cwl/sorted.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/merge_bams/aligned_merged_bam"
                        }
                    ],
                    "run": "#merge_bams.cwl",
                    "label": "merge bam files"
                },
                {
                    "id": "#main/merge_bams_1",
                    "in": [
                        {
                            "id": "#main/merge_bams_1/merged.sorted.bam.1",
                            "source": [
                                "#main/tumour_fastq_cwl/sorted.bam"
                            ]
                        },
                        {
                            "id": "#main/merge_bams_1/merged.sorted.bam.2",
                            "source": [
                                "#main/tumour_fastq_cwl/sorted.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/merge_bams_1/aligned_merged_bam"
                        }
                    ],
                    "run": "#merge_bams.cwl",
                    "label": "merge bam files"
                },
                {
                    "id": "#main/merge_bams_2",
                    "in": [
                        {
                            "id": "#main/merge_bams_2/merged.sorted.bam.1",
                            "source": [
                                "#main/merge_bams_1/aligned_merged_bam"
                            ]
                        },
                        {
                            "id": "#main/merge_bams_2/merged.sorted.bam.2",
                            "source": [
                                "#main/merge_bams/aligned_merged_bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/merge_bams_2/aligned_merged_bam"
                        }
                    ],
                    "run": "#merge_bams.cwl",
                    "label": "merge bam files"
                },
                {
                    "id": "#main/post_alignment_processing_cwl_2",
                    "in": [
                        {
                            "id": "#main/post_alignment_processing_cwl_2/target_sites.bed",
                            "source": [
                                "#main/target_sites.bed"
                            ]
                        },
                        {
                            "id": "#main/post_alignment_processing_cwl_2/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/post_alignment_processing_cwl_2/Mills_and_1000G_gold",
                            "source": [
                                "#main/Mills_and_1000G_gold"
                            ]
                        },
                        {
                            "id": "#main/post_alignment_processing_cwl_2/1000G_phase1.indels",
                            "source": [
                                "#main/1000G_phase1.indels"
                            ]
                        },
                        {
                            "id": "#main/post_alignment_processing_cwl_2/dbsnp_138",
                            "source": [
                                "#main/dbsnp_138"
                            ]
                        },
                        {
                            "id": "#main/post_alignment_processing_cwl_2/sorted_aligned_bam",
                            "source": [
                                "#main/merge_bams_1/aligned_merged_bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/post_alignment_processing_cwl_2/recalibrated_bam"
                        },
                        {
                            "id": "#main/post_alignment_processing_cwl_2/dedup_metrics"
                        }
                    ],
                    "run": "#post-alignment-processing.cwl",
                    "label": "tumour--post-alignment-processing"
                },
                {
                    "id": "#main/post_alignment_processing_cwl_1",
                    "in": [
                        {
                            "id": "#main/post_alignment_processing_cwl_1/sorted_aligned_bam",
                            "source": [
                                "#main/merge_bams_2/aligned_merged_bam"
                            ]
                        },
                        {
                            "id": "#main/post_alignment_processing_cwl_1/target_sites.bed",
                            "source": [
                                "#main/target_sites.bed"
                            ]
                        },
                        {
                            "id": "#main/post_alignment_processing_cwl_1/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/post_alignment_processing_cwl_1/Mills_and_1000G_gold",
                            "source": [
                                "#main/Mills_and_1000G_gold"
                            ]
                        },
                        {
                            "id": "#main/post_alignment_processing_cwl_1/1000G_phase1.indels",
                            "source": [
                                "#main/1000G_phase1.indels"
                            ]
                        },
                        {
                            "id": "#main/post_alignment_processing_cwl_1/dbsnp_138",
                            "source": [
                                "#main/dbsnp_138"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/post_alignment_processing_cwl_1/recalibrated_bam"
                        },
                        {
                            "id": "#main/post_alignment_processing_cwl_1/dedup_metrics"
                        }
                    ],
                    "run": "#post-alignment-processing.cwl",
                    "label": "t-n--post-alignment-processing"
                },
                {
                    "id": "#main/variant_calling_cwl",
                    "in": [
                        {
                            "id": "#main/variant_calling_cwl/target_sites.bed",
                            "source": [
                                "#main/target_sites.bed"
                            ]
                        },
                        {
                            "id": "#main/variant_calling_cwl/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/variant_calling_cwl/bam",
                            "source": [
                                "#main/post_alignment_processing_cwl_2/recalibrated_bam"
                            ]
                        },
                        {
                            "id": "#main/variant_calling_cwl/normal.bam",
                            "source": [
                                "#main/post_alignment_processing_cwl/recalibrated_bam"
                            ]
                        },
                        {
                            "id": "#main/variant_calling_cwl/dbsnp_138",
                            "source": [
                                "#main/dbsnp_138"
                            ]
                        },
                        {
                            "id": "#main/variant_calling_cwl/cosmic.vcf",
                            "source": [
                                "#main/cosmic.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/variant_calling_cwl/bamstats.tsv"
                        }
                    ],
                    "run": "#variant_calling.cwl",
                    "label": "variant_calling"
                },
                {
                    "id": "#main/variant_calling_hc_cwl",
                    "in": [
                        {
                            "id": "#main/variant_calling_hc_cwl/bam",
                            "source": [
                                "#main/post_alignment_processing_cwl_1/recalibrated_bam"
                            ]
                        },
                        {
                            "id": "#main/variant_calling_hc_cwl/bam_1",
                            "source": [
                                "#main/post_alignment_processing_cwl_2/recalibrated_bam"
                            ]
                        },
                        {
                            "id": "#main/variant_calling_hc_cwl/bam_2",
                            "source": [
                                "#main/post_alignment_processing_cwl/recalibrated_bam"
                            ]
                        },
                        {
                            "id": "#main/variant_calling_hc_cwl/dbsnp_138",
                            "source": [
                                "#main/dbsnp_138"
                            ]
                        },
                        {
                            "id": "#main/variant_calling_hc_cwl/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/variant_calling_hc_cwl/target_sites.bed",
                            "source": [
                                "#main/target_sites.bed"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/variant_calling_hc_cwl/bamstats.tsv"
                        },
                        {
                            "id": "#main/variant_calling_hc_cwl/bamstats.tsv_1"
                        },
                        {
                            "id": "#main/variant_calling_hc_cwl/bamstats.tsv_2"
                        }
                    ],
                    "run": "#variant-calling-hc.cwl",
                    "label": "variant-calling-hc"
                }
            ]
        },
        {
            "class": "Workflow",
            "id": "#variant-calling-hc.cwl",
            "label": "variant-calling-hc",
            "inputs": [
                {
                    "id": "#variant-calling-hc.cwl/bam",
                    "type": "File",
                    "label": "tumour-normal.bam"
                },
                {
                    "id": "#variant-calling-hc.cwl/bam_1",
                    "type": "File",
                    "label": "tumour.bam"
                },
                {
                    "id": "#variant-calling-hc.cwl/bam_2",
                    "type": "File",
                    "label": "normal.bam"
                },
                {
                    "id": "#variant-calling-hc.cwl/dbsnp_138",
                    "type": "File"
                },
                {
                    "id": "#variant-calling-hc.cwl/reference_assembly",
                    "type": "File"
                },
                {
                    "id": "#variant-calling-hc.cwl/target_sites.bed",
                    "type": "File"
                }
            ],
            "outputs": [
                {
                    "id": "#variant-calling-hc.cwl/bamstats.tsv",
                    "outputSource": [
                        "#variant-calling-hc.cwl/merge_vcf_vep_cwl/bamstats.tsv"
                    ],
                    "type": "File",
                    "label": "normal-tsv"
                },
                {
                    "id": "#variant-calling-hc.cwl/bamstats.tsv_1",
                    "outputSource": [
                        "#variant-calling-hc.cwl/merge_vcf_vep_cwl_1/bamstats.tsv"
                    ],
                    "type": "File",
                    "label": "tumour-tsv"
                },
                {
                    "id": "#variant-calling-hc.cwl/bamstats.tsv_2",
                    "outputSource": [
                        "#variant-calling-hc.cwl/merge_vcf_vep_cwl_2/bamstats.tsv"
                    ],
                    "type": "File",
                    "label": "tumour-normal-tsv"
                }
            ],
            "steps": [
                {
                    "id": "#variant-calling-hc.cwl/gatk_haplotypecaller_cwl",
                    "in": [
                        {
                            "id": "#variant-calling-hc.cwl/gatk_haplotypecaller_cwl/bam",
                            "source": [
                                "#variant-calling-hc.cwl/bam_2"
                            ]
                        },
                        {
                            "id": "#variant-calling-hc.cwl/gatk_haplotypecaller_cwl/target_sites.bed",
                            "source": [
                                "#variant-calling-hc.cwl/target_sites.bed"
                            ]
                        },
                        {
                            "id": "#variant-calling-hc.cwl/gatk_haplotypecaller_cwl/reference_assembly",
                            "source": [
                                "#variant-calling-hc.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#variant-calling-hc.cwl/gatk_haplotypecaller_cwl/dbsnp_138",
                            "source": [
                                "#variant-calling-hc.cwl/dbsnp_138"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant-calling-hc.cwl/gatk_haplotypecaller_cwl/hap.vcf"
                        }
                    ],
                    "run": "#gatk_haplotypecaller.cwl",
                    "label": "normal-gatk_haplotypecaller"
                },
                {
                    "id": "#variant-calling-hc.cwl/gatk_haplotypecaller_cwl_1",
                    "in": [
                        {
                            "id": "#variant-calling-hc.cwl/gatk_haplotypecaller_cwl_1/bam",
                            "source": [
                                "#variant-calling-hc.cwl/bam_1"
                            ]
                        },
                        {
                            "id": "#variant-calling-hc.cwl/gatk_haplotypecaller_cwl_1/target_sites.bed",
                            "source": [
                                "#variant-calling-hc.cwl/target_sites.bed"
                            ]
                        },
                        {
                            "id": "#variant-calling-hc.cwl/gatk_haplotypecaller_cwl_1/reference_assembly",
                            "source": [
                                "#variant-calling-hc.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#variant-calling-hc.cwl/gatk_haplotypecaller_cwl_1/dbsnp_138",
                            "source": [
                                "#variant-calling-hc.cwl/dbsnp_138"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant-calling-hc.cwl/gatk_haplotypecaller_cwl_1/hap.vcf"
                        }
                    ],
                    "run": "#gatk_haplotypecaller.cwl",
                    "label": "tumour-gatk_haplotypecaller"
                },
                {
                    "id": "#variant-calling-hc.cwl/gatk_haplotypecaller_cwl_2",
                    "in": [
                        {
                            "id": "#variant-calling-hc.cwl/gatk_haplotypecaller_cwl_2/bam",
                            "source": [
                                "#variant-calling-hc.cwl/bam"
                            ]
                        },
                        {
                            "id": "#variant-calling-hc.cwl/gatk_haplotypecaller_cwl_2/target_sites.bed",
                            "source": [
                                "#variant-calling-hc.cwl/target_sites.bed"
                            ]
                        },
                        {
                            "id": "#variant-calling-hc.cwl/gatk_haplotypecaller_cwl_2/reference_assembly",
                            "source": [
                                "#variant-calling-hc.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#variant-calling-hc.cwl/gatk_haplotypecaller_cwl_2/dbsnp_138",
                            "source": [
                                "#variant-calling-hc.cwl/dbsnp_138"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant-calling-hc.cwl/gatk_haplotypecaller_cwl_2/hap.vcf"
                        }
                    ],
                    "run": "#gatk_haplotypecaller.cwl",
                    "label": "t-n--gatk_haplotypecaller"
                },
                {
                    "id": "#variant-calling-hc.cwl/addbamstats_cwl",
                    "in": [
                        {
                            "id": "#variant-calling-hc.cwl/addbamstats_cwl/reference_assembly",
                            "source": [
                                "#variant-calling-hc.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#variant-calling-hc.cwl/addbamstats_cwl/bam1",
                            "source": [
                                "#variant-calling-hc.cwl/gatk_haplotypecaller_cwl/hap.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant-calling-hc.cwl/addbamstats_cwl/bamstats.vcf"
                        }
                    ],
                    "run": "#addbamstats.cwl",
                    "label": "addbamstats"
                },
                {
                    "id": "#variant-calling-hc.cwl/addbamstats_cwl_1",
                    "in": [
                        {
                            "id": "#variant-calling-hc.cwl/addbamstats_cwl_1/reference_assembly",
                            "source": [
                                "#variant-calling-hc.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#variant-calling-hc.cwl/addbamstats_cwl_1/bam1",
                            "source": [
                                "#variant-calling-hc.cwl/gatk_haplotypecaller_cwl_1/hap.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant-calling-hc.cwl/addbamstats_cwl_1/bamstats.vcf"
                        }
                    ],
                    "run": "#addbamstats.cwl",
                    "label": "addbamstats"
                },
                {
                    "id": "#variant-calling-hc.cwl/addbamstats_cwl_2",
                    "in": [
                        {
                            "id": "#variant-calling-hc.cwl/addbamstats_cwl_2/reference_assembly",
                            "source": [
                                "#variant-calling-hc.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#variant-calling-hc.cwl/addbamstats_cwl_2/bam1",
                            "source": [
                                "#variant-calling-hc.cwl/gatk_haplotypecaller_cwl_2/hap.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant-calling-hc.cwl/addbamstats_cwl_2/bamstats.vcf"
                        }
                    ],
                    "run": "#addbamstats.cwl",
                    "label": "addbamstats"
                },
                {
                    "id": "#variant-calling-hc.cwl/vep_annotation_cwl",
                    "in": [
                        {
                            "id": "#variant-calling-hc.cwl/vep_annotation_cwl/bamstats.vcf",
                            "source": [
                                "#variant-calling-hc.cwl/addbamstats_cwl/bamstats.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant-calling-hc.cwl/vep_annotation_cwl/output"
                        }
                    ],
                    "run": "#vep_annotation.cwl",
                    "label": "vep_annotation"
                },
                {
                    "id": "#variant-calling-hc.cwl/vep_annotation_cwl_1",
                    "in": [
                        {
                            "id": "#variant-calling-hc.cwl/vep_annotation_cwl_1/bamstats.vcf",
                            "source": [
                                "#variant-calling-hc.cwl/addbamstats_cwl_1/bamstats.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant-calling-hc.cwl/vep_annotation_cwl_1/output"
                        }
                    ],
                    "run": "#vep_annotation.cwl",
                    "label": "vep_annotation"
                },
                {
                    "id": "#variant-calling-hc.cwl/vep_annotation_cwl_2",
                    "in": [
                        {
                            "id": "#variant-calling-hc.cwl/vep_annotation_cwl_2/bamstats.vcf",
                            "source": [
                                "#variant-calling-hc.cwl/addbamstats_cwl_2/bamstats.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant-calling-hc.cwl/vep_annotation_cwl_2/output"
                        }
                    ],
                    "run": "#vep_annotation.cwl",
                    "label": "vep_annotation"
                },
                {
                    "id": "#variant-calling-hc.cwl/merge_vcf_vep_cwl",
                    "in": [
                        {
                            "id": "#variant-calling-hc.cwl/merge_vcf_vep_cwl/bamstats.vcf",
                            "source": [
                                "#variant-calling-hc.cwl/addbamstats_cwl/bamstats.vcf"
                            ]
                        },
                        {
                            "id": "#variant-calling-hc.cwl/merge_vcf_vep_cwl/bamstats.vep",
                            "source": [
                                "#variant-calling-hc.cwl/vep_annotation_cwl/output"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant-calling-hc.cwl/merge_vcf_vep_cwl/bamstats.tsv"
                        }
                    ],
                    "run": "#merge_vcf_vep.cwl",
                    "label": "merge_vcf_vep"
                },
                {
                    "id": "#variant-calling-hc.cwl/merge_vcf_vep_cwl_1",
                    "in": [
                        {
                            "id": "#variant-calling-hc.cwl/merge_vcf_vep_cwl_1/bamstats.vcf",
                            "source": [
                                "#variant-calling-hc.cwl/addbamstats_cwl_1/bamstats.vcf"
                            ]
                        },
                        {
                            "id": "#variant-calling-hc.cwl/merge_vcf_vep_cwl_1/bamstats.vep",
                            "source": [
                                "#variant-calling-hc.cwl/vep_annotation_cwl_1/output"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant-calling-hc.cwl/merge_vcf_vep_cwl_1/bamstats.tsv"
                        }
                    ],
                    "run": "#merge_vcf_vep.cwl",
                    "label": "merge_vcf_vep"
                },
                {
                    "id": "#variant-calling-hc.cwl/merge_vcf_vep_cwl_2",
                    "in": [
                        {
                            "id": "#variant-calling-hc.cwl/merge_vcf_vep_cwl_2/bamstats.vcf",
                            "source": [
                                "#variant-calling-hc.cwl/addbamstats_cwl_2/bamstats.vcf"
                            ]
                        },
                        {
                            "id": "#variant-calling-hc.cwl/merge_vcf_vep_cwl_2/bamstats.vep",
                            "source": [
                                "#variant-calling-hc.cwl/vep_annotation_cwl_2/output"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant-calling-hc.cwl/merge_vcf_vep_cwl_2/bamstats.tsv"
                        }
                    ],
                    "run": "#merge_vcf_vep.cwl",
                    "label": "merge_vcf_vep"
                }
            ]
        },
        {
            "class": "Workflow",
            "id": "#variant_calling.cwl",
            "label": "variant_calling",
            "inputs": [
                {
                    "id": "#variant_calling.cwl/target_sites.bed",
                    "type": "File"
                },
                {
                    "id": "#variant_calling.cwl/reference_assembly",
                    "type": "File"
                },
                {
                    "id": "#variant_calling.cwl/bam",
                    "type": "File",
                    "label": "tumour.bam"
                },
                {
                    "id": "#variant_calling.cwl/normal.bam",
                    "type": "File",
                    "label": "normal.bam"
                },
                {
                    "id": "#variant_calling.cwl/dbsnp_138",
                    "type": "File"
                },
                {
                    "id": "#variant_calling.cwl/cosmic.vcf",
                    "type": "File"
                }
            ],
            "outputs": [
                {
                    "id": "#variant_calling.cwl/bamstats.tsv",
                    "outputSource": [
                        "#variant_calling.cwl/merge_vcf_vep_cwl/bamstats.tsv"
                    ],
                    "type": "File"
                }
            ],
            "steps": [
                {
                    "id": "#variant_calling.cwl/vardict_cwl",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/vardict_cwl/chr.bed",
                            "source": [
                                "#variant_calling.cwl/grep_bash_cwl/chr.bed"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/vardict_cwl/reference_assembly",
                            "source": [
                                "#variant_calling.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/vardict_cwl/tumour.bam",
                            "source": [
                                "#variant_calling.cwl/bam"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/vardict_cwl/normal.bam",
                            "source": [
                                "#variant_calling.cwl/normal.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/vardict_cwl/tumour--normal_vardict.vcf"
                        }
                    ],
                    "run": "#vardict.cwl",
                    "label": "vardict"
                },
                {
                    "id": "#variant_calling.cwl/samtools_mpileup_cwl",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/samtools_mpileup_cwl/bam",
                            "source": [
                                "#variant_calling.cwl/bam"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/samtools_mpileup_cwl/reference_assembly",
                            "source": [
                                "#variant_calling.cwl/reference_assembly"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/samtools_mpileup_cwl/pileup"
                        }
                    ],
                    "run": "#samtools-mpileup.cwl",
                    "label": "samtools-mpileup"
                },
                {
                    "id": "#variant_calling.cwl/varscan_cwl",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/varscan_cwl/tumour.pileup",
                            "source": [
                                "#variant_calling.cwl/samtools_mpileup_cwl/pileup"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/varscan_cwl/normal.pileup",
                            "source": [
                                "#variant_calling.cwl/samtools_mpileup_cwl_1/pileup"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/varscan_cwl/tumour--normal_varscan_snv.vcf"
                        },
                        {
                            "id": "#variant_calling.cwl/varscan_cwl/tumour--normal_varscan_indel.vcf"
                        }
                    ],
                    "run": "#varscan.cwl",
                    "label": "varscan"
                },
                {
                    "id": "#variant_calling.cwl/grep_bash_cwl",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/grep_bash_cwl/regions.bed",
                            "source": [
                                "#variant_calling.cwl/target_sites.bed"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/grep_bash_cwl/chr.bed"
                        }
                    ],
                    "run": "#grep_bash.cwl",
                    "label": "grep_bash"
                },
                {
                    "id": "#variant_calling.cwl/mutect2_cwl",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/mutect2_cwl/chr.bed",
                            "source": [
                                "#variant_calling.cwl/grep_bash_cwl_1/chr.bed"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/mutect2_cwl/tumour.bam",
                            "source": [
                                "#variant_calling.cwl/bam"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/mutect2_cwl/normal.bam",
                            "source": [
                                "#variant_calling.cwl/normal.bam"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/mutect2_cwl/dbsnp_138.vcf",
                            "source": [
                                "#variant_calling.cwl/dbsnp_138"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/mutect2_cwl/cosmic.vcf",
                            "source": [
                                "#variant_calling.cwl/cosmic.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/mutect2_cwl/chr.vcf"
                        }
                    ],
                    "run": "#mutect2.cwl",
                    "label": "mutect2"
                },
                {
                    "id": "#variant_calling.cwl/grep_bash_cwl_1",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/grep_bash_cwl_1/regions.bed",
                            "source": [
                                "#variant_calling.cwl/target_sites.bed"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/grep_bash_cwl_1/chr.bed"
                        }
                    ],
                    "run": "#grep_bash.cwl",
                    "label": "grep_bash"
                },
                {
                    "id": "#variant_calling.cwl/samtools_mpileup_cwl_1",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/samtools_mpileup_cwl_1/bam",
                            "source": [
                                "#variant_calling.cwl/normal.bam"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/samtools_mpileup_cwl_1/reference_assembly",
                            "source": [
                                "#variant_calling.cwl/reference_assembly"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/samtools_mpileup_cwl_1/pileup"
                        }
                    ],
                    "run": "#samtools-mpileup.cwl",
                    "label": "samtools-mpileup"
                },
                {
                    "id": "#variant_calling.cwl/varscan_somatic_concatvcf_cwl",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/varscan_somatic_concatvcf_cwl/tumour--normal_varscan_indel.vcf",
                            "source": [
                                "#variant_calling.cwl/varscan_cwl/tumour--normal_varscan_indel.vcf"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/varscan_somatic_concatvcf_cwl/tumour--normal_varscan_snv.vcf",
                            "source": [
                                "#variant_calling.cwl/varscan_cwl/tumour--normal_varscan_snv.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/varscan_somatic_concatvcf_cwl/tumour--normal_varscan.vcf"
                        }
                    ],
                    "run": "#varscan_somatic_concatvcf.cwl",
                    "label": "_varscan_somatic_concatVcf"
                },
                {
                    "id": "#variant_calling.cwl/vcfextractdp_ad_py_cwl",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/vcfextractdp_ad_py_cwl/combined.vcf",
                            "source": [
                                "#variant_calling.cwl/varscan_somatic_concatvcf_cwl/tumour--normal_varscan.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/vcfextractdp_ad_py_cwl/vcf"
                        }
                    ],
                    "run": "#vcfextractdp_ad-py.cwl",
                    "label": "vcfExtractDP_AD"
                },
                {
                    "id": "#variant_calling.cwl/filtersomatic_cwl",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/filtersomatic_cwl/tumour--normal_varscan.vcf",
                            "source": [
                                "#variant_calling.cwl/vcfextractdp_ad_py_cwl/vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/filtersomatic_cwl/tumour--normal_varscan_somatic"
                        }
                    ],
                    "run": "#filtersomatic.cwl",
                    "label": "filterSomatic"
                },
                {
                    "id": "#variant_calling.cwl/combinevariants_cwl",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/combinevariants_cwl/reference_assembly",
                            "source": [
                                "#variant_calling.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/combinevariants_cwl/tumour--normal_eda_vardict_somatic.vcf",
                            "source": [
                                "#variant_calling.cwl/filtersomatic_cwl_1/tumour--normal_varscan_somatic"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/combinevariants_cwl/tumour--normal_varscan_somatic.recode.vcf",
                            "source": [
                                "#variant_calling.cwl/filtersomatic_cwl/tumour--normal_varscan_somatic"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/combinevariants_cwl/tumour--normal_mutect2.vcf.org.recode.vcf",
                            "source": [
                                "#variant_calling.cwl/vcftools_filter_cwl/output"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/combinevariants_cwl/output"
                        }
                    ],
                    "run": "#combinevariants.cwl",
                    "label": "combineVariants"
                },
                {
                    "id": "#variant_calling.cwl/bedtools_intersect_cwl",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/bedtools_intersect_cwl/vcf_a",
                            "source": [
                                "#variant_calling.cwl/combinevariants_cwl/output"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/bedtools_intersect_cwl/bed_b",
                            "source": [
                                "#variant_calling.cwl/target_sites.bed"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/bedtools_intersect_cwl/tumour--normal_combined.bedFiltered.vcf"
                        }
                    ],
                    "run": "#bedtools-intersect.cwl",
                    "label": "bedtools-intersect"
                },
                {
                    "id": "#variant_calling.cwl/somaticvcfaveragedpad_cwl",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/somaticvcfaveragedpad_cwl/tumour--normal_combined.bedFiltered.vcf",
                            "source": [
                                "#variant_calling.cwl/bedtools_intersect_cwl/tumour--normal_combined.bedFiltered.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/somaticvcfaveragedpad_cwl/tumour--normal_combined.bedFiltered.avgDpAd.vcf"
                        }
                    ],
                    "run": "#somaticvcfaveragedpad.cwl",
                    "label": "somaticVcfAverageDpAd"
                },
                {
                    "id": "#variant_calling.cwl/trimiupac_vcf_cwl",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/trimiupac_vcf_cwl/tumour--normal_chr_vardict",
                            "source": [
                                "#variant_calling.cwl/vardict_cwl/tumour--normal_vardict.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/trimiupac_vcf_cwl/output"
                        }
                    ],
                    "run": "#trimiupac_vcf.cwl",
                    "label": "trimIUPAC_vcf"
                },
                {
                    "id": "#variant_calling.cwl/gatk_catvariants_cwl",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/gatk_catvariants_cwl/reference_assembly",
                            "source": [
                                "#variant_calling.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_catvariants_cwl/chr.vcf",
                            "source": [
                                "#variant_calling.cwl/trimiupac_vcf_cwl/output"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/gatk_catvariants_cwl/chr-combined.vcf"
                        }
                    ],
                    "run": "#gatk_catvariants.cwl",
                    "label": "gatk_catvariants"
                },
                {
                    "id": "#variant_calling.cwl/vcfextractdp_ad_py_cwl_1",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/vcfextractdp_ad_py_cwl_1/combined.vcf",
                            "source": [
                                "#variant_calling.cwl/gatk_catvariants_cwl/chr-combined.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/vcfextractdp_ad_py_cwl_1/vcf"
                        }
                    ],
                    "run": "#vcfextractdp_ad-py.cwl",
                    "label": "vcfExtractDP_AD"
                },
                {
                    "id": "#variant_calling.cwl/_index_vcf_by_tabix_cwl",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/_index_vcf_by_tabix_cwl/tumour--normal_eda_vardict.vcf",
                            "source": [
                                "#variant_calling.cwl/vcfextractdp_ad_py_cwl_1/vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/_index_vcf_by_tabix_cwl/tumour--normal_eda_vardict.vcf.gz"
                        }
                    ],
                    "run": "#index_vcf_by_tabix.cwl",
                    "label": "index_vcf_by_Tabix"
                },
                {
                    "id": "#variant_calling.cwl/filtersomatic_cwl_1",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/filtersomatic_cwl_1/tumour--normal_varscan.vcf",
                            "source": [
                                "#variant_calling.cwl/_index_vcf_by_tabix_cwl/tumour--normal_eda_vardict.vcf.gz"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/filtersomatic_cwl_1/tumour--normal_varscan_somatic"
                        }
                    ],
                    "run": "#filtersomatic.cwl",
                    "label": "filterSomatic"
                },
                {
                    "id": "#variant_calling.cwl/vcftools_filter_cwl",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/vcftools_filter_cwl/vcf",
                            "source": [
                                "#variant_calling.cwl/gatk_catvariants_cwl_1/chr-combined.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/vcftools_filter_cwl/output"
                        }
                    ],
                    "run": "#vcftools-filter.cwl",
                    "label": "filterPASS"
                },
                {
                    "id": "#variant_calling.cwl/addbamstats_cwl",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/addbamstats_cwl/reference_assembly",
                            "source": [
                                "#variant_calling.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/addbamstats_cwl/bam1",
                            "source": [
                                "#variant_calling.cwl/somaticvcfaveragedpad_cwl/tumour--normal_combined.bedFiltered.avgDpAd.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/addbamstats_cwl/bamstats.vcf"
                        }
                    ],
                    "run": "#addbamstats.cwl",
                    "label": "addbamstats"
                },
                {
                    "id": "#variant_calling.cwl/vep_annotation_cwl",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/vep_annotation_cwl/bamstats.vcf",
                            "source": [
                                "#variant_calling.cwl/addbamstats_cwl/bamstats.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/vep_annotation_cwl/output"
                        }
                    ],
                    "run": "#vep_annotation.cwl",
                    "label": "vep_annotation"
                },
                {
                    "id": "#variant_calling.cwl/merge_vcf_vep_cwl",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/merge_vcf_vep_cwl/bamstats.vcf",
                            "source": [
                                "#variant_calling.cwl/addbamstats_cwl/bamstats.vcf"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/merge_vcf_vep_cwl/bamstats.vep",
                            "source": [
                                "#variant_calling.cwl/vep_annotation_cwl/output"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/merge_vcf_vep_cwl/bamstats.tsv"
                        }
                    ],
                    "run": "#merge_vcf_vep.cwl",
                    "label": "merge_vcf_vep"
                },
                {
                    "id": "#variant_calling.cwl/gatk_catvariants_cwl_1",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/gatk_catvariants_cwl_1/reference_assembly",
                            "source": [
                                "#variant_calling.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_catvariants_cwl_1/chr.vcf",
                            "source": [
                                "#variant_calling.cwl/mutect2_cwl/chr.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/gatk_catvariants_cwl_1/chr-combined.vcf"
                        }
                    ],
                    "run": "#gatk_catvariants.cwl",
                    "label": "gatk_catvariants"
                }
            ]
        }
    ],
    "cwlVersion": "v1.0"
}