"use strict";
 const input_workflow =
{
    "$graph": [
        {
            "class": "CommandLineTool",
            "id": "#annotatevcf.cwl",
            "baseCommand": [
                "AnnotateVCF.exe",
                ">",
                "vep_72"
            ],
            "inputs": [
                {
                    "id": "#annotatevcf.cwl/vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#annotatevcf.cwl/vep_cache_72",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#annotatevcf.cwl/anno.vcf",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "doc": "version 72.5. refseq",
            "label": "Illumina annotation service",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "--source",
                    "valueFrom": "=refseq"
                },
                {
                    "position": 0,
                    "prefix": "--version",
                    "valueFrom": "=72.5"
                },
                {
                    "position": 0,
                    "prefix": "--skip",
                    "valueFrom": "=\"OffTarget\""
                },
                {
                    "position": 0,
                    "prefix": "-annotation",
                    "valueFrom": "CSQT"
                },
                {
                    "position": 0,
                    "prefix": "-annotation",
                    "valueFrom": "CSQR"
                },
                {
                    "position": 0,
                    "prefix": "---GMAF"
                },
                {
                    "position": 0,
                    "prefix": "---EVS"
                },
                {
                    "position": 0,
                    "prefix": "---cosmic"
                },
                {
                    "position": 0,
                    "prefix": "---clinvar"
                },
                {
                    "position": 0,
                    "prefix": "---phastCons"
                },
                {
                    "position": 0,
                    "prefix": "---AF"
                },
                {
                    "position": 0,
                    "prefix": "---AA"
                },
                {
                    "position": 0,
                    "prefix": "---canonical-only"
                }
            ]
        },
        {
            "class": "CommandLineTool",
            "id": "#bamstats.cwl",
            "baseCommand": [
                "bamstats.exe"
            ],
            "inputs": [
                {
                    "id": "#bamstats.cwl/chr.bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#bamstats.cwl/enrichmentStatistics.xml",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "BamStats"
        },
        {
            "class": "CommandLineTool",
            "id": "#basespace.cwl",
            "baseCommand": [],
            "inputs": [
                {
                    "id": "#basespace.cwl/read1.fastqz.gz",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#basespace.cwl/read2.fastqz.gz",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#basespace.cwl/output",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#basespace.cwl/output_1",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "basespace"
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
                    "id": "#bwa-mem.cwl/read1.fastq.gz",
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
                    "id": "#bwa-mem.cwl/read2.fastq.gz",
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
                    "prefix": "-b"
                },
                {
                    "position": 0,
                    "prefix": "-M"
                },
                {
                    "position": 0,
                    "prefix": "-t",
                    "valueFrom": "8"
                },
                {
                    "position": 0,
                    "prefix": "-R"
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
            "id": "#cartagenia.cwl",
            "baseCommand": [],
            "inputs": [
                {
                    "id": "#cartagenia.cwl/vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#cartagenia.cwl/report",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "Cartagenia"
        },
        {
            "class": "CommandLineTool",
            "id": "#extractunalignedreads.cwl",
            "baseCommand": [],
            "inputs": [
                {
                    "id": "#extractunalignedreads.cwl/bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#extractunalignedreads.cwl/output",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "ExtractUnalignedReads"
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
            "id": "#gap_report.cwl",
            "baseCommand": [],
            "inputs": [
                {
                    "id": "#gap_report.cwl/input",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#gap_report.cwl/gap_report.xls",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "gap_report"
        },
        {
            "class": "CommandLineTool",
            "id": "#gatk_genotypegvcf.cwl",
            "baseCommand": [
                "-jar",
                "GenomeAnalysisTK.jar",
                "-T",
                "genotyeGVCF"
            ],
            "inputs": [
                {
                    "id": "#gatk_genotypegvcf.cwl/reference_assembly",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_genotypegvcf.cwl/bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#gatk_genotypegvcf.cwl/vcf",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "gatk_genotypeGVCF",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "--no-default-filters"
                },
                {
                    "position": 0,
                    "prefix": "--min-qd",
                    "valueFrom": "2.0000"
                },
                {
                    "position": 0,
                    "prefix": "--min-gqx",
                    "valueFrom": "30.0000"
                },
                {
                    "position": 0,
                    "prefix": "--min-mq",
                    "valueFrom": "20.0000"
                },
                {
                    "position": 0,
                    "prefix": "--skip-header"
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
                    "id": "#gatk_indelRealigner.cwl/chr.intervals",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#gatk_indelRealigner.cwl/chr.deduped_realigned_bam",
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
                    "id": "#gatk_realignerTargetCreator.cwl/chr.intervals",
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
                    "id": "#gatk_unifiedgenotyper.cwl/realigned.bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_unifiedgenotyper.cwl/Segment_intervals",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#gatk_unifiedgenotyper.cwl/ug.bam",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "gatk_unifiedGenotyper",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "-glm",
                    "valueFrom": "BOTH"
                },
                {
                    "position": 0,
                    "prefix": "-gvcf"
                },
                {
                    "position": 0,
                    "prefix": "-stand_call_conf",
                    "valueFrom": "1"
                },
                {
                    "position": 0,
                    "prefix": "-et",
                    "valueFrom": "NO_ET"
                },
                {
                    "position": 0,
                    "prefix": "-dcov",
                    "valueFrom": "5000"
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
            "id": "#samtools-merge.cwl",
            "baseCommand": [
                "samtools",
                "merge"
            ],
            "inputs": [
                {
                    "id": "#samtools-merge.cwl/lane_sorted.bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#samtools-merge.cwl/merged.bam",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "samtools-merge"
        },
        {
            "class": "CommandLineTool",
            "id": "#samtools-sort.cwl",
            "baseCommand": [
                "samtools",
                "sort"
            ],
            "inputs": [
                {
                    "id": "#samtools-sort.cwl/aligned.sam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#samtools-sort.cwl/sorted.bam",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "samtools-sort"
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
            "label": "pathwest-main-workflow",
            "inputs": [
                {
                    "id": "#main/read2.fastqz.gz",
                    "type": "File"
                },
                {
                    "id": "#main/read1.fastqz.gz",
                    "type": "File"
                },
                {
                    "id": "#main/reference_assembly",
                    "type": "File"
                },
                {
                    "id": "#main/chr.intervals",
                    "type": "File"
                },
                {
                    "id": "#main/Segment_intervals",
                    "type": "File"
                },
                {
                    "id": "#main/vep_cache_72",
                    "type": "File"
                }
            ],
            "outputs": [
                {
                    "id": "#main/fastqc_report_read2",
                    "outputSource": [
                        "#main/fastq_qc_cwl/fastqc_report_read2"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/fastqc_report_read1",
                    "outputSource": [
                        "#main/fastq_qc_cwl/fastqc_report_read1"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/output",
                    "outputSource": [
                        "#main/extractunalignedreads_cwl/output"
                    ],
                    "type": "File",
                    "label": "unaligned.reads"
                },
                {
                    "id": "#main/dedup_metrics",
                    "outputSource": [
                        "#main/picard_mark_duplicates/dedup_metrics"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/enrichmentStatistics.xml",
                    "outputSource": [
                        "#main/bamstats_cwl/enrichmentStatistics.xml"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/gap_report.xls",
                    "outputSource": [
                        "#main/gap_report_cwl/gap_report.xls"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/report",
                    "outputSource": [
                        "#main/cartagenia_cwl/report"
                    ],
                    "type": "File"
                }
            ],
            "steps": [
                {
                    "id": "#main/bwa_mem",
                    "in": [
                        {
                            "id": "#main/bwa_mem/read1.fastq.gz",
                            "source": [
                                "#main/basespace_cwl/output"
                            ]
                        },
                        {
                            "id": "#main/bwa_mem/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/bwa_mem/read2.fastq.gz",
                            "source": [
                                "#main/basespace_cwl/output_1"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/bwa_mem/ref_aligned_bam"
                        }
                    ],
                    "run": "#bwa-mem.cwl",
                    "label": "bwa_mem"
                },
                {
                    "id": "#main/basespace_cwl",
                    "in": [
                        {
                            "id": "#main/basespace_cwl/read1.fastqz.gz",
                            "source": [
                                "#main/read1.fastqz.gz"
                            ]
                        },
                        {
                            "id": "#main/basespace_cwl/read2.fastqz.gz",
                            "source": [
                                "#main/read2.fastqz.gz"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/basespace_cwl/output"
                        },
                        {
                            "id": "#main/basespace_cwl/output_1"
                        }
                    ],
                    "run": "#basespace.cwl",
                    "label": "basespace >"
                },
                {
                    "id": "#main/fastq_qc_cwl",
                    "in": [
                        {
                            "id": "#main/fastq_qc_cwl/read1_reads",
                            "source": [
                                "#main/basespace_cwl/output"
                            ]
                        },
                        {
                            "id": "#main/fastq_qc_cwl/read2_reads",
                            "source": [
                                "#main/basespace_cwl/output_1"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/fastq_qc_cwl/fastqc_report_read1"
                        },
                        {
                            "id": "#main/fastq_qc_cwl/fastqc_report_read2"
                        }
                    ],
                    "run": "#fastq-qc.cwl",
                    "label": "fastq_qc_cwl"
                },
                {
                    "id": "#main/samtools_sort_cwl",
                    "in": [
                        {
                            "id": "#main/samtools_sort_cwl/aligned.sam",
                            "source": [
                                "#main/bwa_mem/ref_aligned_bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/samtools_sort_cwl/sorted.bam"
                        }
                    ],
                    "run": "#samtools-sort.cwl",
                    "label": "samtools-sort"
                },
                {
                    "id": "#main/samtools_merge_cwl",
                    "in": [
                        {
                            "id": "#main/samtools_merge_cwl/lane_sorted.bam",
                            "source": [
                                "#main/samtools_sort_cwl/sorted.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/samtools_merge_cwl/merged.bam"
                        }
                    ],
                    "run": "#samtools-merge.cwl",
                    "label": "samtools-merge"
                },
                {
                    "id": "#main/extractunalignedreads_cwl",
                    "in": [
                        {
                            "id": "#main/extractunalignedreads_cwl/bam",
                            "source": [
                                "#main/picard_mark_duplicates/deduped_bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/extractunalignedreads_cwl/output"
                        }
                    ],
                    "run": "#extractunalignedreads.cwl",
                    "label": "extractUnalignedReads"
                },
                {
                    "id": "#main/gatk_indel_realigner",
                    "in": [
                        {
                            "id": "#main/gatk_indel_realigner/bam",
                            "source": [
                                "#main/picard_mark_duplicates/deduped_bam"
                            ]
                        },
                        {
                            "id": "#main/gatk_indel_realigner/interval_list",
                            "source": [
                                "#main/gatk_realigner_target_creator/realigned_intervals"
                            ]
                        },
                        {
                            "id": "#main/gatk_indel_realigner/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/gatk_indel_realigner/chr.intervals",
                            "source": [
                                "#main/chr.intervals"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/gatk_indel_realigner/chr.deduped_realigned_bam"
                        }
                    ],
                    "run": "#gatk_indelRealigner.cwl",
                    "label": "gatk_indel_realigner"
                },
                {
                    "id": "#main/gatk_realigner_target_creator",
                    "in": [
                        {
                            "id": "#main/gatk_realigner_target_creator/bam",
                            "source": [
                                "#main/picard_mark_duplicates/deduped_bam"
                            ]
                        },
                        {
                            "id": "#main/gatk_realigner_target_creator/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/gatk_realigner_target_creator/chr.intervals",
                            "source": [
                                "#main/chr.intervals"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/gatk_realigner_target_creator/realigned_intervals"
                        }
                    ],
                    "run": "#gatk_realignerTargetCreator.cwl",
                    "label": "gatk_realigner_target_creator"
                },
                {
                    "id": "#main/picard_mark_duplicates",
                    "in": [
                        {
                            "id": "#main/picard_mark_duplicates/sorted_aligned_bam",
                            "source": [
                                "#main/samtools_merge_cwl/merged.bam"
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
                    "id": "#main/gatk_unifiedgenotyper_cwl",
                    "in": [
                        {
                            "id": "#main/gatk_unifiedgenotyper_cwl/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/gatk_unifiedgenotyper_cwl/realigned.bam",
                            "source": [
                                "#main/gatk_indel_realigner/chr.deduped_realigned_bam"
                            ]
                        },
                        {
                            "id": "#main/gatk_unifiedgenotyper_cwl/Segment_intervals",
                            "source": [
                                "#main/Segment_intervals"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/gatk_unifiedgenotyper_cwl/ug.bam"
                        }
                    ],
                    "run": "#gatk_unifiedgenotyper.cwl",
                    "label": "gatk_unifiedGenotyper"
                },
                {
                    "id": "#main/gatk_genotypegvcf_cwl",
                    "in": [
                        {
                            "id": "#main/gatk_genotypegvcf_cwl/bam",
                            "source": [
                                "#main/gatk_unifiedgenotyper_cwl/ug.bam"
                            ]
                        },
                        {
                            "id": "#main/gatk_genotypegvcf_cwl/reference_assembly",
                            "source": [
                                "#main/gatk_unifiedgenotyper_cwl/ug.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/gatk_genotypegvcf_cwl/vcf"
                        }
                    ],
                    "run": "#gatk_genotypegvcf.cwl",
                    "label": "gatk_genotypeGVCF"
                },
                {
                    "id": "#main/annotatevcf_cwl",
                    "in": [
                        {
                            "id": "#main/annotatevcf_cwl/vcf",
                            "source": [
                                "#main/gatk_genotypegvcf_cwl/vcf"
                            ]
                        },
                        {
                            "id": "#main/annotatevcf_cwl/vep_cache_72",
                            "source": [
                                "#main/vep_cache_72"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/annotatevcf_cwl/anno.vcf"
                        }
                    ],
                    "run": "#annotatevcf.cwl",
                    "label": "AnnotateVCF"
                },
                {
                    "id": "#main/bamstats_cwl",
                    "in": [
                        {
                            "id": "#main/bamstats_cwl/chr.bam",
                            "source": [
                                "#main/gatk_indel_realigner/chr.deduped_realigned_bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/bamstats_cwl/enrichmentStatistics.xml"
                        }
                    ],
                    "run": "#bamstats.cwl",
                    "label": "BamStats"
                },
                {
                    "id": "#main/gap_report_cwl",
                    "in": [
                        {
                            "id": "#main/gap_report_cwl/input",
                            "source": [
                                "#main/bamstats_cwl/enrichmentStatistics.xml"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/gap_report_cwl/gap_report.xls"
                        }
                    ],
                    "run": "#gap_report.cwl",
                    "label": "gap_report"
                },
                {
                    "id": "#main/cartagenia_cwl",
                    "in": [
                        {
                            "id": "#main/cartagenia_cwl/vcf",
                            "source": [
                                "#main/annotatevcf_cwl/anno.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/cartagenia_cwl/report"
                        }
                    ],
                    "run": "#cartagenia.cwl",
                    "label": "Cartagenia"
                }
            ]
        }
    ],
    "cwlVersion": "v1.0"
}