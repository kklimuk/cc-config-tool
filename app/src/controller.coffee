class ModelView
    constructor: ->
        @outer = ko.observable new App.group
            form_name: "outer_group"

        @file_name = ko.observable()
        @file = ko.computed () =>
            return "data:application/json,#{ko.toJSON(@outer)}"

    log_json: =>
        console.log ko.toJSON(@outer, null, '\t')

    load: =>
        config = JSON.parse window.prompt("Please enter the config info to load.")
        @outer new App.group(config)


$(document).ready ->
    modelview = new ModelView()
    ko.applyBindings modelview