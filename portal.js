'use strict'

function Portal (sites) {
  this.el = document.createElement('div')
  this.sites = sites

  // Templates

  function _readme () {
    return ` <p class='readme'>😋 很棒，你发现了这里，那么，请用一秒记住这里。</p>
    <br>
    <p>🔔 [美吗]    [没码]    Mei.ma        </p>
    <br>
    <p>🔔 如果您发现了链接有错误，请联系QQ 1740775</p>
    <br>`
  }

  function _buttons () {
    return `<p class='buttons'><a href='#random' onClick="portal.reload('random')">随机</a> | <a href='https://jiubrc.com/'target="_blank">博客</a>| <a href='https://jiubrc.com/gy'target="_blank">关于</a>
    <a id="footer" href='https://weibo.com/Q1304425705/' >过客设计  </a>
    <a id='icon' href='#random' onClick="portal.reload('random')"></a>`
  }

  function _directory (sites) {
    return `
    <ul>${sites.reduce((acc, site, id) => { return `${acc}<li class='${site.type}'>${id}) <a href='${site.url}'>${_name(site)}</a></li>` }, '')}</ul>\n${_readme()}${_buttons()}`
  }

  function _name(site) {
    return site.title ? site.title : `${site.url.split('//')[1]}`
  }

  function _redirect (site) {
    return `<p>您好，我正在带你跳转到一个好玩的网站： <a href="${site.url}">${site.url}</a></p><meta http-equiv="refresh" content="3; url=${site.url}">
    <br><p class='buttons'><a href='#' onClick="portal.reload('')">Mei.ma</a> | <a href='#${site.url}' onClick="portal.reload('random')">跳过</a> | <a href='#random' onClick="portal.reload('random')">随机</a> | QQ 1740775</a> <a id='icon'  href='#random' onClick="portal.reload('random')"></a></p>`
  }

  //

  this.install = function (host) {
    host.appendChild(this.el)
  }

  this.start = function () {
    this.el.innerHTML = window.location.hash && window.location.hash.length > 4 ? _redirect(this.next()) : _directory(this.sites)
  }

  this.reload = function () {
    setTimeout(() => { window.location.reload() }, 500)
  }

  this.navigate = function (target) {
    setTimeout(() => { window.location.href = target }, 3000)
  }

  this.locate = function () {
    const hash = window.location.hash.replace('#', '').trim()

    if (hash == 'random') {
      return Math.floor(Math.random() * this.sites.length)
    }

    for (const id in this.sites) {
      const site = this.sites[id]
      if (site.url.indexOf(hash) > -1) {
        return parseInt(id)
      }
    }
    return -1
  }

  this.next = function (loc = this.locate()) {
    return loc == this.sites.length - 1 ? this.sites[0] : this.sites[loc + 1]
  }
}
