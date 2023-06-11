import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { storage } from "../../config"

import { db } from "../../config";

import { doc, getDoc, get, where, Filter, collection, getDocs, query} from "firebase/firestore";


export const saveMediaToStorage = (media, path) => new Promise(async (resolve, reject) => {
        const fileRef = ref(storage, path) ;

        const img = await fetch(media);
        const blob = await img.blob();

        console.log("uploading image");
        const uploadTask = uploadBytesResumable(fileRef, blob);

        uploadTask.on('state_changed',(snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                   console.log('Upload is paused');
               break;
               case 'running':
                  console.log('Upload is running');
               break;
            }
         },
         (error) => {
            this.setState({ isLoading: false })
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
               case 'storage/unauthorized':
                  console.log("User doesn't have permission to access the object");
               break;
               case 'storage/canceled':
                  console.log("User canceled the upload");
               break;
               case 'storage/unknown':
                  console.log("Unknown error occurred, inspect error.serverResponse");
               break;
            }
         },
         () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                resolve(downloadURL);

               
            });
         }); 
})

export const queryUsersByName = (name) => new Promise((resolve, reject) => {
   const q = query(collection(db, "users"), where("name", ">=", name), where('name', '<=', name + '\uf8ff'))
    getDocs(q)
      .then((snapshot) => {
        let users = snapshot.docs.map(doc => {
            const data = doc.data(); 
            const id = doc.id; 
            return { id, ...data }
        });
        resolve(users);
      })
      .catch(() => reject())

})