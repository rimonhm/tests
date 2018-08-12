/*------------------------------------------------------------------------------------

	MSF Dashboard - module-multiadm.js
	(c) Bruno Raimbault for MSF UK
	Please refer to the README.txt for complete licenses.
	
	Components:
	0) Setup
	1) Data Processing
	2) Display
	3) Interactions
		a. Tabs Interactions
		b. 'Jumpto' dropdown list Interactions

	Dependencies:
	- module-lang 	OK

------------------------------------------------------------------------------------*/

// 0) Setup
//------------------------------------------------------------------------------------

modules_list.multiadm = true;

// 1) Data Processing
//------------------------------------------------------------------------------------

// 2) Display
//------------------------------------------------------------------------------------
function module_multiadm_display(){

	var html = '<div class="col-md-12">';
		html += '<div id=buttons-multiadm></div>';
		// Title + filters
		html += '<p><b>'+g.module_lang.text[g.module_lang.current].map_title+' - <small><span id="map-unit">'+g.module_lang.text[g.module_lang.current].map_unit[g.colorscale_mapunitcurrent]+'</b></span></small> | '+g.module_lang.text[g.module_lang.current].filtext +' ';
		g.geometry_keylist.forEach(function(key,keynum,keylist){
			html +=  '<span id="map-'+key+'-filter"></span>';
			if (!(keynum == keylist.length - 1)) {
				html += ' >';
			}
		});
		html +='</p>';

		// Tabs + 'jumpto' dropdown lists
		html += '<div>';
			g.geometry_keylist.forEach(function(key,keynum){
				if (keynum == 0) {
					var tab_status ='active';
				} else {
					var tab_status ='inactive';
				}
				html +=  '<div id="map-'+key+'-tab" class="'+tab_status+' tab">';
				
				// Tab title
				html +=  '<div class="col-md-7 tab-content">'+g.module_lang.text[g.module_lang.current]['map_'+key].title+'</div>';
				
				// 'jumpto' dropdown list
				html +=  '<div class="col-md-5 tab-content" id="map-'+key+'-jumpto"></div>';
				html +=  '</div>';
			});
		html += '</div>';
	html += '</div>';

	// Maps
	html += '<div class="col-md-12 viz" style="height:425px; width:110%;">';
		g.geometry_keylist.forEach(function(key){
			html += '<div id="map-'+key+'" class="map"></div>'; 
		});
	html += '</div>';

	$('#chart-multiadm').html(html);

}

// 3) Interactions
//------------------------------------------------------------------------------------

function module_multiadm_interaction(){

	// 3) a. Tabs Interactions
	//------------------------------------------------------------------------------------

	// Initialisations tabs (maps draw order)
	g.geometry_keylist.forEach(function(key,keynum){
		if (keynum == 0) {
			$('#map-'+key).css('z-index', 9999);
		} else {
			$('#map-'+key).css('z-index', 1);
		}   
	});

	// Initialisations jumpto dropdown lists common variables
	g.multiadm_tabcurrent = 'map-admN1';
	g.multiadm_tabcurrentnum = 0;

	// Tabs 'onclick' events
	g.geometry_keylist.forEach(function(key1,key1num){

		$('#map-'+key1+'-tab').on('click',function(){        
		    if (!(g.multiadm_tabcurrent == 'map-'+key1)) {

		    	// Temporarily store previous tab keys
		    	var key0 = g.multiadm_tabcurrent;
		    	var key0num = g.multiadm_tabcurrentnum;

		        // Swich current displayed map in global variable
		        g.multiadm_tabcurrent = 'map-'+key1;
				g.multiadm_tabcurrentnum = key1num;

		        $('#'+key0+'-tab').removeClass('active');
		        $('#'+key0+'-tab').addClass('inactive');
		        $('#'+key0).css('z-index', 1);		
		        $('#map-'+key1+'-tab').removeClass('inactive');
		        $('#map-'+key1+'-tab').addClass('active');
		        $('#map-'+key1).css('z-index', 9999);		

		        // For maps of lower administrative level: 'jumpto' dropdown list
		        if (key1num < key0num){
			        g.geometry_keylist.forEach(function(key2,key2num){
			        	if (key2num>key1num) {
				        	resetGoto(key2);
				        	g.viz_definition.multiadm.charts[key2].filterAll();		
			        	}
			        });
			        dc.redrawAll();
			    }
			    propGoto(key1,key1num);	
		    };

    		module_colorscale_lockcolor('Auto');             
		})   	

	});	

	// 3) b. 'Jumpto' dropdown list Interactions
	//------------------------------------------------------------------------------------

	// Initialisation
	initGoto();
	g.geometry_keylist.forEach(function(key,keynum){
		if (!(keynum == 0)) {
			resetGoto(key);
		}   
	});
	
	function initGoto(){	
		 // Initialize jumpto's focus trackers
		g.multiadm_focuscurrent = {};
		g.geometry_keylist.forEach(function(key){ 
			g.multiadm_focuscurrent[key] = 'NA';
		});
		

        // Initialize first jumpto
	    var html = '<select class="select-adm" id="select-admN1">';
	    html +='<option value="NA">'+g.module_lang.text[g.module_lang.current].jumpto+'</option>';
	    g.medical_loclists.admN1.forEach(function(loc){
	        html +='<option value="'+loc+'">'+loc+'</option>';
	    });
	    html += '</select></div>';
	    $('#map-admN1-jumpto').html(html);

		// Onclick initialize the next dropdown lists: propagate (inside jumpto divs)
		function propGoto(key1,key1num) {
			
			$('#select-'+key1).change(function(){

	        	var loc_new = $('#select-' + key1).val();
	            if(!(loc_new == g.multiadm_focuscurrent[key1])){zoomTo(key1,loc_new);};
	            
	            g.multiadm_focuscurrent[key1] = loc_new;

	            // Initialize the next dropdown list
	            var key2num = key1num + 1; 
	            if(g.geometry_keylist[key2num]){
	            	var key2 = g.geometry_keylist[key2num];
	            	var html = '<select class="select-adm" id="select-'+key2+'">';
		            html +='<option value="NA">'+g.module_lang.text[g.module_lang.current].jumpto+'</option>';   
				    g.medical_loclists[key2].forEach(function(loc){
				        if (loc.slice(0,loc_new.length) == loc_new) {
				        	html +='<option value="'+loc+'">'+loc+'</option>';
				    	}
				    });
				    html += '</select></div>';
				    $('#map-'+key2+'-jumpto').html(html);
				    propGoto(key2,key2num);
	            } 
			});

		}
		propGoto('admN1',0);
	}
}

function propGoto(key1,key1num) {		
	$('#select-'+key1).change(function(){

    	var loc_new = $('#select-' + key1).val();
        if(!(loc_new == g.multiadm_focuscurrent[key1])){zoomTo(key1,loc_new);};
        
        g.multiadm_focuscurrent[key1] = loc_new;

        // Initialize the next dropdown list
        var key2num = key1num + 1; 
        if(g.geometry_keylist[key2num]){
        	var key2 = g.geometry_keylist[key2num];
        	var html = '<select class="select-adm" id="select-'+key2+'">';
            html +='<option value="NA">'+g.module_lang.text[g.module_lang.current].jumpto+'</option>';   
		    g.medical_loclists[key2].forEach(function(loc){
		        if (loc.slice(0,loc_new.length) == loc_new) {
		        	html +='<option value="'+loc+'">'+loc+'</option>';
		    	}
		    });
		    html += '</select></div>';
		    $('#map-'+key2+'-jumpto').html(html);
		    propGoto(key2,key2num);
        } 
	});

}	

// zoomTo the selected location on the current map		 
function zoomTo(key,loc){
    if (loc == "NA") {
        zoomToGeom(g.geometry_data[key],g.viz_definition.multiadm.maps[key]);
    }else{
        var mapLayers = g.viz_definition.multiadm.maps[key]._layers;
        var bounds;
        Object.keys(mapLayers).forEach(function(i){
            if (mapLayers[i]['key'] == loc) {
                bounds = mapLayers[i].getBounds();
            };
        });
       g.viz_definition.multiadm.maps[key].fitBounds(bounds);
    }
}

// Reset jumpto dropdown lists content
function resetGoto(key){	
	// Reset jumpto dropdown lists content
    var html = '<select class="select-adm" id="select-'+ key +'">';
    html += '<option value="NA">'+g.module_lang.text[g.module_lang.current].jumpto+'</option>';
    html += '</select></div>';
    $('#map-'+key+'-jumpto').html(html);
    g.multiadm_focuscurrent[key] = 'NA';
}
