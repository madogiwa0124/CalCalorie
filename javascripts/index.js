let bodyForm = new Vue({
  el: '#body-form',
  data: {
    sex: 'woman',
    age: null,
    height: null,
    weight: null,
    intakeCalorie: null,
    basalMetabolism: 0,
  },
  watch: {
    basalMetabolism: function () {
      localStorage.setItem('bodyForm', this.valusJson())
    },
    intakeCalorie: function () {
      localStorage.setItem('bodyForm', this.valusJson())
    }
  },
  created: function () {
    let values = JSON.parse(localStorage.getItem('bodyForm'))
    for (key in values) {
      eval(`this.${key} = values.${key}`)
    }
  },
  methods: {
    valusJson: function () {
      return JSON.stringify({
        sex: this.sex,
        age: this.age,
        height: this.height,
        weight: this.weight,
        intakeCalorie: this.intakeCalorie,
        basalMetabolism: this.basalMetabolism
      })
    },
    // ハリス・ベネディクト方程式(改良版)で基礎代謝を計算
    // 参考：https://keisan.casio.jp/exec/system/1161228736
    calcBasalMetabolism: function () {
      if (this.sex == 'woman') {
        // 女性： 9.247×体重kg＋3.098×身長cm−4.33×年齢+447.593
        return 9.247 * this.weight + 3.098 * this.height - 4.33 * this.age + 447.593
      } else {
         // 男性： 13.397×体重kg＋4.799×身長cm−5.677×年齢+88.362
        return 13.397 * this.weight + 4.799 * this.height - 5.677 * this.age + 88.362
      }
    },
    getBasalMetabolism: function () {
      result = this.calcBasalMetabolism()
      this.basalMetabolism = Math.round(result)
      return this.basalMetabolism
    }
  }
})

let bodyResult = new Vue({
  el: '#body-result',
  methods: {
    consumedCalories: function () {
      return bodyForm.intakeCalorie - bodyForm.basalMetabolism
    },
    weight: function () {
      return bodyForm.weight
    },
    // http://www.nibiohn.go.jp/files/2011mets.pdf
    workList: function () {
      return [
        { name: '散歩',     mets: 3.5, image: 'assets/images/walking.jpg' },
        { name: '自転車',     mets: 4.0, image: 'assets/images/cycle.jpg' },
        { name: '筋トレ', mets: 2.8, image: 'assets/images/kintore.jpg' },
        { name: 'ヨガ',             mets: 3.0, image: 'assets/images/yoga.jpg' },
      ]
    },
  }
})
