export default {
	quests: {

		// Not Set
		1: {
			silent: false,
			questMessage: '',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {

			} 
		},

		// Branch falls down
		2: {
			silent: true,
			questMessage: '',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				
			} 
		},

		// First Lucy Dialogue
		3: {
			silent: false,
			questMessage: 'Talk to Lucy!',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				
			} 
		},

		// Dash Tutorial
		4: {
			silent: false,
			questMessage: 'Try to dash!',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {

			} 
		},

		// Dash Try it again!
		5: {
			silent: false,
			questMessage: 'Great! Try it again!',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				
			}
		},

		// Lucy Intro Forest
		6: {
			silent: false,
			questMessage: 'Find the village!',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				
			}
		},

		// Find the Box
		7: {
			silent: false,
			questMessage: 'Search for a helpful item',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				
			}
		},

		// Open the box
		8: {
			silent: false,
			questMessage: 'Try to open the box',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				
			}
		},

		// Go back to the bridge
		9: {
			silent: false,
			questMessage: 'Go back to the bridge!',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				
			}
		},

		// Find the village!
		10: {
			silent: false,
			questMessage: 'Find the village!',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				
			}
		},

		// Tutorial Kill All Seeds
		11: {
			silent: false,
			questMessage: 'Kill all enemies!',

			questKillEnemyType: 'seed',
			questKillEnemyAmount: 3,
			questKillEnemyMap: 'map11',
			questDeadEnemies: 0,

			fightFinishAddQuestID: 12,

			dialogues: {
				
			}
		},
		12: {
			silent: false,
			questMessage: 'Find the village!',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				
			}
		},
		13: {
			silent: false,
			questMessage: 'Enter the village!',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				// [dialogueID, newQuestID, removeQuestID] no value -> false
				'priest': [11, 14, 13]
			}
		},
		14: {
			silent: false,
			questMessage: 'Kill all enemies!',

			questKillEnemyType: 'seed',
			questKillEnemyAmount: 9,
			questKillEnemyMap: 'map2',
			questDeadEnemies: 0,

			fightFinishAddQuestID: 15,

			dialogues: {
				
			}
		},
		15: {
			silent: false,
			questMessage: 'Talk to the priest!',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				'priest': [12, 16, 15]
			}
		},
		16: {
			silent: false,
			questMessage: 'Talk to the villager!',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {

			}
		},
		17: {
			silent: false,
			questMessage: 'Defaulttext',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
			
			}
		},
		18: {
			silent: false,
			questMessage: 'Defaulttext',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {

			}
		},
		19: {
			silent: false,
			questMessage: 'Defaulttext',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				
			}
		}
		
		
	}
};
