$(document).ready(function() {
    
    send = function() {
        var value = $('#inputId').val(); 
        var docId = document.URL;
        docId = docId.substring(22, docId.length - 2);
        var postUrl = '/api/projects/'+docId+'/back';
        console.log(postUrl);
        $.ajax({
            type: 'POST',
            url: postUrl,   
        })
        .done(function() {
            Materialize.toast('Success: '+value+' credit contributed!', 4000, 'toast-success');
        })
        .fail(function() {
            Materialize.toast('Failed to contribute credit!', 4000, 'toast-fail');
        });   
    };

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
                        + '<span id="num-backers">{{backers}} </span>'
                        +  '<span id="title-backers">backers</span>'
                        + '</div>'
                        + '<div>'
                         + '<span id="num-units">{{currentUnitsPerDay}} </span>'
                         + '<span id="title-target">/ {{targetUnitsPerDay}} hours</span>'  
                        + '</div>'
                        + '<div id="github-button">'
                        +  '<a id="github-btn" href="https://github.com/{{repo}}" class="waves-effect waves-light btn"><i id="github-icon" class="fa fa-github"></i>View on Github</a>'
                        + '</div>'
                        + '<div id="support-button">'
                         + '<a href="#modal1" id="support-btn" class="waves-effect waves-light btn modal-trigger">Back this project</a>'
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
        complete: function() {
            $('.modal-trigger').leanModal();    
        },
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
