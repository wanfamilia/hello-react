let result = {
  newHero: (initialXp) => {
    return {
      xp: initialXp,
      addExperience: (moreXp) => {
        this.xp += moreXp
      },
      maxHitPoints: function() {
        return Math.floor(Math.sqrt(this.xp))
      },
      hitPoints: Math.floor(Math.sqrt(initialXp)),
      attack: 1,
      regen: 1,
    }
  }

  , create: (input) => {
    let level = Math.floor(input)
    return {
      maxHitPoints: level,
      hitPoints: level,
      attack: level,
      regen: 0,
      label: function() {return this.hitPoints > 0 ? this.hitPoints : ""}
    }
  }


}

export default result