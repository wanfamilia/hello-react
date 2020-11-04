import React from "react";

let dice = (max) => {
  return Math.ceil(Math.random() * max)
}

let maxDice = (sides) => Math.floor(Math.random()+1/sides)

let sqrt = (input) => {return Math.floor(Math.sqrt(input))}

let damage = function(amount) {
  let absorb = dice(Math.floor(this.defense / 2));
  let damaged = Math.min(this.hitPoints - amount + absorb, this.maxHitPoints());
  let fractionMissing = 1 - damaged / this.maxHitPoints()
  this.hitPoints = damaged + dice(this.regen  * fractionMissing)
}

let scale = (slow, num) => (1 + slow) / (num + slow)

let scaler = (slow) => {
  let [min, max] = [0.25, 0.95]
  let delta = max - min;
  return (num) => {
    return (max - delta * scale(slow, num)).toFixed(2)
  }
}

let itemScaler = scaler(6)

let conditions = ["\u{1f635}","\u{1f915}","\u{1f641}","\u{1f610}","\u{1f642}","\u{1f600}"]
let monsterScaler = scaler(6)
let hpScale = 2

let result = {
  newHero: (initialXp) => {
    return {
      xp: initialXp,
      addExperience: function(moreXp) {
        this.xp += moreXp
      },
      maxHitPoints: function() {
        return Math.floor(hpScale * this.xp ** (1/3))
      },
      takeDamage: damage,
      isAlive: function() {
        return this.hitPoints > 0
      },
      nextLevel: function() {
        let level = Math.floor(this.xp ** (1/3))
        return (level+1) ** 3
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
        this.hitPoints = hpScale
      },
    }
  }

  , create: function(level) {
    return (maxDice(20) && this.createTree())
      || (maxDice(10) && this.createLoot(level))
      || this.createMonster(level)
  }

  , createTree: function() {
    return {
      interact: function(playerContext) {
        return {newPlayerPosition: playerContext.playerPosition, message: "A tree blocks your path"}
      },
      label: () => "\u{1f332}"
    }
  }

  , createLoot: function(level) {
    return this.createConsumable(4, dice(level), this.weaponDef)
      || this.createConsumable(4, dice(level * 2 / 3), this.armorDef)
      || this.createConsumable(2, dice(level / 3), this.regenDef)
  }

  , createConsumable: function(rarity, level, consumeData) {
    if (maxDice(rarity) < 1 || level < 2) {
      return false;
    }
    let available = true
    let style = {fontSize: itemScaler(level) + "em"}

    return {
      label: () => available ? <div style={style}>{consumeData.label()}</div> : "",
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

  , weaponDef: {attribute: 'attack', description: 'weapon', label: () => "\u2694"}
  , armorDef: {attribute: 'defense', description: 'armor', label: () => "\u{1f6e1}"}
  , regenDef: {attribute: 'regen', description: 'regeneration', label: () => "\u2764" }

  , createMonster: function(unroundedLevel) {
    let level = Math.floor(unroundedLevel)
    let sf = this;
    return {
      maxHitPoints: () => level * hpScale,
      hitPoints: level * hpScale,
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
          player.addExperience(hpScale * level ** 2)
        }
        let loot = this.dead() && maxDice(5) && sf.createLoot(level)
        return {
          newPlayerPosition: playerContext.playerPosition, replacement: loot,
          message: this.dead() ? "You have vanquished a foe!" : "You have wounded a foe..."
        }
      },
      label: function() {
        let style = {
          fontSize: monsterScaler(level)+"em",
          opacity: Math.max(this.hitPoints, 0)/Math.max(1,this.maxHitPoints())
        }
        return <div style={style}>&#x1f41e;</div>
      }
    }
  }
}

export default result