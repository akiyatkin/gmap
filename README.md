# Карта Google

## Установка через composer


## Требования

Работа сайта с infrajs/controller

## Использование
Добавьте в шаблон подшаблон **{map::}-gmap/gmap.tpl** и в месте где нужна карта **{:map.root}**

## Конфиг

```json
{
	"data":{
		"icon": "/-imager/?src=images/earth.png&w=40",
		"logo": "/images/logo.png"
	},
	"values":[
		{ 
			"address": "Тольятти",
			"title": "Привет Тольятти"
		},{ 
			"address": "Самара"
		}
	]
}
```
## Шаблон облака над маркером

**-gmap/info.tpl**
Передаются данные - config.data с values[i] конкретного маркера и в данных id=i

## Клик по маркеру

```javascript
	Event.handler('Gmap.click', function (marker) {
		console.log(marker);
	});
```