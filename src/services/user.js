import { setDoc, doc, collection, addDoc } from "firebase/firestore"
import { authentication } from "../../config"
import { db } from "../../config"
import { saveMediaToStorage } from "./random"
import { onAuthStateChanged } from "firebase/auth"





// save photoURL to firestore and storage
export const saveUserProfileImage = (image) => new Promise((resolve, reject) => {
    saveMediaToStorage(image, `profileImage/${authentication.currentUser.uid}`)
        .then((downloadUrl) => {
            setDoc(doc(db, "users", authentication.currentUser.uid), {
                photoURL: downloadUrl
            }, { merge: true })
            .then(() => resolve(Date.now())) 
    })
})

export const saveUserEvidence = (image, otherUserID, task) => new Promise((resolve, reject) => {
    let currentTime = new Date().getHours() + ':' + new Date().getMinutes();
    console.log(currentTime)
    const path2 = Date.now();
    saveMediaToStorage(image, `evidence/${Date.now()}`)
        .then((downloadUrl) => {
            const docref = doc(db, 'evidence', authentication.currentUser.uid);
            const colRef = collection(docref, 'images');
            const chatSnap = addDoc(colRef, {
                imageURL: downloadUrl,
                partner: otherUserID,
                taskName: task
            })
            .then(() => resolve(Date.now()))
        
    })
})

export function getCurrentUser() {
    return new Promise((resolve, reject) => {
       const unsubscribe = onAuthStateChanged(authentication, user => {
          unsubscribe();
          resolve(user);
       }, reject);
    });
  }