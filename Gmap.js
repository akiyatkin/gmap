Event.classes.Gmap = function(obj) {
	return obj.id;
}
window.Gmap = {
	//Перемещает экран к маркерам с тегом
	move: function(id, tag) {
		var div = $('#' + id);
		var latlngbounds = new google.maps.LatLngBounds();
		div.gmap3({
			get: {
				name:"marker",
				all: true,
				tag: tag,
				callback: function (values) {
					for ( var i = 0; i < values.length; i++ ){
						latlngbounds.extend(values[i].getPosition());
					}
					var map = div.gmap3("get");
					map.panTo( latlngbounds.getCenter(), map.fitBounds(latlngbounds));
				}
			}
		});
	},
	//Перемещает экран к маркеру с Title
	moveNum: function(id, num) {
		var div = $('#' + id);
		var latlngbounds = new google.maps.LatLngBounds();
		div.gmap3({
			get: {
				name:"marker",
				all: true,
				callback: function (values) {
					latlngbounds.extend(values[num].getPosition());
					var map = div.gmap3("get");
					map.panTo( latlngbounds.getCenter(), map.fitBounds(latlngbounds));
				}
			}
		});
	},
	moveAll: function(id) {
		var div = $('#' + id);
		var latlngbounds = new google.maps.LatLngBounds();
		div.gmap3({
			get: {
				name:"marker",
				all: true,
				callback: function (values) {
					for ( var i = 0; i < values.length; i++ ){
						latlngbounds.extend(values[i].getPosition());
					}
					var map = div.gmap3("get");
					map.panTo( latlngbounds.getCenter(), map.fitBounds(latlngbounds));
				}
			}
		});
	},
	init: function (id, data) {
		//var conf = Config.get('gmap');
		//var values = conf.values;
		//В Таблице должна быть колонка Адрес или Город, Центр, Масштаб
		values = data.data.map(function(val) {
			var v = {};
			v.data = val;
			if(val['Адрес']) {
				v.address = val['Адрес'];
			} else {
				v.address = val['Город'];
			}
			return v;
		});
		var center = data.descr['Центр'] || values[0].address;
		console.log(data);

		Event.tik('Gmap.init');
		Event.one('Controller.onshow', function () {
			
			$('#'+id).gmap3({
				address:center,
				zoom: Number(data.descr['Масштаб']||5),
				mapTypeControl: false,
				mapTypeId : google.maps.MapTypeId.ROADMAP,
				navigationControl: false,
				scrollwheel: false,
				streetViewControl: false
			}).marker(values).infowindow({
				content: "Hello from Uluru"
			}).then( function (infowindow) {
				var map = this.get(0);
				var marker = this.get(1);
				marker.map(function(marker){
					marker.addListener('click', function() {
						var data = marker.data;
						if (!data) return;
						var html = '<div>'+Template.parse('-gmap/info.tpl', data)+'</div>';
						infowindow.setContent(html);
						infowindow.open(map, marker);
					});
				});
			});
			Event.fire('Gmap.init');
		});
	}
}