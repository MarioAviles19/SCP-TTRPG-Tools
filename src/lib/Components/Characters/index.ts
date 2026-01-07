export const NPC = {
  "name": "Captain Alric Thornwatch",
  "size": "Medium",
  "type": "humanoid (human)",
  "alignment": "Lawful Neutral",

  "armorClass": 18,
  "hitPoints": 85,
  "hitDice": "10d8 + 40",

  "speed": {
    "walk": 30
  },

  "abilities": {
    "str": 18,
    "dex": 14,
    "con": 18,
    "int": 12,
    "wis": 13,
    "cha": 15
  },

  "savingThrows": {
    "str": 7,
    "con": 7,
    "wis": 4
  },

  "skills": {
    "athletics": 7,
    "intimidation": 5,
    "perception": 4
  },

  "senses": [
    "passive Perception 14"
  ],

  "languages": [
    "Common",
    "Dwarvish"
  ],

  "challengeRating": 5,
  "proficiencyBonus": 3,

  "traits": [
    {
      "name": "Brave Commander",
      "description": "Captain Thornwatch has advantage on saving throws against being frightened."
    },
    {
      "name": "Tactical Presence",
      "description": "Allied creatures within 10 feet of the captain gain a +1 bonus to attack rolls."
    }
  ],

  "actions": [
    {
      "name": "Multiattack",
      "description": "The captain makes two melee attacks."
    },
    {
      "name": "Longsword",
      "description": "Melee Weapon Attack",
      "attackBonus": 7,
      "damage": "1d8 + 4"
    },
    {
      "name": "Heavy Crossbow",
      "description": "Ranged Weapon Attack",
      "attackBonus": 5,
      "damage": "1d10 + 2"
    }
  ],

  "reactions": [
    {
      "name": "Parry",
      "description": "The captain adds 3 to its AC against one melee attack that would hit it."
    }
  ],

  "legendaryActions": [
    {
      "name": "Command Ally",
      "description": "One allied creature within 30 feet can immediately use its reaction to make one weapon attack."
    }
  ],

  "source": "Homebrew",
  "notes": "Often encountered leading city watch patrols or defending strategic locations."
}