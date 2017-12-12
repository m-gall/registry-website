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
                    "id": "#bwa-mem.cwl/forward_reads.fq",
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
                    "id": "#bwa-mem.cwl/reverse_reads.fq",
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
                },
                {
                    "id": "#gatk_haplotypecaller.cwl/dbsnp_142",
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
                "-T",
                "SelectVariants"
            ],
            "inputs": [
                {
                    "format": "http://edamontology.org/format_3016# vcf",
                    "id": "#gatk_select.cwl/variants.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0,
                        "valueFrom": "/vcf/raw_variants_g_gvcf"
                    }
                },
                {
                    "format": "http://edamontology.org/format_1929",
                    "id": "#gatk_select.cwl/reference_assembly",
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
                    "id": "#gatk_select.cwl/select_variants.vcf",
                    "type": "File",
                    "outputBinding": {},
                    "format": null
                }
            ],
            "arguments": [
                {
                    "position": 0,
                    "prefix": "interval_padding"
                },
                {
                    "position": 0,
                    "prefix": "-select_type_to_include",
                    "valueFrom": "indel"
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
            "id": "#gatk_select.cwl"
        },
        {
            "class": "CommandLineTool",
            "id": "#picard-mergesamfiles.cwl",
            "baseCommand": [
                "java",
                "-jar",
                "picard.jar",
                "MergeSamFiles"
            ],
            "inputs": [
                {
                    "id": "#picard-mergesamfiles.cwl/bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#picard-mergesamfiles.cwl/merged.bam",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "picard-mergeSamFiles"
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
                },
                {
                    "id": "#picard_mark_duplicates.cwl/sorted_aligned_bam.ai",
                    "type": [
                        "null",
                        "File"
                    ],
                    "inputBinding": {
                        "position": 0
                    }
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
            "id": "#q3indel.cwl",
            "baseCommand": [],
            "inputs": [
                {
                    "id": "#q3indel.cwl/hc.indel.normal",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#q3indel.cwl/hc.indel.tumour",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#q3indel.cwl/vcf",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "q3indel"
        },
        {
            "class": "CommandLineTool",
            "id": "#qannotate.cwl",
            "baseCommand": [],
            "inputs": [
                {
                    "id": "#qannotate.cwl/gatk-qsnp-somatic.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#qannotate.cwl/gatk-qsnp-normal.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#qannotate.cwl/somatic-calls.vcf",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "qannotate"
        },
        {
            "class": "CommandLineTool",
            "id": "#qcoverage.cwl",
            "baseCommand": [
                "java",
                "-jar",
                "qcoverage.jar"
            ],
            "inputs": [
                {
                    "id": "#qcoverage.cwl/bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#qcoverage.cwl/genomics.features.gff",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    },
                    "doc": "Features classified as bait, fill, shoulder regions.\n\nBait - library capture sites.\nFIll - sequences nowhere near the targets.\nTarget - defined by the pipeline.\nShoulder - region around the target - shoulder"
                },
                {
                    "id": "#qcoverage.cwl/bed",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#qcoverage.cwl/report.txt",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#qcoverage.cwl/coverage.vcf",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#qcoverage.cwl/report.xml",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "qcoverage",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "-t",
                    "valueFrom": "seq"
                },
                {
                    "position": 0,
                    "prefix": "--per-feature"
                },
                {
                    "position": 0,
                    "prefix": "--gff3",
                    "valueFrom": "GRCh37.gff3"
                }
            ]
        },
        {
            "class": "CommandLineTool",
            "id": "#qmerge.cwl",
            "baseCommand": [],
            "inputs": [
                {
                    "id": "#qmerge.cwl/bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#qmerge.cwl/merged.bam",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "qmerge"
        },
        {
            "class": "CommandLineTool",
            "id": "#qprofiler.cwl",
            "baseCommand": [],
            "inputs": [
                {
                    "id": "#qprofiler.cwl/input",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#qprofiler.cwl/qprofiler_xml",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "qprofiler"
        },
        {
            "class": "CommandLineTool",
            "id": "#qvisualise.cwl",
            "baseCommand": [],
            "inputs": [
                {
                    "id": "#qvisualise.cwl/qvisual_xml",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#qvisualise.cwl/report.html",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "qvisualise"
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
            "id": "#samtools-sort.cwl",
            "baseCommand": [
                "samtools",
                "sort"
            ],
            "inputs": [
                {
                    "id": "#samtools-sort.cwl/dedup.aligned.bam",
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
                    "id": "#samtools-view.cwl/bam",
                    "type": "File",
                    "outputBinding": {},
                    "label": "samtools-view"
                }
            ],
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
            "id": "#qimr-somatic-normal.cwl",
            "label": "QIMR-somatic-normal",
            "inputs": [
                {
                    "id": "#qimr-somatic-normal.cwl/reference_assembly",
                    "type": "File"
                },
                {
                    "id": "#qimr-somatic-normal.cwl/bcl2",
                    "type": "File"
                },
                {
                    "id": "#qimr-somatic-normal.cwl/bcl1",
                    "type": "File"
                },
                {
                    "id": "#qimr-somatic-normal.cwl/genomics.features.gff",
                    "type": "File"
                },
                {
                    "id": "#qimr-somatic-normal.cwl/bed",
                    "type": "File"
                },
                {
                    "id": "#qimr-somatic-normal.cwl/dbsnp_142",
                    "type": "File"
                }
            ],
            "outputs": [
                {
                    "id": "#qimr-somatic-normal.cwl/samplesheet.csv",
                    "outputSource": [
                        "#qimr-somatic-normal.cwl/bcl2fastq_cwl/samplesheet.csv"
                    ],
                    "type": "File"
                },
                {
                    "id": "#qimr-somatic-normal.cwl/dedup_metrics",
                    "outputSource": [
                        "#qimr-somatic-normal.cwl/picard_mark_duplicates/dedup_metrics"
                    ],
                    "type": "File"
                },
                {
                    "id": "#qimr-somatic-normal.cwl/select_variants.vcf",
                    "outputSource": [
                        "#qimr-somatic-normal.cwl/gatk_select/select_variants.vcf"
                    ],
                    "type": "File"
                },
                {
                    "id": "#qimr-somatic-normal.cwl/fastq-r1-report.html",
                    "outputSource": [
                        "#qimr-somatic-normal.cwl/qvisualise_cwl/report.html"
                    ],
                    "type": "File",
                    "label": "fastq-r1-report.html"
                },
                {
                    "id": "#qimr-somatic-normal.cwl/samblaster.report.html",
                    "outputSource": [
                        "#qimr-somatic-normal.cwl/qvisualise_cwl_1/report.html"
                    ],
                    "type": "File",
                    "label": "samblaster-report.html"
                },
                {
                    "id": "#qimr-somatic-normal.cwl/fastq-r2-report.html",
                    "outputSource": [
                        "#qimr-somatic-normal.cwl/qvisualise_cwl_4/report.html"
                    ],
                    "type": "File",
                    "label": "fastq-r2-report.html"
                },
                {
                    "id": "#qimr-somatic-normal.cwl/merge-library-report.html",
                    "outputSource": [
                        "#qimr-somatic-normal.cwl/qvisualise_cwl_3/report.html"
                    ],
                    "type": "File"
                },
                {
                    "id": "#qimr-somatic-normal.cwl/coverage-report.xml",
                    "outputSource": [
                        "#qimr-somatic-normal.cwl/qcoverage_cwl/report.xml"
                    ],
                    "type": "File"
                },
                {
                    "id": "#qimr-somatic-normal.cwl/coverage-report.txt",
                    "outputSource": [
                        "#qimr-somatic-normal.cwl/qcoverage_cwl/report.txt"
                    ],
                    "type": "File"
                },
                {
                    "id": "#qimr-somatic-normal.cwl/coverage.vcf",
                    "outputSource": [
                        "#qimr-somatic-normal.cwl/qcoverage_cwl/coverage.vcf"
                    ],
                    "type": "File"
                },
                {
                    "id": "#qimr-somatic-normal.cwl/hap.vcf",
                    "outputSource": [
                        "#qimr-somatic-normal.cwl/gatk_haplotypecaller_cwl/hap.vcf"
                    ],
                    "type": "File"
                }
            ],
            "steps": [
                {
                    "id": "#qimr-somatic-normal.cwl/bcl2fastq_cwl",
                    "in": [
                        {
                            "id": "#qimr-somatic-normal.cwl/bcl2fastq_cwl/bcl1",
                            "source": [
                                "#qimr-somatic-normal.cwl/bcl1"
                            ]
                        },
                        {
                            "id": "#qimr-somatic-normal.cwl/bcl2fastq_cwl/bcl2",
                            "source": [
                                "#qimr-somatic-normal.cwl/bcl2"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-normal.cwl/bcl2fastq_cwl/fastq1.gz"
                        },
                        {
                            "id": "#qimr-somatic-normal.cwl/bcl2fastq_cwl/fastq2.gz"
                        },
                        {
                            "id": "#qimr-somatic-normal.cwl/bcl2fastq_cwl/samplesheet.csv"
                        }
                    ],
                    "run": "#bcl2fastq.cwl",
                    "label": "bcl2fastq"
                },
                {
                    "id": "#qimr-somatic-normal.cwl/cutadapt_cwl",
                    "in": [
                        {
                            "id": "#qimr-somatic-normal.cwl/cutadapt_cwl/read1.fastq.gz",
                            "source": [
                                "#qimr-somatic-normal.cwl/bcl2fastq_cwl/fastq1.gz"
                            ]
                        },
                        {
                            "id": "#qimr-somatic-normal.cwl/cutadapt_cwl/read2.fastq.gz",
                            "source": [
                                "#qimr-somatic-normal.cwl/bcl2fastq_cwl/fastq2.gz"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-normal.cwl/cutadapt_cwl/read1.clean.fastq.gz"
                        },
                        {
                            "id": "#qimr-somatic-normal.cwl/cutadapt_cwl/read2.clean.fastq.gz"
                        }
                    ],
                    "run": "#cutadapt.cwl",
                    "label": "cutadapt"
                },
                {
                    "id": "#qimr-somatic-normal.cwl/qvisualise_cwl",
                    "in": [
                        {
                            "id": "#qimr-somatic-normal.cwl/qvisualise_cwl/qvisual_xml",
                            "source": [
                                "#qimr-somatic-normal.cwl/qprofiler_cwl/qprofiler_xml"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-normal.cwl/qvisualise_cwl/report.html"
                        }
                    ],
                    "run": "#qvisualise.cwl",
                    "label": "qvisualise"
                },
                {
                    "id": "#qimr-somatic-normal.cwl/bwa_mem",
                    "in": [
                        {
                            "id": "#qimr-somatic-normal.cwl/bwa_mem/forward_reads.fq",
                            "source": [
                                "#qimr-somatic-normal.cwl/cutadapt_cwl/read1.clean.fastq.gz"
                            ]
                        },
                        {
                            "id": "#qimr-somatic-normal.cwl/bwa_mem/reference_assembly",
                            "source": [
                                "#qimr-somatic-normal.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#qimr-somatic-normal.cwl/bwa_mem/reverse_reads.fq",
                            "source": [
                                "#qimr-somatic-normal.cwl/cutadapt_cwl/read2.clean.fastq.gz"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-normal.cwl/bwa_mem/ref_aligned_sam"
                        }
                    ],
                    "run": "#bwa-mem.cwl",
                    "label": "bwa"
                },
                {
                    "id": "#qimr-somatic-normal.cwl/samblaster_cwl",
                    "in": [
                        {
                            "id": "#qimr-somatic-normal.cwl/samblaster_cwl/ref.aligned.sam",
                            "source": [
                                "#qimr-somatic-normal.cwl/bwa_mem/ref_aligned_sam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-normal.cwl/samblaster_cwl/dedup.sam"
                        }
                    ],
                    "run": "#samblaster.cwl",
                    "label": "samblaster",
                    "doc": "First deduplication step. At read group. Step mostly performed."
                },
                {
                    "id": "#qimr-somatic-normal.cwl/samtools_sort_cwl",
                    "in": [
                        {
                            "id": "#qimr-somatic-normal.cwl/samtools_sort_cwl/dedup.aligned.bam",
                            "source": [
                                "#qimr-somatic-normal.cwl/samtools_view_cwl/bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-normal.cwl/samtools_sort_cwl/sorted.bam"
                        }
                    ],
                    "run": "#samtools-sort.cwl",
                    "label": "samtools-sort"
                },
                {
                    "id": "#qimr-somatic-normal.cwl/samtools_view_cwl",
                    "in": [
                        {
                            "id": "#qimr-somatic-normal.cwl/samtools_view_cwl/sam",
                            "source": [
                                "#qimr-somatic-normal.cwl/samblaster_cwl/dedup.sam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-normal.cwl/samtools_view_cwl/bam"
                        }
                    ],
                    "run": "#samtools-view.cwl",
                    "label": "samtools-view"
                },
                {
                    "id": "#qimr-somatic-normal.cwl/picard_mergesamfiles_cwl",
                    "in": [
                        {
                            "id": "#qimr-somatic-normal.cwl/picard_mergesamfiles_cwl/bam",
                            "source": [
                                "#qimr-somatic-normal.cwl/samtools_sort_cwl/sorted.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-normal.cwl/picard_mergesamfiles_cwl/merged.bam"
                        }
                    ],
                    "run": "#picard-mergesamfiles.cwl",
                    "label": "read-group-merge (picard)",
                    "doc": "Merge flow-cell lanes for an individual."
                },
                {
                    "id": "#qimr-somatic-normal.cwl/picard_mark_duplicates",
                    "in": [
                        {
                            "id": "#qimr-somatic-normal.cwl/picard_mark_duplicates/sorted_aligned_bam",
                            "source": [
                                "#qimr-somatic-normal.cwl/picard_mergesamfiles_cwl/merged.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-normal.cwl/picard_mark_duplicates/dedup_metrics"
                        },
                        {
                            "id": "#qimr-somatic-normal.cwl/picard_mark_duplicates/deduped_bam"
                        }
                    ],
                    "run": "#picard_mark_duplicates.cwl",
                    "label": "picard_mark_duplicates"
                },
                {
                    "id": "#qimr-somatic-normal.cwl/qmerge_cwl",
                    "in": [
                        {
                            "id": "#qimr-somatic-normal.cwl/qmerge_cwl/bam",
                            "source": [
                                "#qimr-somatic-normal.cwl/picard_mark_duplicates/deduped_bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-normal.cwl/qmerge_cwl/merged.bam"
                        }
                    ],
                    "run": "#qmerge.cwl",
                    "label": "library-merge (qmerge)",
                    "doc": "Library emrge"
                },
                {
                    "id": "#qimr-somatic-normal.cwl/qvisualise_cwl_1",
                    "in": [
                        {
                            "id": "#qimr-somatic-normal.cwl/qvisualise_cwl_1/qvisual_xml",
                            "source": [
                                "#qimr-somatic-normal.cwl/qprofiler_cwl_1/qprofiler_xml"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-normal.cwl/qvisualise_cwl_1/report.html"
                        }
                    ],
                    "run": "#qvisualise.cwl",
                    "label": "qvisualise"
                },
                {
                    "id": "#qimr-somatic-normal.cwl/qprofiler_cwl",
                    "in": [
                        {
                            "id": "#qimr-somatic-normal.cwl/qprofiler_cwl/input",
                            "source": [
                                "#qimr-somatic-normal.cwl/cutadapt_cwl/read2.clean.fastq.gz"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-normal.cwl/qprofiler_cwl/qprofiler_xml"
                        }
                    ],
                    "run": "#qprofiler.cwl",
                    "label": "fastq-stats-qprofiler"
                },
                {
                    "id": "#qimr-somatic-normal.cwl/qvisualise_cwl_3",
                    "in": [
                        {
                            "id": "#qimr-somatic-normal.cwl/qvisualise_cwl_3/qvisual_xml",
                            "source": [
                                "#qimr-somatic-normal.cwl/qprofiler_cwl_3/qprofiler_xml"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-normal.cwl/qvisualise_cwl_3/report.html"
                        }
                    ],
                    "run": "#qvisualise.cwl",
                    "label": "qvisualise"
                },
                {
                    "id": "#qimr-somatic-normal.cwl/gatk_haplotypecaller_cwl",
                    "in": [
                        {
                            "id": "#qimr-somatic-normal.cwl/gatk_haplotypecaller_cwl/bam",
                            "source": [
                                "#qimr-somatic-normal.cwl/qmerge_cwl/merged.bam"
                            ]
                        },
                        {
                            "id": "#qimr-somatic-normal.cwl/gatk_haplotypecaller_cwl/reference_assembly",
                            "source": [
                                "#qimr-somatic-normal.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#qimr-somatic-normal.cwl/gatk_haplotypecaller_cwl/dbsnp_142",
                            "source": [
                                "#qimr-somatic-normal.cwl/dbsnp_142"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-normal.cwl/gatk_haplotypecaller_cwl/hap.vcf"
                        }
                    ],
                    "run": "#gatk_haplotypecaller.cwl",
                    "label": "normal: gatk_haplotypecaller"
                },
                {
                    "id": "#qimr-somatic-normal.cwl/gatk_select",
                    "in": [
                        {
                            "id": "#qimr-somatic-normal.cwl/gatk_select/variants.vcf",
                            "source": [
                                "#qimr-somatic-normal.cwl/gatk_haplotypecaller_cwl/hap.vcf"
                            ]
                        },
                        {
                            "id": "#qimr-somatic-normal.cwl/gatk_select/reference_assembly",
                            "source": [
                                "#qimr-somatic-normal.cwl/reference_assembly"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-normal.cwl/gatk_select/select_variants.vcf"
                        }
                    ],
                    "run": "#gatk_select.cwl"
                },
                {
                    "id": "#qimr-somatic-normal.cwl/qcoverage_cwl",
                    "in": [
                        {
                            "id": "#qimr-somatic-normal.cwl/qcoverage_cwl/bam",
                            "source": [
                                "#qimr-somatic-normal.cwl/qmerge_cwl/merged.bam"
                            ]
                        },
                        {
                            "id": "#qimr-somatic-normal.cwl/qcoverage_cwl/genomics.features.gff",
                            "source": [
                                "#qimr-somatic-normal.cwl/genomics.features.gff"
                            ]
                        },
                        {
                            "id": "#qimr-somatic-normal.cwl/qcoverage_cwl/bed",
                            "source": [
                                "#qimr-somatic-normal.cwl/bed"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-normal.cwl/qcoverage_cwl/report.txt"
                        },
                        {
                            "id": "#qimr-somatic-normal.cwl/qcoverage_cwl/coverage.vcf"
                        },
                        {
                            "id": "#qimr-somatic-normal.cwl/qcoverage_cwl/report.xml"
                        }
                    ],
                    "run": "#qcoverage.cwl",
                    "label": "qcoverage"
                },
                {
                    "id": "#qimr-somatic-normal.cwl/qprofiler_cwl_3",
                    "in": [
                        {
                            "id": "#qimr-somatic-normal.cwl/qprofiler_cwl_3/input",
                            "source": [
                                "#qimr-somatic-normal.cwl/qmerge_cwl/merged.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-normal.cwl/qprofiler_cwl_3/qprofiler_xml"
                        }
                    ],
                    "run": "#qprofiler.cwl",
                    "label": "qprofiler"
                },
                {
                    "id": "#qimr-somatic-normal.cwl/qprofiler_cwl_4",
                    "in": [
                        {
                            "id": "#qimr-somatic-normal.cwl/qprofiler_cwl_4/input",
                            "source": [
                                "#qimr-somatic-normal.cwl/cutadapt_cwl/read1.clean.fastq.gz"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-normal.cwl/qprofiler_cwl_4/qprofiler_xml"
                        }
                    ],
                    "run": "#qprofiler.cwl",
                    "label": "qprofiler"
                },
                {
                    "id": "#qimr-somatic-normal.cwl/qvisualise_cwl_4",
                    "in": [
                        {
                            "id": "#qimr-somatic-normal.cwl/qvisualise_cwl_4/qvisual_xml",
                            "source": [
                                "#qimr-somatic-normal.cwl/qprofiler_cwl_4/qprofiler_xml"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-normal.cwl/qvisualise_cwl_4/report.html"
                        }
                    ],
                    "run": "#qvisualise.cwl",
                    "label": "qvisualise"
                },
                {
                    "id": "#qimr-somatic-normal.cwl/qprofiler_cwl_1",
                    "in": [
                        {
                            "id": "#qimr-somatic-normal.cwl/qprofiler_cwl_1/input",
                            "source": [
                                "#qimr-somatic-normal.cwl/samtools_sort_cwl/sorted.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-normal.cwl/qprofiler_cwl_1/qprofiler_xml"
                        }
                    ],
                    "run": "#qprofiler.cwl",
                    "label": "qprofiler"
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
            "label": "qimr-somatic-sub",
            "inputs": [
                {
                    "id": "#main/reference_assembly",
                    "type": "File"
                },
                {
                    "id": "#main/genomics.features.gff",
                    "type": "File"
                },
                {
                    "id": "#main/dbsnp_142",
                    "type": "File"
                },
                {
                    "id": "#main/bed",
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
                        "#main/qimr_somatic_cwl/samplesheet.csv"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/coverage-report.txt",
                    "outputSource": [
                        "#main/qimr_somatic_cwl/coverage-report.txt"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/coverage-report.xml",
                    "outputSource": [
                        "#main/qimr_somatic_cwl/coverage-report.xml"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/coverage.vcf",
                    "outputSource": [
                        "#main/qimr_somatic_cwl/coverage.vcf"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/dedup_metrics",
                    "outputSource": [
                        "#main/qimr_somatic_cwl/dedup_metrics"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/vcf",
                    "outputSource": [
                        "#main/q3indel_cwl/vcf"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/somatic-calls.vcf",
                    "outputSource": [
                        "#main/qannotate_cwl/somatic-calls.vcf"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/fastq-r1-report.html",
                    "outputSource": [
                        "#main/qimr_somatic_cwl/fastq-r1-report.html"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/fastq-r2-report.html",
                    "outputSource": [
                        "#main/qimr_somatic_cwl/fastq-r2-report.html"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/merge-library-report.html",
                    "outputSource": [
                        "#main/qimr_somatic_cwl/merge-library-report.html"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/coverage-report.txt_1",
                    "outputSource": [
                        "#main/qimr_somatic_cwl_1/coverage-report.txt"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/coverage-report.xml_1",
                    "outputSource": [
                        "#main/qimr_somatic_cwl_1/coverage-report.xml"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/dedup_metrics_1",
                    "outputSource": [
                        "#main/qimr_somatic_cwl_1/dedup_metrics"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/fastq-r2-report.html_1",
                    "outputSource": [
                        "#main/qimr_somatic_cwl_1/fastq-r2-report.html"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/merge-library-report.html_1",
                    "outputSource": [
                        "#main/qimr_somatic_cwl_1/merge-library-report.html"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/report.html",
                    "outputSource": [
                        "#main/qimr_somatic_cwl_1/report.html"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/samblaster.report.html",
                    "outputSource": [
                        "#main/qimr_somatic_cwl_1/samblaster.report.html"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/samplesheet.csv_1",
                    "outputSource": [
                        "#main/qimr_somatic_cwl_1/samplesheet.csv"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/select_variants.vcf",
                    "outputSource": [
                        "#main/qimr_somatic_cwl_1/select_variants.vcf"
                    ],
                    "type": "File"
                }
            ],
            "steps": [
                {
                    "id": "#main/qimr_somatic_cwl",
                    "in": [
                        {
                            "id": "#main/qimr_somatic_cwl/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/qimr_somatic_cwl/bcl2",
                            "source": [
                                "#main/bcl3"
                            ]
                        },
                        {
                            "id": "#main/qimr_somatic_cwl/bcl1",
                            "source": [
                                "#main/bcl4"
                            ]
                        },
                        {
                            "id": "#main/qimr_somatic_cwl/genomics.features.gff",
                            "source": [
                                "#main/genomics.features.gff"
                            ]
                        },
                        {
                            "id": "#main/qimr_somatic_cwl/bed",
                            "source": [
                                "#main/bed"
                            ]
                        },
                        {
                            "id": "#main/qimr_somatic_cwl/dbsnp_142",
                            "source": [
                                "#main/dbsnp_142"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/qimr_somatic_cwl/samplesheet.csv"
                        },
                        {
                            "id": "#main/qimr_somatic_cwl/dedup_metrics"
                        },
                        {
                            "id": "#main/qimr_somatic_cwl/select_variants.vcf"
                        },
                        {
                            "id": "#main/qimr_somatic_cwl/fastq-r1-report.html"
                        },
                        {
                            "id": "#main/qimr_somatic_cwl/samblaster.report.html"
                        },
                        {
                            "id": "#main/qimr_somatic_cwl/fastq-r2-report.html"
                        },
                        {
                            "id": "#main/qimr_somatic_cwl/merge-library-report.html"
                        },
                        {
                            "id": "#main/qimr_somatic_cwl/coverage-report.xml"
                        },
                        {
                            "id": "#main/qimr_somatic_cwl/coverage-report.txt"
                        },
                        {
                            "id": "#main/qimr_somatic_cwl/coverage.vcf"
                        },
                        {
                            "id": "#main/qimr_somatic_cwl/hap.vcf"
                        }
                    ],
                    "run": "#qimr-somatic-normal.cwl",
                    "label": "QIMR-somatic-normal"
                },
                {
                    "id": "#main/qimr_somatic_cwl_1",
                    "in": [
                        {
                            "id": "#main/qimr_somatic_cwl_1/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/qimr_somatic_cwl_1/bcl2",
                            "source": [
                                "#main/bcl2"
                            ]
                        },
                        {
                            "id": "#main/qimr_somatic_cwl_1/bcl1",
                            "source": [
                                "#main/bcl1"
                            ]
                        },
                        {
                            "id": "#main/qimr_somatic_cwl_1/genomics.features.gff",
                            "source": [
                                "#main/genomics.features.gff"
                            ]
                        },
                        {
                            "id": "#main/qimr_somatic_cwl_1/dbsnp_142",
                            "source": [
                                "#main/dbsnp_142"
                            ]
                        },
                        {
                            "id": "#main/qimr_somatic_cwl_1/bed",
                            "source": [
                                "#main/bed"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/qimr_somatic_cwl_1/samplesheet.csv"
                        },
                        {
                            "id": "#main/qimr_somatic_cwl_1/dedup_metrics"
                        },
                        {
                            "id": "#main/qimr_somatic_cwl_1/report.html"
                        },
                        {
                            "id": "#main/qimr_somatic_cwl_1/fastq-r2-report.html"
                        },
                        {
                            "id": "#main/qimr_somatic_cwl_1/samblaster.report.html"
                        },
                        {
                            "id": "#main/qimr_somatic_cwl_1/merge-library-report.html"
                        },
                        {
                            "id": "#main/qimr_somatic_cwl_1/coverage-report.xml"
                        },
                        {
                            "id": "#main/qimr_somatic_cwl_1/coverage-report.txt"
                        },
                        {
                            "id": "#main/qimr_somatic_cwl_1/coverage.vcf"
                        },
                        {
                            "id": "#main/qimr_somatic_cwl_1/select_variants.vcf"
                        },
                        {
                            "id": "#main/qimr_somatic_cwl_1/hap.vcf"
                        }
                    ],
                    "run": "#qimr-somatic-tumour.cwl",
                    "label": "QIMR-somatic-tumour"
                },
                {
                    "id": "#main/qannotate_cwl",
                    "in": [
                        {
                            "id": "#main/qannotate_cwl/gatk-qsnp-somatic.vcf",
                            "source": [
                                "#main/qimr_somatic_cwl_1/hap.vcf"
                            ]
                        },
                        {
                            "id": "#main/qannotate_cwl/gatk-qsnp-normal.vcf",
                            "source": [
                                "#main/qimr_somatic_cwl/hap.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/qannotate_cwl/somatic-calls.vcf"
                        }
                    ],
                    "run": "#qannotate.cwl",
                    "label": "qannotate"
                },
                {
                    "id": "#main/q3indel_cwl",
                    "in": [
                        {
                            "id": "#main/q3indel_cwl/hc.indel.normal",
                            "source": [
                                "#main/qimr_somatic_cwl/select_variants.vcf"
                            ]
                        },
                        {
                            "id": "#main/q3indel_cwl/hc.indel.tumour",
                            "source": [
                                "#main/qimr_somatic_cwl_1/select_variants.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/q3indel_cwl/vcf"
                        }
                    ],
                    "run": "#q3indel.cwl",
                    "label": "q3indel"
                }
            ]
        },
        {
            "class": "Workflow",
            "id": "#qimr-somatic-tumour.cwl",
            "label": "QIMR-somatic-tumour",
            "inputs": [
                {
                    "id": "#qimr-somatic-tumour.cwl/reference_assembly",
                    "type": "File"
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/bcl2",
                    "type": "File"
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/bcl1",
                    "type": "File"
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/genomics.features.gff",
                    "type": "File"
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/dbsnp_142",
                    "type": "File"
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/bed",
                    "type": "File"
                }
            ],
            "outputs": [
                {
                    "id": "#qimr-somatic-tumour.cwl/samplesheet.csv",
                    "outputSource": [
                        "#qimr-somatic-tumour.cwl/bcl2fastq_cwl/samplesheet.csv"
                    ],
                    "type": "File"
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/dedup_metrics",
                    "outputSource": [
                        "#qimr-somatic-tumour.cwl/picard_mark_duplicates/dedup_metrics"
                    ],
                    "type": "File"
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/report.html",
                    "outputSource": [
                        "#qimr-somatic-tumour.cwl/qvisualise_cwl/report.html"
                    ],
                    "type": "File"
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/fastq-r2-report.html",
                    "outputSource": [
                        "#qimr-somatic-tumour.cwl/qvisualise_cwl_4/report.html"
                    ],
                    "type": "File",
                    "label": "fastq-r2-report.html"
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/samblaster.report.html",
                    "outputSource": [
                        "#qimr-somatic-tumour.cwl/qvisualise_cwl_1/report.html"
                    ],
                    "type": "File",
                    "label": "samblaster.report.html"
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/merge-library-report.html",
                    "outputSource": [
                        "#qimr-somatic-tumour.cwl/qvisualise_cwl_2/report.html"
                    ],
                    "type": "File"
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/coverage-report.xml",
                    "outputSource": [
                        "#qimr-somatic-tumour.cwl/qcoverage_cwl/report.xml"
                    ],
                    "type": "File"
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/coverage-report.txt",
                    "outputSource": [
                        "#qimr-somatic-tumour.cwl/qcoverage_cwl/report.txt"
                    ],
                    "type": "File",
                    "label": "coverage-report.txt"
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/coverage.vcf",
                    "outputSource": [
                        "#qimr-somatic-tumour.cwl/qcoverage_cwl/coverage.vcf"
                    ],
                    "type": "File"
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/select_variants.vcf",
                    "outputSource": [
                        "#qimr-somatic-tumour.cwl/gatk_select/select_variants.vcf"
                    ],
                    "type": "File"
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/hap.vcf",
                    "outputSource": [
                        "#qimr-somatic-tumour.cwl/gatk_haplotypecaller_cwl_1/hap.vcf"
                    ],
                    "type": "File"
                }
            ],
            "steps": [
                {
                    "id": "#qimr-somatic-tumour.cwl/bcl2fastq_cwl",
                    "in": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/bcl2fastq_cwl/bcl1",
                            "source": [
                                "#qimr-somatic-tumour.cwl/bcl1"
                            ]
                        },
                        {
                            "id": "#qimr-somatic-tumour.cwl/bcl2fastq_cwl/bcl2",
                            "source": [
                                "#qimr-somatic-tumour.cwl/bcl2"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/bcl2fastq_cwl/fastq1.gz"
                        },
                        {
                            "id": "#qimr-somatic-tumour.cwl/bcl2fastq_cwl/fastq2.gz"
                        },
                        {
                            "id": "#qimr-somatic-tumour.cwl/bcl2fastq_cwl/samplesheet.csv"
                        }
                    ],
                    "run": "#bcl2fastq.cwl",
                    "label": "bcl2fastq"
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/cutadapt_cwl",
                    "in": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/cutadapt_cwl/read1.fastq.gz",
                            "source": [
                                "#qimr-somatic-tumour.cwl/bcl2fastq_cwl/fastq1.gz"
                            ]
                        },
                        {
                            "id": "#qimr-somatic-tumour.cwl/cutadapt_cwl/read2.fastq.gz",
                            "source": [
                                "#qimr-somatic-tumour.cwl/bcl2fastq_cwl/fastq2.gz"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/cutadapt_cwl/read1.clean.fastq.gz"
                        },
                        {
                            "id": "#qimr-somatic-tumour.cwl/cutadapt_cwl/read2.clean.fastq.gz"
                        }
                    ],
                    "run": "#cutadapt.cwl",
                    "label": "cutadapt"
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/qvisualise_cwl",
                    "in": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/qvisualise_cwl/qvisual_xml",
                            "source": [
                                "#qimr-somatic-tumour.cwl/qprofiler_cwl/qprofiler_xml"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/qvisualise_cwl/report.html"
                        }
                    ],
                    "run": "#qvisualise.cwl",
                    "label": "qvisualise"
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/bwa_mem",
                    "in": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/bwa_mem/forward_reads.fq",
                            "source": [
                                "#qimr-somatic-tumour.cwl/cutadapt_cwl/read1.clean.fastq.gz"
                            ]
                        },
                        {
                            "id": "#qimr-somatic-tumour.cwl/bwa_mem/reference_assembly",
                            "source": [
                                "#qimr-somatic-tumour.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#qimr-somatic-tumour.cwl/bwa_mem/reverse_reads.fq",
                            "source": [
                                "#qimr-somatic-tumour.cwl/cutadapt_cwl/read2.clean.fastq.gz"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/bwa_mem/ref_aligned_sam"
                        }
                    ],
                    "run": "#bwa-mem.cwl",
                    "label": "bwa"
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/samblaster_cwl",
                    "in": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/samblaster_cwl/ref.aligned.sam",
                            "source": [
                                "#qimr-somatic-tumour.cwl/bwa_mem/ref_aligned_sam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/samblaster_cwl/dedup.sam"
                        }
                    ],
                    "run": "#samblaster.cwl",
                    "label": "samblaster",
                    "doc": "First deduplication step. At read group. Step mostly performed."
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/samtools_sort_cwl",
                    "in": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/samtools_sort_cwl/dedup.aligned.bam",
                            "source": [
                                "#qimr-somatic-tumour.cwl/samtools_view_cwl/bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/samtools_sort_cwl/sorted.bam"
                        }
                    ],
                    "run": "#samtools-sort.cwl",
                    "label": "samtools-sort"
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/samtools_view_cwl",
                    "in": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/samtools_view_cwl/sam",
                            "source": [
                                "#qimr-somatic-tumour.cwl/samblaster_cwl/dedup.sam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/samtools_view_cwl/bam"
                        }
                    ],
                    "run": "#samtools-view.cwl",
                    "label": "samtools-view"
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/picard_mergesamfiles_cwl",
                    "in": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/picard_mergesamfiles_cwl/bam",
                            "source": [
                                "#qimr-somatic-tumour.cwl/samtools_sort_cwl/sorted.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/picard_mergesamfiles_cwl/merged.bam"
                        }
                    ],
                    "run": "#picard-mergesamfiles.cwl",
                    "label": "read-group-merge (picard)",
                    "doc": "Merge flow-cell lanes for an individual."
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/picard_mark_duplicates",
                    "in": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/picard_mark_duplicates/sorted_aligned_bam",
                            "source": [
                                "#qimr-somatic-tumour.cwl/picard_mergesamfiles_cwl/merged.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/picard_mark_duplicates/dedup_metrics"
                        },
                        {
                            "id": "#qimr-somatic-tumour.cwl/picard_mark_duplicates/deduped_bam"
                        }
                    ],
                    "run": "#picard_mark_duplicates.cwl",
                    "label": "picard_mark_duplicates"
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/qprofiler_cwl_2",
                    "in": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/qprofiler_cwl_2/input",
                            "source": [
                                "#qimr-somatic-tumour.cwl/qmerge_cwl/merged.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/qprofiler_cwl_2/qprofiler_xml"
                        }
                    ],
                    "run": "#qprofiler.cwl",
                    "label": "qprofiler"
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/qvisualise_cwl_2",
                    "in": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/qvisualise_cwl_2/qvisual_xml",
                            "source": [
                                "#qimr-somatic-tumour.cwl/qprofiler_cwl_2/qprofiler_xml"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/qvisualise_cwl_2/report.html"
                        }
                    ],
                    "run": "#qvisualise.cwl",
                    "label": "qvisualise"
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/qmerge_cwl",
                    "in": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/qmerge_cwl/bam",
                            "source": [
                                "#qimr-somatic-tumour.cwl/picard_mark_duplicates/deduped_bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/qmerge_cwl/merged.bam"
                        }
                    ],
                    "run": "#qmerge.cwl",
                    "label": "library-merge (qmerge)",
                    "doc": "Library emrge"
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/qvisualise_cwl_1",
                    "in": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/qvisualise_cwl_1/qvisual_xml",
                            "source": [
                                "#qimr-somatic-tumour.cwl/qprofiler_cwl_1/qprofiler_xml"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/qvisualise_cwl_1/report.html"
                        }
                    ],
                    "run": "#qvisualise.cwl",
                    "label": "qvisualise"
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/qprofiler_cwl",
                    "in": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/qprofiler_cwl/input",
                            "source": [
                                "#qimr-somatic-tumour.cwl/cutadapt_cwl/read2.clean.fastq.gz"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/qprofiler_cwl/qprofiler_xml"
                        }
                    ],
                    "run": "#qprofiler.cwl",
                    "label": "fastq-stats-qprofiler"
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/qprofiler_cwl_4",
                    "in": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/qprofiler_cwl_4/input",
                            "source": [
                                "#qimr-somatic-tumour.cwl/cutadapt_cwl/read1.clean.fastq.gz"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/qprofiler_cwl_4/qprofiler_xml"
                        }
                    ],
                    "run": "#qprofiler.cwl",
                    "label": "qprofiler"
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/qvisualise_cwl_4",
                    "in": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/qvisualise_cwl_4/qvisual_xml",
                            "source": [
                                "#qimr-somatic-tumour.cwl/qprofiler_cwl_4/qprofiler_xml"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/qvisualise_cwl_4/report.html"
                        }
                    ],
                    "run": "#qvisualise.cwl",
                    "label": "qvisualise"
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/qprofiler_cwl_1",
                    "in": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/qprofiler_cwl_1/input",
                            "source": [
                                "#qimr-somatic-tumour.cwl/samtools_sort_cwl/sorted.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/qprofiler_cwl_1/qprofiler_xml"
                        }
                    ],
                    "run": "#qprofiler.cwl",
                    "label": "qprofiler"
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/gatk_haplotypecaller_cwl_1",
                    "in": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/gatk_haplotypecaller_cwl_1/bam",
                            "source": [
                                "#qimr-somatic-tumour.cwl/qmerge_cwl/merged.bam"
                            ]
                        },
                        {
                            "id": "#qimr-somatic-tumour.cwl/gatk_haplotypecaller_cwl_1/reference_assembly",
                            "source": [
                                "#qimr-somatic-tumour.cwl/reference_assembly"
                            ]
                        },
                        {
                            "id": "#qimr-somatic-tumour.cwl/gatk_haplotypecaller_cwl_1/dbsnp_142",
                            "source": [
                                "#qimr-somatic-tumour.cwl/dbsnp_142"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/gatk_haplotypecaller_cwl_1/hap.vcf"
                        }
                    ],
                    "run": "#gatk_haplotypecaller.cwl",
                    "label": "gatk_haplotypecaller"
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/qcoverage_cwl",
                    "in": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/qcoverage_cwl/bam",
                            "source": [
                                "#qimr-somatic-tumour.cwl/qmerge_cwl/merged.bam"
                            ]
                        },
                        {
                            "id": "#qimr-somatic-tumour.cwl/qcoverage_cwl/genomics.features.gff",
                            "source": [
                                "#qimr-somatic-tumour.cwl/genomics.features.gff"
                            ]
                        },
                        {
                            "id": "#qimr-somatic-tumour.cwl/qcoverage_cwl/bed",
                            "source": [
                                "#qimr-somatic-tumour.cwl/bed"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/qcoverage_cwl/report.txt"
                        },
                        {
                            "id": "#qimr-somatic-tumour.cwl/qcoverage_cwl/coverage.vcf"
                        },
                        {
                            "id": "#qimr-somatic-tumour.cwl/qcoverage_cwl/report.xml"
                        }
                    ],
                    "run": "#qcoverage.cwl",
                    "label": "qcoverage"
                },
                {
                    "id": "#qimr-somatic-tumour.cwl/gatk_select",
                    "in": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/gatk_select/variants.vcf",
                            "source": [
                                "#qimr-somatic-tumour.cwl/gatk_haplotypecaller_cwl_1/hap.vcf"
                            ]
                        },
                        {
                            "id": "#qimr-somatic-tumour.cwl/gatk_select/reference_assembly",
                            "source": [
                                "#qimr-somatic-tumour.cwl/reference_assembly"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#qimr-somatic-tumour.cwl/gatk_select/select_variants.vcf"
                        }
                    ],
                    "run": "#gatk_select.cwl"
                }
            ]
        }
    ],
    "cwlVersion": "v1.0"
}