// Generated by CoffeeScript 1.6.2
(function() {
  var Checkbox, Field, Group, Multiple, Text,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Field = (function() {
    function Field(data, group) {
      var _this = this;

      this.group = group;
      this.move_down = __bind(this.move_down, this);
      this.move_up = __bind(this.move_up, this);
      this.remove_validation = __bind(this.remove_validation, this);
      this.add_validation = __bind(this.add_validation, this);
      this.remove = __bind(this.remove, this);
      this.data = $.extend({
        attr: {}
      }, data);
      this.form_name = ko.observable(this.data.form_name);
      this.db_name = ko.observable(this.data.db_name);
      this.validations = ko.observableArray([]);
      if (this.data.attr.validations) {
        this.data.attr.validations.forEach(function(validation) {
          return _this.validations.push(new App.Validation(validation.binding, validation.value));
        });
      }
    }

    Field.prototype.remove = function() {
      if (this.group) {
        return this.group.fields.remove(this);
      }
    };

    Field.prototype.add_validation = function() {
      return this.validations.push(new App.Validation());
    };

    Field.prototype.remove_validation = function() {
      return this.validations.pop();
    };

    Field.prototype.move_up = function() {
      var array, i;

      i = this.group.fields.indexOf(this);
      if (i >= 1) {
        array = this.group.fields();
        return this.group.fields.splice(i - 1, 2, array[i], array[i - 1]);
      }
    };

    Field.prototype.move_down = function() {
      var array, i;

      i = this.group.fields.indexOf(this);
      if (i >= 0) {
        array = this.group.fields();
        return this.group.fields.splice(i, 2, array[i + 1], array[i]);
      }
    };

    return Field;

  })();

  Group = (function(_super) {
    __extends(Group, _super);

    Group.prototype.type = "group";

    function Group(data, group) {
      this.toJSON = __bind(this.toJSON, this);
      this.add_field = __bind(this.add_field, this);
      var _this = this;

      Group.__super__.constructor.call(this, data, group);
      this.isConditional = ko.observable(this.data.attr.conditional ? true : false);
      this.conditional = ko.observable(this.data.attr.conditional);
      this.fields = ko.observableArray([]);
      if (this.data.attr.fields) {
        this.data.attr.fields.forEach(function(field) {
          return _this.fields.push(new App[field.type](field, _this));
        });
      }
    }

    Group.prototype.add_field = function(type) {
      var field;

      field = new window.App[type]({}, this);
      return this.fields.push(field);
    };

    Group.prototype.toJSON = function() {
      return {
        form_name: this.form_name(),
        db_name: this.db_name(),
        type: this.type,
        attr: {
          conditional: this.conditional(),
          fields: this.fields()
        }
      };
    };

    return Group;

  })(Field);

  Multiple = (function(_super) {
    __extends(Multiple, _super);

    Multiple.prototype.type = "multiple";

    function Multiple(data, group) {
      this.toJSON = __bind(this.toJSON, this);
      this.remove_option = __bind(this.remove_option, this);
      this.add_option = __bind(this.add_option, this);
      var _this = this;

      Multiple.__super__.constructor.call(this, data, group);
      this.text = ko.observable(this.data.attr.text);
      this.placeholder = ko.observable(this.data.attr.placeholder);
      this.info = ko.observable(this.data.attr.info);
      this.multiple = ko.observable(this.data.attr.multiple || false);
      this.options = ko.observableArray([]);
      if (this.data.attr.options) {
        this.data.attr.options.forEach(function(option) {
          return _this.options.push(new App.Option(option));
        });
      }
    }

    Multiple.prototype.add_option = function() {
      return this.options.push(new App.Option());
    };

    Multiple.prototype.remove_option = function() {
      return this.options.pop();
    };

    Multiple.prototype.toJSON = function() {
      return {
        form_name: this.form_name(),
        db_name: this.db_name(),
        type: this.type,
        attr: {
          text: this.text(),
          placeholder: this.placeholder(),
          info: this.info(),
          multiple: this.multiple(),
          options: this.options(),
          validations: this.validations()
        }
      };
    };

    return Multiple;

  })(Field);

  Checkbox = (function(_super) {
    __extends(Checkbox, _super);

    Checkbox.prototype.type = "checkbox";

    function Checkbox(data, group) {
      Checkbox.__super__.constructor.call(this, data, group);
      this.text = ko.observable(this.data.attr.text);
      this.info = ko.observable(this.data.attr.info);
    }

    Checkbox.prototype.toJSON = function() {
      return {
        form_name: this.form_name,
        db_name: this.db_name(),
        type: this.type,
        attr: {
          text: this.text(),
          info: this.info(),
          validations: this.validations()
        }
      };
    };

    return Checkbox;

  })(Field);

  Text = (function(_super) {
    __extends(Text, _super);

    Text.prototype.type = "text";

    Text.prototype.bindings = ["Address", "Email", "Currency", "Text", "Date", "Textarea", "Number"];

    function Text(data, group) {
      this.toJSON = __bind(this.toJSON, this);      Text.__super__.constructor.call(this, data, group);
      this.text = ko.observable(this.data.attr.text);
      this.placeholder = ko.observable(this.data.attr.placeholder);
      this.info = ko.observable(this.data.attr.info);
      this.binding = ko.observable(this.data.attr.binding);
    }

    Text.prototype.toJSON = function() {
      return {
        form_name: this.form_name(),
        db_name: this.db_name(),
        type: this.type,
        attr: {
          text: this.text(),
          placeholder: this.placeholder(),
          info: this.info(),
          binding: this.binding(),
          validations: this.validations()
        }
      };
    };

    return Text;

  })(Field);

  window.App = {
    group: Group,
    text: Text,
    multiple: Multiple,
    checkbox: Checkbox
  };

}).call(this);

/*
//@ sourceMappingURL=models.map
*/
