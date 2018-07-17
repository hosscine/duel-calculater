Vue.component('damage-log', {
  props: ['damageHistory'],
  template: '<p>{{damageHistory.value}}</p>'
});

let lifeCalculater = {
  el: "#life-calculater",
  template: `
  <div>
    <p  v-bind:style="style">ライフ {{ life }}</p>
    <input v-model="current" v-on:keyup.enter="submitDamage" v-on:keyup.up="revertDamage"></input>
    <damage-log v-for="damage in damageHistory" :damage-history="damage" v-bind:key="damage.index"></damage-log>
  </div>
  `,
  data: {
    current: '',
    life: 8000,
    damageHistory: []
  },

  computed: {
    isValid: function() {
      return ("/2" === this.current || /\+([0-9]+)/.test(this.current) || !isNaN(this.current)) &&
        this.current !== "";
    },

    style: function() {
      return {
        background: this.color,
        color: "white",
        textShadow: "1px 1px 2px"
      }
    },

    color: function() {
      if (this.life >= 6000) return "#0b9a1d"
      else if (this.life >= 4000) return "#add611"
      else if (this.life >= 2000) return "#e2de21"
      else if (this.life >= 0) return "#f17012"
      else return "#ff1b1b"
    }
  },

  methods: {
    handleClick: function() {
      alert(this.current)
    },

    submitDamage: function() {
      if (!this.isValid) {
        alert("非有効なダメージ")
        this.current = ""
        return
      }

      let damage = this.parseDamage(this.current)
      this.damageHistory.push({
        index: this.damageHistory.length,
        value: damage
      })
      this.life -= damage
      this.current = ""
    },

    parseDamage: function(n) {
      if (/^[0-9]+$/.test(n)) return Number(n)
      else if(n === "/2") return this.life / 2
      else return -/^\+([0-9]+)$/.exec(n)[1]
    },

    revertDamage: function() {
      if (this.damageHistory.length === 0) return
      this.life += this.damageHistory.pop().value
    }
  }
}

vueInstanciate(lifeCalculater, "#life-calculater1")
vueInstanciate(lifeCalculater, "#life-calculater2")
vueInstanciate(lifeCalculater, "#life-calculater3")
vueInstanciate(lifeCalculater, "#life-calculater4")
