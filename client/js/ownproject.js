//var socket = new io.Socket();

$(document).ready(function() {
    var OwnProjectView = Backbone.View.extend({

        el: $('#ctn'),

        tagName: 'div',

        template: '<canvas id="myChart" width="500" height="500"></canvas>',

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
            setTimeOut(function() {
                this.chart();
            }, 5000);
        },

        render: function() {
            this.$el.append((Mustache.render(this.template, this.model.toJSON())));
            return this;
        },
    });
});

var socket = io.connect("http://cloudsource.pw");


//socket.connect("http://localhost", { autoConnect: true});

socket.on("connect", function () {
    //app.set("connected", true)
    console.log("connected");
}),



socket.on("build", function (data) {
    var temp = $("#terminal").html();
    var temp = temp + "\n" + moment().format('YYYY-MM-DD h:mm:ss') + ": " + data.data;
    $('#terminal').html(temp);
    $('#terminal').scrollTop($("#terminal")[0].scrollHeight);
    console.log("build", data);
})

socket.on("cpu", function (data) {
    var cpu = data.data;
    var not = 100 - data.data;
    cpuUpdate(not, cpu);
    console.log("cpu");
    
})

socket.on("memory", function (data) {
    console.log("memory");
})
