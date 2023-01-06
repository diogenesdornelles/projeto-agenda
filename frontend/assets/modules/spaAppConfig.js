import initFormPreventPost from './initFormPreventPost'

export default async function spaAppConfig () {
  try {
    async function getUserIdLocalStorage () {
      try {
        const user = await JSON.parse(window.localStorage.getItem('loggedUser'))
        return user.idUser
      } catch (e) {
        console.log(e)
      }
    }

    document.addEventListener('click', (e) => {
      const { target } = e
      if (!target.matches('nav .link-menu') && !target.matches('nav .home-image')) {
        return
      }
      e.preventDefault()
      urlRoute()
    })

    const id = await getUserIdLocalStorage()
    // routes config path
    const urlRoutes = {
      404: {
        template: '/404',
        title: '',
        description: '',
        param: '',
        id: ''
      },
      '/': {
        template: '/',
        title: '',
        description: '',
        param: 'initial',
        id: ''
      },
      '/home': {
        template: '/home',
        title: '',
        description: '',
        param: '/homePage/',
        id: ''
      },
      '/entrar': {
        template: '/entrar',
        title: '',
        description: '',
        param: '/loginPage',
        id: ''
      },
      '/registrar': {
        template: '/registrar',
        title: '',
        description: '',
        param: '/registerPage',
        id: ''
      },
      '/agenda': {
        template: '/agenda/',
        title: '',
        description: '',
        param: 'contactBookPage/',
        id
      }
    }

    const urlRoute = (event) => {
      event = event || window.event
      event.preventDefault()
      window.history.pushState({},
        '',
        event.target.href
      )
      urlLocationHandler()
    }

    const urlLocationHandler = () => {
      let location = window.location.pathname
      if (location.length === 0) {
        location = '/'
      }
      const route = urlRoutes[location] || urlRoutes[404]
      // eslint-disable-next-line no-undef
      axios.get(route.template + route.param + route.id)
        .then(async response => {
          document.querySelector('.index .container').innerHTML = await response.data
          if (route.template.includes('agenda') || route.template.includes('registrar') || route.template.includes('entrar')) {
            initFormPreventPost()
          }
        })
        .catch(error => console.log(error))
    }
  } catch (e) {
    console.log(e)
  }
}
