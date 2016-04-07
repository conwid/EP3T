// ==UserScript==
// @name         Sz�r�s �rt�kel�s alapj�n
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Sz�r�s �rt�kel�s alapj�n
// @author       �kos Nagy
// @match        https://www.aut.bme.hu/Course/*/*/*/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';


function filter() {
    var rows=$('#gvUserOnAssignmentResult > tbody > tr.gridViewAltRow,.gridViewRow');
    rows.each(function() {
        $(this).show();
    });
    var filterVal=$( "#filterS option:selected" ).val();
    
    if ( filterVal=="-1" )
    {        
        return;
    }
    
    rows.each(function() {
        var grade = $(this).find('option:selected');
        if (grade.val()!=filterVal)
        {
            $(this).hide();
        }
    });

}

var select=$('#gvUserOnAssignmentResult').find('select').first();
select.attr('id','filterS');
var clone=select.clone();
clone.css('width','100px');

clone.change(filter);

clone.find('option').removeAttr("selected");
clone.append('<option selected value="-1"> Mind</option>');

$('div#body > div > p').after('<h2>Sz�r�s</h2><p id="filterP">Csak azok mutat�sa, ahol az eredm�ny: </p>');
$('#filterP').append(clone);