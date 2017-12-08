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
                    "id": "#addbamstats.cwl/VCF",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#addbamstats.cwl/bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#addbamstats.cwl/bam2",
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
                    "id": "#bwa-mem.cwl/reference_assembly.fasta",
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
                    "id": "#bwa-mem.cwl/ref_aligned_sam",
                    "doc": "sam file containing aligned sequences. piped to samtools.",
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
                    "prefix": "-M"
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
                "-jar",
                "GenomeAnalysisTK.jar",
                "-T",
                "CombineVariants"
            ],
            "inputs": [
                {
                    "id": "#combinevariants.cwl/reference.assembly",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#combinevariants.cwl/indelocator.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#combinevariants.cwl/mutect.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#combinevariants.cwl/varscan.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#combinevariants.cwl/ugSomatic.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#combinevariants.cwl/T-N-combined.vcf",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "combineVariants"
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
            "id": "#filtervcfbybed.cwl",
            "baseCommand": [
                "bedtools",
                "intersect"
            ],
            "inputs": [
                {
                    "id": "#filtervcfbybed.cwl/vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#filtervcfbybed.cwl/bed",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#filtervcfbybed.cwl/bed.filtered.vcf",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "filterVcfByBed"
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
                    "id": "#gatk_baseRecalibrator.cwl/dbsnp_137.vcf",
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
                    "valueFrom": "=dbsnp_137"
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
                    "id": "#gatk_haplotypecaller.cwl/bam2",
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
                },
                {
                    "id": "#gatk_haplotypecaller.cwl/output",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "gatk_haplotypecaller",
            "arguments": [
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
            "id": "#gatk_indellocator.cwl",
            "baseCommand": [
                "-jar",
                "IndelGenotyper.jar",
                "-T",
                "IndelGenotyperV2"
            ],
            "inputs": [
                {
                    "id": "#gatk_indellocator.cwl/bed",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_indellocator.cwl/reference.assembly",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_indellocator.cwl/normal.bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_indellocator.cwl/tumour.bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#gatk_indellocator.cwl/output",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "gatk_indellocator",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "--downsampling_type",
                    "valueFrom": "none"
                },
                {
                    "position": 0,
                    "prefix": "-minCnt",
                    "valueFrom": "1"
                },
                {
                    "position": 0,
                    "prefix": "--minConsensusFraction",
                    "valueFrom": "0.7"
                },
                {
                    "position": 0,
                    "prefix": "--minCoverage",
                    "valueFrom": "6"
                },
                {
                    "position": 0,
                    "prefix": "--minFraction",
                    "valueFrom": "0.1"
                },
                {
                    "position": 0,
                    "prefix": "-minNormalCoverage",
                    "valueFrom": "4"
                },
                {
                    "position": 0,
                    "prefix": "--window_size",
                    "valueFrom": "300"
                }
            ]
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
                    "id": "#gatk_printReads.cwl/deduped_realigned_bam",
                    "type": "File"
                },
                {
                    "format": "http://edamontology.org/format_3475",
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
            "id": "#mergebams.cwl",
            "baseCommand": [
                "java",
                "-jar",
                "MergeSamFiles.jar"
            ],
            "inputs": [
                {
                    "id": "#mergebams.cwl/normal.sorted.bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#mergebams.cwl/tumour.sorted.bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#mergebams.cwl/merged.bam",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "mergeBams",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "USE_THREADING",
                    "valueFrom": "=true"
                },
                {
                    "position": 0,
                    "prefix": "CREATE_INDEX",
                    "valueFrom": "=true"
                },
                {
                    "position": 0,
                    "prefix": "VALIDATION_STRINGENCY",
                    "valueFrom": "=SILENT"
                }
            ]
        },
        {
            "class": "CommandLineTool",
            "id": "#mp_normvcf.cwl",
            "baseCommand": [
                "--",
                "mutalyzer",
                "NormaliseVcf"
            ],
            "inputs": [
                {
                    "id": "#mp_normvcf.cwl/ma.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#mp_normvcf.cwl/norm.vcf",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "mp_normVcf"
        },
        {
            "class": "CommandLineTool",
            "id": "#mp_splitallele.cwl",
            "baseCommand": [
                "VcfSplitMultiAllele.sh"
            ],
            "inputs": [
                {
                    "id": "#mp_splitallele.cwl/vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#mp_splitallele.cwl/ma.vcf",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "mp_splitAllele"
        },
        {
            "class": "CommandLineTool",
            "id": "#mp_vcftotsv_somatic.cwl",
            "baseCommand": [],
            "inputs": [
                {
                    "id": "#mp_vcftotsv_somatic.cwl/vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#mp_vcftotsv_somatic.cwl/tsv",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "mp_vcfToTsv_somatic"
        },
        {
            "class": "CommandLineTool",
            "id": "#mutectv1.cwl",
            "baseCommand": [
                "-jar",
                "mutect-1.1.7.jar",
                "-T",
                "MuTect"
            ],
            "inputs": [
                {
                    "id": "#mutectv1.cwl/bed",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#mutectv1.cwl/reference_assembly",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#mutectv1.cwl/dbsnp_137.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#mutectv1.cwl/cosmic_v54_120711",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#mutectv1.cwl/normal.bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#mutectv1.cwl/tumour.bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#mutectv1.cwl/T-N-mutect.vcf",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "mutectv1"
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
                    "doc": "Check secondary file requirement."
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
                "-jar",
                "sortSam.jar"
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
                    "prefix": "SORT_ORDER",
                    "valueFrom": "=coordinate"
                },
                {
                    "position": 0,
                    "prefix": "VALIDATION_STRINGENCY",
                    "valueFrom": "=SILENT"
                },
                {
                    "position": 0,
                    "prefix": "CREATE_INDEX",
                    "valueFrom": "=true"
                }
            ]
        },
        {
            "class": "CommandLineTool",
            "id": "#remove_vcf_n_column.cwl",
            "baseCommand": [
                "seqliner_super_remove_N_columns.py"
            ],
            "inputs": [
                {
                    "id": "#remove_vcf_n_column.cwl/vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#remove_vcf_n_column.cwl/rem.vcf",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "remove_vcf_N_column"
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
            "id": "#samtools-view.cwl",
            "baseCommand": [
                "samtools",
                "view",
                "|"
            ],
            "inputs": [
                {
                    "id": "#samtools-view.cwl/sam1",
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
            "id": "#somatic_filter_for_combinedVCF.cwl",
            "baseCommand": [
                "somaticFilterFromCombinedVCF.py"
            ],
            "inputs": [
                {
                    "id": "#somatic_filter_for_combinedVCF.cwl/T-N.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#somatic_filter_for_combinedVCF.cwl/vcf",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "somatic_filter_for_combinedVCF"
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
            "id": "#splitsamfile.cwl",
            "baseCommand": [
                "java",
                "GenomeAnalysisTK.jar",
                "-T",
                "SplitSamFile"
            ],
            "inputs": [
                {
                    "id": "#splitsamfile.cwl/merged.bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#splitsamfile.cwl/reference_assembly",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#splitsamfile.cwl/tumour.bam",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#splitsamfile.cwl/normal.bam",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "splitSamFile",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "--filter_bases_not_stored"
                },
                {
                    "position": 0,
                    "prefix": "--downsampling_type",
                    "valueFrom": "none"
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
            "id": "#vcf-concat.cwl",
            "baseCommand": [
                "vcf-concat"
            ],
            "inputs": [
                {
                    "id": "#vcf-concat.cwl/varscan.snp",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#vcf-concat.cwl/varscan.indel",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#vcf-concat.cwl/varscan.indel.snv.vcf",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "vcf-concat"
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
            "id": "#vcftools_filter.cwl",
            "baseCommand": [
                "vcftools"
            ],
            "inputs": [
                {
                    "id": "#vcftools_filter.cwl/vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#vcftools_filter.cwl/somatic.vcf",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "vcftools_filter",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "--recode"
                },
                {
                    "position": 0,
                    "prefix": "--recod-INFO-all"
                },
                {
                    "position": 0,
                    "prefix": "--keep-INFO",
                    "valueFrom": "SOMATIC"
                }
            ]
        },
        {
            "class": "Workflow",
            "id": "#post_alignment_processing.cwl",
            "label": "post_alignment_processing",
            "inputs": [
                {
                    "id": "#post_alignment_processing.cwl/target_sites",
                    "type": "File"
                },
                {
                    "id": "#post_alignment_processing.cwl/reference_assembly",
                    "type": "File"
                },
                {
                    "id": "#post_alignment_processing.cwl/Mills_and_1000G_gold",
                    "type": "File"
                },
                {
                    "id": "#post_alignment_processing.cwl/1000G_phase1.indels",
                    "type": "File"
                },
                {
                    "id": "#post_alignment_processing.cwl/dbsnp_137.vcf",
                    "type": "File"
                },
                {
                    "id": "#post_alignment_processing.cwl/bam",
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
                            "id": "#post_alignment_processing.cwl/gatk_base_recalibrator/dbsnp_137.vcf",
                            "source": [
                                "#post_alignment_processing.cwl/dbsnp_137.vcf"
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
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_alignment_processing.cwl/gatk_base_recalibrator/recalibrated_table"
                        }
                    ],
                    "run": "#gatk_baseRecalibrator.cwl",
                    "label": "Calculate recalibration values for base recalibration."
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
                            "id": "#post_alignment_processing.cwl/gatk_indel_realigner/target_sites",
                            "source": [
                                "#post_alignment_processing.cwl/target_sites"
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
                    "label": "perform local realignment of indel sites."
                },
                {
                    "id": "#post_alignment_processing.cwl/gatk_print_reads",
                    "in": [
                        {
                            "id": "#post_alignment_processing.cwl/gatk_print_reads/deduped_realigned_bam",
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
                    "label": "Apply recalibration to bam file. Overwrites values"
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
                    "label": "discover indel sites in need of realignment."
                }
            ]
        },
        {
            "class": "Workflow",
            "id": "#post_variant_processing.cwl",
            "label": "post_variant_processing",
            "inputs": [
                {
                    "id": "#post_variant_processing.cwl/normal.bam",
                    "type": "File"
                },
                {
                    "id": "#post_variant_processing.cwl/tumour.bam",
                    "type": "File"
                },
                {
                    "id": "#post_variant_processing.cwl/bam_2",
                    "type": "File",
                    "label": "T-N.bam"
                },
                {
                    "id": "#post_variant_processing.cwl/tumour.vcf",
                    "type": "File"
                },
                {
                    "id": "#post_variant_processing.cwl/normal.vcf",
                    "type": "File"
                },
                {
                    "id": "#post_variant_processing.cwl/T-N.vcf",
                    "type": "File"
                },
                {
                    "id": "#post_variant_processing.cwl/varscan.snp",
                    "type": "File"
                },
                {
                    "id": "#post_variant_processing.cwl/varscan.indel",
                    "type": "File"
                },
                {
                    "id": "#post_variant_processing.cwl/indelocator.vcf",
                    "type": "File"
                },
                {
                    "id": "#post_variant_processing.cwl/combined.vcf_1",
                    "type": "File"
                },
                {
                    "id": "#post_variant_processing.cwl/reference_assembly",
                    "type": "File"
                },
                {
                    "id": "#post_variant_processing.cwl/bed_extended",
                    "type": "File"
                }
            ],
            "outputs": [
                {
                    "id": "#post_variant_processing.cwl/tumour_hc.tsv",
                    "outputSource": [
                        "#post_variant_processing.cwl/mp_vcftotsv_somatic_cwl/tsv"
                    ],
                    "type": "File"
                },
                {
                    "id": "#post_variant_processing.cwl/normal_hc.tsv",
                    "outputSource": [
                        "#post_variant_processing.cwl/mp_vcftotsv_somatic_cwl_1/tsv"
                    ],
                    "type": "File"
                },
                {
                    "id": "#post_variant_processing.cwl/all_callers.tsv",
                    "outputSource": [
                        "#post_variant_processing.cwl/mp_vcftotsv_somatic_cwl_2/tsv"
                    ],
                    "type": "File"
                }
            ],
            "steps": [
                {
                    "id": "#post_variant_processing.cwl/addbamstats_cwl",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/addbamstats_cwl/reference_assembly",
                            "source": [
                                "#post_variant_processing.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/addbamstats_cwl/VCF",
                            "source": [
                                "#post_variant_processing.cwl/normal.vcf"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/addbamstats_cwl/bam",
                            "source": [
                                "#post_variant_processing.cwl/normal.bam"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/addbamstats_cwl/bam2",
                            "source": [
                                "#post_variant_processing.cwl/normal.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/addbamstats_cwl/bamstats.vcf"
                        }
                    ],
                    "run": "#addbamstats.cwl",
                    "label": "addbamstats"
                },
                {
                    "id": "#post_variant_processing.cwl/mp_splitallele_cwl",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/mp_splitallele_cwl/vcf",
                            "source": [
                                "#post_variant_processing.cwl/addbamstats_cwl_2/bamstats.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/mp_splitallele_cwl/ma.vcf"
                        }
                    ],
                    "run": "#mp_splitallele.cwl",
                    "label": "mp_splitAllele"
                },
                {
                    "id": "#post_variant_processing.cwl/mp_normvcf_cwl",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/mp_normvcf_cwl/ma.vcf",
                            "source": [
                                "#post_variant_processing.cwl/mp_splitallele_cwl/ma.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/mp_normvcf_cwl/norm.vcf"
                        }
                    ],
                    "run": "#mp_normvcf.cwl",
                    "label": "mp_normVcf"
                },
                {
                    "id": "#post_variant_processing.cwl/mp_vcftotsv_somatic_cwl",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/mp_vcftotsv_somatic_cwl/vcf",
                            "source": [
                                "#post_variant_processing.cwl/mp_normvcf_cwl/norm.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/mp_vcftotsv_somatic_cwl/tsv"
                        }
                    ],
                    "run": "#mp_vcftotsv_somatic.cwl",
                    "label": "mp_vcfToTsv_somatic"
                },
                {
                    "id": "#post_variant_processing.cwl/addbamstats_cwl_1",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/addbamstats_cwl_1/reference_assembly",
                            "source": [
                                "#post_variant_processing.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/addbamstats_cwl_1/VCF",
                            "source": [
                                "#post_variant_processing.cwl/T-N.vcf"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/addbamstats_cwl_1/bam",
                            "source": [
                                "#post_variant_processing.cwl/bam_2"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/addbamstats_cwl_1/bam2",
                            "source": [
                                "#post_variant_processing.cwl/bam_2"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/addbamstats_cwl_1/bamstats.vcf"
                        }
                    ],
                    "run": "#addbamstats.cwl",
                    "label": "addbamstats"
                },
                {
                    "id": "#post_variant_processing.cwl/addbamstats_cwl_2",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/addbamstats_cwl_2/reference_assembly",
                            "source": [
                                "#post_variant_processing.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/addbamstats_cwl_2/VCF",
                            "source": [
                                "#post_variant_processing.cwl/tumour.vcf"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/addbamstats_cwl_2/bam",
                            "source": [
                                "#post_variant_processing.cwl/tumour.bam"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/addbamstats_cwl_2/bam2",
                            "source": [
                                "#post_variant_processing.cwl/tumour.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/addbamstats_cwl_2/bamstats.vcf"
                        }
                    ],
                    "run": "#addbamstats.cwl",
                    "label": "addbamstats"
                },
                {
                    "id": "#post_variant_processing.cwl/somatic_filter_for_combined_v_c_f_cwl",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/somatic_filter_for_combined_v_c_f_cwl/T-N.vcf",
                            "source": [
                                "#post_variant_processing.cwl/addbamstats_cwl_1/bamstats.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/somatic_filter_for_combined_v_c_f_cwl/vcf"
                        }
                    ],
                    "run": "#somatic_filter_for_combinedVCF.cwl",
                    "label": "somatic_filter_for_combinedVCF"
                },
                {
                    "id": "#post_variant_processing.cwl/vcfextractdp_ad_py_cwl",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/vcfextractdp_ad_py_cwl/combined.vcf",
                            "source": [
                                "#post_variant_processing.cwl/somatic_filter_for_combined_v_c_f_cwl/vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/vcfextractdp_ad_py_cwl/vcf"
                        }
                    ],
                    "run": "#vcfextractdp_ad-py.cwl",
                    "label": "vcfExtractDP_AD"
                },
                {
                    "id": "#post_variant_processing.cwl/mp_splitallele_cwl_1",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/mp_splitallele_cwl_1/vcf",
                            "source": [
                                "#post_variant_processing.cwl/addbamstats_cwl/bamstats.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/mp_splitallele_cwl_1/ma.vcf"
                        }
                    ],
                    "run": "#mp_splitallele.cwl",
                    "label": "mp_splitAllele"
                },
                {
                    "id": "#post_variant_processing.cwl/mp_normvcf_cwl_1",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/mp_normvcf_cwl_1/ma.vcf",
                            "source": [
                                "#post_variant_processing.cwl/mp_splitallele_cwl_1/ma.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/mp_normvcf_cwl_1/norm.vcf"
                        }
                    ],
                    "run": "#mp_normvcf.cwl",
                    "label": "mp_normVcf"
                },
                {
                    "id": "#post_variant_processing.cwl/mp_vcftotsv_somatic_cwl_1",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/mp_vcftotsv_somatic_cwl_1/vcf",
                            "source": [
                                "#post_variant_processing.cwl/mp_normvcf_cwl_1/norm.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/mp_vcftotsv_somatic_cwl_1/tsv"
                        }
                    ],
                    "run": "#mp_vcftotsv_somatic.cwl",
                    "label": "mp_vcfToTsv_somatic"
                },
                {
                    "id": "#post_variant_processing.cwl/vcf_concat_cwl",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/vcf_concat_cwl/varscan.snp",
                            "source": [
                                "#post_variant_processing.cwl/varscan.snp"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/vcf_concat_cwl/varscan.indel",
                            "source": [
                                "#post_variant_processing.cwl/varscan.indel"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/vcf_concat_cwl/varscan.indel.snv.vcf"
                        }
                    ],
                    "run": "#vcf-concat.cwl",
                    "label": "vcf-concat"
                },
                {
                    "id": "#post_variant_processing.cwl/vcfextractdp_ad_py_cwl_1",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/vcfextractdp_ad_py_cwl_1/combined.vcf",
                            "source": [
                                "#post_variant_processing.cwl/vcf_concat_cwl/varscan.indel.snv.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/vcfextractdp_ad_py_cwl_1/vcf"
                        }
                    ],
                    "run": "#vcfextractdp_ad-py.cwl",
                    "label": "vcfExtractDP_AD"
                },
                {
                    "id": "#post_variant_processing.cwl/vcftools_filter_cwl",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/vcftools_filter_cwl/vcf",
                            "source": [
                                "#post_variant_processing.cwl/vcfextractdp_ad_py_cwl_1/vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/vcftools_filter_cwl/somatic.vcf"
                        }
                    ],
                    "run": "#vcftools_filter.cwl",
                    "label": "vcftools_filter"
                },
                {
                    "id": "#post_variant_processing.cwl/combinevariants_cwl",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/combinevariants_cwl/reference.assembly",
                            "source": [
                                "#post_variant_processing.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/combinevariants_cwl/indelocator.vcf",
                            "source": [
                                "#post_variant_processing.cwl/vcftools_filter_cwl_2/somatic.vcf"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/combinevariants_cwl/mutect.vcf",
                            "source": [
                                "#post_variant_processing.cwl/vcftools_filter_cwl_1/somatic.vcf"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/combinevariants_cwl/varscan.vcf",
                            "source": [
                                "#post_variant_processing.cwl/vcftools_filter_cwl/somatic.vcf"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/combinevariants_cwl/ugSomatic.vcf",
                            "source": [
                                "#post_variant_processing.cwl/vcfextractdp_ad_py_cwl/vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/combinevariants_cwl/T-N-combined.vcf"
                        }
                    ],
                    "run": "#combinevariants.cwl",
                    "label": "combineVariants"
                },
                {
                    "id": "#post_variant_processing.cwl/vcfextractdp_ad_py_cwl_2",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/vcfextractdp_ad_py_cwl_2/combined.vcf",
                            "source": [
                                "#post_variant_processing.cwl/indelocator.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/vcfextractdp_ad_py_cwl_2/vcf"
                        }
                    ],
                    "run": "#vcfextractdp_ad-py.cwl",
                    "label": "vcfExtractDP_AD"
                },
                {
                    "id": "#post_variant_processing.cwl/vcftools_filter_cwl_1",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/vcftools_filter_cwl_1/vcf",
                            "source": [
                                "#post_variant_processing.cwl/vcfextractdp_ad_py_cwl_2/vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/vcftools_filter_cwl_1/somatic.vcf"
                        }
                    ],
                    "run": "#vcftools_filter.cwl",
                    "label": "vcftools_filter"
                },
                {
                    "id": "#post_variant_processing.cwl/vcftools_filter_cwl_2",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/vcftools_filter_cwl_2/vcf",
                            "source": [
                                "#post_variant_processing.cwl/vcfextractdp_ad_py_cwl_3/vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/vcftools_filter_cwl_2/somatic.vcf"
                        }
                    ],
                    "run": "#vcftools_filter.cwl",
                    "label": "vcftools_filter"
                },
                {
                    "id": "#post_variant_processing.cwl/vcfextractdp_ad_py_cwl_3",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/vcfextractdp_ad_py_cwl_3/combined.vcf",
                            "source": [
                                "#post_variant_processing.cwl/combined.vcf_1"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/vcfextractdp_ad_py_cwl_3/vcf"
                        }
                    ],
                    "run": "#vcfextractdp_ad-py.cwl",
                    "label": "vcfExtractDP_AD"
                },
                {
                    "id": "#post_variant_processing.cwl/filtervcfbybed_cwl",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/filtervcfbybed_cwl/bed",
                            "source": [
                                "#post_variant_processing.cwl/bed_extended"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/filtervcfbybed_cwl/vcf",
                            "source": [
                                "#post_variant_processing.cwl/combinevariants_cwl/T-N-combined.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/filtervcfbybed_cwl/bed.filtered.vcf"
                        }
                    ],
                    "run": "#filtervcfbybed.cwl",
                    "label": "filterVcfByBed"
                },
                {
                    "id": "#post_variant_processing.cwl/somaticvcfaveragedpad_cwl",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/somaticvcfaveragedpad_cwl/tumour--normal_combined.bedFiltered.vcf",
                            "source": [
                                "#post_variant_processing.cwl/filtervcfbybed_cwl/bed.filtered.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/somaticvcfaveragedpad_cwl/tumour--normal_combined.bedFiltered.avgDpAd.vcf"
                        }
                    ],
                    "run": "#somaticvcfaveragedpad.cwl",
                    "label": "somaticVcfAverageDpAd"
                },
                {
                    "id": "#post_variant_processing.cwl/addbamstats_cwl_3",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/addbamstats_cwl_3/reference_assembly",
                            "source": [
                                "#post_variant_processing.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/addbamstats_cwl_3/VCF",
                            "source": [
                                "#post_variant_processing.cwl/somaticvcfaveragedpad_cwl/tumour--normal_combined.bedFiltered.avgDpAd.vcf"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/addbamstats_cwl_3/bam",
                            "source": [
                                "#post_variant_processing.cwl/tumour.bam"
                            ]
                        },
                        {
                            "id": "#post_variant_processing.cwl/addbamstats_cwl_3/bam2",
                            "source": [
                                "#post_variant_processing.cwl/normal.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/addbamstats_cwl_3/bamstats.vcf"
                        }
                    ],
                    "run": "#addbamstats.cwl",
                    "label": "addbamstats"
                },
                {
                    "id": "#post_variant_processing.cwl/remove_vcf_n_column_cwl",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/remove_vcf_n_column_cwl/vcf",
                            "source": [
                                "#post_variant_processing.cwl/addbamstats_cwl_3/bamstats.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/remove_vcf_n_column_cwl/rem.vcf"
                        }
                    ],
                    "run": "#remove_vcf_n_column.cwl",
                    "label": "remove_vcf_N_column"
                },
                {
                    "id": "#post_variant_processing.cwl/mp_splitallele_cwl_2",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/mp_splitallele_cwl_2/vcf",
                            "source": [
                                "#post_variant_processing.cwl/remove_vcf_n_column_cwl/rem.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/mp_splitallele_cwl_2/ma.vcf"
                        }
                    ],
                    "run": "#mp_splitallele.cwl",
                    "label": "mp_splitAllele"
                },
                {
                    "id": "#post_variant_processing.cwl/mp_normvcf_cwl_2",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/mp_normvcf_cwl_2/ma.vcf",
                            "source": [
                                "#post_variant_processing.cwl/mp_splitallele_cwl_2/ma.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/mp_normvcf_cwl_2/norm.vcf"
                        }
                    ],
                    "run": "#mp_normvcf.cwl",
                    "label": "mp_normVcf"
                },
                {
                    "id": "#post_variant_processing.cwl/mp_vcftotsv_somatic_cwl_2",
                    "in": [
                        {
                            "id": "#post_variant_processing.cwl/mp_vcftotsv_somatic_cwl_2/vcf",
                            "source": [
                                "#post_variant_processing.cwl/mp_normvcf_cwl_2/norm.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#post_variant_processing.cwl/mp_vcftotsv_somatic_cwl_2/tsv"
                        }
                    ],
                    "run": "#mp_vcftotsv_somatic.cwl",
                    "label": "mp_vcfToTsv_somatic"
                }
            ]
        },
        {
            "class": "Workflow",
            "id": "#read_alignment.cwl",
            "label": "read_alignment",
            "inputs": [
                {
                    "id": "#read_alignment.cwl/reverse_reads.gz",
                    "type": "File"
                },
                {
                    "id": "#read_alignment.cwl/forward_reads.gz",
                    "type": "File"
                },
                {
                    "id": "#read_alignment.cwl/reference_assembly.fasta",
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
                    "id": "#read_alignment.cwl/samtools_view_cwl",
                    "in": [
                        {
                            "id": "#read_alignment.cwl/samtools_view_cwl/sam1",
                            "source": [
                                "#read_alignment.cwl/bwa_mem/ref_aligned_sam"
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
                },
                {
                    "id": "#read_alignment.cwl/bwa_mem",
                    "in": [
                        {
                            "id": "#read_alignment.cwl/bwa_mem/forward_reads.gz",
                            "source": [
                                "#read_alignment.cwl/forward_reads.gz"
                            ]
                        },
                        {
                            "id": "#read_alignment.cwl/bwa_mem/reference_assembly.fasta",
                            "source": [
                                "#read_alignment.cwl/reference_assembly.fasta"
                            ]
                        },
                        {
                            "id": "#read_alignment.cwl/bwa_mem/reverse_reads.gz",
                            "source": [
                                "#read_alignment.cwl/reverse_reads.gz"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#read_alignment.cwl/bwa_mem/ref_aligned_sam"
                        }
                    ],
                    "run": "#bwa-mem.cwl",
                    "label": "mapping of forward and reverse reads to the reference assembly"
                }
            ]
        },
        {
            "class": "Workflow",
            "id": "#read_quality_assessment.cwl",
            "label": "read_quality_assessment",
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
                    "id": "#read_quality_assessment.cwl/reverse_reads",
                    "type": "File"
                },
                {
                    "id": "#read_quality_assessment.cwl/forward_reads",
                    "type": "File"
                }
            ],
            "outputs": [
                {
                    "id": "#read_quality_assessment.cwl/fastqc_report_reverse",
                    "outputSource": [
                        "#read_quality_assessment.cwl/fastq_qc_cwl/fastqc_report_reverse"
                    ],
                    "type": "File",
                    "label": "fastqc_report_reverse > bioinformatician"
                },
                {
                    "id": "#read_quality_assessment.cwl/fastqc_report_forward",
                    "outputSource": [
                        "#read_quality_assessment.cwl/fastq_qc_cwl/fastqc_report_forward"
                    ],
                    "type": "File",
                    "label": "fastqc_report_forward > bioinformatician"
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
                            "id": "#read_quality_assessment.cwl/fastq_qc_cwl/forward_reads",
                            "source": [
                                "#read_quality_assessment.cwl/forward_reads"
                            ]
                        },
                        {
                            "id": "#read_quality_assessment.cwl/fastq_qc_cwl/reverse_reads",
                            "source": [
                                "#read_quality_assessment.cwl/reverse_reads"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#read_quality_assessment.cwl/fastq_qc_cwl/fastqc_report_forward"
                        },
                        {
                            "id": "#read_quality_assessment.cwl/fastq_qc_cwl/fastqc_report_reverse"
                        },
                        {
                            "id": "#read_quality_assessment.cwl/fastq_qc_cwl/read1.fastqc.gz"
                        },
                        {
                            "id": "#read_quality_assessment.cwl/fastq_qc_cwl/read2.fastqc.gz"
                        }
                    ],
                    "run": "#fastq-qc.cwl"
                },
                {
                    "id": "#read_quality_assessment.cwl/cutadapt_cwl",
                    "in": [
                        {
                            "id": "#read_quality_assessment.cwl/cutadapt_cwl/read1.fastq.gz",
                            "source": [
                                "#read_quality_assessment.cwl/fastq_qc_cwl/read1.fastqc.gz"
                            ]
                        },
                        {
                            "id": "#read_quality_assessment.cwl/cutadapt_cwl/read2.fastq.gz",
                            "source": [
                                "#read_quality_assessment.cwl/fastq_qc_cwl/read2.fastqc.gz"
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
            "label": "seqliner-subworkflows",
            "inputs": [
                {
                    "id": "#main/reference_assembly.fasta",
                    "type": "File"
                },
                {
                    "id": "#main/reverse_reads",
                    "type": "File"
                },
                {
                    "id": "#main/forward_reads",
                    "type": "File"
                },
                {
                    "id": "#main/reverse_reads_1",
                    "type": "File"
                },
                {
                    "id": "#main/forward_reads_1",
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
                    "id": "#main/dbsnp_137.vcf",
                    "type": "File"
                },
                {
                    "id": "#main/cosmic_v54_120711",
                    "type": "File"
                },
                {
                    "id": "#main/target_sites",
                    "type": "File"
                },
                {
                    "id": "#main/bed_extended",
                    "type": "File"
                },
                {
                    "id": "#main/reference_assembly",
                    "type": "File"
                }
            ],
            "outputs": [
                {
                    "id": "#main/fastqc_report_reverse",
                    "outputSource": [
                        "#main/read_quality_assessment_cwl/fastqc_report_reverse"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/fastqc_report_forward",
                    "outputSource": [
                        "#main/read_quality_assessment_cwl/fastqc_report_forward"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/fastqc_report_reverse_1",
                    "outputSource": [
                        "#main/read_quality_assessment_cwl_1/fastqc_report_reverse"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/fastqc_report_forward_1",
                    "outputSource": [
                        "#main/read_quality_assessment_cwl_1/fastqc_report_forward"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/dedup_metrics",
                    "outputSource": [
                        "#main/picard_mark_duplicates_1/dedup_metrics"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/dedup_metrics_1",
                    "outputSource": [
                        "#main/picard_mark_duplicates/dedup_metrics"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/tumour_hc.tsv",
                    "outputSource": [
                        "#main/post_variant_processing_cwl/tumour_hc.tsv"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/normal_hc.tsv",
                    "outputSource": [
                        "#main/post_variant_processing_cwl/normal_hc.tsv"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/all_callers.tsv",
                    "outputSource": [
                        "#main/post_variant_processing_cwl/all_callers.tsv"
                    ],
                    "type": "File"
                }
            ],
            "steps": [
                {
                    "id": "#main/read_alignment_cwl",
                    "in": [
                        {
                            "id": "#main/read_alignment_cwl/reverse_reads.gz",
                            "source": [
                                "#main/read_quality_assessment_cwl/read2.clean.fastq.gz"
                            ]
                        },
                        {
                            "id": "#main/read_alignment_cwl/forward_reads.gz",
                            "source": [
                                "#main/read_quality_assessment_cwl/read1.clean.fastq.gz"
                            ]
                        },
                        {
                            "id": "#main/read_alignment_cwl/reference_assembly.fasta",
                            "source": [
                                "#main/reference_assembly.fasta"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/read_alignment_cwl/sorted.bam"
                        }
                    ],
                    "run": "#read_alignment.cwl",
                    "label": "read_alignment_tumour"
                },
                {
                    "id": "#main/read_quality_assessment_cwl",
                    "in": [
                        {
                            "id": "#main/read_quality_assessment_cwl/reverse_reads",
                            "source": [
                                "#main/reverse_reads_1"
                            ]
                        },
                        {
                            "id": "#main/read_quality_assessment_cwl/forward_reads",
                            "source": [
                                "#main/forward_reads_1"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/read_quality_assessment_cwl/fastqc_report_reverse"
                        },
                        {
                            "id": "#main/read_quality_assessment_cwl/fastqc_report_forward"
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
                    "id": "#main/post_alignment_processing_cwl",
                    "in": [
                        {
                            "id": "#main/post_alignment_processing_cwl/target_sites",
                            "source": [
                                "#main/target_sites"
                            ]
                        },
                        {
                            "id": "#main/post_alignment_processing_cwl/reference_assembly",
                            "source": [
                                "#main/reference_assembly.fasta"
                            ]
                        },
                        {
                            "id": "#main/post_alignment_processing_cwl/Mills_and_1000G_gold",
                            "source": [
                                "#main/Mills_and_1000G_gold"
                            ]
                        },
                        {
                            "id": "#main/post_alignment_processing_cwl/dbsnp_137.vcf",
                            "source": [
                                "#main/dbsnp_137.vcf"
                            ]
                        },
                        {
                            "id": "#main/post_alignment_processing_cwl/1000G_phase1.indels",
                            "source": [
                                "#main/1000G_phase1.indels"
                            ]
                        },
                        {
                            "id": "#main/post_alignment_processing_cwl/bam",
                            "source": [
                                "#main/mergebams_cwl/merged.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/post_alignment_processing_cwl/recalibrated_bam"
                        }
                    ],
                    "run": "#post_alignment_processing.cwl",
                    "label": "post_alignment_processing"
                },
                {
                    "id": "#main/variant_calling_cwl",
                    "in": [
                        {
                            "id": "#main/variant_calling_cwl/tumour.bam",
                            "source": [
                                "#main/splitsamfile_cwl/tumour.bam"
                            ]
                        },
                        {
                            "id": "#main/variant_calling_cwl/normal.bam",
                            "source": [
                                "#main/splitsamfile_cwl/normal.bam"
                            ]
                        },
                        {
                            "id": "#main/variant_calling_cwl/reference_assembly",
                            "source": [
                                "#main/reference_assembly.fasta"
                            ]
                        },
                        {
                            "id": "#main/variant_calling_cwl/target_sites",
                            "source": [
                                "#main/target_sites"
                            ]
                        },
                        {
                            "id": "#main/variant_calling_cwl/cosmic_v54_120711",
                            "source": [
                                "#main/cosmic_v54_120711"
                            ]
                        },
                        {
                            "id": "#main/variant_calling_cwl/dbsnp_137.vcf",
                            "source": [
                                "#main/dbsnp_137.vcf"
                            ]
                        },
                        {
                            "id": "#main/variant_calling_cwl/T-N_recal.bam",
                            "source": [
                                "#main/post_alignment_processing_cwl/recalibrated_bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/variant_calling_cwl/tumour.vcf"
                        },
                        {
                            "id": "#main/variant_calling_cwl/normal.vcf"
                        },
                        {
                            "id": "#main/variant_calling_cwl/T-N-mutect.vcf"
                        },
                        {
                            "id": "#main/variant_calling_cwl/tumour--normal_varscan_snv.vcf"
                        },
                        {
                            "id": "#main/variant_calling_cwl/tumour--normal_varscan_indel.vcf"
                        },
                        {
                            "id": "#main/variant_calling_cwl/indelocator.vcf"
                        },
                        {
                            "id": "#main/variant_calling_cwl/T-N_hc.vcf"
                        }
                    ],
                    "run": "#variant_calling.cwl",
                    "label": "variant_calling"
                },
                {
                    "id": "#main/read_alignment_cwl_1",
                    "in": [
                        {
                            "id": "#main/read_alignment_cwl_1/reverse_reads.gz",
                            "source": [
                                "#main/read_quality_assessment_cwl_1/read2.clean.fastq.gz"
                            ]
                        },
                        {
                            "id": "#main/read_alignment_cwl_1/forward_reads.gz",
                            "source": [
                                "#main/read_quality_assessment_cwl_1/read1.clean.fastq.gz"
                            ]
                        },
                        {
                            "id": "#main/read_alignment_cwl_1/reference_assembly.fasta",
                            "source": [
                                "#main/reference_assembly.fasta"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/read_alignment_cwl_1/sorted.bam"
                        }
                    ],
                    "run": "#read_alignment.cwl",
                    "label": "read_alignment_normal"
                },
                {
                    "id": "#main/read_quality_assessment_cwl_1",
                    "in": [
                        {
                            "id": "#main/read_quality_assessment_cwl_1/reverse_reads",
                            "source": [
                                "#main/reverse_reads"
                            ]
                        },
                        {
                            "id": "#main/read_quality_assessment_cwl_1/forward_reads",
                            "source": [
                                "#main/forward_reads"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/read_quality_assessment_cwl_1/fastqc_report_reverse"
                        },
                        {
                            "id": "#main/read_quality_assessment_cwl_1/fastqc_report_forward"
                        },
                        {
                            "id": "#main/read_quality_assessment_cwl_1/read2.clean.fastq.gz"
                        },
                        {
                            "id": "#main/read_quality_assessment_cwl_1/read1.clean.fastq.gz"
                        }
                    ],
                    "run": "#read_quality_assessment.cwl",
                    "label": "read_quality_assessment"
                },
                {
                    "id": "#main/post_variant_processing_cwl",
                    "in": [
                        {
                            "id": "#main/post_variant_processing_cwl/normal.bam",
                            "source": [
                                "#main/splitsamfile_cwl/normal.bam"
                            ]
                        },
                        {
                            "id": "#main/post_variant_processing_cwl/tumour.bam",
                            "source": [
                                "#main/splitsamfile_cwl/tumour.bam"
                            ]
                        },
                        {
                            "id": "#main/post_variant_processing_cwl/bam_2",
                            "source": [
                                "#main/post_alignment_processing_cwl/recalibrated_bam"
                            ]
                        },
                        {
                            "id": "#main/post_variant_processing_cwl/tumour.vcf",
                            "source": [
                                "#main/variant_calling_cwl/tumour.vcf"
                            ]
                        },
                        {
                            "id": "#main/post_variant_processing_cwl/normal.vcf",
                            "source": [
                                "#main/variant_calling_cwl/normal.vcf"
                            ]
                        },
                        {
                            "id": "#main/post_variant_processing_cwl/T-N.vcf",
                            "source": [
                                "#main/variant_calling_cwl/T-N_hc.vcf"
                            ]
                        },
                        {
                            "id": "#main/post_variant_processing_cwl/varscan.snp",
                            "source": [
                                "#main/variant_calling_cwl/tumour--normal_varscan_snv.vcf"
                            ]
                        },
                        {
                            "id": "#main/post_variant_processing_cwl/varscan.indel",
                            "source": [
                                "#main/variant_calling_cwl/tumour--normal_varscan_indel.vcf"
                            ]
                        },
                        {
                            "id": "#main/post_variant_processing_cwl/indelocator.vcf",
                            "source": [
                                "#main/variant_calling_cwl/indelocator.vcf"
                            ]
                        },
                        {
                            "id": "#main/post_variant_processing_cwl/combined.vcf_1",
                            "source": [
                                "#main/variant_calling_cwl/T-N-mutect.vcf"
                            ]
                        },
                        {
                            "id": "#main/post_variant_processing_cwl/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/post_variant_processing_cwl/bed_extended",
                            "source": [
                                "#main/bed_extended"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/post_variant_processing_cwl/tumour_hc.tsv"
                        },
                        {
                            "id": "#main/post_variant_processing_cwl/normal_hc.tsv"
                        },
                        {
                            "id": "#main/post_variant_processing_cwl/all_callers.tsv"
                        }
                    ],
                    "run": "#post_variant_processing.cwl",
                    "label": "post_variant_processing"
                },
                {
                    "id": "#main/mergebams_cwl",
                    "in": [
                        {
                            "id": "#main/mergebams_cwl/normal.sorted.bam",
                            "source": [
                                "#main/picard_mark_duplicates_1/deduped_bam"
                            ]
                        },
                        {
                            "id": "#main/mergebams_cwl/tumour.sorted.bam",
                            "source": [
                                "#main/picard_mark_duplicates/deduped_bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/mergebams_cwl/merged.bam"
                        }
                    ],
                    "run": "#mergebams.cwl",
                    "label": "mergeBams"
                },
                {
                    "id": "#main/picard_mark_duplicates",
                    "in": [
                        {
                            "id": "#main/picard_mark_duplicates/sorted_aligned_bam",
                            "source": [
                                "#main/read_alignment_cwl/sorted.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/picard_mark_duplicates/dedup_metrics"
                        },
                        {
                            "id": "#main/picard_mark_duplicates/deduped_bam"
                        }
                    ],
                    "run": "#picard_mark_duplicates.cwl",
                    "label": "identify and mark pcr duplicates."
                },
                {
                    "id": "#main/picard_mark_duplicates_1",
                    "in": [
                        {
                            "id": "#main/picard_mark_duplicates_1/sorted_aligned_bam",
                            "source": [
                                "#main/read_alignment_cwl_1/sorted.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/picard_mark_duplicates_1/dedup_metrics"
                        },
                        {
                            "id": "#main/picard_mark_duplicates_1/deduped_bam"
                        }
                    ],
                    "run": "#picard_mark_duplicates.cwl",
                    "label": "identify and mark pcr duplicates."
                },
                {
                    "id": "#main/splitsamfile_cwl",
                    "in": [
                        {
                            "id": "#main/splitsamfile_cwl/merged.bam",
                            "source": [
                                "#main/post_alignment_processing_cwl/recalibrated_bam"
                            ]
                        },
                        {
                            "id": "#main/splitsamfile_cwl/reference_assembly",
                            "source": [
                                "#main/reference_assembly.fasta"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/splitsamfile_cwl/tumour.bam"
                        },
                        {
                            "id": "#main/splitsamfile_cwl/normal.bam"
                        }
                    ],
                    "run": "#splitsamfile.cwl",
                    "label": "splitSamFile"
                }
            ]
        },
        {
            "class": "Workflow",
            "id": "#variant_calling.cwl",
            "label": "variant_calling",
            "inputs": [
                {
                    "id": "#variant_calling.cwl/tumour.bam",
                    "type": "File"
                },
                {
                    "id": "#variant_calling.cwl/normal.bam",
                    "type": "File"
                },
                {
                    "id": "#variant_calling.cwl/reference_assembly",
                    "type": "File"
                },
                {
                    "id": "#variant_calling.cwl/target_sites",
                    "type": "File"
                },
                {
                    "id": "#variant_calling.cwl/cosmic_v54_120711",
                    "type": "File"
                },
                {
                    "id": "#variant_calling.cwl/dbsnp_137.vcf",
                    "type": "File"
                },
                {
                    "id": "#variant_calling.cwl/T-N_recal.bam",
                    "type": "File"
                }
            ],
            "outputs": [
                {
                    "id": "#variant_calling.cwl/tumour.vcf",
                    "outputSource": [
                        "#variant_calling.cwl/gatk_haplotypecaller_cwl_2/hap.vcf"
                    ],
                    "type": "File"
                },
                {
                    "id": "#variant_calling.cwl/normal.vcf",
                    "outputSource": [
                        "#variant_calling.cwl/gatk_haplotypecaller_cwl_1/hap.vcf"
                    ],
                    "type": "File"
                },
                {
                    "id": "#variant_calling.cwl/T-N-mutect.vcf",
                    "outputSource": [
                        "#variant_calling.cwl/mutectv1_cwl/T-N-mutect.vcf"
                    ],
                    "type": "File"
                },
                {
                    "id": "#variant_calling.cwl/tumour--normal_varscan_snv.vcf",
                    "outputSource": [
                        "#variant_calling.cwl/varscan_cwl/tumour--normal_varscan_snv.vcf"
                    ],
                    "type": "File"
                },
                {
                    "id": "#variant_calling.cwl/tumour--normal_varscan_indel.vcf",
                    "outputSource": [
                        "#variant_calling.cwl/varscan_cwl/tumour--normal_varscan_indel.vcf"
                    ],
                    "type": "File"
                },
                {
                    "id": "#variant_calling.cwl/indelocator.vcf",
                    "outputSource": [
                        "#variant_calling.cwl/gatk_indellocator_cwl/output"
                    ],
                    "type": "File"
                },
                {
                    "id": "#variant_calling.cwl/T-N_hc.vcf",
                    "outputSource": [
                        "#variant_calling.cwl/gatk_haplotypecaller_cwl/hap.vcf"
                    ],
                    "type": "File"
                }
            ],
            "steps": [
                {
                    "id": "#variant_calling.cwl/samtools_mpileup_cwl",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/samtools_mpileup_cwl/bam",
                            "source": [
                                "#variant_calling.cwl/normal.bam"
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
                    "id": "#variant_calling.cwl/mutectv1_cwl",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/mutectv1_cwl/bed",
                            "source": [
                                "#variant_calling.cwl/target_sites"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/mutectv1_cwl/reference_assembly",
                            "source": [
                                "#variant_calling.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/mutectv1_cwl/dbsnp_137.vcf",
                            "source": [
                                "#variant_calling.cwl/dbsnp_137.vcf"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/mutectv1_cwl/cosmic_v54_120711",
                            "source": [
                                "#variant_calling.cwl/cosmic_v54_120711"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/mutectv1_cwl/normal.bam",
                            "source": [
                                "#variant_calling.cwl/normal.bam"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/mutectv1_cwl/tumour.bam",
                            "source": [
                                "#variant_calling.cwl/tumour.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/mutectv1_cwl/T-N-mutect.vcf"
                        }
                    ],
                    "run": "#mutectv1.cwl",
                    "label": "mutectv1"
                },
                {
                    "id": "#variant_calling.cwl/gatk_indellocator_cwl",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/gatk_indellocator_cwl/bed",
                            "source": [
                                "#variant_calling.cwl/target_sites"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_indellocator_cwl/reference.assembly",
                            "source": [
                                "#variant_calling.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_indellocator_cwl/normal.bam",
                            "source": [
                                "#variant_calling.cwl/normal.bam"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_indellocator_cwl/tumour.bam",
                            "source": [
                                "#variant_calling.cwl/tumour.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/gatk_indellocator_cwl/output"
                        }
                    ],
                    "run": "#gatk_indellocator.cwl",
                    "label": "gatk_indellocator"
                },
                {
                    "id": "#variant_calling.cwl/samtools_mpileup_cwl_1",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/samtools_mpileup_cwl_1/bam",
                            "source": [
                                "#variant_calling.cwl/tumour.bam"
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
                    "id": "#variant_calling.cwl/gatk_haplotypecaller_cwl_1",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/gatk_haplotypecaller_cwl_1/target_sites",
                            "source": [
                                "#variant_calling.cwl/target_sites"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_haplotypecaller_cwl_1/reference_assembly",
                            "source": [
                                "#variant_calling.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_haplotypecaller_cwl_1/bam",
                            "source": [
                                "#variant_calling.cwl/normal.bam"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_haplotypecaller_cwl_1/bam2",
                            "source": [
                                "#variant_calling.cwl/normal.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/gatk_haplotypecaller_cwl_1/hap.vcf"
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_haplotypecaller_cwl_1/output"
                        }
                    ],
                    "run": "#gatk_haplotypecaller.cwl",
                    "label": "gatk_haplotypecaller"
                },
                {
                    "id": "#variant_calling.cwl/gatk_haplotypecaller_cwl",
                    "in": [
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
                            "id": "#variant_calling.cwl/gatk_haplotypecaller_cwl/bam2",
                            "source": [
                                "#variant_calling.cwl/T-N_recal.bam"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_haplotypecaller_cwl/bam",
                            "source": [
                                "#variant_calling.cwl/T-N_recal.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/gatk_haplotypecaller_cwl/hap.vcf"
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_haplotypecaller_cwl/output"
                        }
                    ],
                    "run": "#gatk_haplotypecaller.cwl",
                    "label": "gatk_haplotypecaller"
                },
                {
                    "id": "#variant_calling.cwl/gatk_haplotypecaller_cwl_2",
                    "in": [
                        {
                            "id": "#variant_calling.cwl/gatk_haplotypecaller_cwl_2/bam",
                            "source": [
                                "#variant_calling.cwl/tumour.bam"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_haplotypecaller_cwl_2/bam2",
                            "source": [
                                "#variant_calling.cwl/tumour.bam"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_haplotypecaller_cwl_2/target_sites",
                            "source": [
                                "#variant_calling.cwl/target_sites"
                            ]
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_haplotypecaller_cwl_2/reference_assembly",
                            "source": [
                                "#variant_calling.cwl/reference_assembly"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#variant_calling.cwl/gatk_haplotypecaller_cwl_2/hap.vcf"
                        },
                        {
                            "id": "#variant_calling.cwl/gatk_haplotypecaller_cwl_2/output"
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