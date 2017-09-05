import firebase from 'store/firebase'

export const getAccounts = () => async dispatch => {
  firebase.ref('/').once('value', snap => {
    console.log(snap.val())
  })

  firebase.ref('accounts').set([
    {
      id: 1
    },
    {
      id: 2
    }
  ])
}
