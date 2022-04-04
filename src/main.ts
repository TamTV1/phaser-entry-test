import Phaser from 'phaser'

import EntryTestScene from './scenes/EntryTestScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 }
		}
	},
	scene: [EntryTestScene]
}

export default new Phaser.Game(config)
