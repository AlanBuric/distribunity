import { auth, database } from '@/firebase/init';
import type { User } from '@/types';
import { doc, DocumentReference } from 'firebase/firestore';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useDocument } from 'vuefire';

const useAuthStore = defineStore('auth', () => {
    const userProfileRef = ref<DocumentReference>();
    const userProfile = useDocument<User>(userProfileRef, { maxRefDepth: 0 });

    auth.onAuthStateChanged((user) => {
        if (user) {
            userProfileRef.value = doc(database, 'users', user.uid);
        } else {
            userProfileRef.value = undefined;
        }
    });

    return { userProfile, userProfileRef };
});

export default useAuthStore;
