function RotationMatrix(theta){

  this.a= Math.cos(theta);
  this.b= -1*Math.sin(theta);
  this.c= Math.sin(theta);
  this.d= Math.cos(theta);
}
RotationMatrix.prototype.rotate = function (pt,about) {

  let newP = new Point(pt.x - about.x,pt.y - about.y)

  let newX = this.a*(pt.x - about.x) + this.b*(pt.y - about.y)
  let newY = this.c*(pt.x - about.x) + this.d*(pt.y - about.y)

  let newP2 = new Point(newX,newY)

  let r = new Point (newX+about.x, newY+about.y)

  return r
};

function Point(x_coord,y_coord){
  this.x= x_coord;
  this.y= y_coord;
}

function CoordinateFrame(originPoint, orientation){
  this.originPos= originPoint; //where in the canvas the origin of this coordinate frame is
  this.orientation= orientation; //defined as angle rotated from default canvas rotation
}

// rotation-translation formula
CoordinateFrame.prototype.convertCanvasPtToFramePt = function (pt) {
  let x = pt.x;
  let y = pt.y;
  return new Point(x,y);
};

CoordinateFrame.prototype.setOrigin = function(pt,angle){
  this.originPos = pt;
  this.orientation = angle;
}

CoordinateFrame.prototype.draw = function(ctx, c, label){
  // ctx.translate(c.width/2,c.height/2)
  let labelCode = label.charCodeAt(0);
  let newLabel = String.fromCharCode(labelCode+8272)
  let y_start = new Point(this.originPos.x,this.originPos.y +COORD_FRAME_AXES_LENGTH/2);
  let y_end = new Point(this.originPos.x,this.originPos.y -COORD_FRAME_AXES_LENGTH/2);

  let x_start = new Point(this.originPos.x+COORD_FRAME_AXES_LENGTH/2,this.originPos.y);
  let x_end = new Point(this.originPos.x-COORD_FRAME_AXES_LENGTH/2,this.originPos.y);

  R = new RotationMatrix(this.orientation);
  // console.log(R)
  // console.log(this.originPos)
  // console.log(y_start)
  y_start = R.rotate(y_start,this.originPos);
  // console.log(y_start)
  y_end = R.rotate(y_end,this.originPos);
  x_start = R.rotate(x_start,this.originPos);
  x_end = R.rotate(x_end,this.originPos);
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x_start.x, x_start.y);
  ctx.lineTo(x_end.x,x_end.y);
  ctx.stroke();
  ctx.save();
  ctx.fillText("x"+newLabel,x_start.x+2, x_start.y-5);
  ctx.translate(c.width/2, c.height/2)
  ctx.rotate(this.orientation);
  ctx.restore()

  ctx.beginPath();
  ctx.moveTo(y_start.x,y_start.y);
  ctx.lineTo(y_end.x,y_end.y);
  ctx.stroke();
  ctx.save();
  ctx.fillText("y"+newLabel,y_end.x+2, y_end.y-5);
  ctx.translate(c.width/2, c.height/2)
  ctx.rotate(this.orientation);
  ctx.restore()

}


function Link (length,color){
  this.length = length;
}

Link.prototype.draw = function (ctx, startPt, endPt) {
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.strokeStyle = this.color;
  ctx.moveTo(startPt.x, startPt.y);
  ctx.lineTo(endPt.x, endPt.y);
  ctx.stroke();
  return endPt;
};
