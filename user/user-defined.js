/*------------------------------------------------------------------------------------

    MSF Dashboard - user-defined.js
    (c) Bruno Raimbault for MSF UK
    Please refer to the README.txt for complete licenses.
    
    The user defined parameters to genereate a dashboard are located here and in:
     - index.html
     - lang > module-lang.js

    Components:
    1) Data parameters
    2) Data check parameters
    3) Charts parameters

    Dependencies:
    - module-lang   OK

------------------------------------------------------------------------------------*/

// 1) Data parameters
//------------------------------------------------------------------------------------
// Please enter below the list of headers used in your datafiles:
g.medical_datatype = 'surveillance'; // 'outbreak' or 'surveillance'

g.medical_headerlist = {

// Common
//------------------------------------------------------------------------------------
    epiwk: 'epiweek',     // Epidemiological week: format YYYY-WW
    admN1: 'chiefdom',    // Name of administrative/health division level N1 
    admN2: 'PHU',
//    pop: 'pop',

// Outbreak 
//------------------------------------------------------------------------------------
/*
    age: 'Age',         // Age of patient in years
    sex: 'Sex',         // Sex: 1 = Male, 2 = Female 
    preg: 'Pregnant',   // Pregnancy: 1 = Pregnant, 2 = Not Pregnant or N/A
    sev: 'Dehydr_Adm',  // Dehydratiation severity: A = Light, B = Moderate, C = Severe
    dur: 'StayDays',    // Stay duration in days
    out: 'Outcome',     // Outcome: 1 = Cured, 2 = Dead, 3 = Interrupted F/U, 4 = Transfered
*/


// Surveillance
//------------------------------------------------------------------------------------
    disease: 'disease',
    fyo: 'fyo',
    case: 'cas', 
//  mcase: 'mcase',
//  fcase: 'fcase',
    death: 'dth', 
//  mdeath: 'mdeath',
//  fdeath: 'fdeath',
};

g.population_headerlist = {
    admNx: 'name',
    pop: 'population'
};

// Please enter below the list of special keys to be read (eg. 1 = Male):
function main_loadfiles_readvar(){
    g.medical_read = {
        /*
        out:        {'1':g.module_lang.text[g.module_lang.current].chart_out_label1,
                     '2':g.module_lang.text[g.module_lang.current].chart_out_label2,
                     '3':g.module_lang.text[g.module_lang.current].chart_out_label3,
                     '4':g.module_lang.text[g.module_lang.current].chart_out_label4},
        sev:        {A:g.module_lang.text[g.module_lang.current].chart_sev_labelA,
                     B:g.module_lang.text[g.module_lang.current].chart_sev_labelB,
                     C:g.module_lang.text[g.module_lang.current].chart_sev_labelC},
        sexpreg:    {'12':g.module_lang.text[g.module_lang.current].chart_sexpreg_label12,
                     '22':g.module_lang.text[g.module_lang.current].chart_sexpreg_label22,
                     '21':g.module_lang.text[g.module_lang.current].chart_sexpreg_label21},
        */
        fyo:        {u:g.module_lang.text[g.module_lang.current].chart_fyo_labelu,
                     o:g.module_lang.text[g.module_lang.current].chart_fyo_labelo},
        
    };
}

// Please enter below your file addresses:
g.geometry_filelist = {
    admN1: './data/geo_chief.geojson', // Name -> .features.properties.name
    admN2: './data/geo_phu.geojson', // Name -> .features.properties.name
};

g.population_filelist = {
    pop: './data/tonkolili_population_2015.csv',
};

// Please enter below your file addresses:
g.mask_filelist = {
    mask: './data/mask.geojson',
    adm: './data/geo_chief.geojson'
};

// 2) Data check parameters
//------------------------------------------------------------------------------------
// Define here the types expected for values
g.datacheck_definition_value = {

// Common
//------------------------------------------------------------------------------------
    epiwk:  {test_type: 'epiwk',        setup: 'none'},     // Epidemiological week: format YYYY-WW
    admN1:  {test_type: 'ingeometry',   setup: 'none'}, // Name of division level N1 
    admN2:  {test_type: 'ingeometry',   setup: 'none'}, // Name of division level N1 
//    pop:    {test_type: 'integer',      setup: 'none'},     // Population of adm

// Outbreak
//------------------------------------------------------------------------------------
/*
    age:    {test_type: 'integer',      setup: 'none'},     // Age of patient in years
    sex:    {test_type: 'inlist',       setup: ["1","2"]},  // Sex: 1 = Male, 2 = Female 
    preg:   {test_type: 'inlist',       setup: ["1","2"]},  // Pregnancy: 1 = Pregnant, 2 = Not Pregnant
    sev:    {test_type: 'inlist',       setup: ["A","B","C"]},  // Dehydratiation severity: A = Light, B = Moderate, C = Severe
    dur:    {test_type: 'integer',      setup: 'none'},     // Stay duration in days
    out:    {test_type: 'inlist',       setup: ["1","2","3","4"]}   // Outcome: 1 = Cured, 2 = Dead, 3 = Interrupted F/U, 4 = Transfered
*/

// Surveillance
//------------------------------------------------------------------------------------
//    disease:{test_type: 'inlist',       setup: g.medical_diseaseslist}, // Depends on data source
    fyo:{test_type: 'inlist',       setup: ["u","o"]}, // Depends on data source
    case: {test_type: 'integer',      setup: 'none'}, 
//  mcase:  {test_type: 'integer',      setup: 'none'},
//  fcase:  {test_type: 'integer',      setup: 'none'},
    death:{test_type: 'integer',      setup: 'none'}, 
//  mdeath: {test_type: 'integer',      setup: 'none'},
//  fdeath: {test_type: 'integer',      setup: 'none'},
};

// Outbreak
//------------------------------------------------------------------------------------
// g.medical_diseaseslist = ['Cholera']; // One disease (not empty)

// Surveillance
//------------------------------------------------------------------------------------
 g.medical_diseaseslist = []; // Complete list of disease surveilled or left empty to build the list from data



// Define here the list of fields that are expected to constitue a unique identifier of a record
g.datacheck_definition_record = [

// Outbreak
//------------------------------------------------------------------------------------
//    {key: 'PatientID', isnumber: false}, // 'true' key as in data file

// Surveillance
//------------------------------------------------------------------------------------
    {key: g.medical_headerlist.epiwk, isnumber: false}, // 'true' key as in data file
    {key: g.medical_headerlist.disease, isnumber: false}, // 'true' key as in data file
    {key: g.medical_headerlist.admN1, isnumber: false}, // 'true' key as in data file
    {key: g.medical_headerlist.admN2, isnumber: false}, // 'true' key as in data file
    {key: g.medical_headerlist.fyo, isnumber: false}, // 'true' key as in data file

];

// 3) Chart parameters
//------------------------------------------------------------------------------------

// List of charts to be generated:
g.viz_definition = {
/*    
    epiwk:  {   domain_type: 'custom_ordinal',  chart_type: 'bar',
                dimension_type: 'auto',         group_type: 'auto',
                display_axis:   {x:g.module_lang.text[g.module_lang.current].chart_epiwk_labelx,
                                 y:g.module_lang.text[g.module_lang.current].chart_epiwk_labely},
                display_colors: [4],            
                display_intro: 'top',
                buttons_list: ['reset','help'],
            },
*/
    multiadm: { domain_type: 'none',            chart_type: 'multiadm',

                dimension_type: 'custom',  

                group_type: 'custom',
                group_setup: ['case'],

                display_colors: [0,1,2,3,4,5],  
                display_intro: 'bottom',
                buttons_list: ['reset','help','expand','lockcolor','parameters'],
            },
    disease:  { domain_type: 'none',      chart_type: 'row',

                dimension_type: 'custom',   

                group_type: 'custom',
                group_setup: ['case'],

                display_axis:   {x:g.module_lang.text[g.module_lang.current].chart_disease_labelx,
                                 y:g.module_lang.text[g.module_lang.current].chart_disease_labely},
                display_colors: [2],            
                display_intro: 'right',
                buttons_list: ['help'],
            },

    // Bar charts        
    case_bar:  {   domain_type: 'custom_ordinal',   chart_type: 'stackedbar',

                dimension_type: 'shared',       
                dimension_setup: ['epiwk','auto','case'],

                group_type: 'custom',
                group_setup: ['case','fyo'],

                display_axis:   {x:g.module_lang.text[g.module_lang.current].chart_case_labelx,
                                 y:g.module_lang.text[g.module_lang.current].chart_case_labely},
                display_colors: [4,2],            
                display_intro: 'top',           display_idcontainer: 'container_casedeath_bar',
                buttons_list: ['reset','help'],
                sync_to: ['death_bar'],
            },
    death_bar:  {   domain_type: 'custom_ordinal',  chart_type: 'stackedbar',

                dimension_type: 'shared',
                dimension_setup: ['epiwk','auto','death'],

                group_type: 'custom',
                group_setup: ['death','fyo'],

                display_axis:   {x:g.module_lang.text[g.module_lang.current].chart_death_labelx,
                                 y:g.module_lang.text[g.module_lang.current].chart_death_labely},
                display_colors: [4,2],            
                display_intro: 'none',
                buttons_list: ['reset','help'],
                sync_to: ['case_bar'],
            },

    fyo:    {   domain_type: 'none',            chart_type: 'pie',
                
                dimension_type: 'custom',       
                group_setup: ['case'],

                group_type: 'auto',
                display_colors: [2,4],        
                display_intro: 'left',
                buttons_list: ['reset','help'],
            },

    // Line charts        
    case_lin:  {   domain_type: 'custom_linear',   chart_type: 'series',

                dimension_type: 'shared',       
                dimension_setup: ['epiwk_lin','custom','case'],

                group_type: 'auto',
                group_setup: ['case'],

                display_axis:   {x:g.module_lang.text[g.module_lang.current].chart_case_labelx,
                                 y:g.module_lang.text[g.module_lang.current].chart_case_labely},
                display_colors: [4,2],            
                display_intro: 'top',           display_idcontainer: 'container_casedeath_lin',
                buttons_list: ['help'],
                sync_to: ['death_lin'],
            },

    death_lin:  {   domain_type: 'custom_linear',  chart_type: 'series',

                dimension_type: 'shared',
                dimension_setup: ['epiwk_lin','custom','death'],

                group_type: 'auto',
                group_setup: ['death'],

                display_axis:   {x:g.module_lang.text[g.module_lang.current].chart_death_labelx,
                                 y:g.module_lang.text[g.module_lang.current].chart_death_labely},
                display_colors: [4,2],            
                display_intro: 'none',
                buttons_list: ['reset','help'],
                sync_to: ['case_lin'],
            },
    year:    {   domain_type: 'none',            chart_type: 'pie',
                
                dimension_type: 'custom',       
                group_setup: ['case'],

                group_type: 'auto',
                display_intro: 'left',
                buttons_list: ['reset','help'],
            },

/*
    age:    {   domain_type: 'custom_linear',   chart_type: 'bar',
                dimension_type: 'custom',       group_type: 'auto',
                display_axis:   {x:g.module_lang.text[g.module_lang.current].chart_age_labelx,
                                 y:g.module_lang.text[g.module_lang.current].chart_age_labely},
                display_colors: [4],            
                display_intro: 'top',
                buttons_list: ['reset','help'],
            },

    sexpreg:{   domain_type: 'none',            chart_type: 'pie',
                dimension_type: 'custom',       group_type: 'auto',
                display_colors: [4,2,1],        
                display_intro: 'left',
                buttons_list: ['reset','help'],
            },

    sev:    {   domain_type: 'none',            chart_type: 'pie',
                dimension_type: 'custom',       group_type: 'auto',
                display_colors: [1,2,4],        
                display_intro: 'left',
                buttons_list: ['reset','help'],
            },

    dur:    {   domain_type: 'custom_ordinal',  chart_type: 'bar',
                dimension_type: 'custom',       group_type: 'auto',
                display_axis:   {x:g.module_lang.text[g.module_lang.current].chart_dur_labelx,
                                 y:g.module_lang.text[g.module_lang.current].chart_dur_labely},
                display_colors: [4],            
                display_intro: 'left',
                buttons_list: ['reset','help'],
            },

    out:    {   domain_type: 'custom_ordinal',  chart_type: 'bar',
                dimension_type: 'custom',       group_type: 'auto',
                display_axis:   {x:g.module_lang.text[g.module_lang.current].chart_out_labelx,
                                 y:g.module_lang.text[g.module_lang.current].chart_out_labely},
                display_colors: [4],            
                display_intro: 'left',
                buttons_list: ['reset','help'],
            },
*/
    table:  {   domain_type: 'none',            chart_type: 'table',
                dimension_type: 'custom',       group_type: 'none',
                display_intro: 'top',
                buttons_list: ['help'],
            },
};

// Chart use to quick filter based on time
g.viz_timeline = 'case_bar';
g.viz_timeshare = ['death_bar'];

