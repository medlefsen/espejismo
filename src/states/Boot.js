import Phaser from 'phaser'
import WebFont from 'webfontloader'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  preload () {
    WebFont.load({
      google: {
        families: ['Sancreek']
      },
      active: ()=>{this.fontsReady = true}
    })
    this.fontsReady = true

    var loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    var loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([loaderBg, loaderBar])
    this.load.setPreloadSprite(loaderBar)
    this.load.onLoadComplete.addOnce( () => {
      this.loadReady = true
    });

    this.game.playRandSound = (name,volume)=>{
      if(volume == null) volume = 0.5
      const clip = this.game.rnd.between(1,this.game.audioNumClips[name])
      let audio = this.game.sound.play(name+clip,volume)
    }


    // Load assets
    this.loadAudio('song','mp3')
    this.loadAudio('songAltered','mp3')
    this.loadAudio('thunder','mp3')
    this.loadAudioGroup('hit',5)

    this.loadImage('daughter')
    this.loadImage('background')
    this.loadImage('night_background')
    this.loadImage('house')
    this.loadImage('house_path')
    this.loadImage('house_upper_path')
    this.loadImage('lamppost')
    this.loadImage('speech_bubble')
    this.loadImage('heart')
    this.loadImage('grass_1')
    this.loadImage('grass_2')
    this.loadImage('tree')
    this.loadImage('title')
    this.loadImage('ground')
    this.loadImage('bridge_left')
    this.loadImage('bridge_right')
    this.loadImage('bank_left')
    this.loadImage('bank_right')
    this.loadImage('log')
    this.loadImage('dead_tree')
    this.loadImage('forest_ground')
    this.loadImage('forest_background')
    this.loadImage('forest_midground')
    this.loadImage('cornfield_ground')
    this.loadImage('cornfield_background')
    this.loadImage('cornfield_midground')
    this.loadImage('corn_stalk')
    this.loadImage('scarecrow_post')
    this.loadImage('arrow_up')
    this.loadImage('arrow_down')
    this.loadImage('arrow_left')
    this.loadImage('arrow_right')
    this.loadImage('dragon')

    this.loadPhysics('objects')

    this.loadCharacter('man')
    this.loadCharacter('thistle_monster')
    this.loadCharacter('scarecrow')
  }

  render() {
    if(this.loadReady && this.fontsReady) {
      this.game.song1 = this.add.audio('song',1,true)
      this.game.song2 = this.add.audio('songAltered',0,true)
      this.game.song1.play()
      this.game.song2.play()
      this.state.start('Splash')
    }
  }

  loadImage(name,ext = 'png') {
    this.load.image(name,`./assets/images/${name}.${ext}`)
  }

  loadAudio(name,ext = 'wav') {
    this.load.audio(name,`./assets/audio/${name}.${ext}`)
  }

  loadAudioGroup(name,num,ext = 'wav') {
    if(this.game.audioNumClips == null) {
      this.game.audioNumClips = {}
    }
    this.game.audioNumClips[name] = num
    for(let i = 1;i <= num; ++i) {
      this.load.audio(name+i,`./assets/audio/${name}_${i}.${ext}`)
    }
  }


  loadCharacter(name) {
    this.loadSprite(name)
    this.loadPhysics(name)
  }

  loadSprite(name) {
    this.load.atlasJSONHash(name, 'assets/animation/'+name+'.png', 'assets/animation/'+name+'.json')
  }

  loadPhysics(name) {
    this.game.load.physics(name,'assets/physics/'+name+'.json')
  }
}
