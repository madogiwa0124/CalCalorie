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
      let sample_image_url = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_165aa1c92ff%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_165aa1c92ff%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2299.4375%22%20y%3D%2296.3375%22%3EImage%20cap%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
      return [
        { name: '散歩',     mets: 3.5, image: 'assets/images/walking.jpg' },
        { name: '自転車',     mets: 4.0, image: 'assets/images/cycle.jpg' },
        { name: '筋トレ', mets: 2.8, image: 'assets/images/kintore.jpg' },
        { name: 'ヨガ',             mets: 3.0, image: 'assets/images/yoga.jpg' },
      ]
    },
  }
})
