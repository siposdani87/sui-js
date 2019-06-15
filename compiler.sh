#!/bin/bash
clear

java -jar node_modules/google-closure-compiler-java/compiler.jar \
--compilation_level SIMPLE_OPTIMIZATIONS \
--language_in ECMASCRIPT_2017 \
--language_out ECMASCRIPT5_STRICT \
--warning_level VERBOSE \
--externs node_modules/sui-externs/*.js \
--formatting SINGLE_QUOTES \
--summary_detail_level 3 \
--jscomp_error "*" \
--jscomp_warning "*" \
--generate_exports \
--define "SUI.debug=true" \
--js javascripts/*.js \
--js javascripts/lib/*.js \
--js javascripts/core/*.js \
--js javascripts/module/*.js \
--js javascripts/widget/*.js \
--output_manifest dist/sui.mf \
--js_output_file dist/sui.js \

sass-lint --verbose --no-exit
sass stylesheets/sui.min.scss dist/sui.css --style expanded

gulp
