var Avatar = (function () {
  "use strict";
  function t(t, i) {
    return (t + i) & 4294967295;
  }
  function i(i, e, a, s, n, r) {
    return (e = t(t(e, i), t(s, r))), t((e << n) | (e >>> (32 - n)), a);
  }
  function e(t, e, a, s, n, r, l) {
    return i((e & a) | (~e & s), t, e, n, r, l);
  }
  function a(t, e, a, s, n, r, l) {
    return i((e & s) | (a & ~s), t, e, n, r, l);
  }
  function s(t, e, a, s, n, r, l) {
    return i(e ^ a ^ s, t, e, n, r, l);
  }
  function n(t, e, a, s, n, r, l) {
    return i(a ^ (e | ~s), t, e, n, r, l);
  }
  function r(i, r) {
    let l = i[0],
      c = i[1],
      h = i[2],
      o = i[3];
    (l = e(l, c, h, o, r[0], 7, -680876936)),
      (o = e(o, l, c, h, r[1], 12, -389564586)),
      (h = e(h, o, l, c, r[2], 17, 606105819)),
      (c = e(c, h, o, l, r[3], 22, -1044525330)),
      (l = e(l, c, h, o, r[4], 7, -176418897)),
      (o = e(o, l, c, h, r[5], 12, 1200080426)),
      (h = e(h, o, l, c, r[6], 17, -1473231341)),
      (c = e(c, h, o, l, r[7], 22, -45705983)),
      (l = e(l, c, h, o, r[8], 7, 1770035416)),
      (o = e(o, l, c, h, r[9], 12, -1958414417)),
      (h = e(h, o, l, c, r[10], 17, -42063)),
      (c = e(c, h, o, l, r[11], 22, -1990404162)),
      (l = e(l, c, h, o, r[12], 7, 1804603682)),
      (o = e(o, l, c, h, r[13], 12, -40341101)),
      (h = e(h, o, l, c, r[14], 17, -1502002290)),
      (c = e(c, h, o, l, r[15], 22, 1236535329)),
      (l = a(l, c, h, o, r[1], 5, -165796510)),
      (o = a(o, l, c, h, r[6], 9, -1069501632)),
      (h = a(h, o, l, c, r[11], 14, 643717713)),
      (c = a(c, h, o, l, r[0], 20, -373897302)),
      (l = a(l, c, h, o, r[5], 5, -701558691)),
      (o = a(o, l, c, h, r[10], 9, 38016083)),
      (h = a(h, o, l, c, r[15], 14, -660478335)),
      (c = a(c, h, o, l, r[4], 20, -405537848)),
      (l = a(l, c, h, o, r[9], 5, 568446438)),
      (o = a(o, l, c, h, r[14], 9, -1019803690)),
      (h = a(h, o, l, c, r[3], 14, -187363961)),
      (c = a(c, h, o, l, r[8], 20, 1163531501)),
      (l = a(l, c, h, o, r[13], 5, -1444681467)),
      (o = a(o, l, c, h, r[2], 9, -51403784)),
      (h = a(h, o, l, c, r[7], 14, 1735328473)),
      (c = a(c, h, o, l, r[12], 20, -1926607734)),
      (l = s(l, c, h, o, r[5], 4, -378558)),
      (o = s(o, l, c, h, r[8], 11, -2022574463)),
      (h = s(h, o, l, c, r[11], 16, 1839030562)),
      (c = s(c, h, o, l, r[14], 23, -35309556)),
      (l = s(l, c, h, o, r[1], 4, -1530992060)),
      (o = s(o, l, c, h, r[4], 11, 1272893353)),
      (h = s(h, o, l, c, r[7], 16, -155497632)),
      (c = s(c, h, o, l, r[10], 23, -1094730640)),
      (l = s(l, c, h, o, r[13], 4, 681279174)),
      (o = s(o, l, c, h, r[0], 11, -358537222)),
      (h = s(h, o, l, c, r[3], 16, -722521979)),
      (c = s(c, h, o, l, r[6], 23, 76029189)),
      (l = s(l, c, h, o, r[9], 4, -640364487)),
      (o = s(o, l, c, h, r[12], 11, -421815835)),
      (h = s(h, o, l, c, r[15], 16, 530742520)),
      (c = s(c, h, o, l, r[2], 23, -995338651)),
      (l = n(l, c, h, o, r[0], 6, -198630844)),
      (o = n(o, l, c, h, r[7], 10, 1126891415)),
      (h = n(h, o, l, c, r[14], 15, -1416354905)),
      (c = n(c, h, o, l, r[5], 21, -57434055)),
      (l = n(l, c, h, o, r[12], 6, 1700485571)),
      (o = n(o, l, c, h, r[3], 10, -1894986606)),
      (h = n(h, o, l, c, r[10], 15, -1051523)),
      (c = n(c, h, o, l, r[1], 21, -2054922799)),
      (l = n(l, c, h, o, r[8], 6, 1873313359)),
      (o = n(o, l, c, h, r[15], 10, -30611744)),
      (h = n(h, o, l, c, r[6], 15, -1560198380)),
      (c = n(c, h, o, l, r[13], 21, 1309151649)),
      (l = n(l, c, h, o, r[4], 6, -145523070)),
      (o = n(o, l, c, h, r[11], 10, -1120210379)),
      (h = n(h, o, l, c, r[2], 15, 718787259)),
      (c = n(c, h, o, l, r[9], 21, -343485551)),
      (i[0] = t(l, i[0])),
      (i[1] = t(c, i[1])),
      (i[2] = t(h, i[2])),
      (i[3] = t(o, i[3]));
  }
  function l(t) {
    const i = [];
    for (let e = 0; e < 64; e += 4)
      i[e >> 2] =
        t.charCodeAt(e) +
        (t.charCodeAt(e + 1) << 8) +
        (t.charCodeAt(e + 2) << 16) +
        (t.charCodeAt(e + 3) << 24);
    return i;
  }
  const c = "0123456789abcdef".split("");
  function h(t) {
    let i = "",
      e = 0;
    for (; e < 4; e++) i += c[(t >> (8 * e + 4)) & 15] + c[(t >> (8 * e)) & 15];
    return i;
  }
  const o = (t) =>
    (function (t) {
      for (let i = 0; i < t.length; i++) t[i] = h(t[i]);
      return t.join("");
    })(
      (function (t) {
        const i = t.length,
          e = [1732584193, -271733879, -1732584194, 271733878];
        let a;
        for (a = 64; a <= t.length; a += 64) r(e, l(t.slice(a - 64, a)));
        t = t.slice(Math.max(0, a - 64));
        const s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (a = 0; a < t.length; a++)
          s[a >> 2] |= t.charCodeAt(a) << (a % 4 << 3);
        if (((s[a >> 2] |= 128 << (a % 4 << 3)), a > 55))
          for (r(e, s), a = 0; a < 16; a++) s[a] = 0;
        return (s[14] = 8 * i), r(e, s), e;
      })(t)
    );
  class g {
    constructor(t) {
      let i =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      if (!t) throw new Error("No image element provided.");
      (this.element = t),
        (this.settings = {
          useGravatar: !0,
          allowGravatarFallback: !1,
          initials: "",
          initial_fg: "#888888",
          initial_bg: "#f4f6f7",
          initial_size: 0,
          initial_weight: 100,
          initial_font_family: "'Lato', 'Lato-Regular', 'Helvetica Neue'",
          hash: "",
          email: "",
          size: 80,
          fallback: "mm",
          rating: "x",
          forcedefault: !1,
          fallbackImage:
            "data:image/svg+xml,%3Csvg width='60' xmlns='http://www.w3.org/2000/svg' height='60' viewBox='0 0 60 60'%3E%3Cpath fill='%23bcc7ce' d='M0 0h60v60h-60z'/%3E%3Cg fill-rule='evenodd'%3E%3Cpath fill='%23a4b1b9' d='M30.1 54.8c-6.7 0-13.1-2.8-17.6-7.7l-.5-.5v-2.6h.2c.4-4 1.6-6.7 3.4-7.6 1.3-.6 2.9-1.1 4.9-1.6v-1l1-.3s.7-.2 1.7-.5c0-.5-.1-.7-.1-.9-.6-1-1.5-3.3-2.1-6l-1.7-1.4.2-.9s.2-.9 0-1.9c-.2-.9.1-1.5.3-1.8.3-.3.6-.5 1-.6.3-1.6.9-3.1 1.7-4.3-1.3-1.5-1.7-2.6-1.5-3.5.2-.9 1-1.5 1.9-1.5.7 0 1.3.3 1.9.6.3-.7.9-1.1 1.7-1.1.7 0 1.4.4 2.4.8.5.3 1.2.6 1.6.7 3.4.1 7.6 2.2 8.9 7.6.3.1.6.3.8.5.4.5.5 1.1.3 1.9-.2 1.2 0 2.4 0 2.4l.2.8-1.2 1.2c-.5 2.8-1.6 5.4-2.2 6.5-.1.1-.1.4-.1.8 1 .3 1.7.5 1.7.5l1 .4v.8c2.5.5 4.6 1.1 6.1 1.9 1.8.9 2.9 3.5 3.4 7.8l.1.6-.4.5c-4.6 5.9-11.5 9.4-19 9.4z'/%3E%3Cpath fill='%23fff' d='M45.4 36.8c-1.5-.8-3.9-1.5-7-2v-.9s-1-.4-2.6-.7c-.2-.8-.3-2 .2-2.8.5-.9 1.7-3.6 2.1-6.5l.9-.9s-.3-1.4 0-3c.2-.9-.4-.7-.9-.5-.9-7.1-6.3-7.7-7.8-7.7-1.4-.2-3.9-2.2-4.1-1.3-.1.9 1.2 1.8-.4 1.4-1.6-.4-3.1-1.8-3.3-.8-.2.7 1.2 2.3 2 3.1-1.2 1.3-2.1 3.2-2.4 6.1-.5-.3-1.4-.7-1.1.2.3 1.3 0 2.6 0 2.6l1.4 1.2c.5 2.7 1.5 5.1 2 6 .5.8.3 2.1.2 2.8-1.5.3-2.6.7-2.6.7v1.2c-2.5.5-4.4 1.1-5.8 1.7-2 1-2.6 5.7-2.7 7.9v.4c4.1 4.4 10 7.2 16.5 7.2 7.3 0 13.7-3.5 17.8-8.8-.1-2.3-.8-5.7-2.4-6.6z'/%3E%3C/g%3E%3C/svg%3E",
          github_id: 0,
          setSourceCallback: () => {},
          ...i,
        });
      let e = this.settings.fallbackImage;
      this.settings.useGravatar && this.settings.allowGravatarFallback
        ? (e = g.gravatarUrl(this.settings))
        : this.settings.useGravatar
        ? this.gravatarValid()
        : this.settings.github_id
        ? (e = g.githubAvatar(this.settings))
        : this.settings.initials.length > 0 &&
          (e = g.initialAvatar(this.settings)),
        this.setSource(e);
    }
    static from(t, i) {
      return new g(t, i);
    }
    setSource(t) {
      if (!this.element) throw new Error("No image element set.");
      t && ((this.element.src = t), this.settings.setSourceCallback(t));
    }
    gravatarValid() {
      if (!this.settings.email && !this.settings.hash) return;
      const t = this.settings.email
          ? o(this.settings.email)
          : this.settings.hash,
        i = new window.Image();
      i.addEventListener("load", this.gravatarValidOnLoad.bind(this)),
        i.addEventListener("error", this.gravatarValidOnError.bind(this)),
        (i.src = `https://secure.gravatar.com/avatar/${t}?d=404`);
    }
    gravatarValidOnLoad() {
      this.setSource(g.gravatarUrl(this.settings));
    }
    gravatarValidOnError() {
      this.settings.initials.length > 0
        ? this.setSource(g.initialAvatar(this.settings))
        : this.setSource(this.settings.fallbackImage);
    }
    static initialAvatar(t) {
      const i = document.createElement("canvas"),
        e = t.size,
        a = t.size,
        s = Math.max(window.devicePixelRatio, 1);
      (i.width = e * s),
        (i.height = a * s),
        (i.style.width = `${e}px`),
        (i.style.height = `${a}px`);
      const n = i.getContext("2d");
      return (
        n.scale(s, s),
        n.rect(0, 0, i.width, i.height),
        (n.fillStyle = t.initial_bg),
        n.fill(),
        (n.font = `${t.initial_weight} ${t.initial_size || a / 2}px ${
          t.initial_font_family
        }`),
        (n.textAlign = "center"),
        (n.textBaseline = "middle"),
        (n.fillStyle = t.initial_fg),
        n.fillText(t.initials, e / 2, a / 2),
        i.toDataURL("image/png")
      );
    }
    static gravatarUrl() {
      let t =
        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      const i = t.size && t.size >= 1 && t.size <= 2048 ? t.size : 80;
      let e = t.hash || t.email;
      (e && "string" == typeof e) || (e = "00000000000000000000000000000000"),
        (e = e.toLowerCase().trim());
      return `https://secure.gravatar.com/avatar/${
        null !== e.match(/@/g) ? o(e) : e
      }?s=${i}&d=${t.fallback ? encodeURIComponent(t.fallback) : "mm"}&r=${
        t.rating || "x"
      }${t.forcedefault ? "&f=y" : ""}`;
    }
    static githubAvatar() {
      let t =
        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      return `https://avatars.githubusercontent.com/u/${t.github_id || 0}?s=${
        t.size || 80
      }&v=4`;
    }
  }
  return g;
})();
