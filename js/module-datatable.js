/*------------------------------------------------------------------------------------
	
	MSF Dashboard - module-datatable.js
	(c) Bruno Raimbault for MSF UK
	Please refer to the README.txt for complete licenses.
	    
	Components:
	0) Setup
	1) Datatable Setup
	2) Display
	3) Interactions

	Dependencies:
	- module-lang   OK

------------------------------------------------------------------------------------*/

// 0) Setup
//------------------------------------------------------------------------------------

modules_list.datatable = true;

// 1) Datatable Setup
//------------------------------------------------------------------------------------

    // Datatable
function module_datatable_setup(){
    
    g.datatable_columns = [];
    g.medical_keylist.forEach(function(key,keynum){
        var column = {
            targets: keynum,
            data: function(rec) { return rec[g.medical_headerlist[key]]; }
        };
        g.datatable_columns.push(column);
    });

    g.datatable_definition = {
        dom: '<"#copyBtn"B>l<t>ip',
        buttons: [
            {
            extend: 'copy',
            text: g.module_lang.text[g.module_lang.current].datatable_text.button 
            } 
        ],
        data: g.viz_definition.table.dimension.top(Infinity),
        columns: g.datatable_columns,
        language: g.module_lang.text[g.module_lang.current].datatable_text.language,
        autoWidth: false
    };
}


// 2) Display
//------------------------------------------------------------------------------------

function module_datatable_display(){

   var html = '<table style="font-size: 0.9em;" class="table table-condensed table-hover table-striped order-column viz" id="chart-table">';
        html += '<span id=buttons-table></span>';
        html += '<thead class="text-capitalize"><tr>';
            g.medical_keylist.forEach(function(key){
                html += '<th>'+key+'</th>';
            });
        html += '</tr></thead>';
        html += '<tbody></tbody>';
        html += '<tfoot><tr>';
            g.medical_keylist.forEach(function(key){
                html += '<th></th>';
            });
        html += '</tr></tfoot>';
    html += '</table>'

    // Légendes
    html += '<p><small><br>'+g.module_lang.text[g.module_lang.current].datatable_legend+'</small></p>';

    $('#container-table').html(html);
    g.datable_datatable = $('#chart-table').dataTable(g.datatable_definition);

}

// 3) Interactions
//------------------------------------------------------------------------------------

function module_datatable_interaction(){
    $('#more-table').html(g.module_lang.text[g.module_lang.current].datatable_more);


     $('#more-table').on('click',function(e) {
        if ($('#container-table').is(':hidden') == true) {
            $('#container-table').slideToggle();
            refreshTable();
            $('#more-table').html(g.module_lang.text[g.module_lang.current].datatable_less);
        }else{
            $('#container-table').slideToggle();
            $('#more-table').html(g.module_lang.text[g.module_lang.current].datatable_more);
        }
    });

    refreshTable();
}

function refreshTable() {
    if ($('#container-table').is(':hidden') == false) {
        dc.events.trigger(function () {
            g.datable_datatable.api()
                .clear()
                .rows.add(g.viz_definition.table.dimension.top(Infinity) )
                .draw();
        });
    }
}

