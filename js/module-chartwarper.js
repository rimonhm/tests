/*------------------------------------------------------------------------------------

	MSF Dashboard - module-chartwarper.js
	(c) Bruno Raimbault for MSF UK
	Please refer to the README.txt for complete licenses.
	
	Components:

	Dependencies:
	- module-lang 	

------------------------------------------------------------------------------------*/

// 0) Setup
//------------------------------------------------------------------------------------

modules_list.chartwarper = true;

// 1) Display
//------------------------------------------------------------------------------------
var tabcontainer_id = 'containter_bar-lin_tabs';
var chartcontainers_list = ['containter_bar','containter_lin'];

function module_chartwarper_display(tabcontainer_id,chartcontainers_list) {
	var html = '<div>';
			chartcontainers_list.forEach(function(key,keynum){
				if (keynum == 0) {
					var tab_status ='active-cw';
				} else {
					var tab_status ='inactive-cw';
				}
				html +=  '<div id="'+key+'-tab" class="'+tab_status+' tab-cw">';
				
				// Tab title
				html +=  g.module_lang.text[g.module_lang.current]['chartwarper_tab_'+key];
				
				html +=  '</div>';
			});
	html += '</div>';

	$('#' + tabcontainer_id).html(html);

}

function module_chartwarper_interaction(chartcontainers_list) {
	
	// 3) a. Tabs Interactions
	//------------------------------------------------------------------------------------

	// Initialisations tabs (maps draw order)
	chartcontainers_list.forEach(function(key,keynum){
		$('#'+key).addClass('chart_container-cw');
		if (keynum == 0) {
			$('#'+key).css('display', 'inline');
		} else {
			$('#'+key).css('display', 'none');
		}
	});

	// Initialisations jumpto dropdown lists common variables
	g.chartwarper_tabcurrent = chartcontainers_list[0];
	g.chartwarper_tabcurrentnum = 0;

	// Tabs 'onclick' events
	chartcontainers_list.forEach(function(key1,key1num){
		
		$('#'+key1+'-tab').on('click',function(){ 
      
		    if (!(g.chartwarper_tabcurrent == key1)) {

		    	// Temporarily store previous tab keys
		    	var key0 = g.chartwarper_tabcurrent;
		    	var key0num = g.chartwarper_tabcurrentnum;

		        // Swich current displayed map in global variable
		        g.chartwarper_tabcurrent = key1;
				g.chartwarper_tabcurrentnum = key1num;

		        $('#'+key0+'-tab').removeClass('active-cw');
		        $('#'+key0+'-tab').addClass('inactive-cw');
		        $('#'+key0).css('display', 'none');		
		        $('#'+key1+'-tab').removeClass('inactive-cw');
		        $('#'+key1+'-tab').addClass('active-cw');
		        $('#'+key1).css('display', 'inline');		
		    };          
		})   	

	});	

}