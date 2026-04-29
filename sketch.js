  let t = millis() * 0.001;
  noStroke();
  for (let l of leaves) {
    let wob = sin(t*1.1 + l.wb) * 0.45;
    l.x  += l.vx + wob;
    l.y  += l.vy;
    l.ang += l.spin;

    let fade = l.y < 80 ? l.al * (l.y/80) : l.al;

    // Warm sage green or amber - light, not dark forest
    let r2 = l.warm ? 130 : 175;
    let g2 = l.warm ? 165 : 148;
    let b2 = l.warm ?  85 :  48;

    push();
    translate(l.x, l.y);
    rotate(l.ang);
    fill(r2, g2, b2, fade * 255);
    beginShape();
    vertex(0, -l.sz);
    bezierVertex( l.sz*.65, -l.sz*.4,  l.sz*.65,  l.sz*.4, 0,  l.sz);
    bezierVertex(-l.sz*.65,  l.sz*.4, -l.sz*.65, -l.sz*.4, 0, -l.sz);
    endShape(CLOSE);
    stroke(r2*0.7, g2*0.7, b2*0.7, fade*100);
    strokeWeight(0.55);
    line(0, -l.sz*.75, 0, l.sz*.75);
    pop();

    if (l.y < -30 || l.x < -40 || l.x > width+40) Object.assign(l, makeLeaf());
  }
}

// ------------------------------------------------
//  RIPPLES
// ------------------------------------------------
function addRipple(x, y, success) {
  ripples.push({ x, y, r:0, al:0.45, success });
}

function drawRipples() {
  ripples = ripples.filter(r => r.al > 0.01);
  for (let r of ripples) {
    r.r  += 2.8;
    r.al *= 0.948;
