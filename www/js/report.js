function compareTags(a,b) {
  	if (a["amount"] < b["amount"])
    	return 1;
  	if (a["amount"] > b["amount"])
    	return -1;
  	return 0;
}


function  generateReport(){
	sum = 0;
	tags = {}
	$.each(data , function(i,entry){
		if(new Date(entry.date).getTime() >= new Date($("#datepicker-start")[0].value).getTime() && new Date(entry.date).getTime() <= new Date($("#datepicker-end")[0].value).getTime()){
			sum = sum + parseInt(entry.amount);
			if(entry.title in tags)tags[entry.title] += parseInt(entry.amount);
			else tags[entry.title] = parseInt(entry.amount);
		}
	});
	noOfDays = ((new Date($("#datepicker-end")[0].value).getTime() - new Date($("#datepicker-start")[0].value).getTime())/86400000)+1;
	avgPerDay = (sum / noOfDays).toFixed(2);

	tagSet = []
	$.each(tags , function(title,amount){
		tagSet.push({"title":title,"amount":amount});
	});
	tagSet.sort(compareTags);

	$("#report-card-content > div").remove();
	$("#report-card-content > table").remove();
	$("#report-card-content").append('<div><span class="card-title black-text">Total Amount<span class="right">'+sum+' ₹ </span></span>\
	    <br><br></div>');
	
	$("#report-card-content").append('<table></table>')

	$("#report-card-content >table").append("<tr><td>Average</td><td>"+avgPerDay+"₹ / day </td></tr>");
	
	$.each(tagSet , function(i,tag){
		percent = (parseFloat(tag.amount)*100/sum).toFixed(2);
		$("#report-card-content >table").append("<tr><td>"+tag.title+"</td><td>"+tag.amount+"₹ </td><td>"+percent+"%</td></tr>");
	});

}




$(document).ready(function(){	

	var viewport = {
    	width  : $(window).width(),
    	height : $(window).height()
	};

	FastClick.attach(document.body);
	
	$("#date-input-field-end").append('<input id="datepicker-end" type="date" class="datepicker" data-value="'+new Date().toDateString()+'">')
	$("#date-input-field-start").append('<input id="datepicker-start" type="date" class="datepicker" data-value="'+new Date().toDateString()+'">')

	$('.datepicker').pickadate({
    	selectMonths: true,
    	selectYears: 5
	});

	// $("#graph-card-content").css("height",(viewport.height));
	// $("#graph-card-content").css("width",(viewport.width)/0.5);

	data = (localStorage.getItem("data"))?JSON.parse(localStorage.getItem("data")):[];
	generateReport();


	$(".datepicker").change(function(){
		
		if( new Date($("#datepicker-start")[0].value).getTime() > new Date($("#datepicker-end")[0].value).getTime() ){
			$("#report-card-content > div").remove();
			$("#report-card-content > table").remove();
			$("#report-card-content").append('<div><span class="card-title black-text">Error!</span>\
		        <br><br><p>Start date cannot be after End date.</p><br></div>');
		}
		else 
			generateReport();
	});
});