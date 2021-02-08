cache = {};

makeAPICall = async function (user){
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": `https://hacker-news.firebaseio.com/v0/user/${user}.json`,
		"method": "GET",
		"headers": {},
		"data": "{}"
	}
	console.log(settings.url);
	return $.ajax(settings)
}

getInfo = async function (user){
	if (user in cache){
		console.log(user+" in cache");
	}
	else{
		res = await makeAPICall(user_id);
		console.log("RESPONSE:"+res.id);
		cache[user] = {'date':res.created,'karma':res.karma};
		console.log(cache[user]);
	}
	
	console.log("Current cache size: " + Object.keys(cache).length);

	d = new Date(cache[user]['date']*1000);
	date = d.toDateString().slice(4,);
	karma = cache[user]['karma'];
  	data = `Karma: ${karma} <br>` + 
    		`Date: ${date}`;


  	const newDiv = document.createElement("div");
  	newDiv.insertAdjacentHTML('afterbegin', data); 
  	newDiv.style.cssText = "background-color: rgb(0, 0, 0);" + 
  		"color: #ffffff; display: inline-block;";
    return newDiv;
}

$(document).ready(function() {
    $(document).tooltip({
        items: '.hnuser', 
        content: async function(callback) {
        	user_id = $(this).text();
			console.log(user_id);
        	data = await getInfo(user_id);			
		  	callback(data);
    	},
    	open: function(e, ui) {
    		ui.tooltip.position({
	        my: 'left top',
	        at: 'right bottom',
	        of: e
      		});
    	}
    })
})

