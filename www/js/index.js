function init(){

	data = (localStorage.getItem("data"))?JSON.parse(localStorage.getItem("data")):[];
	tagSet = []
	
	$("#content").empty();

	$.each(data , function(i,entry){
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
		if(tagSet.indexOf(entry.title) == -1){
			tagSet.push(entry.title);
		}
	});
	localStorage.setItem("tagSet",JSON.stringify(tagSet));
}

function removeEntry(id){
	data = JSON.parse(localStorage.getItem("data"));

	item = $("#id"+id);
	index = item.index();

	item.addClass("removed-item").one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
        $(this).remove();
        data.splice(index,1);
        localStorage.setItem("data",JSON.stringify(data));
	});
};

function editEntry(id){
	item = $("#id"+id);
	index = item.index();
	localStorage.setItem("editIndex",index);
	window.open("add.html");
}

$(document).ready(function(){
	FastClick.attach(document.body);
    localStorage.removeItem("editIndex");
    init();

    $(".add-btn").click(function() {
    	var options = {
			"direction"        : "up", 
			"duration"         :  500,
			"href"             : "add.html",
			"androiddelay"     :  10,
		};
		window.plugins.nativepagetransitions.slide(options);
    })
 });