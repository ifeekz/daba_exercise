import gql from 'graphql-tag'

export const SIGNUP_MUTATION = gql`
  mutation SignupMutation($name: String!, $email: String!, $password: String!) {
    signp(
      userData: {
        name: $name,
        email: $email,
        password: $password
      }
    ) {
      id
      name
      bio
      phone
      email
      photo
    }
  }
`
export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(
      userData: {
          email: $email,
          password: $password
        }
    ){
      user {
        id
        name
        bio
        phone
        email
        photo
      }
      token {
        expiresIn
        token
      }
    }
  }
`

export const USER_QUERY = gql`
  query UserQuery($id: Int!) {
    getUserById(id: $id) {
      id
      name
      bio
      phone
      email
      photo
    }
  }
`
