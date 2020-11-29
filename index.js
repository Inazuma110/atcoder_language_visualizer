var list = new Vue({
  el: '#list',
  data: {
    list: null,
    active: false,
    selected_prob: null,
    prob_id: null,
    idx: null,
    langs: null,
    // prob_id: this.idx != -1 && this.list != undefined ? this.list[this.idx] : null,
  },
  mounted() {
    axios.get("https://kenkoooo.com/atcoder/resources/problems.json")
      .then(response => {
        this.list = response.data
        this.selected_prob = this.list[0]
      })
  },
  methods: {
    get_langs: function(event){
      var path = `./json_data/${this.selected_prob['id']}_all.json`
      axios.get(path)
        .then(response => {
          this.langs = response.data
        })
      this.render()
    },
    render: function(event){
      var ctx = document.getElementById("myChart");
      // this.langs = {'a':1, 'b':2};
      langs = Object.keys(this.langs)
      vals = Object.values(this.langs)
      var chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: langs,
          datasets:[{
            data: vals,
          }]
        },
      });
    },
  }
})

var is_all = new Vue({
  el: '#is_all',
  data: {
    is_all: true,
  },
})

var app = new Vue({
  el: '#app',
  data: {
    message: "hello",
    problem_id: false,
  },
})

