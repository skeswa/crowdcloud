$(document).ready(function() {
    
	var ProjectCard = Backbone.Model.extend({});

	var ProfileView = Backbone.View.extend({

        el: $('#ctn'),

        tagName: 'div',

        template:  '<h3 id="title">{{name}}</h3>'
                  + '<div class="content-wrapper">'
                    + '<div class="video">'
                      + '<iframe width="650" height="400" src="//www.youtube.com/embed/Q8TXgCzxEnw?rel=0;autohide=1" frameborder="0" allowfullscreen></iframe>'
                    + '</div>'
                  + '<div id="stats">'
                      + '<div>'
                        + '<span id="num-backers">4 </span>'
                        +  '<span id="title-backers">backers</span>'
                        + '</div>'
                        + '<div>'
                         + '<span id="num-units">{{currentUnitsPerDay}} </span>'
                         + '<span id="title-target">/ {{targetUnitsPerDay}} hours</span>'  
                        + '</div>'
                        + '<div id="github-button">'
                        +  '<a id="github-btn" href="https://github.com/{{repo}}" class="waves-effect waves-light btn"><i id="github-icon" class="fa fa-github"></i>View on Githhub</a>'
                        + '</div>'
                        + '<div id="support-button">'
                         + '<a id="support-btn" class="waves-effect waves-light btn">Back this project</a>'
                        + '</div>'
                        + '<div id="author">'        
                          + '<img id="author-img" class="circle responsive-img author-img" src="{{creator.picture}}">'
                          + '<div id="author-name">'
                            + '<p>{{creator.name}}</p>'
                          + '</div>'
                      + '</div>'
                      + '</div>'
                      + '<div>'
                       + '<p class="">{{description}}</p>'
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

    //get url
    var docId = document.URL;
    docId = docId.substring(27, docId.length);

    console.log(docId);
    $.ajax({
    	type: "GET",
    	url: "/api/projects/"+docId,
    })
    .done(function(body) {
    	var data = body;
        console.log(data); 
    	var projectCard = new ProjectCard(data);
        console.log(projectCard);   
    	var profileView = new ProfileView({model: projectCard});
    })
    .fail(function() {
    	console.log("Request has failed")
    });
});
