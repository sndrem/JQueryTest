// Det opprinnelige søket vårt. 
// Dette søker henter bare alle de 100 første triplene.
var populationQuery = [

"PREFIX dbRes: <http://dbpedia.org/resource/>",
"PREFIX dbowl: <http://dbpedia.org/owl/>",
"PREFIX dbont: <http://dbpedia.org/ontology/>",
"PREFIX prop: <http://dbpedia.org/property/>",
"PREFIX dbprop: <http://dbpedia.org/dbprop/>",
"PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>",
"PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>",
"PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>",
"PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>",
"PREFIX yago: <http://dbpedia.org/class/yago/>",
"PREFIX owl: <http://www.w3.org/2002/07/owl#>",
"PREFIX hpi: <http://happyPlanetOntology/ontology#>",

"select * ",
"where {?a ?b ?c . }",
"limit 100"].join(" ");

// URL vi bruker som endpoint.
var url = "http://localhost:3030/ds/query";

// Document.ready() funksjon - Bare en mekaniske for å ikke kunne kjøre javascript før alt er ferdig lastet på siden.
$(function() {
	// Her forteller vi browseren: Når noen trykker på knappen, gjør det som kommer under. 
	$("button").click(function(event) {
		// Lagrer endpoint-url'en + query som en streng fuseki forstår (encodeURIComponent lager sånn fancy tekst som ingen skjønner bæret av).
		// Til slutt sier vi at vi ønsker resultatet som json.
		var queryUrl = url + "?query=" + encodeURIComponent(populationQuery) + "&format=json";
		// Skriver ut spørrestrengen til consolen for sjekk.
		console.log(queryUrl);

		// Her skjer magien
		//$.get() spesifiserer vi først queryUrl (som er endpointet + spørringen), function er en callback-funksjon som gir oss dataene i data-variabelen
		// og status holder på status om spørringen (gikk det bra, dårlig osv). 
		$.get(queryUrl, function(data, status){
			// kun en test for å se at vi får tilbake et objekt med data og hva statusen er.
			console.log("Data: " + data + " \nStatus: " + status);

		})

		// Dette er samme metode som get, måtte bare sjekke hva som virker. Begge skal virke i vårt tilfelle.
		$.getJSON(queryUrl, function(data, status){
			console.log("Data: " + data + "\nStatus: " + status); 
			var results = data.results.bindings;
			var index = 0;
			for(var i in results){
				var a = results[i].a.value;
				var b = results[i].b.value;
				var c = results[i].c.value;
				$('table').append( '<tr><td>' + 'A = ' +  a + '</td><td>' + b + '</td><td>' + c +'</td></tr>' );
				console.log(a + " index " + index++);
			}
		})
	
	});
});

