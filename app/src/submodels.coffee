class Validation
    bindings: [{
        name: "Greater Than"
        binding: "gt"
    }, {
        name: "Less Than"
        binding: "lt"
    }, {
        name: "Equal To"
        binding: "equal"
    }, {
        name: "Required"
        binding: "required"
        lacksValue: true
    }]

    constructor: (data) ->
        data = $.extend {}, data
        if data.binding
            for bind in @bindings
                if bind.name is data.binding.name
                    @binding = ko.observable bind
        else @binding = ko.observable data.binding

        @field = ko.observable data.field
        @value = ko.observable data.value
        @optional = ko.observable data.optional or false
        @isNumeric = ko.observable if isNaN(data.value) is false then true else false

    toJSON: ->
        binding: @binding()
        value: if @isNumeric() then +@value() else @value()
        field: @field()
        optional: @optional()


class Option
    constructor: (option) ->
        option = $.extend {}, option
        @value = ko.observable option.value or ""
        @text = ko.observable option.text or ""

    toJSON: ->
        text: @text()
        value: @value()


window.App.Validation = Validation
window.App.Option = Option