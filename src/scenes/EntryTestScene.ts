import Phaser from "phaser";

export default class EntryTestScene extends Phaser.Scene {
  private platforms?: Phaser.Physics.Arcade.StaticGroup;
  private player?: Phaser.Physics.Arcade.Sprite;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super("entry-test");
  }

  preload() {
    this.load.image("land", "assets/land.png");
    this.load.image("floatLand", "assets/floating-land.png");
    this.load.spritesheet("character", "assets/character.png", {
      frameWidth: 46.8,
      frameHeight: 65,
    });
  }

  create() {
    this.platforms = this.physics.add.staticGroup();
    const land = this.platforms.create(
      400,
      500,
      "land"
    ) as Phaser.Physics.Arcade.Sprite;
    land.setScale(0.3).refreshBody();

    const floatLandLeft = this.platforms.create(250, 220, "floatLand");
    floatLandLeft.setScale(0.08).refreshBody();
    const floatLandRight = this.platforms.create(550, 320, "floatLand");
    floatLandRight.setScale(0.08).refreshBody();

    this.player = this.physics.add.sprite(100, 400, "character");
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("character", {
        start: 3,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "character", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("character", {
        start: 0,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.physics.add.collider(this.player, this.platforms);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(time: number, delta: number): void {
    if (!this.cursors) {
      return;
    }
    if (this.cursors.left?.isDown) {
      this.player?.setVelocityX(-160);
      this.player?.anims.play("left", true);
    } else if (this.cursors.right?.isDown) {
      this.player?.setVelocityX(160);
      this.player?.anims.play("right", true);
    } else {
      this.player?.setVelocityX(0);
      this.player?.anims.play("turn");
    }
    if (this.cursors.up?.isDown && this.player?.body.touching.down) {
      this.player?.setVelocityY(-330);
    }
  }
}
