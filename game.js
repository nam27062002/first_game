// khai báo kaboom
kaboom({
	global: true,
	fullscreen: true,
	scale: 1,
	debug: true,
})
// các biến 
const SPEED = 240
const JUMP_FORCE = 460
var hp = 100
// load ảnh 
loadSprite("box0", "images/box_3.png")
loadSprite("box1", "images/box_2.png")
loadSprite("box2", "images/box_0.png")
loadSprite("key", "images/key.png")
loadSprite("dan", "images/dan.png")
loadSprite("laze", "images/laze.png")
loadSprite("icon_haha", "images/iemoji.png")
loadSprite("back", "images/backgr.png")
loadSprite("long_1", "images/long_1.png")
loadSprite("ghosty", "images/ghosty.png")
loadSprite("player", "images/player.png", {
	sliceX: 11,
	anims: {
		"idle": {
			from: 0,
			to: 3,
			speed: 8,
			loop: true,
		},
		"run": {
			from: 4,
			to: 9,
			speed: 10,
			loop: true,
		},
		"jumpUp": 10,
	}
})
loadSprite("tl", "images/tl.png", {
	sliceX: 6,
	anims: {
		"run": {
			from: 0,
			to: 5,
			speed: 10,
			loop: true,
		},
	}
})
// các hàm 
function addButton(txt, p, f) {

	const btn = add([
		text(txt),
		pos(p),
		area({ cursor: "pointer", }),
		scale(1),
		origin("center"),
	])

	btn.onClick(f)

	btn.onUpdate(() => {
		if (btn.isHovering()) {
			const t = time() * 10
			btn.color = rgb(
				wave(0, 255, t),
				wave(0, 255, t + 2),
				wave(0, 255, t + 4),
			)
			btn.scale = vec2(1.2)
		} else {
			btn.scale = vec2(1)
			btn.color = rgb()
		}
	})

}
scene("start", () => {
	addButton("START", vec2(center()), () => go("game"))
})
scene("over", () => {
	addButton("OVER", vec2(center()), () => go("game"))
})
scene("win", () => {
	addButton("YOU WIN", vec2(center()), () => go("win"))
})
scene("game", () => {
	const V_icon = 500
	var check_icon = true
	var check_icon1 = true
	check_long_1 = true
	check_box_2 = true
	check_box_4 = 0
	check_box_3 = 0
	check_box_5 = 0
	number_key = 0
	check_lv = 0
	check_tk = 0
	check_box_2a = 0
	check_box_2b = 0
	boss = 0
	gravity(640)
	for (var i = 0; i < 3; i++)
		var back_ground = add([
			sprite("back", { width: width(), height: height() }),
			area(),
			pos(width() / 2 + width() * i, height() / 2),
			origin("center"),
		])
	const laze = add([
		sprite("laze"),
		area(),
		pos(3100, 100),
		scale(0.8)
	])
	var level = addLevel(
		[
			'==============================================================================',
			'==  )   (  @@                 ~~~~~~~~~00111~~~~~~~~~                        =',
			'==         @@                                                                =',
			'==    =    @@            =                                                   =',
			'==         ==      ==    =                                                   =',
			'==2       2==      ==    =                             =                     =',
			'===       ===      ==    =                  	         ===                    =',
			'==         ==     t==    =                           =====                   =',
			'==         ============  =                          =======                  =',
			'==    =    ==    2       =                         =========                 =',
			'==         ==            =                        ===========                =',
			'==         ==	           =                       =============               =',
			'==         ==~           =                      ===============              =',
			'==========================  vvvvvvvvvvc=======================================',

		],
		{
			width: 40,
			height: 40,
			pos: vec2(400, 100),
			"t": () => [
				sprite("tl"),
				area(),
				solid(),
				origin("bot"),
				'tl'
			],
			"=": () => [
				sprite("box0"),
				area(),
				solid(),
				origin("bot"),
				'box'
			],
			"c": () => [
				sprite("box0"),
				area(),
				solid(),
				origin("bot"),
				'box2'
			],
			"v": () => [
				sprite("box0"),
				area(),
				solid(),
				origin("bot"),
				'box1'
			],
			"~": () => [
				sprite("box2"),
				area(),
				solid(),
				origin("bot"),
			],
			"0": () => [
				sprite("box2"),
				area(),
				solid(),
				origin("bot"),
				'box3'
			],
			"1": () => [
				sprite("box2"),
				area(),
				solid(),
				origin("bot"),
				'box4'
			],
			"@": () => [
				sprite("box1"),
				area(),
				solid(),
				origin("bot"),
				'box0'
			],
			"2": () => [
				sprite("key"),
				area(),
				origin("bot"),
				'key'
			],
			")": () => [
				sprite("icon_haha"),
				area(),
				solid(),
				origin("bot"),
				'icon_haha'
			],
			"(": () => [
				sprite("icon_haha"),
				area(),
				solid(),
				origin("bot"),
				'icon_haha1'
			],
		})
	const player = add([
		sprite("player"),
		pos(500, 400),
		origin("bot"),
		area(),
		body(),
	])
	const tl = get("tl")[0]
	tl.play("run")
	player.play("idle")
	player.onUpdate(() => {
		var currCam = camPos();
		if (player.pos.x > currCam.x)
			camPos(player.pos.x, currCam.y);
	});
	const long_1 = add([
		sprite("long_1"),
		area(),
		solid(),
		pos(1340, 580),
		origin("bot"),
		'long_1'
	])
	const dan1 = add([
		sprite("dan"),
		pos(920, 563),
		scale(0.1),
		origin("bot"),
		area(),
		'dan1'
	])
	// Update
	onUpdate("tl", (tl) => {
		if (check_tk == 0)
			tl.move(-100, 0)
		else {
			tl.move(100, 0)
		}
		if (tl.pos.x <= 925) {
			check_tk = 1
			tl.flipX(true)
		}
		if (tl.pos.x >= 1115) {
			check_tk = 0
			tl.flipX(false)
		}
		if (player.pos.x > 1445) {
			destroy(tl)
		}

	})
	onUpdate("long_1", (long_1) => {
		if (long_1.pos.y == 580) {
			check_long_1 = true
		}
		else if (long_1.pos.y <= 220) {
			check_long_1 = false
		}
		if (check_long_1 == true && number_key == 3) {
			long_1.move(0, -50)
		}
		else if (check_long_1 == false && number_key == 3) {
			long_1.move(0, 50)
		}
		if (player.pos.x > 1445) {
			destroy(long_1)
		}

	})
	player.onUpdate(() => {
		if (player.pos.x >= 1300 && player.pos.x <= 1420 && player.pos.y == long_1.pos.y - 40) {
			if (check_long_1 == true)
				player.move(0, -50)
		}
		if (player.pos.y > 1200) {
			go("over")
		}
	})
	onUpdate("box2", (box) => {
		if (check_box_2a == 1) {
			if (check_box_2 == true) {
				box.move(50, 0)
			}
			else {
				box.move(-50, 0)
			}
			if (box.pos.x >= 1780) {
				check_box_2 = false
			}
			if (box.pos.x <= 1530) {
				check_box_2 = true
			}
		}
	})
	onUpdate("icon_haha", (icon) => {
		if (check_icon == true) {
			icon.move(0, V_icon)
		}
		else if (check_icon == false) {
			icon.move(0, -V_icon)
		}
		if (icon.pos.y == 580) {
			check_icon = false
		}
		if (icon.pos.y == 140) {
			check_icon = true
		}
		if (player.pos.x > 1300)
			destroy(icon)
	})
	onUpdate("icon_haha1", (icon) => {
		if (check_icon1 == true) {
			icon.move(0, V_icon)
		}
		else if (check_icon1 == false) {
			icon.move(0, -V_icon)
		}
		if (icon.pos.y == 580) {
			check_icon1 = false
		}
		if (icon.pos.y == 140) {
			check_icon1 = true
		}
		if (player.pos.x > 1300)
			destroy(icon)
	})
	onUpdate("box0", () => {
		if (number_key == 2) {
			destroyAll("box0")
		}
	})
	onUpdate(("dan1"), (dan) => {
		dan.move(300, 0)
		if (dan.pos.x > 1355)
			dan.pos.x = 920
		if (number_key == 3) {
			destroy(dan)
		}
	})
	onUpdate("box1", (box) => {
		if (player.pos.x > 1440 && player.pos.y > 500) {
			destroyAll('box1')
			check_box_2a = 1
			add([
				sprite("box0"),
				area(),
				solid(),
				pos(1440, 620),
				origin("bot"),
				'box10'
			]),
				add([
					sprite("box0"),
					area(),
					solid(),
					pos(1480, 620),
					origin("bot"),
					'box10'
				])
		}
		if (player.pos.x > 2600)
			destroy("box1")
	})
	onUpdate("box4", (box) => {
		if (player.pos.x >= 2019)
			check_box_4 = 1
		if (check_box_4 == 1) {
			box.move(0, 900)
		}
		if (box.pos.y >= 579) {
			destroyAll("box4")
			check_box_2b = 1
		}
	})
	onUpdate("box3", (box) => {
		if (check_box_2b == 1) {
			box.move(0, 900)
		}
		if (box.pos.y >= 579) {
			destroyAll("box3")
		}
	})
	// text

	// Xử lí va chạm
	player.onCollide("icon_haha", () => {
		go("over")
	})
	player.onCollide("dan1", () => {
		go("over")
	})
	player.onCollide("tl", () => {
		go("over")
	})
	player.onCollide("icon_haha1", () => {
		go("over")
	})
	player.onCollide("box4", () => {
		go("over")
	})
	player.onCollide("box3", () => {
		go("over")
	})
	player.onCollide("box1", () => {
		if (check_lv == 1)
			wait(1.5, () => go("over"))
	})
	player.onCollide("key", (key) => {
		destroy(key)
		number_key++
	})
	player.onGround(() => {
		if (!isKeyDown("left") && !isKeyDown("right")) {
			player.play("idle")
		} else {
			player.play("run")
		}
	})
	onKeyPress("up", () => {
		if (player.isGrounded()) {
			player.jump(JUMP_FORCE)
			player.play("jumpUp")
		}
	})

	onKeyDown("left", () => {

		player.move(-SPEED, 0)
		player.flipX(true)
		if (player.isGrounded() && player.curAnim() !== "run") {
			player.play("run")
		}

	})
	onKeyDown("right", () => {

		player.move(SPEED, 0)
		player.flipX(false)
		if (player.isGrounded() && player.curAnim() !== "run") {
			player.play("run")
		}

	})
	const enemy = add([
		sprite("ghosty"),
		pos(3400, 240),
		origin("bot"),
		area(),
		solid(),
		state("move", [ "idle", "attack", "move", ]),
		"ghosty"
	])
	enemy.onStateEnter("idle", async () => {
		await wait(0.5)
		enemy.enterState("attack")
	})
	enemy.onStateEnter("attack", async () => {
		if (player.exists()) {
	
			const dir = player.pos.sub(enemy.pos).unit()
	
			add([
				pos(enemy.pos),
				move(dir, 300),
				rect(12, 12),
				area(),
				cleanup(),
				origin("center"),
				color(BLUE),
				"bullet",
			])
	
		}
	
		await wait(2)
		enemy.enterState("move")
	
	})
	enemy.onStateEnter("move", async () => {
		await wait(0)
		enemy.enterState("idle")
	})
	
	enemy.onStateUpdate("move", () => {
		if (!player.exists()) return
		enemy.pos.y=randi(100,500)
		enemy.pos.x=randi(3100,3400)
	})
	enemy.enterState("move")
	enemy.onUpdate(()=>{
		if (hp<=0){
			hp=0
			wait(1.5, () => go("win"))
		}
	})
	label = add([
		text(hp+" %"),
		pos(3000,0)
	])
	label.onUpdate(() => {
		label.text = hp +" %"
	})
	player.onCollide("bullet", (bullet) => {
		go("over")
	})
	onCollide("box", "bullet", (box,bullet) => {
		destroy(bullet)
	})
	onUpdate(() => {
		if (player.pos.x > 2600) {
			boss = 1
		}
		if (boss == 1) {
			
			const dan2 = add([
				sprite("dan"),
				pos(player.pos.x + 50, player.pos.y - 15),
				scale(0.1),
				origin("bot"),
				area(),
				'dan2'
			])
			dan2.onUpdate(() => {
				dan2.move(500, 0)
			})
			dan2.onCollide("box", () => {
				destroy(dan2)
			})
			dan2.onCollide("ghosty",(ghost)=>{
				hp-=1
			})
		}
	})
	
	onKeyRelease(["left", "right"], () => {
		if (player.isGrounded() && !isKeyDown("left") && !isKeyDown("right")) {
			player.play("idle")
		}
	})

})
go("start")




