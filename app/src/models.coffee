class Field
    constructor: (data, @group) ->
        @data = $.extend {attr: {}}, data

        @form_name = ko.observable @data.form_name
        @db_name = ko.observable @data.db_name
        @validations = ko.observableArray []

        if @data.attr.validations
            @data.attr.validations.forEach (validation) =>
                @validations.push new App.Validation(validation.binding, validation.value)

    remove: =>
        @group.fields.remove this if @group

    add_validation: =>
        @validations.push new App.Validation()

    remove_validation: =>
        @validations.pop()

    move_up: =>
        i = @group.fields.indexOf this
        if i >= 1
            array = @group.fields()
            @group.fields.splice i - 1, 2, array[i], array[i - 1]

    move_down: =>
        i = @group.fields.indexOf this
        if i >= 0
            array = @group.fields()
            @group.fields.splice i, 2, array[i + 1], array[i]


class Group extends Field
    type: "group"

    constructor: (data, group) ->
        super(data, group)

        @isConditional = ko.observable if @data.attr.conditional then true else false
        @conditional = ko.observable @data.attr.conditional
        @fields = ko.observableArray []

        if @data.attr.fields
            @data.attr.fields.forEach (field) =>
                @fields.push new App[field.type](field, this)


    add_field: (type) =>
        field = new window.App[type] {}, this
        @fields.push field

    toJSON: =>
        form_name: @form_name()
        db_name: @db_name()
        type: @type
        attr:
            conditional: @conditional()
            fields: @fields()


class Multiple extends Field
    type: "multiple"

    constructor: (data, group) ->
        super(data, group)

        @text = ko.observable @data.attr.text
        @placeholder = ko.observable @data.attr.placeholder
        @info = ko.observable @data.attr.info
        @multiple = ko.observable @data.attr.multiple or false

        @options = ko.observableArray []

        if @data.attr.options
            @data.attr.options.forEach (option) =>
                @options.push new App.Option(option)

    add_option: =>
        @options.push new App.Option()

    remove_option: =>
        @options.pop()

    toJSON: =>
        form_name: @form_name()
        db_name: @db_name()
        type: @type
        attr:
            text: @text()
            placeholder: @placeholder()
            info: @info()
            multiple: @multiple()
            options: @options()
            validations: @validations()


class Checkbox extends Field
    type: "checkbox"

    constructor: (data, group) ->
        super(data, group)

        @text = ko.observable @data.attr.text
        @info = ko.observable @data.attr.info

    toJSON: ->
        form_name: @form_name
        db_name: @db_name()
        type: @type
        attr:
            text: @text()
            info: @info()
            validations: @validations()


class Text extends Field
    type: "text"
    bindings: ["Address", "Email", "Currency", "Text", "Date", "Textarea", "Number"]

    constructor: (data, group) ->
        super(data, group)

        @text = ko.observable @data.attr.text
        @placeholder = ko.observable @data.attr.placeholder
        @info = ko.observable @data.attr.info
        @binding = ko.observable @data.attr.binding

    toJSON: =>
        form_name: @form_name()
        db_name: @db_name()
        type: @type
        attr:
            text: @text()
            placeholder: @placeholder()
            info: @info()
            binding: @binding()
            validations: @validations()


window.App =
    group: Group
    text: Text
    multiple: Multiple
    checkbox: Checkbox
