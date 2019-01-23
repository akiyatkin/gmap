{root:}
	<div class="gmapobj" id="gmap{id}" style=" display: block; width: 100%; height: 500px;"></div>
	{gmap??:script}
	<script>
		domready(function () {
			Event.handler('Gmap.initjs', function () {
				Gmap.init("gmap{id}", Load.loadJSON(Controller.ids[{id}].json).data);
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
				Event.one('Controller.onshow', function(){
					Event.fire('Gmap.initjs');
				});
			});
		}
	</script>