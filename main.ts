

// setup:

// set up new sprite kinds:
namespace SpriteKind {
    export const Button = SpriteKind.create() // set up button sprite kind
    export const Arrow = SpriteKind.create()
}

// Variable set up:

    // System Variables:
let tnato: boolean = false // if on team NATO
let twarsaw_Pact: boolean = false //  if on tram Warsaw Pact

let dificulty: number = 0 // hold the level of dificulty
let level: number = 0 // hold what level and part the player is on

let arrowsGoing: boolean = true



// system setup:

    // health Bar setup
let healthBar = statusbars.create(20, 4, StatusBarKind.Health)
healthBar.setColor(0, 0)
healthBar.positionDirection(CollisionDirection.Top)
healthBar.value = 100

let plrHlthBar: boolean = false

function destroyAll(){
    sprites.destroyAllSpritesOfKind(SpriteKind.Button)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Text)
    sprites.destroyAllSpritesOfKind(SpriteKind.Arrow)
    arrowsGoing = false
}


function plrHlth() {
    healthBar.setLabel('HP', 1)
    healthBar.setColor(7, 2)
    plrHlthBar = true
}

function plrHlthOff () {
    healthBar.setLabel('', 0)
    healthBar.setColor(0,0)
    plrHlthBar = false
}

statusbars.onZero(StatusBarKind.Health, function (status: StatusBarSprite) {
    color.setPalette(color.originalPalette)
    scene.setBackgroundColor(12)
    healthBar.value = 100
    plrHlthOff()
    destroyAll()
    scene.centerCameraAt(0, 0)
    tileUtil.unloadTilemap()
    timer.after(100, function() {
        story.showPlayerChoices('Replay', 'Team menue', 'Team select')
        if (story.getLastAnswer() == 'Replay') {
            if (level < 2) {
                console.log('step 1')
                nato1()
            }
        } else if (story.getLastAnswer() == 'Team menue') {
            mainMenue()
        } else {
            mainMenue()
        }

    })

})


// overlaps:

    // player and arrow overlap
sprites.onOverlap(SpriteKind.Player, SpriteKind.Arrow, function (sprite: Sprite, otherSprite: Sprite) {
    console.log(otherSprite)
    otherSprite.destroy()
    healthBar.value -= 35
})


// function to determen the current difficulty
function difclt() {

    story.printText("Select dificulty", 80, 50)
    story.showPlayerChoices("Can I hold you'r hand?", "I got this.", "Bring on the hate!")

    if (story.getLastAnswer() == "Can I hold you'r hand?") {
        dificulty = 1
        console.log('difficulty = 1')
    } else if (story.getLastAnswer() == 'I got this.') {
        dificulty = 2
        console.log('difficulty = 2')
    } else if (story.getLastAnswer() == 'Bring on the hate!'){
        dificulty = 3
        console.log('difficulty = 3')
    } else {
        console.log('Error 404.1: Unkown dificulty')
    }
}  

// main menue set up:
function mainMenue() {

    color.setPalette(color.originalPalette)
    scene.setBackgroundColor(12)

    if (story.getLastAnswer() == 'Team menue' && tnato == true) {
        natoMenue()
    } else if (story.getLastAnswer() == 'Team menue' && twarsaw_Pact == true) {
        warsaw_Pact_Menue()
    } else {
        teamSelect()
    }

    function natoMenue() {

        level = 0

        sprites.destroyAllSpritesOfKind(SpriteKind.Button)
        sprites.destroyAllSpritesOfKind(SpriteKind.Player)
        sprites.destroyAllSpritesOfKind(SpriteKind.Text)


        let setings = sprites.create(assets.image`Settings Gear`, SpriteKind.Button)
        scaling.scaleToPercent(setings, 150, ScaleDirection.Uniformly, ScaleAnchor.Middle)
        setings.setPosition(130, 20)
        let textSprite1 = textsprite.create('Settings', 0, 1)
        textSprite1.setPosition(130, 35)

        let stl = sprites.create(assets.image`stl`, SpriteKind.Button)
        scaling.scaleToPercent(stl, 150, ScaleDirection.Uniformly, ScaleAnchor.Middle)
        stl.setPosition(70, 60)
        let textSprite2 = textsprite.create('Skip to Level', 0, 1)
        textSprite2.setPosition(70, 80)

        let playbutn = sprites.create(assets.image`Play`, SpriteKind.Button)
        scaling.scaleToPercent(playbutn, 150, ScaleDirection.Uniformly, ScaleAnchor.Middle)
        playbutn.setPosition(130, 60)
        let textSprite3 = textsprite.create('Play', 0, 1)
        textSprite3.setPosition(130, 80)

        let abutNATO = sprites.create(assets.image`NATO`, SpriteKind.Button)
        scaling.scaleToPercent(abutNATO, 60, ScaleDirection.Uniformly, ScaleAnchor.Middle)
        abutNATO.setPosition(70, 20)
        let textSprite4 = textsprite.create('About NATO')
        textSprite4.setPosition(70, 35)

        let bcktomain = sprites.create(assets.image`back arow`, SpriteKind.Button)
        bcktomain.setPosition(130, 100)
        let textSprite5 = textsprite.create('Main Menue', 0, 1)
        textSprite5.setPosition(130, 115)

        let cursor = sprites.create(assets.image`Cursor`, SpriteKind.Player)
        controller.moveSprite(cursor, 150, 150)
        cursor.setStayInScreen(true)

        controller.A.onEvent(ControllerButtonEvent.Pressed, function () { // when the a button is presed
            if (cursor.overlapsWith(bcktomain)) { // if the cursur overlaps with the back button
                sprites.destroyAllSpritesOfKind(SpriteKind.Button)
                sprites.destroyAllSpritesOfKind(SpriteKind.Player)
                sprites.destroyAllSpritesOfKind(SpriteKind.Text)
                tnato = false
                mainMenue()
            } else if (cursor.overlapsWith(abutNATO)) {
                game.showLongText(`Founded in April of 1949, The North Atlantic Treaty Organization is an organization consisting of The United Stats, Britan, France, Belgum, Canada, Denmark, Iceland, Italy, Luxembourg, the Netherlands, Norway, and Portugal.

                    Greece, Türkiye, Germany, Spain, Czechia, Hungary, Poland, Bulgaria, Estonia, Latvia, Lithuania, Romania, Slovakia, Slovenia, Albania, Croatia, Montenegro, and North Macedonia later joined the organization.
                
                NATO was founded to "secure peace in Europe, to promote cooperation among its members and to guard their freedom." or in other words, to collectively defend agenst a Soviet(or any other aggressing nation) invasion.`, DialogLayout.Full)
            } else if (cursor.overlapsWith(playbutn)) {
                sprites.destroyAllSpritesOfKind(SpriteKind.Button)
                sprites.destroyAllSpritesOfKind(SpriteKind.Player)
                sprites.destroyAllSpritesOfKind(SpriteKind.Text)
                difclt()
                nato1()
            }
        })
    

    }

    function warsaw_Pact_Menue() {

        sprites.destroyAllSpritesOfKind(SpriteKind.Button)
        sprites.destroyAllSpritesOfKind(SpriteKind.Player)
        sprites.destroyAllSpritesOfKind(SpriteKind.Text)

        let setings = sprites.create(assets.image`Settings Gear`, SpriteKind.Button)
        scaling.scaleToPercent(setings, 150, ScaleDirection.Uniformly, ScaleAnchor.Middle)
        setings.setPosition(130, 20)
        let textSprite1 = textsprite.create('Settings', 0, 1)
        textSprite1.setPosition(130, 35)
    }

    function teamSelect() {

    let nato = sprites.create(assets.image`NATO`, SpriteKind.Button)
    let warsaw_Pact = sprites.create(assets.image`Warsaw Pact`, SpriteKind.Button)
    nato.setPosition(40, 50)
    warsaw_Pact.setPosition(110, 50)
    
    let textSprite1 = textsprite.create('Select Team', 12, 1)
    textSprite1.setKind(SpriteKind.Text)
    textSprite1.setPosition(80, 10)
    
    let textSprite2 = textsprite.create('NATO', 12, 1)
    textSprite2.setKind(SpriteKind.Text)
    textSprite2.setPosition(40, 85)

    let textSprite3 = textsprite.create('Warsaw Pact', 12, 1)
    textSprite3.setKind(SpriteKind.Text)
    textSprite3.setPosition(110, 85)

    let cursor = sprites.create(assets.image`Cursor`, SpriteKind.Player)
    controller.moveSprite(cursor, 150, 150)
    cursor.setStayInScreen(true)

    controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
        if (cursor.overlapsWith(nato)) {
            tnato = true
            console.log('NATO')
            natoMenue()
        } else if (cursor.overlapsWith(warsaw_Pact)) {
            twarsaw_Pact = true
            console.log('Warsaw Pact')
            warsaw_Pact_Menue()
        }
    })
    }

}



// execution set up
function nato1() {
    console.log(level)

    if (level <= 1) {
        console.log('step 2')
        nato1_part1()
    } else if (level == 1.2) {
        nato1_part2()
    }

    function nato1_part1() {
        level = 1

        let inSpikes = false

        game.showLongText(`The year is 1969 and it is the hight of the Vietnamese War.
            You are a Green Beret (SF) Sargent named Maxton Knudsen. Your current mission is to infultrate a near by guerilla camp, steel information on their next attack, and get out alive.
        
            good luck, an De Oppresso Liber! (To free the opresed (The Green Berets motto))`, DialogLayout.Full)


        color.setPalette(color.Arcade)
        tiles.setCurrentTilemap(tilemap`NATO1 TileMap`)

        game.splash('Part 1: Find the Camp')

        plrHlth()


        let knudsen = sprites.create(assets.image`Green man 1`, SpriteKind.Player)
        controller.moveSprite(knudsen, 100, 100)
        scene.cameraFollowSprite(knudsen)
        tiles.placeOnTile(knudsen, tiles.getTileLocation(10, 10))

        scene.onOverlapTile(SpriteKind.Player, assets.tile`Poop Stick Spawn tile`, function (sprite: Sprite, location: tiles.Location) {
            if (inSpikes == false) {
                inSpikes = true
                healthBar.value -= 35

                if (healthBar.value > 0) {
                    tiles.placeOnTile(knudsen, location)
                    tiles.setTileAt(location, assets.tile`Poop Stick Tile`)
                    controller.moveSprite(knudsen, 0, 0)

                    timer.background(function () {
                        story.spriteSayText(knudsen, 'Ahh! Poop Sticks!')
                    })


                    timer.debounce("action", 1000, function () {

                        controller.moveSprite(knudsen, 100, 100)

                        pause(3000)
                        inSpikes = false
                    })
                } else {
                    inSpikes = false
                }

            }
        })


        scene.onOverlapTile(SpriteKind.Player, assets.tile`Poop Stick Tile`, function (sprite: Sprite, location: tiles.Location) {


            if (inSpikes == false) {

                inSpikes = true

                healthBar.value -= 35

                if (healthBar.value > 0) {
                    tiles.placeOnTile(knudsen, location)
                    controller.moveSprite(knudsen, 0, 0)

                    timer.background(function () {
                        story.spriteSayText(knudsen, 'AGH! Not again!')

                    })

                    timer.after(1000, function () {
                        controller.moveSprite(knudsen, 100, 100)
                        pause(3000)
                        inSpikes = false
                    })
                }
            }
        })
        scene.onOverlapTile(SpriteKind.Player, assets.tile`NATO 1 Cave`, function (sprite: Sprite, location: tiles.Location) {
            game.splash('Part 2; Caves')
            nato1_part2()
        })
    }

    function nato1_part2() {

        plrHlth()

        level = 1.2

        color.setColor(10, color.rgb(0, 0, 0))

        tiles.setCurrentTilemap(tilemap`level2`)

        // player setup
        sprites.destroyAllSpritesOfKind(SpriteKind.Player)
        let knudsen = sprites.create(assets.image`Green man 1`, SpriteKind.Player)
        controller.moveSprite(knudsen, 100, 100)
        scene.cameraFollowSprite(knudsen)
        tiles.placeOnTile(knudsen, tiles.getTileLocation(2, 2))

        arrowsGoing = true
        let arrowDelay = 400
        let arrowVlsty = 200

        // arrow shooters
        timer.background(function () {
            while (arrowsGoing == true) {



                let arrow = sprites.create(assets.image`up shoot arrow`, SpriteKind.Arrow)
                tiles.placeOnTile(arrow, tiles.getTileLocation(38, 23))
                arrow.setVelocity(0, -arrowVlsty)

                pause(arrowDelay)
                arrow.destroy()

                let arrow2 = sprites.create(assets.image`down shoot arrow`, SpriteKind.Arrow)
                tiles.placeOnTile(arrow2, tiles.getTileLocation(36, 19))
                arrow2.setVelocity(0, arrowVlsty)

                let arrow3 = sprites.create(assets.image`down shoot arrow`, SpriteKind.Arrow)
                tiles.placeOnTile(arrow3, tiles.getTileLocation(40, 19))
                arrow3.setVelocity(0, arrowVlsty)

                pause(arrowDelay)
                arrow2.destroy()
                arrow3.destroy()

            }
        })



        // wall lever
        scene.onHitWall(SpriteKind.Player, function (sprite: Sprite, location: tiles.Location) {


            if (tiles.tileImageAtLocation(location) == assets.tile`myTile16`) {

                tiles.setTileAt(location, assets.tile`myTile17`)

                tileUtil.centerCameraOnTile(tiles.getTileLocation(25, 40))

                tiles.setWallAt(tiles.getTileLocation(24, 40), false)
                tiles.setWallAt(tiles.getTileLocation(25, 40), false)
                tiles.setWallAt(tiles.getTileLocation(26, 40), false)

                timer.after(700, function () {
                    tiles.setTileAt(tiles.getTileLocation(24, 40), assets.tile`myTile23`)
                    scene.cameraShake(4, 400)

                    timer.after(700, function () {
                        tiles.setTileAt(tiles.getTileLocation(25, 40), assets.tile`myTile23`)
                        scene.cameraShake(4, 400)

                        timer.after(700, function () {
                            tiles.setTileAt(tiles.getTileLocation(26, 40), assets.tile`myTile23`)
                            scene.cameraShake(4, 400)

                            timer.after(720, function () {
                                scene.cameraFollowSprite(knudsen)
                            })
                        })
                    })

                })


            } else if (tiles.tileImageAtLocation(location) == assets.tile`Arrow Lever`) {
                tiles.setTileAt(location, assets.tile`myTile17`)
                arrowsGoing = false
            }
        })

        // when the player goes into the tunnel
        scene.onOverlapTile(SpriteKind.Player, assets.tile`brick tunnel entrance`, function (sprite: Sprite, location: tiles.Location) {
            color.setColor(10, color.rgb(145, 70, 61))
        })

        // when the player exits the tunnel
        scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile32`, function (sprite: Sprite, location: tiles.Location) {
            color.setColor(10, color.rgb(0, 0, 0))
            tiles.setWallAt(tiles.getTileLocation(34, 51), true)
        })

        // tripwire script
        scene.onOverlapTile(SpriteKind.Player, assets.tile`nato1 tripwire`, function (sprite: Sprite, location: tiles.Location) {
            sprites.destroy(knudsen)
            scene.cameraShake(4, 3000)
            let mySprite: Sprite = null
            for (let index = 0; index < 50; index++) {
                mySprite = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Player)
                tiles.placeOnTile(mySprite, tiles.getTileLocation(randint(27, 36), randint(48, 50)))
            }
            sprites.destroyAllSpritesOfKind(SpriteKind.Player, effects.fire, 2000)

            timer.after(3000, function () {
                game.over(false)
            })

        })

    }
}

mainMenue()
