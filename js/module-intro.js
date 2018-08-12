/*------------------------------------------------------------------------------------
  
	MSF Dashboard - module-intro.js
	(c) Bruno Raimbault for MSF UK
	Please refer to the README.txt for complete licenses.
    
	Components:
	0) Setup

  	Dependencies:
	- module-lang 	OK

------------------------------------------------------------------------------------*/

modules_list.intro = true;

function module_intro_setup() {

	g.intro_definition = introJs();

	g.intro_step = {};
	var steps = [{
			  	element: '#title',
				intro: g.module_lang.text[g.module_lang.current].intro_intro,
				position: 'bottom'
			  }];
	var keynum = 0;
	g.viz_keylist.forEach(function(key){
		if(!(g.viz_definition[key].display_intro == 'none')){
			if(g.viz_definition[key].display_idcontainer){
                var element = '#' + g.viz_definition[key].display_idcontainer;
            }else{
                var element = '#chart-'+key;
            }
            keynum++;
			g.intro_step[key] = keynum;
			steps.push({
				  	element: element,
					intro: g.module_lang.text[g.module_lang.current]['intro_'+key],
					position: g.viz_definition[key].display_intro
			});
		}
	});

	g.intro_definition.setOptions({
			steps: steps
		});

}