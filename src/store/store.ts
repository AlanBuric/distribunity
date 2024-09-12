/* import { auth, database } from "@/firebase/init";
import { doc } from "firebase/firestore";
import { defineStore } from "pinia";
import { useDocument } from "vuefire";

const useStore = defineStore('store', () => {
    const user = useDocument(doc(database, "users", auth.currentUser?.uid));
    return { user };
});

export default useStore; */
