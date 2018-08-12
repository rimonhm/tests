/*------------------------------------------------------------------------------------

	MSF Dashboard - main-loadfiles.js
	(c) Bruno Raimbault for MSF UK
	Please refer to the README.txt for complete licenses.
	
	Components:
	0) Setup /!\ USER DEFINED ELEMENTS
	1) Show loading screen
	2) Getting file list (chose online/offline option by comenting appropriate section)
	3) Pre-Load geometry and population files
	4) Load selected medical data file
	5) Read selected medical data file
	6) Generate display

	Dependencies:
	- module-lang 	OK

------------------------------------------------------------------------------------*/

console.log(g);

// 0) Setup /!\ USER DEFINED ELEMENTS
//------------------------------------------------------------------------------------

g.medical_keylist = Object.keys(g.medical_headerlist);

// UN-COMMENT THE FOLLOWING TO PUBLISH ONLINE
// ...and complete #your_datafolder# and #your_filelist# 
// Reading filelist statically (without nwjs)
//------------------------------------------------------------------------------------

g.medical_folder = 'data/';
g.medical_filelist_raw = ['DEMO_tonkolili_database_wks-201543-201553.csv'];
 

// COMMENT THE FOLLOWING TO PUBLISH ONLINE
// Reading filelist dynamically (with nwjs)
//------------------------------------------------------------------------------------
/*var fs = require('fs');
var path = require('path');
g.medical_folder = path.dirname(process.execPath).split('\\programs\\dashboard')[0]+'\\data-folders\\04-dashboard-input\\';
console.log(g.medical_folder);
g.medical_filelist_raw = fs.readdirSync(g.medical_folder);*/


// 1) Show loading Screen
//------------------------------------------------------------------------------------
$('#modal').modal({
    backdrop: 'static',
    keyboard: false
});

$('#modal').modal('show');

// 2) Getting datafiles list
//------------------------------------------------------------------------------------
g.medical_filecurrent = undefined;
g.medical_filelist = [];

// Check file format (currently only .text / tabulation separated values - tsv)
g.medical_filelist_raw.forEach(function(f){
	if(f.substr(f.length - 4)=='.txt' || f.substr(f.length - 4)=='.TXT' || f.substr(f.length - 4)=='.csv' || f.substr(f.length - 4)=='.CSV'){
		g.medical_filelist.push(f);
	}
});

//	3) Pre-Load geometry and population files
//------------------------------------------------------------------------------------

// Initialise with first medical file in the list
g.medical_filecurrent = g.medical_filelist[0];
g.medical_filetypecurrent = g.medical_filecurrent.substr(g.medical_filecurrent.length - 3);

if(g.population_filelist){
	g.population_bypass = [true,'queue_population'];
}else{
	g.population_bypass = [false,'read_commons'];
}
if(g.mask_filelist){
	g.mask_bypass = [true,'queue_mask'];
}else{
	g.mask_bypass = [false,'read_commons'];
}


queue_geometry();


function queue_geometry() {
	g.geometry_data = {};
	if(!(g.mask_bypass[0] || g.population_bypass[0])){
		queue_list(g.geometry_filelist,'json',g.geometry_data,g.population_bypass[1]);
	}else if(g.mask_bypass[0]){
		queue_list(g.geometry_filelist,'json',g.geometry_data,g.mask_bypass[1]);
	}else if(g.population_bypass[0]){
		queue_list(g.geometry_filelist,'json',g.geometry_data,g.population_bypass[1]);
	}
}
function queue_mask() {
	g.mask_bypass[1] = 'read_commons';
	g.mask_data = {};
	queue_list(g.mask_filelist,'json',g.mask_data,g.population_bypass[1]);
}
function queue_population() {
	g.population_bypass[1] = 'read_commons';
	g.population_data = {};	
	queue_list(g.population_filelist,'csv',g.population_data,g.mask_bypass[1]);
}

// Load a list of files
function queue_list(filelist,filetype,dataobject,exit_fun) {
	var keylist = Object.keys(filelist);
	var keynum_current = 0;

	// Queue Initiation
	queue()
		.defer(d3[filetype], filelist[keylist[keynum_current]]) // 1st file
		.await(queue_list_recursive);

	// Queue Recursive
	function queue_list_recursive(error,data) {
		dataobject[keylist[keynum_current]] = data;
		keynum_current++;
		if (keylist.length > keynum_current) {
			queue()
				.defer(d3[filetype], filelist[keylist[keynum_current]]) // rest of files
				.await(queue_list_recursive);
		} else {
			window[exit_fun]();
		}
	}
}

// Read geometry and population data
function read_commons(){
	g.geometry_loclists = {};
	g.geometry_loclists.all = [];
	g.geometry_keylist = Object.keys(g.geometry_filelist);
	g.geometry_levellist = {};
	g.geometry_subnum = {};
	g.geometry_keylist.forEach(function(key,keynum){
		g.geometry_levellist[key] = keynum;
		g.geometry_loclists[key] = [];
		g.geometry_data[key].features.forEach(function(f){
			g.geometry_loclists[key].push(f.properties.name.trim());
			g.geometry_loclists.all.push(f.properties.name.trim());

			// Compute number of Sub-Area in Area			
			if(keynum == g.geometry_keylist.length - 1){
				g.geometry_subnum[f.properties.name.trim()]	= 1	;
				var temp_loc = ''; 
				for (var i =  0; i <= g.geometry_keylist.length - 2; i++) {
					for (var j = 0; j <= i; j++) {
						temp_loc += ', ' + f.properties.name.trim().split(', ')[j];				
					}
					temp_loc = temp_loc.substring(2, temp_loc.length);
					g.geometry_subnum[temp_loc]++;
				}	
			}else{
				g.geometry_subnum[f.properties.name.trim()]	= 0	;	
			}	


		});
	});
	
	if(g.population_bypass[0]){
		g.population_loclists = {};
		g.population_popdata = {};
		g.population_keylist = Object.keys(g.population_filelist);
		g.population_keylist.forEach(function(key){
			g.population_loclists[key] = [];
			g.population_popdata[key] = {};
			g.population_data[key].forEach(function(f){
				g.population_loclists[key].push(f[g.population_headerlist.admNx.trim()]);
				g.population_popdata[key][f[g.population_headerlist.admNx.trim()]] = parseInt(f[g.population_headerlist.pop]);
			});
		});	
	}
	
	queue_medical();
}

// 4) Load selected medical data file
//------------------------------------------------------------------------------------
function queue_medical() {
	console.log(g.medical_folder + g.medical_filecurrent);
	console.log(g.medical_filetypecurrent);
	queue()
	.defer(d3[g.medical_filetypecurrent], g.medical_folder + g.medical_filecurrent)
	.await(read_medical);
}

// 5) Read selected data file
//------------------------------------------------------------------------------------
function read_medical(error,data){
	g.medical_data = data;

	// Load Here Optional Modules DataProcessing:
	//------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------

	// Load Optional Module: module-datacheck.js
	//------------------------------------------------------------------------------------
	module_datacheck_dataprocessing();

	//------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------

	generate_display();
}

// 6) Generate Display
//------------------------------------------------------------------------------------
function generate_display() {
	var html = '<p><b>'+g.module_lang.text[g.module_lang.current].loadfiles_choose+'</b></p><select class="select-lf" id="selectform">';
	html +='<p><option value="'+g.medical_filecurrent+'">'+g.medical_filecurrent+'</option>';
	g.medical_filelist.forEach(function(f){
		if (f!==g.medical_filecurrent) {html +='<option value="'+f+'">'+f+'</option>';};
	});
	html += '</select> <span id="langselect"></span></p>';
	html += '<p>'+g.module_lang.text[g.module_lang.current].loadfiles_selected[0]+' <b>' + g.medical_data.length + '</b> (=2x'+ g.medical_data.length/2 +') '+g.module_lang.text[g.module_lang.current].loadfiles_selected[1]+'</p>';

	// Load Here Optional Modules Display:
	//------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------

	html += '<div class="row">';

	// Load Optional Module: module-datacheck.js
	//------------------------------------------------------------------------------------
	html += '<div class="col-md-5">';
	html += module_datacheck_display();
	html += '</div>';

	// Load Optional Module: module-datacheck.js
	//------------------------------------------------------------------------------------
	html += '<div id="datalog" class="col-md-7">';
	html += '</div>';

	
	// Load Optional Module: module-colorscale.js
	//------------------------------------------------------------------------------------
	//html += '<div class="col-md-6">';
	//html += module_colorscale_display();
	//html += '</div>';

	html += '</div>';
	//------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------


	html += '<div class="row"><div class="col-md-12"><p><br><button class="select-lf" id="loaddashboard">'+g.module_lang.text[g.module_lang.current].loadfiles_load+'</button></p></div></div>';

	html += '<div class="row">';

	html += '</div>';


	$('.modal-content').html(html);

	$("#selectform").change(function(){
		console.log(g.medical_filecurrent);
		g.medical_filecurrent = $('#selectform').val();
		console.log(g.medical_filecurrent);
		g.medical_filetypecurrent = g.medical_filecurrent.substr(g.medical_filecurrent.length - 3);
		queue_medical();
	});
	

	// Load Here Optional Modules Interaction:
	//------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------

	// Load Optional Modules: module-datacheck.js | module-lang.js
	//------------------------------------------------------------------------------------
	//module_colorscale_interaction();
	module_lang_display();
	module_datacheck_showlog();
	module_datacheck_interaction();

	$('#loaddashboard').on('click',function(){
		$('#modal').modal('hide');
		main_loadfiles_readvar();
		generateDashboard();
	});

	//------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------

}
