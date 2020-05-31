::windows batch
cls

call java -jar node_modules/google-closure-compiler-java/compiler.jar^
 --compilation_level ADVANCED^
 --language_in ECMASCRIPT_NEXT^
 --language_out ECMASCRIPT5_STRICT^
 --warning_level VERBOSE^
 --externs node_modules/sui-externs/*.js^
 --formatting SINGLE_QUOTES^
 --summary_detail_level 3^
 --jscomp_error "*"^
 --jscomp_warning "*"^
 --jscomp_off "strictMissingProperties"^
 --jscomp_off "useOfGoogProvide"^
 --hide_warnings_for node_modules/sui-externs^
 --hide_warnings_for node_modules/google-closure-library^
 --generate_exports^
 --define "SUI.production=true"^
 --js node_modules/google-closure-library/closure/goog/base.js^
 --js javascripts/*.js^
 --js javascripts/lib/*.js^
 --js javascripts/core/*.js^
 --js javascripts/module/*.js^
 --js javascripts/widget/*.js^
 --output_manifest dist/sui.min.js.mf^
 --create_source_map dist/sui.min.js.map^
 --js_output_file dist/sui.min.js

call sass-lint --verbose --no-exit
call sass stylesheets/sui.min.scss dist/sui.min.css --style compressed
