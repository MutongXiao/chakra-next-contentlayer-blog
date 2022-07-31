// DOM 类操作工具函数
function stripAndCollapse(value: string) {
  const rnothtmlwhite = /[^\x20\t\r\n\f]+/g;
  const tokens = value.match(rnothtmlwhite) || [];
  return tokens.join(' ');
}

function hasClass(el: HTMLElement, cls: string) {
  const className = ' ' + cls.trim() + ' ';
  const cur = ' ' + stripAndCollapse(el.className) + ' ';
  if (cur.indexOf(className) > -1) {
    return true;
  }
  return false;
}

function addClass(el: HTMLElement, cls: string) {
  const classes = cls.trim().split(' ');
  let cur = ' ' + stripAndCollapse(el.className) + ' ';
  if (classes.length) {
    let j = 0,
      clazz = '';
    while ((clazz = classes[j++])) {
      if (cur.indexOf(' ' + clazz + ' ') < 0) {
        cur += clazz + ' ';
      }
    }

    if (el.className.trim() !== cur.trim()) {
      el.className = cur;
    }
  }
}

function removeClass(el: HTMLElement, cls: string) {
  const classes = cls.trim().split(' ');
  let cur = ' ' + stripAndCollapse(el.className) + ' ';
  if (classes.length) {
    let j = 0,
      clazz: string = null;

    while ((clazz = classes[j++])) {
      // 移除 *all* 匹配项
      while (cur.indexOf(' ' + clazz + ' ') > -1) {
        cur = cur.replace(' ' + clazz + ' ', ' ');
      }
    }

    if (el.className.trim() !== cur.trim()) {
      el.className = cur;
    }
  }
}

function toggleClass(el: HTMLElement, cls: string) {
  cls.split(' ').forEach(itemCls => {
    if (hasClass(el, itemCls)) {
      removeClass(el, itemCls);
    } else {
      addClass(el, itemCls);
    }
  });
}

export const $ = {
  hasClass,
  addClass,
  removeClass,
  toggleClass,
};

// 范围随机数工具函数
export function randomNum(min: number, max: number) {
  const range = max - min;
  const rand = Math.random();
  const num = min + Math.round(rand * range);
  return num;
}

// 随机字符串
export function randomString(strlen = 6) {
  const t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  const a = t.length;
  let n = '';
  for (let i = 0; i < strlen; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n;
}

// 背景动画工具行数
/**
 * 绘制首页背景动画
 * @param {*} ref_canvas 画布canvas
 */
interface letsOptions {
  canvas?: HTMLCanvasElement;
  frameNo?: number;
  camX?: number;
  camY?: number;
  camZ?: number;
  pitch?: number;
  yaw?: number;
  cx?: number;
  cy?: number;
  bounding?: number;
  scale?: number;
  floor?: number;
  points?: pointOption[];
  initParticles?: number;
  initV?: number;
  distributionRadius?: number;
  vortexHeight?: number;
  [key: string]: any;
}

type pointOption = {
  d?: number;
  x?: number;
  y?: number;
  z?: number;
  vy?: number;
  radius?: number;
  color?: number;
};
export const fullScreenAnimation = (ref_canvas: HTMLCanvasElement) => {
  let size = 0;
  let isStop = false;
  function project3D(x: number, y: number, z: number, lets: letsOptions) {
    let p: number, d: number;
    x -= lets.camX;
    y -= lets.camY - 8;
    z -= lets.camZ;
    p = Math.atan2(x, z);
    d = Math.sqrt(x * x + z * z);
    x = Math.sin(p - lets.yaw) * d;
    z = Math.cos(p - lets.yaw) * d;
    p = Math.atan2(y, z);
    d = Math.sqrt(y * y + z * z);
    y = Math.sin(p - lets.pitch) * d;
    z = Math.cos(p - lets.pitch) * d;
    let rx1 = -1000;
    let ry1 = 1;
    let rx2 = 1000;
    let ry2 = 1;
    let rx3 = 0;
    let ry3 = 0;
    let rx4 = x;
    let ry4 = z;
    let uc = (ry4 - ry3) * (rx2 - rx1) - (rx4 - rx3) * (ry2 - ry1);
    let ua = ((rx4 - rx3) * (ry1 - ry3) - (ry4 - ry3) * (rx1 - rx3)) / uc;
    let ub = ((rx2 - rx1) * (ry1 - ry3) - (ry2 - ry1) * (rx1 - rx3)) / uc;
    if (!z) z = 0.000000001;
    if (ua > 0 && ua < 1 && ub > 0 && ub < 1) {
      return {
        x: lets.cx + (rx1 + ua * (rx2 - rx1)) * lets.scale,
        y: lets.cy + (y / z) * lets.scale,
        d: x * x + y * y + z * z,
      };
    } else {
      return { d: -1 };
    }
  }
  function elevation(x: number, y: number, z: number) {
    let dist = Math.sqrt(x * x + y * y + z * z);
    if (dist && z / dist >= -1 && z / dist <= 1) return Math.acos(z / dist);
    return 0.00000001;
  }
  function rgb(col: number) {
    col += 0.000001;
    let r = parseInt(((0.5 + Math.sin(col) * 0.5) * 16).toString());
    let g = parseInt(((0.5 + Math.cos(col) * 0.5) * 16).toString());
    let b = parseInt(((0.5 - Math.sin(col) * 0.5) * 16).toString());
    return '#' + r.toString(16) + g.toString(16) + b.toString(16);
  }
  function interpolateColors(RGB1: number[], RGB2: number[], degree: number) {
    let w2 = degree;
    let w1 = 1 - w2;
    return [
      w1 * RGB1[0] + w2 * RGB2[0],
      w1 * RGB1[1] + w2 * RGB2[1],
      w1 * RGB1[2] + w2 * RGB2[2],
    ];
  }
  function rgbArray(col: number) {
    col += 0.000001;
    let r = parseInt(((0.5 + Math.sin(col) * 0.5) * 256).toString());
    let g = parseInt(((0.5 + Math.cos(col) * 0.5) * 256).toString());
    let b = parseInt(((0.5 - Math.sin(col) * 0.5) * 256).toString());
    return [r, g, b];
  }
  function colorString(arr: number[]) {
    let r = parseInt(arr[0].toString());
    let g = parseInt(arr[1].toString());
    let b = parseInt(arr[2].toString());
    return (
      '#' +
      ('0' + r.toString(16)).slice(-2) +
      ('0' + g.toString(16)).slice(-2) +
      ('0' + b.toString(16)).slice(-2)
    );
  }
  function process(lets: letsOptions) {
    if (lets.points.length < lets.initParticles)
      for (let i = 0; i < 5; ++i) spawnParticle(lets);
    let p: number, d: number, t: number;
    p = Math.atan2(lets.camX, lets.camZ);
    d = Math.sqrt(lets.camX * lets.camX + lets.camZ * lets.camZ);
    d -= Math.sin(lets.frameNo / 80) / 25;
    t = Math.cos(lets.frameNo / 300) / 165;
    lets.camX = Math.sin(p + t) * d;
    lets.camZ = Math.cos(p + t) * d;
    lets.camY = -Math.sin(lets.frameNo / 220) * 15;
    lets.yaw = Math.PI + p + t;
    lets.pitch = elevation(lets.camX, lets.camZ, lets.camY) - Math.PI / 2;
    for (let i = 0; i < lets.points.length; ++i) {
      let x = lets.points[i].x;
      // let y = lets.points[i].y;
      let z = lets.points[i].z;
      let d = Math.sqrt(x * x + z * z) / 1.0075;
      let t = 0.1 / (1 + (d * d) / 5);
      p = Math.atan2(x, z) + t;
      lets.points[i].x = Math.sin(p) * d;
      lets.points[i].z = Math.cos(p) * d;
      lets.points[i].y +=
        lets.points[i].vy * t * ((Math.sqrt(lets.distributionRadius) - d) * 2);
      if (lets.points[i].y > lets.vortexHeight / 2 || d < 0.25) {
        lets.points.splice(i, 1);
        spawnParticle(lets);
      }
    }
  }
  function drawFloor(lets: letsOptions) {
    let x: number,
      y: number,
      z: number,
      d: number,
      point: pointOption,
      a: number;
    for (let i = -25; i <= 25; i += 1) {
      for (let j = -25; j <= 25; j += 1) {
        x = i * 2;
        z = j * 2;
        y = lets.floor;
        d = Math.sqrt(x * x + z * z);
        point = project3D(x, y - (d * d) / 85, z, lets);
        if (point.d != -1) {
          size = 1 + 15000 / (1 + point.d);
          a = 0.15 - Math.pow(d / 50, 4) * 0.15;
          if (a > 0) {
            lets.ctx.fillStyle = colorString(
              interpolateColors(
                rgbArray(d / 26 - lets.frameNo / 40),
                [0, 128, 32],
                0.5 + Math.sin(d / 6 - lets.frameNo / 8) / 2,
              ),
            );
            lets.ctx.globalAlpha = a;
            lets.ctx.fillRect(
              point.x - size / 2,
              point.y - size / 2,
              size,
              size,
            );
          }
        }
      }
    }
    lets.ctx.fillStyle = '#82f';
    for (let i = -25; i <= 25; i += 1) {
      for (let j = -25; j <= 25; j += 1) {
        x = i * 2;
        z = j * 2;
        y = -lets.floor;
        d = Math.sqrt(x * x + z * z);
        point = project3D(x, y + (d * d) / 85, z, lets);
        if (point.d != -1) {
          size = 1 + 15000 / (1 + point.d);
          a = 0.15 - Math.pow(d / 50, 4) * 0.15;
          if (a > 0) {
            lets.ctx.fillStyle = colorString(
              interpolateColors(
                rgbArray(-d / 26 - lets.frameNo / 40),
                [32, 0, 128],
                0.5 + Math.sin(-d / 6 - lets.frameNo / 8) / 2,
              ),
            );
            lets.ctx.globalAlpha = a;
            lets.ctx.fillRect(
              point.x - size / 2,
              point.y - size / 2,
              size,
              size,
            );
          }
        }
      }
    }
  }
  function sortFunction(a: pointOption, b: pointOption) {
    return b.d - a.d;
  }
  function draw(lets: letsOptions) {
    lets.ctx.globalAlpha = 0.15;
    lets.ctx.fillStyle = '#000';
    lets.ctx.fillRect(0, 0, lets.canvas.width, lets.canvas.height);
    drawFloor(lets);
    let point: pointOption, x: number, y: number, z: number;
    for (let i = 0; i < lets.points.length; ++i) {
      x = lets.points[i].x;
      y = lets.points[i].y;
      z = lets.points[i].z;
      point = project3D(x, y, z, lets);
      if (point.d != -1) {
        lets.points[i].d = point.d;
        size = 1 + lets.points[i].radius / (1 + point.d);
        let d = Math.abs(lets.points[i].y);
        let a = 0.8 - Math.pow(d / (lets.vortexHeight / 2), 1000) * 0.8;
        lets.ctx.globalAlpha = a >= 0 && a <= 1 ? a : 0;
        lets.ctx.fillStyle = rgb(lets.points[i].color);
        if (
          point.x > -1 &&
          point.x < lets.canvas.width &&
          point.y > -1 &&
          point.y < lets.canvas.height
        )
          lets.ctx.fillRect(point.x - size / 2, point.y - size / 2, size, size);
      }
    }
    lets.points.sort(sortFunction);
  }
  function spawnParticle(lets: letsOptions) {
    let p: number, ls: number;
    let pt: pointOption = {};
    p = Math.PI * 2 * Math.random();
    ls = Math.sqrt(Math.random() * lets.distributionRadius);
    pt.x = Math.sin(p) * ls;
    pt.y = -lets.vortexHeight / 2;
    pt.vy = lets.initV / 20 + Math.random() * lets.initV;
    pt.z = Math.cos(p) * ls;
    pt.radius = 200 + 800 * Math.random();
    pt.color = pt.radius / 1000 + lets.frameNo / 250;
    lets.points.push(pt);
  }
  function frame(lets?: letsOptions) {
    if (isStop) return;
    if (lets === undefined) {
      lets = {};
      lets.canvas = ref_canvas;
      lets.ctx = lets.canvas.getContext('2d');
      lets.canvas.width = window.innerWidth;
      lets.canvas.height = window.innerHeight;
      window.addEventListener(
        'resize',
        function () {
          lets.canvas.width = window.innerWidth;
          lets.canvas.height = window.innerHeight;
          lets.cx = lets.canvas.width / 2;
          lets.cy = lets.canvas.height / 2;
        },
        true,
      );
      lets.frameNo = 0;
      lets.camX = 0;
      lets.camY = 0;
      lets.camZ = -14;
      lets.pitch = elevation(lets.camX, lets.camZ, lets.camY) - Math.PI / 2;
      lets.yaw = 0;
      lets.cx = lets.canvas.width / 2;
      lets.cy = lets.canvas.height / 2;
      lets.bounding = 10;
      lets.scale = 500;
      lets.floor = 26.5;
      lets.points = [];
      lets.initParticles = 1000;
      lets.initV = 0.01;
      lets.distributionRadius = 800;
      lets.vortexHeight = 25;
    }
    lets.frameNo++;
    requestAnimationFrame(function () {
      frame(lets);
    });
    process(lets);
    draw(lets);
  }
  function stopAnimation() {
    isStop = true;
  }
  function startAnimation() {
    frame();
  }
  return {
    startAnimation,
    stopAnimation,
  };
};
