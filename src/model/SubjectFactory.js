import React from "react";

let dice = (max) => {
  return Math.ceil(Math.random() * max)
}

let sqrt = (input) => {return Math.floor(Math.sqrt(input))}

let damage = function(amount) {
  this.hitPoints = Math.min(this.hitPoints - Math.round(amount/dice(this.defense)) + dice(this.regen), this.maxHitPoints())
}

let conditions = [
  <div>&#x1f635;</div>
  ,<div>&#x1f915;</div>
  ,<div>&#x1f641;</div>
  ,<div>&#x1f610;</div>
  ,<div>&#x1f642;</div>
  ,<div>&#x1f600;</div>
]

let result = {
  newHero: (initialXp) => {
    return {
      xp: initialXp,
      addExperience: function(moreXp) {
        this.xp += moreXp
      },
      maxHitPoints: function() {
        return sqrt(this.xp)
      },
      takeDamage: damage,
      isAlive: function() {
        return this.hitPoints > 0
      },
      nextLevel: function() {
        return (this.maxHitPoints()+1) ** 2
      },
      label: function() {
        let index = Math.ceil((conditions.length-1) * this.hitPoints / this.maxHitPoints())
        return conditions[Math.max(0, index)];
      },
      reset: function() {
        this.defense = 1
        this.attack = 1
        this.regen = 1
        this.xp = 1
        this.hitPoints = 1
      },
    }
  }

  , create: function(level) {
    if (Math.random() < 0.01 * level**2) {
      return this.createTree()
    }
    return this.createMonster(level)
  }

  , createTree: function() {
    return {
      interact: function(playerContext) {
        return {newPlayerPosition: playerContext.playerPosition, message: "A tree blocks your path"}
      },
      label: () => <div>&#x1f332;</div>
    }
  }

  , createLoot: function(level) {
    let lootLevel = dice(level/2)
    return this.createConsumable(lootLevel, this.weaponDef)
      || this.createConsumable(lootLevel-1, this.armorDef)
      || this.createConsumable(Math.floor(lootLevel-2), this.regenDef)
  }

  , createConsumable: function(level, consumeData) {
    if (Math.random() > 0.4 || level < 2) {
      return false;
    }
    let available = true
    return {
      label: () => available ? "?"+level: "",
      interact: function(playerContext) {
        let player = playerContext.player
        if (!available) {
          player.takeDamage(0)
          return {newPlayerPosition: playerContext.destination}
        }
        let currentValue = player[consumeData.attribute];
        let [attributeValue, message] = level > currentValue ?
          [level,`You have upgraded your ${consumeData.description} to level `+level]
          : [currentValue, `You have no need for ${consumeData.description} of level `+level]
        player[consumeData.attribute] = attributeValue
        available = false
        return {newPlayerPosition: playerContext.destination, message: message}
      }
    }
  }

  , weaponDef: {attribute: 'attack', description: 'weapon'}
  , armorDef: {attribute: 'defense', description: 'armor'}
  , regenDef: {attribute: 'regen', description: 'regeneration'}

  , createMonster: function(unroundedLevel) {
    let level = Math.floor(unroundedLevel)
    let sf = this;
    return {
      maxHitPoints: () => level,
      hitPoints: level,
      attack: level,
      regen: 0,
      defense: 1,
      dead: function() {
        return this.hitPoints < 1
      },
      takeDamage: damage,
      interact: function (playerContext) {
        let player = playerContext.player
        if (this.dead()) {
          player.takeDamage(0)
          return {newPlayerPosition: playerContext.destination}
        }
        this.takeDamage(dice(player.attack))
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
        if (this.hitPoints < this.maxHitPoints()) {
          return `${this.hitPoints}/${this.maxHitPoints()}`
        }
        return this.maxHitPoints()
      }
    }
  }
}

export default result