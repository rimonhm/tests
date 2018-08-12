/*------------------------------------------------------------------------------------
	MSF Dashboard - README_eng.txt
	(c) Bruno Raimbault for MSF UK - 2015-2016
	Version 1.5 Multilingual
------------------------------------------------------------------------------------*/

Date : 
18/04/2016

General Informations: 
/*------------------------------------------------------------------------------------

This Dashboard is being developed as part of MSF UK, Manson Unit activities by Bruno 
Raimbault : raimbault.bruno@gmail.com. It is currently in 'PILOT' phase, for its
'Surveillance' version Tonkolili district, Sierra Leone.
The Dashboard evaluation is planned for the months of May and June 2016. Its deployment
in other contextes is not supported by MSF UK at this date.
For any question or feedback, thank you for contacting the Manson Unit : 
gis.mansonunit@london.msf.org. 

The comlete dependency list (as well as their licenses) is available in the file: 
	program > lib > licenses.txt
Many thanks to their respective authors for their work.

This Dashboard is being released under MIT license:

*------------------------------------------------------------------------------------*

   Copyright (c) 2015-2016 Bruno Raimbault for MSF UK

   Permission is hereby granted, free of charge, to any person obtaining a copy of 
   this software and associated documentation files (the "Software"), to deal in th
   e Software without restriction, including without limitation the rights to use, 
   copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the 
   Software, and to permit persons to whom the Software is furnished to do so, subj
   ect to the following conditions:

   The above copyright notice and this permission notice shall be included in all c
   opies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLI
   ED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR 
   A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYR
   IGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN 
   ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WIT
   H THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*------------------------------------------------------------------------------------*


Description:
/*------------------------------------------------------------------------------------

This tool uses IDSR data from Tonkolili, Sierra Leone compliled with the'Data Manager'
tool, developed as well by the MSF UK, Manson Unit. These medical data are combines 
geographical and demographical data.
The tools permits to query and visualaise interactively the database by location, time
periode or any other available indicator. 


Disclaimer:
/*------------------------------------------------------------------------------------

The datasets given with the Dashboard are only for demonstration purposes: they are
not actual data and they do not have any political signification. Borders and place
names on the maps does not imply any opinion form MSF either.

Data sources are the following:
- Basemap, from OSM (in particular the Missing Maps projet)
- Administrative divisions(01/2016), from local authorities if available
- Demographic data (01/2016), from local authorities if available
- Medical data, made up for demonstration purposes


Credits:
/*------------------------------------------------------------------------------------

- Projet Team:
Idriss Ait-Bouziad - MSF UK
Bruno Raimbault - Consultant for MSF UK

- Reviewers:
Simon B Johnson	- BRC
Pete Masters - MSF UK
MSF OCA team in Lubumbashi, DRC
MSF OCA team in Tonkolili, SRE
Manson Unit, MSF UK

- Funding:
Médecins Sans Frontières UK
British Red Cross


History:
/*------------------------------------------------------------------------------------

Version 1.5
- Repackaging.
- Visualisation par année.
- Ajout datacheck log.
- Ajout map parameters.
- Ajout Complétion et Incidence.
- Gestion dynamique des échelles de couleur pour la carte.
- Correction de bugs mineurs.

Version 1.2
- Visualisation par classes d'ages.
- Support de divisions géographiques 'en cascade'.
- Correction de bugs mineurs.

Version 1.1

- Reprogrammation pour réponder à une vision plus modulaire et plus flexible.
- Ajout du support multilingue.
- Correction de bugs mineurs.

Version 1.0

Première version stable.
