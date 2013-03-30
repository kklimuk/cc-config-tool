class Validation
    bindings: [{
        name: "Greater Than"
        binding: "gt"
    }, {
        name: "Less Than"
        binding: "lt"
    }, {
        name: "Equal To"
        binding: "eq"
    }, {
        name: "Required"
        binding: "required"
        lacksValue: true
    }]

    constructor: (binding, value) ->
        @binding = ko.observable binding
        @value = ko.observable value

    toJSON: ->
        binding: @binding()
        value: @value()



class Option
    constructor: (option) ->
        @value = ko.observable option

    toJSON: ->
        return @value()


window.App.Validation = Validation
window.App.Option = Option