
Vue.component('work-card', {
  props: ['name','image', 'mets', 'weight', 'consumedCalories'],
  methods: {
    time: function () {
      // 運動時間(h) ＝ 消費カロリー(kcal) / (メッツ * 体重kg * 1.05)
      let result = this.consumedCalories / (this.mets * this.weight * 1.05)
      return Math.round(result * 60)
    },
  },
  template:
    `
    <div class="card">
      <img class="card-img-top" :src="image" alt="Card image cap">
      <div class="card-body">
        {{ name }} {{ time() }}分
      </div>
    </div>
    `
})
