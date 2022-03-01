import Vue from 'vue'
import App from './App'
import router from './router'
import ApolloClient from 'apollo-client'
import VueApollo from 'vue-apollo'
import { setContext } from 'apollo-link-context'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

Vue.config.productionTip = false

const authLink = setContext((_, { headers }) => {
  // get the authentication token from localstorage if it exists
  const token = localStorage.getItem('daba-exercise-token')

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null
    }
  }
})

const httpLink = new HttpLink({
  // URL to graphql server, you should use an absolute URL here
  uri: 'http://localhost:3000/graphql'
})

// Create the apollo client
const apolloClient = new ApolloClient({
  // uri: 'http://localhost:3000/graphql',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

// Install the vue plugin
Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  apolloProvider,
  render: h => h(App)
})
