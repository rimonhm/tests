/*------------------------------------------------------------------------------------

	MSF Dashboard - module-datacheck.js
	(c) Bruno Raimbault for MSF UK
	Please refer to the README.txt for complete licenses.
	
	Components:
	0) Setup  /!\ USER DEFINED ELEMENTS
	1) Data Processing
	2) Display

	Dependencies:
	- module-lang 	OK

------------------------------------------------------------------------------------*/

// 0) Setup
//------------------------------------------------------------------------------------

modules_list.datacheck = true;
g.datacheck_showempty = false;

// Check if disease array is provided empty		
g.medical_diseasecheck = g.medical_diseaseslist.length == 0;

// 1) Data Processing
//------------------------------------------------------------------------------------

function module_datacheck_dataprocessing(){

	// Test Value
	g.datacheck_testvalue = {
		integer: function(rec,key,none){
			var value = rec[g.medical_headerlist[key]];
			var cond_1 = value >= 0;
			var cond_2 = parseInt(Number(value),10) == value;
			return cond_1 && cond_2;
		},
		float: function(rec,key,none){
			var value = rec[g.medical_headerlist[key]];
			var cond_1 = !isNaN(Number(value));
			var cond_2 = !(value == '');
			return cond_1 && cond_2;
		},
		positivefloat: function(rec,key,none){
			var value = rec[g.medical_headerlist[key]];
			var cond_1 = !isNaN(Number(value));
			var cond_2 = !(value == '');
			var cond_3 = value >= 0;
			return cond_1 && cond_2 && cond_3;
		},
		epiwk: function(rec,key,none){
			var value = rec[g.medical_headerlist[key]];
			var year = value.split('-')[0];
			var week = value.split('-')[1];
			var cond_1 = (year.length == 4) && (week.length == 2);
			var cond_2 = year > 0;
			var cond_3 = week > 0 && week < 54;
			return cond_1 && cond_2 && cond_3;
		},
		inlist: function(rec,key,valuelist){
			var value = rec[g.medical_headerlist[key]];
			var cond_1 = !(valuelist.indexOf(value) == -1);
			return cond_1;
		},
		ingeometry: function(rec,key,none){
			var keylist = g.geometry_keylist;
			var count = g.geometry_levellist[key];
			var loc_current = rec[g.medical_headerlist[key]].trim();
			while(count > 0){
				count--;
				loc_current = rec[g.medical_headerlist[keylist[count]]].trim()+', '+loc_current;
			}
			var cond_1 = !(g.geometry_loclists[key].indexOf(loc_current) == -1);
			var cond_2 = g.medical_loclists[key].indexOf(loc_current) == -1;
			if(cond_1 && cond_2){
				g.medical_loclists[key].push(loc_current);
				g.medical_loclists.all.push(loc_current);
			}
			return cond_1;
		},
		empty: function(rec,key,none){
			if(rec[g.medical_headerlist[key]] == undefined){
				var cond_1 = true;
			}else{
				var cond_1 = rec[g.medical_headerlist[key]] == '';
			}
			return cond_1;
		}
	};

	// Test whole record
	
	// Builder of: list of keys for duplicate check
	var uniquereclist = {};
	var duplicatereclist = {};

	g.datacheck_testrecord = {
		duplicate: function(rec) {
			var key = '';
			g.datacheck_definition_record.forEach(function(check) {
				key += rec[check.key] + ";";
			});
			if (!uniquereclist[key]){
				uniquereclist[key] = true;
				return false;
			}else{
				duplicatereclist[key] = true;
		        return true;
		    }
		}
	};

	// Logging errors
	function datacheck_errorlogging(test,test_type,key,rec){
		if (!test) {
			if(test_type == 'empty'){
				g.datacheck_sum.empty[key]++;
			}else{
				g.datacheck_sum.error[key]++;
			}
			g.datacheck_sum.all++;
			if (test_type == 'duplicate'){
				var value = '';
			}else{
				var value = rec[g.medical_headerlist[key]];
			}
			var temp_log = ''+g.datacheck_sum.all +',"'+key+'","'+value+'","'+test_type+'"';
			g.datacheck_definition_record.forEach(function(log) {
				if(log.isnumber){	
					temp_log += ','+Number(rec[log.key]);
				}else{
					temp_log += ',"'+rec[log.key]+'"';
				}
			});
			g.datacheck_log.push(temp_log+'');
		}
	}

	// Log initiation
	g.datacheck_log = [];
	g.datacheck_log.push('"er_id","er_field","er_value","er_type"')
	g.datacheck_definition_record.forEach(function(log) {
		g.datacheck_log[0] += ',"'+log.key+'"';
	});
	g.datacheck_log[0] += '';

	// Error counters initation
	g.datacheck_sum = {};
	g.datacheck_sum.error = {};
	g.datacheck_sum.empty = {};

	g.medical_loclists = {};
	g.medical_keylist = Object.keys(g.medical_headerlist);
	g.medical_keylist.forEach(function(key){
		g.datacheck_sum.error[key] = 0;
		g.datacheck_sum.empty[key] = 0;
	});
	g.datacheck_sum.all = 0;

	// Locations in dataset initiation
	g.geometry_keylist.forEach(function(key) {
		g.medical_loclists[key] = [];
	});
	g.medical_loclists.all = [];

	// Years in dataset initiation
	g.medical_yearlist = [];
	g.medical_weeklist = [];

	// Surveillance
	//------------------------------------------------------------------------------------
	// Completeness
	g.medical_completeness = {};
	g.geometry_keylist.forEach(function(key) {
		g.medical_completeness[key] = {};
	});
	
	function completenessCheck(rec) {

		//var temp_adm = g.geometry_keylist[g.geometry_keylist.length - 1];
		var temp_loc = '';
		g.geometry_keylist.forEach(function(key,keynum) {		
			temp_loc += ', ' + rec[g.medical_headerlist[key]].trim();
		});
		var temp_key = rec[g.medical_headerlist.epiwk] + temp_loc;
		temp_loc = temp_loc.substring(2, temp_loc.length);
		if(!(g.medical_completeness[temp_key])){
			g.medical_completeness[temp_key] = {
				admNx: temp_loc,
				epiwk: rec[g.medical_headerlist.epiwk],
				value: 1
			};
			//g.medical_completeness[temp_adm].push(medical_completeness[temp_adm][temp_key]);
		

			for (var i = g.geometry_keylist.length - 2; i >= 0; i--) {
			 	var temp_loc = '';
				for (var j = 0; j <= i; j++) {
					temp_loc += ', ' + rec[g.medical_headerlist[g.geometry_keylist[j]]].trim();	
				}
				var temp_key = rec[g.medical_headerlist.epiwk] + temp_loc;
				temp_loc = temp_loc.substring(2, temp_loc.length);
			 	if(!(g.medical_completeness[temp_key])){
					g.medical_completeness[temp_key] = {
						admNx: temp_loc,
						epiwk: rec[g.medical_headerlist.epiwk],
						value: 1/ g.geometry_subnum[temp_loc]
					};
				}else{
					g.medical_completeness[temp_key].value += 1/ g.geometry_subnum[temp_loc];
				}
			}
		} 
	}

	// Data browse
	g.medical_data.forEach(function(rec){



		var test_duplicate = g.datacheck_testrecord.duplicate(rec);
		datacheck_errorlogging(!(test_duplicate),'duplicate','',rec);

		g.medical_keylist.forEach(function(key){

			var is_empty = g.datacheck_testvalue.empty(rec,key,'none');
			if(is_empty){
				datacheck_errorlogging(!(is_empty),'empty',key,rec);
			}else{
				if(key !== 'disease' || !g.medical_diseasecheck){
					var test_value = g.datacheck_testvalue[g.datacheck_definition_value[key].test_type](rec,key,g.datacheck_definition_value[key].setup);
					datacheck_errorlogging(test_value,g.datacheck_definition_value[key].test_type,key,rec);
				}
			}
		});

		if(g.medical_yearlist.indexOf(rec[g.medical_headerlist.epiwk].split('-')[0]) == -1){
			g.medical_yearlist.push(rec[g.medical_headerlist.epiwk].split('-')[0]);
		}
		if(g.medical_weeklist.indexOf(rec[g.medical_headerlist.epiwk]) == -1){
			g.medical_weeklist.push(rec[g.medical_headerlist.epiwk]);
		}

		completenessCheck(rec);

		// Surveillance
		//------------------------------------------------------------------------------------
		// If disease array is provided empty		
		if((g.medical_diseaseslist.indexOf(rec[g.medical_headerlist.disease].trim()) == -1) && g.medical_diseasecheck){
			g.medical_diseaseslist.push(rec[g.medical_headerlist.disease].trim());
		}
		
	});

}

function module_datacheck_showlog(){

	var html = '<p><br><a id="more-datacheck"></a></p>';
	html += '<div id="datacheck_log">'; /*hidden="false">'*/
    html += '<pre id="datacheck_pre"><small>';
   	g.datacheck_log.forEach(function(rec){
   		if(g.datacheck_showempty || !(rec.split(',')[3] == '"empty"')){
	   		html += rec +'<br>';
   		}
    });
    html +='</small></pre>';
    if (g.datacheck_showempty) { 
    	var temp_text = g.module_lang.text[g.module_lang.current].datacheck_emptless;
    }else{
    	var temp_text = g.module_lang.text[g.module_lang.current].datacheck_emptmore;
    }
    html += '<button class="col-md-6" onclick=\'ShowEmpty()\'>'+temp_text+'</button>';
    html += '<button class="col-md-6" onclick=\'CopyText("datacheck_pre")\'>'+g.module_lang.text[g.module_lang.current].datacheck_copy+'</button></div>';
	//html += '<p><br>'+ g.module_lang.text[g.module_lang.current].datacheck_key +'</a></p>';

    $('#datalog').html(html);
}

function ShowEmpty(){
	g.datacheck_showempty = !(g.datacheck_showempty);
	module_datacheck_showlog();
    module_datacheck_interaction();
}

function SelectText(element) {
    var doc = document
        , text = doc.getElementById(element)
        , range, selection
    ;    
    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();        
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

function CopyText(element) {
		var output = SelectText("datacheck_pre");
		var hiddenDiv = $('<div/>')
			.css( {
				height: 1,
				width: 1,
				overflow: 'hidden',
				position: 'fixed',
				top: 0,
				left: 0
			} );

		var textarea = $('<textarea readonly/>')
			.val( output )
			.appendTo( hiddenDiv );

		// For browsers that support the copy execCommand, try to use it
		if ( document.queryCommandSupported('copy') ) {
			hiddenDiv.appendTo(output);
			textarea[0].focus();
			textarea[0].select();

			try {
				document.execCommand( 'copy' );
				hiddenDiv.remove();
				return;
			}
			catch (t) {}
		}
}

function module_datacheck_interaction(){

	$('#more-datacheck').html(g.module_lang.text[g.module_lang.current].datacheck_less);

    $('#more-datacheck').on('click',function(e) {
        if ($('#datacheck_log').is(':hidden') == true) {
            $('#datacheck_log').slideToggle();
            $('#more-datacheck').html(g.module_lang.text[g.module_lang.current].datacheck_less);
        }else{
            $('#datacheck_log').slideToggle();
            $('#more-datacheck').html(g.module_lang.text[g.module_lang.current].datacheck_more);
        }
    });

    $('#more-datacheck').click();
}

// 2) Display
//------------------------------------------------------------------------------------
function module_datacheck_display(){
	
	// Title
	var html = '<p><b>'+g.module_lang.text[g.module_lang.current].datacheck_title+'</b></p>';

	// Intro
	html += '<p>'+g.module_lang.text[g.module_lang.current].datacheck_intro+'</p>';
	
	// Content
	html += '<table style="font-size:13px;">';
	html += '<tr><th>'+g.module_lang.text[g.module_lang.current].datacheck_header+'</th><th>&nbsp;#'+g.module_lang.text[g.module_lang.current].datacheck_error+'</th><th>&nbsp;(%'+g.module_lang.text[g.module_lang.current].datacheck_error+')</th><th>&nbsp;#'+g.module_lang.text[g.module_lang.current].datacheck_empty+'</th><th>&nbsp;(%'+g.module_lang.text[g.module_lang.current].datacheck_empty+')</th></tr>'

	function createRow(temp_name){
		var temp_data = {};
		temp_data.error = g.datacheck_sum.error[temp_name];
		temp_data.empty = g.datacheck_sum.empty[temp_name];
		var temp_value = {};
		temp_value.error = Math.round((temp_data.error / g.medical_data.length)*100);
		temp_value.empty = Math.round((temp_data.empty / g.medical_data.length)*100);
		return '<tr><td>'+ g.medical_headerlist[temp_name] +':&nbsp;</td><td>&nbsp;' + temp_data.error + '</td><td>&nbsp;(or ' + temp_value.error + '%)</td>&nbsp;</td><td>&nbsp;' + temp_data.empty + '</td><td>&nbsp;(or ' + temp_value.empty + '%)</td></tr>'; 
	}

	Object.keys(g.medical_headerlist).forEach(function(key){
		html += createRow(key);
	})

	html += '</table>';

	return html;
}
