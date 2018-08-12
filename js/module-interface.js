/*------------------------------------------------------------------------------------
  
	MSF Dashboard - module-interface.js
	(c) Bruno Raimbault for MSF UK
	Please refer to the README.txt for complete licenses.
    
	Components:
	0) Setup
	1) Display + Interactions

  	Dependencies:
	- module-lang 	OK

------------------------------------------------------------------------------------*/

// 0) Setup
//------------------------------------------------------------------------------------ 

modules_list.interface = true;

// 1) Display + Interactions
//------------------------------------------------------------------------------------    

function module_interface_display(){

    $('#main_description').html(g.module_lang.text[g.module_lang.current].main_description);

    g.viz_keylist.forEach(function(key){
        interface_titlesscreate(key);
        interface_buttonscreate(key,g.viz_definition[key].buttons_list);
        interface_buttoninteraction(key,g.viz_definition[key].buttons_list);
    });

    interface_menucreate();
    interface_menuinteractions();


    function interface_titlesscreate(key){
        $('#chart_'+key+'_title').html('<b>' + g.module_lang.text[g.module_lang.current]['chart_'+key+'_title'] + '</b><br>' + g.module_lang.text[g.module_lang.current].filtext + ' ' );
    }

    function interface_buttonscreate(key,buttons) {
        var html = '';
        buttons.forEach(function(button){
            switch(button){
                case 'reset': 
                    var icon = '↻';
                    break;
                case 'help':
                    var icon = '?';  
                    break;
                case 'parameters':
                    var icon = '⚙';
                    break;
                case 'lockcolor': // to be implemented
                    var icon = '⬙';
                    break;
                case 'expand': // to be implemented
                    var icon = '◰';
                    break;
                case 'toimage': // to be implemented
                    var icon = 'I';
                    break;

            }
            html += '<button class="btn btn-primary btn-sm button '+button+'" id="'+button+'-'+key+'">'+icon+'</button>';
        });
        $('#buttons-'+key).html(html);
    }

    function interface_buttoninteraction(key1,buttons) {
        buttons.forEach(function(button){
            switch(button){
                case 'reset': 
                    $('#'+button+'-'+key1).click(function(){
                        if(key1 ==  g.viz_timeline){menu_pausePlay();}
                        if(key1 == 'multiadm'){
                            if ($('#select-'+g.geometry_keylist[0]).val() == 'NA') {
                                zoomToGeom(g.geometry_data[g.geometry_keylist[0]],g.viz_definition.multiadm.maps[g.geometry_keylist[0]]);
                            }else{
                                $('#select-'+g.geometry_keylist[0]).val('NA').change();
                            }
                            g.geometry_keylist.forEach(function(key2,key2num){
                                g.viz_definition[key1].charts[key2].filterAll();
                            });
                        }else{
                            g.viz_definition[key1].chart.filterAll();
                        }
                        dc.redrawAll(); 
                    });
                    break;
                case 'help':
                    $('#'+button+'-'+key1).click(function(){
                        g.intro_definition.goToStep(g.intro_step[key1]).start();
                    }); 
                    break;
                case 'parameters': // to be implemented
                    $('#'+button+'-'+key1).click(function(){
                        window.scrollTo(0, 0);
                        
                        if(g.medical_datatype == 'outbreak'){
                            $('.modal-dialog').css('width','30%'); 
                            $('.modal-dialog').css('margin-right','2.5%'); 
                        }else{
                            $('.modal-dialog').css('height','7%'); 
                            $('.modal-dialog').css('width','90%'); 
                            $('.modal-dialog').css('margin-top','1.5%'); 
                            $('.modal-dialog').css('margin-left','10%'); 
                        }

                        var html = '<div class="row">';

                                      
                        // Load Optional Module: module-colorscale.js
                        //------------------------------------------------------------------------------------
                        html += '<div class="col-md-12">';
                        html += module_colorscale_display();
                        html += '</div>';
                        html += '<div class="btn btn-primary btn-sm button" id="gobacktodashboard"><b>X</b></div>';

                        html += '</div>';
                        $('.modal-content').html(html);
                        module_colorscale_interaction();
                        $('#modal').modal('show');

                        $('#gobacktodashboard').click(function(){
                            $('#modal').modal('hide');
                        });
                    });
                    break;
                case 'expand': // to be implemented
                    $('#'+button+'-'+key1).click(function(){
                        g.geometry_keylist.forEach(function(key) {
                            if ($('#map-' + key).height() <= 500) {
                               setTimeout(function() {
                                    $('#map-' + key).css('height','845px');
                                    g.viz_definition.multiadm.maps[key].invalidateSize(true);
                                }, 500);
                               setTimeout(function() {
                                    zoomToGeom(g.geometry_data[key],g.viz_definition.multiadm.maps[key]);
                                }, 1000);
                            }else{
                               setTimeout(function() {
                                    $('#map-' + key).css('height','410px');
                                    g.viz_definition.multiadm.maps[key].invalidateSize(true);
                                }, 500);
                               setTimeout(function() {
                                    zoomToGeom(g.geometry_data[key],g.viz_definition.multiadm.maps[key]);
                                },1000); 
                            }; 
                        });
                    });
                    break;
                case 'lockcolor': // to be implemented
                    $('#'+button+'-'+key1).click(function(){
                        module_colorscale_lockcolor('Manual');
                    });
                    break;

                case 'toimage-a':
                $('#'+button+'-'+key1).click(function(){
                    var temp_id = 'chart-' + key1;
                    var html = d3.select('.container svg')
                      .attr('title', 'some title here')
                      .attr('version', 1.1)
                      .attr('xmlns', 'http://www.w3.org/2000/svg')
                      .node().parentNode.innerHTML;

                    var img = new Image();
                    // http://en.wikipedia.org/wiki/SVG#Native_support
                    // https://developer.mozilla.org/en/DOM/window.btoa
                    img.src = "data:image/svg+xml;base64," + btoa(svg_xml);

                    var canvas = document.getElementById('mycanvas');
                    var img = canvas.toDataURL('image/png');
                    document.write('<img src="' + img + '"/>');
                });


                case 'toimage-b':
                    var fs = require('fs');
                    var db_new = document.getElementById(button+'-'+key1);
                    
                    function handleDbNewFile(e) {
                        console.log(e);
                        var files = e.target.files;
                        var f = files[0];
                        var name = f.name;
                        var path = f.path;

                        var map = g.viz_definition.multiadm.maps.admN1;
                        leafletImage(map, doImage);

                        function doImage(err, canvas) {
                            var img = document.createElement('img');
                            var dimensions = map.getSize();
                            img.width = dimensions.x;
                            img.height = dimensions.y;
                            img.src = canvas.toDataURL();

                            fs.writeFile('', img, function(err) {
                                if(err) {
                                  console.log(err);                                                     //CONSOLE
                                } else {
                                  console.log("exported", new Date());                                  //CONSOLE
                                }
                            });
                        }
                    }
                    if(db_new.addEventListener) db_new.addEventListener('click', handleDbNewFile);

                    $('#'+button+'-').click(function(){

                        var snapshot = document.getElementById('svgdataurl3');
                        var map = g.viz_definition.multiadm.maps.admN1;

                        leafletImage(map, doImage);

                        function doImage(err, canvas) {
                            var img = document.createElement('img');
                            var dimensions = map.getSize();
                            img.width = dimensions.x;
                            img.height = dimensions.y;
                            img.src = canvas.toDataURL();

                            fs.writeFile('', img, function(err) {
                                if(err) {
                                  console.log(err);                                                     //CONSOLE
                                } else {
                                  console.log("onexport", new Date());                                  //CONSOLE
                                  console.log("JSON saved to " + outputFilename);                       //CONSOLE
                                }
                            }); 
                            snapshot.innerHTML = '';
                            snapshot.appendChild(img);
                        }

                        var snapshot = document.getElementById('svgdataurl2');
                        var chart = g.viz_definition.case_bar.chart;

                        //dcImage(chart, doImage);

                        /*function doImage(err, canvas) {
                            var img = document.createElement('img');
                            var dimensions = map.getSize();
                            img.width = dimensions.x;
                            img.height = dimensions.y;
                            img.src = canvas.toDataURL();
                            snapshot.innerHTML = '';
                            snapshot.appendChild(img);
                        }*/
                        
                        var encoresvg = g.viz_definition.case_bar.chart.svg();


                        //get svg element.
                       // var svg = document.getElementById("chart-case_bar").getSVGDocument();
                        //var svg = d3.select('#chart-case_bar').select("svg");

                        var foo = d3.select('#chart-case_bar').select("svg");

                        // later, where you don't have someDOM but you do have foo
                        var svg = foo[0][0];
                        //var svg = someDom.ownerSVGElement;

                        //get svg source.
                        var serializer = new XMLSerializer();
                        var source = serializer.serializeToString(svg);

                        //add name spaces.
                        if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
                            source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
                        }
                        if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
                            source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
                        }

                        //add xml declaration
                        source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

                        //convert svg source to URI data scheme.
                        var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);

                        function importSVG(sourceSVG, targetCanvas) {
                            // https://developer.mozilla.org/en/XMLSerializer
                            svg_xml = (new XMLSerializer()).serializeToString(sourceSVG);
                            var ctx = targetCanvas.getContext('2d');

                            // this is just a JavaScript (HTML) image
                            var img = new Image();
                            // http://en.wikipedia.org/wiki/SVG#Native_support
                            // https://developer.mozilla.org/en/DOM/window.btoa
                            img.src = "data:image/svg+xml;base64," + btoa(svg_xml);

                            img.onload = function() {
                                // after this, Canvas’ origin-clean is DIRTY
                                
                                ctx.drawImage(img,100, 200);
                            }
                        }
                        console.log(encoresvg);
                       
                        var test = document.getElementById("svgdataurl");

                        console.log(test);

                        importSVG(encoresvg[0][0],test);

                        var html = encoresvg[0][0]
                            .attr('title', 'some title here')
                            .attr('version', 1.1)
                            .attr('xmlns', 'http://www.w3.org/2000/svg')
                            .node().parentNode.innerHTML;

                        var img = new Image();
                        // http://en.wikipedia.org/wiki/SVG#Native_support
                        // https://developer.mozilla.org/en/DOM/window.btoa
                        img.src = "data:image/svg+xml;base64," + btoa(svg_xml);

                        var canvas = document.getElementById('svgdataurl2');
                        var img = canvas.toDataURL('image/png');
                        document.write('<img src="' + img + '"/>');
                     hiddenDiv.remove();

                    }); 
                    break;
            }
        });
    }

    function interface_menucreate(){

        // Menu title
        var html = '<div id="menu_title" style="font-size:1.2em; text-align:center;"><b>'+g.module_lang.text[g.module_lang.current].interface_menutitle+'</b></div>';

        // Reset button
        html += '<a id="menu_reset" class="menu_button btn btn-primary btn-sm" href="javascript:menu_reset();">'+g.module_lang.text[g.module_lang.current].interface_menureset+'</a>';
            
        // Reload button
        html += '<a id="menu_reload" class="menu_button btn btn-primary btn-sm" href="javascript:history.go(0)">'+g.module_lang.text[g.module_lang.current].interface_menureload+'</a>';

        // Help button
        html += '<button id="menu_help" class="menu_button btn btn-primary btn-sm">'+g.module_lang.text[g.module_lang.current].interface_menuhelp+'</button>';

        // Quick access to epiweeks button
        html += '<div id="menu_epiwk"><p>'+g.module_lang.text[g.module_lang.current].interface_menuepiwk+'</p>';
        html +='<button class="menu_button_epiwk btn btn-primary btn-sm" id="menu_epi4">4</button>';
        html +='<button class="menu_button_epiwk btn btn-primary btn-sm" id="menu_epi8">8</button>';
        html +='<button class="menu_button_epiwk btn btn-primary btn-sm" id="menu_epi12">12</button>';
        html +='<div>';

        // Autoplay button
        html += '<button id="menu_autoplay" class="menu_button btn btn-primary btn-sm">'+g.module_lang.text[g.module_lang.current].interface_menuautoplay.play+'</button>'

        // Record count
        //html += '<div id="menu_count"><b><span class="filter-count "></span></b><br>'+g.module_lang.text[g.module_lang.current].interface_menucount[0]+'<br><b><span class="total-count "></span></b><br>'+g.module_lang.text[g.module_lang.current].interface_menucount[1]+'</div>';
        html += '<div id="menu_count">'+g.module_lang.text[g.module_lang.current].interface_menucount[2]+'<br><span id="case-info">'+g.module_lang.text[g.module_lang.current].interface_menucount[3]+' <b><span class="filter-count headline"></span></span></b><br><span id="death-info">'+g.module_lang.text[g.module_lang.current].interface_menucount[4]+' <b><span class="filter-count headline"></span></span></b><br></div>';

        /*<span style="font-size:2em;">Chiffres clés :
                <span id="casetotal">Cas : <span class="filter-count headline"></span></span>
                <span id="deathtotal"> | Décès : <span class="filter-count headline"></span></span></span>*/

        $('#menu').html(html);
    }

    function interface_menuinteractions(){

        g.interface_autoplayon = false;
        g.interface_autoplaytime = 0;
        g.interface_autoplaytimer = 0;

        $('#menu_autoplay').on('click',function(){
            if (g.interface_autoplayon) {
                menu_pausePlay();
                dc.redrawAll();
            }else{
                g.viz_definition[ g.viz_timeline].chart.filterAll();
                module_colorscale_lockcolor('Auto'); 
                g.interface_autoplayon = true;
                $('#menu_autoplay').html(g.module_lang.text[g.module_lang.current].interface_menuautoplay.pause);
                $('#chart-'+ g.viz_timeline).addClass("noclick");
                if(g.viz_timeshare){
                    g.viz_timeshare.forEach(function(key) {
                        $('#chart-'+ key).addClass("noclick");
                    });
                }
                g.interface_autoplaytime = 0;
                g.interface_autoplaytimer = setInterval(function(){menu_autoPlay()}, 500);
            };
        });

        $('#menu_help').click(function(){
            g.intro_definition.start();
        });

        // Quick epiweeks access
        var quick_filter_list = [4,8,12];
        quick_filter_list.forEach(function(wknumber){
            $('#menu_epi'+wknumber).on('click',function(){
                var temp_mode = g.colorscale_modecurrent;
                g.colorscale_modecurrent = 'Manual';
                menu_pausePlay();
                var temp_domain = g.viz_definition[ g.viz_timeline].domain.slice(Math.max(g.viz_definition[ g.viz_timeline].domain.length - wknumber - 1, 2));
                temp_domain.pop();
                temp_domain.forEach(function(wk){
                    g.viz_definition[g.viz_timeline].chart.filter(wk);
                    if(g.viz_timeshare){
                        g.viz_timeshare.forEach(function(key) {
                            g.viz_definition[key].chart.filter(wk);
                        });
                    }
                });
                g.colorscale_modecurrent = temp_mode;
                module_colorscale_lockcolor('Auto');
                dc.redrawAll();
            });
        });
    }
}

function menu_reset() {
    var temp_mode = g.colorscale_modecurrent;
    var temp_disease = g.medical_currentdisease;
    g.colorscale_modecurrent = 'Manual';
    menu_pausePlay();
    if ($('#select-'+g.geometry_keylist[0]).val() == 'NA') {
        zoomToGeom(g.geometry_data[g.geometry_keylist[0]],g.viz_definition.multiadm.maps[g.geometry_keylist[0]]);
    }else{
        $('#select-'+g.geometry_keylist[0]).val('NA').change();
    }
    dc.filterAll();
    g.colorscale_modecurrent = temp_mode;
    if (g.medical_datatype == 'surveillance' && temp_disease && g.colorscale_mapunitcurrent !== 'Completeness') {
        g.viz_definition.disease.chart.filter(temp_disease);
    }else if(g.medical_datatype == 'surveillance' && temp_disease && g.colorscale_mapunitcurrent == 'Completeness'){
        g.medical_currentdisease = temp_disease;
        g.medical_pastdisease = temp_disease;
    }
    module_colorscale_lockcolor('Auto');
    dc.redrawAll();
}

// Autoplay
function menu_autoPlay(){
    if(g.interface_autoplaytime == g.viz_definition[ g.viz_timeline].domain.length){
        g.interface_autoplaytime += 1;
        menu_pausePlay();
        dc.redrawAll();
    }    

    if(g.interface_autoplaytime < g.viz_definition[ g.viz_timeline].domain.length && g.interface_autoplaytime>0){
        g.viz_definition[ g.viz_timeline].chart.filter([g.viz_definition[g.viz_timeline].domain[g.interface_autoplaytime-1]]);
        g.viz_definition[ g.viz_timeline].chart.filter([g.viz_definition[g.viz_timeline].domain[g.interface_autoplaytime]]);

        if(g.viz_timeshare){
            g.viz_timeshare.forEach(function(key) {
                g.viz_definition[key].chart.filter([g.viz_definition[key].domain[g.interface_autoplaytime-1]]);
                g.viz_definition[key].chart.filter([g.viz_definition[key].domain[g.interface_autoplaytime]]);
            });
        }
        dc.redrawAll();
        g.interface_autoplaytime += 1;
    }

    if(g.interface_autoplaytime == 0){
        dc.redrawAll();

        g.viz_definition[ g.viz_timeline].chart.filter([g.viz_definition[g.viz_timeline].domain[g.interface_autoplaytime]]);

        if(g.viz_timeshare){
            g.viz_timeshare.forEach(function(key) {
                g.viz_definition[key].chart.filter([g.viz_definition[g.viz_timeline].domain[g.interface_autoplaytime]]);
            });
        }
        dc.redrawAll();
        g.interface_autoplaytime += 1;
    }    
} 

function menu_pausePlay(){
    g.interface_autoplayon = false;
    $('#menu_autoplay').html(g.module_lang.text[g.module_lang.current].interface_menuautoplay.play);

    $('#chart-'+ g.viz_timeline).removeClass("noclick");
    g.viz_definition[g.viz_timeline].chart.filterAll();

    if(g.viz_timeshare){
        g.viz_timeshare.forEach(function(key) {
            $('#chart-'+ key).removeClass("noclick");    
            g.viz_definition[key].chart.filterAll();  
        });
    } 

    clearInterval(g.interface_autoplaytimer);
}
