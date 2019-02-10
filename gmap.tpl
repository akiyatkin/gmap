{root:}
	<div class="gmapobj" id="gmap{id}" style=" display: block; width: 100%; height: 500px;"></div>
	{gmap??:script}
	<script>
		domready(function () {
			
			Event.handler('Gmap.initjs', function () {
				var data = Load.loadJSON(Controller.ids[{id}].json).data;
				
				var locations = data.data.map( function (val) {
					var v = { };
					v.data = val;
					if (val['Широта'] && val['Долгота']) {
						v.lat = Number(val['Широта']);
						v.lng = Number(val['Долгота']);
					}
					return v;
				});
				var map = new google.maps.Map(document.getElementById('gmap{id}'), {
					zoom: Number(data.descr.Масштаб || 3),
					center: { lat: Number(data.descr.Широта), lng: Number(data.descr.Долгота) },
					mapTypeControl: false,
					mapTypeId : google.maps.MapTypeId.ROADMAP,
					navigationControl: false,
					scrollwheel: false,
					streetViewControl: false
		        });
		        var markers = locations.map(function(location, i) {
		        	if (!location.lat) return;
					return new google.maps.Marker({
						data: location.data,
						position: location
					});
		        });
		        var infowindow = new google.maps.InfoWindow({
					content: "Отзыв"
				});
		        markers.map(function (marker) {
		        	marker.addListener('click', function() {
		        		var data = marker.data;
						if (!data) return;
						var html = '<div>'+Template.parse('-gmap/info.tpl', data)+'</div>';
						infowindow.setContent(html);
						infowindow.open(map, marker);
					});
		        });

		        
		        // Add a marker clusterer to manage the markers.
		        var markerCluster = new MarkerClusterer(map, markers, { 
		        	imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' 
		        });

			});
		});
	</script>
{gmapscript:}
	<script defer src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js"></script>
	<script defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAzRQcnQWfKcnrenYokaO9m6KQGJXj5v0A&amp;callback=initMap"></script>
{1:}1
{script:}
	{counter=:1?:gmapscript}
	<script>
		domready( function () {
			Template.scope.gmap = true;
		});
		function initMap() {
			domready( function () {
				Event.one('Controller.onshow', function(){
					Event.fire('Gmap.initjs');
				});
			});
		}
	</script>