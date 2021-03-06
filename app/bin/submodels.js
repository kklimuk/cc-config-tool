// Generated by CoffeeScript 1.6.2
(function() {
  var Option, Validation,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Validation = (function() {
    Validation.prototype.bindings = [
      {
        name: "Greater Than",
        binding: "gt"
      }, {
        name: "Less Than",
        binding: "lt"
      }, {
        name: "Equal To",
        binding: "equal"
      }, {
        name: "Required",
        binding: "required",
        lacksValue: true
      }, {
        name: "Latest Date",
        binding: "maxDate",
        isDate: true
      }, {
        name: "Earliest Date",
        binding: "minDate",
        isDate: true
      }
    ];

    function Validation(data) {
      this.set_today = __bind(this.set_today, this);
      var bind, _i, _len, _ref,
        _this = this;

      data = $.extend({}, data);
      if (data.binding) {
        _ref = this.bindings;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          bind = _ref[_i];
          if (bind.name === data.binding.name) {
            this.binding = ko.observable(bind);
          }
        }
      } else {
        this.binding = ko.observable(data.binding);
      }
      this.field = ko.observable(data.field);
      this.value = ko.observable(data.value);
      this.optional = ko.observable(data.optional || false);
      this.isNumeric = ko.observable(isNaN(data.value) === false ? true : false);
      this.isDate = ko.computed(function() {
        if (_this.binding()) {
          return _this.binding().isDate;
        } else {
          return false;
        }
      });
    }

    Validation.prototype.set_today = function() {
      if (this.value() === "--today--") {
        return this.value("");
      } else {
        return this.value("--today--");
      }
    };

    Validation.prototype.toJSON = function() {
      return {
        binding: this.binding(),
        value: this.isNumeric() ? +this.value() : (this.isDate() && this.value() !== "--today--" ? new Date(this.value()) : this.value()),
        field: this.field(),
        optional: this.optional()
      };
    };

    return Validation;

  })();

  Option = (function() {
    function Option(option) {
      option = $.extend({}, option);
      this.value = ko.observable(option.value || "");
      this.text = ko.observable(option.text || "");
    }

    Option.prototype.toJSON = function() {
      return {
        text: this.text(),
        value: this.value()
      };
    };

    return Option;

  })();

  window.App.Validation = Validation;

  window.App.Option = Option;

}).call(this);

/*
//@ sourceMappingURL=submodels.map
*/
