function mapAdd() {
	let tag = document.createElement('script');
	tag.src = 'https://maps.google.com/maps/api/js?sensor=false&amp;key=&callback=mapInit';
	let firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}
function mapInit(n = 1) {
	google.maps.Map.prototype.setCenterWithOffset = function (latlng, offsetX, offsetY) {
		let map = this;
		let ov = new google.maps.OverlayView();
		ov.onAdd = function () {
			let proj = this.getProjection();
			let aPoint = proj.fromLatLngToContainerPixel(latlng);
			aPoint.x = aPoint.x + offsetX;
			aPoint.y = aPoint.y + offsetY;
			map.panTo(proj.fromContainerPixelToLatLng(aPoint));
			//map.setCenter(proj.fromContainerPixelToLatLng(aPoint));
		}
		ov.draw = function () { };
		ov.setMap(this);
	};
	let markers = new Array();
	let infowindow = new google.maps.InfoWindow({
		//pixelOffset: new google.maps.Size(-230,250)
	});
	let locations = [
		[new google.maps.LatLng(53.819055, 27.8813694)],
		[new google.maps.LatLng(53.700055, 27.5513694)],
		[new google.maps.LatLng(53.809055, 27.5813694)],
		[new google.maps.LatLng(53.859055, 27.5013694)],
	]
	let options = {
		zoom: 10,
		panControl: false,
		mapTypeControl: false,
		center: locations[0][0],
		styles: [{ 'featureType': 'landscape.natural', 'elementType': 'geometry.fill', 'stylers': [{ 'visibility': 'on' }, { 'color': '#e0efef' }] }, { 'featureType': 'poi', 'elementType': 'geometry.fill', 'stylers': [{ 'visibility': 'on' }, { 'hue': '#1900ff' }, { 'color': '#c0e8e8' }] }, { 'featureType': 'road', 'elementType': 'geometry', 'stylers': [{ 'lightness': 100 }, { 'visibility': 'simplified' }] }, { 'featureType': 'road', 'elementType': 'labels', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'transit.line', 'elementType': 'geometry', 'stylers': [{ 'visibility': 'on' }, { 'lightness': 700 }] }, { 'featureType': 'water', 'elementType': 'all', 'stylers': [{ 'color': '#7dcdcd' }] }],
		scrollwheel: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	let map = new google.maps.Map(document.getElementById('map'), options);
	let icon = {
		url: 'content/icons/sprite.svg#svg-map',
		scaledSize: new google.maps.Size(18, 20),
		anchor: new google.maps.Point(9, 10)
	}
	for (let i = 0; i < locations.length; i++) {
		let marker = new google.maps.Marker({
			icon: icon,
			position: locations[i][0],
			map: map,
		});
		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
				for (let m = 0; m < markers.length; m++) {
					markers[m].setIcon(icon);
				}
				let cnt = i + 1;
				//infowindow.setContent(document.querySelector('.events-map__item_' + cnt).innerHTML);
				//infowindow.open(map, marker);
				marker.setIcon(icon);
				map.setCenterWithOffset(marker.getPosition(), 0, 0);
				setTimeout(function () {

				}, 10);
			}
		})(marker, i));
		markers.push(marker);
	}
	if (n) {
		let nc = n - 1;
		setTimeout(function () {
			google.maps.event.trigger(markers[nc], 'click');
		}, 500);
	}
}
if (document.querySelector('#map')) {
	mapAdd();
}


/* YA
function map(n) {
	ymaps.ready(init);
	function init() {
		let myMap = new ymaps.Map('map', {
			controls: [],
			center: [43.585525, 39.723062],
			zoom: 10
		});

		let myPlacemark = new ymaps.Placemark([43.585525, 39.723062], {
		},{
			hasBalloon: false,
			hideIconOnBalloonOpen: false,
			iconLayout: 'default#imageWithContent',
			iconImageHref: 'content/icons/sprite.svg#svg-map',
			iconImageSize: [40, 40],
			iconImageOffset: [-20, -20],
			iconContentOffset: [0, 0],
		});
		myMap.geoObjects.add(myPlacemark);

		myMap.behaviors.disable('scrollZoom');
		myMap.behaviors.disable('drag');
	}
}
*/