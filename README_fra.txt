/*------------------------------------------------------------------------------------
	MSF Dashboard - README_fra.txt
	(c) Bruno Raimbault for MSF UK - 2015-2016
	Version 1.5 Multilingue
------------------------------------------------------------------------------------*/

Date : 
18/04/2016

Informations g�n�rales : 
/*------------------------------------------------------------------------------------

Ce Dashboard est d�velopp�e dans le cadre des activit�s de la Manson Unit � MSF UK
par Bruno Raimbault : raimbault.bruno@gmail.com. Il est actuellement en phase 'PILOTE',
pour sa version 'Surveillance' dans le district de Tonkolili en Sierra Leone.
L'�valuation du Dashboard est planifi�e au cours des mois de Mai et Juin 2016. Son
d�ploiement dans d'autres contextes n'est pas suport� par MSF UK � cette date.
Pour toute question ou retour, merci de contacter la Manson Unit : 
gis.mansonunit@london.msf.org. 

La liste compl�te des d�pendences (ainsi que leur licenses) est disponible dans le 
fichier :	program > lib > licenses.txt
Un grand merci � leurs diff�rents auteurs pour leur travail.

Ce Dashboard est distribu�e sous license MIT :

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

Cet outil utilise les donn�es IDSR de Tonkolili, Sierra Leone compli�es avec l'outil
'Data Manager' �galement d�velopp� par la Manson Unit � MSF UK. Ces donn�e medicales 
sont combin�es avec des donn�es g�ographiques et d�mographiques.
L'outil permet d'interroger et de visualiser la base de donn�es de mani�re interactive
par localisation, p�riode ou tout autre indicateur disponible. 


Disclaimer :
/*------------------------------------------------------------------------------------

Les jeux de donn�es fournis avec le Dashboard le sont exclusivement dans un but de 
d�monstration : il ne s'agit pas de jeux de donn�es r�els et ils n'ont aucune
signification politique. Les fronti�res et noms de lieux repr�sent�s sur les cartes 
n'impliquent opinion de la part de MSF.

Les sources de donn�es utilis�es sont les suivantes :
- La carte de base, fournie par OSM (en particulier le projet Missing Maps)
- Les divisions administratives (01/2016), fournies par les autorit�s comp�tentes si disponibles
- Les donn�es d�mographiques (01/2016), fournies par les autorit�s comp�tentes si disponibles
- Les donn�es m�dicales, fabriqu�es de toute pi�ce pour la d�monstration


Cr�dits :
/*------------------------------------------------------------------------------------

- L'�quipe du projet :
Idriss Ait-Bouziad - MSF UK
Bruno Raimbault - Consultant pour MSF UK

- Pour les r�visions :
Simon B Johnson	- BRC
Pete Masters - MSF UK
L'�quipe MSF OCA � Lubumbashi, DRC
L'�quipe MSF OCA � Tonkolili, SRE
La Manson Unit, MSF UK

- Pour le soutien financier :
M�decins Sans Fronti�res UK
British Red Cross


Historique :
/*------------------------------------------------------------------------------------

Version 1.5
- Repackaging.
- Visualisation par ann�e.
- Ajout datacheck log.
- Ajout map parameters.
- Ajout Compl�tion et Incidence.
- Gestion dynamique des �chelles de couleur pour la carte.
- Correction de bugs mineurs.

Version 1.2
- Visualisation par classes d'ages.
- Support de divisions g�ographiques 'en cascade'.
- Correction de bugs mineurs.

Version 1.1

- Reprogrammation pour r�ponder � une vision plus modulaire et plus flexible.
- Ajout du support multilingue.
- Correction de bugs mineurs.

Version 1.0

Premi�re version stable.
