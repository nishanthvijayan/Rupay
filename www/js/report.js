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

	$("#report-card-content > div").remove();
	$("#report-card-content").append('<div><span class="card-title black-text">Total Amount<span class="right">'+sum+' ₹ </span></span>\
	    <br><br><p>Average : '+avgPerDay+'₹  per day</p><br></div>');
	
	$.each(tags , function(title,amount){
		$("#report-card-content >div").append("<p>"+title+": "+amount+"₹ </p>");
	});

	// var dataSet = [
 //    {label: "Asia", data: 4119630000, color: "#005CDE" },
 //    { label: "Latin America", data: 590950000, color: "#00A36A" },
 //    { label: "Africa", data: 1012960000, color: "#7D0096" },
 //    { label: "Oceania", data: 35100000, color: "#992B00" },
 //    { label: "Europe", data: 727080000, color: "#DE000F" },
 //    { label: "North America", data: 344120000, color: "#ED7B00" }    
	// ];

	// $.plot($("#graph-card-content"), dataSet, {
 //    series: {
 //        pie: {
 //            innerRadius: 0.5,
 //            show: true
 //        }
	// }
	// });

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
			$("#report-card-content").append('<div><span class="card-title black-text">Error!</span>\
		        <br><br><p>Start date cannot be after End date.</p><br></div>');
		}
		else 
			generateReport();
	});
});