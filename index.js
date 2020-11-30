function dict_sort(obj){
  var items = Object.keys(obj).map(function(key) {
    return [key, obj[key]];
  });

  // Sort the array based on the second element
  items.sort(function(first, second) {
    return second[1] - first[1];
  });
  return items;
}

function parse_dict(obj){
  d = {"other": 0}
  for(var i = 0; i < obj.length; i++){
    if(i < 10) d[obj[i][0]] = obj[i][1];
    else d["other"] += obj[i][1];
  }
  return d;
}


var list = new Vue({
  el: '#list',
  data: {
    list: null,
    filtered_list: null,
    query: null,
    selected_prob: null,
    prob_id: null,
    idx: null,
    langs: true,
    chart: null,
  },
  mounted() {
    axios.get("https://kenkoooo.com/atcoder/resources/problems.json")
      .then(response => {
        this.list = response.data
      })
  },
  methods: {
    search: function(){
      var options = {
        threshold: 0.1,
        keys: [
          "id",
          "contet_id",
          "title",
        ]
      };
      var fuse = new Fuse(this.list, options);
      var res = fuse.search(this.query);
      this.filtered_list = res;
      console.log(Object.keys(this.filtered_list[0].item));
    },
    get_langs: function(){
      if(!this.selected_prob){
        console.log("Error")
        return;
      }
      var path = `./json_data/${this.selected_prob['id']}_all.json`
      axios.get(path)
        .then(response => {
          this.langs = response.data
        })
    },

    render: function(event){
      if(this.chart){ this.chart.destroy(); }
      var ctx = document.getElementById("myChart");
      this.langs = dict_sort(this.langs)
      this.langs = parse_dict(this.langs)
      langs = Object.keys(this.langs)
      vals = Object.values(this.langs)
      this.chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: langs,
          datasets:[{
            data: vals,
          }]
        },
        options: {
          plugins: {
            colorschemes:{
              scheme: 'brewer.Paired12'
            }
          }
        }
      });
    },
  },
  components: {
    list,
  },
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

