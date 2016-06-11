<div id="gmap{id}" style="height:100%"></div>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAzRQcnQWfKcnrenYokaO9m6KQGJXj5v0A&amp;callback=initMap" async defer></script>
<script>
	function initMap(){
		domready(function () {
			Event.fire('Gmap.init');
		});
	}
	domready(function () {
		Event.handler('Gmap.init', function () {
			Gmap.init("gmap{id}");
		});
	});
</script>