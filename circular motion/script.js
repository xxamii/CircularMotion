let 
	canv 	= document.getElementById('canvas'),
	ctx		= canv.getContext('2d');
	

canv.width = window.innerWidth;
canv.height = window.innerHeight;

const mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
}

window.addEventListener('mousemove' , function(event){
	mouse.x = event.x;
	mouse.y = event.y;
})

function randomIntFromRange(min, max) {
	// body...
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function defineColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)]
}

const colors = [
	'#CB66FF',
	'#6558E8',
	'#6DB1FF',
	'#61FF9E',
	'#58E8E5'
]

function Particle(x , y , radius , colors) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = defineColor(colors);
	this.radians = Math.random() * Math.PI * 2;
	this.velocity = 0.05;
	this.distance = randomIntFromRange(60, 180);
	this.lastMouse = {
			x: x,
			y: y
		};
	

	this.update = () => {
		const prevPoint = {
			x: this.x,
			y: this.y
		};

		this.radians += this.velocity;


		//smooth mosemove effect

		this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;

		this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

		//circular motion

		this.x = this.lastMouse.x + Math.cos(this.radians) * this.distance;
		this.y = this.lastMouse.y + Math.sin(this.radians) * this.distance;
		this.draw(prevPoint);
	}

	this.draw = (prevPoint) => {
		ctx.beginPath();
		ctx.strokeStyle = this.color;
		ctx.lineWidth = this.radius;
		ctx.moveTo(prevPoint.x , prevPoint.y);
		ctx.lineTo(this.x , this.y);
		ctx.strokeStyle = this.color;
		ctx.stroke();
		ctx.closePath();
	}
}

let objects;
function init() {
	objects = [];

	for (let i = 0; i < 80; i++) {
		const radius = (Math.random() * 3) + 1;
		objects.push(new Particle(canv.width / 2 , canv.height / 2 , radius , colors));
	}
}

function animate() {
	requestAnimationFrame(animate);
	ctx.fillStyle = 'rgba(255 , 255 , 255 , 0.05)';
	ctx.fillRect(0 , 0 , canv.width , canv.height);

	objects.forEach((particle) => {
		particle.update();
	})
}

init();
animate();
