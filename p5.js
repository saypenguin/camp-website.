let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight); // ウィンドウ全体をキャンバスに
  background(0);
}

function draw() {
  background(0, 50); // 残像効果

  // 粒子を更新・描画
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    fill(...p.color, p.alpha);
    noStroke();
    ellipse(p.x, p.y, 6);
    p.x += p.vx;
    p.y += p.vy;
    p.vx *= 0.98; // 摩擦
    p.vy = p.vy * 0.98 + 0.1; // 重力
    p.alpha -= 5; // 透明度減少
    if (p.alpha <= 0) particles.splice(i, 1);
  }

  // 定期的に花火を生成
  if (frameCount % 60 === 0) {
    let x = random(width), y = random(height / 2);
    for (let i = 0; i < 100; i++) {
      let angle = random(TWO_PI);
      let velocity = random(2, 6);
      particles.push({
        x: x,
        y: y,
        vx: cos(angle) * velocity,
        vy: sin(angle) * velocity,
        alpha: 255,
        color: [random(255), random(255), random(255)],
      });
    }
  }
}