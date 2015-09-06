$(document).ready(function() {
    
	var ProjectCard = Backbone.Model.extend({});

	var ProfileView = Backbone.View.extend({

        el: $('#mason-container'),

        tagName: 'div',

        template: '<div class="mason-image">' 
                        + '<div class="card">'
                        	+ '<div class="card-image">'
                            	+ '<img src="{{picture}}">'
                                + '<span class="card-title" id="cardImage">{{name}}</span>'
                          	+ '</div>'
                            + '<div class="card-content">'
                                +  '<p class="description">{{description}}</p>'
                            	+ '<div id="author">'
                            	+	'<img class="circle responsive-img author-img" src="{{creator.picture}}">'
                            	+	'<p class="author-name">{{creator.name}}</p>'
                            	+ '</div>'
                            	+ '<div class="tags">'
                            		+ '{{#tags}}'
                            			+ 	'<span class="badge {{.}}">{{.}}</span>'
                            		+ '{{/tags}}'
                            	+ '</div>'
                            	+ '<div class="progress-bar">'
                            		+ '<progress value="{{currentUnitsPerDay}}" max="{{targetUnitsPerDay}}">'
                            + '</div>'
                        + '</div>'      
                    + '</div>',

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
    	url: "/api/projects"
    })
    .done(function(body) {
    	var data = body;
    	console.log(body);
    	for(var i in data) {
    		var projectCard = new ProjectCard(data[i]);
    		console.log(projectCard);
    		profileView = new ProfileView({model: projectCard});
    	}  	
    })
    .fail(function() {
    	console.log("Request has failed")
    });
});
