//扇形
CanvasRenderingContext2D.prototype.sector = function(x, y, radius, sDeg, eDeg) {
	// 初始保存
	this.save();
	// 位移到目标点
	this.translate(x, y);
	this.beginPath();
	// 画出圆弧
	this.arc(0, 0, radius, sDeg, eDeg);
	// 再次保存以备旋转
	this.save();
	// 旋转至最终角度
	this.rotate(eDeg);
	// 移动到终点，准备连接终点与圆心
	this.moveTo(radius, 0);
	// 连接到圆心
	this.lineTo(0, 0);
	// 还原
	this.restore();
	// 旋转至起点角度
	this.rotate(sDeg);
	// 从圆心连接到起点
	this.lineTo(radius, 0);
	this.closePath();
	// 还原到最初保存的状态
	this.restore();
	return this;
}
var main = {
	context: null,
	deg: Math.PI / 180,
	init: function() {
		this.draw();
	},
	draw: function() {
		var canvas = document.getElementById('view');
		context = canvas.getContext('2d');
		context.strokeStyle = '#000';
		context.beginPath();
		context.arc(250, 250, 100, 0, Math.PI * 2, true);
		context.stroke();

		// var deg = Math.PI / 180;



		// context.fillStyle = 'rgba(0,201,100,1)';
		// context.sector(250, 250, 80, deg * 0, deg * 40, true);
		// context.fill();
		// context.fillStyle = 'rgba(0,226,159,1)';
		// context.sector(250, 250, 80, deg * 40, deg * 360, true);
		// context.fill();
		this.drawSector([0.2, 0.3, 0.4,0.05,0.05]);
	},
	drawSector: function(data) {
		var lastPart = 0;
		for (var i = 0; i < data.length; i++) {
			var r = parseInt(Math.random() * 255);
			var g = parseInt(Math.random() * 255);
			var b = parseInt(Math.random() * 255);
			context.fillStyle = 'rgb('+r.toString() + ',' + g.toString() + ',' + b.toString()+ ')';
			var part = data[i] * 360;
			var sDeg = lastPart;
			console.log('sDeg:', sDeg, part);
			if (i > 0) {
				var eDeg = part + lastPart;
			} else {
				
				var eDeg = part;
			}
			lastPart += part;
			context.sector(250, 250, 80, this.deg * sDeg, eDeg * this.deg, true);
			context.fill();
		};
	}
}
window.onload = function() {
	main.init();
}