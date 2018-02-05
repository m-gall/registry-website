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
                    "id": "#bcl2fastq.cwl/fastq2.gz",
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
                    "id": "#bwa-mem.cwl/read1_reads.gz",
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
                    "doc": "human_g1k_v37_decoy",
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
                    "id": "#bwa-mem.cwl/read2_reads.gz",
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
            "label": "bwa-mem",
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
                },
                {
                    "id": "#cutadapt.cwl/5_adaptors.fasta",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#cutadapt.cwl/3_adaptors.fasta",
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
            "id": "#exec_summary_report.cwl",
            "baseCommand": [
                "sample_exec_summary.py"
            ],
            "inputs": [
                {
                    "id": "#exec_summary_report.cwl/recal.bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#exec_summary_report.cwl/combined.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#exec_summary_report.cwl/goi.list",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#exec_summary_report.cwl/vendor.manifest",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#exec_summary_report.cwl/sample_sheet.csv",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#exec_summary_report.cwl/homo_count",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#exec_summary_report.cwl/hetero_count",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#exec_summary_report.cwl/bam",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "exec_summary_report"
        },
        {
            "class": "CommandLineTool",
            "id": "#fastq-qc.cwl",
            "baseCommand": [
                "fastqqc"
            ],
            "inputs": [
                {
                    "id": "#fastq-qc.cwl/read1_reads",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#fastq-qc.cwl/read2_reads",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#fastq-qc.cwl/fastqc_report_read1",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#fastq-qc.cwl/fastqc_report_read2",
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
                    },
                    "doc": "human_g1k_v37_decoy"
                },
                {
                    "id": "#gatk_applyrecalibration.cwl/raw_snps_indels.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_applyrecalibration.cwl/recalFile",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_applyrecalibration.cwl/tranchesFile",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#gatk_applyrecalibration.cwl/split.vcf",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "gatk_applyRecalibration"
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
            "baseCommand": [
                "GenomeAnalysisTK.jar",
                "-T",
                "GenotypeGVCFs"
            ],
            "inputs": [
                {
                    "default": "",
                    "format": "http://edamontology.org/format_3016",
                    "id": "#gatk_genotypeGVCFs.cwl/dbsnp_138",
                    "type": "File",
                    "inputBinding": {
                        "position": 0,
                        "prefix": "--dbsnp",
                        "valueFrom": "/ref/known_snp_sites"
                    },
                    "doc": "dbsnp sites"
                },
                {
                    "format": "http://edamontology.org/format_3016",
                    "id": "#gatk_genotypeGVCFs.cwl/raw_variants_g.vcf",
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
                    "doc": "human_g1k_v37_decoy",
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
                    "id": "#gatk_genotypeGVCFs.cwl/target_sites",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    },
                    "doc": "160609_HG19_MedExome_hg19_empirical_targets_union_padded.bed"
                },
                {
                    "id": "#gatk_genotypeGVCFs.cwl/gold_variants_g.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
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
                    "prefix": "-ip",
                    "valueFrom": "100"
                },
                {
                    "position": 0,
                    "prefix": "-nt",
                    "valueFrom": "4"
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
                    "id": "#gatk_haplotypecaller.cwl/target_sites",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    },
                    "doc": "160609_HG19_MedExome_hg19_empirical_targets_union_padded"
                },
                {
                    "id": "#gatk_haplotypecaller.cwl/reference_assembly",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    },
                    "doc": "human_g1k_v37_decoy.fasta"
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
                    "prefix": "--genotyping_mode",
                    "valueFrom": "DISCOVERY"
                },
                {
                    "position": 0,
                    "prefix": "-stand_emit_conf",
                    "valueFrom": "10"
                },
                {
                    "position": 0,
                    "prefix": "-stand_call_conf",
                    "valueFrom": "30"
                },
                {
                    "position": 0,
                    "prefix": "-ERC",
                    "valueFrom": "GVCF"
                },
                {
                    "position": 0,
                    "prefix": "-variant_index_type",
                    "valueFrom": "LINEAR"
                },
                {
                    "position": 0,
                    "prefix": "-variant_index_parameter",
                    "valueFrom": "128000"
                },
                {
                    "position": 0,
                    "prefix": "-bamWriterType",
                    "valueFrom": "CALLED_HAPLOTYPES"
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
            "label": "indel discovery for realignment.",
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
                    "id": "#gatk_selectVariants.cwl/vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0,
                        "valueFrom": "/vcf/raw_variants_g_gvcf"
                    }
                },
                {
                    "format": "http://edamontology.org/format_1929",
                    "id": "#gatk_selectVariants.cwl/reference_assembly",
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
                    "id": "#gatk_selectVariants.cwl/target_sites",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#gatk_selectVariants.cwl/final_list.vcf",
                    "type": "File",
                    "outputBinding": {},
                    "format": null
                }
            ],
            "label": "select variants",
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
            "id": "#gatk_selectVariants.cwl"
        },
        {
            "class": "CommandLineTool",
            "id": "#gatk_variantannotator.cwl",
            "baseCommand": [
                "java",
                "GenomeAnalysisTK.jar",
                "-T",
                "VariantAnnotator"
            ],
            "inputs": [
                {
                    "id": "#gatk_variantannotator.cwl/dbsnp_138.b37",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_variantannotator.cwl/combined.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_variantannotator.cwl/target_sites",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    },
                    "doc": "160609_HG19_MedExome_hg19_empirical_targets_union_padded"
                }
            ],
            "outputs": [
                {
                    "id": "#gatk_variantannotator.cwl/combined.dbsnp.vcf",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "gatk_variantAnnotator"
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
                    "id": "#gatk_variantrecalibrator-indel.cwl/recal_snps_raw_indels.vcf",
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
                    }
                },
                {
                    "id": "#gatk_variantrecalibrator-indel.cwl/resource_dbsnp",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_variantrecalibrator-indel.cwl/target_sites",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    },
                    "doc": "160609_HG19_MedExome_hg19_empirical_targets_union_padded.bed"
                },
                {
                    "id": "#gatk_variantrecalibrator-indel.cwl/resource_mills",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#gatk_variantrecalibrator-indel.cwl/recalFile",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#gatk_variantrecalibrator-indel.cwl/tranchesFile",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#gatk_variantrecalibrator-indel.cwl/rscriptFile",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "gatk_variantRecalibrator",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "",
                    "valueFrom": "-resource:dbsnp,known=true,training=false,truth=false,prior=2.0"
                },
                {
                    "position": 0,
                    "prefix": "-an",
                    "valueFrom": "MQ"
                },
                {
                    "position": 0,
                    "prefix": "-an",
                    "valueFrom": "QD"
                },
                {
                    "position": 0,
                    "prefix": "-an",
                    "valueFrom": "FQ"
                },
                {
                    "position": 0,
                    "prefix": "-an",
                    "valueFrom": "MQRankSum"
                },
                {
                    "position": 0,
                    "prefix": "-an",
                    "valueFrom": "ReadPosRankSum"
                },
                {
                    "position": 0,
                    "prefix": "-mode",
                    "valueFrom": "INDEL"
                },
                {
                    "position": 0,
                    "prefix": "-tranche",
                    "valueFrom": "99.9"
                },
                {
                    "position": 0,
                    "prefix": "-tranche",
                    "valueFrom": "99.0"
                },
                {
                    "position": 0,
                    "prefix": "-tranche",
                    "valueFrom": "90.0"
                },
                {
                    "position": 0,
                    "prefix": "",
                    "valueFrom": "-resource:mills,known=true,training=true,truth=true,prior=12.0"
                },
                {
                    "position": 0,
                    "prefix": "--maxGaussians",
                    "valueFrom": "4"
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
                    "id": "#gatk_variantrecalibrator-snp.cwl/raw_combined.vcf",
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
                    }
                },
                {
                    "id": "#gatk_variantrecalibrator-snp.cwl/resource_hapmap",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_variantrecalibrator-snp.cwl/resource_omni",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_variantrecalibrator-snp.cwl/resource_1000G",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_variantrecalibrator-snp.cwl/resource_dbsnp",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_variantrecalibrator-snp.cwl/target_sites",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    },
                    "doc": "160609_HG19_MedExome_hg19_empirical_targets_union_padded.bed"
                }
            ],
            "outputs": [
                {
                    "id": "#gatk_variantrecalibrator-snp.cwl/recalFile",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#gatk_variantrecalibrator-snp.cwl/tranchesFile",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#gatk_variantrecalibrator-snp.cwl/rscriptFile",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "gatk_variantRecalibrator",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "",
                    "valueFrom": "-resource:hapmap,known=false,training=true,truth=true,prior=15.0"
                },
                {
                    "position": 0,
                    "prefix": "",
                    "valueFrom": "-resource:omni,known=false,training=true,truth=true,prior=12.0"
                },
                {
                    "position": 0,
                    "prefix": "",
                    "valueFrom": "-resource:1000G,known=false,training=true,truth=false,prior=10.0"
                },
                {
                    "position": 0,
                    "prefix": "",
                    "valueFrom": "-resource:dbsnp,known=true,training=false,truth=false,prior=2.0"
                },
                {
                    "position": 0,
                    "prefix": "-an",
                    "valueFrom": "MQ"
                },
                {
                    "position": 0,
                    "prefix": "-an",
                    "valueFrom": "QD"
                },
                {
                    "position": 0,
                    "prefix": "-an",
                    "valueFrom": "FQ"
                },
                {
                    "position": 0,
                    "prefix": "-an",
                    "valueFrom": "MQRankSum"
                },
                {
                    "position": 0,
                    "prefix": "-an",
                    "valueFrom": "ReadPosRankSum"
                },
                {
                    "position": 0,
                    "prefix": "-mode",
                    "valueFrom": "SNP"
                },
                {
                    "position": 0,
                    "prefix": "-tranche",
                    "valueFrom": "99.9"
                },
                {
                    "position": 0,
                    "prefix": "-tranche",
                    "valueFrom": "99.0"
                },
                {
                    "position": 0,
                    "prefix": "-tranche",
                    "valueFrom": "90.0"
                }
            ]
        },
        {
            "class": "CommandLineTool",
            "id": "#generate_report.cwl",
            "baseCommand": [
                "sample_exec_summary.py"
            ],
            "inputs": [
                {
                    "id": "#generate_report.cwl/hs_metrics",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#generate_report.cwl/insert_size_metrics",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#generate_report.cwl/bamSex",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#generate_report.cwl/vcfsex",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#generate_report.cwl/low_complexity_metrics",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#generate_report.cwl/executive_report",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "generate_report"
        },
        {
            "class": "CommandLineTool",
            "id": "#picard-collectInsertsizeMetrics.cwl",
            "baseCommand": [
                "java",
                "picard.jarCollectInsertSizeMetrics"
            ],
            "inputs": [
                {
                    "id": "#picard-collectInsertsizeMetrics.cwl/recal.bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#picard-collectInsertsizeMetrics.cwl/insert_size_metrics.txt",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#picard-collectInsertsizeMetrics.cwl/insert_size_metrics.pdf",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#picard-collectInsertsizeMetrics.cwl/histogram",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "collect_insertsize_metrics",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "MINIMUM_PCT",
                    "valueFrom": "=0.05"
                },
                {
                    "position": 0,
                    "prefix": "METRIC_ACCUMULATION_LEVEL",
                    "valueFrom": "=ALL_READS"
                },
                {
                    "position": 0,
                    "prefix": "ASSUME_SORTED",
                    "valueFrom": "=true"
                },
                {
                    "position": 0,
                    "prefix": "VALIDATION_STRINGENCY",
                    "valueFrom": "=STRICT"
                },
                {
                    "position": 0,
                    "prefix": "CREATE_INDEX",
                    "valueFrom": "=false"
                }
            ]
        },
        {
            "class": "CommandLineTool",
            "id": "#picard-collecthsmetrics.cwl",
            "baseCommand": [
                "java",
                "-jar",
                "picard.jar",
                "CollectHsMetrics"
            ],
            "inputs": [
                {
                    "id": "#picard-collecthsmetrics.cwl/recal.bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#picard-collecthsmetrics.cwl/bait_intervals",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    },
                    "doc": "picard_int_list_medical_exomes.txt"
                },
                {
                    "id": "#picard-collecthsmetrics.cwl/target_intervals",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    },
                    "doc": "picard_int_list_medical_exomes.txt"
                },
                {
                    "id": "#picard-collecthsmetrics.cwl/reference_assembly",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#picard-collecthsmetrics.cwl/HS_metrics.txt",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "picard-collectHsMetrics",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "METRIC_ACCUMULATION_LEVEL",
                    "valueFrom": "=ALL_READS"
                },
                {
                    "position": 0,
                    "prefix": "VERBOSITY",
                    "valueFrom": "=INFO"
                },
                {
                    "position": 0,
                    "prefix": "QUIET",
                    "valueFrom": "=false"
                },
                {
                    "position": 0,
                    "prefix": "VALIDATION_STRINGENCY",
                    "valueFrom": "STRICT"
                },
                {
                    "position": 0,
                    "prefix": "COMPRESSION_LEVEL",
                    "valueFrom": "5"
                },
                {
                    "position": 0,
                    "prefix": "CREATE_INDEX",
                    "valueFrom": "=false"
                }
            ]
        },
        {
            "class": "CommandLineTool",
            "id": "#pydef_bamsex.cwl",
            "doc": "calculates the ratio of x and y to infer sex. Use bam when sufficient coverage of x and y chromosomes",
            "baseCommand": [
                "sample_exec_summary.py",
                ">",
                "def",
                "bamsex()"
            ],
            "inputs": [
                {
                    "id": "#pydef_bamsex.cwl/recal.bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#pydef_bamsex.cwl/x.reads",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#pydef_bamsex.cwl/y.reads",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#pydef_bamsex.cwl/bamSex",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "pydef_bamsex"
        },
        {
            "class": "CommandLineTool",
            "id": "#pydef_lowcomplexity.cwl",
            "baseCommand": [],
            "inputs": [
                {
                    "id": "#pydef_lowcomplexity.cwl/goi.list",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#pydef_lowcomplexity.cwl/low_complexity.bed",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#pydef_lowcomplexity.cwl/low_complexity_metrics",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "pydef_lowComplexity"
        },
        {
            "class": "CommandLineTool",
            "id": "#pydef_vcfsex.cwl",
            "baseCommand": [
                "sample_exec_summary.py",
                ">",
                "def",
                "call_vcf_sex()"
            ],
            "inputs": [
                {
                    "id": "#pydef_vcfsex.cwl/count_chrX_hetero",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#pydef_vcfsex.cwl/count_chrX_homo",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#pydef_vcfsex.cwl/vcfsex",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "doc": "ratio of homozygote to heterzygote calls. chrx homo/hetero ratio",
            "label": "pydef_vcfsex"
        },
        {
            "class": "CommandLineTool",
            "id": "#samblaster.cwl",
            "baseCommand": [
                "samblaster"
            ],
            "inputs": [
                {
                    "id": "#samblaster.cwl/ref.aligned.sam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#samblaster.cwl/dedup.sam",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "samblaster"
        },
        {
            "class": "CommandLineTool",
            "id": "#samtools-idxstats.cwl",
            "baseCommand": [
                "samtools",
                "idxstats"
            ],
            "inputs": [
                {
                    "id": "#samtools-idxstats.cwl/recal.bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#samtools-idxstats.cwl/x.reads",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#samtools-idxstats.cwl/y.reads",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "samtools-idxstats"
        },
        {
            "class": "CommandLineTool",
            "id": "#samtools-view.cwl",
            "baseCommand": [
                "samtools",
                "view",
                "|"
            ],
            "inputs": [
                {
                    "id": "#samtools-view.cwl/sam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0,
                        "valueFrom": "/files/align/aligned.bam"
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#samtools-view.cwl/samblaster_out.bam",
                    "label": "tmp.align.sam",
                    "type": "File",
                    "outputBinding": {
                        "outputEval": "tool"
                    }
                }
            ],
            "label": "samtools-view",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "-S"
                },
                {
                    "position": 0,
                    "prefix": "-h"
                },
                {
                    "position": 0,
                    "prefix": "-b"
                }
            ]
        },
        {
            "class": "Workflow",
            "id": "#generate_quality_metrics.cwl",
            "label": "generate_quality_metrics",
            "inputs": [
                {
                    "id": "#generate_quality_metrics.cwl/recal.bam",
                    "type": "File"
                },
                {
                    "id": "#generate_quality_metrics.cwl/histogram",
                    "type": "File"
                },
                {
                    "id": "#generate_quality_metrics.cwl/target_intervals",
                    "type": "File"
                },
                {
                    "id": "#generate_quality_metrics.cwl/reference_assembly",
                    "type": "File"
                },
                {
                    "id": "#generate_quality_metrics.cwl/bait_intervals",
                    "type": "File"
                },
                {
                    "id": "#generate_quality_metrics.cwl/sample_sheet.csv",
                    "type": "File"
                },
                {
                    "id": "#generate_quality_metrics.cwl/goi.list",
                    "type": "File"
                },
                {
                    "id": "#generate_quality_metrics.cwl/low_complexity.bed",
                    "type": "File"
                },
                {
                    "id": "#generate_quality_metrics.cwl/vendor.manifest",
                    "type": "File"
                },
                {
                    "id": "#generate_quality_metrics.cwl/combined.vcf",
                    "type": "File"
                }
            ],
            "outputs": [
                {
                    "id": "#generate_quality_metrics.cwl/insert_size_metrics.pdf",
                    "outputSource": [
                        "#generate_quality_metrics.cwl/collect_insertsize_metrics_cwl/insert_size_metrics.pdf"
                    ],
                    "type": "File"
                },
                {
                    "id": "#generate_quality_metrics.cwl/executive_report",
                    "outputSource": [
                        "#generate_quality_metrics.cwl/generate_report_cwl_1/executive_report"
                    ],
                    "type": "File"
                },
                {
                    "id": "#generate_quality_metrics.cwl/histogram_1",
                    "outputSource": [
                        "#generate_quality_metrics.cwl/collect_insertsize_metrics_cwl/histogram"
                    ],
                    "type": "File"
                }
            ],
            "steps": [
                {
                    "id": "#generate_quality_metrics.cwl/pydef_bamsex_cwl",
                    "in": [
                        {
                            "id": "#generate_quality_metrics.cwl/pydef_bamsex_cwl/recal.bam",
                            "source": [
                                "#generate_quality_metrics.cwl/exec_summary_report_cwl/bam"
                            ]
                        },
                        {
                            "id": "#generate_quality_metrics.cwl/pydef_bamsex_cwl/x.reads",
                            "source": [
                                "#generate_quality_metrics.cwl/samtools_idxstats_cwl_1/x.reads"
                            ]
                        },
                        {
                            "id": "#generate_quality_metrics.cwl/pydef_bamsex_cwl/y.reads",
                            "source": [
                                "#generate_quality_metrics.cwl/samtools_idxstats_cwl_1/y.reads"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#generate_quality_metrics.cwl/pydef_bamsex_cwl/bamSex"
                        }
                    ],
                    "run": "#pydef_bamsex.cwl",
                    "label": "pydef_bamsex"
                },
                {
                    "id": "#generate_quality_metrics.cwl/pydef_lowcomplexity_cwl",
                    "in": [
                        {
                            "id": "#generate_quality_metrics.cwl/pydef_lowcomplexity_cwl/goi.list",
                            "source": [
                                "#generate_quality_metrics.cwl/goi.list"
                            ]
                        },
                        {
                            "id": "#generate_quality_metrics.cwl/pydef_lowcomplexity_cwl/low_complexity.bed",
                            "source": [
                                "#generate_quality_metrics.cwl/low_complexity.bed"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#generate_quality_metrics.cwl/pydef_lowcomplexity_cwl/low_complexity_metrics"
                        }
                    ],
                    "run": "#pydef_lowcomplexity.cwl",
                    "label": "pydef_lowComplexity"
                },
                {
                    "id": "#generate_quality_metrics.cwl/pydef_vcfsex_cwl",
                    "in": [
                        {
                            "id": "#generate_quality_metrics.cwl/pydef_vcfsex_cwl/count_chrX_hetero",
                            "source": [
                                "#generate_quality_metrics.cwl/exec_summary_report_cwl/hetero_count"
                            ]
                        },
                        {
                            "id": "#generate_quality_metrics.cwl/pydef_vcfsex_cwl/count_chrX_homo",
                            "source": [
                                "#generate_quality_metrics.cwl/exec_summary_report_cwl/homo_count"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#generate_quality_metrics.cwl/pydef_vcfsex_cwl/vcfsex"
                        }
                    ],
                    "run": "#pydef_vcfsex.cwl",
                    "label": "pydef_vcfsex"
                },
                {
                    "id": "#generate_quality_metrics.cwl/collect_insertsize_metrics_cwl",
                    "in": [
                        {
                            "id": "#generate_quality_metrics.cwl/collect_insertsize_metrics_cwl/recal.bam",
                            "source": [
                                "#generate_quality_metrics.cwl/recal.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#generate_quality_metrics.cwl/collect_insertsize_metrics_cwl/insert_size_metrics.txt"
                        },
                        {
                            "id": "#generate_quality_metrics.cwl/collect_insertsize_metrics_cwl/insert_size_metrics.pdf"
                        },
                        {
                            "id": "#generate_quality_metrics.cwl/collect_insertsize_metrics_cwl/histogram"
                        }
                    ],
                    "run": "#picard-collectInsertsizeMetrics.cwl",
                    "label": "collect_insertsize_metrics"
                },
                {
                    "id": "#generate_quality_metrics.cwl/picard_collecthsmetrics_cwl",
                    "in": [
                        {
                            "id": "#generate_quality_metrics.cwl/picard_collecthsmetrics_cwl/recal.bam",
                            "source": [
                                "#generate_quality_metrics.cwl/recal.bam"
                            ]
                        },
                        {
                            "id": "#generate_quality_metrics.cwl/picard_collecthsmetrics_cwl/bait_intervals",
                            "source": [
                                "#generate_quality_metrics.cwl/bait_intervals"
                            ]
                        },
                        {
                            "id": "#generate_quality_metrics.cwl/picard_collecthsmetrics_cwl/target_intervals",
                            "source": [
                                "#generate_quality_metrics.cwl/target_intervals"
                            ]
                        },
                        {
                            "id": "#generate_quality_metrics.cwl/picard_collecthsmetrics_cwl/reference_assembly",
                            "source": [
                                "#generate_quality_metrics.cwl/reference_assembly"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#generate_quality_metrics.cwl/picard_collecthsmetrics_cwl/HS_metrics.txt"
                        }
                    ],
                    "run": "#picard-collecthsmetrics.cwl",
                    "label": "picard-collectHsMetrics"
                },
                {
                    "id": "#generate_quality_metrics.cwl/exec_summary_report_cwl",
                    "in": [
                        {
                            "id": "#generate_quality_metrics.cwl/exec_summary_report_cwl/recal.bam",
                            "source": [
                                "#generate_quality_metrics.cwl/recal.bam"
                            ]
                        },
                        {
                            "id": "#generate_quality_metrics.cwl/exec_summary_report_cwl/combined.vcf",
                            "source": [
                                "#generate_quality_metrics.cwl/combined.vcf"
                            ]
                        },
                        {
                            "id": "#generate_quality_metrics.cwl/exec_summary_report_cwl/goi.list",
                            "source": [
                                "#generate_quality_metrics.cwl/goi.list"
                            ]
                        },
                        {
                            "id": "#generate_quality_metrics.cwl/exec_summary_report_cwl/vendor.manifest",
                            "source": [
                                "#generate_quality_metrics.cwl/vendor.manifest"
                            ]
                        },
                        {
                            "id": "#generate_quality_metrics.cwl/exec_summary_report_cwl/sample_sheet.csv",
                            "source": [
                                "#generate_quality_metrics.cwl/sample_sheet.csv"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#generate_quality_metrics.cwl/exec_summary_report_cwl/homo_count"
                        },
                        {
                            "id": "#generate_quality_metrics.cwl/exec_summary_report_cwl/hetero_count"
                        },
                        {
                            "id": "#generate_quality_metrics.cwl/exec_summary_report_cwl/bam"
                        }
                    ],
                    "run": "#exec_summary_report.cwl",
                    "label": "exec_summary_report"
                },
                {
                    "id": "#generate_quality_metrics.cwl/generate_report_cwl_1",
                    "in": [
                        {
                            "id": "#generate_quality_metrics.cwl/generate_report_cwl_1/hs_metrics",
                            "source": [
                                "#generate_quality_metrics.cwl/picard_collecthsmetrics_cwl/HS_metrics.txt"
                            ]
                        },
                        {
                            "id": "#generate_quality_metrics.cwl/generate_report_cwl_1/insert_size_metrics",
                            "source": [
                                "#generate_quality_metrics.cwl/collect_insertsize_metrics_cwl/insert_size_metrics.txt"
                            ]
                        },
                        {
                            "id": "#generate_quality_metrics.cwl/generate_report_cwl_1/bamSex",
                            "source": [
                                "#generate_quality_metrics.cwl/pydef_bamsex_cwl/bamSex"
                            ]
                        },
                        {
                            "id": "#generate_quality_metrics.cwl/generate_report_cwl_1/vcfsex",
                            "source": [
                                "#generate_quality_metrics.cwl/pydef_vcfsex_cwl/vcfsex"
                            ]
                        },
                        {
                            "id": "#generate_quality_metrics.cwl/generate_report_cwl_1/low_complexity_metrics",
                            "source": [
                                "#generate_quality_metrics.cwl/pydef_lowcomplexity_cwl/low_complexity_metrics"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#generate_quality_metrics.cwl/generate_report_cwl_1/executive_report"
                        }
                    ],
                    "run": "#generate_report.cwl",
                    "label": "generate_report"
                },
                {
                    "id": "#generate_quality_metrics.cwl/samtools_idxstats_cwl_1",
                    "in": [
                        {
                            "id": "#generate_quality_metrics.cwl/samtools_idxstats_cwl_1/recal.bam",
                            "source": [
                                "#generate_quality_metrics.cwl/exec_summary_report_cwl/bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#generate_quality_metrics.cwl/samtools_idxstats_cwl_1/x.reads"
                        },
                        {
                            "id": "#generate_quality_metrics.cwl/samtools_idxstats_cwl_1/y.reads"
                        }
                    ],
                    "run": "#samtools-idxstats.cwl",
                    "label": "samtools-idxstats"
                }
            ]
        },
        {
            "class": "Workflow",
            "id": "#post_alignment_processing.cwl",
            "label": "post-alignment-processing",
            "inputs": [
                {
                    "id": "#post_alignment_processing.cwl/reference_assembly",
                    "type": "File"
                },
                {
                    "id": "#post_alignment_processing.cwl/bam",
                    "type": "File"
                },
                {
                    "id": "#post_alignment_processing.cwl/dbsnp_138",
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
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_alignment_processing.cwl/gatk_base_recalibrator/recalibrated_table"
                        }
                    ],
                    "run": "#gatk_baseRecalibrator.cwl",
                    "label": "gatk_base_recalibrator"
                },
                {
                    "id": "#post_alignment_processing.cwl/gatk_realigner_target_creator",
                    "in": [
                        {
                            "id": "#post_alignment_processing.cwl/gatk_realigner_target_creator/bam",
                            "source": [
                                "#post_alignment_processing.cwl/bam"
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
                    "run": "#gatk_realignerTargetCreator.cwl",
                    "label": "gatk_realigner_target_creator"
                },
                {
                    "id": "#post_alignment_processing.cwl/gatk_indel_realigner",
                    "in": [
                        {
                            "id": "#post_alignment_processing.cwl/gatk_indel_realigner/bam",
                            "source": [
                                "#post_alignment_processing.cwl/bam"
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
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_alignment_processing.cwl/gatk_indel_realigner/deduped_realigned_bam"
                        }
                    ],
                    "run": "#gatk_indelRealigner.cwl",
                    "label": "gatk_indel_realigner"
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
                    "id": "#post_variant_processing.cwl/target_sites",
                    "type": "File"
                },
                {
                    "id": "#post_variant_processing.cwl/resource_mills",
                    "type": "File"
                },
                {
                    "id": "#post_variant_processing.cwl/resource_dbsnp",
                    "type": "File"
                },
                {
                    "id": "#post_variant_processing.cwl/resource_hapmap",
                    "type": "File"
                },
                {
                    "id": "#post_variant_processing.cwl/resource_1000G",
                    "type": "File"
                },
                {
                    "id": "#post_variant_processing.cwl/raw_combined.vcf",
                    "type": "File"
                },
                {
                    "id": "#post_variant_processing.cwl/resource_omni",
                    "type": "File"
                }
            ],
            "outputs": [
                {
                    "id": "#post_variant_processing.cwl/rscriptFile",
                    "outputSource": [
                        "#post_variant_processing.cwl/gatk_variantrecalibrator_cwl/rscriptFile"
                    ],
                    "type": "File"
                },
                {
                    "id": "#post_variant_processing.cwl/final_list.vcf",
                    "outputSource": [
                        "#post_variant_processing.cwl/gatk_select_variants/final_list.vcf"
                    ],
                    "type": "File"
                }
            ],
            "steps": [
                {
                    "id": "#post_variant_processing.cwl/gatk_applyrecalibration_cwl",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/gatk_applyrecalibration_cwl/reference_assembly",
                            "source": [
                                "#post_variant_processing.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/gatk_applyrecalibration_cwl/raw_snps_indels.vcf",
                            "source": [
                                "#post_variant_processing.cwl/gatk_applyrecalibration_cwl_1/split.vcf"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/gatk_applyrecalibration_cwl/recalFile",
                            "source": [
                                "#post_variant_processing.cwl/gatk_variantrecalibrator_cwl/recalFile"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/gatk_applyrecalibration_cwl/tranchesFile",
                            "source": [
                                "#post_variant_processing.cwl/gatk_variantrecalibrator_cwl/tranchesFile"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/gatk_applyrecalibration_cwl/split.vcf"
                        }
                    ],
                    "run": "#gatk_applyrecalibration.cwl",
                    "label": "gatk_applyRecalibration"
                },
                {
                    "id": "#post_variant_processing.cwl/gatk_variantrecalibrator_cwl",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/gatk_variantrecalibrator_cwl/recal_snps_raw_indels.vcf",
                            "source": [
                                "#post_variant_processing.cwl/gatk_applyrecalibration_cwl_1/split.vcf"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/gatk_variantrecalibrator_cwl/reference_assembly",
                            "source": [
                                "#post_variant_processing.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/gatk_variantrecalibrator_cwl/resource_dbsnp",
                            "source": [
                                "#post_variant_processing.cwl/resource_dbsnp"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/gatk_variantrecalibrator_cwl/target_sites",
                            "source": [
                                "#post_variant_processing.cwl/target_sites"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/gatk_variantrecalibrator_cwl/resource_mills",
                            "source": [
                                "#post_variant_processing.cwl/resource_mills"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/gatk_variantrecalibrator_cwl/recalFile"
                        },
                        {
                            "id": "#post_variant_processing.cwl/gatk_variantrecalibrator_cwl/tranchesFile"
                        },
                        {
                            "id": "#post_variant_processing.cwl/gatk_variantrecalibrator_cwl/rscriptFile"
                        }
                    ],
                    "run": "#gatk_variantrecalibrator-indel.cwl",
                    "label": "gatk_variantRecalibrator-indel"
                },
                {
                    "id": "#post_variant_processing.cwl/gatk_variantrecalibrator_cwl_1",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/gatk_variantrecalibrator_cwl_1/raw_combined.vcf",
                            "source": [
                                "#post_variant_processing.cwl/raw_combined.vcf"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/gatk_variantrecalibrator_cwl_1/reference_assembly",
                            "source": [
                                "#post_variant_processing.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/gatk_variantrecalibrator_cwl_1/resource_hapmap",
                            "source": [
                                "#post_variant_processing.cwl/resource_hapmap"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/gatk_variantrecalibrator_cwl_1/resource_omni",
                            "source": [
                                "#post_variant_processing.cwl/resource_omni"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/gatk_variantrecalibrator_cwl_1/resource_1000G",
                            "source": [
                                "#post_variant_processing.cwl/resource_1000G"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/gatk_variantrecalibrator_cwl_1/resource_dbsnp",
                            "source": [
                                "#post_variant_processing.cwl/resource_dbsnp"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/gatk_variantrecalibrator_cwl_1/target_sites",
                            "source": [
                                "#post_variant_processing.cwl/target_sites"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/gatk_variantrecalibrator_cwl_1/recalFile"
                        },
                        {
                            "id": "#post_variant_processing.cwl/gatk_variantrecalibrator_cwl_1/tranchesFile"
                        },
                        {
                            "id": "#post_variant_processing.cwl/gatk_variantrecalibrator_cwl_1/rscriptFile"
                        }
                    ],
                    "run": "#gatk_variantrecalibrator-snp.cwl",
                    "label": "gatk_variantRecalibrator-snp"
                },
                {
                    "id": "#post_variant_processing.cwl/gatk_variantannotator_cwl",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/gatk_variantannotator_cwl/dbsnp_138.b37",
                            "source": [
                                "#post_variant_processing.cwl/resource_dbsnp"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/gatk_variantannotator_cwl/combined.vcf",
                            "source": [
                                "#post_variant_processing.cwl/gatk_applyrecalibration_cwl/split.vcf"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/gatk_variantannotator_cwl/target_sites",
                            "source": [
                                "#post_variant_processing.cwl/target_sites"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/gatk_variantannotator_cwl/combined.dbsnp.vcf"
                        }
                    ],
                    "run": "#gatk_variantannotator.cwl",
                    "label": "gatk_variantAnnotator"
                },
                {
                    "id": "#post_variant_processing.cwl/gatk_applyrecalibration_cwl_1",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/gatk_applyrecalibration_cwl_1/reference_assembly",
                            "source": [
                                "#post_variant_processing.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/gatk_applyrecalibration_cwl_1/raw_snps_indels.vcf",
                            "source": [
                                "#post_variant_processing.cwl/raw_combined.vcf"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/gatk_applyrecalibration_cwl_1/recalFile",
                            "source": [
                                "#post_variant_processing.cwl/gatk_variantrecalibrator_cwl_1/recalFile"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/gatk_applyrecalibration_cwl_1/tranchesFile",
                            "source": [
                                "#post_variant_processing.cwl/gatk_variantrecalibrator_cwl_1/tranchesFile"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/gatk_applyrecalibration_cwl_1/split.vcf"
                        }
                    ],
                    "run": "#gatk_applyrecalibration.cwl",
                    "label": "gatk_applyRecalibration"
                },
                {
                    "id": "#post_variant_processing.cwl/gatk_select_variants",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/gatk_select_variants/vcf",
                            "source": [
                                "#post_variant_processing.cwl/gatk_variantannotator_cwl/combined.dbsnp.vcf"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/gatk_select_variants/reference_assembly",
                            "source": [
                                "#post_variant_processing.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/gatk_select_variants/target_sites",
                            "source": [
                                "#post_variant_processing.cwl/target_sites"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/gatk_select_variants/final_list.vcf"
                        }
                    ],
                    "run": "#gatk_selectVariants.cwl",
                    "label": "select variants"
                }
            ]
        },
        {
            "class": "Workflow",
            "id": "#read_alignment.cwl",
            "label": "read_alignment",
            "inputs": [
                {
                    "id": "#read_alignment.cwl/reference_assembly",
                    "type": "File"
                },
                {
                    "id": "#read_alignment.cwl/read2_reads.gz",
                    "type": "File"
                },
                {
                    "id": "#read_alignment.cwl/read1_reads.gz",
                    "type": "File"
                }
            ],
            "outputs": [
                {
                    "id": "#read_alignment.cwl/samblaster_out.bam",
                    "outputSource": [
                        "#read_alignment.cwl/samtools_view_cwl/samblaster_out.bam"
                    ],
                    "type": "File"
                }
            ],
            "steps": [
                {
                    "id": "#read_alignment.cwl/bwa_mem",
                    "in": [
                        {
                            "id": "#read_alignment.cwl/bwa_mem/read1_reads.gz",
                            "source": [
                                "#read_alignment.cwl/read1_reads.gz"
                            ]
                        },
                        {
                            "id": "#read_alignment.cwl/bwa_mem/reference_assembly",
                            "source": [
                                "#read_alignment.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#read_alignment.cwl/bwa_mem/read2_reads.gz",
                            "source": [
                                "#read_alignment.cwl/read2_reads.gz"
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
                },
                {
                    "id": "#read_alignment.cwl/samblaster_cwl",
                    "in": [
                        {
                            "id": "#read_alignment.cwl/samblaster_cwl/ref.aligned.sam",
                            "source": [
                                "#read_alignment.cwl/bwa_mem/ref_aligned_bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#read_alignment.cwl/samblaster_cwl/dedup.sam"
                        }
                    ],
                    "run": "#samblaster.cwl",
                    "label": "samblaster"
                },
                {
                    "id": "#read_alignment.cwl/samtools_view_cwl",
                    "in": [
                        {
                            "id": "#read_alignment.cwl/samtools_view_cwl/sam",
                            "source": [
                                "#read_alignment.cwl/samblaster_cwl/dedup.sam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#read_alignment.cwl/samtools_view_cwl/samblaster_out.bam"
                        }
                    ],
                    "run": "#samtools-view.cwl",
                    "label": "samtools-view"
                }
            ]
        },
        {
            "class": "Workflow",
            "id": "#read_quality_assessment.cwl",
            "label": "read_quality_assessment",
            "inputs": [
                {
                    "id": "#read_quality_assessment.cwl/bcl2",
                    "type": "File"
                },
                {
                    "id": "#read_quality_assessment.cwl/bcl1",
                    "type": "File"
                },
                {
                    "id": "#read_quality_assessment.cwl/5_adaptors.fasta",
                    "type": "File"
                },
                {
                    "id": "#read_quality_assessment.cwl/3_adaptors.fasta",
                    "type": "File"
                }
            ],
            "outputs": [
                {
                    "id": "#read_quality_assessment.cwl/fastqc_report_read1",
                    "outputSource": [
                        "#read_quality_assessment.cwl/fastq_qc_cwl/fastqc_report_read1"
                    ],
                    "type": "File"
                },
                {
                    "id": "#read_quality_assessment.cwl/fastqc_report_read2",
                    "outputSource": [
                        "#read_quality_assessment.cwl/fastq_qc_cwl/fastqc_report_read2"
                    ],
                    "type": "File"
                },
                {
                    "id": "#read_quality_assessment.cwl/samplesheet.csv",
                    "outputSource": [
                        "#read_quality_assessment.cwl/bcl2fastq_cwl/samplesheet.csv"
                    ],
                    "type": "File"
                },
                {
                    "id": "#read_quality_assessment.cwl/read2.clean.fastq.gz",
                    "outputSource": [
                        "#read_quality_assessment.cwl/cutadapt_cwl/read2.clean.fastq.gz"
                    ],
                    "type": "File"
                },
                {
                    "id": "#read_quality_assessment.cwl/read1.clean.fastq.gz",
                    "outputSource": [
                        "#read_quality_assessment.cwl/cutadapt_cwl/read1.clean.fastq.gz"
                    ],
                    "type": "File"
                }
            ],
            "steps": [
                {
                    "id": "#read_quality_assessment.cwl/fastq_qc_cwl",
                    "in": [
                        {
                            "id": "#read_quality_assessment.cwl/fastq_qc_cwl/read1_reads",
                            "source": [
                                "#read_quality_assessment.cwl/cutadapt_cwl/read1.clean.fastq.gz"
                            ]
                        },
                        {
                            "id": "#read_quality_assessment.cwl/fastq_qc_cwl/read2_reads",
                            "source": [
                                "#read_quality_assessment.cwl/cutadapt_cwl/read2.clean.fastq.gz"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#read_quality_assessment.cwl/fastq_qc_cwl/fastqc_report_read1"
                        },
                        {
                            "id": "#read_quality_assessment.cwl/fastq_qc_cwl/fastqc_report_read2"
                        }
                    ],
                    "run": "#fastq-qc.cwl"
                },
                {
                    "id": "#read_quality_assessment.cwl/bcl2fastq_cwl",
                    "in": [
                        {
                            "id": "#read_quality_assessment.cwl/bcl2fastq_cwl/bcl1",
                            "source": [
                                "#read_quality_assessment.cwl/bcl1"
                            ]
                        },
                        {
                            "id": "#read_quality_assessment.cwl/bcl2fastq_cwl/bcl2",
                            "source": [
                                "#read_quality_assessment.cwl/bcl2"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#read_quality_assessment.cwl/bcl2fastq_cwl/fastq1.gz"
                        },
                        {
                            "id": "#read_quality_assessment.cwl/bcl2fastq_cwl/fastq2.gz"
                        },
                        {
                            "id": "#read_quality_assessment.cwl/bcl2fastq_cwl/samplesheet.csv"
                        }
                    ],
                    "run": "#bcl2fastq.cwl",
                    "label": "bcl2fastq"
                },
                {
                    "id": "#read_quality_assessment.cwl/cutadapt_cwl",
                    "in": [
                        {
                            "id": "#read_quality_assessment.cwl/cutadapt_cwl/read1.fastq.gz",
                            "source": [
                                "#read_quality_assessment.cwl/bcl2fastq_cwl/fastq1.gz"
                            ]
                        },
                        {
                            "id": "#read_quality_assessment.cwl/cutadapt_cwl/read2.fastq.gz",
                            "source": [
                                "#read_quality_assessment.cwl/bcl2fastq_cwl/fastq2.gz"
                            ]
                        },
                        {
                            "id": "#read_quality_assessment.cwl/cutadapt_cwl/5_adaptors.fasta",
                            "source": [
                                "#read_quality_assessment.cwl/5_adaptors.fasta"
                            ]
                        },
                        {
                            "id": "#read_quality_assessment.cwl/cutadapt_cwl/3_adaptors.fasta",
                            "source": [
                                "#read_quality_assessment.cwl/3_adaptors.fasta"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#read_quality_assessment.cwl/cutadapt_cwl/read1.clean.fastq.gz"
                        },
                        {
                            "id": "#read_quality_assessment.cwl/cutadapt_cwl/read2.clean.fastq.gz"
                        }
                    ],
                    "run": "#cutadapt.cwl",
                    "label": "cutadapt"
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
            "label": "sap-exome-sub-workflows",
            "inputs": [
                {
                    "id": "#main/bcl2",
                    "type": "File"
                },
                {
                    "id": "#main/bcl1",
                    "type": "File"
                },
                {
                    "id": "#main/5_adaptors.fasta",
                    "type": "File"
                },
                {
                    "id": "#main/3_adaptors.fasta",
                    "type": "File"
                },
                {
                    "id": "#main/reference_assembly",
                    "type": "File"
                },
                {
                    "id": "#main/gold_variants_g.vcf",
                    "type": "File"
                },
                {
                    "id": "#main/dbsnp_138",
                    "type": "File",
                    "label": "dbsnp138"
                },
                {
                    "id": "#main/target_sites",
                    "type": "File"
                },
                {
                    "id": "#main/resource_mills",
                    "type": "File"
                },
                {
                    "id": "#main/resource_omni",
                    "type": "File"
                },
                {
                    "id": "#main/resource_hapmap",
                    "type": "File"
                },
                {
                    "id": "#main/resource_1000G",
                    "type": "File"
                },
                {
                    "id": "#main/low_complexity.bed",
                    "type": "File"
                },
                {
                    "id": "#main/histogram",
                    "type": "File"
                },
                {
                    "id": "#main/goi.list",
                    "type": "File"
                },
                {
                    "id": "#main/vendor.manifest",
                    "type": "File"
                },
                {
                    "id": "#main/target_intervals",
                    "type": "File"
                },
                {
                    "id": "#main/bait_intervals",
                    "type": "File"
                }
            ],
            "outputs": [
                {
                    "id": "#main/fastqc_report_read2",
                    "outputSource": [
                        "#main/read_quality_assessment_cwl/fastqc_report_read2"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/fastqc_report_read1",
                    "outputSource": [
                        "#main/read_quality_assessment_cwl/fastqc_report_read1"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/rscriptFile",
                    "outputSource": [
                        "#main/post_variant_processing_cwl/rscriptFile"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/insert_size_metrics.pdf",
                    "outputSource": [
                        "#main/generate_quality_metrics_cwl/insert_size_metrics.pdf"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/executive_report",
                    "outputSource": [
                        "#main/generate_quality_metrics_cwl/executive_report"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/histogram_1",
                    "outputSource": [
                        "#main/generate_quality_metrics_cwl/histogram_1"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/samplesheet.csv",
                    "outputSource": [
                        "#main/read_quality_assessment_cwl/samplesheet.csv"
                    ],
                    "type": "File"
                }
            ],
            "steps": [
                {
                    "id": "#main/read_alignment_cwl",
                    "in": [
                        {
                            "id": "#main/read_alignment_cwl/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/read_alignment_cwl/read2_reads.gz",
                            "source": [
                                "#main/read_quality_assessment_cwl/read2.clean.fastq.gz"
                            ]
                        },
                        {
                            "id": "#main/read_alignment_cwl/read1_reads.gz",
                            "source": [
                                "#main/read_quality_assessment_cwl/read1.clean.fastq.gz"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/read_alignment_cwl/samblaster_out.bam"
                        }
                    ],
                    "run": "#read_alignment.cwl",
                    "label": "read_alignment"
                },
                {
                    "id": "#main/read_quality_assessment_cwl",
                    "in": [
                        {
                            "id": "#main/read_quality_assessment_cwl/bcl2",
                            "source": [
                                "#main/bcl2"
                            ]
                        },
                        {
                            "id": "#main/read_quality_assessment_cwl/bcl1",
                            "source": [
                                "#main/bcl1"
                            ]
                        },
                        {
                            "id": "#main/read_quality_assessment_cwl/5_adaptors.fasta",
                            "source": [
                                "#main/5_adaptors.fasta"
                            ]
                        },
                        {
                            "id": "#main/read_quality_assessment_cwl/3_adaptors.fasta",
                            "source": [
                                "#main/3_adaptors.fasta"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/read_quality_assessment_cwl/fastqc_report_read1"
                        },
                        {
                            "id": "#main/read_quality_assessment_cwl/fastqc_report_read2"
                        },
                        {
                            "id": "#main/read_quality_assessment_cwl/samplesheet.csv"
                        },
                        {
                            "id": "#main/read_quality_assessment_cwl/read2.clean.fastq.gz"
                        },
                        {
                            "id": "#main/read_quality_assessment_cwl/read1.clean.fastq.gz"
                        }
                    ],
                    "run": "#read_quality_assessment.cwl",
                    "label": "read_quality_assessment"
                },
                {
                    "id": "#main/variant_calling_cwl",
                    "in": [
                        {
                            "id": "#main/variant_calling_cwl/target_sites",
                            "source": [
                                "#main/target_sites"
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
                                "#main/post_alignment_processing_cwl/recalibrated_bam"
                            ]
                        },
                        {
                            "id": "#main/variant_calling_cwl/gold_variants_g.vcf",
                            "source": [
                                "#main/gold_variants_g.vcf"
                            ]
                        },
                        {
                            "id": "#main/variant_calling_cwl/dbsnp_138",
                            "source": [
                                "#main/dbsnp_138"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/variant_calling_cwl/raw_variants_g_gvcf"
                        }
                    ],
                    "run": "#variant_calling.cwl",
                    "label": "variant_calling"
                },
                {
                    "id": "#main/post_alignment_processing_cwl",
                    "in": [
                        {
                            "id": "#main/post_alignment_processing_cwl/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/post_alignment_processing_cwl/bam",
                            "source": [
                                "#main/read_alignment_cwl/samblaster_out.bam"
                            ]
                        },
                        {
                            "id": "#main/post_alignment_processing_cwl/dbsnp_138",
                            "source": [
                                "#main/dbsnp_138"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/post_alignment_processing_cwl/recalibrated_bam"
                        }
                    ],
                    "run": "#post_alignment_processing.cwl",
                    "label": "post-alignment-processing"
                },
                {
                    "id": "#main/post_variant_processing_cwl",
                    "in": [
                        {
                            "id": "#main/post_variant_processing_cwl/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/post_variant_processing_cwl/target_sites",
                            "source": [
                                "#main/target_sites"
                            ]
                        },
                        {
                            "id": "#main/post_variant_processing_cwl/resource_mills",
                            "source": [
                                "#main/resource_mills"
                            ]
                        },
                        {
                            "id": "#main/post_variant_processing_cwl/resource_dbsnp",
                            "source": [
                                "#main/dbsnp_138"
                            ]
                        },
                        {
                            "id": "#main/post_variant_processing_cwl/resource_hapmap",
                            "source": [
                                "#main/resource_hapmap"
                            ]
                        },
                        {
                            "id": "#main/post_variant_processing_cwl/resource_1000G",
                            "source": [
                                "#main/resource_1000G"
                            ]
                        },
                        {
                            "id": "#main/post_variant_processing_cwl/raw_combined.vcf",
                            "source": [
                                "#main/variant_calling_cwl/raw_variants_g_gvcf"
                            ]
                        },
                        {
                            "id": "#main/post_variant_processing_cwl/resource_omni",
                            "source": [
                                "#main/resource_omni"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/post_variant_processing_cwl/rscriptFile"
                        },
                        {
                            "id": "#main/post_variant_processing_cwl/final_list.vcf"
                        }
                    ],
                    "run": "#post_variant_processing.cwl",
                    "label": "post_variant_processing"
                },
                {
                    "id": "#main/generate_quality_metrics_cwl",
                    "in": [
                        {
                            "id": "#main/generate_quality_metrics_cwl/recal.bam",
                            "source": [
                                "#main/post_alignment_processing_cwl/recalibrated_bam"
                            ]
                        },
                        {
                            "id": "#main/generate_quality_metrics_cwl/histogram",
                            "source": [
                                "#main/histogram"
                            ]
                        },
                        {
                            "id": "#main/generate_quality_metrics_cwl/target_intervals",
                            "source": [
                                "#main/target_intervals"
                            ]
                        },
                        {
                            "id": "#main/generate_quality_metrics_cwl/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/generate_quality_metrics_cwl/bait_intervals",
                            "source": [
                                "#main/bait_intervals"
                            ]
                        },
                        {
                            "id": "#main/generate_quality_metrics_cwl/sample_sheet.csv",
                            "source": [
                                "#main/read_quality_assessment_cwl/samplesheet.csv"
                            ]
                        },
                        {
                            "id": "#main/generate_quality_metrics_cwl/goi.list",
                            "source": [
                                "#main/goi.list"
                            ]
                        },
                        {
                            "id": "#main/generate_quality_metrics_cwl/low_complexity.bed",
                            "source": [
                                "#main/low_complexity.bed"
                            ]
                        },
                        {
                            "id": "#main/generate_quality_metrics_cwl/vendor.manifest",
                            "source": [
                                "#main/vendor.manifest"
                            ]
                        },
                        {
                            "id": "#main/generate_quality_metrics_cwl/combined.vcf",
                            "source": [
                                "#main/post_variant_processing_cwl/final_list.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/generate_quality_metrics_cwl/insert_size_metrics.pdf"
                        },
                        {
                            "id": "#main/generate_quality_metrics_cwl/executive_report"
                        },
                        {
                            "id": "#main/generate_quality_metrics_cwl/histogram_1"
                        }
                    ],
                    "run": "#generate_quality_metrics.cwl",
                    "label": "generate_quality_metrics"
                }
            ]
        },
        {
            "class": "Workflow",
            "id": "#variant_calling.cwl",
            "label": "variant_calling",
            "inputs": [
                {
                    "id": "#variant_calling.cwl/target_sites",
                    "type": "File"
                },
                {
                    "id": "#variant_calling.cwl/reference_assembly",
                    "type": "File"
                },
                {
                    "id": "#variant_calling.cwl/bam",
                    "type": "File"
                },
                {
                    "id": "#variant_calling.cwl/gold_variants_g.vcf",
                    "type": "File"
                },
                {
                    "id": "#variant_calling.cwl/dbsnp_138",
                    "type": "File"
                }
            ],
            "outputs": [
                {
                    "id": "#variant_calling.cwl/raw_variants_g_gvcf",
                    "outputSource": [
                        "#variant_calling.cwl/gatk_genotype_g_v_c_fs/raw_variants_g_gvcf"
                    ],
                    "type": "File"
                }
            ],
            "steps": [
                {
                    "id": "#variant_calling.cwl/gatk_genotype_g_v_c_fs",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/gatk_genotype_g_v_c_fs/dbsnp_138",
                            "source": [
                                "#variant_calling.cwl/dbsnp_138"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_genotype_g_v_c_fs/raw_variants_g.vcf",
                            "source": [
                                "#variant_calling.cwl/gatk_haplotypecaller_cwl/hap.vcf"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_genotype_g_v_c_fs/reference_assembly",
                            "source": [
                                "#variant_calling.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_genotype_g_v_c_fs/gold_variants_g.vcf",
                            "source": [
                                "#variant_calling.cwl/gold_variants_g.vcf"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_genotype_g_v_c_fs/target_sites",
                            "source": [
                                "#variant_calling.cwl/target_sites"
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
                    "id": "#variant_calling.cwl/gatk_haplotypecaller_cwl",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/gatk_haplotypecaller_cwl/bam",
                            "source": [
                                "#variant_calling.cwl/bam"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_haplotypecaller_cwl/target_sites",
                            "source": [
                                "#variant_calling.cwl/target_sites"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_haplotypecaller_cwl/reference_assembly",
                            "source": [
                                "#variant_calling.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_haplotypecaller_cwl/dbsnp_138",
                            "source": [
                                "#variant_calling.cwl/dbsnp_138"
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
                }
            ]
        }
    ],
    "cwlVersion": "v1.0"
}