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
				// [dialogueID, newQuestID, removeQuestID] no value -> false
				'librarian': [35, false, false],
				'veteran': [34, false, false],
				'smith': [36, false, false],
				'girl1': [37, false, false],
				'girl2': [38, false, false],
				'girl3': [39, false, false],
				'woman2': [40, false, false],
				'botanist': [33, false, false]
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
				// [dialogueID, newQuestID, removeQuestID] no value -> false
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
				// [dialogueID, newQuestID, removeQuestID] no value -> false
				'woman2': [13, 17, false],
				'botanist': [21, 18, false],
				'girl3': [24, 19, false]
			}
		},
		17: {
			silent: false,
			questMessage: 'Find the fishing rod!',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				// [dialogueID, newQuestID, removeQuestID] no value -> false
				'woman2': [13, false, false],
				'fisher': [15, 21, 17]
			}
		},
		18: {
			silent: false,
			questMessage: 'Get the flowers',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				// [dialogueID, newQuestID, removeQuestID] no value -> false
			}
		},
		19: {
			silent: false,
			questMessage: 'Find the doll!',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				// [dialogueID, newQuestID, removeQuestID] no value -> false
			}
		},
		20: {
			silent: false,
			questMessage: 'Return the doll!',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				// [dialogueID, newQuestID, removeQuestID] no value -> false
				'girl3': [25, false, 20]
			}
		},
		21:{
			silent: false,
			questMessage: 'Talk with the smith!',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				// [dialogueID, newQuestID, removeQuestID] no value -> false
				'fisher': [15, false, false],
				'smith': [19, 22, 21],
				'woman2': [13, false, false]
			}
		},
		22:{
			silent: false,
			questMessage: 'Get weed!',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				// [dialogueID, newQuestID, removeQuestID] no value -> false
				'fisher': [15, false, false],
				// Nur zeitweise
				'smith': [41, 23, 22],
				'woman2': [13, false, false],
				
			}
		},
		23:{
			silent: false,
			questMessage: 'Return weed!',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				// [dialogueID, newQuestID, removeQuestID] no value -> false
				'fisher': [15, false, false],
				'smith': [20, 24, 23],
				'woman2': [13, false, false]
			}			
		},
		24:{
			silent: false,
			questMessage: 'Return spear!',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				// [dialogueID, newQuestID, removeQuestID] no value -> false
				'fisher': [16, 25, 24],
				'woman2': [13, false, false]
			}				
		},
		25:{
			silent: false,
			questMessage: 'Return Fishing Rod!',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				// [dialogueID, newQuestID, removeQuestID] no value -> false
				'woman2': [14, 26, 25]
			}				
		},
		26:{
			silent: true,
			questMessage: 'Return Fish!',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				// [dialogueID, newQuestID, removeQuestID] no value -> false
				'fisher': [17, false, 26]
			}				
		},

		// Description
		27:{
			silent: false,
			questMessage: 'Questmessage',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				// [dialogueID, newQuestID, removeQuestID] no value -> false
			}				
		},

		// Description
		28:{
			silent: false,
			questMessage: 'Questmessage',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				// [dialogueID, newQuestID, removeQuestID] no value -> false
			}				
		},

		// Description
		29:{
			silent: false,
			questMessage: 'Questmessage',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				// [dialogueID, newQuestID, removeQuestID] no value -> false
			}				
		},

		// Description
		30:{
			silent: false,
			questMessage: 'Questmessage',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				// [dialogueID, newQuestID, removeQuestID] no value -> false
			}				
		},

		// Description
		31:{
			silent: false,
			questMessage: 'Questmessage',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				// [dialogueID, newQuestID, removeQuestID] no value -> false
			}				
		},

		// Description
		32:{
			silent: false,
			questMessage: 'Questmessage',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				// [dialogueID, newQuestID, removeQuestID] no value -> false
			}				
		},

		// Description
		33:{
			silent: false,
			questMessage: 'Questmessage',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				// [dialogueID, newQuestID, removeQuestID] no value -> false
			}				
		},

		// Description
		34:{
			silent: false,
			questMessage: 'Questmessage',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				// [dialogueID, newQuestID, removeQuestID] no value -> false
			}				
		},

		// Description
		35:{
			silent: false,
			questMessage: 'Questmessage',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				// [dialogueID, newQuestID, removeQuestID] no value -> false
			}				
		},

		// Description
		36:{
			silent: false,
			questMessage: 'Questmessage',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				// [dialogueID, newQuestID, removeQuestID] no value -> false
			}				
		},

		// Description
		37:{
			silent: false,
			questMessage: 'Questmessage',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				// [dialogueID, newQuestID, removeQuestID] no value -> false
			}				
		},

		// Description
		38:{
			silent: false,
			questMessage: 'Questmessage',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				// [dialogueID, newQuestID, removeQuestID] no value -> false
			}				
		},

		// Description
		39:{
			silent: false,
			questMessage: 'Questmessage',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				// [dialogueID, newQuestID, removeQuestID] no value -> false
			}				
		},

		// Talk with the Priest
		40:{
			silent: false,
			questMessage: 'Talk to the priest!',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				// [dialogueID, newQuestID, removeQuestID] no value -> false
				'priest': [30, 41, 40]
			}				
		},

		// Description
		41:{
			silent: false,
			questMessage: 'Enter the temple!',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				// [dialogueID, newQuestID, removeQuestID] no value -> false
				'priest': [30, false, false],
				'woman1': [31, 42, 41],
			}				
		},

		// Description
		42:{
			silent: false,
			questMessage: 'Talk to the oracle!',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				// [dialogueID, newQuestID, removeQuestID] no value -> false
				'oracle': [32, 43, 42]
			}				
		},

		// Description
		43:{
			silent: false,
			questMessage: 'Find and Kill the boss!',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				// [dialogueID, newQuestID, removeQuestID] no value -> false
			}				
		},

		// Description
		44:{
			silent: false,
			questMessage: 'Questmessage',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				// [dialogueID, newQuestID, removeQuestID] no value -> false
			}				
		},

		// Description
		45:{
			silent: false,
			questMessage: 'Questmessage',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				// [dialogueID, newQuestID, removeQuestID] no value -> false
			}				
		},

		// Description
		46:{
			silent: false,
			questMessage: 'Questmessage',

			questKillEnemyType: false,
			questKillEnemyAmount: false,
			questKillEnemyMap: false,
			questDeadEnemies: 0,

			dialogues: {
				// [dialogueID, newQuestID, removeQuestID] no value -> false
			}				
		}
		
		
	}
};
