function latlongToMetric(latLongList, range)
{
	var metricList = new Array();
	var cumLength = 0;
	
	var position = new Object();
	position.dist = cumLength;
	position.latlong = latLongList[0];
	metricList.push(position);
	
	var ind = 1;
	while(ind < latLongList.length && cumLength < range)
	{
		cumLength += haversineFormula(latLongList[ind-1],latLongList[ind]);
		var position = new Object();
		position.dist = cumLength;
		position.latlong = latLongList[ind];
		metricList.push(position);
		ind++;
	}
	
	return metricList;
}

function haversineFormula(latlong1, latlong2)
{
	var latKey = "k";
	var longKey = "A";
	var lat1 = latlong1[latKey]*Math.PI/180;
	var lat2 = latlong2[latKey]*Math.PI/180;
	var lon1 = latlong1[longKey]*Math.PI/180;
	var lon2 = latlong2[longKey]*Math.PI/180;
	
	var R = 6371; // km
	var x = (lon2-lon1) * Math.cos((lat1+lat2)/2);
	var y = (lat2-lat1);
	var d = Math.sqrt(x*x + y*y) * R;

	return d;
}