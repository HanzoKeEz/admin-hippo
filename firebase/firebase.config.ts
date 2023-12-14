import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
	apiKey: 'AIzaSyA43fWQ34Q3S6WnAzpym2ALtm0Wg6t3B9w',
	authDomain: 'admin-hippo-f91e7.firebaseapp.com',
	projectId: 'admin-hippo-f91e7',
	storageBucket: 'admin-hippo-f91e7.appspot.com',
	messagingSenderId: '765296168921',
	appId: '1:765296168921:web:6ca654f6843c205cc7d3c8',
	measurementId: 'G-E15H2SG3W2',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }

// admin-hippo-f91e7
