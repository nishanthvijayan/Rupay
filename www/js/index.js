function init(limit){

	data = (localStorage.getItem("data"))?JSON.parse(localStorage.getItem("data")):[];
	
	$("#content").empty();

	$.each(data , function(i,entry){
		
		if(i==limit) return false;

		note = (entry.note==" ")?'<br>':'<p>'+entry.note+'</p>';
		$("#content").append('\
			<div class="row" id="id'+entry.id+'">\
	            <div class="col s12 m6">\
	                <div class="card">\
                        <div class="card-content activator">\
                            <span class="card-title black-text">'+entry.title+'<i class="fa fa-caret-down right"></i><span class="right">'+entry.amount+' ₹ </span></span>\
                            <p>'+entry.date+'</p>'+note+
                        '</div>\
	                    <div class="card-reveal">\
	                        <span class="card-title black-text">Options<i class="option-close right">X</i></span>\
	                        <div class="card-action">\
	                            <a class="edit-btn"   onclick="editEntry('+entry.id+')"><i class="fa fa-pencil fa-2x"></i></a>\
	                            <a class="delete-btn" onclick="removeEntry('+entry.id+')" ><i class="fa fa-trash fa-2x"></i></a>\
	                        </div>\
	                    </div>\
	                </div>\
	            </div>\
	        </div>\
		');

	});

	if(data.length > limit){
		$("#content").append('<a onclick="init('+(limit+20)+')" class="grey lighten-2 btn more-btn"><i class="fa fa-angle-down"></i> Show More</a><br>');
	}
}

function removeEntry(id){
	data = JSON.parse(localStorage.getItem("data"));

	item = $("#id"+id);
	
	for (i = 0; i < data.length; i++) {
		if(data[i].id == id){
			index = i;
			break;
		}
	}
	
	item.addClass("removed-item").one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
        $(this).remove();
        data.splice(index,1);
        localStorage.setItem("data",JSON.stringify(data));
	});
};

function editEntry(id){
	item = $("#id"+id);
	for (i = 0; i < data.length; i++) {
		if(data[i].id == id){
			index = i;
			break;
		}
	}
	localStorage.setItem("editIndex",index);
	window.open("add.html");
}

$(document).ready(function(){
	FastClick.attach(document.body);
    localStorage.removeItem("editIndex");
    init(20);

    $(".add-btn").click(function() {
    	var options = {
			"direction"        : "up", 
			"duration"         :  500,
			"href"             : "add.html",
			"androiddelay"     :  10,
		};
		window.plugins.nativepagetransitions.slide(options);
    });

    $(".search-btn-show").click(function () {
    	$("#general-header").hide();
    	$("#search-header").show();
    });

    $(".back-btn").click(function () {
    	$("#general-header").show();
    	$("#search-header").hide();
    	init(20);
    	window.scrollTo(0,0);
    });


    $(".search-btn-action").click(function(){
    	
    	$("#content").empty();
    	
    	// Do nothing if search text is empty
    	if(!($("#search-input")[0].value))return;

    	searchText = $("#search-input")[0].value.toLowerCase();
    	data = (localStorage.getItem("data"))?JSON.parse(localStorage.getItem("data")):[];

    	$.each(data , function(i,entry){
    		entryText = (entry.amount + entry.title + entry.note + entry.date).toLowerCase();

    		if(entryText.indexOf(searchText) > -1){
				note = (entry.note==" ")?'<br>':'<p>'+entry.note+'</p>';
				$("#content").append('\
					<div class="row" id="id'+entry.id+'">\
			            <div class="col s12 m6">\
			                <div class="card">\
		                        <div class="card-content activator">\
		                            <span class="card-title black-text">'+entry.title+'<i class="fa fa-caret-down right"></i><span class="right">'+entry.amount+' ₹ </span></span>\
		                            <p>'+entry.date+'</p>'+note+
		                        '</div>\
			                    <div class="card-reveal">\
			                        <span class="card-title black-text">Options<i class="option-close right">X</i></span>\
			                        <div class="card-action">\
			                            <a class="edit-btn"   onclick="editEntry('+entry.id+')"><i class="fa fa-pencil fa-2x"></i></a>\
			                            <a class="delete-btn" onclick="removeEntry('+entry.id+')" ><i class="fa fa-trash fa-2x"></i></a>\
			                        </div>\
			                    </div>\
			                </div>\
			            </div>\
			        </div>\
				');
			}

    	});

 	});

});