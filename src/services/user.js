import { setDoc, doc } from "firebase/firestore"
import { authentication } from "../../config"
import { db } from "../../config"
import { saveMediaToStorage } from "./random"


// setDoc(doc(db, "users", authentication.currentUser.email), {
//     name: name,
//     gender: gender,
//     major: major,
//     year: year,
//   }).then(() => {
//     // data saved successfully
//     console.log('data submitted');
//   }).catch((error) => {
//     //the write failed
//     console.log(error)
//   });

// save photoURL to firestore and storage
export const saveUserProfileImage = (image) => new Promise((resolve, reject) => {
    saveMediaToStorage(image, `profileImage/${authentication.currentUser.uid}`)
        .then((downloadUrl) => {
            setDoc(doc(db, "users", authentication.currentUser.email), {
                photoURL: downloadUrl
            }, { merge: true })
            .then(() => resolve())
        
    })
})