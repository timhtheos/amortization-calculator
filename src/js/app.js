angular.module('app', ['cleave.js'])

  .controller('AppController', function($scope) {
    $scope.onCreditCardValueChanged = function(e) {
      $scope.model.creditCardFormattedValue = e.target.value;
    };

    $scope.onCreditCardTypeChanged = function(type) {
      $scope.model.creditCardType = type;
    };

    $scope.model = {
      creditCardRawValue: '',
      creditCardFormattedValue: '',
      creditCardType: '',
      phone: '',
      date: '',
      numeral: '',
      custom: 'PREFIX-'
    };

    $scope.options = {
      creditCard: {
        creditCard: true,
        onValueChanged: $scope.onCreditCardValueChanged,
        onCreditCardTypeChanged: $scope.onCreditCardTypeChanged
      },

      phone: {
        phone: true,
        phoneRegionCode: 'AU'
      },

      date: {
        date: true
      },

      numeral: {
        numeral: true
      },

      custom: {
        blocks: [6, 3, 3, 3],
        prefix: 'PREFIX',
        uppercase: true,
        delimiters: ['-', '.']
      },

      price: {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand',
        prefix: 'PhP ',
        // noImmediatePrefix: true,
        rawValueTrimPrefix: true,
        numeralDecimalScale: 2,
        numeralPositiveOnly: true
      },

      term: {
        numeral: true,
        numeralIntegerScale: 2,
        numeralPositiveOnly: true,
        numeralDecimalScale: 2
      },

      rate: {
        numeral: true,
        numeralIntegerScale: 2,
        numeralPositiveOnly: true,
        numeralDecimalScale: 2
      }
    };

    $scope.schedule = function(price, term, rate, monthly) {
      var output;
      output = computeSchedule(price, rate, 12, term, monthly);
      return output;
    };
  })

  .filter('amort', function() {
    return function(price, term, rate) {
      var output;
      output = Math.abs(pmt(rate/12/100, term*12, price));
      return output;
    }
  })

  .filter('sched', function() {
    return function(price, term, rate) {
      var output;
      output = computeSchedule(price, rate/12/100, 12, term, Math.abs(pmt(rate/12/100, term*12, price)));
      return output;
    }
  });
