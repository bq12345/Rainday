// stats.js r4 - http://github.com/mrdoob/stats.js
var Stats = function() {
	var m, g = "fps", q = 0, s = new Date().getTime(), o = s, e = s, j = 0, d = 1000, f = 0, l, b, c, p, h = 0, t = 1000, a = 0, n, k, r, i;
	m = document.createElement("div");
	m.style.fontFamily = "Helvetica, Arial, sans-serif";
	m.style.fontSize = "9px";
	m.style.backgroundColor = "#000020";
	m.style.opacity = "0.9";
	m.style.width = "80px";
	m.style.paddingTop = "2px";
	m.style.cursor = "pointer";
	m.addEventListener("click", u, false);
	l = document.createElement("div");
	l.innerHTML = "<strong>FPS</strong>";
	l.style.color = "#00ffff";
	l.style.marginLeft = "3px";
	l.style.marginBottom = "3px";
	m.appendChild(l);
	b = document.createElement("canvas");
	b.width = 74;
	b.height = 30;
	b.style.display = "block";
	b.style.marginLeft = "3px";
	b.style.marginBottom = "3px";
	m.appendChild(b);
	c = b.getContext("2d");
	c.fillStyle = "#101030";
	c.fillRect(0, 0, b.width, b.height);
	p = c.getImageData(0, 0, b.width, b.height);
	n = document.createElement("div");
	n.innerHTML = "<strong>MS</strong>";
	n.style.color = "#00ffff";
	n.style.marginLeft = "3px";
	n.style.marginBottom = "3px";
	n.style.display = "none";
	m.appendChild(n);
	k = document.createElement("canvas");
	k.width = 74;
	k.height = 30;
	k.style.display = "block";
	k.style.marginLeft = "3px";
	k.style.marginBottom = "3px";
	k.style.display = "none";
	m.appendChild(k);
	r = k.getContext("2d");
	r.fillStyle = "#101030";
	r.fillRect(0, 0, k.width, k.height);
	i = r.getImageData(0, 0, k.width, k.height);
	function v(B, A) {
		var w, C, z;
		for (C = 0; C < 30; C++) {
			for (w = 0; w < 73; w++) {
				z = (w + C * 74) * 4;
				B[z] = B[z + 4];
				B[z + 1] = B[z + 5];
				B[z + 2] = B[z + 6]
			}
		}
		for (C = 0; C < 30; C++) {
			z = (73 + C * 74) * 4;
			if (C < A) {
				B[z] = 16;
				B[z + 1] = 16;
				B[z + 2] = 48
			} else {
				B[z] = 0;
				B[z + 1] = 255;
				B[z + 2] = 255
			}
		}
	}
	function u() {
		switch (g) {
		case "fps":
			g = "ms";
			l.style.display = "none";
			b.style.display = "none";
			n.style.display = "block";
			k.style.display = "block";
			break;
		case "ms":
			g = "fps";
			l.style.display = "block";
			b.style.display = "block";
			n.style.display = "none";
			k.style.display = "none";
			break
		}
	}
	return {
		domElement : m,
		update : function() {
			q++;
			s = new Date().getTime();
			h = s - o;
			t = Math.min(t, h);
			a = Math.max(a, h);
			v(i.data, Math.min(30, 30 - (h / 200) * 30));
			n.innerHTML = "<strong>" + h + " MS</strong> (" + t + "-" + a + ")";
			r.putImageData(i, 0, 0);
			o = s;
			if (s > e + 1000) {
				j = Math.round((q * 1000) / (s - e));
				d = Math.min(d, j);
				f = Math.max(f, j);
				v(p.data, Math.min(30, 30 - (j / 100) * 30));
				l.innerHTML = "<strong>" + j + " FPS</strong> (" + d + "-" + f
						+ ")";
				c.putImageData(p, 0, 0);
				e = s;
				q = 0
			}
		}
	}
};