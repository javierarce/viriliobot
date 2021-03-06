'use strict'

const fs = require('fs')

class HTML {

  build () {
    fs.readFile(`${__dirname}/../status.txt`, (err, data) => {
      if (err) {
        throw err;
      }

      let lines = data.toString().trim().split('\n')

      let body = []

      lines.reverse().forEach((line) => {
        body.push(`<span>${ line }</span> `)
      })

      body.push('<span>Every technology carries its own negativity, which is invented at the same time as technical progress.</span>')

      body = body.join('')

      let top = '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"><title>viriliobot</title><meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1"> <meta name="theme-color" content="#ffffff"> <meta property="og:title" content="viriliobot" /> <meta property="og:site_name" content="viriliobot" /> <meta name="twitter:title" content="viriliobot"> <meta name="description" content="I\'m a bot that looks at @artnau and tweet what I see." /> <meta property="og:description" content="I\'m a bot that looks at @artnau and tweet what I see." /> <meta property="twitter:description" content="I\'m a bot that looks at @artnau and tweet what I see." /> <meta name=twitter:image content="https://viriliobot.javierarce.com/cover.png"> <meta property="og:image" content="https://viriliobot.javierarce.com/cover.png"/> <meta name="twitter:card" content="summary_large_image"/><style> body { font-size: 1.8em; line-height: 145%; font-weight: normal; margin: 3em; text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; } span { opacity: 0; transition: opacity 800ms ease-in-out; } span.is-visible { opacity: 1; } a { color: #000; }.Title { margin: 0 0 2em 0; text-align: center;} .Content { width: 60%; margin: auto; }  @media all and (max-width: 640px) { body { font-size: 1em; margin: 1em; } .Title { text-align: center; font-size: 1em; margin: 0 0 1em 0;} Content { width: 90%; }}</style> <script> window.onload = () => { let i = 0; document.querySelectorAll("span").forEach((item) => { i += 200; item.style.transitionDelay = `${i}ms`; item.classList.add("is-visible"); }) } </script> </head> <body> <div class="Title"><a href="https://twitter.com/viriliobot" target="__blank">viriliobot</a></div><div class="Content">'

      let bottom = '</div></body></html>'
      const html = `${top}${body}${bottom}`

      let fileName = `${__dirname}/../www/index.html`
      let stream = fs.createWriteStream(fileName)

      stream.once('open', (fd) => {
        stream.end(html)
      })
    })
  }
}

module.exports = new HTML()
