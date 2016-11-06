//runs all the functions when page is loaded
$(document).ready(function() {
	var width = $('.prepie').width();
	progressCircle(Math.random(), 15, width, 'GB');
	//x,outOf,lineWeight - use even number, showStatus
});


//changes color relative to percentage (above 90% circle turn red)
function color_alert(percent) {
	if (percent >= "90%") {
		$(".slice1, .slice2").css({
			'background-color': '#EA4335',
			'-webkit-box-shadow': 'inset 0 0 10px #BF4C3F',
			'-moz-box-shadow': 'inset 0 0 10px #BF4C3F',
			'box-shadow': 'inset 0 0 10px #BF4C3F'
		});
		
		$(".left > .current").css({'color': '#EA4335'});
	}
}

//writes the rotate values into css
function rotate(element, degree) {
	element.css({
		'-webkit-transform': 'rotate(' + degree + 'deg)',
		'-moz-transform': 'rotate(' + degree + 'deg)',
		'-ms-transform': 'rotate(' + degree + 'deg)',
		'-o-transform': 'rotate(' + degree + 'deg)',
		'transform': 'rotate(' + degree + 'deg)',
		'zoom': 1
	});
}


//builds the 'graph'
function build(element, val1, val2, val3, select, overlay, lineWeight) {
	$(".overlay").css({
		'width': overlay + 'px',
		'height': overlay + 'px',
		'top': lineWeight + 'px',
		'left': lineWeight + 'px'
	});

	if (select == "1") {
		element.css({
			'clip': 'rect(' + val1 + ',' + val2 + ',' + val2 + ',' + val3 + ')'
		});
	} else {
		element.css({
			'clip': 'rect(' + val1 + ',' + val3 + ',' + val2 + ',' + val1 + ')'
		});
	}
}

//simply rounds values...
function round(value, decimals) {
	return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

//here are all values processed (calculated)
function progressCircle(x, outOf, lineWeight, unit) {
	var firstHalfAngle = 180;
	var secondHalfAngle = 0;
	
	// caluclate the angle
	var drawAngle = x * outOf / outOf * 360;
	
	// calculate the angle for each half
	if (drawAngle <= 180) {
		firstHalfAngle = drawAngle;
	} else {
		secondHalfAngle = drawAngle - 180;
	}

	// set transition
	rotate($(".slice1"), firstHalfAngle);
	rotate($(".slice2"), secondHalfAngle);

	//calculate size of circle
	var width = $('.prepie').width();
	var thickness = $('.pie').css('borderLeftWidth');
	var thick = thickness.split('px');
	var size = width - (2 * thick[0]);
	
	var val1 = '0';
	var val2 = size + 'px';
	var val3 = size / 2 + 'px';
	
	var overlay = width - lineWeight;
	var lineWeight = lineWeight / 2;

	//set size of circle
	var select = "1";
	build($(".clip1, .slice2"), val1, val2, val3, select, overlay, lineWeight);
	var select = "2";
	build($(".clip2, .slice1"), val1, val2, val3, select, overlay, lineWeight);
	
	// set the values on the text
	//$(".status").html(x + " of " + outOf);
	var percent = Math.round((x * outOf / outOf) * 100) + "%";
	var current = round((x * outOf), 1) + ' ' + unit;
	var max = outOf + ' ' + unit;
	
	/*if (showStatus == true) {
		$(".status1").html(status);
	}*/
	
	//function to change color above a specified value
	color_alert(percent);
	
	//return al the visible values to html
	$(".current").html(current);
	$(".percent").html(percent);
	$(".max").html(max);
}
