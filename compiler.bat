::windows batch
cls

call java -jar ../node_modules/google-closure-compiler/compiler.jar^
 --compilation_level ADVANCED_OPTIMIZATIONS^
 --language_in ECMASCRIPT_2017^
 --language_out ECMASCRIPT5_STRICT^
 --warning_level VERBOSE^
 --externs ../vendor/assets/javascripts/externs/*.js^
 --formatting SINGLE_QUOTES^
 --summary_detail_level 3^
 --jscomp_error "*"^
 --jscomp_warning "*"^
 --generate_exports^
 --define "SUI.debug=true"^
 --js ../app/assets/javascripts/sui/*.js^
 --js ../app/assets/javascripts/sui/lib/*.js^
 --js ../app/assets/javascripts/sui/core/*.js^
 --js ../app/assets/javascripts/sui/module/*.js^
 --js ../app/assets/javascripts/sui/widget/*.js^
 --output_manifest manifest.mf^
 --js_output_file app.min.js

call sass ../app/assets/stylesheets/app/index.scss app.css --style expanded
