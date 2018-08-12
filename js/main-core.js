/*------------------------------------------------------------------------------------

	MSF Dashboard - main-core.js
	(c) Bruno Raimbault for MSF UK
	Please refer to the README.txt for complete licenses.
    
	Components:
	*) Checks Modules actives
	0) Setup /!\ USER DEFINED ELEMENTS
	1) DC.js Extend Domains definitions (in order to have clickable bar behaviour)
	2) DC.js Charts and Maps declarations
	3) Crossfilter.js Filters definition
	4) DC.js Charts definition
	5) DC.js Maps definition
	6) Datatables.js Table definition

	Dependencies:
	- module-lang 	OK

------------------------------------------------------------------------------------*/

function generateDashboard(){

    // *) Checks Modules actives
    //------------------------------------------------------------------------------------

	/* Not Implemented */

    // 0) Setup /!\ USER DEFINED ELEMENTS
    //------------------------------------------------------------------------------------
    
    g.viz_keylist = Object.keys(g.viz_definition);


    // 1) DC.js Extend Domains definitions (in order to have clickable bar behaviour)
    //------------------------------------------------------------------------------------

    // Main: Crossfilter main setup
    var cf = crossfilter(g.medical_data);

    g.viz_keylist.forEach(function(key1) {

        console.log('Chart being generated: '+key1);

        //------------------------------------------------------------------------------------
        // Domains definitions
        //------------------------------------------------------------------------------------

        var domainBuilder = {
            epiwk : function(){
                var min = d3.min(g.medical_data,function(rec){return rec[g.medical_headerlist['epiwk']];});
                var max = d3.max(g.medical_data,function(rec){return rec[g.medical_headerlist['epiwk']];});
                var domain = [];
                var minyear = Number(min.substr(0,4));
                var minweek = Number(min.substr(5,2));
                var maxyear = Number(max.substr(0,4));
                var maxweek = Number(max.substr(5,2));
                var currentyear = minyear;
                var currentweek = minweek;
                
                while(currentyear < maxyear || currentweek <= maxweek){
                    epiweek = currentweek
                    if(String(epiweek).length==1){
                        epiweek = '0'+epiweek;
                    }
                    domain.push(currentyear+'-'+epiweek);            
                    currentweek++
                    if(currentweek>53){
                        currentweek=1;
                        currentyear++
                    }
                }
                domain.push('NA');
                return domain;
            },
            dur : function(){
                var min = 0;
                var max = d3.max(g.medical_data,function(rec){return parseFloat(rec[g.medical_headerlist['dur']]);});
                var domain = [];
                var current = min;
                while(current<=max){
                    domain.push(current);            
                    current++
                }
                domain.push('NA');
                return domain;
            },
            out : function(){
                var domain = [];
                Object.keys(g.medical_read.out).forEach(function(key){
                    domain.push(g.medical_read.out[key]);
                });
                domain.push('NA');
                return domain;
            },
            age : function(){
                var max = d3.max(g.medical_data,function(rec){return 2 + parseInt(rec[g.medical_headerlist['age']]);});
                return [0,max];
            },
            case_bar : function() {
                return domainBuilder['epiwk']();
            },
            death_bar : function() {
                return domainBuilder['epiwk']();
            },
            case_lin : function(){
                var min = d3.min(g.medical_data,function(rec){return rec[g.medical_headerlist['epiwk']].split('-')[1];});
                var max = d3.max(g.medical_data,function(rec){return rec[g.medical_headerlist['epiwk']].split('-')[1];});
                return [min,max];
            },
            death_lin : function(){
                var min = d3.min(g.medical_data,function(rec){return rec[g.medical_headerlist['epiwk']].split('-')[1];});
                var max = d3.max(g.medical_data,function(rec){return rec[g.medical_headerlist['epiwk']].split('-')[1];});
                return [min,max];
            }
        };
        if(!(g.viz_definition[key1].domain_type == 'none')){
            if (key1 in domainBuilder) { 
                g.viz_definition[key1].domain = domainBuilder[key1]();
            }else{
                console.log('main-core.js ~l130: Your custom Domain Builder is not defined for viz: '+key1);
            }
        }

        //------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------
        // 2) DC.js Charts and Maps declarations
        //------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------
    
        switch(g.viz_definition[key1].chart_type){
            case 'bar':
                g.viz_definition[key1].chart = dc.barChart('#chart-'+key1);
                break;
            case 'pie':
                g.viz_definition[key1].chart = dc.pieChart('#chart-'+key1);
                break;
            case 'multiadm':

                // Load Optional Module: module-multiadm.js
                //------------------------------------------------------------------------------------
                module_multiadm_display();

                // Maps definition
                g.viz_definition[key1].charts = {};
                g.geometry_keylist.forEach(function(key2){
                    var div_id = '#map-' + key2;
                    g.viz_definition[key1].charts[key2] = dc.leafletChoroplethChart(div_id);
                });
                break;
            case 'row':
                g.viz_definition[key1].chart = dc.rowChart('#chart-'+key1);
                break;
            case 'stackedbar':
                g.viz_definition[key1].chart = dc.barChart('#chart-'+key1);
                break;
            case 'series':
                g.viz_definition[key1].chart = dc.seriesChart('#chart-'+key1);
                break;
            case 'table':
                // Loaded later on (dimension needs to be defined first)
                break;
            default:
                console.log('main-core.js ~l160: Your chart type is not defined for viz: '+key1);
                break;
        }

        //------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------
        // 3) Crossfilter.js Filters definition: Dimensions & Groups
        //------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------

        //------------------------------------------------------------------------------------
        // Dimension: Charts dimensions setup
        //------------------------------------------------------------------------------------

        var dimensionBuilder = {
            sexpreg: function(key){
                var dimension = cf.dimension(function(rec) {
                    var val = rec[g.medical_headerlist['sex']].toString() + rec[g.medical_headerlist['preg']].toString();
                    var read = g.medical_read[key][val];
                    if(!read){read = 'NA';}
                    return read; 
                });
                return dimension;
            },
            fyo: function(key){
                var dimension = cf.dimension(function(rec) {
                    var val = rec[g.medical_headerlist[key]];     
                    var read = g.medical_read[key][val];
                    if(!read){read = 'NA';}
                    return read;
                    });
                return dimension;
            },
            year: function(key){
                var key = 'epiwk'; //#Not auto
                var dimension = cf.dimension(function(rec) {
                    if(rec[g.medical_headerlist[key]]){
                        return rec[g.medical_headerlist[key]].split('-')[0];
                    }else{
                        return 'NA';
                    }
                });
                return dimension;
            },
            sev: function(key){
                var dimension = cf.dimension(function(rec) {
                    var val = rec[g.medical_headerlist[key]];     
                    var read = g.medical_read[key][val];
                    if(!read){read = 'NA';}
                    return read;
                    });
                return dimension;
            },
            out: function(key){
                var dimension = cf.dimension(function(rec) {
                    var val = rec[g.medical_headerlist[key]];     
                    var read = g.medical_read[key][val];
                    if(!read){read = 'NA';}
                    return read;
                });
                return dimension;
            },
            table: function(key){
                var dimension = cf.dimension(function(rec) {
                    return rec[g.medical_headerlist['epiwk']];
                });
                return dimension;
            },
            multiadm: function(key){
                var mapDimension = {};
                g.geometry_keylist.forEach(function(key2,key2num,key2list) {
                    mapDimension[key2] = cf.dimension(function(rec){ 
                        var count = key2num;
                        var loc_current = rec[g.medical_headerlist[key2list[count]]].trim();
                        while(count > 0){
                            count--;
                            loc_current = rec[g.medical_headerlist[key2list[count]]].trim()+', '+loc_current;
                        }
                        return loc_current;
                    });
                })
                return mapDimension;
            },
            age: function(key){
                var dimension = cf.dimension(function(rec) {
                    return parseInt(rec[g.medical_headerlist[key]]);
                });
                return dimension;
            },
            dur: function(key){ 
                var dimension = cf.dimension(function(rec) {
                    if(rec[g.medical_headerlist[key]]){
                        return parseInt(rec[g.medical_headerlist[key]]);
                    }else{
                        return 'NA';
                    }
                });
                return dimension;
            },
            disease: function(key){
                var dimension = cf.dimension(function(rec) {
                    if(rec[g.medical_headerlist[key]]){
                        return rec[g.medical_headerlist[key]].trim();
                    }else{
                        return 'NA';
                    }
                });
                return dimension;
            },
            epiwk_lin: function(key){
                var key = 'epiwk'; //#Not auto
                var dimension = cf.dimension(function(rec) {
                    if(rec[g.medical_headerlist[key]]){
                        return [rec[g.medical_headerlist[key]].split('-')[0],rec[g.medical_headerlist[key]].split('-')[1]];
                    }else{
                        return ['NA','NA'];
                    }
                });
                return dimension;
            },
            auto: function(key){
                var dimension = cf.dimension(function(rec) {
                    if(rec[g.medical_headerlist[key]]){
                        return rec[g.medical_headerlist[key]];
                    }else{
                        return 'NA';
                    }
                });
                return dimension;
            }
        };

        // If dimension is shared with othe graph and of a custom type
        if ((g.viz_definition[key1].dimension_type == 'shared') && (g.viz_definition[key1].dimension_setup[1] == 'custom')) {
            if(!(g.viz_definition[g.viz_definition[key1].dimension_setup[0]])){
                g.viz_definition[g.viz_definition[key1].dimension_setup[0]] = {};
                if (g.viz_definition[key1].dimension_setup[0] in dimensionBuilder) { 

                    g.viz_definition[g.viz_definition[key1].dimension_setup[0]].dimension = dimensionBuilder[g.viz_definition[key1].dimension_setup[0]](g.viz_definition[key1].dimension_setup[0]);
                }else{
                    console.log('main-core.js ~l230: Your custom Dimension Builder is not defined for viz: '+key1);
                }
            }

        // If dimension is shared with othe graph and of a auto type
        }else if((g.viz_definition[key1].dimension_type == 'shared') && (g.viz_definition[key1].dimension_setup[1] == 'auto')){
            if(!(g.viz_definition[g.viz_definition[key1].dimension_setup[0]])){
                g.viz_definition[g.viz_definition[key1].dimension_setup[0]] = {};
                if(!(g.viz_definition[g.viz_definition[key1].dimension_setup[0]].dimension)){
                    g.viz_definition[g.viz_definition[key1].dimension_setup[0]].dimension = dimensionBuilder['auto'](g.viz_definition[key1].dimension_setup[0]);
                }
            }

        // If dimension is not shared with othe graph and of a custom type
        }else if(g.viz_definition[key1].dimension_type == 'custom'){
            if (key1 in dimensionBuilder) { 
                g.viz_definition[key1].dimension = dimensionBuilder[key1](key1);
            }else{
                console.log('main-core.js ~l230: Your custom Dimension Builder is not defined for viz: '+key1);
            }

        // If dimension is not shared with othe graph and of a auto type
        }else if(g.viz_definition[key1].dimension_type == 'auto'){
            g.viz_definition[key1].dimension = dimensionBuilder['auto'](key1);
        }

        //------------------------------------------------------------------------------------
        // Group: Charts groups setup
        //------------------------------------------------------------------------------------

        var groupBuilder = {};
        groupBuilder.outbreak = {
            multiadm: function(dimkey){
                mapGroup = {};
                g.geometry_keylist.forEach(function(key2) {
                    mapGroup[key2] = g.viz_definition[dimkey].dimension[key2].group();
                });
                return mapGroup;
            },
            auto: function(){
                var group = g.viz_definition[dimkey].dimension.group();
                return group;
            }
        };
        groupBuilder.surveillance = {
            multiadm: function(dimkey,keylistgroup){
                var mapGroup = {};
                g.geometry_keylist.forEach(function(key2) {
                    mapGroup[key2] = g.viz_definition[dimkey].dimension[key2].group().reduce(
                        function(p,v) {
                            p['Records']++;
                            p['Values'] += +v[g.medical_headerlist[keylistgroup[0]]];
                            return p;
                        },
                        function(p,v) {
                            p['Records']--;
                            p['Values'] -= +v[g.medical_headerlist[keylistgroup[0]]];
                            return p;
                        },
                        function() {
                            var temp = {};
                            temp['Records'] = 0;
                            temp['Values'] = 0;
                            return temp;
                        }
                    );
                    //.reduceSum(function(d) {return d[g.medical_headerlist[keylistgroup[0]]];});
                });
                return mapGroup;
            },
            stackedbar: function(dimkey,keylistgroup){
                var group = {};
                group.u = g.viz_definition[dimkey].dimension.group().reduceSum(function(d){return d[keylistgroup[1]]=="u"?d[g.medical_headerlist[keylistgroup[0]]]:0;});
                group.o = g.viz_definition[dimkey].dimension.group().reduceSum(function(d){return d[keylistgroup[1]]=="o"?d[g.medical_headerlist[keylistgroup[0]]]:0;});
                return group;
            },
            series: function(dimkey,keylistgroup){
                /*var group = g.viz_definition[dimkey].dimension.group().reduce(
                    function(p,v) {
                        g.medical_yearlist.forEach(function(year) {
                            if (year == v[g.medical_headerlist['epiwk']].split('-')[0]) {
                                p[year +'Records']++;
                                p[year] += +v[g.medical_headerlist[keylistgroup[0]]];
                            }
                        });
                        return p;
                    },
                    function(p,v) {
                        g.medical_yearlist.forEach(function(year) {
                            if (year == v[g.medical_headerlist['epiwk']].split('-')[0]) {
                                p[year +'Records']--;
                                p[year] -= +v[g.medical_headerlist[keylistgroup[0]]];
                            }
                        });
                        return p;
                    },
                    function() {
                        var temp = {};
                        g.medical_yearlist.forEach(function(year) {
                            temp[year +'Records'] = 0;
                            temp[year] = 0;
                        });
                        return temp;
                    }
                );*/
                return group;
            },
            row: function(dimkey,keylistgroup){
                var group = g.viz_definition[dimkey].dimension.group()
                    .reduceSum(function(d) {return 0.5;})//((d[g.medical_headerlist[keylistgroup[0]]] > 0) ? 1 : 1);})
                    .order(function(d) {return -d;});
                return group;
            },
            auto: function(dimkey,keylistgroup){
                var group = g.viz_definition[dimkey].dimension.group().reduceSum(function(d) {return d[g.medical_headerlist[keylistgroup[0]]];});
                return group;
            }
        };

        // Shared dimension!
        if(g.viz_definition[key1].dimension_type == 'shared'){
            if ((g.medical_datatype == 'surveillance') && (g.viz_definition[key1].group_type == 'custom')) {
                if (g.viz_definition[key1].chart_type in groupBuilder[g.medical_datatype]) { 
                    g.viz_definition[key1].group = groupBuilder[g.medical_datatype][g.viz_definition[key1].chart_type](g.viz_definition[key1].dimension_setup[0],g.viz_definition[key1].group_setup);
                }else{
                    console.log('main-core.js ~l260: Your custom Group Builder is not defined for viz: '+key1);
                }
            }else if((g.medical_datatype == 'surveillance') && (g.viz_definition[key1].group_type == 'auto')){
                g.viz_definition[key1].group = groupBuilder[g.medical_datatype]['auto'](g.viz_definition[key1].dimension_setup[0],g.viz_definition[key1].group_setup);
                
            }else if(g.viz_definition[key1].group_type == 'custom'){
                if (g.viz_definition[key1].chart_type in groupBuilder[g.medical_datatype]) { 
                    g.viz_definition[key1].group = groupBuilder[g.medical_datatype][g.viz_definition[key1].chart_type](g.viz_definition[key1].dimension_setup[0]);
                }else{
                    console.log('main-core.js ~l260: Your custom Group Builder is not defined for viz: '+key1);
                }
            }else if(g.viz_definition[key1].group_type == 'auto'){
                g.viz_definition[key1].group = groupBuilder[g.medical_datatype]['auto'](g.viz_definition[key1].dimension_setup[0]);
            }

        // Classical dimensions.
        }else{
            if ((g.medical_datatype == 'surveillance') && (g.viz_definition[key1].group_type == 'custom')) {
                if (g.viz_definition[key1].chart_type in groupBuilder[g.medical_datatype]) { 
                    g.viz_definition[key1].group = groupBuilder[g.medical_datatype][g.viz_definition[key1].chart_type](key1,g.viz_definition[key1].group_setup);
                }else{
                    console.log('main-core.js ~l260: Your custom Group Builder is not defined for viz: '+key1);
                }
            }else if((g.medical_datatype == 'surveillance') && (g.viz_definition[key1].group_type == 'auto')){
                g.viz_definition[key1].group = groupBuilder[g.medical_datatype]['auto'](key1,g.viz_definition[key1].group_setup);
                
            }else if(g.viz_definition[key1].group_type == 'custom'){
                if (g.viz_definition[key1].chart_type in groupBuilder[g.medical_datatype]) { 
                    g.viz_definition[key1].group = groupBuilder[g.medical_datatype][g.viz_definition[key1].chart_type](key1);
                }else{
                    console.log('main-core.js ~l260: Your custom Group Builder is not defined for viz: '+key1);
                }
            }else if(g.viz_definition[key1].group_type == 'auto'){
                g.viz_definition[key1].group = groupBuilder[g.medical_datatype]['auto'](key1);
            }    
        }
        //------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------
        // 4) DC.js Charts definition
        //------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------

        if (g.viz_definition[key1].display_colors) {
            var color_list = [];
            g.viz_definition[key1].display_colors.forEach(function(num) {
                color_list.push(g.colorscale_colors[g.colorscale_colorscurrent][num]);
            });
            var color_domain = [0,color_list.length - 1];
        }else{
            var color_list = d3.scale.category10();
            var color_domain = [0,color_list.length - 1]; 
        }

        switch(g.viz_definition[key1].chart_type){
            
            //------------------------------------------------------------------------------------
            case 'bar':
            //------------------------------------------------------------------------------------
                g.viz_definition[key1].chart.width($('#chart-'+key1).width())
                    .height(185)
                    .dimension(g.viz_definition[key1].dimension)
                    .group(g.viz_definition[key1].group);

                if (g.viz_definition[key1].domain_type == 'custom_ordinal') {
                    var xScaleRange = d3.scale.ordinal().domain(g.viz_definition[key1].domain); 
                    g.viz_definition[key1].chart
                        .x(xScaleRange)
                        .xUnits(dc.units.ordinal)
                        .title(function(d) { return d.key + ": " + d.value; });
                }else if (g.viz_definition[key1].domain_type == 'custom_linear'){
                    function filterPrinterCustom(filter) {
                        var s = "";
                        if (filter) {
                            if (filter instanceof Array) {
                                if (filter[0].length >= 2) {
                                    s = "[" + dc.utils.printSingleValue(Math.ceil(filter[0][0])) + " -> " + dc.utils.printSingleValue(Math.floor(filter[0][1])) + "]";
                                } else if (filter[0].length >= 1) {
                                    s = dc.utils.printSingleValue(filter[0]);
                                }
                            } else {
                                s = dc.utils.printSingleValue(filter);
                            }
                        }
                        return s;
                    }
                    var xScaleRange = d3.scale.linear().domain(g.viz_definition[key1].domain); 
                    g.viz_definition[key1].chart
                        .x(xScaleRange)
                        .filterPrinter(filterPrinterCustom);
                }

                g.viz_definition[key1].chart
                    .margins({top: 10, right: 50, bottom: 60, left: 40})
                    .elasticY(true)
                    .colors(color_list)
                    .xAxisLabel(g.viz_definition[key1].display_axis.x)
                    .yAxisLabel(g.viz_definition[key1].display_axis.y);

                g.viz_definition[key1].chart
                    .yAxis().ticks(5);

                g.viz_definition[key1].chart.render();
            

                g.viz_definition[key1].chart
                    .on('renderlet.bar',function(chart){
                        if (!(g.interface_autoplayon)) {
                            var barsData = [];
                            var bars = chart.selectAll('.bar').each(function(d) { barsData.push(d); });
                            d3.select(bars[0][0].parentNode).select('#inline-labels').remove();
                            var gLabels = d3.select(bars[0][0].parentNode).append('g').attr('id','inline-labels');
                            for (var i = bars[0].length - 1; i >= 0; i--) {
                                var b = bars[0][i];
                                if(b.getAttribute('height') < 5 && barsData[i].data.value > 0){
                                    gLabels
                                        .append("text")
                                        .text(barsData[i].data.value)
                                        .attr('x', +b.getAttribute('x') + (b.getAttribute('width')/2) )
                                        .attr('y', +b.getAttribute('y') - 5)
                                        .attr('text-anchor', 'middle')
                                        .attr('font-size', '0.7em')
                                        .attr('fill', 'grey')
                                        .attr('id', 'bar-'+key1+'-'+i)
                                        .attr('class', 'bar-label')
                                    $('#bar-'+key1+'-'+i).click(function(target_id){
                                        var barnum = parseInt(target_id.currentTarget.id.split('-')[2]);
                                        g.viz_definition[key1].chart.filter(barsData[barnum].data.key);
                                        if(g.viz_definition.sync_to){
                                            g.viz_definition.sync_to.forEach(function(key2) {
                                                g.viz_definition[key2].chart.filter(barsData[barnum].data.key);
                                            })
                                        }
                                        dc.redrawAll();
                                    });
                                }
                            }
                        }
                    })
                    .on("preRedraw", function(chart){
                        chart.select('#inline-labels').remove();
                    });

                if (!(key1 == 'epiwk' || key1 == 'death' || key1 == 'case')) {
                    $('#chart-'+key1+' .x-axis-label').attr('dy','-20px');
                    console.log('Special label margin: #chart-'+key1);
                }
                break;

            //------------------------------------------------------------------------------------
            case 'pie':
            //------------------------------------------------------------------------------------

                g.viz_definition[key1].chart
                    .width($('#chart-'+key1).width())
                    .height(320)
                    .dimension(g.viz_definition[key1].dimension)
                    .group(g.viz_definition[key1].group)
                    .innerRadius(25);

                g.viz_definition[key1].chart
                    .colors(color_list)
                    .colorDomain(color_domain)
                    .colorAccessor(function(d,i){
                        return i;
                        });
                
                g.viz_definition[key1].chart
                    .minAngleForLabel(0.05)
                    .legend(dc.legend().x(10).y(20))
                    .label (function (d) {return d3.round((d.value / d3.sum(g.viz_definition[key1].group.all(), function(d){ return d.value;}))*100,0) +"%";});
                g.viz_definition[key1].chart.render();
                break;

            //------------------------------------------------------------------------------------
            case 'multiadm':
            //------------------------------------------------------------------------------------
                
                // 5) DC.js Maps definition
                //------------------------------------------------------------------------------------
                g.viz_currentvalues = {};
                g.geometry_keylist.forEach(function(key) {
                    g.viz_currentvalues[key] = {};
                });

                function valueAccessor(d){
                    temp_adm = g.geometry_keylist[d.key.split(', ').length - 1];
                    if (g.colorscale_mapunitcurrent == 'Incidence') {
                        var filtersyrlength = g.viz_definition.year.chart.filters().length;

                        var filterswklength=g.viz_definition[g.viz_timeline].chart.filters().length;
                        if(filterswklength==0){
                            filterswklength=g.viz_definition[g.viz_timeline].domain.length;
                            g.viz_definition[g.viz_timeline].domain.forEach(function(wk) {
                                if(filtersyrlength == 1 && wk.substr(0,4) == g.viz_definition.year.chart.filters()[0]){
                                    filterswklength--;
                                }
                            });
                        }else{
                            g.viz_definition[g.viz_timeline].chart.filters().forEach(function(wk) {
                                if(filtersyrlength == 1 && wk.substr(0,4) == g.viz_definition.year.chart.filters()[0]){
                                    filterswklength--;
                                }
                            });
                        }

                        var accessed_value = (d.value.Values/g.population_popdata.pop[d.key] * 10000 ) / filterswklength;

                    }else if (g.colorscale_mapunitcurrent == 'Completeness') {

                        var filtersyrlength = g.viz_definition.year.chart.filters().length;

                        var filterswklength=g.viz_definition[g.viz_timeline].chart.filters().length;
                        if(filterswklength==0){
                            filterswklength=g.viz_definition[g.viz_timeline].domain.length;
                            var temp_count = 0;
                            g.viz_definition[g.viz_timeline].domain.forEach(function(wk) {
                                if(!(filtersyrlength == 1) || (filtersyrlength == 1 && wk.substr(0,4) == g.viz_definition.year.chart.filters()[0]) ){
                                    var temp_key = wk +', '+d.key;
                                    if(g.medical_completeness[temp_key]){
                                        temp_count += g.medical_completeness[temp_key].value ;
                                    }                                    
                                }else{
                                    filterswklength--;
                                }
                            });
                            temp_count = temp_count / filterswklength;
                        
                        }else{
                            var temp_count = 0;
                            g.viz_definition[g.viz_timeline].chart.filters().forEach(function(wk) {
                                if(!(filtersyrlength == 1) || (filtersyrlength == 1 && wk.substr(0,4) == g.viz_definition.year.chart.filters()[0]) ){
                                    var temp_key = wk +', '+d.key;
                                    if(g.medical_completeness[temp_key]){
                                      temp_count += g.medical_completeness[temp_key].value ;
                                    }
                                }else{
                                    filterswklength--;
                                }
                            });
                            temp_count = temp_count / filterswklength;
                        }
                        var accessed_value = temp_count * 100;
                    }else{
                        var accessed_value = d.value.Values;
                    };
                    g.viz_currentvalues[temp_adm][d.key] = accessed_value;
                    return accessed_value; 
                };

                function colorAccessor(d){
                    var col = g.colorscale_valuescurrent.length - 1;
                    if(g.colorscale_mapunitcurrent == 'Completeness'){
                        col_lim = 1;    
                    }else{
                        col_lim = 0;
                    }
                    if(d){
                        while ((d < g.colorscale_valuescurrent[col]) && (col > col_lim)){
                            col--;
                        }
                        if(g.colorscale_valuescurrent.length < 7){
                            col--;  
                        }
                    }else{
                        col = 0;
                    }
                    return col;
                }

                g.viz_definition[key1].maps = {};
                g.viz_definition[key1].legend ={};

                g.geometry_keylist.forEach(function(key2){

                    var div_id = '#map-' + key2;
                    var filter_id = div_id + '-filter';
                    g.viz_definition[key1].charts[key2].width($(div_id).width())
                        .height(300)
                        .dimension(g.viz_definition[key1].dimension[key2])
                        .group(g.viz_definition[key1].group[key2])
                        .geojson(g.geometry_data[key2]) 
                        .colors(color_list)
                        .valueAccessor(valueAccessor)
                        .colorDomain(color_domain)
                        .colorAccessor(colorAccessor)                          
                        .featureKeyAccessor(function(feature){
                            return feature.properties['name'];
                        }).popup(function(feature){
                            return feature.properties['name'];
                        })
                        .renderPopup(true)
                        .featureOptions({
                            'fillColor': 'black',
                            'color': 'gray',
                            'opacity':0.5,
                            'fillOpacity': 0,
                            'weight': 2
                        })
                        .on("renderlet.key",function(e){
                            var html = "";
                            e.filters().forEach(function(l){
                                html += l.split(',')[l.split(',').length-1]+", ";
                            });
                            $(filter_id).html(html);
                        });

                    g.viz_definition[key1].charts[key2].render();
                    g.viz_definition[key1].maps[key2] = g.viz_definition[key1].charts[key2].map();
                    g.viz_definition[key1].maps[key2].scrollWheelZoom.disable();
                    zoomToGeom(g.geometry_data[key2],g.viz_definition[key1].maps[key2]);

                    // Map legend
                    g.viz_definition[key1].legend[key2] = L.control({position: 'bottomright'});

                    g.viz_definition[key1].legend[key2].onAdd = function (adm) {

                        if (g.colorscale_mapunitcurrent == 'Incidence') {
                            var precision = 2;
                        }else{
                            var precision = 0;
                        }
                        var div = L.DomUtil.create('div', 'info legend');
                        for(var i = g.colorscale_valuescurrent.length - 1;i > 1;i--){
                            var minVal = g.colorscale_valuescurrent[i - 1];
                            var maxVal = g.colorscale_valuescurrent[i];
                            div.innerHTML += '<i style="background:' + g.colorscale_colors[g.colorscale_colorscurrent][i - 1] + '"></i> ' + minVal.toFixed(precision) + (!(minVal == maxVal) ? '&ndash;' + maxVal.toFixed(precision) + '<br>' : '+ <br>');
                        }
                        if(!(g.colorscale_mapunitcurrent == 'Completeness')){
                            div.innerHTML += '<i style="background:' + g.colorscale_colors[g.colorscale_colorscurrent][0] + '"></i> '+ g.module_lang.text[g.module_lang.current].map_legendNA;
                        }
                        return div;
                    };

                    var myStyle = {
                        "color": "#663d00",
                        "weight": 2,
                        "opacity": 1,
                        "fillColor": "#000000",
                        "fillOpacity": 0.1,
                    };

                    var maskLayer = L.geoJson(g.mask_data.mask, {
                        style: myStyle
                        });

                    maskLayer.addTo(g.viz_definition[key1].maps[key2]);
                    maskLayer.bringToBack();

                    var myStyle = {
                        "color": "#663d00",
                        "weight": 2,
                        "opacity": 1,
                        "fillColor": "#ffffff",
                        "fillOpacity": 0,
                    };

                    var admLayer = L.geoJson(g.mask_data.adm, {
                        style: myStyle
                        });

                    admLayer.addTo(g.viz_definition[key1].maps[key2]);
                    admLayer.bringToBack();

                    g.viz_definition[key1].legend[key2].addTo(g.viz_definition[key1].maps[key2]);

                });

                break;

            //------------------------------------------------------------------------------------
            case 'row':
            //------------------------------------------------------------------------------------        
                g.viz_definition[key1].chart.width($('#chart-'+key1).width())
                    .height(345)
                    .dimension(g.viz_definition[key1].dimension)
                    .group(g.viz_definition[key1].group)
                    .colors(color_list[0]);

                if (g.viz_definition[key1].domain_type == 'custom_log') {
                    var disobjects = g.viz_definition[key1].group.top(Infinity);
                    var disvalues = Object.keys(disobjects).map(function (key,keynum) {return disobjects[keynum].value});
                    var max = d3.max(disvalues);
                    g.viz_definition[key1].domain = [1,max];

                    var xScaleRange = d3.scale.log().clamp(true).domain(g.viz_definition[key1].domain).range([0,$('#chart-'+key1).width() - 50]).nice();
                    g.viz_definition[key1].chart
                        .x(xScaleRange);
                }else{
                    g.viz_definition[key1].chart
                        .elasticX(true)
                        .xAxis().ticks(3);;
                }

                g.viz_definition[key1].chart
                    .margins({top: 10, right: 3, bottom: 50, left: 3})
                    .data(function(group) {
                        return group.top(Infinity).filter(function(d) {
                            return d.value != 0;
                        });
                    });
               
                g.viz_definition[key1].chart
                    .filterHandler(function (dimension, filters) {
                        if (filters.length === 0) {
                            dimension.filter(null);
                            var out = filters;
                        } else {
                            dimension.filterFunction(function (d) {
                                filters = [filters[filters.length-1]];
                                for (var i = 0; i < filters.length; i++) {
                                    var filter = filters[i];
                                    if (filter.isFiltered && filter.isFiltered(d)) {
                                        return true;
                                    } else if (filter <= d && filter >= d) {
                                        return true;
                                    }
                                }
                                return false;
                            });
                            var out = [filters[filters.length-1]];
                        }
                        g.medical_currentdisease = out[0];
                        dc.redrawAll();
                        return out;
                    });
                
                //var rand = g.medical_diseaseslist[Math.floor(Math.random() * g.medical_diseaseslist.length)];
                var rand = 'Malaria Positive';
                g.viz_definition[key1].chart.render();
                g.viz_definition[key1].chart.filter(rand);

                function AddXAxis(chartToUpdate, displayText){
                    chartToUpdate.svg()
                        .append("text")
                        .attr("class", "x-axis-label")
                        .attr("text-anchor", "middle")
                        .attr("x", chartToUpdate.width()/2)
                        .attr("y", chartToUpdate.height()-3.5)
                        .text(displayText);
                }
                AddXAxis(g.viz_definition[key1].chart,g.viz_definition[key1].display_axis.x);

                

                break;

            //------------------------------------------------------------------------------------
            case 'stackedbar':
            //------------------------------------------------------------------------------------
                g.viz_definition[key1].chart.width($('#chart-'+key1).width())
                    .height(180);
                if(g.viz_definition[key1].dimension_type == 'shared'){
                    g.viz_definition[key1].chart.width($('#chart-'+key1).width())
                        .dimension(g.viz_definition[g.viz_definition[key1].dimension_setup[0]].dimension);
                }else{
                    g.viz_definition[key1].chart.width($('#chart-'+key1).width())
                        .dimension(g.viz_definition[key1].dimension);
                }

                g.viz_definition[key1].chart.width($('#chart-'+key1).width())
                    .group(g.viz_definition[key1].group.u, "Under 5")
                    .stack(g.viz_definition[key1].group.o, "Over 5");

                if (g.viz_definition[key1].domain_type == 'custom_ordinal') {
                    var xScaleRange = d3.scale.ordinal().domain(g.viz_definition[key1].domain); 
                    g.viz_definition[key1].chart
                        .x(xScaleRange)
                        .xUnits(dc.units.ordinal)
                        .title(function(d) { return d.key + ": " + d.value; });
                }else if (g.viz_definition[key1].domain_type == 'custom_linear'){
                    function filterPrinterCustom(filter) {
                        var s = "";
                        if (filter) {
                            if (filter instanceof Array) {
                                if (filter[0].length >= 2) {
                                    s = "[" + dc.utils.printSingleValue(Math.ceil(filter[0][0])) + " -> " + dc.utils.printSingleValue(Math.floor(filter[0][1])) + "]";
                                } else if (filter[0].length >= 1) {
                                    s = dc.utils.printSingleValue(filter[0]);
                                }
                            } else {
                                s = dc.utils.printSingleValue(filter);
                            }
                        }
                        return s;
                    }
                    var xScaleRange = d3.scale.linear().domain(g.viz_definition[key1].domain); 
                    g.viz_definition[key1].chart
                        .x(xScaleRange)
                        .filterPrinter(filterPrinterCustom);
                }

                g.viz_definition[key1].chart
                    .margins({top: 10, right: 50, bottom: 60, left: 40})
                    .elasticY(true)
                    /*.legend(dc.legend()
                        .x($('#chart-'+key1).width()- 75)
                        .y(10))
                    .title(function(d) { return d.key+ "\nTotal: " + d.value[g.datacheck_definition_value.setup[0]]+ "\nUnder 5: " + d.value[g.datacheck_definition_value.setup[1]]  + "\nOver 5: " + d.value[g.viz_definition[key1].group_setup[2]]; })*/
                    .ordinalColors(color_list)
                    .xAxisLabel(g.viz_definition[key1].display_axis.x)
                    .yAxisLabel(g.viz_definition[key1].display_axis.y);

                g.viz_definition[key1].chart
                    .yAxis().ticks(5);

                g.viz_definition[key1].chart.render();         

                g.viz_definition[key1].chart
                    .on('renderlet.bar',function(chart){
                        if (!(g.interface_autoplayon)) {
                            var barsData = [];
                            var bars = chart.selectAll('.bar').each(function(d) { barsData.push(d); });
                            d3.select(bars[0][0].parentNode).select('#inline-labels').remove();
                            var gLabels = d3.select(bars[0][0].parentNode).append('g').attr('id','inline-labels');
                            for (var i = bars[0].length - 1; i >= 0; i--) {
                                var b = bars[0][i];
                                if(b.getAttribute('height') < 5 && barsData[i].y > 0){
                                    if(barsData[i].layer == 'Under 5'){
                                        var offset = -(b.getAttribute('width')/4);
                                        var cpt = 'U';
                                    }else{
                                        var offset = +(b.getAttribute('width')/4); 
                                        var cpt = 'O';
                                    }
                                    gLabels
                                        .append("text")
                                        .text(cpt + barsData[i].y)
                                        .attr('x', +b.getAttribute('x') + (b.getAttribute('width')/2) + offset)
                                        .attr('y', +b.getAttribute('y') - 5)
                                        .attr('text-anchor', 'middle')
                                        .attr('font-size', '0.7em')
                                        .attr('fill', 'grey')
                                        .attr('id', 'bar-'+key1+'-'+i)
                                        .attr('class', 'bar-label')
                                    $('#bar-'+key1+'-'+i).click(function(target_id){
                                        var barnum = parseInt(target_id.currentTarget.id.split('-')[2]);
                                        g.viz_definition[key1].chart.filter(barsData[barnum].data.key);
                                        if(g.viz_definition[key1].sync_to){
                                            g.viz_definition[key1].sync_to.forEach(function(key2) {
                                                g.viz_definition[key2].chart.filter(barsData[barnum].data.key);
                                            });
                                        }
                                        dc.redrawAll();
                                    });
                                }
                            }
                            chart.selectAll('#inline-labels').each(function()
                            {
                                this.parentNode.parentNode.appendChild(this.parentNode)
                            });
                        }
                    })
                    .on("preRedraw", function(chart){
                            chart.select('#inline-labels').remove();
                    });

                if (!(key1 == 'epiwk' || key1 == 'death_bar' || key1 == 'case_bar')) {
                    $('#chart-'+key1+' .x-axis-label').attr('dy','-20px');
                    console.log('Special label margin: #chart-'+key1);
                }

                break;

            //------------------------------------------------------------------------------------
            case 'series':
            //------------------------------------------------------------------------------------
                g.viz_definition[key1].chart.width($('#chart-'+key1).width())
                    .height(180)
                    .chart(function(c) { 
                        return dc.lineChart(c).interpolate('step');
                        });

                if(g.viz_definition[key1].dimension_type == 'shared'){
                    g.viz_definition[key1].chart
                        .dimension(g.viz_definition[g.viz_definition[key1].dimension_setup[0]].dimension);
                }else{
                    g.viz_definition[key1].chart
                        .dimension(g.viz_definition[key1].dimension);
                }

                g.viz_definition[key1].chart
                        .group(g.viz_definition[key1].group);

                if (g.viz_definition[key1].domain_type == 'custom_ordinal') {
                    var xScaleRange = d3.scale.ordinal().domain(g.viz_definition[key1].domain); 
                    g.viz_definition[key1].chart
                        .x(xScaleRange)
                        .xUnits(dc.units.ordinal)
                        .title(function(d) { return d.key + ": " + d.value; });

                }else if (g.viz_definition[key1].domain_type == 'custom_linear'){

                    var xScaleRange = d3.scale.linear().domain(g.viz_definition[key1].domain); 
                    g.viz_definition[key1].chart
                        .x(xScaleRange)
                        .brushOn(false)
                        .seriesAccessor(function(d) {
                             return d.key[0]; })
                        .keyAccessor(function(d) {return +d.key[1];})
                        .valueAccessor(function(d) {return +d.value;});
                }

                g.viz_definition[key1].chart
                    .margins({top: 10, right: 50, bottom: 60, left: 40})
                    .elasticY(true)
                    .title(function(d) { return d.key+ ": " + d.value; })
                    .xAxisLabel(g.viz_definition[key1].display_axis.x)
                    .yAxisLabel(g.viz_definition[key1].display_axis.y);

                g.viz_definition[key1].chart
                    .yAxis().ticks(5);

                g.viz_definition[key1].chart.render();         

                if (!(key1 == 'epiwk' || key1 == 'death_bar' || key1 == 'case_bar')) {
                    $('#chart-'+key1+' .x-axis-label').attr('dy','-20px');
                    console.log('Special label margin: #chart-'+key1);
                }

                break;
            
            //------------------------------------------------------------------------------------
            case 'table':
            //------------------------------------------------------------------------------------

		// Load Optional Module: module-datatable.js
 		//------------------------------------------------------------------------------------
                module_datatable_setup();
                module_datatable_display();
                module_datatable_interaction();
                break;
            
            //------------------------------------------------------------------------------------
            default:
            //------------------------------------------------------------------------------------
            
                console.log('main-core.js ~l290: Your chart type is not defined for viz: '+key1);
                break;
        }
    });  

    // Sync maps movment
    g.geometry_keylist.forEach(function(key1){
        g.geometry_keylist.forEach(function(key2){
            if(!(key1 == key2)){
                g.viz_definition.multiadm.maps[key1].sync(g.viz_definition.multiadm.maps[key2]);
            }
        }); 
    });

    g.viz_keylist.forEach(function(key1) {
        if(g.viz_definition[key1].sync_to){
            g.viz_definition[key1].chart.on('renderlet.sync',function(chart) {
                g.viz_definition[key1].chart.selectAll('rect').on("click", function(d) {
                    g.viz_definition[key1].chart.filter(d.x);
                    g.viz_definition[key1].sync_to.forEach(function(key2) {
                        g.viz_definition[key2].chart.filter(d.x);
                    });
                    dc.redrawAll();
                });
            });
        }
    });
              

    // Load Optional Modules: module-multiadm.js | module-intro.js | module-interface.js | module-chartwarper.js
    //------------------------------------------------------------------------------------
    module_multiadm_interaction();
    module_intro_setup();
    module_interface_display();
    module_chartwarper_display(tabcontainer_id,chartcontainers_list);
    module_chartwarper_interaction(chartcontainers_list);

    // Key figures
    function isinteger(value){
        var cond_0 = !(value == '');
        var cond_1 = value >= 0;
        var cond_2 = parseInt(Number(value),10) == value;
        return cond_0 && cond_1 && cond_2;
    }

    var caseGroupAll = cf.groupAll().reduceSum(function(d) {
        if(isinteger(d[g.medical_headerlist.case])){
            return parseInt(d[g.medical_headerlist.case]);
        }else{
            return 0;
        }
    });
    var deathGroupAll = cf.groupAll().reduceSum(function(d) {
        if(isinteger(d[g.medical_headerlist.death])){
            return parseInt(d[g.medical_headerlist.death]);
        }else{
            return 0;
        }
    });
    var all = cf.groupAll();

    dc.dataCount('#case-info')
        .dimension(cf)
        .group(caseGroupAll);

    dc.dataCount('#death-info')
        .dimension(cf)
        .group(deathGroupAll);

    dc.dataCount('#count-info')
        .dimension(cf)
        .group(all);    

    dc.redrawAll();

    for (var i = 0; i < dc.chartRegistry.list().length; i++) {
        var chart = dc.chartRegistry.list()[i];
        chart.on("filtered",function() {
            module_colorscale_lockcolor('Auto');
            refreshTable();
        });
    }
    /*
    // Group: All group setup
    var all = cf.groupAll();

    // DC.js - Number of records selected output
    dc.dataCount('#menu_count')
        .dimension(cf)
        .group(all);
    dc.redrawAll();
    */
    module_colorscale_lockcolor(g.colorscale_modecurrent);

    $('#modal').modal('hide');
}


function zoomToGeom(geom,adm){
    var bounds = d3.geo.bounds(geom);
    adm.fitBounds([[bounds[0][1],bounds[0][0]],[bounds[1][1],bounds[1][0]]]);
}
