$(document).ready(function() {
    
	var ProjectCard = Backbone.Model.extend({});

	var ProfileView = Backbone.View.extend({

        el: $('#masonry-grid'),

        tagName: 'div',

        template:  '<a class="grid-link" href="/view/{{_id}}">'
                    + '<div class="grid-item">' 
                        + '<div class="card">'
                        	+ '<div class="card-image">'
                            	+ '<img src="{{picture}}">'
                                + '<span class="card-title" id="cardImage">{{name}}</span>'
                          	+ '</div>'
                            + '<div class="card-content">'
                                +  '<p class="description">{{description}}</p>'
                                + '<div class="progress-bar">'
                                + '<progress value="{{currentUnitsPerDay}}" max="{{targetUnitsPerDay}}">'
                            + '</div>'
                                + '<div id="author">'
                                +   '<img class="circle responsive-img author-img" src="{{creator.picture}}">'
                                +   '<p class="author-name">{{creator.name}}</p>'
                                + '</div>'
                            	+ '<div class="tags">'
                            		+ '{{#tags}}'
                            			+ 	'<span class="badge {{.}}">{{.}}</span>'
                            		+ '{{/tags}}'
                            	+ '</div>'
                        + '</div>'      
                    + '</div>'
                    + '</a>',

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.append((Mustache.render(this.template, this.model.toJSON())));
            return this;
        },
    });

    console.log("document ready");
    $.ajax({
    	type: "GET",
    	url: "/api/projects",
        complete: function() {
            var msnry = new Masonry('#masonry-grid', {
                gutter: 15,
                itemSelector: '.grid-item',
                isAnimated: true,
                columnWidth: 300,
                isFitWidth: true
            });

            setInterval(function(){
                msnry.reloadItems();    
                msnry.layout();
            },500);
        }
    })
    .done(function(body) {
    	var data = body;
    	for(var i in data) {
    		var projectCard = new ProjectCard(data[i]);
    		profileView = new ProfileView({model: projectCard});
    	}  	
    })
    .fail(function() {
    	console.log("Request has failed")
    });
});
