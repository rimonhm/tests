/*------------------------------------------------------------------------------------

	MSF Dashboard - module-lang.js
	(c) Bruno Raimbault for MSF UK
	Please refer to the README.txt for complete licenses.
	
	Components:
	0) Setup
	1) French
	2) English
	3) Spanish - to be implemented

------------------------------------------------------------------------------------*/

// 0) Setup
//------------------------------------------------------------------------------------

modules_list.lang = true;

g.module_lang = {};
g.module_lang.current = 'eng';
g.module_lang.list = {
	'fra':'French',
	'eng':'English',
	'cas':'Castilian'
	};
g.module_lang.keylist = Object.keys(g.module_lang.list);
g.module_lang.text = {};

function module_lang_display() {
	
	var html = '<span>'+ g.module_lang.list[g.module_lang.current]+'</a> ';

	g.module_lang.keylist.forEach(function(lang){
		if(!(lang == g.module_lang.current)){
			html += '| <a id="lang_'+lang+'" class="link">'+g.module_lang.list[lang]+'</a> ';
		}
	});
	$('#langselect').html(html);

	g.module_lang.keylist.forEach(function(lang){
		if(!(lang == g.module_lang.current)){
			$('#lang_'+lang).on('click',function(){
			 	g.module_lang.current = lang;
				generate_display();
			});
		}
	});
}

//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
// Surveillance
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------


// 1) French
//------------------------------------------------------------------------------------
g.module_lang.text.fra = {
	main_description: 'VERSION PILOTE. Cette version prend en entrée des données de surveillance. Cet outil est dévelopé par la Manson Unit, MSF UK - <a href="mailto:gis.mansonunit@london.msf.org">gis.mansonunit@london.msf.org</a>.<br><i>Cliquez sur les graphiques pour filtrer les différentes dimensions de votre jeu de données. Consultez l\'aide pour plus de détails.',

	loadfiles_choose: 'CHOISISSEZ UN FICHIER A CHARGER',
	loadfiles_selected: ['Le fichier actuellement sélectionné contient','enregistrements.'],
	loadfiles_load: 'Charger le Dashboard',

	chart_disease_title: 'Pathologies',
	chart_disease_labelx: 'Nombre de Signalements',
	chart_disease_labely: 'Pathologies',
	chart_case_bar_title: 'Cas & Décès',
	chart_case_lin_title: 'Cas & Décès',
	chart_case_labelx: 'Semaine Epi',
	chart_case_labely: 'Cas',
	chart_death_labelx: 'Semaine Epi',
	chart_death_labely: 'Décès',
	chart_year_title: 'Années',
	chart_fyo_title: 'Classes d\'Ages',
	chart_fyo_labelu: 'Under 5',
	chart_fyo_labelo: 'Over 5',

	filtext: 'Filtre actuel :',
	
	map_title: 'Carte',
	map_legendNA: 'Absence de cas',
	map_legendEmpty: 'Absence de données',
	map_hover: 'Survolez pour afficher',
	map_unit: {
		Cases: 'Nombre de cas',
		Incidence: 'Taux d\'incidence (/10 000 personnes)',
		Completeness: 'Fréquence de transmission des données, en %'
	},
	jumpto: 'Aller...',
	map_admN1: {
		title: 'Chiefdom'
	},
	map_admN2: {
		title: 'PHU'
	},

	chartwarper_tab_containter_bar:'Par classe d\'age',
	chartwarper_tab_containter_lin:'Par année',
	
	colorscale_title: 'PARAMETRES DE LA CARTE',
	colorscale_unitintro: 'Unité de la carte : ',
	colorscale_modeintro: 'Choix des seuils : ',
	colorscale_modeauto: 'Automatique',
	colorscale_modepresets: 'Prédéfinis',
	colorscale_modemanual: 'Manuel',
	colorscale_howto: '',
	colorscale_choosetype: 'Mode de calcul : ',
	colorscale_choosecolor: 'Type d\'échelle : ',

	datacheck_title: 'RAPIDE VERIFICATION DES DONNEES',
	datacheck_intro: 'Veuillez trouver ci-dessous un bref <b>résumé des données manquantes ou erronées</b>.<br>Ceci peut donner une indication sur la nécéssité de reviser la qualité du jeu de données. Consultez le log des erreurs pour plus de détails.',
	datacheck_header: 'Entête',
	datacheck_error: 'Erreur',
	datacheck_empty: 'Vide',

	datacheck_more: 'Montrer le log des erreurs...',
	datacheck_less: 'Cacher le log des erreurs...',

	datacheck_emptmore: 'Montrer enrg. vides',
	datacheck_emptless: 'Cacher enrg. vides',

	datacheck_copy: 'Copier vers le presse-papier',

	datatable_more: 'Montrer la table de données...',
	datatable_less: 'Cacher la table données...',
	datatable_text: {
        button: 'Copier vers le presse-papier',
        language: {
            "sProcessing":     "Traitement en cours...",
            "sSearch":         "Rechercher&nbsp;:",
            "sLengthMenu":     "Afficher _MENU_ &eacute;l&eacute;ments",
            "sInfo":           "Affichage de l'&eacute;l&eacute;ment _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
            "sInfoEmpty":      "Affichage de l'&eacute;l&eacute;ment 0 &agrave; 0 sur 0 &eacute;l&eacute;ment",
            "sInfoFiltered":   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
            "sInfoPostFix":    "",
            "sLoadingRecords": "Chargement en cours...",
            "sZeroRecords":    "Aucun &eacute;l&eacute;ment &agrave; afficher",
            "sEmptyTable":     "Aucune donn&eacute;e disponible dans le tableau",
            "oPaginate": {
                "sFirst":      "Premier",
                "sPrevious":   "Pr&eacute;c&eacute;dent",
                "sNext":       "Suivant",
                "sLast":       "Dernier"
            },
            "oAria": {
                "sSortAscending":  ": activer pour trier la colonne par ordre croissant",
                "sSortDescending": ": activer pour trier la colonne par ordre d&eacute;croissant"
            }
        },
    },
	datatable_legend: 'FYO (Five Years Old): u = Under (< 5 ans), o = Over (> 5 ans)',

	interface_menutitle: 'MENU',
	interface_menuepiwk: 'Filtrer rapidement les \'n\' dernières semaines',
	interface_menureset: 'Réinitialiser',
	interface_menureload: 'Recharger',
	interface_menuhelp: 'Aide',
	interface_menuautoplay: {
    		play: 'Jouer',
    		pause: 'Pause'
	},
	interface_menucount: ['enregistrements sélectionés sur','','Chiffres clés :', 'Cas :','Décès :'],
	
	interface_colorscale: 'Retourner au Dashboard',

	intro_intro: '<p>Il est possible d\'interagir avec les données du Dashboard en cliquant sur les éléments des graphiques (régions, barres d\'un histogramme...).</p><p><b>1) Filtrer une dimension du jeu de données.</b><br>Chaque interaction filtre le jeu de données et affecte ainsi l\'ensemble des graphiques.</p><p><b>2) Combiner les filtres.</b><br>Il est par exemple possible de filtrer les cas de "telle" semaine ET dans "telle" région.</p><p><b>3) Retirer des filtres.</b><br>Les filtres peuvent être retirés un par un, réinitialisés pour un graphique (en cliquant sur le bouton "<span class="ft">↻</span>") ou pour l\'ensemble du dashboard en cliquant le bouton "Réinitialiser" du menu latéral.</p><p><b>4) Survoler les éléments des graphiques pour afficher les valeurs associées.</b></p><br><p>Cliquez sur "Next" ou appuyez sur la flèche droite de votre clavier pour parcourir les différents graphiques et leur spécificités ou revenez plus tard si nécessaire : soit en cliquant le bouton "Aide" du menu latéral, soit les boutons "?" pour consulter l\'aide spécifique à chaque graphique.</p>',

	intro_multiadm: 'Cette carte représente le nombre de cas ou le taux d\'incidence par aire géographique.<br><i>Cliquez sur la carte pour filtrer les données par aire. Il est possible de sélectionner plusieurs aires. Pour réinitialiser les filtres, cliquez sur les aires une par une ou cliquez sur le bouton "<span class="ft">↻</span>".<br>Cliquez sur les onglets pour naviguer entre les différents niveaux divisionels.<br>Vous pouvez vous rendre directement sur une aire spécifique en utilisant les listes de sélection "Aller...". (progressivement du niveau le plus élevé au niveau le plus bas).<br>Vous pouvez également parcourir la carte en utilisant les boutons de zoom ainsi que la souris.</i><br>Autres Boutons :<br> - "<span class="ft">⬙</span>" permet d\'ajuster l\'échelle de couleurs au jeu de données actuel (si le mode \'auto\' n\'est pas déjà activé),<br> - "<span class="ft">⚙</span>" permet d\'accéder à plus d\'options pour paramétrer la carte,<br> - "<span class="ft">◰</span>" permet d\'agrandir/réduire la carte.',

	intro_disease: 'Ce graphique en lignes indique les pathologies représentées.<br><i>Cliquez sur les barres pour sélectionner la pathologie désirée.<br>L\'axe horizontal représente le nombre de signalements ie. +1 par Région et par Semaine où au moins 1 cas de la pathologie a été signalé.</i>',

	intro_case_bar: 'Ces histogrammes représentent les nombres de cas et de décès par semaine épidémiologique (epi-week) et par classe d\'age (+/- de 5 ans).<br><i>Cliquez sur les barres pour filtrer les données d\'une période spécifique. Vous pouvez sélectionner plusieurs epi-weeks. Pour réinitialiser les filtres, cliquez sur les epi-weeks une par une ou cliquez sur le bouton "<span class="ft">↻</span>".</i>',

	intro_case_lin: 'Ces graphiques représentent les nombres de cas et de décès par semaine épidémiologique (epi-week) et par année.<br><i>Ces graphiques ne permettent pas de filtrer les données.</i>',

	intro_fyo: 'Ce diagramme circulaire représente le nombre de cas par classe d\'age (+ ou - de 5 ans).<br><i>Cliquez sur les sections du diagramme pour filtrer par classe d\'age. Pour réinitialiser les filtres, cliquez à nouveau sur les sections ou cliquez sur le bouton "<span class="ft">↻</span>".</i>',
	
	intro_year: 'Ce diagramme circulaire représente le nombre de cas par année.<br><i>Cliquez sur les sections du diagramme pour filtrer par année. Vous pouvez filtrer plusieurs années. Pour réinitialiser les filtres, cliquez à nouveau sur les sections ou cliquez sur le bouton "<span class="ft">↻</span>".</i>',

	intro_table: 'Ce tableau présente les entrées sélectionnées.<br><i>Cliquez sur le bouton "Copier vers le presse-papier" pour copier tout le contenu du tableau (afin d\'en exporter le contenu vers Excel par exemple).</i>',

};

// 2) English
//------------------------------------------------------------------------------------
g.module_lang.text.eng = {
	main_description: 'PILOT VERSION. This version uses surveillance data. This tool is developed by the MSF UK, Manson Unit - <a href="mailto:gis.mansonunit@london.msf.org">gis.mansonunit@london.msf.org</a>.<br><i>Click the charts to filter the various dimensions of your dataset. Refer to the help for more details.</i>',

	loadfiles_choose: 'CHOOSE A FILE TO LOAD',
	loadfiles_selected: ['The file currently selected counts','records.'],
	loadfiles_load: 'Load the Dashboard',

	chart_disease_title: 'Diseases',
	chart_disease_labelx: 'Times Reported',
	chart_disease_labely: 'Diseases',
	chart_case_bar_title: 'Cases & Deaths',
	chart_case_lin_title: 'Cases & Deaths',
	chart_case_labelx: 'Epi-Week',
	chart_case_labely: 'Cases',
	chart_death_labelx: 'Epi-Week',
	chart_death_labely: 'Deaths',
	chart_year_title: 'Years',
	chart_fyo_title: 'Age Classes',
	chart_fyo_labelu: 'Under 5',
	chart_fyo_labelo: 'Over 5',

	filtext: 'Current filter:',
	
	map_title: 'Map',
	map_legendNA: 'No cases',
	map_legendEmpty: 'No records',
	map_hover: 'Hover to display',
	map_unit: {
		Cases: 'Number of Cases',
		Incidence: 'Incidence Rate (/10,000 people)',
		Completeness: 'Frequency structures report, in %'
	},
	jumpto: 'Goto...',
	map_admN1: {
		title: 'Chiefdom'
	},
	map_admN2: {
		title: 'PHU'
	},

	chartwarper_tab_containter_bar:'By age class',
	chartwarper_tab_containter_lin:'By year',
	
	colorscale_title: 'MAP PARAMETERS',
	colorscale_unitintro: 'Choose map unit: ',
	colorscale_modeintro: 'Colorscale values: ',
	colorscale_modeauto: 'Automated',
	colorscale_modepresets: 'Presets',
	colorscale_modemanual: 'Manual',
	colorscale_howto: '',
	colorscale_choosetype: 'Calcul mode: ',
	colorscale_choosecolor: 'Scale type: ',

	datacheck_title: 'QUICK DATA CHECK',
	datacheck_intro: 'Here is a short <b>summary of missing or erroneous data</b>.<br>This might give an indication on whether further efforts should be put in data cleaning or not. Consult the errors log for more details.',
	datacheck_header: 'Header',
	datacheck_error: 'Error',
	datacheck_empty: 'Empty',

	datacheck_more: 'Show error log...',
	datacheck_less: 'Hide error log...',

	datacheck_emptmore: 'Show \'isempty\' errors',
	datacheck_emptless: 'Hide \'isempty\' errors',

	datacheck_copy: 'Copy to clipboard',

	datatable_more: 'Show records table...',
	datatable_less: 'Hide records table...',
	datatable_text: {
        button: 'Copy to clipboard',
        language: {
		    "sProcessing":     "Processing...",
		    "sSearch":         "Search:",
		    "sLengthMenu":     "Show _MENU_ entries",
		    "sInfo":           "Showing _START_ to _END_ of _TOTAL_ entries",
		    "sInfoEmpty":      "Showing 0 to 0 of 0 entries",
		    "sInfoFiltered":   "(filtered from _MAX_ total entries)",
		    "sInfoPostFix":    "",
		    "sInfoThousands":  ",",
		    "sLoadingRecords": "Loading...",
		    "sZeroRecords":    "No matching records found",
		    "sEmptyTable":     "No data available in table",
		    "oPaginate": {
		        "sFirst":    "First",
		        "sLast":     "Last",
		        "sNext":     "Next",
		        "sPrevious": "Previous"
		    },
		    "oAria": {
		        "sSortAscending":  ": activate to sort column ascending",
		        "sSortDescending": ": activate to sort column descending"
		    }
		},
    },
	datatable_legend: 'FYO (Five Years Old): u = Under (< 5 years old), o = Over (> 5 years old)',

	interface_menutitle: 'MENU',
	interface_menuepiwk: 'Quickly filter the \'n\' last weeks',
	interface_menureset: 'Reset All',
	interface_menureload: 'Reload',
	interface_menuhelp: 'Help',
	interface_menuautoplay: {
    		play: 'Play',
    		pause: 'Pause'
	},
	interface_menucount: ['out of','records selected','Key figures:', 'Cases:','Deaths:'],
	
	interface_colorscale: 'Go back to the Dashboard',

	intro_intro: '<p>You can interact with the Dashboard data by clicking the chart elements (areas, bars...).</p><p><b>1) Filter a dimension of the dataset.</b><br>Each interaction filters the dataset and therefore affects all charts.</p><p><b>2) Combine filters.</b><br>For instance you can filter cases of "this" week AND in "this" area.</p><p><b>3) Reset filters.</b><br>Filters can be reseted one by one, for a chart (by clicking on the "<span class="ft">↻</span>" button) or for the whole dashboard by clicking the "Reset All" button of the lateral menu.</p><p><b>4) Hover chart éléments to display associated values.</b></p><br><p>Click "Next" or press the right arrow key to browse the charts and learn about their specificities or come back later when necesary: either by clicking the "Help" button of the lateral menu, or the "?" buttons to consult each chart\'s specific help.</p>',

	intro_multiadm: 'This map displays number of cases or incidence rates at the chosen divisional level.<br><i>Click the map to filter data by area. You can select multiple areas. To unfilter areas, click selected areas one by one, or click the "<span class="ft">↻</span>" button to reset.<br>Click the tabs to navigate between divisional levels.<br>You can zoom directly to specific areas using the "Goto..." drop-down menus (progressively form highest to lowest levels).<br>You can also navigate the map using the zoom buttons and your mouse.</i><br>Other Buttons :<br> - click "<span class="ft">⬙</span>" to adjust colorscale limit values to the current dataset (if not already in \'auto\' mode),<br> - click "<span class="ft">⚙</span>" to access more map parameters,<br> - click "<span class="ft">◰</span>" enlarge/reduce the map.',

	intro_disease: 'This row chart displays represented diseases.<br><i>Click on the bars to display data for a chosen disease.<br>The horizontal axis displays the number of times a disease has been reported ie. +1 per Area and per Week where 1 or more cases of the disease have been reported.</i>',

	intro_case_bar: 'These bar charts display case and death numbers by epi-week and by age class (+/- 5 years old).<br><i>Click on the bars to filter by a specific epi-week. You can select multiple epi-weeks. To reset, click again on the selected epi-weeks (one by one) or click the "<span class="ft">↻</span>" button.</i>',

	intro_case_lin: 'These charts display case and death numbers by epi-week and by year.<br><i>These charts cannot be used to filter the dataset.</i>',

	intro_fyo: 'This pie chart displays case numbers by age class (+/- 5 years old).<br><i>Click on the pie slices to filter by a specific age class. To reset, click the selected pie slices one by one or click the "<span class="ft">↻</span>" button.</i>',
	
	intro_year: 'This pie chart displays case numbers by year.<br><i>Click on the pie slices to filter by a specific year. You can select multiple years. To reset, click the selected pie slices one by one or click the "<span class="ft">↻</span>" button.</i>',

	intro_table: 'This table displays the selected records.<br><i>Click on the "Copy to clipboard" button to copy the content of the whole table (in order to export to Excel for instance).</i>',
};

// 3) Castilian Spanish - Not translated yet
//------------------------------------------------------------------------------------
g.module_lang.text.cas = {
    main_description: 'VERSIÓN PILOTO. Esta versión utiliza datos de monitoreo. Esta herramienta esta desarrollada por la Manson Unit, MSF UK - <a href="mailto:gis.mansonunit@london.msf.org">gis.mansonunit@london.msf.org</a>.<br><i>Haga clic en los gráficos para filtrar las múltiples dimensiones de su conjunto de datos. Consulta la ayuda para mas detalles.</i>',

    loadfiles_choose: 'ESCOGE UN ARCHIVO PARA CARGAR',
    loadfiles_selected: ['El archivo seleccionado contiene','entradas.'],
    loadfiles_load: 'Cargar el Dashboard',

    chart_disease_title: 'Patología',
    chart_disease_labelx: 'Veces Señalada',
    chart_disease_labely: 'Patología',
    chart_case_bar_title: 'Casos & Fallecimientos',
    chart_case_lin_title: 'Casos & Fallecimientos',
    chart_case_labelx: 'Semana Epi',
    chart_case_labely: 'Casos',
    chart_death_labelx: 'Semana Epi',
    chart_death_labely: 'Fallecimientos',
    chart_year_title: 'Años',
    chart_fyo_title: 'Clases de Edad',
    chart_fyo_labelu: 'Under 5',
    chart_fyo_labelo: 'Over 5',

    filtext: 'Filtro actual:',
   
    map_title: 'Mapa',
    map_legendNA: 'Cero casos',
    map_legendEmpty: 'Cero entradas',
    map_hover: 'Mantenga el ratón sobre un área para mostrar',
    map_unit: {
        Cases: 'Numero de Casos',
        Incidence: 'Tasa de Incidencia (/10,000 personas)',
        Completeness: 'Frequencia estructuras transmiten datos, en %'
    },
    jumpto: 'Ir a...',
    map_admN1: {
        title: 'Chiefdom'
    },
    map_admN2: {
        title: 'PHU'
    },

    chartwarper_tab_containter_bar:'Por clase de edad',
    chartwarper_tab_containter_lin:'Por año',
   
    colorscale_title: 'PARÁMETROS DEL MAPA',
    colorscale_unitintro: 'Unidad del mapa: ',
    colorscale_modeintro: 'Limites de la escala: ',
    colorscale_modeauto: 'Automático',
    colorscale_modepresets: 'Predefinidos',
    colorscale_modemanual: 'Manual',
    colorscale_howto: '',
    colorscale_choosetype: 'Modo de calculo: ',
    colorscale_choosecolor: 'Tipo de escala: ',

    datacheck_title: 'VERIFICACIÓN RÁPIDA DE LOS DATOS',
    datacheck_intro: 'Aquí encontrara  un breve <b>resumen de los datos faltantes o erróneos</b>.<br>Eso puede dar una indicación sobre la necesidad de revisar la calidad del conjunto de datos. Consulta el log de errores para mas detalles.',
    datacheck_header: 'Header',
    datacheck_error: 'Error',
	datacheck_empty: 'Vacio',

    datacheck_more: 'Mostrar el log de errores...',
    datacheck_less: 'Esconder el log de errores...',

    datacheck_emptmore: 'Mostrar entr. vacías',
    datacheck_emptless: 'Esconder entr. vacías',

    datacheck_copy: 'Copiar al portapapeles',

    datatable_more: 'Mostrar la tabla de entradas...',
    datatable_less: 'Esconder la tabla de entradas...',
    datatable_text: {
        button: 'Copiar al portapapeles',
        language: {
            "sProcessing":     "Procesando...",
            "sSearch":         "Buscar:",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":     "Último",
                "sNext":     "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        }
    },
    datatable_legend: 'FYO (Five Years Old): u = Under (< 5 años), o = Over (> 5 años)',

    interface_menutitle: 'MENU',
    interface_menuepiwk: 'Filtrar rápidamente las \'n\' ultimas semanas',
    interface_menureset: 'Reiniciar',
    interface_menureload: 'Volver a cargar',
    interface_menuhelp: 'Ayuda',
    interface_menuautoplay: {
            play: 'Play',
            pause: 'Pause'
    },
    interface_menucount: ['entradas seleccionadas sobre','','Cifras claves:', 'Casos:','Fallecimientos:'],
   
    interface_colorscale: 'Volver al Dashboard',

    intro_intro: '<p>Puede interactuar con los datos del Dashboard seleccionando los elementos de los gráficos (áreas, bares...).</p><p><b>1) Filtrar una dimensión del conjunto de datos.</b><br>Cada interacción filtra el conjunto de datos y por lo tanto afecta todos los gráficos.</p><p><b>2) Combina los filtros.</b><br>Puede por ejemplo filtrar casos de "tal" semana Y en "tal" área.</p><p><b>3) Reiniciar filtros.</b><br>Los filtros se pueden reiniciar uno por uno, todos los de un grafico (haciendo clic en el botón "<span class="ft">↻</span>") o todos los del dashboard haciendo clic en el botón "Reiniciar" del menú lateral.</p><p><b>4) Pasa el ratón sobre los elementos de los gráficos para mostrar los valores asociados.</b></p><br><p>Haga clic en "Next" o pulse la flecha hacia la derecha para recorrer los gráficos y consultar sus especificidades o vuelva cuando lo necesites: haciendo clic en el botón de "Ayuda" del menú lateral, o en los botones "?" para consultar la ayuda especifica de cada gráfico.</p>',

    intro_multiadm: 'Este mapa muestra el numero de casos o la tasa de incidencia al nivel divisional elegido.<br><i>Haga clic en el mapa para filtrar datos por área. Puede seleccionar múltiples áreas. Para reiniciar los filtros, haga clic en los áreas seleccionados uno por uno, o haga clic sobre el botón "<span class="ft">↻</span>".<br>Haga clic en las pestañas para navegar entre los distintos niveles de división geográfica.<br>Puede enfocar el mapa directamente sobre áreas especificas utilizando los menús "Ir a..." (progresivamente desde el nivel mas alto hacia el mas bajo).<br>Puede también recorrer el mapa utilizando los botones +/- y el ratón.</i><br>Otros Botones :<br> - haga clic en el botón "<span class="ft">⬙</span>" para ajustar los valores limites de la escala de color al conjunto de datos actualmente seleccionado (si no esta ya en modo \'auto\'),<br> - haga clic en el botón "<span class="ft">⚙</span>" para acceder a mas parámetros,<br> - haga clic en el botón "<span class="ft">◰</span>" para ensanchar/reducir el mapa.',

    intro_disease: 'Este gráfico en filas muestra las patologías representadas.<br><i>Haga clic en las filas para mostrarlos datos de una patología especifica.<br>El eje horizontal muestra el numero de veces que una patología haya sido señalada ie. +1 por Area y por Semana donde 1 o mas casos de la patología han sido señalados.</i>',

    intro_case_bar: 'Estos gráficos de barras muestran números de casos y fallecimientos por semana epidemiologica (epi-week) y por clase de edad (+/- 5 años).<br><i>Haga clic en las barras par filtrar por una epi-week especifica. Puede seleccionar múltiples epi-weeks. Para reiniciar los filtros, haga clic otra vez sobre las epi-weeks seleccionadas (una por una) o haga clic en el botón "<span class="ft">↻</span>".</i>',

    intro_case_lin: 'Estos gráficos muestran números de casos y fallecimientos por semana y por años.<br><i>Estos gráficos no pueden ser usados para filtrar el conjunto de datos.</i>',

	intro_fyo: 'Este gráfico circular muestra el numero de casos por clase de edad (+/- 5 años).<br><i>Haga clic en los sectores para filtrar por una clase de edad especifica. Para reiniciar los filtros, haga clic en los sectores seleccionados uno por uno o haga clic en el botón "<span class="ft">↻</span>".</i>',

    intro_year: 'Este gráfico circular muestra el numero de casos por año.<br><i>Haga clic en los sectores para filtrar por una clase de edad especifica. Para reiniciar los filtros, haga clic en los sectores seleccionados uno por uno o haga clic en el botón "<span class="ft">↻</span>".</i>',

    intro_table: 'Esta tabla muestra las entradas seleccionadas.<br><i>Haga clic en el botón "Copiar en el portapapeles" para copiar el contenido de toda la tabla (para exportar a Excel por ejemplo).</i>'
};

/*

//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
// Outbreak
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------


// 1) French
//------------------------------------------------------------------------------------
g.module_lang.text.fra = {
	main_description: 'VERSION DE DEMONSTRATION. Cette version du Dashboard MSF prend en entrée des données de surveillance. Si vous rencontrez des problèmes lors de l\'utilisation de cet outil, que vous souhaitez poser des questions ou faire des retours, n\'hésitez pas à contacter : Manson Unit, MSF UK via <a href="mailto:gis.mansonunit@london.msf.org">gis.mansonunit@london.msf.org</a>.',

	loadfiles_choose: 'Choisissez un fichier à charger',
	loadfiles_selected: ['Le fichier actuellement sélectionné contient','enregistrements.'],
	loadfiles_load: 'Charger le Dashboard',

	chart_epiwk_title: 'Semaine Epidémiologique',
	chart_epiwk_labelx: 'Semaine Epi',
	chart_epiwk_labely: 'Cas',
	chart_sexpreg_title: 'Sexe - Grossesses',
	chart_sexpreg_label12: 'Homme',
	chart_sexpreg_label22: 'Femme, non Enc.',
	chart_sexpreg_label21: 'Femme, Enc.',
	chart_sev_title: 'Déshydratation',
	chart_sev_labelA: 'Faible',
	chart_sev_labelB: 'Modérée',
	chart_sev_labelC: 'Sévère',
	chart_dur_title: 'Durée du séjour',
	chart_dur_labelx: 'Durée du séjour',
	chart_dur_labely: 'Cas',
	chart_age_title: 'Age',
	chart_age_labelx: 'Age',
	chart_age_labely: 'Cas',
	chart_out_title: 'Issue',
	chart_out_labelx: 'Issue',
	chart_out_labely: 'Cas',
	chart_out_label1: 'Soigné',
	chart_out_label2: 'Décès',
	chart_out_label3: 'Suivi Int.',
	chart_out_label4: 'Transféré',

	chart_disease_title: 'Pathologies',
	chart_disease_labelx: 'Nombre de Signalements',
	chart_disease_labely: 'Pathologies',
	chart_case_title: 'Cas & Décès',
	chart_case_labelx: 'Semaine Epi',
	chart_case_labely: 'Cas',
	chart_death_labelx: 'Semaine Epi',
	chart_death_labely: 'Décès',
	chart_fyo_title: 'Classes d\'Ages    &nbsp;',
	chart_fyo_labelu: 'Under 5',
	chart_fyo_labelo: 'Over 5',

	filtext: 'Filtre actuel :',
	
	map_title: 'Carte',
	map_legendNA: 'Absence de cas',
	map_legendEmpty: 'Absence de données',
	map_hover: 'Survolez pour afficher',
	map_unit: {
		Cases: 'Nombre de cas',
		Incidence: 'Taux d\'incidence (/10 000 personnes)'
	},
	jumpto: 'Aller...',
	map_admN1: {
		title: 'Chiefdom'
	},
	map_admN2: {
		title: 'Health Zone'
	},
	
	colorscale_title: 'PARAMETRES DE LA CARTE',
	colorscale_unitintro: 'Unité de la carte :',
	colorscale_modeintro: 'Choix des seuils :',
	colorscale_modeauto: 'Automatique',
	colorscale_modepresets: 'Prédéfinis',
	colorscale_modemanual: 'Manuel',
	colorscale_howto: '',
	colorscale_alert: 'Révisez votre échelle, soit :\n - Les valeurs ne sont pas bien ordonnées (val1>val2 , val2>val3...) \n- Certaines valeurs sont vides \n Et essayez de charger la dashboard à nouveau.',
	colorscale_choosetype: 'Mode de calcul : ',
	colorscale_choosecolor: 'Type d\'échelle : ',

	datacheck_more: 'Montrer le log des erreurs...',
	datacheck_less: 'Cacher le log des erreurs...',
	datacheck_title: 'RAPIDE VERIFICATION DES DONNEES',
	datacheck_intro: 'Veuillez trouver ci-dessous un bref <b>résumé des données manquantes</b> ou ne correspondant pas aux catégories attendues.<br> Ceci peut donner une indication sur la nécéssité de reviser la qualité du jeu de données.',
	datacheck_header: 'Entête',
	datacheck_error: 'Erreur',
	datacheck_copy: 'Tout selectionner',

	datatable_more: 'Montrer les données...',
	datatable_less: 'Cacher les données...',
	datatable_text: {
        button: 'Copier vers le presse-papier',
        language: {
            "sProcessing":     "Traitement en cours...",
            "sSearch":         "Rechercher&nbsp;:",
            "sLengthMenu":     "Afficher _MENU_ &eacute;l&eacute;ments",
            "sInfo":           "Affichage de l'&eacute;l&eacute;ment _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
            "sInfoEmpty":      "Affichage de l'&eacute;l&eacute;ment 0 &agrave; 0 sur 0 &eacute;l&eacute;ment",
            "sInfoFiltered":   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
            "sInfoPostFix":    "",
            "sLoadingRecords": "Chargement en cours...",
            "sZeroRecords":    "Aucun &eacute;l&eacute;ment &agrave; afficher",
            "sEmptyTable":     "Aucune donn&eacute;e disponible dans le tableau",
            "oPaginate": {
                "sFirst":      "Premier",
                "sPrevious":   "Pr&eacute;c&eacute;dent",
                "sNext":       "Suivant",
                "sLast":       "Dernier"
            },
            "oAria": {
                "sSortAscending":  ": activer pour trier la colonne par ordre croissant",
                "sSortDescending": ": activer pour trier la colonne par ordre d&eacute;croissant"
            }
        },
    },
	datatable_legend: 'Sexe : 1 = Homme, 2 = Femme | Grossesse : 1 = Enceinte, 2 = Non Enceinte | Déshydratation : A = Légère, B = Modérée, C = Sévère | Issue : 1 = Soigné, 2 = Décès, 3 = Suivi Interrompu, 4 = Transferé',

	interface_menutitle: 'MENU',
	interface_menuepiwk: 'Filtrer rapidement les \'n\' dernières semaines',
	interface_menureset: 'Réinitialiser',
	interface_menureload: 'Recharger',
	interface_menuhelp: 'Aide',
	interface_menuautoplay: {
    		play: 'Jouer',
    		pause: 'Pause'
	},
	interface_menucount: ['enregistrements sélectionés sur',''],
	interface_colorscale: 'Retourner au Dashboard',

	intro_intro: '<p>Il est possible d\'interagir avec les différents \'éléments\' du tableau de bord en les sélectionnant et désélectionnant.</p><p>Ici sont présentés les principales interactions avec le tableau de bord :</p><p><b>1) Filtrer par <i>\'élément\'</i>.</b><br>Chaque interaction affecte l\'ensemble des graphiques, cartes et le tableau.</p><p><b>2) Sélection d\'\'éléments\' multiples.</b><br>Cela vous permet de combiner les filtres, par exemple : un quartier sur la carte et un genre.</p><p><b>3) Désélectionner des \'éléments\', retirer des filtres.</b><br>Les \'éléments\' peuvent être désélectionnés un par un (réinitialisant les filtres associés) ou en cliquant sur le bouton "R", c\'est l\'ensemble des filtres affectant un graphique ou les cartes qui seront réinitialisés. Il est également possible de réinitialiser l\'ensemble des filtres affectant le tableau de bord en cliquant le bouton "Réinitialiser" du menu à gauche.</p><p><b>4) Survoler des \'éléments\' pour afficher les valeurs associées.</b></p><p>Survolez des \'éléments\' avec la souris pour afficher les valeurs associées.</p><p>Cliquez sur "Next" ou appuyez sur la flèche droite de votre clavier pour parcourir les différents graphiques, cartes et le tableau.</p>',

	intro_multiadm: 'Cette carte de type choroplèthe présente le nombre de cas ou le taux d\'incidence (selon l\'option sélectionnée au moment du chargement des données) par unité administrative (Commune - Adm7, Quartier - Adm8 ou Cellule - Adm9).<br><i>Cliquez sur la carte pour filtrer les données par division administrative. Il est possible de sélectionner plusieurs zones. Pour réinitialiser les filtres, cliquez sur les divisions administratives une par une ou cliquez sur le bouton "R".<br>Cliquez sur les onglets pour naviguer entre les différents niveaux administratifs. Si vous passez à un niveau administratif supérieur (par exemple de Cellules à Communes), les filtres appliqués aux niveaux administratifs inférieurs seront réinitialisés (dans notre cas de figure, les filtres appliqués aux Cellules et Communes seront tous deux réinitialisés).<br>Vous pouvez zoomer directement sur une unité administrative spécifique en utilisant les listes de sélection "Goto...". Les unités administratives doivent impérativement être sélectionnées du niveau administratif le plus élevé au niveau administratif le plus bas (Commune > Quartier > Cellule).<br>Vous pouvez également parcourir la carte en utilisant les boutons de zoom ainsi que la souris.</i>',

	intro_epiwk: 'Cet histogramme présente le nombre de cas par semaine épidémiologique (epi-week).<br><i>Cliquez sur les barres pour filtrer les données d\'une période spécifique. Vous pouvez sélectionner plusieurs epi-weeks. Pour réinitialiser les filtres, cliquez sur les epi-weeks une par une ou cliquez sur le bouton "R".</i>',

	intro_age: 'Cet histogramme présente le nombre de cas par âge.<br><i>Cliquez et glissez pour filtrer les données d\'une classe d’âge spécifique. Pour réinitialiser le filtre, cliquez hors de la classe d’âge sélectionnée ou cliquez sur le bouton "R".</i>',

	intro_sexpreg: 'Ce camembert présente le nombre de cas par sexe et pour les femmes, si elles sont enceintes ou non.<br><i>Cliquez sur les parts du camembert pour filtrer par sexe / grossesse pour les femmes. Vous pouvez filtrer plusieurs valeurs. Pour réinitialiser les filtres, cliquez à nouveau sur les parts du camembert ou cliquez sur le bouton "R".</i>',

	intro_sev: 'Ce camembert présente le nombre de cas par état de déshydratation.<br><i>Cliquez sur les parts du camembert pour filtrer par état de déshydratation. Vous pouvez filtrer plusieurs états de déshydratation. Pour réinitialiser les filtres, cliquez à nouveau sur les parts du camembert ou cliquez sur le bouton "R".</i>',

	intro_dur: 'Cet histogramme présente le nombre de cas par durée de séjour.<br><i>Cliquez sur les barres pour filtrer les données d\'une durée spécifique. Vous pouvez sélectionner plusieurs durées. Pour réinitialiser les filtres, cliquez sur les catégories une par une ou cliquez sur le bouton "R".</i>',

	intro_out: 'Cet histogramme présente le nombre de cas par issue du traitement.<br><i>Cliquez sur les barres pour filtrer les données d\'une catégorie d\'issue spécifique. Vous pouvez sélectionner plusieurs catégories. Pour réinitialiser les filtres, cliquez sur les catégories une par une ou cliquez sur le bouton "R".</i>',

	intro_table: 'Ce tableau présente les entrées sélectionnées.<br><i>Cliquez sur le bouton "Copier vers le presse-papier" pour copier tout le contenu du tableau (afin d\'en exporter le contenu vers Excel par exemple).</i>',

};

// 2) English - Not translated yet
//------------------------------------------------------------------------------------
g.module_lang.text.eng = {
	main_description: 'DEMO VERSION. This version of Dashboard MSF uses surveillance data.<br><br><u>Road map for next versions:</u><br>- Implement Incidence rate (when population data is available)<br>- Add quick automated narrative of last week<br>- Export charts/maps to *.png<br><br>If you have any issues with the tool or would like to provide feedback or ask questions, please contact the MSF UK Manson Unit at <a href="mailto:gis.mansonunit@london.msf.org">gis.mansonunit@london.msf.org</a>. Thank you!<br><br>',

	loadfiles_choose: 'Choose a file to load',
	loadfiles_selected: ['The file currently selected counts','records.'],
	loadfiles_load: 'Load the Dashboard',

	chart_epiwk_title: 'Epidemiological Week',
	chart_epiwk_labelx: 'Epi Week',
	chart_epiwk_labely: 'Cases',
	chart_sexpreg_title: 'Sex - Pregnancy',
	chart_sexpreg_label12: 'Male',
	chart_sexpreg_label22: 'Female, non Preg.',
	chart_sexpreg_label21: 'Female, Preg.',
	chart_sev_title: 'Dehydration',
	chart_sev_labelA: 'Light',
	chart_sev_labelB: 'Moderate',
	chart_sev_labelC: 'Severe', 
	chart_dur_title: 'Stay Duration',
	chart_dur_labelx: 'Stay Duration',
	chart_dur_labely: 'Cases',
	chart_age_title: 'Age',
	chart_age_labelx: 'Age',
	chart_age_labely: 'Cases',
	chart_out_title: 'Outcome',
	chart_out_labelx: 'Outcome',
	chart_out_label1: 'Cured', 
	chart_out_label2: 'Death',
	chart_out_label3: 'Int. F/U',
	chart_out_label4: 'Transf.',
	chart_out_labely: 'Cases',

	chart_disease_title: 'Diseases',
	chart_disease_labelx: 'Times Reported',
	chart_disease_labely: 'Diseases',
	chart_case_bar_title: 'Cases & Deaths',
	chart_case_lin_title: 'Cases & Deaths',
	chart_case_labelx: 'Epi-Week',
	chart_case_labely: 'Cases',
	chart_death_labelx: 'Epi-Week',
	chart_death_labely: 'Deaths',
	chart_year_title: 'Years',
	chart_fyo_title: 'Age Classes',
	chart_fyo_labelu: 'Under 5',
	chart_fyo_labelo: 'Over 5',

	filtext: 'Current filter:',
	
	map_title: 'Map',
	map_legendNA: 'No cases',
	map_legendEmpty: 'No records',
	map_hover: 'Hover to display',
	map_unit: {
		Cases: 'Number of Cases',
		Incidence: 'Incidence Rate (/10,000 people)'
	},
	jumpto: 'Goto...',
	map_admN1: {
		title: 'Chiefdom'
	},
	map_admN2: {
		title: 'Health Zone'
	},

	chartwarper_tab_containter_bar:'By age class',
	chartwarper_tab_containter_lin:'By year',
	
	colorscale_title: 'MAP PARAMETERS',
	colorscale_unitintro: 'Choose map unit:',
	colorscale_modeintro: 'Colorscales:',
	colorscale_modeauto: 'Automated',
	colorscale_modepresets: 'Presets',
	colorscale_modemanual: 'Manual',
	colorscale_howto: '',
	colorscale_alert: 'Consider reviwing your scale, either:\n - Values are not well sorted (val1>val2 , val2>val3...) \n- NaNs are left\n And try load the dashboard again.',
	colorscale_choosetype: 'Calcul mode: ',
	colorscale_choosecolor: 'Scale type: ',

	datacheck_more: 'Show error log...',
	datacheck_less: 'Hide error log...',
	datacheck_title: 'QUICK DATA CHECK',
	datacheck_intro: 'Here is a short <b>summary of records missing</b> or not falling in the expected categories.<br> This might give an indication on whether further efforts should be put in data cleaning or not.',
	datacheck_header: 'Header',
	datacheck_error: 'Error',
	datacheck_copy: 'Copy to clipboard',
	datacheck_emptmore: 'Show \'isempty\' errors',
	datacheck_emptless: 'Hide \'isempty\' errors',
	datacheck_key: '',

	datatable_more: 'Show records...',
	datatable_less: 'Hide records...',
	datatable_text: {
        button: 'Copy to clipboard',
        language: {
		    "sProcessing":     "Processing...",
		    "sSearch":         "Search:",
		    "sLengthMenu":     "Show _MENU_ entries",
		    "sInfo":           "Showing _START_ to _END_ of _TOTAL_ entries",
		    "sInfoEmpty":      "Showing 0 to 0 of 0 entries",
		    "sInfoFiltered":   "(filtered from _MAX_ total entries)",
		    "sInfoPostFix":    "",
		    "sInfoThousands":  ",",
		    "sLoadingRecords": "Loading...",
		    "sZeroRecords":    "No matching records found",
		    "sEmptyTable":     "No data available in table",
		    "oPaginate": {
		        "sFirst":    "First",
		        "sLast":     "Last",
		        "sNext":     "Next",
		        "sPrevious": "Previous"
		    },
		    "oAria": {
		        "sSortAscending":  ": activate to sort column ascending",
		        "sSortDescending": ": activate to sort column descending"
		    }
		},
    },
	datatable_legend: 'FYO (Five Years Old): u = Under, o = Over',//Sex : 1 = Male, 2 = Female | Pregnancy : 1 = Yes, 2 = No | Dehydration : A = Light, B = Moderate, C = Severe | Outcome : 1 = Cured, 2 = Death, 3 = Interrupted follow-up, 4 = Transfered',

	interface_menutitle: 'MENU',
	interface_menuepiwk: 'Quickly filter the \'n\' last weeks',
	interface_menureset: 'Reset',
	interface_menureload: 'Reload',
	interface_menuhelp: 'Help',
	interface_menuautoplay: {
    		play: 'Play',
    		pause: 'Pause'
	},
	interface_menucount: ['out of','records selected'],
	
	interface_colorscale: 'Go back to the Dashboard',

	intro_intro: '<p>Elements are the features of the dashboard you can click. You will notice you can interact with different elements by selecting and deselecting.The following are the typical ways in which you can interact with the dashboard elements:</p><p><b>1) Filtering by elements.</b><br>This affects all the other graphs, maps and table.</p><p><b>2) Selecting multiple elements.</b><br>This allows you to combine filters eg. by area on the map and gender.</p><p><b>3) Deselecting elements and remove filters.</b><br>Elements can be unfiltered one by one or by using the "R" button to clear filters applying to one chart. Alternatively, click "Reset All" on the left handside to remove all filters.</p><p><b>4) Hovering over elements to display values.</b></p><p>Hover the mouse over individual elements to view specific values.</p><p>Click "Next" or press the right arrow to view the details of each graph.</p>',

	intro_multiadm: 'This choropleth map displays number of cases or incidence rates (according to the option you selected on the dataload screen) at the chosen administrative level (Commune - Adm7, Quartier - Adm8 or Cellule - Adm9).<br><i>Click the map to filter data by area. You can select multiple areas. To unfilter areas, click selected areas one by one, or click the "R" button to reset.<br>Click the tabs to navigate between administrative levels. If you swich to a higher administrative level (eg. Cellules to Communes), your filters applying to the lower administrative levels will be reset (in this case, both filters applying to Cellules and Quartiers will be reset).<br>You can zoom directly to specific areas using the "Goto.." drop-down menus. First, select the Commune, then the Quartier and, finally, the Cellule.<br>You can also navigate the map using the zoom buttons and your mouse.</i>',
	
	intro_epiwk: 'This bar chart displays case numbers by epi-week.<br><i>Click on the bars to filter by a specific epi-week. You can select multiple epi-weeks. To reset, click again on the selected epi-weeks (one by one) or click the "R" button.</i>',

	intro_age: 'This bar chart displays case numbers by age.<br><i>Click and drag to filter by an age range. To reset, click on the bar chart outside of the selected range or click the "R" button.</i>',

	intro_sexpreg: 'This pie chart displays case numbers by sex and for women, by pregnancy.<br><i>Click on the pie slices to filter by a specific sex / pregnancy "status". To reset, click the selected pie slices or click the "R" button.</i>',

	intro_sev: 'This pie chart displays case numbers by dehydration state.<br><i>Click on the pie slices to filter by a specific dehydration state. You can select multiple dehydration states. To reset, click the selected pie slices one by one or click the "R" button.</i>',

	intro_dur: 'This bar chart displays case numbers by duration of stay.<br><i>Click on the bars to filter by a specific stay duration. You can select multiple stay durations. To reset, click the selected durations one by one or click the "R" button.</i>',

	intro_out: 'This bar chart displays case numbers by outcome.<br><i>Click on the bars to filter by a specific outcome. You can select multiple outcomes. To reset, click the selected outcomes one by one or click the "R" button.</i>',

	intro_table: 'This table displays the selected records.<br><i>Click on the "Copy to clipboard" button to copy the content of the whole table (in order to export to Excel for instance).</i>',
};

*/