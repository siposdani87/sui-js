::windows batch

call java -jar node_modules/google-closure-compiler-java/compiler.jar^
 --compilation_level ADVANCED^
 --language_in ECMASCRIPT_NEXT^
 --language_out ECMASCRIPT_2015^
 --module_resolution NODE^
 --warning_level VERBOSE^
 --externs node_modules/sui-externs/*.js^
 --formatting SINGLE_QUOTES^
 --summary_detail_level 3^
 --jscomp_error "*"^
 --jscomp_warning "*"^
 --jscomp_off "strictMissingProperties"^
 --jscomp_off "useOfGoogProvide"^
 --jscomp_off "deprecated"^
 --hide_warnings_for src/test^
 --hide_warnings_for node_modules/sui-externs^
 --hide_warnings_for node_modules/google-closure-library^
 --generate_exports^
 --define "releaseMode=true"^
 --js src/*.js^
 --js src/**/*.js^
 --output_manifest dist/sui.min.js.mf^
 --create_source_map dist/sui.min.js.map^
 --js_output_file dist/sui.min.js

call npx sass-lint --verbose --no-exit
call npx sass styles/sui.min.scss dist/sui.min.css --style compressed
