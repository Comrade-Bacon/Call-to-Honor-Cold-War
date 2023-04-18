


// setup:

// set up new sprite kinds:
namespace SpriteKind {
    export const Button = SpriteKind.create() // set up button sprite kind
}

// Variable set up:

// System Variables:
let tnato = false // if on team NATO
let twarsaw_Pact = false // if on tram Warsaw Pact


// main menue set up:
function mainMenue() {

    function natoMenue() {

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


    scene.setBackgroundColor(12)

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

// execution set up
function nato1() {

    let inSpikes = false

    game.showLongText(`The year is 1969 and it is the hight of the Vietnamese War.
    
    You are a Green Beret Sargent named Maxton Knudsen. Your current mission is to infultrate a near by guerilla camp, steel information on their next attack, and get out alive.
    
    good luck, an De Oppresso Liber! (To free the opresed (The Green berets motto))`, DialogLayout.Full)


    color.setPalette(color.Arcade)
    tiles.setCurrentTilemap(tilemap`NATO1 TileMap`)

    game.splash('Part 1: Find the Camp')

    let healthBar = statusbars.create(20, 4, StatusBarKind.Health)

    healthBar.positionDirection(CollisionDirection.Top)
    healthBar.setLabel('HP', 1)



    let knudsen = sprites.create(assets.image`Green man 1`, SpriteKind.Player)
    controller.moveSprite(knudsen, 100, 100)
    scene.cameraFollowSprite(knudsen)
    tiles.placeOnTile(knudsen, tiles.getTileLocation(10, 10))

    scene.onOverlapTile(SpriteKind.Player, assets.tile`Poop Stick Spawn tile`, function (sprite: Sprite, location: tiles.Location) {
        if (inSpikes == false) {
            inSpikes = true
            healthBar.value -= 40
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

        }
    })


    scene.onOverlapTile(SpriteKind.Player, assets.tile`Poop Stick Tile`, function (sprite: Sprite, location: tiles.Location) {

  
        if (inSpikes == false) {

            inSpikes = true

            healthBar.value -= 35

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
    })
    scene.onOverlapTile(SpriteKind.Player, assets.tile`NATO 1 Cave`, function (sprite: Sprite, location: tiles.Location) {
        game.splash('Part 2; Caves')
        nato1_part2()
    })
    
    function nato1_part2() {


        color.setColor(10, color.rgb(0, 0, 0))

        tiles.setCurrentTilemap(tilemap`level2`)

        sprites.destroyAllSpritesOfKind(SpriteKind.Player)
        let knudsen = sprites.create(assets.image`Green man 1`, SpriteKind.Player)
        controller.moveSprite(knudsen, 100, 100)
        scene.cameraFollowSprite(knudsen)
        tiles.placeOnTile(knudsen, tiles.getTileLocation(2, 2))
        
        
        controller.B.onEvent(ControllerButtonEvent.Pressed, function() {
            
            let num = 0
            let num2 = 0
            let going = true

            while (going == true) {
                tiles.setWallAt(tiles.getTileLocation(num, num2), false)

                num += 1
                if (num == 200) {
                    num = 0
                    num2 += 1
                    if (num2 == 200) {
                        going = false
                        tiles.setWallAt(tiles.getTileLocation(26, 1), true)
                    }
                }
            }
        })




        scene.onHitWall(SpriteKind.Player, function(sprite: Sprite, location: tiles.Location) {
            if (location == tiles.getTileLocation(26, 1)) {

                tiles.setTileAt(location, assets.tile`myTile17`)

                
                tiles.setWallAt(tiles.getTileLocation(24, 40), false)
                tiles.setWallAt(tiles.getTileLocation(25, 40), false)
                tiles.setWallAt(tiles.getTileLocation(26, 40), false)

                tiles.setTileAt(tiles.getTileLocation(24, 40), assets.tile`myTile23`)
                tiles.setTileAt(tiles.getTileLocation(25, 40), assets.tile`myTile23`)
                tiles.setTileAt(tiles.getTileLocation(26, 40), assets.tile`myTile23`)

            }
        })

        scene.onOverlapTile(SpriteKind.Player, assets.tile`brick tunnel entrance`, function(sprite: Sprite, location: tiles.Location) {
            color.setColor(10, color.rgb(145, 70, 61))
        })
        scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile32`, function (sprite: Sprite, location: tiles.Location) {
            color.setColor(10, color.rgb(0, 0, 0))
            tiles.setWallAt(tiles.getTileLocation(34, 51), true)
        })
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
                tiles.placeOnTile(mySprite, tiles.getTileLocation(randint(27, 36), randint(48,50)))
            }
            sprites.destroyAllSpritesOfKind(SpriteKind.Player, effects.fire, 2000)

timer.after(3000, function() {
    game.over(false)
})




        })

    }
}

mainMenue()