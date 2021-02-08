parser = new DOMParser();
kpath = "#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td:nth-child(2)";
crpath = "#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > a"
cache = {};


getKarma = async function (url,x,y){
	if (url in cache){
		console.log(url+" in cache");
		date = cache[url]['date'];
		karma = cache[url]['karma'];
	}
	else{
		txt = await fetch(url).then(res => res.text());

		doc = parser.parseFromString(txt, 'text/html');
	  	karma = doc.querySelector(kpath);
	  	karma = karma.innerHTML.trim();

	  	date = doc.querySelector(crpath);
	  	date = date.innerHTML.trim();

	  	cache[url] = {'date':date,'karma':karma};
	  	console.log("Current cache size: " + Object.keys(cache).length);
  	}
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
        	url = $(this).attr('href');
        	var rect = this.getBoundingClientRect();
        	data = await getKarma(url,rect.right, rect.bottom);			
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

console.log("Boo haa");
