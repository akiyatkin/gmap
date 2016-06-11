Event.classes.Gmap = function(obj) {
	return obj.id;
}
window.Gmap = {
	init: function (id) {
		Load.require('bower_components/gmap3/dist/gmap3.min.js');
		Event.one('Controller.onshow', function () {
			var conf = Config.get('gmap');
			var values = conf.values;
			
			for (var i = 0, l = values.length; i < l; i++) {
				if (!values[i].options) values[i].options = {};
				if (conf.data.icon) values[i].options.icon = conf.data.icon;

				var data = $.extend({}, conf.data, values[i]);
				values[i].data = {
					id:i,
					data:data,
					html:'<div>'+Template.parse('-gmap/info.tpl', data)+'</div>'
				}
			}
		

			$('#'+id).gmap3({
				map: {
					options: {
						maxZoom: 16,
						mapTypeControl: false,
						navigationControl: false,
						scrollwheel: false,
						streetViewControl: false
					}
				},
				marker:{
					values:values,
					options:{
						draggable: false
					},
					events:{
						click: function(marker, event, context){
							var map = $(this).gmap3("get"),
							infowindow = $(this).gmap3({
								get:{ name:"infowindow"}}
							);
							

							if (infowindow){
								infowindow.open(map, marker);
								infowindow.setOptions({ content: context.data.html, data:context.data});
							} else {

								$(this).gmap3({
									infowindow:{
										anchor:marker, 
										options:{ content: context.data.html, data:context.data},
										events:{
											domready: function (options) {
												Crumb.setA(id);
												Event.fire('Gmap.click', options.data);
												Event.tik('Gmap.click');
											}
										}
									}
								});
							}
							
							
						}
					}
				}
			}, "autofit" );
		});
	}
}