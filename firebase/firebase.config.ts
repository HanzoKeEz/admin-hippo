import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
	apiKey: 'AIzaSyDTjXf_LnJQGMxO_NI6bKTCe0_0TxpWtpw',
	authDomain: 'okidoki-market.firebaseapp.com',
	projectId: 'okidoki-market',
	storageBucket: 'okidoki-market.appspot.com',
	messagingSenderId: '77584032763',
	appId: '1:77584032763:web:e94abccdc241de8b04a15e',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
