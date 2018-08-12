/*------------------------------------------------------------------------------------
	MSF Dashboard - README_fra.txt
	(c) Bruno Raimbault for MSF UK - 2015-2016
	Version 1.5 Multilingue
------------------------------------------------------------------------------------*/

Date : 
18/04/2016

Informations générales : 
/*------------------------------------------------------------------------------------

Ce Dashboard est développée dans le cadre des activités de la Manson Unit à MSF UK
par Bruno Raimbault : raimbault.bruno@gmail.com. Il est actuellement en phase 'PILOTE',
pour sa version 'Surveillance' dans le district de Tonkolili en Sierra Leone.
L'évaluation du Dashboard est planifiée au cours des mois de Mai et Juin 2016. Son
déploiement dans d'autres contextes n'est pas suporté par MSF UK à cette date.
Pour toute question ou retour, merci de contacter la Manson Unit : 
gis.mansonunit@london.msf.org. 

La liste complète des dépendences (ainsi que leur licenses) est disponible dans le 
fichier :	program > lib > licenses.txt
Un grand merci à leurs différents auteurs pour leur travail.

Ce Dashboard est distribuée sous license MIT :

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


Description :
/*------------------------------------------------------------------------------------

Cet outil utilise les données IDSR de Tonkolili, Sierra Leone compliées avec l'outil
'Data Manager' également développé par la Manson Unit à MSF UK. Ces donnée medicales 
sont combinées avec des données géographiques et démographiques.
L'outil permet d'interroger et de visualiser la base de données de manière interactive
par localisation, période ou tout autre indicateur disponible. 


Disclaimer :
/*------------------------------------------------------------------------------------

Les jeux de données fournis avec le Dashboard le sont exclusivement dans un but de 
démonstration : il ne s'agit pas de jeux de données réels et ils n'ont aucune
signification politique. Les frontières et noms de lieux représentés sur les cartes 
n'impliquent opinion de la part de MSF.

Les sources de données utilisées sont les suivantes :
- La carte de base, fournie par OSM (en particulier le projet Missing Maps)
- Les divisions administratives (01/2016), fournies par les autorités compétentes si disponibles
- Les données démographiques (01/2016), fournies par les autorités compétentes si disponibles
- Les données médicales, fabriquées de toute pièce pour la démonstration


Crédits :
/*------------------------------------------------------------------------------------

- L'équipe du projet :
Idriss Ait-Bouziad - MSF UK
Bruno Raimbault - Consultant pour MSF UK

- Pour les révisions :
Simon B Johnson	- BRC
Pete Masters - MSF UK
L'équipe MSF OCA à Lubumbashi, DRC
L'équipe MSF OCA à Tonkolili, SRE
La Manson Unit, MSF UK

- Pour le soutien financier :
Médecins Sans Frontières UK
British Red Cross


Historique :
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
