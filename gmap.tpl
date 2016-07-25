<div class="gmapobj" id="gmap{id}" style="height:100%"></div>
{gmap??:script}
<script>
	domready(function () {
		Event.handler('Gmap.initjs', function () {
			Gmap.init("gmap{id}");
		});
	});
</script>
{script:}
	<script defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAzRQcnQWfKcnrenYokaO9m6KQGJXj5v0A&amp;callback=initMap"></script>
	<script>
		domready( function () {
			Template.scope.gmap=true;
		});
		function initMap() {
			domready( function () {
				Event.fire('Gmap.initjs');
			});
		}
	</script>