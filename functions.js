let distance = (x1,y1,x2,y2) => {
  return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2))
}

let drawTriangle = (ctx, v1, v2, v3) =>{
    ctx.beginPath();
    ctx.moveTo(v1.x,v1.y);
    ctx.lineTo(v2.x,v2.y);
    ctx.lineTo(v3.x,v3.y);
    ctx.fill();
}
