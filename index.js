var app = new Vue({
  el: '#app',
  data: {
    message: "hello"
  },
  mounted() {
    axios.get("./json_data/dp_a_all.json")
      .then(response => {
        this.message = response.data
        console.log(response.data)
      })
  },
})

