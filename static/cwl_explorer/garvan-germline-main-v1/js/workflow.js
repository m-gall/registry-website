"use strict";
 const input_workflow =
{
    "$graph": [
        {
            "class": "CommandLineTool",
            "id": "#bcl2fastq.cwl",
            "baseCommand": [],
            "inputs": [
                {
                    "id": "#bcl2fastq.cwl/bcl1",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#bcl2fastq.cwl/bcl2",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#bcl2fastq.cwl/fastq1.gz",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#bcl2fastq.cwl/fastq2,gz",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#bcl2fastq.cwl/samplesheet.csv",
                    "doc": "Sample sheet with recording sample metadata (e.g. lane, sampleID, recipe. operator) from sequencer.",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "doc": "Demultiplex and convert bcl files from Illumina platforms to fastq formats.",
            "label": "bcl2fastq"
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
                },
                {
                    "id": "#bwa-mem.cwl/read_group_library",
                    "type": [
                        "null",
                        "string"
                    ],
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#bwa-mem.cwl/centre",
                    "type": [
                        "null",
                        "string"
                    ],
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#bwa-mem.cwl/read_group_sample",
                    "type": [
                        "null",
                        "string"
                    ],
                    "inputBinding": {
                        "position": 0
                    }
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
            "label": "bwa-mem",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "-M",
                    "valueFrom": "true"
                },
                {
                    "position": 0,
                    "prefix": "-R",
                    "valueFrom": "true"
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
            "id": "#dbnsfp.cwl",
            "baseCommand": [],
            "inputs": [],
            "outputs": [
                {
                    "id": "#dbnsfp.cwl/dbNSFP-db",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "dbNSFP"
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
            "id": "#gatk_applyrecalibration.cwl",
            "baseCommand": [
                "java",
                "GenomeAnalysisTK.jar",
                "-T",
                "ApplyRecalibration"
            ],
            "inputs": [
                {
                    "id": "#gatk_applyrecalibration.cwl/reference_assembly",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_applyrecalibration.cwl/vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#gatk_applyrecalibration.cwl/recal.vcf",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "arguments": [
                {
                    "position": 0,
                    "prefix": "--ts_filter_level",
                    "valueFrom": "99.0"
                },
                {
                    "position": 0,
                    "prefix": "mode",
                    "valueFrom": "SNP"
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
                    "type": "File",
                    "secondaryFiles": [
                        "bam.ai"
                    ]
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
                    "id": "#gatk_baseRecalibrator.cwl/dbsnp_138",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_baseRecalibrator.cwl/Mills&1000G",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_baseRecalibrator.cwl/1000G_phase1",
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
            "id": "#gatk_combinevariants.cwl",
            "baseCommand": [
                "java",
                "-jar",
                "GenomeAnalysisTK.jar",
                "-T",
                "CombineVariants"
            ],
            "inputs": [
                {
                    "id": "#gatk_combinevariants.cwl/indel.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_combinevariants.cwl/snv.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_combinevariants.cwl/reference_assembly",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#gatk_combinevariants.cwl/combined.vcf",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "gatk_combineVariants"
        },
        {
            "class": "CommandLineTool",
            "baseCommand": [
                "GenomeAnalysisTK.jar",
                "-T",
                "GenotypeGVCFs"
            ],
            "inputs": [
                {
                    "format": "http://edamontology.org/format_3016",
                    "id": "#gatk_genotypeGVCFs.cwl/raw_variants_g",
                    "type": "File",
                    "inputBinding": {
                        "position": 0,
                        "valueFrom": "/vcf/raw_variants_g"
                    },
                    "secondaryFiles": [
                        "vcf.index"
                    ]
                },
                {
                    "format": "http://edamontology.org/format_1929",
                    "id": "#gatk_genotypeGVCFs.cwl/reference_assembly",
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
                }
            ],
            "outputs": [
                {
                    "id": "#gatk_genotypeGVCFs.cwl/raw_variants_g_gvcf",
                    "type": "File",
                    "outputBinding": {},
                    "format": "http://edamontology.org/format_3016"
                }
            ],
            "label": "genotype GVCF",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "stand_call_conf",
                    "valueFrom": "=5.0"
                },
                {
                    "position": 0,
                    "prefix": "stand_emit_conf",
                    "valueFrom": "=5.0"
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
            "id": "#gatk_genotypeGVCFs.cwl"
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
                    "id": "#gatk_haplotypecaller.cwl/reference_assembly",
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
            "label": "gatk_haplotypecaller"
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
                    "doc": "human_g1k_v37_decoy human reference genome",
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
                    "id": "#gatk_indelRealigner.cwl/Mills&1000G",
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
                    "id": "#gatk_printReads.cwl/realigned_bam",
                    "type": "File"
                }
            ],
            "outputs": [
                {
                    "id": "#gatk_printReads.cwl/recalibrated_bam",
                    "type": "File",
                    "outputBinding": {},
                    "format": "http://edamontology.org/format_2572"
                }
            ],
            "label": "Apply recalibration to bam file. Overwrites values",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "-bqsr"
                },
                {
                    "position": 0,
                    "prefix": "--Printreads"
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
                    "format": "http://edamontology.org/data_2340",
                    "id": "#gatk_realignerTargetCreator.cwl/reference_assembly",
                    "type": "File",
                    "inputBinding": {
                        "position": 0,
                        "valueFrom": "/ref/reference_assembly"
                    },
                    "doc": "human_g1k_v37_decoy.fasta",
                    "secondaryFiles": [
                        ".fai",
                        ".bwt",
                        ".sa",
                        ".ann",
                        ".amb",
                        ".pac",
                        ".alt"
                    ]
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
            "baseCommand": [
                "GenomeAnalysisTK.jar",
                "-T",
                "SelectVariants"
            ],
            "inputs": [
                {
                    "format": "http://edamontology.org/format_3016# vcf",
                    "id": "#gatk_select_indels.cwl/raw_variants_g_gvcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0,
                        "valueFrom": "/vcf/raw_variants_g_gvcf"
                    }
                },
                {
                    "format": "http://edamontology.org/format_1929",
                    "id": "#gatk_select_indels.cwl/reference_assembly",
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
                }
            ],
            "outputs": [
                {
                    "id": "#gatk_select_indels.cwl/indel_g_gvcf",
                    "type": "File",
                    "outputBinding": {},
                    "format": null
                }
            ],
            "label": "select variants - indel",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "interval_padding"
                },
                {
                    "position": 0,
                    "prefix": "select_type_to_include"
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
            "id": "#gatk_select_indels.cwl"
        },
        {
            "class": "CommandLineTool",
            "baseCommand": [
                "GenomeAnalysisTK.jar",
                "-T",
                "SelectVariants"
            ],
            "inputs": [
                {
                    "format": "http://edamontology.org/format_3016",
                    "id": "#gatk_select_snvs.cwl/raw_variants_g_gvcf",
                    "type": "File",
                    "secondaryFiles": [
                        "vcf.index"
                    ]
                },
                {
                    "format": "http://edamontology.org/format_1929",
                    "id": "#gatk_select_snvs.cwl/reference_assembly",
                    "type": "File",
                    "secondaryFiles": [
                        ".fai",
                        ".bwt",
                        ".sa",
                        ".ann",
                        ".amb",
                        ".pac",
                        ".alt"
                    ]
                }
            ],
            "outputs": [
                {
                    "id": "#gatk_select_snvs.cwl/snv_g_gvcf",
                    "type": "File",
                    "outputBinding": {},
                    "format": null
                }
            ],
            "label": "select variants - snvs",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "interval_padding"
                },
                {
                    "position": 0,
                    "prefix": "select_type_to_include"
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
            "id": "#gatk_select_snvs.cwl"
        },
        {
            "class": "CommandLineTool",
            "id": "#gatk_variantrecalibrator-indel.cwl",
            "baseCommand": [
                "java",
                "GenomeAnalysisTK.jar",
                "-T",
                "VariantRecalibrator"
            ],
            "inputs": [
                {
                    "id": "#gatk_variantrecalibrator-indel.cwl/vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_variantrecalibrator-indel.cwl/reference_assembly",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    },
                    "doc": "hs37d5"
                },
                {
                    "id": "#gatk_variantrecalibrator-indel.cwl/resource-hapmap",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_variantrecalibrator-indel.cwl/resource-omni",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_variantrecalibrator-indel.cwl/resource-1000G",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_variantrecalibrator-indel.cwl/resource-dbsnp",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#gatk_variantrecalibrator-indel.cwl/vcfgz",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "gatk_variantRecalibrator",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "mode",
                    "valueFrom": "INDEL"
                },
                {
                    "position": 0,
                    "prefix": "ts_filter_level",
                    "valueFrom": "99.0"
                }
            ]
        },
        {
            "class": "CommandLineTool",
            "id": "#gatk_variantrecalibrator-snp.cwl",
            "baseCommand": [
                "java",
                "GenomeAnalysisTK.jar",
                "-T",
                "VariantRecalibrator"
            ],
            "inputs": [
                {
                    "id": "#gatk_variantrecalibrator-snp.cwl/vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_variantrecalibrator-snp.cwl/reference_assembly",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    },
                    "doc": "hs37d5"
                },
                {
                    "id": "#gatk_variantrecalibrator-snp.cwl/resource-hapmap",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_variantrecalibrator-snp.cwl/resource-omni",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_variantrecalibrator-snp.cwl/resource-1000G",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_variantrecalibrator-snp.cwl/resource-dbsnp",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#gatk_variantrecalibrator-snp.cwl/vcfgz",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "gatk_variantRecalibrator",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "mode",
                    "valueFrom": "SNP"
                },
                {
                    "position": 0,
                    "prefix": "ts_filter_level",
                    "valueFrom": "99.0"
                }
            ]
        },
        {
            "class": "CommandLineTool",
            "id": "#gemini.cwl",
            "baseCommand": [],
            "inputs": [
                {
                    "id": "#gemini.cwl/annotated_vcfgz",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#gemini.cwl/SQLite.db",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "gemini"
        },
        {
            "class": "CommandLineTool",
            "id": "#loftee.cwl",
            "baseCommand": [],
            "inputs": [],
            "outputs": [
                {
                    "id": "#loftee.cwl/LOFTEE-db",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "LOFTEE"
        },
        {
            "class": "CommandLineTool",
            "id": "#novosort-dedup.cwl",
            "baseCommand": [],
            "inputs": [
                {
                    "id": "#novosort-dedup.cwl/input",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#novosort-dedup.cwl/dedup.bam",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "Novosort-dedup",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "Duplicates",
                    "valueFrom": "mark"
                }
            ]
        },
        {
            "class": "CommandLineTool",
            "id": "#novosort-merge.cwl",
            "baseCommand": [],
            "inputs": [
                {
                    "id": "#novosort-merge.cwl/bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#novosort-merge.cwl/merged.bam",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "novosort-merge"
        },
        {
            "class": "CommandLineTool",
            "id": "#novosort-sort.cwl",
            "baseCommand": [],
            "inputs": [
                {
                    "id": "#novosort-sort.cwl/bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#novosort-sort.cwl/sorted.bam",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "novosort-sort"
        },
        {
            "class": "CommandLineTool",
            "id": "#seave-import.cwl",
            "baseCommand": [],
            "inputs": [
                {
                    "id": "#seave-import.cwl/SQLite.db",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    },
                    "doc": "The generate SQLite database file."
                }
            ],
            "outputs": [],
            "doc": "Seave server to import data into.",
            "label": "seave-import"
        },
        {
            "class": "CommandLineTool",
            "id": "#vep.cwl",
            "baseCommand": [],
            "inputs": [
                {
                    "id": "#vep.cwl/reference_assembly",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    },
                    "doc": "hs37d5"
                },
                {
                    "id": "#vep.cwl/vcfgz",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#vep.cwl/dbNSFP",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#vep.cwl/LOFTEE-plugin",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#vep.cwl/annotated_vcfgz",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#vep.cwl/annotation_report.html",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "vep"
        },
        {
            "class": "Workflow",
            "id": "#main",
            "label": "garvan-germline-main-v1",
            "requirements": [
                {
                    "class": "SubworkflowFeatureRequirement"
                },
                {
                    "class": "ScatterFeatureRequirement"
                }
            ],
            "inputs": [
                {
                    "id": "#main/reference_assembly",
                    "type": "File"
                },
                {
                    "id": "#main/Mills&1000G",
                    "type": "File"
                },
                {
                    "id": "#main/dbsnp_138",
                    "type": "File"
                },
                {
                    "id": "#main/1000G_phase1",
                    "type": "File"
                },
                {
                    "id": "#main/bcl2",
                    "type": "File"
                },
                {
                    "id": "#main/bcl1",
                    "type": "File"
                },
                {
                    "id": "#main/resource-hapmap",
                    "type": "File"
                },
                {
                    "id": "#main/resource-omni",
                    "type": "File"
                }
            ],
            "outputs": [
                {
                    "id": "#main/samplesheet.csv",
                    "outputSource": [
                        "#main/read_alignment/samplesheet.csv"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/read2.fastqc.gz",
                    "outputSource": [
                        "#main/read_alignment/read2.fastqc.gz"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/read1.fastqc.gz",
                    "outputSource": [
                        "#main/read_alignment/read1.fastqc.gz"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/fastqc_report_reverse",
                    "outputSource": [
                        "#main/read_alignment/fastqc_report_reverse"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/fastqc_report_forward",
                    "outputSource": [
                        "#main/read_alignment/fastqc_report_forward"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/annotation_report.html",
                    "outputSource": [
                        "#main/post_variant_processing/annotation_report.html"
                    ],
                    "type": "File"
                }
            ],
            "steps": [
                {
                    "id": "#main/post_alignment_processing",
                    "in": [
                        {
                            "id": "#main/post_alignment_processing/bam",
                            "source": [
                                "#main/read_alignment/ref_aligned_bam"
                            ]
                        },
                        {
                            "id": "#main/post_alignment_processing/Mills&1000G",
                            "source": [
                                "#main/Mills&1000G"
                            ]
                        },
                        {
                            "id": "#main/post_alignment_processing/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/post_alignment_processing/dbsnp_138",
                            "source": [
                                "#main/dbsnp_138"
                            ]
                        },
                        {
                            "id": "#main/post_alignment_processing/1000G_phase1",
                            "source": [
                                "#main/1000G_phase1"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/post_alignment_processing/recalibrated_bam"
                        }
                    ],
                    "run": "#post_alignment_processing.cwl",
                    "label": "post-alignment-processing"
                },
                {
                    "id": "#main/read_alignment",
                    "in": [
                        {
                            "id": "#main/read_alignment/bcl2",
                            "source": [
                                "#main/bcl2"
                            ]
                        },
                        {
                            "id": "#main/read_alignment/bcl1",
                            "source": [
                                "#main/bcl1"
                            ]
                        },
                        {
                            "id": "#main/read_alignment/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/read_alignment/samplesheet.csv"
                        },
                        {
                            "id": "#main/read_alignment/ref_aligned_bam"
                        },
                        {
                            "id": "#main/read_alignment/read2.fastqc.gz"
                        },
                        {
                            "id": "#main/read_alignment/read1.fastqc.gz"
                        },
                        {
                            "id": "#main/read_alignment/fastqc_report_reverse"
                        },
                        {
                            "id": "#main/read_alignment/fastqc_report_forward"
                        }
                    ],
                    "run": "#read_alignment.cwl",
                    "label": "read-alignment"
                },
                {
                    "id": "#main/variant_calling",
                    "in": [
                        {
                            "id": "#main/variant_calling/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/variant_calling/resource-omni",
                            "source": [
                                "#main/resource-omni"
                            ]
                        },
                        {
                            "id": "#main/variant_calling/resource-hapmap",
                            "source": [
                                "#main/resource-hapmap"
                            ]
                        },
                        {
                            "id": "#main/variant_calling/resource-dbsnp",
                            "source": [
                                "#main/dbsnp_138"
                            ]
                        },
                        {
                            "id": "#main/variant_calling/resource-1000G",
                            "source": [
                                "#main/1000G_phase1"
                            ]
                        },
                        {
                            "id": "#main/variant_calling/bam",
                            "source": [
                                "#main/post_alignment_processing/recalibrated_bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/variant_calling/combined.vcf"
                        }
                    ],
                    "run": "#variant_calling.cwl",
                    "label": "variant_calling"
                },
                {
                    "id": "#main/post_variant_processing",
                    "in": [
                        {
                            "id": "#main/post_variant_processing/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/post_variant_processing/vcfgz",
                            "source": [
                                "#main/variant_calling/combined.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/post_variant_processing/SQLite.db"
                        },
                        {
                            "id": "#main/post_variant_processing/annotation_report.html"
                        }
                    ],
                    "run": "#post_variant_processing.cwl",
                    "label": "post_variant_processing"
                },
                {
                    "id": "#main/seave_import_cwl",
                    "in": [
                        {
                            "id": "#main/seave_import_cwl/SQLite.db",
                            "source": [
                                "#main/post_variant_processing/SQLite.db"
                            ]
                        }
                    ],
                    "out": [],
                    "run": "#seave-import.cwl",
                    "label": "seave-import"
                }
            ]
        },
        {
            "class": "Workflow",
            "id": "#post_alignment_processing.cwl",
            "label": "post-alignment-processing",
            "inputs": [
                {
                    "id": "#post_alignment_processing.cwl/bam",
                    "type": "File"
                },
                {
                    "id": "#post_alignment_processing.cwl/Mills&1000G",
                    "type": "File"
                },
                {
                    "id": "#post_alignment_processing.cwl/reference_assembly",
                    "type": "File"
                },
                {
                    "id": "#post_alignment_processing.cwl/dbsnp_138",
                    "type": "File"
                },
                {
                    "id": "#post_alignment_processing.cwl/1000G_phase1",
                    "type": "File"
                }
            ],
            "outputs": [
                {
                    "id": "#post_alignment_processing.cwl/recalibrated_bam",
                    "outputSource": [
                        "#post_alignment_processing.cwl/gatk_print_reads/recalibrated_bam"
                    ],
                    "type": "File"
                }
            ],
            "steps": [
                {
                    "id": "#post_alignment_processing.cwl/novosort_merge_cwl",
                    "in": [
                        {
                            "id": "#post_alignment_processing.cwl/novosort_merge_cwl/bam",
                            "source": [
                                "#post_alignment_processing.cwl/bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_alignment_processing.cwl/novosort_merge_cwl/merged.bam"
                        }
                    ],
                    "run": "#novosort-merge.cwl",
                    "label": "novosort-merge"
                },
                {
                    "id": "#post_alignment_processing.cwl/novosort_cwl",
                    "in": [
                        {
                            "id": "#post_alignment_processing.cwl/novosort_cwl/input",
                            "source": [
                                "#post_alignment_processing.cwl/novosort_merge_cwl/merged.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_alignment_processing.cwl/novosort_cwl/dedup.bam"
                        }
                    ],
                    "run": "#novosort-dedup.cwl",
                    "label": "Novosort-dedup"
                },
                {
                    "id": "#post_alignment_processing.cwl/novosort_sort",
                    "in": [
                        {
                            "id": "#post_alignment_processing.cwl/novosort_sort/bam",
                            "source": [
                                "#post_alignment_processing.cwl/novosort_cwl/dedup.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_alignment_processing.cwl/novosort_sort/sorted.bam"
                        }
                    ],
                    "run": "#novosort-sort.cwl",
                    "label": "novosort-sort"
                },
                {
                    "id": "#post_alignment_processing.cwl/gatk_realigner_target_creator",
                    "in": [
                        {
                            "id": "#post_alignment_processing.cwl/gatk_realigner_target_creator/bam",
                            "source": [
                                "#post_alignment_processing.cwl/novosort_sort/sorted.bam"
                            ]
                        },
                        {
                            "id": "#post_alignment_processing.cwl/gatk_realigner_target_creator/reference_assembly",
                            "source": [
                                "#post_alignment_processing.cwl/reference_assembly"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_alignment_processing.cwl/gatk_realigner_target_creator/realigned_intervals"
                        }
                    ],
                    "run": "#gatk_realignerTargetCreator.cwl"
                },
                {
                    "id": "#post_alignment_processing.cwl/gatk_indel_realigner",
                    "in": [
                        {
                            "id": "#post_alignment_processing.cwl/gatk_indel_realigner/bam",
                            "source": [
                                "#post_alignment_processing.cwl/novosort_sort/sorted.bam"
                            ]
                        },
                        {
                            "id": "#post_alignment_processing.cwl/gatk_indel_realigner/interval_list",
                            "source": [
                                "#post_alignment_processing.cwl/gatk_realigner_target_creator/realigned_intervals"
                            ]
                        },
                        {
                            "id": "#post_alignment_processing.cwl/gatk_indel_realigner/reference_assembly",
                            "source": [
                                "#post_alignment_processing.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#post_alignment_processing.cwl/gatk_indel_realigner/Mills&1000G",
                            "source": [
                                "#post_alignment_processing.cwl/Mills&1000G"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_alignment_processing.cwl/gatk_indel_realigner/deduped_realigned_bam"
                        }
                    ],
                    "run": "#gatk_indelRealigner.cwl"
                },
                {
                    "id": "#post_alignment_processing.cwl/gatk_print_reads",
                    "in": [
                        {
                            "id": "#post_alignment_processing.cwl/gatk_print_reads/realigned_bam",
                            "source": [
                                "#post_alignment_processing.cwl/gatk_indel_realigner/deduped_realigned_bam"
                            ]
                        },
                        {
                            "id": "#post_alignment_processing.cwl/gatk_print_reads/recalibrated_table",
                            "source": [
                                "#post_alignment_processing.cwl/gatk_base_recalibrator/recalibrated_table"
                            ]
                        },
                        {
                            "id": "#post_alignment_processing.cwl/gatk_print_reads/reference_assembly",
                            "source": [
                                "#post_alignment_processing.cwl/reference_assembly"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_alignment_processing.cwl/gatk_print_reads/recalibrated_bam"
                        }
                    ],
                    "run": "#gatk_printReads.cwl"
                },
                {
                    "id": "#post_alignment_processing.cwl/gatk_base_recalibrator",
                    "in": [
                        {
                            "id": "#post_alignment_processing.cwl/gatk_base_recalibrator/deduped_realigned_bam",
                            "source": [
                                "#post_alignment_processing.cwl/gatk_indel_realigner/deduped_realigned_bam"
                            ]
                        },
                        {
                            "id": "#post_alignment_processing.cwl/gatk_base_recalibrator/reference_assembly",
                            "source": [
                                "#post_alignment_processing.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#post_alignment_processing.cwl/gatk_base_recalibrator/dbsnp_138",
                            "source": [
                                "#post_alignment_processing.cwl/dbsnp_138"
                            ]
                        },
                        {
                            "id": "#post_alignment_processing.cwl/gatk_base_recalibrator/Mills&1000G",
                            "source": [
                                "#post_alignment_processing.cwl/Mills&1000G"
                            ]
                        },
                        {
                            "id": "#post_alignment_processing.cwl/gatk_base_recalibrator/1000G_phase1",
                            "source": [
                                "#post_alignment_processing.cwl/1000G_phase1"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_alignment_processing.cwl/gatk_base_recalibrator/recalibrated_table"
                        }
                    ],
                    "run": "#gatk_baseRecalibrator.cwl"
                }
            ]
        },
        {
            "class": "Workflow",
            "id": "#post_variant_processing.cwl",
            "label": "post_variant_processing",
            "inputs": [
                {
                    "id": "#post_variant_processing.cwl/reference_assembly",
                    "type": "File"
                },
                {
                    "id": "#post_variant_processing.cwl/vcfgz",
                    "type": "File"
                }
            ],
            "outputs": [
                {
                    "id": "#post_variant_processing.cwl/SQLite.db",
                    "outputSource": [
                        "#post_variant_processing.cwl/gemini_cwl/SQLite.db"
                    ],
                    "type": "File"
                },
                {
                    "id": "#post_variant_processing.cwl/annotation_report.html",
                    "outputSource": [
                        "#post_variant_processing.cwl/vep_cwl/annotation_report.html"
                    ],
                    "type": "File"
                }
            ],
            "steps": [
                {
                    "id": "#post_variant_processing.cwl/gemini_cwl",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/gemini_cwl/annotated_vcfgz",
                            "source": [
                                "#post_variant_processing.cwl/vep_cwl/annotated_vcfgz"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/gemini_cwl/SQLite.db"
                        }
                    ],
                    "run": "#gemini.cwl",
                    "label": "gemini"
                },
                {
                    "id": "#post_variant_processing.cwl/vep_cwl",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/vep_cwl/reference_assembly",
                            "source": [
                                "#post_variant_processing.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/vep_cwl/vcfgz",
                            "source": [
                                "#post_variant_processing.cwl/vcfgz"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/vep_cwl/dbNSFP",
                            "source": [
                                "#post_variant_processing.cwl/dbnsfp/dbNSFP-db"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/vep_cwl/LOFTEE-plugin",
                            "source": [
                                "#post_variant_processing.cwl/loftee/LOFTEE-db"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/vep_cwl/annotated_vcfgz"
                        },
                        {
                            "id": "#post_variant_processing.cwl/vep_cwl/annotation_report.html"
                        }
                    ],
                    "run": "#vep.cwl",
                    "label": "vep"
                },
                {
                    "id": "#post_variant_processing.cwl/dbnsfp",
                    "in": [],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/dbnsfp/dbNSFP-db"
                        }
                    ],
                    "run": "#dbnsfp.cwl",
                    "label": "dbNSFP"
                },
                {
                    "id": "#post_variant_processing.cwl/loftee",
                    "in": [],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/loftee/LOFTEE-db"
                        }
                    ],
                    "run": "#loftee.cwl",
                    "label": "LOFTEE"
                }
            ]
        },
        {
            "class": "Workflow",
            "id": "#read_alignment.cwl",
            "label": "read-alignment",
            "inputs": [
                {
                    "id": "#read_alignment.cwl/bcl2",
                    "type": "File"
                },
                {
                    "id": "#read_alignment.cwl/bcl1",
                    "type": "File"
                },
                {
                    "id": "#read_alignment.cwl/reference_assembly",
                    "type": "File"
                }
            ],
            "outputs": [
                {
                    "id": "#read_alignment.cwl/samplesheet.csv",
                    "outputSource": [
                        "#read_alignment.cwl/bcl2fastq_cwl/samplesheet.csv"
                    ],
                    "type": "File"
                },
                {
                    "id": "#read_alignment.cwl/ref_aligned_bam",
                    "outputSource": [
                        "#read_alignment.cwl/bwa_mem/ref_aligned_bam"
                    ],
                    "type": "File"
                },
                {
                    "id": "#read_alignment.cwl/read2.fastqc.gz",
                    "outputSource": [
                        "#read_alignment.cwl/fastq_qc_cwl/read2.fastqc.gz"
                    ],
                    "type": "File"
                },
                {
                    "id": "#read_alignment.cwl/read1.fastqc.gz",
                    "outputSource": [
                        "#read_alignment.cwl/fastq_qc_cwl/read1.fastqc.gz"
                    ],
                    "type": "File"
                },
                {
                    "id": "#read_alignment.cwl/fastqc_report_reverse",
                    "outputSource": [
                        "#read_alignment.cwl/fastq_qc_cwl/fastqc_report_reverse"
                    ],
                    "type": "File"
                },
                {
                    "id": "#read_alignment.cwl/fastqc_report_forward",
                    "outputSource": [
                        "#read_alignment.cwl/fastq_qc_cwl/fastqc_report_forward"
                    ],
                    "type": "File"
                }
            ],
            "steps": [
                {
                    "id": "#read_alignment.cwl/bcl2fastq_cwl",
                    "in": [
                        {
                            "id": "#read_alignment.cwl/bcl2fastq_cwl/bcl1",
                            "source": [
                                "#read_alignment.cwl/bcl1"
                            ]
                        },
                        {
                            "id": "#read_alignment.cwl/bcl2fastq_cwl/bcl2",
                            "source": [
                                "#read_alignment.cwl/bcl2"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#read_alignment.cwl/bcl2fastq_cwl/fastq1.gz"
                        },
                        {
                            "id": "#read_alignment.cwl/bcl2fastq_cwl/fastq2,gz"
                        },
                        {
                            "id": "#read_alignment.cwl/bcl2fastq_cwl/samplesheet.csv"
                        }
                    ],
                    "run": "#bcl2fastq.cwl",
                    "label": "bcl2fastq"
                },
                {
                    "id": "#read_alignment.cwl/fastq_qc_cwl",
                    "in": [
                        {
                            "id": "#read_alignment.cwl/fastq_qc_cwl/forward_reads",
                            "source": [
                                "#read_alignment.cwl/bcl2fastq_cwl/fastq1.gz"
                            ]
                        },
                        {
                            "id": "#read_alignment.cwl/fastq_qc_cwl/reverse_reads",
                            "source": [
                                "#read_alignment.cwl/bcl2fastq_cwl/fastq2,gz"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#read_alignment.cwl/fastq_qc_cwl/fastqc_report_forward"
                        },
                        {
                            "id": "#read_alignment.cwl/fastq_qc_cwl/fastqc_report_reverse"
                        },
                        {
                            "id": "#read_alignment.cwl/fastq_qc_cwl/read1.fastqc.gz"
                        },
                        {
                            "id": "#read_alignment.cwl/fastq_qc_cwl/read2.fastqc.gz"
                        }
                    ],
                    "run": "#fastq-qc.cwl"
                },
                {
                    "id": "#read_alignment.cwl/bwa_mem",
                    "in": [
                        {
                            "id": "#read_alignment.cwl/bwa_mem/forward_reads.gz",
                            "source": [
                                "#read_alignment.cwl/bcl2fastq_cwl/fastq1.gz"
                            ]
                        },
                        {
                            "id": "#read_alignment.cwl/bwa_mem/reference_assembly",
                            "source": [
                                "#read_alignment.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#read_alignment.cwl/bwa_mem/reverse_reads.gz",
                            "source": [
                                "#read_alignment.cwl/bcl2fastq_cwl/fastq2,gz"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#read_alignment.cwl/bwa_mem/ref_aligned_bam"
                        }
                    ],
                    "run": "#bwa-mem.cwl",
                    "label": "bwa-mem"
                }
            ]
        },
        {
            "class": "Workflow",
            "id": "#variant_calling.cwl",
            "label": "variant_calling",
            "inputs": [
                {
                    "id": "#variant_calling.cwl/reference_assembly",
                    "type": "File"
                },
                {
                    "id": "#variant_calling.cwl/bam",
                    "type": "File"
                },
                {
                    "id": "#variant_calling.cwl/resource-omni",
                    "type": "File"
                },
                {
                    "id": "#variant_calling.cwl/resource-hapmap",
                    "type": "File"
                },
                {
                    "id": "#variant_calling.cwl/resource-dbsnp",
                    "type": "File"
                },
                {
                    "id": "#variant_calling.cwl/resource-1000G",
                    "type": "File"
                }
            ],
            "outputs": [
                {
                    "id": "#variant_calling.cwl/combined.vcf",
                    "outputSource": [
                        "#variant_calling.cwl/gatk_combinevariants_cwl/combined.vcf"
                    ],
                    "type": "File"
                }
            ],
            "steps": [
                {
                    "id": "#variant_calling.cwl/gatk_haplotypecaller_cwl",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/gatk_haplotypecaller_cwl/bam",
                            "source": [
                                "#variant_calling.cwl/bam"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_haplotypecaller_cwl/reference_assembly",
                            "source": [
                                "#variant_calling.cwl/reference_assembly"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/gatk_haplotypecaller_cwl/hap.vcf"
                        }
                    ],
                    "run": "#gatk_haplotypecaller.cwl",
                    "label": "gatk_haplotypecaller"
                },
                {
                    "id": "#variant_calling.cwl/gatk_genotype_g_v_c_fs",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/gatk_genotype_g_v_c_fs/raw_variants_g",
                            "source": [
                                "#variant_calling.cwl/gatk_haplotypecaller_cwl/hap.vcf"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_genotype_g_v_c_fs/reference_assembly",
                            "source": [
                                "#variant_calling.cwl/reference_assembly"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/gatk_genotype_g_v_c_fs/raw_variants_g_gvcf"
                        }
                    ],
                    "run": "#gatk_genotypeGVCFs.cwl",
                    "label": "genotype GVCF"
                },
                {
                    "id": "#variant_calling.cwl/gatk_select_indels",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/gatk_select_indels/raw_variants_g_gvcf",
                            "source": [
                                "#variant_calling.cwl/gatk_genotype_g_v_c_fs/raw_variants_g_gvcf"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_select_indels/reference_assembly",
                            "source": [
                                "#variant_calling.cwl/reference_assembly"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/gatk_select_indels/indel_g_gvcf"
                        }
                    ],
                    "run": "#gatk_select_indels.cwl",
                    "label": "select variants - indel"
                },
                {
                    "id": "#variant_calling.cwl/gatk_select_snvs",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/gatk_select_snvs/raw_variants_g_gvcf",
                            "source": [
                                "#variant_calling.cwl/gatk_genotype_g_v_c_fs/raw_variants_g_gvcf"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_select_snvs/reference_assembly",
                            "source": [
                                "#variant_calling.cwl/reference_assembly"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/gatk_select_snvs/snv_g_gvcf"
                        }
                    ],
                    "run": "#gatk_select_snvs.cwl",
                    "label": "select variants - snvs"
                },
                {
                    "id": "#variant_calling.cwl/gatk_applyrecalibration_cwl_indel",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/gatk_applyrecalibration_cwl_indel/reference_assembly",
                            "source": [
                                "#variant_calling.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_applyrecalibration_cwl_indel/vcf",
                            "source": [
                                "#variant_calling.cwl/gatk_variantrecalibrator_cwl_indel/vcfgz"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/gatk_applyrecalibration_cwl_indel/recal.vcf"
                        }
                    ],
                    "run": "#gatk_applyrecalibration.cwl"
                },
                {
                    "id": "#variant_calling.cwl/gatk_applyrecalibration_cwl_1",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/gatk_applyrecalibration_cwl_1/reference_assembly",
                            "source": [
                                "#variant_calling.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_applyrecalibration_cwl_1/vcf",
                            "source": [
                                "#variant_calling.cwl/gatk_variantrecalibrator_cwl_snp/vcfgz"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/gatk_applyrecalibration_cwl_1/recal.vcf"
                        }
                    ],
                    "run": "#gatk_applyrecalibration.cwl"
                },
                {
                    "id": "#variant_calling.cwl/gatk_combinevariants_cwl",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/gatk_combinevariants_cwl/indel.vcf",
                            "source": [
                                "#variant_calling.cwl/gatk_applyrecalibration_cwl_indel/recal.vcf"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_combinevariants_cwl/snv.vcf",
                            "source": [
                                "#variant_calling.cwl/gatk_applyrecalibration_cwl_1/recal.vcf"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_combinevariants_cwl/reference_assembly",
                            "source": [
                                "#variant_calling.cwl/reference_assembly"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/gatk_combinevariants_cwl/combined.vcf"
                        }
                    ],
                    "run": "#gatk_combinevariants.cwl",
                    "label": "gatk_combineVariants"
                },
                {
                    "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl_indel",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl_indel/vcf",
                            "source": [
                                "#variant_calling.cwl/gatk_select_indels/indel_g_gvcf"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl_indel/reference_assembly",
                            "source": [
                                "#variant_calling.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl_indel/resource-hapmap",
                            "source": [
                                "#variant_calling.cwl/resource-hapmap"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl_indel/resource-omni",
                            "source": [
                                "#variant_calling.cwl/resource-omni"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl_indel/resource-1000G",
                            "source": [
                                "#variant_calling.cwl/resource-1000G"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl_indel/resource-dbsnp",
                            "source": [
                                "#variant_calling.cwl/resource-dbsnp"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl_indel/vcfgz"
                        }
                    ],
                    "run": "#gatk_variantrecalibrator-indel.cwl",
                    "label": "gatk_variantRecalibrator-indel"
                },
                {
                    "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl_snp",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl_snp/vcf",
                            "source": [
                                "#variant_calling.cwl/gatk_select_snvs/snv_g_gvcf"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl_snp/reference_assembly",
                            "source": [
                                "#variant_calling.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl_snp/resource-hapmap",
                            "source": [
                                "#variant_calling.cwl/resource-hapmap"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl_snp/resource-omni",
                            "source": [
                                "#variant_calling.cwl/resource-omni"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl_snp/resource-1000G",
                            "source": [
                                "#variant_calling.cwl/resource-1000G"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl_snp/resource-dbsnp",
                            "source": [
                                "#variant_calling.cwl/resource-dbsnp"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl_snp/vcfgz"
                        }
                    ],
                    "run": "#gatk_variantrecalibrator-snp.cwl",
                    "label": "gatk_variantRecalibrator-snp"
                }
            ]
        }
    ],
    "cwlVersion": "v1.0"
}