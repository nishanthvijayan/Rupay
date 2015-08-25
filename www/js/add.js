function compare(a,b) {
	aTime = new Date(a.date).getTime();
	bTime = new Date(b.date).getTime();
  	if (aTime < bTime)
    	return 1;
  	if (aTime > bTime)
    	return -1;
    if(parseInt(a.id) < parseInt(b.id))
    	return 1;
    if(parseInt(a.id) > parseInt(b.id))
    	return -1;
  	return 0;
}

function generateTagSet(){

	data = (localStorage.getItem("data"))?JSON.parse(localStorage.getItem("data")):[];
	tagSet = [];
	$.each(data , function(i,entry){
		if(tagSet.indexOf(entry.title) == -1){
			tagSet.push(entry.title);
		}
	});
	return tagSet;
}

$(document).ready(function(){	
	
	FastClick.attach(document.body);

	tagSet = generateTagSet();
	$.each(tagSet , function(i,entry){
		$(".dropdownlist > div").append("<a>"+entry+"</a>");
	});
	
	var no = new ComboBox('cb_identifier');
	
	if(localStorage.getItem("editIndex")){
		index = localStorage.getItem("editIndex");
		
		$(".header-text").text("Edit expense");
		
		item = JSON.parse(localStorage.getItem("data"))[index];
		$("#amount")[0].value = item.amount;
		$(".title")[0].value = item.title;
		$("#note")[0].value = item.note;
		$("#date-input-field").append('<input id="datepicker" type="date" class="datepicker" data-value="'+item.date+'">')
	}else{
		$("#date-input-field").append('<input id="datepicker" type="date" class="datepicker" data-value="'+new Date().toDateString()+'">')
	}

	$('.datepicker').pickadate({
    	selectMonths: true,
    	selectYears: 5
	});

    $(".done-btn").click(function(){

    	if(!$("#amount")[0].value){
    		window.plugins.toast.show("Sorry, Amount cannot be empty", 'long', 'bottom', function(a){}, function(b){});
    		return;
    	}else if(!$(".title")[0].value){
    		window.plugins.toast.show("Sorry, Title cannot be empty", 'long', 'bottom', function(a){}, function(b){});
    		return;
    	}else if(!$("#datepicker")[0].value){
    		window.plugins.toast.show("Sorry, Date cannot be empty", 'long', 'bottom', function(a){}, function(b){});
    		return;
    	}else if($(".title")[0].value.length >15){
    		window.plugins.toast.show("Sorry, Title should be less that 15 letters", 'long', 'bottom', function(a){}, function(b){});
    		return;
    	}
    	if(!$("#note")[0].value){$("#note")[0].value = " ";}

		data = (localStorage.getItem("data"))?JSON.parse(localStorage.getItem("data")):[];
    	
    	if(localStorage.getItem("editIndex")){
			
			index = localStorage.getItem("editIndex");
			id = data[index].id;
			item = {
				"amount":$("#amount")[0].value,
				"title":$(".title")[0].value,
				"note":$("#note")[0].value,
				"date":$("#datepicker")[0].value,
				"id":id
			};
			
			data[index] = item;
			window.plugins.toast.show("Expense Edited", 'long', 'bottom', function(a){}, function(b){});
		
		}else{

			id = new Date().getTime();
			item = {
				"amount":$("#amount")[0].value,
				"title":$(".title")[0].value,
				"note":$("#note")[0].value,
				"date":$("#datepicker")[0].value,
				"id":id
			};
			data.push(item);
			window.plugins.toast.show("Expense Added", 'long', 'bottom', function(a){}, function(b){});
		}

		data.sort(compare);
		localStorage.setItem("data",JSON.stringify(data));
		setTimeout( function(){window.open("index.html");} ,1000); // why the fuck is there a Timeout?
		
    });

	
    $(".close-btn").click(function(){
    	var options = {
			"direction"        : "down", 
			"duration"         :  500,
			"href"             :"index.html",
			"androiddelay"     :  1,
		};
		window.plugins.nativepagetransitions.slide(options);   	
    });

});