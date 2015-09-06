//var socket = new io.Socket();

$(document).ready(function() {
    var OwnProjectView = Backbone.View.extend({

        el: $('#ctn'),

        tagName: 'div',

        template: '<cats>{{welcome.message}}{{welcome.version}}</cats>',

        data: {
            welcome: {
                message: "connecting...",
                version: "unknown"
            },
            connected: false,
            messages: []
        },

        initialize: function() {
            this.render();
            this.on("ping", function () {
                socket.emit("ping", this.get("text"))
                this.set("text", "")
             })
        },

        render: function() {
            this.$el.append((Mustache.render(this.template, this.model.toJSON())));
            return this;
        },
    });
});

var socket = io.connect("http://localhost");

//socket.connect("http://localhost", { autoConnect: true});

socket.on("connect", function () {
    //app.set("connected", true)
    console.log("connected");
})

socket.on("build", function (data) {
    //app.set("welcome.message", data.message)
    //app.set("welcome.version", data.version)
    console.log(data);
})

socket.on("cpu", function (data) {
    //var messages = app.get("messages")
    //messages.push(data)
    console.log("cpu");
})
