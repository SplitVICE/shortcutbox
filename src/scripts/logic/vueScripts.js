var app = new Vue({
    el: '#vue-app',
    data: {
      title: 'Shortcut Box',
      version: '1.0.0-dev'
    },
    methods: {
      test: function (event) {
        alert('works');
      }
    }
  })