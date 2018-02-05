"use strict";
 const input_workflow =
{
    "$graph": [
        {
            "class": "CommandLineTool",
            "id": "#annotate_dump.cwl",
            "baseCommand": [],
            "inputs": [
                {
                    "id": "#annotate_dump.cwl/table.rdata",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#annotate_dump.cwl/all.genotypes.txt",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#annotate_dump.cwl/maf.filtered.txt",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "annotate_dump"
        },
        {
            "class": "CommandLineTool",
            "id": "#annotate_seq_run.cwl",
            "baseCommand": [
                "annotate_seq_run",
                "script"
            ],
            "inputs": [
                {
                    "id": "#annotate_seq_run.cwl/snp.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#annotate_seq_run.cwl/indel.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#annotate_seq_run.cwl/output",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#annotate_seq_run.cwl/output_1",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "annotate_seq_run"
        },
        {
            "class": "CommandLineTool",
            "id": "#annovar.cwl",
            "baseCommand": [
                "annovar"
            ],
            "inputs": [
                {
                    "id": "#annovar.cwl/indel",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#annovar.cwl/snp",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#annovar.cwl/output",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "annovar"
        },
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
            "label": "bwa",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "-k",
                    "valueFrom": "?"
                },
                {
                    "position": 0,
                    "prefix": "-a",
                    "valueFrom": "?"
                },
                {
                    "position": 0,
                    "prefix": "-t",
                    "valueFrom": "?"
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
            "id": "#clinical_filter.cwl",
            "baseCommand": [],
            "inputs": [
                {
                    "id": "#clinical_filter.cwl/all.genotypes.txt",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#clinical_filter.cwl/somatic-variants.txt",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "clinical_filter"
        },
        {
            "class": "CommandLineTool",
            "id": "#compresssomatics.cwl",
            "baseCommand": [],
            "inputs": [
                {
                    "id": "#compresssomatics.cwl/somatic.txt",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#compresssomatics.cwl/somatic.txt.gz",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "CompressSomatics"
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
                    "format": "http://edamontology.org/format_3003",
                    "id": "#gatk_baseRecalibrator.cwl/target_sites",
                    "type": "File",
                    "inputBinding": {
                        "position": 0,
                        "valueFrom": "/ref/target_sites"
                    },
                    "doc": "bed file containing the coordinates for genes/regions to be targeted."
                },
                {
                    "id": "#gatk_baseRecalibrator.cwl/dbsnp_XXX",
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
                    "valueFrom": "=dbsnp_XXX"
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
            "id": "#gatk_haplotypecaller.cwl",
            "baseCommand": [
                "java",
                "GenomeAnalysisTK.jar",
                "-T",
                "HaplotypeCaller"
            ],
            "inputs": [
                {
                    "id": "#gatk_haplotypecaller.cwl/gvcf",
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
                    "id": "#gatk_haplotypecaller.cwl/dbsnp_XXX",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#gatk_haplotypecaller.cwl/hap,.vcf",
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
                    "id": "#gatk_indelRealigner.cwl/target_sites",
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
                },
                {
                    "id": "#gatk_printReads.cwl/recalibrated_table",
                    "type": "File",
                    "doc": "Coordinates for regions discovered requiring realignment."
                },
                {
                    "format": "http://edamontology.org/format_1929",
                    "id": "#gatk_printReads.cwl/reference_assembly",
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
                },
                {
                    "format": "edam:format_3003",
                    "id": "#gatk_printReads.cwl/target_sites",
                    "type": "File",
                    "doc": "bed file containing the coordinates for genes/regions to be targeted."
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
                    "prefix": "--BQSR"
                },
                {
                    "position": 0
                },
                {
                    "position": 0,
                    "prefix": "--downsampling_type",
                    "valueFrom": "none"
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
                    }
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
                    "id": "#gatk_realignerTargetCreator.cwl/target_sites",
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
                    "valueFrom": "=MIlls_and_1000G_gold_standard.indels"
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
            "id": "#gatk_unifiedgenotyper.cwl",
            "baseCommand": [
                "java",
                "GenomeAnalysisTK.jar",
                "-T",
                "UnifiedGenotyper"
            ],
            "inputs": [
                {
                    "id": "#gatk_unifiedgenotyper.cwl/reference_assembly",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_unifiedgenotyper.cwl/recal.bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_unifiedgenotyper.cwl/dbsnp",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_unifiedgenotyper.cwl/germline_cohort",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#gatk_unifiedgenotyper.cwl/snps.ug.gz",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "gatk_unifiedGenotyper"
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
                    "id": "#gatk_variantrecalibrator-indel.cwl/dbsnp",
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
                    "id": "#gatk_variantrecalibrator-indel.cwl/mills",
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
                    "id": "#gatk_variantrecalibrator-snp.cwl/snps.vcf",
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
                    "id": "#gatk_variantrecalibrator-snp.cwl/hapmap",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_variantrecalibrator-snp.cwl/omni",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_variantrecalibrator-snp.cwl/1000G",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_variantrecalibrator-snp.cwl/dbsnp",
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
            "baseCommand": [],
            "inputs": [
                {
                    "id": "#generate_report.cwl/indel_genetic.qc.txt",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#generate_report.cwl/snp_genetic.qc.txt",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#generate_report.cwl/snp_variant_eval.txt",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#generate_report.cwl/indel_variant_eval.txt",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#generate_report.cwl/indel_tstv.txt",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#generate_report.cwl/snp_tstv.txt",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#generate_report.cwl/somatic_variants.gz",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#generate_report.cwl/report",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "generate_report"
        },
        {
            "class": "CommandLineTool",
            "id": "#geneticqc.cwl",
            "baseCommand": [],
            "inputs": [
                {
                    "id": "#geneticqc.cwl/recal.vcf.gz",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#geneticqc.cwl/genetic.qc.txt",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "geneticqc"
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
                    "id": "#genotypeGVCFs.cwl/recal.bam",
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
                    "id": "#genotypeGVCFs.cwl/reference_assembly",
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
                    "id": "#genotypeGVCFs.cwl/germline_cohort",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#genotypeGVCFs.cwl/raw_variants_g_gvcf",
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
            "id": "#genotypeGVCFs.cwl"
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
                    "id": "#merge_alignments.cwl/sorted.bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    },
                    "doc": "Merge of bam files if multiple bams due to an individual being sequenced over several lanes."
                }
            ],
            "outputs": [
                {
                    "id": "#merge_alignments.cwl/aligned_merged_bam",
                    "doc": "Merged and sorted bam file.\n\nCheck secondary index requirements.",
                    "type": "File",
                    "outputBinding": {},
                    "format": "http://edamontology.org/format_2572"
                }
            ],
            "doc": "http://bio-bwa.sourceforge.net/bwa.shtml\n",
            "label": "merge bam files",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "ASSUME_SORTED",
                    "separate": false,
                    "valueFrom": "=true"
                },
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
                            "package": "picard--mergeSamFiles"
                        }
                    ]
                }
            ],
            "id": "#merge_alignments.cwl"
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
                    "doc": "Merged and sorted bam file.\n\nCheck secondary index requirements.",
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
            "id": "#samtools-view.cwl",
            "baseCommand": [
                "samtools",
                "view",
                "|"
            ],
            "inputs": [
                {
                    "id": "#samtools-view.cwl/view-sam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0,
                        "valueFrom": "/files/align/aligned.bam"
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#samtools-view.cwl/sam",
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
            "class": "CommandLineTool",
            "id": "#subset_vcf.cwl",
            "baseCommand": [],
            "inputs": [
                {
                    "id": "#subset_vcf.cwl/recal.gz",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#subset_vcf.cwl/chr.recal.vcf",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "subset_vcf"
        },
        {
            "class": "CommandLineTool",
            "id": "#ts_tv_ratio.cwl",
            "baseCommand": [],
            "inputs": [
                {
                    "id": "#ts_tv_ratio.cwl/recal.vcf.gz",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#ts_tv_ratio.cwl/ts_tv.txt",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "ts_tv_ratio"
        },
        {
            "class": "CommandLineTool",
            "id": "#variant_eval_bysample.cwl",
            "baseCommand": [],
            "inputs": [
                {
                    "id": "#variant_eval_bysample.cwl/recal.vcf.gz",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#variant_eval_bysample.cwl/variant_eval.txt",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "variant_eval_bysample"
        },
        {
            "class": "CommandLineTool",
            "id": "#vep_annotation.cwl",
            "baseCommand": [
                "vep_88"
            ],
            "inputs": [
                {
                    "id": "#vep_annotation.cwl/input",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#vep_annotation.cwl/vep_cache_88",
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
            "id": "#generate_quality_metrics.cwl",
            "label": "generate_quality_metrics",
            "inputs": [
                {
                    "id": "#generate_quality_metrics.cwl/recal.vcf.gz",
                    "type": "File",
                    "label": "indel.recal.vcf.gz"
                },
                {
                    "id": "#generate_quality_metrics.cwl/recal.vcf.gz_1",
                    "type": "File",
                    "label": "snp_recal.vcf.gz_1"
                }
            ],
            "outputs": [
                {
                    "id": "#generate_quality_metrics.cwl/indel.chr.recal.vcf",
                    "outputSource": [
                        "#generate_quality_metrics.cwl/subset_vcf_cwl/chr.recal.vcf"
                    ],
                    "type": "File"
                },
                {
                    "id": "#generate_quality_metrics.cwl/indel.genetic.qc.txt",
                    "outputSource": [
                        "#generate_quality_metrics.cwl/geneticqc_cwl/genetic.qc.txt"
                    ],
                    "type": "File"
                },
                {
                    "id": "#generate_quality_metrics.cwl/indel_variant_eval.txt",
                    "outputSource": [
                        "#generate_quality_metrics.cwl/variant_eval_bysample_cwl/variant_eval.txt"
                    ],
                    "type": "File"
                },
                {
                    "id": "#generate_quality_metrics.cwl/indel_ts_tv.txt",
                    "outputSource": [
                        "#generate_quality_metrics.cwl/ts_tv_ratio_cwl/ts_tv.txt"
                    ],
                    "type": "File",
                    "label": "indel_ts_tv.txt"
                },
                {
                    "id": "#generate_quality_metrics.cwl/snp_variant_eval.txt",
                    "outputSource": [
                        "#generate_quality_metrics.cwl/variant_eval_bysample_cwl_1/variant_eval.txt"
                    ],
                    "type": "File"
                },
                {
                    "id": "#generate_quality_metrics.cwl/snp_genetic.qc.txt",
                    "outputSource": [
                        "#generate_quality_metrics.cwl/geneticqc_cwl_1/genetic.qc.txt"
                    ],
                    "type": "File"
                },
                {
                    "id": "#generate_quality_metrics.cwl/snp_ts_tv.txt",
                    "outputSource": [
                        "#generate_quality_metrics.cwl/ts_tv_ratio_cwl_1/ts_tv.txt"
                    ],
                    "type": "File"
                },
                {
                    "id": "#generate_quality_metrics.cwl/snp_chr.recal.vcf",
                    "outputSource": [
                        "#generate_quality_metrics.cwl/subset_vcf_cwl_1/chr.recal.vcf"
                    ],
                    "type": "File"
                }
            ],
            "steps": [
                {
                    "id": "#generate_quality_metrics.cwl/ts_tv_ratio_cwl",
                    "in": [
                        {
                            "id": "#generate_quality_metrics.cwl/ts_tv_ratio_cwl/recal.vcf.gz",
                            "source": [
                                "#generate_quality_metrics.cwl/recal.vcf.gz"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#generate_quality_metrics.cwl/ts_tv_ratio_cwl/ts_tv.txt"
                        }
                    ],
                    "run": "#ts_tv_ratio.cwl",
                    "label": "ts_tv_ratio - indels"
                },
                {
                    "id": "#generate_quality_metrics.cwl/geneticqc_cwl",
                    "in": [
                        {
                            "id": "#generate_quality_metrics.cwl/geneticqc_cwl/recal.vcf.gz",
                            "source": [
                                "#generate_quality_metrics.cwl/recal.vcf.gz"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#generate_quality_metrics.cwl/geneticqc_cwl/genetic.qc.txt"
                        }
                    ],
                    "run": "#geneticqc.cwl",
                    "label": "geneticqc - indels"
                },
                {
                    "id": "#generate_quality_metrics.cwl/variant_eval_bysample_cwl",
                    "in": [
                        {
                            "id": "#generate_quality_metrics.cwl/variant_eval_bysample_cwl/recal.vcf.gz",
                            "source": [
                                "#generate_quality_metrics.cwl/recal.vcf.gz"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#generate_quality_metrics.cwl/variant_eval_bysample_cwl/variant_eval.txt"
                        }
                    ],
                    "run": "#variant_eval_bysample.cwl",
                    "label": "variant_eval_bysample - indels"
                },
                {
                    "id": "#generate_quality_metrics.cwl/subset_vcf_cwl",
                    "in": [
                        {
                            "id": "#generate_quality_metrics.cwl/subset_vcf_cwl/recal.gz",
                            "source": [
                                "#generate_quality_metrics.cwl/recal.vcf.gz"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#generate_quality_metrics.cwl/subset_vcf_cwl/chr.recal.vcf"
                        }
                    ],
                    "run": "#subset_vcf.cwl",
                    "label": "subset_vcf - indels"
                },
                {
                    "id": "#generate_quality_metrics.cwl/ts_tv_ratio_cwl_1",
                    "in": [
                        {
                            "id": "#generate_quality_metrics.cwl/ts_tv_ratio_cwl_1/recal.vcf.gz",
                            "source": [
                                "#generate_quality_metrics.cwl/recal.vcf.gz_1"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#generate_quality_metrics.cwl/ts_tv_ratio_cwl_1/ts_tv.txt"
                        }
                    ],
                    "run": "#ts_tv_ratio.cwl",
                    "label": "ts_tv_ratio"
                },
                {
                    "id": "#generate_quality_metrics.cwl/subset_vcf_cwl_1",
                    "in": [
                        {
                            "id": "#generate_quality_metrics.cwl/subset_vcf_cwl_1/recal.gz",
                            "source": [
                                "#generate_quality_metrics.cwl/recal.vcf.gz_1"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#generate_quality_metrics.cwl/subset_vcf_cwl_1/chr.recal.vcf"
                        }
                    ],
                    "run": "#subset_vcf.cwl",
                    "label": "subset_vcf"
                },
                {
                    "id": "#generate_quality_metrics.cwl/variant_eval_bysample_cwl_1",
                    "in": [
                        {
                            "id": "#generate_quality_metrics.cwl/variant_eval_bysample_cwl_1/recal.vcf.gz",
                            "source": [
                                "#generate_quality_metrics.cwl/recal.vcf.gz_1"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#generate_quality_metrics.cwl/variant_eval_bysample_cwl_1/variant_eval.txt"
                        }
                    ],
                    "run": "#variant_eval_bysample.cwl",
                    "label": "variant_eval_bysample"
                },
                {
                    "id": "#generate_quality_metrics.cwl/geneticqc_cwl_1",
                    "in": [
                        {
                            "id": "#generate_quality_metrics.cwl/geneticqc_cwl_1/recal.vcf.gz",
                            "source": [
                                "#generate_quality_metrics.cwl/recal.vcf.gz_1"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#generate_quality_metrics.cwl/geneticqc_cwl_1/genetic.qc.txt"
                        }
                    ],
                    "run": "#geneticqc.cwl",
                    "label": "geneticqc"
                }
            ]
        },
        {
            "class": "Workflow",
            "id": "#post_alignment_processing.cwl",
            "label": "post-alignment-processing",
            "inputs": [
                {
                    "id": "#post_alignment_processing.cwl/1000G_phase1.indels",
                    "type": "File"
                },
                {
                    "id": "#post_alignment_processing.cwl/Mills_and_1000G_gold",
                    "type": "File"
                },
                {
                    "id": "#post_alignment_processing.cwl/bam",
                    "type": "File"
                },
                {
                    "id": "#post_alignment_processing.cwl/target_sites",
                    "type": "File"
                },
                {
                    "id": "#post_alignment_processing.cwl/reference_assembly",
                    "type": "File"
                },
                {
                    "id": "#post_alignment_processing.cwl/dbsnp_XXX",
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
                            "id": "#post_alignment_processing.cwl/gatk_base_recalibrator/target_sites",
                            "source": [
                                "#post_alignment_processing.cwl/target_sites"
                            ]
                        },
                        {
                            "id": "#post_alignment_processing.cwl/gatk_base_recalibrator/dbsnp_XXX",
                            "source": [
                                "#post_alignment_processing.cwl/dbsnp_XXX"
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
                        },
                        {
                            "id": "#post_alignment_processing.cwl/gatk_indel_realigner/target_sites",
                            "source": [
                                "#post_alignment_processing.cwl/target_sites"
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
                            "id": "#post_alignment_processing.cwl/gatk_print_reads/merged_bam",
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
                        },
                        {
                            "id": "#post_alignment_processing.cwl/gatk_print_reads/target_sites",
                            "source": [
                                "#post_alignment_processing.cwl/target_sites"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_alignment_processing.cwl/gatk_print_reads/recalibrated_bam"
                        }
                    ],
                    "run": "#gatk_printReads.cwl",
                    "label": "gatk_print_reads"
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
                            "id": "#post_alignment_processing.cwl/gatk_realigner_target_creator/Mills_and_1000G_gold",
                            "source": [
                                "#post_alignment_processing.cwl/Mills_and_1000G_gold"
                            ]
                        },
                        {
                            "id": "#post_alignment_processing.cwl/gatk_realigner_target_creator/reference_assembly",
                            "source": [
                                "#post_alignment_processing.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#post_alignment_processing.cwl/gatk_realigner_target_creator/target_sites",
                            "source": [
                                "#post_alignment_processing.cwl/target_sites"
                            ]
                        },
                        {
                            "id": "#post_alignment_processing.cwl/gatk_realigner_target_creator/1000G_phase1.indels",
                            "source": [
                                "#post_alignment_processing.cwl/1000G_phase1.indels"
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
            "label": "qut-sub-workflow",
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
                    "id": "#main/reference_assembly",
                    "type": "File"
                },
                {
                    "id": "#main/target_sites",
                    "type": "File"
                },
                {
                    "id": "#main/Mills_and_1000G_gold",
                    "type": "File"
                },
                {
                    "id": "#main/1000G_phase1.indels",
                    "type": "File"
                },
                {
                    "id": "#main/dbsnp_XXX",
                    "type": "File"
                },
                {
                    "id": "#main/vep_cache_88",
                    "type": "File"
                },
                {
                    "id": "#main/germline_cohort",
                    "type": "File"
                },
                {
                    "id": "#main/hapmap",
                    "type": "File"
                },
                {
                    "id": "#main/omni",
                    "type": "File"
                },
                {
                    "id": "#main/bcl3",
                    "type": "File"
                },
                {
                    "id": "#main/bcl4",
                    "type": "File"
                }
            ],
            "outputs": [
                {
                    "id": "#main/samplesheet.csv",
                    "outputSource": [
                        "#main/read_quality_assessment_cwl/samplesheet.csv"
                    ],
                    "type": "File"
                },
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
                    "id": "#main/rscriptFile_1",
                    "outputSource": [
                        "#main/variant_calling_cwl/rscriptFile_1"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/rscriptFile",
                    "outputSource": [
                        "#main/variant_calling_cwl/rscriptFile"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/report",
                    "outputSource": [
                        "#main/generate_report_cwl/report"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/maf.filtered.txt",
                    "outputSource": [
                        "#main/variant_annotation_cwl/maf.filtered.txt"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/samplesheet.csv_1",
                    "outputSource": [
                        "#main/read_quality_assessment_cwl_1/samplesheet.csv"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/fastqc_report_read3",
                    "outputSource": [
                        "#main/read_quality_assessment_cwl_1/fastqc_report_read2"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/fastqc_report_read4",
                    "outputSource": [
                        "#main/read_quality_assessment_cwl_1/fastqc_report_read1"
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
                                "#main/read_quality_assessment_cwl/read2.fastqc.gz"
                            ]
                        },
                        {
                            "id": "#main/read_alignment_cwl/read1_reads.gz",
                            "source": [
                                "#main/read_quality_assessment_cwl/read1.fastqc.gz"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/read_alignment_cwl/sorted.bam"
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
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/read_quality_assessment_cwl/samplesheet.csv"
                        },
                        {
                            "id": "#main/read_quality_assessment_cwl/read2.fastqc.gz"
                        },
                        {
                            "id": "#main/read_quality_assessment_cwl/read1.fastqc.gz"
                        },
                        {
                            "id": "#main/read_quality_assessment_cwl/fastqc_report_read2"
                        },
                        {
                            "id": "#main/read_quality_assessment_cwl/fastqc_report_read1"
                        }
                    ],
                    "run": "#read_quality_assessment.cwl",
                    "label": "read_quality_assessment"
                },
                {
                    "id": "#main/merge_alignments",
                    "in": [
                        {
                            "id": "#main/merge_alignments/sorted.bam",
                            "source": [
                                "#main/read_alignment_cwl/sorted.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/merge_alignments/aligned_merged_bam"
                        }
                    ],
                    "run": "#merge_alignments.cwl",
                    "label": "merge bam files"
                },
                {
                    "id": "#main/post_alignment_processing_cwl",
                    "in": [
                        {
                            "id": "#main/post_alignment_processing_cwl/1000G_phase1.indels",
                            "source": [
                                "#main/1000G_phase1.indels"
                            ]
                        },
                        {
                            "id": "#main/post_alignment_processing_cwl/Mills_and_1000G_gold",
                            "source": [
                                "#main/Mills_and_1000G_gold"
                            ]
                        },
                        {
                            "id": "#main/post_alignment_processing_cwl/bam",
                            "source": [
                                "#main/merge_bams/aligned_merged_bam"
                            ]
                        },
                        {
                            "id": "#main/post_alignment_processing_cwl/target_sites",
                            "source": [
                                "#main/target_sites"
                            ]
                        },
                        {
                            "id": "#main/post_alignment_processing_cwl/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/post_alignment_processing_cwl/dbsnp_XXX",
                            "source": [
                                "#main/dbsnp_XXX"
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
                    "id": "#main/variant_calling_cwl",
                    "in": [
                        {
                            "id": "#main/variant_calling_cwl/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/variant_calling_cwl/dbsnp_XXX",
                            "source": [
                                "#main/dbsnp_XXX"
                            ]
                        },
                        {
                            "id": "#main/variant_calling_cwl/target_sites",
                            "source": [
                                "#main/target_sites"
                            ]
                        },
                        {
                            "id": "#main/variant_calling_cwl/omni",
                            "source": [
                                "#main/omni"
                            ]
                        },
                        {
                            "id": "#main/variant_calling_cwl/hapmap",
                            "source": [
                                "#main/hapmap"
                            ]
                        },
                        {
                            "id": "#main/variant_calling_cwl/mills",
                            "source": [
                                "#main/Mills_and_1000G_gold"
                            ]
                        },
                        {
                            "id": "#main/variant_calling_cwl/1000G",
                            "source": [
                                "#main/1000G_phase1.indels"
                            ]
                        },
                        {
                            "id": "#main/variant_calling_cwl/germline_cohort",
                            "source": [
                                "#main/germline_cohort"
                            ]
                        },
                        {
                            "id": "#main/variant_calling_cwl/recal.bam",
                            "source": [
                                "#main/post_alignment_processing_cwl/recalibrated_bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/variant_calling_cwl/rscriptFile"
                        },
                        {
                            "id": "#main/variant_calling_cwl/rscriptFile_1"
                        },
                        {
                            "id": "#main/variant_calling_cwl/split.vcf"
                        },
                        {
                            "id": "#main/variant_calling_cwl/split.vcf_1"
                        }
                    ],
                    "run": "#variant_calling.cwl",
                    "label": "variant_calling"
                },
                {
                    "id": "#main/variant_annotation_cwl",
                    "in": [
                        {
                            "id": "#main/variant_annotation_cwl/snp.vcf",
                            "source": [
                                "#main/generate_quality_metrics_cwl/snp_chr.recal.vcf"
                            ]
                        },
                        {
                            "id": "#main/variant_annotation_cwl/indel.vcf",
                            "source": [
                                "#main/generate_quality_metrics_cwl/indel.chr.recal.vcf"
                            ]
                        },
                        {
                            "id": "#main/variant_annotation_cwl/vep_cache_88",
                            "source": [
                                "#main/vep_cache_88"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/variant_annotation_cwl/somatic.txt.gz"
                        },
                        {
                            "id": "#main/variant_annotation_cwl/maf.filtered.txt"
                        }
                    ],
                    "run": "#variant_annotation.cwl",
                    "label": "variant_annotation"
                },
                {
                    "id": "#main/generate_quality_metrics_cwl",
                    "in": [
                        {
                            "id": "#main/generate_quality_metrics_cwl/recal.vcf.gz",
                            "source": [
                                "#main/variant_calling_cwl/split.vcf_1"
                            ]
                        },
                        {
                            "id": "#main/generate_quality_metrics_cwl/recal.vcf.gz_1",
                            "source": [
                                "#main/variant_calling_cwl/split.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/generate_quality_metrics_cwl/indel.chr.recal.vcf"
                        },
                        {
                            "id": "#main/generate_quality_metrics_cwl/indel.genetic.qc.txt"
                        },
                        {
                            "id": "#main/generate_quality_metrics_cwl/indel_variant_eval.txt"
                        },
                        {
                            "id": "#main/generate_quality_metrics_cwl/indel_ts_tv.txt"
                        },
                        {
                            "id": "#main/generate_quality_metrics_cwl/snp_variant_eval.txt"
                        },
                        {
                            "id": "#main/generate_quality_metrics_cwl/snp_genetic.qc.txt"
                        },
                        {
                            "id": "#main/generate_quality_metrics_cwl/snp_ts_tv.txt"
                        },
                        {
                            "id": "#main/generate_quality_metrics_cwl/snp_chr.recal.vcf"
                        }
                    ],
                    "run": "#generate_quality_metrics.cwl",
                    "label": "generate_quality_metrics"
                },
                {
                    "id": "#main/generate_report_cwl",
                    "in": [
                        {
                            "id": "#main/generate_report_cwl/indel_genetic.qc.txt",
                            "source": [
                                "#main/generate_quality_metrics_cwl/indel.genetic.qc.txt"
                            ]
                        },
                        {
                            "id": "#main/generate_report_cwl/snp_genetic.qc.txt",
                            "source": [
                                "#main/generate_quality_metrics_cwl/snp_genetic.qc.txt"
                            ]
                        },
                        {
                            "id": "#main/generate_report_cwl/snp_variant_eval.txt",
                            "source": [
                                "#main/generate_quality_metrics_cwl/snp_variant_eval.txt"
                            ]
                        },
                        {
                            "id": "#main/generate_report_cwl/indel_variant_eval.txt",
                            "source": [
                                "#main/generate_quality_metrics_cwl/indel_ts_tv.txt"
                            ]
                        },
                        {
                            "id": "#main/generate_report_cwl/indel_tstv.txt",
                            "source": [
                                "#main/generate_quality_metrics_cwl/indel_variant_eval.txt"
                            ]
                        },
                        {
                            "id": "#main/generate_report_cwl/snp_tstv.txt",
                            "source": [
                                "#main/generate_quality_metrics_cwl/snp_ts_tv.txt"
                            ]
                        },
                        {
                            "id": "#main/generate_report_cwl/somatic_variants.gz",
                            "source": [
                                "#main/variant_annotation_cwl/somatic.txt.gz"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/generate_report_cwl/report"
                        }
                    ],
                    "run": "#generate_report.cwl",
                    "label": "generate_report"
                },
                {
                    "id": "#main/read_quality_assessment_cwl_1",
                    "in": [
                        {
                            "id": "#main/read_quality_assessment_cwl_1/bcl2",
                            "source": [
                                "#main/bcl3"
                            ]
                        },
                        {
                            "id": "#main/read_quality_assessment_cwl_1/bcl1",
                            "source": [
                                "#main/bcl4"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/read_quality_assessment_cwl_1/samplesheet.csv"
                        },
                        {
                            "id": "#main/read_quality_assessment_cwl_1/read2.fastqc.gz"
                        },
                        {
                            "id": "#main/read_quality_assessment_cwl_1/read1.fastqc.gz"
                        },
                        {
                            "id": "#main/read_quality_assessment_cwl_1/fastqc_report_read2"
                        },
                        {
                            "id": "#main/read_quality_assessment_cwl_1/fastqc_report_read1"
                        }
                    ],
                    "run": "#read_quality_assessment.cwl",
                    "label": "read_quality_assessment"
                },
                {
                    "id": "#main/read_alignment_cwl_1",
                    "in": [
                        {
                            "id": "#main/read_alignment_cwl_1/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/read_alignment_cwl_1/read2_reads.gz",
                            "source": [
                                "#main/read_quality_assessment_cwl_1/read2.fastqc.gz"
                            ]
                        },
                        {
                            "id": "#main/read_alignment_cwl_1/read1_reads.gz",
                            "source": [
                                "#main/read_quality_assessment_cwl_1/read1.fastqc.gz"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/read_alignment_cwl_1/sorted.bam"
                        }
                    ],
                    "run": "#read_alignment.cwl",
                    "label": "read_alignment"
                },
                {
                    "id": "#main/merge_alignments_1",
                    "in": [
                        {
                            "id": "#main/merge_alignments_1/sorted.bam",
                            "source": [
                                "#main/read_alignment_cwl_1/sorted.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/merge_alignments_1/aligned_merged_bam"
                        }
                    ],
                    "run": "#merge_alignments.cwl",
                    "label": "merge bam files"
                },
                {
                    "id": "#main/merge_bams",
                    "in": [
                        {
                            "id": "#main/merge_bams/merged.sorted.bam.1",
                            "source": [
                                "#main/merge_alignments_1/aligned_merged_bam"
                            ]
                        },
                        {
                            "id": "#main/merge_bams/merged.sorted.bam.2",
                            "source": [
                                "#main/merge_alignments/aligned_merged_bam"
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
                    "id": "#read_alignment.cwl/sorted.bam",
                    "outputSource": [
                        "#read_alignment.cwl/picard_sortsam_cwl/sorted.bam"
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
                    "label": "bwa"
                },
                {
                    "id": "#read_alignment.cwl/samtools_view_cwl",
                    "in": [
                        {
                            "id": "#read_alignment.cwl/samtools_view_cwl/view-sam",
                            "source": [
                                "#read_alignment.cwl/bwa_mem/ref_aligned_bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#read_alignment.cwl/samtools_view_cwl/sam"
                        }
                    ],
                    "run": "#samtools-view.cwl",
                    "label": "samtools-view"
                },
                {
                    "id": "#read_alignment.cwl/picard_sortsam_cwl",
                    "in": [
                        {
                            "id": "#read_alignment.cwl/picard_sortsam_cwl/bam",
                            "source": [
                                "#read_alignment.cwl/samtools_view_cwl/sam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#read_alignment.cwl/picard_sortsam_cwl/sorted.bam"
                        }
                    ],
                    "run": "#picard_sortsam.cwl",
                    "label": "picard_sortsam"
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
                }
            ],
            "outputs": [
                {
                    "id": "#read_quality_assessment.cwl/samplesheet.csv",
                    "outputSource": [
                        "#read_quality_assessment.cwl/bcl2fastq_cwl/samplesheet.csv"
                    ],
                    "type": "File"
                },
                {
                    "id": "#read_quality_assessment.cwl/read2.fastqc.gz",
                    "outputSource": [
                        "#read_quality_assessment.cwl/fastq_qc_cwl/read2.fastqc.gz"
                    ],
                    "type": "File"
                },
                {
                    "id": "#read_quality_assessment.cwl/read1.fastqc.gz",
                    "outputSource": [
                        "#read_quality_assessment.cwl/fastq_qc_cwl/read1.fastqc.gz"
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
                    "id": "#read_quality_assessment.cwl/fastqc_report_read1",
                    "outputSource": [
                        "#read_quality_assessment.cwl/fastq_qc_cwl/fastqc_report_read1"
                    ],
                    "type": "File"
                }
            ],
            "steps": [
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
                    "id": "#read_quality_assessment.cwl/fastq_qc_cwl",
                    "in": [
                        {
                            "id": "#read_quality_assessment.cwl/fastq_qc_cwl/read1_reads",
                            "source": [
                                "#read_quality_assessment.cwl/bcl2fastq_cwl/fastq1.gz"
                            ]
                        },
                        {
                            "id": "#read_quality_assessment.cwl/fastq_qc_cwl/read2_reads",
                            "source": [
                                "#read_quality_assessment.cwl/bcl2fastq_cwl/fastq2.gz"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#read_quality_assessment.cwl/fastq_qc_cwl/fastqc_report_read1"
                        },
                        {
                            "id": "#read_quality_assessment.cwl/fastq_qc_cwl/fastqc_report_read2"
                        },
                        {
                            "id": "#read_quality_assessment.cwl/fastq_qc_cwl/read1.fastqc.gz"
                        },
                        {
                            "id": "#read_quality_assessment.cwl/fastq_qc_cwl/read2.fastqc.gz"
                        }
                    ],
                    "run": "#fastq-qc.cwl"
                }
            ]
        },
        {
            "class": "Workflow",
            "id": "#variant_annotation.cwl",
            "label": "variant_annotation",
            "inputs": [
                {
                    "id": "#variant_annotation.cwl/snp.vcf",
                    "type": "File",
                    "label": "chr.snp.vcf"
                },
                {
                    "id": "#variant_annotation.cwl/indel.vcf",
                    "type": "File",
                    "label": "chr.indel.vcf"
                },
                {
                    "id": "#variant_annotation.cwl/vep_cache_88",
                    "type": "File"
                }
            ],
            "outputs": [
                {
                    "id": "#variant_annotation.cwl/somatic.txt.gz",
                    "outputSource": [
                        "#variant_annotation.cwl/compresssomatics_cwl/somatic.txt.gz"
                    ],
                    "type": "File"
                },
                {
                    "id": "#variant_annotation.cwl/maf.filtered.txt",
                    "outputSource": [
                        "#variant_annotation.cwl/annotate_dump_cwl/maf.filtered.txt"
                    ],
                    "type": "File"
                }
            ],
            "steps": [
                {
                    "id": "#variant_annotation.cwl/annotate_seq_run_cwl",
                    "in": [
                        {
                            "id": "#variant_annotation.cwl/annotate_seq_run_cwl/snp.vcf",
                            "source": [
                                "#variant_annotation.cwl/snp.vcf"
                            ]
                        },
                        {
                            "id": "#variant_annotation.cwl/annotate_seq_run_cwl/indel.vcf",
                            "source": [
                                "#variant_annotation.cwl/indel.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_annotation.cwl/annotate_seq_run_cwl/output"
                        },
                        {
                            "id": "#variant_annotation.cwl/annotate_seq_run_cwl/output_1"
                        }
                    ],
                    "run": "#annotate_seq_run.cwl",
                    "label": "annotate_seq_run",
                    "doc": "Multiallelic sites. Left alignment. Calls annovar. Annotation filters applied including identification of somatics through subtraction."
                },
                {
                    "id": "#variant_annotation.cwl/annotate_dump_cwl",
                    "in": [
                        {
                            "id": "#variant_annotation.cwl/annotate_dump_cwl/table.rdata",
                            "source": [
                                "#variant_annotation.cwl/vep_annotation_cwl/output"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_annotation.cwl/annotate_dump_cwl/all.genotypes.txt"
                        },
                        {
                            "id": "#variant_annotation.cwl/annotate_dump_cwl/maf.filtered.txt"
                        }
                    ],
                    "run": "#annotate_dump.cwl",
                    "label": "annotate_dump"
                },
                {
                    "id": "#variant_annotation.cwl/clinical_filter_cwl",
                    "in": [
                        {
                            "id": "#variant_annotation.cwl/clinical_filter_cwl/all.genotypes.txt",
                            "source": [
                                "#variant_annotation.cwl/annotate_dump_cwl/all.genotypes.txt"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_annotation.cwl/clinical_filter_cwl/somatic-variants.txt"
                        }
                    ],
                    "run": "#clinical_filter.cwl",
                    "label": "clinical_filter"
                },
                {
                    "id": "#variant_annotation.cwl/compresssomatics_cwl",
                    "in": [
                        {
                            "id": "#variant_annotation.cwl/compresssomatics_cwl/somatic.txt",
                            "source": [
                                "#variant_annotation.cwl/clinical_filter_cwl/somatic-variants.txt"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_annotation.cwl/compresssomatics_cwl/somatic.txt.gz"
                        }
                    ],
                    "run": "#compresssomatics.cwl",
                    "label": "CompressSomatics"
                },
                {
                    "id": "#variant_annotation.cwl/annovar_cwl",
                    "in": [
                        {
                            "id": "#variant_annotation.cwl/annovar_cwl/indel",
                            "source": [
                                "#variant_annotation.cwl/annotate_seq_run_cwl/output"
                            ]
                        },
                        {
                            "id": "#variant_annotation.cwl/annovar_cwl/snp",
                            "source": [
                                "#variant_annotation.cwl/annotate_seq_run_cwl/output_1"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_annotation.cwl/annovar_cwl/output"
                        }
                    ],
                    "run": "#annovar.cwl",
                    "label": "annotate_seq_run | annovar"
                },
                {
                    "id": "#variant_annotation.cwl/vep_annotation_cwl",
                    "in": [
                        {
                            "id": "#variant_annotation.cwl/vep_annotation_cwl/input",
                            "source": [
                                "#variant_annotation.cwl/annovar_cwl/output"
                            ]
                        },
                        {
                            "id": "#variant_annotation.cwl/vep_annotation_cwl/vep_cache_88",
                            "source": [
                                "#variant_annotation.cwl/vep_cache_88"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_annotation.cwl/vep_annotation_cwl/output"
                        }
                    ],
                    "run": "#vep_annotation.cwl",
                    "label": "annotate_seq_run | vep_annotation"
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
                    "id": "#variant_calling.cwl/dbsnp_XXX",
                    "type": "File"
                },
                {
                    "id": "#variant_calling.cwl/target_sites",
                    "type": "File"
                },
                {
                    "id": "#variant_calling.cwl/omni",
                    "type": "File"
                },
                {
                    "id": "#variant_calling.cwl/hapmap",
                    "type": "File"
                },
                {
                    "id": "#variant_calling.cwl/mills",
                    "type": "File"
                },
                {
                    "id": "#variant_calling.cwl/1000G",
                    "type": "File"
                },
                {
                    "id": "#variant_calling.cwl/germline_cohort",
                    "type": "File"
                },
                {
                    "id": "#variant_calling.cwl/recal.bam",
                    "type": "File"
                }
            ],
            "outputs": [
                {
                    "id": "#variant_calling.cwl/rscriptFile",
                    "outputSource": [
                        "#variant_calling.cwl/gatk_variantrecalibrator_cwl/rscriptFile"
                    ],
                    "type": "File",
                    "label": "indel_rscriptFile"
                },
                {
                    "id": "#variant_calling.cwl/rscriptFile_1",
                    "outputSource": [
                        "#variant_calling.cwl/gatk_variantrecalibrator_cwl_1/rscriptFile"
                    ],
                    "type": "File",
                    "label": "snp_rscriptFile"
                },
                {
                    "id": "#variant_calling.cwl/split.vcf",
                    "outputSource": [
                        "#variant_calling.cwl/gatk_applyrecalibration_cwl_1/split.vcf"
                    ],
                    "type": "File",
                    "label": "snp.vcf"
                },
                {
                    "id": "#variant_calling.cwl/split.vcf_1",
                    "outputSource": [
                        "#variant_calling.cwl/gatk_applyrecalibration_cwl/split.vcf"
                    ],
                    "type": "File",
                    "label": "indel.vcf"
                }
            ],
            "steps": [
                {
                    "id": "#variant_calling.cwl/gatk_applyrecalibration_cwl",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/gatk_applyrecalibration_cwl/reference_assembly",
                            "source": [
                                "#variant_calling.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_applyrecalibration_cwl/raw_snps_indels.vcf",
                            "source": [
                                "#variant_calling.cwl/gatk_unifiedgenotyper_cwl/snps.ug.gz"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_applyrecalibration_cwl/recalFile",
                            "source": [
                                "#variant_calling.cwl/gatk_variantrecalibrator_cwl/recalFile"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_applyrecalibration_cwl/tranchesFile",
                            "source": [
                                "#variant_calling.cwl/gatk_variantrecalibrator_cwl/tranchesFile"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/gatk_applyrecalibration_cwl/split.vcf"
                        }
                    ],
                    "run": "#gatk_applyrecalibration.cwl",
                    "label": "gatk_applyRecalibration"
                },
                {
                    "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl/recal_snps_raw_indels.vcf",
                            "source": [
                                "#variant_calling.cwl/gatk_haplotypecaller_cwl/hap,.vcf"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl/reference_assembly",
                            "source": [
                                "#variant_calling.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl/dbsnp",
                            "source": [
                                "#variant_calling.cwl/dbsnp_XXX"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl/target_sites",
                            "source": [
                                "#variant_calling.cwl/target_sites"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl/mills",
                            "source": [
                                "#variant_calling.cwl/mills"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl/recalFile"
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl/tranchesFile"
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl/rscriptFile"
                        }
                    ],
                    "run": "#gatk_variantrecalibrator-indel.cwl",
                    "label": "gatk_variantRecalibrator-indel"
                },
                {
                    "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl_1",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl_1/snps.vcf",
                            "source": [
                                "#variant_calling.cwl/gatk_unifiedgenotyper_cwl/snps.ug.gz"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl_1/reference_assembly",
                            "source": [
                                "#variant_calling.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl_1/hapmap",
                            "source": [
                                "#variant_calling.cwl/hapmap"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl_1/omni",
                            "source": [
                                "#variant_calling.cwl/omni"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl_1/1000G",
                            "source": [
                                "#variant_calling.cwl/1000G"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl_1/dbsnp",
                            "source": [
                                "#variant_calling.cwl/dbsnp_XXX"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl_1/target_sites",
                            "source": [
                                "#variant_calling.cwl/target_sites"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl_1/recalFile"
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl_1/tranchesFile"
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_variantrecalibrator_cwl_1/rscriptFile"
                        }
                    ],
                    "run": "#gatk_variantrecalibrator-snp.cwl",
                    "label": "gatk_variantRecalibrator-snps"
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
                            "id": "#variant_calling.cwl/gatk_applyrecalibration_cwl_1/raw_snps_indels.vcf",
                            "source": [
                                "#variant_calling.cwl/gatk_unifiedgenotyper_cwl/snps.ug.gz"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_applyrecalibration_cwl_1/recalFile",
                            "source": [
                                "#variant_calling.cwl/gatk_variantrecalibrator_cwl_1/recalFile"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_applyrecalibration_cwl_1/tranchesFile",
                            "source": [
                                "#variant_calling.cwl/gatk_variantrecalibrator_cwl_1/tranchesFile"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/gatk_applyrecalibration_cwl_1/split.vcf"
                        }
                    ],
                    "run": "#gatk_applyrecalibration.cwl",
                    "label": "gatk_applyRecalibration"
                },
                {
                    "id": "#variant_calling.cwl/gatk_haplotypecaller_cwl",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/gatk_haplotypecaller_cwl/gvcf",
                            "source": [
                                "#variant_calling.cwl/genotype_g_v_c_fs/raw_variants_g_gvcf"
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
                            "id": "#variant_calling.cwl/gatk_haplotypecaller_cwl/dbsnp_XXX",
                            "source": [
                                "#variant_calling.cwl/dbsnp_XXX"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/gatk_haplotypecaller_cwl/hap,.vcf"
                        }
                    ],
                    "run": "#gatk_haplotypecaller.cwl",
                    "label": "gatk_haplotypecaller"
                },
                {
                    "id": "#variant_calling.cwl/gatk_unifiedgenotyper_cwl",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/gatk_unifiedgenotyper_cwl/reference_assembly",
                            "source": [
                                "#variant_calling.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_unifiedgenotyper_cwl/recal.bam",
                            "source": [
                                "#variant_calling.cwl/recal.bam"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_unifiedgenotyper_cwl/dbsnp",
                            "source": [
                                "#variant_calling.cwl/dbsnp_XXX"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_unifiedgenotyper_cwl/germline_cohort",
                            "source": [
                                "#variant_calling.cwl/germline_cohort"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/gatk_unifiedgenotyper_cwl/snps.ug.gz"
                        }
                    ],
                    "run": "#gatk_unifiedgenotyper.cwl",
                    "label": "gatk_unifiedGenotyper"
                },
                {
                    "id": "#variant_calling.cwl/genotype_g_v_c_fs",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/genotype_g_v_c_fs/recal.bam",
                            "source": [
                                "#variant_calling.cwl/recal.bam"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/genotype_g_v_c_fs/reference_assembly",
                            "source": [
                                "#variant_calling.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/genotype_g_v_c_fs/germline_cohort",
                            "source": [
                                "#variant_calling.cwl/germline_cohort"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/genotype_g_v_c_fs/raw_variants_g_gvcf"
                        }
                    ],
                    "run": "#genotypeGVCFs.cwl",
                    "label": "genotype GVCF"
                }
            ]
        }
    ],
    "cwlVersion": "v1.0"
}