import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
	apiKey: 'AIzaSyB5KG7Xu37uKN2AFLRFC2VIRkPSktyOILM',
	authDomain: 'admin-hippo.firebaseapp.com',
	projectId: 'admin-hippo',
	storageBucket: 'admin-hippo.appspot.com',
	messagingSenderId: '246397704239',
	appId: '1:246397704239:web:75155144368dc5c4e40eda',
	measurementId: 'G-CRV6PYT6CR',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
