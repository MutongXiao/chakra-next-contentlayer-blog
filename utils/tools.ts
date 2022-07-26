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
