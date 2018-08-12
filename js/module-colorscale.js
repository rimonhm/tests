/*------------------------------------------------------------------------------------
	MSF Dashboard - module-colorscale.js
	(c) Bruno Raimbault for MSF UK
	
	Components:
	0) Setup /!\ USER DEFINED ELEMENTS
	1) Display
	2) Interaction

	Dependencies:
	- module-lang 	OK

------------------------------------------------------------------------------------*/

// 0) Setup
//------------------------------------------------------------------------------------

modules_list.colorscale = true;

g.colorscale_mapunitlist = ['Cases','Incidence','Completeness'/*,'attack'*/];
g.colorscale_mapunitcurrent = 'Cases';

// Adjust type


g.colorscale_modelist = ['Auto'/*,'Presets'*/,'Manual'];
g.colorscale_modecurrent = 'Auto';


g.colorscale_values = {
	cases: ['NA',0,50,100,250,500,500],
	incidence: ['NA',0,0.1,0.25,0.5,1],
	attack: ['NA',0,0.1,0.25,0.5,1]
};
g.colorscale_valuescurrent = g.colorscale_values.cases;

g.colorscale_colors = {
	Classic: ['#DDDDDD','#fcbba1','#fc9272','#fb6a4a','#de2d26','#a50f15'],
	Diverging: ['#DDDDDD','#1a9641','#a6d96a','#ffffbf','#fdae61','#d7191c'],
	Qualitative: ['#DDDDDD','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33'], 
	ReversedDiverging: ['#DDDDDD','#d7191c','#fdae61','#ffffbf','#a6d96a','#1a9641'],
};
g.colorscale_colorslist = Object.keys(g.colorscale_colors);
g.colorscale_colorscurrent = 'Classic';

g.colorscale_scaletypelist = ['Jenks','EqInterval'/*,'StdDeviation'*/,'ArithmeticProgression','GeometricProgression','Quantile'];
g.colorscale_scaletypecurrent = 'Jenks';


// 1) Display
//------------------------------------------------------------------------------------

function module_colorscale_display() {

	// Title
	var html = '<div><p><b>'+g.module_lang.text[g.module_lang.current].colorscale_title+'</b></p>';
	
	if(g.medical_datatype == 'surveillance'){html += '<div class="col-md-4">';}

	// Unit
	html += '<p><table style="font-size:1em;">';

		g.colorscale_mapunitlist.forEach(function(unit,unitnum) {
			if(unitnum == 0){
				var text = g.module_lang.text[g.module_lang.current].colorscale_unitintro;
			}else{
				var text = '';
			}
			if(unit == g.colorscale_mapunitcurrent){
				html += '<tr><td>'+text+' </td><td><input type="radio" name="group1" id="'+unit+'" value='+unitnum+' checked> '+unit+'</td></tr>';
			}else{
				html += '<tr><td>'+text+'</td><td><input type="radio" name="group1" id="'+unit+'" value='+unitnum+'> '+unit+'</td></tr>';
			}
		});
		
	html +=	'</table></p>';
	
	if(g.medical_datatype == 'surveillance'){html += '</div><div class="col-md-4">';}

	// Colorscale mode
	html += '<p><table style="font-size:1em;">';

	g.colorscale_modelist.forEach(function(mode,modenum) {
		if(modenum == 0){
			var text = g.module_lang.text[g.module_lang.current].colorscale_modeintro;
		}else{
			var text = '';
		}
		if(mode == g.colorscale_modecurrent){
			html += '<tr><td>'+text+' </td><td><input type="radio" name="group2" id="'+mode+'" value='+modenum+' checked> '+mode+'</td></tr>';
		}else if(mode == 'Presets'){
			html += '<tr><td>'+text+'</td><td><input type="radio" name="group2" id="'+mode+'" value='+modenum+' disabled=true> '+mode+'</td></tr>';
		}else{
			html += '<tr><td>'+text+'</td><td><input type="radio" name="group2" id="'+mode+'" value='+modenum+'> '+mode+'</td></tr>';
		}
	});

	html +=	'</table></p>';

	if(g.medical_datatype == 'surveillance'){html += '</div><div class="col-md-4">';}

	// Colors and intervals
	html += '<p>'+g.module_lang.text[g.module_lang.current].colorscale_choosecolor+'<select class="select-cs" id="selectform1">';
	html +='<option value="'+g.colorscale_colorscurrent+'">'+g.colorscale_colorscurrent+'</option>';
	g.colorscale_colorslist.forEach(function(f){
		if (f!==g.colorscale_colorscurrent) {html +='<option value="'+f+'">'+f+'</option>';};
	});
	html +='</p></select>';

	html += '<p>'+g.module_lang.text[g.module_lang.current].colorscale_choosetype+'<select class="select-cs" id="selectform2">';
	html +='<option value="'+g.colorscale_scaletypecurrent+'">'+g.colorscale_scaletypecurrent+'</option>';
	g.colorscale_scaletypelist.forEach(function(f){
		if (f!==g.colorscale_scaletypecurrent) {html +='<option value="'+f+'">'+f+'</option>';};
	});
	html +='</p></select>';

	if(g.medical_datatype == 'surveillance'){html += '</div>';}

	//html += '<p>'+g.module_lang.text[g.module_lang.current].colorscale_howto+'</p>';
	
	// Content
	/*html += '<table class="legend" style="font-size:13px;">';

		html += '<tr><td><i style="background:' + g.colorscale_colors[g.colorscale_mapunit_current][5] + '"></i></td><td><input id="mcs_inp5" class="mcs_inp" type="text" value=' + g.colorscale_values[g.colorscale_mapunit_current][5].toFixed(2) + '></td><td>+</td><td></td></tr>';
		html += '<tr><td><i style="background:' + g.colorscale_colors[g.colorscale_mapunit_current][4] + '"></i></td><td><input id="mcs_inp4" class="mcs_inp" type="text" value=' + g.colorscale_values[g.colorscale_mapunit_current][4].toFixed(2) + ' ></td><td>&ndash;&nbsp;</td><td id="mcs_oup5">' + g.colorscale_values[g.colorscale_mapunit_current][5].toFixed(2) + '</td></tr>';
		html += '<tr><td><i style="background:' + g.colorscale_colors[g.colorscale_mapunit_current][3] + '"></i></td><td><input id="mcs_inp3" class="mcs_inp" type="text" value=' + g.colorscale_values[g.colorscale_mapunit_current][3].toFixed(2) + ' ></td><td>&ndash;&nbsp;</td><td id="mcs_oup4">' + g.colorscale_values[g.colorscale_mapunit_current][4].toFixed(2) + '</td></tr>';
		html += '<tr><td><i style="background:' + g.colorscale_colors[g.colorscale_mapunit_current][2] + '"></i></td><td><input id="mcs_inp2" class="mcs_inp" type="text" value=' + g.colorscale_values[g.colorscale_mapunit_current][2].toFixed(2) + ' ></td><td>&ndash;&nbsp;</td><td id="mcs_oup3">' + g.colorscale_values[g.colorscale_mapunit_current][4].toFixed(2) + '</td></tr>';
		html += '<tr><td><i style="background:' + g.colorscale_colors[g.colorscale_mapunit_current][1] + '"></i></td><td><input id="mcs_inp1" class="mcs_inp" type="text" value=' + g.colorscale_values[g.colorscale_mapunit_current][1].toFixed(2) + ' ></td><td>&ndash;&nbsp;</td><td id="mcs_oup2">' + g.colorscale_values[g.colorscale_mapunit_current][2].toFixed(2) + '</td></tr>';
		html += '<tr><td><i style="background:' + g.colorscale_colors[g.colorscale_mapunit_current][0] + '"></i></td><td style="font-size:0.7em">'+g.module_lang.text[g.module_lang.current].map_legendNA+'</td></tr>';
	html += '</table>';*/
	html += '</div></div>';

	return html;
}

// 2) Interaction
//------------------------------------------------------------------------------------

function module_colorscale_interaction(){

    $("#selectform1").on('change',function(){
		g.colorscale_colorscurrent = $('#selectform1').val();

		if (g.viz_definition.multiadm.display_colors) {
            var color_list = [];
            g.viz_definition.multiadm.display_colors.forEach(function(num) {
                color_list.push(g.colorscale_colors[g.colorscale_colorscurrent][num]);
            });
            var color_domain = [0,color_list.length - 1];
        }

	    /*function valueAccessor(d){
	    	console.log(['value',d]);
	        if (g.colorscale_mapunitcurrent == 'Incidence') {
	            var filters=g.viz_definition['epiwk'].chart.filters().length;
	            if(filters==0){
	                filters=g.viz_definition['epiwk'].domain.length;
	            }
	            return (d.value.Values/g.population_data.pop[d.key]*10000)/filters;
	        }else if(g.colorscale_mapunitcurrent == 'Completeness') {
	            var filters=g.viz_definition['epiwk'].chart.filters();
	            console.log(filters);
	            console.log(d.key);
	            console.log(g.medical_completeness.admN1[0]);
	            console(['d',d]);
	            //if(filters==0){
	                filters=g.viz_definition['epiwk'].domain.length;
	            //}
	            return d.value.Values;
	        }else{
	            return d.value.Values;
	        };
	    };*/

	    function colorAccessor(d){
	    	var col = g.colorscale_valuescurrent.length - 1;
	        if(d || (!(d == undefined) && g.colorscale_mapunitcurrent == 'Completeness')){
	            while ((d < g.colorscale_valuescurrent[col]) && (col > 1)){
	                col--;
	            }
	        }else{
	            col = 0;
	        }
	    	if(g.colorscale_valuescurrent.length < 7){
	    		col--;	
	    	}
	        return col;
	    }

		$('.legend').remove();
	    g.geometry_keylist.forEach(function(adm) {
	    	g.viz_definition.multiadm.charts[adm]
	    		.colors(g.colorscale_colors[g.colorscale_colorscurrent])
	    		//.valueAccessor(valueAccessor)
                .colorDomain(color_domain)
                .colorAccessor(colorAccessor); 
		    g.viz_definition.multiadm.legend[adm].addTo(g.viz_definition.multiadm.maps[adm]);
	    })
		dc.redrawAll();	
	});

	$("#selectform2").on('change',function(){
		g.colorscale_scaletypecurrent = $('#selectform2').val();
		module_colorscale_lockcolor(g.colorscale_modecurrent);	
	});

	g.colorscale_modelist.forEach(function(mode){
		$('#'+mode).on('change',function(){
			if($('#'+mode).is(':checked')) {
				g.colorscale_modecurrent = g.colorscale_modelist[$('#'+mode).val()];
			}
			console.log(['mode',g.colorscale_modecurrent]);
		});
	});

	g.colorscale_mapunitlist.forEach(function(unit){
		$('#'+unit).on('change',function(){
			if($('#'+unit).is(':checked')) {
				g.colorscale_mapunitcurrent = g.colorscale_mapunitlist[$('#'+unit).val()];
				if(g.colorscale_mapunitcurrent == 'Completeness'){
					$('#selectform1').val('ReversedDiverging');	
					g.colorscale_colorscurrent = 'ReversedDiverging';
					if(typeof g.viz_definition.disease.chart.filter() == 'string'){
			            var temp_disease = g.medical_currentdisease.substring(0,g.medical_currentdisease.length);
						g.medical_pastdisease = temp_disease;
						g.viz_definition.disease.chart.filterAll();
						g.medical_currentdisease = g.medical_pastdisease; 
					}
	                
	                $('#chart-disease').addClass("noclick");
	                $('#chart-fyo').addClass("noclick");
	                /*g.geometry_keylist.forEach(function(key) {
	                	$('#map-'+key).addClass("noclick");
	                });*/

				}else if(g.colorscale_mapunitcurrent == 'Cases'){
					$('#selectform1').val('Classic');	
					g.colorscale_colorscurrent = 'Classic';
					if(g.viz_definition.disease.chart.filter() == undefined && g.medical_currentdisease){
			            g.viz_definition.disease.chart.filter(g.medical_currentdisease);
					}
					
					$('#chart-disease').removeClass("noclick");
					$('#chart-fyo').removeClass("noclick");
					/*g.geometry_keylist.forEach(function(key) {
	                	$('#map-'+key).removeClass("noclick");
	                });*/

				}else if(g.colorscale_mapunitcurrent == 'Incidence'){
					$('#selectform1').val('Classic');	
					g.colorscale_colorscurrent = 'Classic';
		            if(g.viz_definition.disease.chart.filter() == undefined && g.medical_currentdisease){
			            g.viz_definition.disease.chart.filter(g.medical_currentdisease);
					}
					
					$('#chart-disease').removeClass("noclick");
					$('#chart-fyo').removeClass("noclick");
					/*g.geometry_keylist.forEach(function(key) {
	                	$('#map-'+key).removeClass("noclick");
	                });*/

	          	}

				$("#selectform1").change();
				module_colorscale_lockcolor('Manual');
				console.log(['mapunit',g.colorscale_mapunitcurrent]);
				$('#map-unit').html(g.module_lang.text[g.module_lang.current].map_unit[g.colorscale_mapunitcurrent]);
			}
		});
	});

	/*	$('#mcs_inp5').val(g.colorscale_values[g.colorscale_mapunit_current][5].toFixed(2));
	    $('#mcs_oup5').html(g.colorscale_values[g.colorscale_mapunit_current][5].toFixed(2));
	    $('#mcs_inp4').val(g.colorscale_values[g.colorscale_mapunit_current][4].toFixed(2));
	    $('#mcs_oup4').html(g.colorscale_values[g.colorscale_mapunit_current][4].toFixed(2));
	    $('#mcs_inp3').val(g.colorscale_values[g.colorscale_mapunit_current][3].toFixed(2));
	    $('#mcs_oup3').html(g.colorscale_values[g.colorscale_mapunit_current][3].toFixed(2));
	    $('#mcs_inp2').val(g.colorscale_values[g.colorscale_mapunit_current][2].toFixed(2));
	    $('#mcs_oup2').html(g.colorscale_values[g.colorscale_mapunit_current][2].toFixed(2));
	    $('#mcs_inp1').val(g.colorscale_values[g.colorscale_mapunit_current][1].toFixed(2));
	});

	$("#mcs_inp5").change(function(){
		val = parseFloat($('#mcs_inp5').val());
		$('#mcs_inp5').val(val.toFixed(2));
	    $('#mcs_oup5').html(val.toFixed(2));
	});
	$("#mcs_inp4").change(function(){
	    val = parseFloat($('#mcs_inp4').val());
		$('#mcs_inp4').val(val.toFixed(2));
	    $('#mcs_oup4').html(val.toFixed(2));
	});				
	$("#mcs_inp3").change(function(){
	    val = parseFloat($('#mcs_inp3').val());
		$('#mcs_inp3').val(val.toFixed(2));
	    $('#mcs_oup3').html(val.toFixed(2));
	});
	$("#mcs_inp2").change(function(){
	    val = parseFloat($('#mcs_inp2').val());
		$('#mcs_inp2').val(val.toFixed(2));
	    $('#mcs_oup2').html(val.toFixed(2));
	});
	$("#mcs_inp1").change(function(){
	    val = parseFloat($('#mcs_inp1').val());
		$('#mcs_inp1').val(val.toFixed(2));
	});

	$('#loaddashboard').on('click',function(){
		g.colorscale_values[g.colorscale_mapunit_current] = ['NA',parseFloat($('#mcs_inp1').val()),parseFloat($('#mcs_inp2').val()),parseFloat($('#mcs_inp3').val()),parseFloat($('#mcs_inp4').val()),parseFloat($('#mcs_inp5').val())];
		if (g.colorscale_values[g.colorscale_mapunit_current][1]<=g.colorscale_values[g.colorscale_mapunit_current][2] && g.colorscale_values[g.colorscale_mapunit_current][2]<=g.colorscale_values[g.colorscale_mapunit_current][3] && g.colorscale_values[g.colorscale_mapunit_current][3]<=g.colorscale_values[g.colorscale_mapunit_current][4] && g.colorscale_values[g.colorscale_mapunit_current][4]<=g.colorscale_values[g.colorscale_mapunit_current][5]) {
            
            $.when(modal_loading()).then(generateDashboard());

		}else{window.alert(g.module_lang.text[g.module_lang.current].colorscale_alert);};
	});*/
}

function module_colorscale_lockcolor(source){
	if(source == g.colorscale_modecurrent || source == 'Manual'){
		var admlevel_current = g.multiadm_tabcurrent.split('-')[1];
		if (g.colorscale_mapunitcurrent == 'Cases') {
			if(g.medical_datatype == 'surveillance'){
				var admobjects_current = g.viz_definition.multiadm.group[admlevel_current].top(Infinity);
			}else{
				var admobjects_current = g.viz_definition.multiadm.group[admlevel_current].reduceCount(function(rec) { return rec[g.medical_headerlist.admN1]; }).top(Infinity);
			}
			var admvalues_current = Object.keys(admobjects_current).map(function (key,keynum) {return admobjects_current[keynum].value.Values});
		}else if(g.colorscale_mapunitcurrent == 'Completeness'){
			var admvalues_current = [100,80,60,40,20,0];
		}else if(g.colorscale_mapunitcurrent == 'Incidence'){
			var admvalues_current = Object.keys(g.viz_currentvalues[admlevel_current]).map(function (key,keynum) {return g.viz_currentvalues[admlevel_current][key]});
			
			var admvalues_current = admvalues_current.filter(function(element) {
			  return !(isNaN(element));
			});
		}

		var serie = new geostats();
		serie.setSerie(admvalues_current);
		var unique_values = serie.getClassUniqueValues();
		var nbClass = Math.min(5,unique_values.length);
		
		var serie = new geostats();
		serie.setSerie(admvalues_current);

		switch(g.colorscale_scaletypecurrent){
			case 'Jenks':
				var scalesvalues_current = serie.getClassJenks(nbClass);
				break;
			case 'EqInterval':
				var scalesvalues_current = serie.getClassEqInterval(nbClass);
				break;
			case 'StdDeviation':
				var scalesvalues_current = serie.getClassStdDeviation(nbClass);
				break;
			case 'ArithmeticProgression':
				var scalesvalues_current = serie.getClassArithmeticProgression(nbClass);
				break;
			case 'GeometricProgression':
				var scalesvalues_current = serie.getClassGeometricProgression(nbClass);
				break;
			case 'Quantile':
				var scalesvalues_current = serie.getClassQuantile(nbClass);
				break;
		}
		g.colorscale_valuescurrent = ['NA'];
		var temp_check = {};
		scalesvalues_current.forEach(function(val){
			if(!temp_check[val]){
				g.colorscale_valuescurrent.push(val);
				temp_check[val] = true;
			}
		})
		//	scalesvalues_current.pop();
		$('.legend').remove();
	    g.geometry_keylist.forEach(function(adm) {
		    g.viz_definition.multiadm.legend[adm].addTo(g.viz_definition.multiadm.maps[adm]);
		    g.viz_definition.multiadm.charts[adm].redraw();
	    })
	}
}

function module_colorscale_dataprocessing(){
	g.colorscale_scales = {};
	g.geometry_keylist.forEach(function(key){
		g.colorscale_scales[key] = {};
		g.medical_diseaseslist.forEach(function(disease) {
			g.colorscale_scales[key][disease] = {};
		});
		g.colorscale_scales[key].all = {};
	});
	g.colorscale_scales.all = {};	
}