let dice = (max) => {
  return Math.ceil(Math.random() * max)
}

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
        this.hitPoints = Math.min(this.hitPoints - amount + dice(this.regen), this.maxHitPoints())
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

  , create: function(level) {
    if (Math.random() < 0.05) {
      return this.createTree()
    }
    return this.createMonster(level)
  }

  , createTree: function() {
    return {
      interact: function(playerContext) {
        return {newPlayerPosition: playerContext.playerPosition, message: "A tree blocks your path"}
      },
      label: () => "T"
    }
  }

  , createLoot: function(level) {
    let weaponLevel = dice(level/2)
    return weaponLevel > 1 && Math.random() < 0.8 && this.createWeapon(weaponLevel)
  }

  , createWeapon: function(level) {
    let available = true
    return {
      label: () => available ? "?": "",
      interact: function(playerContext) {
        let player = playerContext.player
        if (!available) {
          player.takeDamage(0)
          return {newPlayerPosition: playerContext.destination}
        }
        let [attack, message] = level > player.attack ?
          [level,"You have upgraded your attack to level "+level]
          : [player.attack, "You have no need of a weapon of level "+level]
        player.attack = attack
        available = false
        return {newPlayerPosition: playerContext.destination, message: message}
      }
    }
  }

  , createMonster: function(unroundedLevel) {
    let level = Math.floor(unroundedLevel)
    let sf = this;
    return {
      maxHitPoints: level,
      hitPoints: level,
      attack: level,
      regen: 0,
      dead: function() {
        return this.hitPoints < 1
      },
      interact: function (playerContext) {
        let player = playerContext.player
        if (this.dead()) {
          player.takeDamage(0)
          return {newPlayerPosition: playerContext.destination}
        }
        this.hitPoints -= dice(player.attack)
        player.takeDamage(dice(this.attack))
        if (this.dead()) {
          player.addExperience(level ** 2)
        }
        let loot = this.dead() && sf.createLoot(level)
        return {
          newPlayerPosition: playerContext.playerPosition, replacement: loot,
          message: this.dead() ? "You have vanquished a foe!" : "You have wounded a foe..."
        }
      },
      label: function() {
        if (this.dead()) {
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