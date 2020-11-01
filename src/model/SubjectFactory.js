let result = {
  newHero: (initialXp) => {
    return {
      xp: initialXp,
      addExperience: function(moreXp) {
        this.xp += moreXp
      },
      maxHitPoints: function() {
        return Math.floor(Math.sqrt(this.xp))
      },
      takeDamage: function(amount) {
        this.hitPoints = Math.min(this.hitPoints - amount + this.regen, this.maxHitPoints())
        this.addExperience(amount)
      },
      isAlive: function() {
        return this.hitPoints > 0
      },
      nextLevel: function() {
        return (this.maxHitPoints()+1) ** 2
      },
      hitPoints: Math.floor(Math.sqrt(initialXp)),
      attack: 1,
      regen: 1
    }
  }

  , create: (input) => {
    let level = Math.floor(input)
    return {
      maxHitPoints: level,
      hitPoints: level,
      attack: level,
      regen: 0,
      interact: function (input) {
        let player = input.player
        if (this.hitPoints < 1) {
          player.takeDamage(0)
          return {newPlayerPosition: input.destination}
        }
        this.hitPoints -= player.attack
        player.takeDamage(this.attack)
        return {newPlayerPosition: input.playerPosition}
      },
      label: function() {
        if (this.hitPoints < 1) {
          return ""
        }
        if (this.hitPoints < this.maxHitPoints) {
          return `${this.hitPoints}/${this.maxHitPoints}`
        }
        return this.maxHitPoints
      }
    }
  }
}

export default result