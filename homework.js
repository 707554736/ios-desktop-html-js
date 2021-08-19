function renderApps(num) {
  const AppWrap = document.getElementById('app-wrap')
  renderScroll(num, AppWrap)
}
let originApp = null
let resultApp = null
function renderScroll(num, Wrap) {
  let curPage = 1
  let pageList = []
  let pointList = []
  let appList = []
  const scrollWrap = document.getElementById('scroll-wrap')
  for (let i = 0; i < num / 30; i++) {
    const scrollPoint = document.createElement('div')
    scrollPoint.className = i === 0 ? 'scroll-point active ' : "scroll-point"
    scrollWrap.appendChild(scrollPoint)
    const appPage = document.createElement('div')
    appPage.className = i === 0 ? 'app-page' : 'app-page hide'
    pageList.push(appPage)
    pointList.push(scrollPoint)
    const appNum = i + 1 < num / 30 ? 30 : num % 30
    for (let j = i * 30; j < i * 30 + appNum; j++) {
      const app = createAppNode(j, appPage)
      appPage.appendChild(app)
      appList.push(app)
    }

    scrollPoint.addEventListener('click', (e) => {
      e.stopPropagation()
      e.preventDefault()
      pointList.forEach((point, idx) => {
        point.className = idx === i ? 'scroll-point active' : 'scroll-point'
      })
      pageList.forEach((page, idx) => {
        page.className = idx === i ? 'app-page' : 'app-page hide'
      })
    })
    Wrap.appendChild(appPage)
  }

  document.body.addEventListener('click', () => {
    appList.forEach((a) => {
      a.className = 'app'
    })
  })
}

function createAppNode(i, parentNode) {
  const app = document.createElement('div')
  app.draggable = true
  app.className = 'app'
  app.innerText = i + 1
  const img = createDeleteNode(app, parentNode)
  app.appendChild(img)

  let touchTimer = 0
  const appList = parentNode.getElementsByClassName('app')
  /** 此处为删除相关事件处理 */
  app.addEventListener('touchstart', function (e) {
    touchTimer = setTimeout(() => {
      e.stopPropagation()
      app.className = 'app active shake'
    }, 1000);
  })
  app.addEventListener('touchend', function (e) {
    e.stopPropagation()
    clearTimeout(touchTimer)
  })
  app.addEventListener('touchmove', function (e) {
    e.stopPropagation()
    clearTimeout(touchTimer)
  })

  app.addEventListener('click', function (e) {
    e.stopPropagation()
    app.className = 'app active shake'
  })

  function createDeleteNode(app, parentNode) {
    const img = document.createElement('img')
    img.src = "close-icon.png"
    img.className = "close"
    img.addEventListener('click', function (e) {
      parentNode.removeChild(app)
    })
    parentNode.addEventListener('touchstart', function (e) {
      parentNode.removeChild(app)
    })
    return img
  }

  app.addEventListener('dragstart', function (e) {
    console.log('dragStart', e)
    originApp = e.target

    setTimeout(() => {
      originApp.className = ' app invisible';
    }, 0);
    console.log('originApp', originApp)

  })

  app.addEventListener('dragover', function (e) {
    e.preventDefault()
  })
  app.addEventListener('drop', function (e) {
    console.log('originApp', originApp)
    e.preventDefault();
    resultApp = e.target
    let temp = resultApp.innerText
    originApp.className = ' app visiable';

    resultApp.innerHTML = `${originApp.innerText}<img src="close-icon.png" class="close">`

    originApp.innerHTML = `${temp}<img src="close-icon.png" class="close">`

    console.log({ resultApp: resultApp.childNodes[0], originApp: originApp.childNodes[0] });
    resultApp.childNodes[1].addEventListener('click', () => {
      parentNode.removeChild(resultApp)
    })

    originApp.childNodes[1].addEventListener('click', () => {
      parentNode.removeChild(originApp)
    })
  })
  return app
}
renderApps(66)
