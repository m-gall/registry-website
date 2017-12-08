"use strict";
 const input_workflow =
{
    "$graph": [
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
                    "doc": "hs37d5",
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
                    "prefix": "-M"
                },
                {
                    "position": 0,
                    "prefix": "-t",
                    "valueFrom": "16"
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
            "id": "#db_variants.cwl",
            "baseCommand": [
                "db_variants.pl"
            ],
            "inputs": [
                {
                    "id": "#db_variants.cwl/match_snv.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#db_variants.cwl/match_indel.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#db_variants.cwl/snv.pileup",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#db_variants.cwl/indel.pileup",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#db_variants.cwl/overlap_outfile_indel",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#db_variants.cwl/overlap_outfile_snv",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "doc": "check variants agianst common database sets - improve speed of database searches",
            "label": "db_variants"
        },
        {
            "class": "CommandLineTool",
            "id": "#delly.cwl",
            "baseCommand": [
                "delly.pl"
            ],
            "inputs": [
                {
                    "id": "#delly.cwl/bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#delly.cwl/outvcf",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#delly.cwl/outfile",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "delly"
        },
        {
            "class": "CommandLineTool",
            "id": "#exon_coverage.cwl",
            "baseCommand": [],
            "inputs": [
                {
                    "id": "#exon_coverage.cwl/pileup",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#exon_coverage.cwl/bed",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    },
                    "doc": "hs37d5.exon.overlap"
                }
            ],
            "outputs": [
                {
                    "id": "#exon_coverage.cwl/exonReport.summary.tsv",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "exon_coverage"
        },
        {
            "class": "CommandLineTool",
            "id": "#filter_clinvar_snv.cwl",
            "baseCommand": [],
            "inputs": [
                {
                    "id": "#filter_clinvar_snv.cwl/ref_file_snv",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#filter_clinvar_snv.cwl/coord_file_snv",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#filter_clinvar_snv.cwl/overlap_outfile_snv",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "filter_clinvar_snv"
        },
        {
            "class": "CommandLineTool",
            "id": "#filter_dbsnp_indel.cwl",
            "baseCommand": [],
            "inputs": [
                {
                    "id": "#filter_dbsnp_indel.cwl/ref_file_indel",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#filter_dbsnp_indel.cwl/coord_file_indel",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#filter_dbsnp_indel.cwl/overlap_outfile_indel",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "filter_dbsnp_indel"
        },
        {
            "class": "CommandLineTool",
            "id": "#filter_dbsnp_snv.cwl",
            "baseCommand": [
                "overlap_general.pl"
            ],
            "inputs": [
                {
                    "id": "#filter_dbsnp_snv.cwl/ref_file_snv",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#filter_dbsnp_snv.cwl/coord_file_snv",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#filter_dbsnp_snv.cwl/overlap_outfile_snv",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "filter_dbsnp_snv"
        },
        {
            "class": "CommandLineTool",
            "id": "#filter_dgv.cwl",
            "baseCommand": [
                "overlap_sv_bytype.pl"
            ],
            "inputs": [
                {
                    "id": "#filter_dgv.cwl/dgv_ref",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#filter_dgv.cwl/input1",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#filter_dgv.cwl/input2",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#filter_dgv.cwl/coord_file",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#filter_dgv.cwl/overlap_outfile",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "filter_dgv",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "-sv_type",
                    "valueFrom": "del,dup,inv"
                }
            ]
        },
        {
            "class": "CommandLineTool",
            "id": "#filter_exac_indel.cwl",
            "baseCommand": [],
            "inputs": [
                {
                    "id": "#filter_exac_indel.cwl/ref_file_indel",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#filter_exac_indel.cwl/coord_file_indel",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#filter_exac_indel.cwl/overlap_outfile",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "filter_exac_indel"
        },
        {
            "class": "CommandLineTool",
            "id": "#filter_exac_snv.cwl",
            "baseCommand": [
                "overlap_snv_bytype.pl"
            ],
            "inputs": [
                {
                    "id": "#filter_exac_snv.cwl/ref_file_snv",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#filter_exac_snv.cwl/coord_file_snv",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#filter_exac_snv.cwl/overlap_outfile",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "filter_exac_snv",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "-match",
                    "valueFrom": "PASS"
                }
            ]
        },
        {
            "class": "CommandLineTool",
            "id": "#filter_exon_ns.cwl",
            "baseCommand": [
                "filter_exon_ns.pl"
            ],
            "inputs": [
                {
                    "id": "#filter_exon_ns.cwl/match_snv",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#filter_exon_ns.cwl/match_indel",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#filter_exon_ns.cwl/coord_snv",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#filter_exon_ns.cwl/coord_indel",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#filter_exon_ns.cwl/overlap_outfile_snv",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#filter_exon_ns.cwl/overlap_outfile_indel",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "filter_exon_ns",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "-exonns_filter_name",
                    "valueFrom": "filter_exon_ns"
                }
            ]
        },
        {
            "class": "CommandLineTool",
            "id": "#filter_gene.cwl",
            "baseCommand": [
                "overlap_general.pl"
            ],
            "inputs": [
                {
                    "id": "#filter_gene.cwl/ref_file_sv",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#filter_gene.cwl/coord_file_sv",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#filter_gene.cwl/overlap_outfile_sv",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "filter_gene"
        },
        {
            "class": "CommandLineTool",
            "id": "#filter_splicesite.cwl",
            "baseCommand": [
                "overlap_general.pl"
            ],
            "inputs": [
                {
                    "id": "#filter_splicesite.cwl/chr.match_indel",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#filter_splicesite.cwl/chr.match_snv",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#filter_splicesite.cwl/chr.coord_snv",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#filter_splicesite.cwl/chr.coord_indel",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#filter_splicesite.cwl/overlap_outfile_indel",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#filter_splicesite.cwl/overlap_outfile_snv",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "filter_splicesite",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "-snv"
                },
                {
                    "position": 0,
                    "prefix": "-indel"
                },
                {
                    "position": 0,
                    "prefix": "-match",
                    "valueFrom": "PASS"
                },
                {
                    "position": 0,
                    "prefix": "-coord_filtername",
                    "valueFrom": "filter_splicesite"
                }
            ]
        },
        {
            "class": "CommandLineTool",
            "id": "#filter_vcf.cwl",
            "baseCommand": [
                "filter_vcf.pl"
            ],
            "inputs": [
                {
                    "id": "#filter_vcf.cwl/snv.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#filter_vcf.cwl/indel.vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#filter_vcf.cwl/vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#filter_vcf.cwl/overlap_snv",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#filter_vcf.cwl/overlap_indel",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "filter_vcf"
        },
        {
            "class": "CommandLineTool",
            "id": "#filter_vep.cwl",
            "baseCommand": [
                "filter_vep.pl"
            ],
            "inputs": [
                {
                    "id": "#filter_vep.cwl/ref_file_snv",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#filter_vep.cwl/ref_file_indel",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#filter_vep.cwl/overlap_outfile_snv",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#filter_vep.cwl/overlap_outfile_indel",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "filter_vep"
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
                    "id": "#gatk_applyrecalibration.cwl/recal.vcf",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#gatk_applyrecalibration.cwl/recal.snv",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#gatk_applyrecalibration.cwl/recal.indel",
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
                    "id": "#gatk_baseRecalibrator.cwl/deduped_realigned.bam",
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
                    "doc": "hs37d5.fa",
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
                    "id": "#gatk_baseRecalibrator.cwl/segment_intervals",
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
                },
                {
                    "id": "#gatk_baseRecalibrator.cwl/Mills_and_1000G_gold_standard",
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
                    "prefix": "-known_sites",
                    "separate": false,
                    "valueFrom": "dbsnp_138"
                },
                {
                    "position": 0,
                    "prefix": "-L",
                    "valueFrom": "interval_list"
                },
                {
                    "position": 0,
                    "prefix": "-known_sites",
                    "valueFrom": "Mills_and_1000G_gold_standard"
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
                    "format": "http://edamontology.org/format_3016",
                    "id": "#gatk_genotypeGVCFs.cwl/vcf.gz",
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
                },
                {
                    "id": "#gatk_genotypeGVCFs.cwl/segment_intervals",
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
                    "id": "#gatk_haplotypecaller.cwl/recal.bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_haplotypecaller.cwl/segment_intervals",
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
                    },
                    "doc": "hs37d5.fa"
                }
            ],
            "outputs": [
                {
                    "id": "#gatk_haplotypecaller.cwl/vcf.gz",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "gatk_haplotypecaller",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "-nt",
                    "valueFrom": "1"
                },
                {
                    "position": 0,
                    "prefix": "-ERC",
                    "valueFrom": "GVCF"
                },
                {
                    "position": 0,
                    "prefix": "--minPruning",
                    "valueFrom": "3"
                },
                {
                    "position": 0,
                    "prefix": "--maxNumHaplotypesInPopulation",
                    "valueFrom": "200"
                },
                {
                    "position": 0,
                    "prefix": "max_alternate_alleles--",
                    "valueFrom": "3"
                },
                {
                    "position": 0,
                    "prefix": "-contamination",
                    "valueFrom": "0.0"
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
                    "id": "#gatk_indelRealigner.cwl/segment_intervals",
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
                    "doc": "hs37d5",
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
                    "id": "#gatk_indelRealigner.cwl/interval_list",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#gatk_indelRealigner.cwl/deduped_realigned.bam",
                    "type": "File",
                    "outputBinding": {},
                    "secondaryFiles": [
                        "bam.index"
                    ],
                    "format": "http://edamontology.org/format_2572"
                }
            ],
            "doc": "https://bio.tools/tool/gatk2_indel_realigner-IP/version/none\n",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "--targetIntervals",
                    "valueFrom": "=intervals"
                },
                {
                    "position": 0,
                    "prefix": "--consensusDeterminationModel",
                    "valueFrom": "KNOWNS_ONLY"
                },
                {
                    "position": 0,
                    "prefix": "-LOD",
                    "valueFrom": "0.4"
                },
                {
                    "position": 0,
                    "prefix": "-L",
                    "valueFrom": "interval_list"
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
                    "id": "#gatk_printReads.cwl/realigned.bam",
                    "type": "File"
                }
            ],
            "outputs": [
                {
                    "id": "#gatk_printReads.cwl/recalibrated.bam",
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
                    "doc": "hs37d5",
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
                    "id": "#gatk_realignerTargetCreator.cwl/1000G_phase1.indels",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_realignerTargetCreator.cwl/segment.intervals",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_realignerTargetCreator.cwl/Mills_and_1000G_gold_standard.indels",
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
            "arguments": [
                {
                    "position": 0,
                    "prefix": "-nt",
                    "valueFrom": "1"
                },
                {
                    "position": 0,
                    "prefix": "-L",
                    "valueFrom": "interval_list"
                },
                {
                    "position": 0,
                    "prefix": "--consensusDeterminationModel",
                    "valueFrom": "KNOWNS_ONLY"
                },
                {
                    "position": 0,
                    "prefix": "-LOD",
                    "valueFrom": "0.4"
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
            "id": "#gatk_variantrecalibrator.cwl",
            "baseCommand": [
                "java",
                "GenomeAnalysisTK.jar",
                "-T",
                "VariantRecalibrator"
            ],
            "inputs": [
                {
                    "id": "#gatk_variantrecalibrator.cwl/vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_variantrecalibrator.cwl/reference_assembly",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_variantrecalibrator.cwl/resource_hapmap",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_variantrecalibrator.cwl/resource_omni",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_variantrecalibrator.cwl/resource_1000G",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#gatk_variantrecalibrator.cwl/resource_dbsnp",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#gatk_variantrecalibrator.cwl/recalFile",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#gatk_variantrecalibrator.cwl/tranchesFile",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#gatk_variantrecalibrator.cwl/rscriptFile",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "gatk_variantRecalibrator"
        },
        {
            "class": "CommandLineTool",
            "id": "#get_bam_stats.cwl",
            "baseCommand": [],
            "inputs": [
                {
                    "id": "#get_bam_stats.cwl/exon_coord",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    },
                    "doc": "hs37d5.exon.overlap.all"
                },
                {
                    "id": "#get_bam_stats.cwl/bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#get_bam_stats.cwl/readReport.summary.txt",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "get_bam_stats.cwl"
        },
        {
            "class": "CommandLineTool",
            "id": "#lumpy.cwl",
            "baseCommand": [
                "lumpy.pl"
            ],
            "inputs": [
                {
                    "id": "#lumpy.cwl/bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#lumpy.cwl/outfile",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#lumpy.cwl/outvcf",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "lumpy"
        },
        {
            "class": "CommandLineTool",
            "id": "#merge_bam-pl.cwl",
            "baseCommand": [
                "merge_bam.pl"
            ],
            "inputs": [
                {
                    "id": "#merge_bam-pl.cwl/segment.bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#merge_bam-pl.cwl/bam",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "merge_bam.pl"
        },
        {
            "class": "CommandLineTool",
            "id": "#merge_vcf-pl.cwl",
            "baseCommand": [],
            "inputs": [
                {
                    "id": "#merge_vcf-pl.cwl/vcf",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#merge_vcf-pl.cwl/reference_assembly",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#merge_vcf-pl.cwl/bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#merge_vcf-pl.cwl/all.out.vcf",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "merge_vcf.pl"
        },
        {
            "class": "CommandLineTool",
            "id": "#overlap_general.cwl",
            "baseCommand": [
                "overlap_general.pl"
            ],
            "inputs": [
                {
                    "id": "#overlap_general.cwl/chr.match_snv",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#overlap_general.cwl/chr.match_indel",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#overlap_general.cwl/coord_file_snv",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#overlap_general.cwl/coord_file_indel",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#overlap_general.cwl/overlap_outfile_snv",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#overlap_general.cwl/overlap_outfile_indel",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "overlap_general/filter_exon",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "-match",
                    "valueFrom": "PASS"
                },
                {
                    "position": 0,
                    "prefix": "-indel"
                },
                {
                    "position": 0,
                    "prefix": "-snv"
                },
                {
                    "position": 0,
                    "prefix": "-coord_filtername",
                    "valueFrom": "filter_exon"
                }
            ]
        },
        {
            "class": "CommandLineTool",
            "baseCommand": [
                "java",
                "picard.jar",
                "MarkDuplicates"
            ],
            "inputs": [
                {
                    "format": null,
                    "id": "#picard-mark_duplicates.cwl/merged_aligned.bam",
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
                    "id": "#picard-mark_duplicates.cwl/dedup_metrics.txt",
                    "doc": "Text file containing summaries of duplicate metrics.",
                    "type": "File",
                    "outputBinding": {},
                    "format": "http://edamontology.org/format_3475"
                },
                {
                    "id": "#picard-mark_duplicates.cwl/deduped.bam",
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
                    "prefix": "AS",
                    "separate": false,
                    "valueFrom": "=TRUE"
                },
                {
                    "position": 0,
                    "prefix": "VALIDATION_STRINGENCY",
                    "separate": false,
                    "valueFrom": "=LENIENT"
                },
                {
                    "position": 0,
                    "prefix": "ASSUME_SORTED",
                    "valueFrom": "=true"
                },
                {
                    "position": 0,
                    "prefix": "REMOVE_SEQUENCING_DUPLICATES",
                    "valueFrom": "=false"
                },
                {
                    "position": 0,
                    "prefix": "REMOVE_DUPLICATES",
                    "valueFrom": "=false"
                },
                {
                    "position": 0,
                    "prefix": "DUPLICATE_SCORING_STRATEGY",
                    "valueFrom": "=SUM_OF_BASE_QUALITIES"
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
            "id": "#picard-mark_duplicates.cwl"
        },
        {
            "class": "CommandLineTool",
            "baseCommand": [
                "picard.jar",
                "MergeSamFiles"
            ],
            "inputs": [
                {
                    "format": null,
                    "id": "#picard-mergesamfiles.cwl/bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    },
                    "secondaryFiles": [
                        "bam.ai"
                    ]
                }
            ],
            "outputs": [
                {
                    "id": "#picard-mergesamfiles.cwl/merged.bam",
                    "doc": "Merged bam file containing the vcf outputs which were split over chromosomes.",
                    "type": "File",
                    "outputBinding": {},
                    "format": "http://edamontology.org/format_2572"
                }
            ],
            "doc": "http://bio-bwa.sourceforge.net/bwa.shtml\n",
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
                    "valueFrom": "=LENIENT"
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
            "id": "#picard-mergesamfiles.cwl"
        },
        {
            "class": "CommandLineTool",
            "id": "#report_indel.cwl",
            "baseCommand": [
                "generate_indel_report.pl"
            ],
            "inputs": [
                {
                    "id": "#report_indel.cwl/input",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#report_indel.cwl/exon_coord_file",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#report_indel.cwl/annotation_file",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#report_indel.cwl/tsv_file",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#report_indel.cwl/pass_summary_file",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#report_indel.cwl/pass_file",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#report_indel.cwl/filter_summary_file",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "report_indel"
        },
        {
            "class": "CommandLineTool",
            "id": "#report_snv.cwl",
            "baseCommand": [
                "generate_snv_report.pl"
            ],
            "inputs": [
                {
                    "id": "#report_snv.cwl/input",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#report_snv.cwl/annotation_file",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#report_snv.cwl/exon_coord_file",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#report_snv.cwl/tsv_file",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#report_snv.cwl/pass_summary_file",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#report_snv.cwl/pass_file",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#report_snv.cwl/filter_summary_file",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "report_snv"
        },
        {
            "class": "CommandLineTool",
            "id": "#report_sv.cwl",
            "baseCommand": [
                "generate_sv_report.pl"
            ],
            "inputs": [
                {
                    "id": "#report_sv.cwl/input",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#report_sv.cwl/exon_coord_file",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#report_sv.cwl/annotation_file",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#report_sv.cwl/tsv_file",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#report_sv.cwl/pass_summary_file",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#report_sv.cwl/pass_file",
                    "type": "File",
                    "outputBinding": {}
                },
                {
                    "id": "#report_sv.cwl/filter_summary_file",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "report_sv"
        },
        {
            "class": "CommandLineTool",
            "id": "#samtools-index.cwl",
            "baseCommand": [
                "samtools",
                "index"
            ],
            "inputs": [
                {
                    "id": "#samtools-index.cwl/bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#samtools-index.cwl/sorted.bam",
                    "label": "sorted.bam",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "samtools-index"
        },
        {
            "class": "CommandLineTool",
            "id": "#samtools-mpileup-exon.cwl",
            "baseCommand": [
                "samtools",
                "mpileup"
            ],
            "inputs": [
                {
                    "id": "#samtools-mpileup-exon.cwl/reference_assembly",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#samtools-mpileup-exon.cwl/bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#samtools-mpileup-exon.cwl/exon_coords",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#samtools-mpileup-exon.cwl/pileup",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "samtools-mpileup",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "-A"
                },
                {
                    "position": 0,
                    "prefix": "-r",
                    "valueFrom": "1"
                },
                {
                    "position": 0,
                    "prefix": "-f"
                },
                {
                    "position": 0,
                    "prefix": "-l",
                    "valueFrom": "=hs37d5.exon.coord"
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
                    "id": "#samtools-mpileup.cwl/vcf",
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
                },
                {
                    "id": "#samtools-mpileup.cwl/bam",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#samtools-mpileup.cwl/pileup.coord",
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
            "label": "samtools-mpileup",
            "arguments": [
                {
                    "position": 0,
                    "prefix": "-A"
                },
                {
                    "position": 0,
                    "prefix": "-r",
                    "valueFrom": "1"
                },
                {
                    "position": 0,
                    "prefix": "-f"
                },
                {
                    "position": 0,
                    "prefix": "-l",
                    "valueFrom": "=hs37d5.exon.coord"
                }
            ]
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
            "class": "CommandLineTool",
            "id": "#scp_results.cwl",
            "baseCommand": [
                "scp_results.pl"
            ],
            "inputs": [
                {
                    "id": "#scp_results.cwl/input1",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#scp_results.cwl/input2",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#scp_results.cwl/input3",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#scp_results.cwl/input4",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#scp_results.cwl/input5",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#scp_results.cwl/input6",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#scp_results.cwl/input7",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#scp_results.cwl/input8",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#scp_results.cwl/input9",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#scp_results.cwl/input10",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#scp_results.cwl/input11",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                },
                {
                    "id": "#scp_results.cwl/input12",
                    "type": "File",
                    "inputBinding": {
                        "position": 0
                    }
                }
            ],
            "outputs": [
                {
                    "id": "#scp_results.cwl/tar.gz",
                    "type": "File",
                    "outputBinding": {}
                }
            ],
            "label": "scp_results"
        },
        {
            "class": "Workflow",
            "id": "#main",
            "label": "nci-v1-main-workflow",
            "inputs": [
                {
                    "id": "#main/dgv_ref",
                    "type": "File"
                },
                {
                    "id": "#main/exon_coord",
                    "type": "File"
                },
                {
                    "id": "#main/reference_assembly",
                    "type": "File"
                },
                {
                    "id": "#main/reverse_reads.gz",
                    "type": "File"
                },
                {
                    "id": "#main/forward_reads.gz",
                    "type": "File"
                },
                {
                    "id": "#main/pileup.coord",
                    "type": "File"
                },
                {
                    "id": "#main/resource_omni",
                    "type": "File"
                },
                {
                    "id": "#main/resource_dbsnp",
                    "type": "File"
                },
                {
                    "id": "#main/resource_1000G",
                    "type": "File"
                },
                {
                    "id": "#main/exon_coords",
                    "type": "File"
                },
                {
                    "id": "#main/segment.intervals",
                    "type": "File"
                },
                {
                    "id": "#main/Mills_and_1000G_gold_standard.indels",
                    "type": "File"
                },
                {
                    "id": "#main/1000G_phase1.indels",
                    "type": "File"
                },
                {
                    "id": "#main/dbsnp_138",
                    "type": "File"
                },
                {
                    "id": "#main/coord_file",
                    "type": "File"
                },
                {
                    "id": "#main/coord_file_snv",
                    "type": "File"
                },
                {
                    "id": "#main/coord_file_indel",
                    "type": "File"
                },
                {
                    "id": "#main/chr.coord_snv",
                    "type": "File"
                },
                {
                    "id": "#main/chr.coord_indel",
                    "type": "File"
                },
                {
                    "id": "#main/exon_coord_file",
                    "type": "File"
                },
                {
                    "id": "#main/annotation_file",
                    "type": "File"
                },
                {
                    "id": "#main/intervals_list",
                    "type": "File"
                }
            ],
            "outputs": [
                {
                    "id": "#main/exonReport.summary.tsv",
                    "outputSource": [
                        "#main/exon_coverage_cwl/exonReport.summary.tsv"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/readReport.summary.txt",
                    "outputSource": [
                        "#main/get_bam_stats_cwl/readReport.summary.txt"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/tar.gz",
                    "outputSource": [
                        "#main/scp_results_cwl/tar.gz"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/outfile",
                    "outputSource": [
                        "#main/delly_cwl/outfile"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/outvcf",
                    "outputSource": [
                        "#main/lumpy_cwl/outvcf"
                    ],
                    "type": "File"
                },
                {
                    "id": "#main/rscriptFile",
                    "outputSource": [
                        "#main/gatk_variantrecalibrator_cwl/rscriptFile"
                    ],
                    "type": "File"
                }
            ],
            "steps": [
                {
                    "id": "#main/picard_mark_duplicates",
                    "in": [
                        {
                            "id": "#main/picard_mark_duplicates/merged_aligned.bam",
                            "source": [
                                "#main/samtools_sort_cwl/sorted.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/picard_mark_duplicates/dedup_metrics.txt"
                        },
                        {
                            "id": "#main/picard_mark_duplicates/deduped.bam"
                        }
                    ],
                    "run": "#picard-mark_duplicates.cwl",
                    "label": "identify and mark pcr duplicates."
                },
                {
                    "id": "#main/exon_coverage_cwl",
                    "in": [
                        {
                            "id": "#main/exon_coverage_cwl/pileup",
                            "source": [
                                "#main/samtools_mpileup_cwl_3/pileup"
                            ]
                        },
                        {
                            "id": "#main/exon_coverage_cwl/bed",
                            "source": [
                                "#main/segment.intervals"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/exon_coverage_cwl/exonReport.summary.tsv"
                        }
                    ],
                    "run": "#exon_coverage.cwl",
                    "label": "exon_coverage"
                },
                {
                    "id": "#main/get_bam_stats_cwl",
                    "in": [
                        {
                            "id": "#main/get_bam_stats_cwl/exon_coord",
                            "source": [
                                "#main/exon_coord"
                            ]
                        },
                        {
                            "id": "#main/get_bam_stats_cwl/bam",
                            "source": [
                                "#main/picard_mark_duplicates/deduped.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/get_bam_stats_cwl/readReport.summary.txt"
                        }
                    ],
                    "run": "#get_bam_stats.cwl",
                    "label": "get_bam_stats.cwl"
                },
                {
                    "id": "#main/samtools_index_cwl",
                    "in": [
                        {
                            "id": "#main/samtools_index_cwl/bam",
                            "source": [
                                "#main/picard_mark_duplicates/deduped.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/samtools_index_cwl/sorted.bam"
                        }
                    ],
                    "run": "#samtools-index.cwl",
                    "label": "samtools-index"
                },
                {
                    "id": "#main/gatk_realigner_target_creator",
                    "in": [
                        {
                            "id": "#main/gatk_realigner_target_creator/bam",
                            "source": [
                                "#main/picard_mark_duplicates/deduped.bam"
                            ]
                        },
                        {
                            "id": "#main/gatk_realigner_target_creator/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/gatk_realigner_target_creator/1000G_phase1.indels",
                            "source": [
                                "#main/1000G_phase1.indels"
                            ]
                        },
                        {
                            "id": "#main/gatk_realigner_target_creator/segment.intervals",
                            "source": [
                                "#main/segment.intervals"
                            ]
                        },
                        {
                            "id": "#main/gatk_realigner_target_creator/Mills_and_1000G_gold_standard.indels",
                            "source": [
                                "#main/Mills_and_1000G_gold_standard.indels"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/gatk_realigner_target_creator/realigned_intervals"
                        }
                    ],
                    "run": "#gatk_realignerTargetCreator.cwl"
                },
                {
                    "id": "#main/gatk_indel_realigner",
                    "in": [
                        {
                            "id": "#main/gatk_indel_realigner/bam",
                            "source": [
                                "#main/picard_mark_duplicates/deduped.bam"
                            ]
                        },
                        {
                            "id": "#main/gatk_indel_realigner/segment_intervals",
                            "source": [
                                "#main/segment.intervals"
                            ]
                        },
                        {
                            "id": "#main/gatk_indel_realigner/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/gatk_indel_realigner/interval_list",
                            "source": [
                                "#main/gatk_realigner_target_creator/realigned_intervals"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/gatk_indel_realigner/deduped_realigned.bam"
                        }
                    ],
                    "run": "#gatk_indelRealigner.cwl"
                },
                {
                    "id": "#main/gatk_base_recalibrator",
                    "in": [
                        {
                            "id": "#main/gatk_base_recalibrator/deduped_realigned.bam",
                            "source": [
                                "#main/gatk_indel_realigner/deduped_realigned.bam"
                            ]
                        },
                        {
                            "id": "#main/gatk_base_recalibrator/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/gatk_base_recalibrator/segment_intervals",
                            "source": [
                                "#main/segment.intervals"
                            ]
                        },
                        {
                            "id": "#main/gatk_base_recalibrator/dbsnp_138",
                            "source": [
                                "#main/dbsnp_138"
                            ]
                        },
                        {
                            "id": "#main/gatk_base_recalibrator/Mills_and_1000G_gold_standard",
                            "source": [
                                "#main/Mills_and_1000G_gold_standard.indels"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/gatk_base_recalibrator/recalibrated_table"
                        }
                    ],
                    "run": "#gatk_baseRecalibrator.cwl"
                },
                {
                    "id": "#main/gatk_print_reads",
                    "in": [
                        {
                            "id": "#main/gatk_print_reads/realigned.bam",
                            "source": [
                                "#main/gatk_indel_realigner/deduped_realigned.bam"
                            ]
                        },
                        {
                            "id": "#main/gatk_print_reads/recalibrated_table",
                            "source": [
                                "#main/gatk_base_recalibrator/recalibrated_table"
                            ]
                        },
                        {
                            "id": "#main/gatk_print_reads/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/gatk_print_reads/segment_intervals",
                            "source": [
                                "#main/segment.intervals"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/gatk_print_reads/recalibrated.bam"
                        }
                    ],
                    "run": "#gatk_printReads.cwl"
                },
                {
                    "id": "#main/gatk_haplotypecaller_cwl",
                    "in": [
                        {
                            "id": "#main/gatk_haplotypecaller_cwl/recal.bam",
                            "source": [
                                "#main/gatk_print_reads/recalibrated.bam"
                            ]
                        },
                        {
                            "id": "#main/gatk_haplotypecaller_cwl/segment_intervals",
                            "source": [
                                "#main/segment.intervals"
                            ]
                        },
                        {
                            "id": "#main/gatk_haplotypecaller_cwl/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/gatk_haplotypecaller_cwl/vcf.gz"
                        }
                    ],
                    "run": "#gatk_haplotypecaller.cwl",
                    "label": "gatk_haplotypecaller"
                },
                {
                    "id": "#main/gatk_genotype_g_v_c_fs",
                    "in": [
                        {
                            "id": "#main/gatk_genotype_g_v_c_fs/vcf.gz",
                            "source": [
                                "#main/gatk_haplotypecaller_cwl/vcf.gz"
                            ]
                        },
                        {
                            "id": "#main/gatk_genotype_g_v_c_fs/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/gatk_genotype_g_v_c_fs/segment_intervals",
                            "source": [
                                "#main/segment.intervals"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/gatk_genotype_g_v_c_fs/raw_variants_g_gvcf"
                        }
                    ],
                    "run": "#gatk_genotypeGVCFs.cwl",
                    "label": "genotype GVCF"
                },
                {
                    "id": "#main/merge_bam_pl_cwl",
                    "in": [
                        {
                            "id": "#main/merge_bam_pl_cwl/segment.bam",
                            "source": [
                                "#main/gatk_print_reads/recalibrated.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/merge_bam_pl_cwl/bam"
                        }
                    ],
                    "run": "#merge_bam-pl.cwl",
                    "label": "merge_bam.pl"
                },
                {
                    "id": "#main/picard_mergesamfiles",
                    "in": [
                        {
                            "id": "#main/picard_mergesamfiles/bam",
                            "source": [
                                "#main/merge_bam_pl_cwl/bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/picard_mergesamfiles/merged.bam"
                        }
                    ],
                    "run": "#picard-mergesamfiles.cwl"
                },
                {
                    "id": "#main/gatk_variantrecalibrator_cwl",
                    "in": [
                        {
                            "id": "#main/gatk_variantrecalibrator_cwl/vcf",
                            "source": [
                                "#main/merge_vcf_pl_cwl/all.out.vcf"
                            ]
                        },
                        {
                            "id": "#main/gatk_variantrecalibrator_cwl/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/gatk_variantrecalibrator_cwl/resource_omni",
                            "source": [
                                "#main/resource_omni"
                            ]
                        },
                        {
                            "id": "#main/gatk_variantrecalibrator_cwl/resource_1000G",
                            "source": [
                                "#main/resource_1000G"
                            ]
                        },
                        {
                            "id": "#main/gatk_variantrecalibrator_cwl/resource_dbsnp",
                            "source": [
                                "#main/resource_dbsnp"
                            ]
                        },
                        {
                            "id": "#main/gatk_variantrecalibrator_cwl/resource_hapmap"
                        },
                        {
                            "id": "#main/gatk_variantrecalibrator_cwl/coord_file_sv"
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/gatk_variantrecalibrator_cwl/recalFile"
                        },
                        {
                            "id": "#main/gatk_variantrecalibrator_cwl/tranchesFile"
                        },
                        {
                            "id": "#main/gatk_variantrecalibrator_cwl/rscriptFile"
                        }
                    ],
                    "run": "#gatk_variantrecalibrator.cwl",
                    "label": "gatk_variantRecalibrator"
                },
                {
                    "id": "#main/samtools_mpileup_cwl_1",
                    "in": [
                        {
                            "id": "#main/samtools_mpileup_cwl_1/vcf",
                            "source": [
                                "#main/merge_vcf_pl_cwl/all.out.vcf"
                            ]
                        },
                        {
                            "id": "#main/samtools_mpileup_cwl_1/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/samtools_mpileup_cwl_1/bam",
                            "source": [
                                "#main/samtools_index_cwl_1/sorted.bam"
                            ]
                        },
                        {
                            "id": "#main/samtools_mpileup_cwl_1/pileup.coord",
                            "source": [
                                "#main/pileup.coord"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/samtools_mpileup_cwl_1/pileup"
                        }
                    ],
                    "run": "#samtools-mpileup.cwl",
                    "label": "samtools-mpileup"
                },
                {
                    "id": "#main/samtools_index_cwl_1",
                    "in": [
                        {
                            "id": "#main/samtools_index_cwl_1/bam",
                            "source": [
                                "#main/picard_mergesamfiles/merged.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/samtools_index_cwl_1/sorted.bam"
                        }
                    ],
                    "run": "#samtools-index.cwl",
                    "label": "samtools-index"
                },
                {
                    "id": "#main/merge_vcf_pl_cwl",
                    "in": [
                        {
                            "id": "#main/merge_vcf_pl_cwl/vcf",
                            "source": [
                                "#main/gatk_genotype_g_v_c_fs/raw_variants_g_gvcf"
                            ]
                        },
                        {
                            "id": "#main/merge_vcf_pl_cwl/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/merge_vcf_pl_cwl/bam",
                            "source": [
                                "#main/samtools_index_cwl_1/sorted.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/merge_vcf_pl_cwl/all.out.vcf"
                        }
                    ],
                    "run": "#merge_vcf-pl.cwl",
                    "label": "merge_vcf.pl"
                },
                {
                    "id": "#main/samtools_mpileup_cwl_2",
                    "in": [
                        {
                            "id": "#main/samtools_mpileup_cwl_2/vcf",
                            "source": [
                                "#main/merge_vcf_pl_cwl/all.out.vcf"
                            ]
                        },
                        {
                            "id": "#main/samtools_mpileup_cwl_2/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/samtools_mpileup_cwl_2/bam",
                            "source": [
                                "#main/samtools_index_cwl_1/sorted.bam"
                            ]
                        },
                        {
                            "id": "#main/samtools_mpileup_cwl_2/pileup.coord",
                            "source": [
                                "#main/pileup.coord"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/samtools_mpileup_cwl_2/pileup"
                        }
                    ],
                    "run": "#samtools-mpileup.cwl",
                    "label": "samtools-mpileup"
                },
                {
                    "id": "#main/gatk_applyrecalibration_cwl",
                    "in": [
                        {
                            "id": "#main/gatk_applyrecalibration_cwl/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/gatk_applyrecalibration_cwl/vcf",
                            "source": [
                                "#main/merge_vcf_pl_cwl/all.out.vcf"
                            ]
                        },
                        {
                            "id": "#main/gatk_applyrecalibration_cwl/recalFile",
                            "source": [
                                "#main/gatk_variantrecalibrator_cwl/recalFile"
                            ]
                        },
                        {
                            "id": "#main/gatk_applyrecalibration_cwl/tranchesFile",
                            "source": [
                                "#main/gatk_variantrecalibrator_cwl/tranchesFile"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/gatk_applyrecalibration_cwl/recal.vcf"
                        },
                        {
                            "id": "#main/gatk_applyrecalibration_cwl/recal.snv"
                        },
                        {
                            "id": "#main/gatk_applyrecalibration_cwl/recal.indel"
                        }
                    ],
                    "run": "#gatk_applyrecalibration.cwl",
                    "label": "gatk_applyRecalibration"
                },
                {
                    "id": "#main/filter_vcf_cwl",
                    "in": [
                        {
                            "id": "#main/filter_vcf_cwl/snv.vcf",
                            "source": [
                                "#main/gatk_applyrecalibration_cwl/recal.snv"
                            ]
                        },
                        {
                            "id": "#main/filter_vcf_cwl/indel.vcf",
                            "source": [
                                "#main/gatk_applyrecalibration_cwl/recal.indel"
                            ]
                        },
                        {
                            "id": "#main/filter_vcf_cwl/vcf",
                            "source": [
                                "#main/gatk_applyrecalibration_cwl/recal.vcf"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/filter_vcf_cwl/overlap_snv"
                        },
                        {
                            "id": "#main/filter_vcf_cwl/overlap_indel"
                        }
                    ],
                    "run": "#filter_vcf.cwl",
                    "label": "filter_vcf"
                },
                {
                    "id": "#main/db_variants_cwl",
                    "in": [
                        {
                            "id": "#main/db_variants_cwl/match_snv.vcf",
                            "source": [
                                "#main/filter_vcf_cwl/overlap_snv"
                            ]
                        },
                        {
                            "id": "#main/db_variants_cwl/match_indel.vcf",
                            "source": [
                                "#main/filter_vcf_cwl/overlap_indel"
                            ]
                        },
                        {
                            "id": "#main/db_variants_cwl/snv.pileup",
                            "source": [
                                "#main/samtools_mpileup_cwl_1/pileup"
                            ]
                        },
                        {
                            "id": "#main/db_variants_cwl/indel.pileup",
                            "source": [
                                "#main/samtools_mpileup_cwl_2/pileup"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/db_variants_cwl/overlap_outfile_indel"
                        },
                        {
                            "id": "#main/db_variants_cwl/overlap_outfile_snv"
                        }
                    ],
                    "run": "#db_variants.cwl",
                    "label": "db_variants"
                },
                {
                    "id": "#main/overlap_general_cwl",
                    "in": [
                        {
                            "id": "#main/overlap_general_cwl/chr.match_snv",
                            "source": [
                                "#main/db_variants_cwl/overlap_outfile_snv"
                            ]
                        },
                        {
                            "id": "#main/overlap_general_cwl/chr.match_indel",
                            "source": [
                                "#main/db_variants_cwl/overlap_outfile_indel"
                            ]
                        },
                        {
                            "id": "#main/overlap_general_cwl/coord_file_snv",
                            "source": [
                                "#main/coord_file_snv"
                            ]
                        },
                        {
                            "id": "#main/overlap_general_cwl/coord_file_indel",
                            "source": [
                                "#main/coord_file_indel"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/overlap_general_cwl/overlap_outfile_snv"
                        },
                        {
                            "id": "#main/overlap_general_cwl/overlap_outfile_indel"
                        }
                    ],
                    "run": "#overlap_general.cwl",
                    "label": "overlap_general-filter_exon"
                },
                {
                    "id": "#main/filter_exon_ns_cwl",
                    "in": [
                        {
                            "id": "#main/filter_exon_ns_cwl/match_snv",
                            "source": [
                                "#main/overlap_general_cwl/overlap_outfile_snv"
                            ]
                        },
                        {
                            "id": "#main/filter_exon_ns_cwl/match_indel",
                            "source": [
                                "#main/overlap_general_cwl/overlap_outfile_indel"
                            ]
                        },
                        {
                            "id": "#main/filter_exon_ns_cwl/coord_snv",
                            "source": [
                                "#main/coord_file_snv"
                            ]
                        },
                        {
                            "id": "#main/filter_exon_ns_cwl/coord_indel",
                            "source": [
                                "#main/coord_file_indel"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/filter_exon_ns_cwl/overlap_outfile_snv"
                        },
                        {
                            "id": "#main/filter_exon_ns_cwl/overlap_outfile_indel"
                        }
                    ],
                    "run": "#filter_exon_ns.cwl",
                    "label": "filter_exon_ns"
                },
                {
                    "id": "#main/filter_splicesite_cwl",
                    "in": [
                        {
                            "id": "#main/filter_splicesite_cwl/chr.match_indel",
                            "source": [
                                "#main/filter_exon_ns_cwl/overlap_outfile_indel"
                            ]
                        },
                        {
                            "id": "#main/filter_splicesite_cwl/chr.match_snv",
                            "source": [
                                "#main/filter_exon_ns_cwl/overlap_outfile_snv"
                            ]
                        },
                        {
                            "id": "#main/filter_splicesite_cwl/chr.coord_snv",
                            "source": [
                                "#main/chr.coord_snv"
                            ]
                        },
                        {
                            "id": "#main/filter_splicesite_cwl/chr.coord_indel",
                            "source": [
                                "#main/chr.coord_indel"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/filter_splicesite_cwl/overlap_outfile_indel"
                        },
                        {
                            "id": "#main/filter_splicesite_cwl/overlap_outfile_snv"
                        }
                    ],
                    "run": "#filter_splicesite.cwl",
                    "label": "filter_splicesite"
                },
                {
                    "id": "#main/filter_vep_cwl",
                    "in": [
                        {
                            "id": "#main/filter_vep_cwl/ref_file_snv",
                            "source": [
                                "#main/filter_splicesite_cwl/overlap_outfile_snv"
                            ]
                        },
                        {
                            "id": "#main/filter_vep_cwl/ref_file_indel",
                            "source": [
                                "#main/filter_splicesite_cwl/overlap_outfile_indel"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/filter_vep_cwl/overlap_outfile_snv"
                        },
                        {
                            "id": "#main/filter_vep_cwl/overlap_outfile_indel"
                        }
                    ],
                    "run": "#filter_vep.cwl",
                    "label": "filter_vep"
                },
                {
                    "id": "#main/filter_dbsnp_indel_cwl",
                    "in": [
                        {
                            "id": "#main/filter_dbsnp_indel_cwl/ref_file_indel",
                            "source": [
                                "#main/filter_vep_cwl/overlap_outfile_indel"
                            ]
                        },
                        {
                            "id": "#main/filter_dbsnp_indel_cwl/coord_file_indel",
                            "source": [
                                "#main/coord_file_indel"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/filter_dbsnp_indel_cwl/overlap_outfile_indel"
                        }
                    ],
                    "run": "#filter_dbsnp_indel.cwl",
                    "label": "filter_dbsnp_indel"
                },
                {
                    "id": "#main/filter_dbsnp_snv_cwl",
                    "in": [
                        {
                            "id": "#main/filter_dbsnp_snv_cwl/ref_file_snv",
                            "source": [
                                "#main/filter_vep_cwl/overlap_outfile_snv"
                            ]
                        },
                        {
                            "id": "#main/filter_dbsnp_snv_cwl/coord_file_snv",
                            "source": [
                                "#main/coord_file_snv"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/filter_dbsnp_snv_cwl/overlap_outfile_snv"
                        }
                    ],
                    "run": "#filter_dbsnp_snv.cwl",
                    "label": "filter_dbsnp_snv"
                },
                {
                    "id": "#main/filter_exac_snv_cwl",
                    "in": [
                        {
                            "id": "#main/filter_exac_snv_cwl/ref_file_snv",
                            "source": [
                                "#main/filter_dbsnp_snv_cwl/overlap_outfile_snv"
                            ]
                        },
                        {
                            "id": "#main/filter_exac_snv_cwl/coord_file_snv",
                            "source": [
                                "#main/coord_file_snv"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/filter_exac_snv_cwl/overlap_outfile"
                        }
                    ],
                    "run": "#filter_exac_snv.cwl",
                    "label": "filter_exac_snv"
                },
                {
                    "id": "#main/filter_exac_indel_cwl",
                    "in": [
                        {
                            "id": "#main/filter_exac_indel_cwl/ref_file_indel",
                            "source": [
                                "#main/filter_dbsnp_indel_cwl/overlap_outfile_indel"
                            ]
                        },
                        {
                            "id": "#main/filter_exac_indel_cwl/coord_file_indel",
                            "source": [
                                "#main/coord_file_indel"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/filter_exac_indel_cwl/overlap_outfile"
                        }
                    ],
                    "run": "#filter_exac_indel.cwl",
                    "label": "filter_exac_indel"
                },
                {
                    "id": "#main/filter_clinvar_snv_cwl",
                    "in": [
                        {
                            "id": "#main/filter_clinvar_snv_cwl/ref_file_snv",
                            "source": [
                                "#main/filter_exac_snv_cwl/overlap_outfile"
                            ]
                        },
                        {
                            "id": "#main/filter_clinvar_snv_cwl/coord_file_snv",
                            "source": [
                                "#main/coord_file_snv"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/filter_clinvar_snv_cwl/overlap_outfile_snv"
                        }
                    ],
                    "run": "#filter_clinvar_snv.cwl",
                    "label": "filter_clinvar_snv"
                },
                {
                    "id": "#main/filter_dbsnp_indel_cwl_1",
                    "in": [
                        {
                            "id": "#main/filter_dbsnp_indel_cwl_1/ref_file_indel",
                            "source": [
                                "#main/filter_exac_indel_cwl/overlap_outfile"
                            ]
                        },
                        {
                            "id": "#main/filter_dbsnp_indel_cwl_1/coord_file_indel",
                            "source": [
                                "#main/coord_file_indel"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/filter_dbsnp_indel_cwl_1/overlap_outfile_indel"
                        }
                    ],
                    "run": "#filter_dbsnp_indel.cwl",
                    "label": "filter_dbsnp_indel"
                },
                {
                    "id": "#main/delly_cwl",
                    "in": [
                        {
                            "id": "#main/delly_cwl/bam",
                            "source": [
                                "#main/samtools_index_cwl_1/sorted.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/delly_cwl/outvcf"
                        },
                        {
                            "id": "#main/delly_cwl/outfile"
                        }
                    ],
                    "run": "#delly.cwl",
                    "label": "delly"
                },
                {
                    "id": "#main/lumpy_cwl",
                    "in": [
                        {
                            "id": "#main/lumpy_cwl/bam",
                            "source": [
                                "#main/samtools_index_cwl_1/sorted.bam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/lumpy_cwl/outfile"
                        },
                        {
                            "id": "#main/lumpy_cwl/outvcf"
                        }
                    ],
                    "run": "#lumpy.cwl",
                    "label": "lumpy"
                },
                {
                    "id": "#main/filter_dgv_cwl",
                    "in": [
                        {
                            "id": "#main/filter_dgv_cwl/dgv_ref",
                            "source": [
                                "#main/dgv_ref"
                            ]
                        },
                        {
                            "id": "#main/filter_dgv_cwl/input1",
                            "source": [
                                "#main/delly_cwl/outvcf"
                            ]
                        },
                        {
                            "id": "#main/filter_dgv_cwl/input2",
                            "source": [
                                "#main/lumpy_cwl/outvcf"
                            ]
                        },
                        {
                            "id": "#main/filter_dgv_cwl/coord_file",
                            "source": [
                                "#main/coord_file"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/filter_dgv_cwl/overlap_outfile"
                        }
                    ],
                    "run": "#filter_dgv.cwl",
                    "label": "filter_dgv"
                },
                {
                    "id": "#main/report_indel_cwl",
                    "in": [
                        {
                            "id": "#main/report_indel_cwl/input",
                            "source": [
                                "#main/filter_dbsnp_indel_cwl_1/overlap_outfile_indel"
                            ]
                        },
                        {
                            "id": "#main/report_indel_cwl/exon_coord_file",
                            "source": [
                                "#main/exon_coord_file"
                            ]
                        },
                        {
                            "id": "#main/report_indel_cwl/annotation_file",
                            "source": [
                                "#main/annotation_file"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/report_indel_cwl/tsv_file"
                        },
                        {
                            "id": "#main/report_indel_cwl/pass_summary_file"
                        },
                        {
                            "id": "#main/report_indel_cwl/pass_file"
                        },
                        {
                            "id": "#main/report_indel_cwl/filter_summary_file"
                        }
                    ],
                    "run": "#report_indel.cwl",
                    "label": "report_indel"
                },
                {
                    "id": "#main/report_snv_cwl",
                    "in": [
                        {
                            "id": "#main/report_snv_cwl/input",
                            "source": [
                                "#main/filter_clinvar_snv_cwl/overlap_outfile_snv"
                            ]
                        },
                        {
                            "id": "#main/report_snv_cwl/annotation_file",
                            "source": [
                                "#main/annotation_file"
                            ]
                        },
                        {
                            "id": "#main/report_snv_cwl/exon_coord_file",
                            "source": [
                                "#main/exon_coord_file"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/report_snv_cwl/tsv_file"
                        },
                        {
                            "id": "#main/report_snv_cwl/pass_summary_file"
                        },
                        {
                            "id": "#main/report_snv_cwl/pass_file"
                        },
                        {
                            "id": "#main/report_snv_cwl/filter_summary_file"
                        }
                    ],
                    "run": "#report_snv.cwl",
                    "label": "report_snv"
                },
                {
                    "id": "#main/filter_gene_cwl",
                    "in": [
                        {
                            "id": "#main/filter_gene_cwl/ref_file_sv",
                            "source": [
                                "#main/filter_dgv_cwl/overlap_outfile"
                            ]
                        },
                        {
                            "id": "#main/filter_gene_cwl/coord_file_sv"
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/filter_gene_cwl/overlap_outfile_sv"
                        }
                    ],
                    "run": "#filter_gene.cwl",
                    "label": "filter_gene"
                },
                {
                    "id": "#main/report_sv_cwl",
                    "in": [
                        {
                            "id": "#main/report_sv_cwl/input",
                            "source": [
                                "#main/filter_gene_cwl/overlap_outfile_sv"
                            ]
                        },
                        {
                            "id": "#main/report_sv_cwl/exon_coord_file",
                            "source": [
                                "#main/exon_coord_file"
                            ]
                        },
                        {
                            "id": "#main/report_sv_cwl/annotation_file",
                            "source": [
                                "#main/annotation_file"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/report_sv_cwl/tsv_file"
                        },
                        {
                            "id": "#main/report_sv_cwl/pass_summary_file"
                        },
                        {
                            "id": "#main/report_sv_cwl/pass_file"
                        },
                        {
                            "id": "#main/report_sv_cwl/filter_summary_file"
                        }
                    ],
                    "run": "#report_sv.cwl",
                    "label": "report_sv"
                },
                {
                    "id": "#main/scp_results_cwl",
                    "in": [
                        {
                            "id": "#main/scp_results_cwl/input1",
                            "source": [
                                "#main/report_snv_cwl/tsv_file"
                            ]
                        },
                        {
                            "id": "#main/scp_results_cwl/input2",
                            "source": [
                                "#main/report_snv_cwl/pass_summary_file"
                            ]
                        },
                        {
                            "id": "#main/scp_results_cwl/input3",
                            "source": [
                                "#main/report_snv_cwl/pass_file"
                            ]
                        },
                        {
                            "id": "#main/scp_results_cwl/input4",
                            "source": [
                                "#main/report_snv_cwl/filter_summary_file"
                            ]
                        },
                        {
                            "id": "#main/scp_results_cwl/input5",
                            "source": [
                                "#main/report_indel_cwl/filter_summary_file"
                            ]
                        },
                        {
                            "id": "#main/scp_results_cwl/input6",
                            "source": [
                                "#main/report_indel_cwl/pass_file"
                            ]
                        },
                        {
                            "id": "#main/scp_results_cwl/input7",
                            "source": [
                                "#main/report_indel_cwl/pass_summary_file"
                            ]
                        },
                        {
                            "id": "#main/scp_results_cwl/input8",
                            "source": [
                                "#main/report_indel_cwl/tsv_file"
                            ]
                        },
                        {
                            "id": "#main/scp_results_cwl/input9",
                            "source": [
                                "#main/report_sv_cwl/tsv_file"
                            ]
                        },
                        {
                            "id": "#main/scp_results_cwl/input10",
                            "source": [
                                "#main/report_sv_cwl/pass_summary_file"
                            ]
                        },
                        {
                            "id": "#main/scp_results_cwl/input11",
                            "source": [
                                "#main/report_sv_cwl/pass_file"
                            ]
                        },
                        {
                            "id": "#main/scp_results_cwl/input12",
                            "source": [
                                "#main/report_sv_cwl/filter_summary_file"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/scp_results_cwl/tar.gz"
                        }
                    ],
                    "run": "#scp_results.cwl",
                    "label": "scp_results"
                },
                {
                    "id": "#main/samtools_mpileup_cwl_3",
                    "in": [
                        {
                            "id": "#main/samtools_mpileup_cwl_3/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/samtools_mpileup_cwl_3/bam",
                            "source": [
                                "#main/samtools_index_cwl_1/sorted.bam"
                            ]
                        },
                        {
                            "id": "#main/samtools_mpileup_cwl_3/exon_coords",
                            "source": [
                                "#main/exon_coords"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/samtools_mpileup_cwl_3/pileup"
                        }
                    ],
                    "run": "#samtools-mpileup-exon.cwl",
                    "label": "samtools-mpileup"
                },
                {
                    "id": "#main/bwa_mem",
                    "in": [
                        {
                            "id": "#main/bwa_mem/forward_reads.gz",
                            "source": [
                                "#main/forward_reads.gz"
                            ]
                        },
                        {
                            "id": "#main/bwa_mem/reference_assembly",
                            "source": [
                                "#main/reference_assembly"
                            ]
                        },
                        {
                            "id": "#main/bwa_mem/reverse_reads.gz",
                            "source": [
                                "#main/reverse_reads.gz"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/bwa_mem/ref_aligned_sam"
                        }
                    ],
                    "run": "#bwa-mem.cwl",
                    "label": "mapping of forward and reverse reads to the reference assembly"
                },
                {
                    "id": "#main/samtools_view_cwl",
                    "in": [
                        {
                            "id": "#main/samtools_view_cwl/sam",
                            "source": [
                                "#main/bwa_mem/ref_aligned_sam"
                            ]
                        }
                    ],
                    "out": [
                        {
                            "id": "#main/samtools_view_cwl/samblaster_out.bam"
                        }
                    ],
                    "run": "#samtools-view.cwl",
                    "label": "samtools-view"
                },
                {
                    "id": "#main/samtools_sort_cwl",
                    "in": [
                        {
                            "id": "#main/samtools_sort_cwl/aligned.sam",
                            "source": [
                                "#main/samtools_view_cwl/samblaster_out.bam"
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
                }
            ]
        }
    ],
    "cwlVersion": "v1.0"
}