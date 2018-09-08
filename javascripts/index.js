let bodyForm = new Vue({
  el: '#body-form',
  data: {
    sex: 'woman',
    age: null,
    height: null,
    weight: null,
    intakeCalorie: null
  },
  methods: {
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
    BasalMetabolism: function () {
      result = this.calcBasalMetabolism()
      return Math.round(result)
    }
  }
})
