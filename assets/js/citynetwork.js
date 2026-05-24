(function () {
  function initNetwork(canvasId, opts) {
    var canvas = document.getElementById(canvasId);
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var nodes = [], edges = [], signals = [], animId;
    var cols = opts.cols || 10;
    var rows = opts.rows || 7;
    var bg = opts.bg || '#030e0e';
    var lineOpacity = opts.lineOpacity !== undefined ? opts.lineOpacity : 0.55;
    var numSignals = opts.signals || 8;
    var hubMap = opts.hubs || {19:1, 37:1, 50:1, 16:1, 31:1, 5:1, 56:1, 43:1};

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      build();
    }

    function build() {
      nodes = []; edges = []; signals = [];
      var W = canvas.width, H = canvas.height;
      var padX = 28, padY = 22;
      var cw = (W - padX * 2) / (cols - 1);
      var ch = (H - padY * 2) / (rows - 1);

      for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
          var jx = (Math.random() - 0.5) * cw * 0.32;
          var jy = (Math.random() - 0.5) * ch * 0.32;
          var idx = r * cols + c;
          nodes.push({ x: padX + c * cw + jx, y: padY + r * ch + jy, phase: Math.random() * Math.PI * 2, hub: !!hubMap[idx] });
        }
      }

      for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
          var i = r * cols + c;
          if (c < cols - 1) edges.push({ a: i, b: i + 1 });
          if (r < rows - 1) edges.push({ a: i, b: i + cols });
          if (c < cols - 1 && r < rows - 1 && Math.random() > 0.52) edges.push({ a: i, b: i + cols + 1 });
          if (c > 0 && r < rows - 1 && Math.random() > 0.68) edges.push({ a: i, b: i + cols - 1 });
        }
      }

      for (var k = 0; k < numSignals; k++) {
        signals.push({ ei: Math.floor(Math.random() * edges.length), t: Math.random(), spd: 0.003 + Math.random() * 0.004, dir: Math.random() > 0.5 ? 1 : -1 });
      }
    }

    function draw() {
      var W = canvas.width, H = canvas.height;
      var now = Date.now() / 1000;

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(0,220,195,0.6)';
      for (var i = 0; i < edges.length; i++) {
        var e = edges[i], na = nodes[e.a], nb = nodes[e.b];
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = 'rgba(0,210,185,' + lineOpacity + ')';
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }
      ctx.shadowBlur = 0;

      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        var p = 0.6 + Math.sin(now * 1.7 + n.phase) * 0.4;
        if (n.hub) {
          var rg = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 16);
          rg.addColorStop(0, 'rgba(255,210,70,' + p + ')');
          rg.addColorStop(0.45, 'rgba(255,185,50,' + (p * 0.45) + ')');
          rg.addColorStop(1, 'rgba(255,175,30,0)');
          ctx.beginPath(); ctx.arc(n.x, n.y, 16, 0, Math.PI * 2);
          ctx.fillStyle = rg; ctx.fill();
          ctx.beginPath(); ctx.arc(n.x, n.y, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,238,140,' + p + ')';
          ctx.shadowBlur = 16; ctx.shadowColor = 'rgba(255,210,70,0.9)';
          ctx.fill(); ctx.shadowBlur = 0;
        } else {
          var rg2 = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 6);
          rg2.addColorStop(0, 'rgba(0,230,200,' + (p * 0.7) + ')');
          rg2.addColorStop(1, 'rgba(0,230,200,0)');
          ctx.beginPath(); ctx.arc(n.x, n.y, 6, 0, Math.PI * 2);
          ctx.fillStyle = rg2; ctx.fill();
          ctx.beginPath(); ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(80,240,215,' + p + ')'; ctx.fill();
        }
      }

      for (var k = 0; k < signals.length; k++) {
        var s = signals[k];
        s.t += s.spd * s.dir;
        if (s.t > 1 || s.t < 0) { s.t = s.dir > 0 ? 0 : 1; s.ei = Math.floor(Math.random() * edges.length); }
        var se = edges[s.ei]; if (!se) continue;
        var sa = nodes[se.a], sb = nodes[se.b];
        var sx = sa.x + (sb.x - sa.x) * s.t, sy = sa.y + (sb.y - sa.y) * s.t;
        ctx.beginPath(); ctx.arc(sx, sy, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.95)';
        ctx.shadowBlur = 18; ctx.shadowColor = 'rgba(80,240,215,1)';
        ctx.fill(); ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();

    window.addEventListener('resize', function () {
      if (animId) cancelAnimationFrame(animId);
      resize();
      draw();
    });
  }

  initNetwork('city-network', {
    cols: 10, rows: 7, bg: '#030e0e', lineOpacity: 0.55, signals: 8,
    hubs: {19:1, 37:1, 50:1, 16:1, 31:1, 5:1, 56:1, 43:1}
  });

  initNetwork('footer-network', {
    cols: 13, rows: 5, bg: '#071f1f', lineOpacity: 0.28, signals: 5,
    hubs: {14:1, 28:1, 42:1, 7:1, 55:1}
  });
})();
