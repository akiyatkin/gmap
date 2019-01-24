# Карта Google

## Установка через composer


## Требования

Работа сайта с infrajs/controller

## Использование
Добавьте в шаблон подшаблон **{map::}-gmap/gmap.tpl** и в месте где нужна карта **{:map.root}**

В данных для шаблона должна быть структура
```
data = {
	descr: {
		"Центр":"Самара",
		"Масштаб":5
	},
	data:[
		{
			"Город":"Тольятти",
			"Адрес":"Тольятти Горсад"
			...
		},{
			"Город":"Тольятти",
			...
		}
	]
}
```
Такую структуру возвращает gdoc2article, например 
```
{
	"json":"-gdoc2article/table/10-ps0Gvc4jAM-NiUdNDOSfnbH8IosyfyKctLnCiRF3I/A1:F100"
}
```

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