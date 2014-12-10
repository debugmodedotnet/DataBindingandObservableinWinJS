// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    // Create a 'person' object.

    //var student = {
    //    name: "Dj",
    //    color: "red"
    // };


    var Student = WinJS.Class.define(
       function()
       {
           this._initObservable();
           this.name = "DJ";
           this.size = "16px";
       },
       {

           _names:
               ["foo", "loo", "koo", "too", "moo", "soo", "aoo", "too", "qoo", "coo"],
           _sizes:
               ["30px", "80px", "40px","20px","35px","67px","43px","23px","54px","12px"],

           _newName: function () {
               this["name"] = this._names[this._randomizeValue(this._names.length)];
               this["size"] = this._sizes[this._randomizeValue(this._sizes.length)];
           },
           _randomizeValue: function (max) {
               return Math.floor((Math.random() * 1000) % max); 
           }
       
       });
    

    WinJS.Class.mix(Student,
    WinJS.Binding.mixin,
    WinJS.Binding.expandProperties({name: "", size: ""})
); 

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

            args.setPromise(WinJS.UI.processAll());

            var s = new Student();
            s.bind("name",onNameChange);
            s.bind("size", onSizeChange);
        }

        //var personDiv = document.querySelector('#nameSpan');
        //WinJS.Binding.processAll(personDiv, student);
        //var bindingSource = WinJS.Binding.as(student);
        document.querySelector("#btnUpdataDs").onclick = function () {

            s._newName();
        }
        
    };


    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.start();

    function onNameChange (newValue) {
        var span = document.getElementById("nameSpan");
        span.innerText = newValue;
    };

    function onSizeChange (newValue) {
        var span = document.getElementById("nameSpan");
        span.style.fontSize = newValue;
    };
})();
