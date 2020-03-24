#!/bin/bash
clear

java -jar node_modules/google-closure-compiler-java/compiler.jar \
--compilation_level SIMPLE \
--language_in ECMASCRIPT_NEXT \
--language_out ECMASCRIPT5_STRICT \
--warning_level VERBOSE \
--externs node_modules/sui-externs/*.js \
--formatting SINGLE_QUOTES \
--summary_detail_level 3 \
--jscomp_error "*" \
--jscomp_warning "*" \
--jscomp_off "strictMissingProperties" \
--hide_warnings_for node_modules/sui-externs \
--hide_warnings_for node_modules/google-closure-library \
--generate_exports \
--define "SUI.production=false" \
--js node_modules/google-closure-library/closure/goog/base.js \
--js javascripts/*.js \
--js javascripts/lib/*.js \
--js javascripts/core/*.js \
--js javascripts/module/*.js \
--js javascripts/widget/*.js \
--output_manifest dist/sui.js.mf \
--create_source_map dist/sui.js.map \
--js_output_file dist/sui.js \

sass-lint --verbose --no-exit
sass stylesheets/sui.min.scss dist/sui.css --style expanded
