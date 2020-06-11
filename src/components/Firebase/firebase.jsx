import app from 'firebase/app';
import 'firebase/firestore';
import { DEVELOP as CONFIG } from '../../constants/config.fb';

const firebaseConfig = {
    apiKey: CONFIG.apiKey,
    authDomain: CONFIG.authDomain,
    databaseURL: CONFIG.databaseURL,
    projectId: CONFIG.projectId,
    storageBucket: CONFIG.storageBucket,
    messagingSenderId: CONFIG.messagingSenderId,
    appId: CONFIG.appId
};

class Firebase {
    constructor () {
        app.initializeApp(firebaseConfig);  
        this.firestore = app.firestore();
    }
}
export default Firebase;