<template>
    <v-app>
        <v-app-bar color="brand">
            <v-app-bar-nav-icon v-if="mobile" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-app-bar-title>RoC</v-app-bar-title>
            <template v-slot:append v-if="userStore.$state.isLoggedIn === true">
                <v-btn icon="mdi-heart"></v-btn>
                <v-btn icon="mdi-magnify"></v-btn>
                <v-btn icon="mdi-dots-vertical"></v-btn>
                <VBtn @click="toggleTheme" icon="mdi-theme-light-dark" title="Przełącz motyw"></VBtn>
            </template>
        </v-app-bar>
        <v-navigation-drawer :order="mobile ? -1 : 0" v-model="drawer" v-if="userStore.$state.isLoggedIn === true">
            <v-list-item lines="two">

                <template v-slot:prepend>
                    <v-avatar color="brand" v-if="userStore.$state.userData?.email">
                        {{ userStore.$state.userData.email[0].toUpperCase() }}
                    </v-avatar>
                </template>
                <VListItemTitle v-if="accountStore.$state.accountData?.name">{{ accountStore.$state.accountData.name }}
                </VListItemTitle>
                <VListItemSubtitle v-if="userStore.$state.userData?.email">{{ userStore.$state.userData.email }}
                </VListItemSubtitle>
            </v-list-item>
            <VDivider></VDivider>
            <VList>
                <VListItem v-for="item in menuItems" :key="item.name" :title="item.name" :prepend-icon="item.icon"
                    :to="item.url"></VListItem>
            </VList>

            <template v-slot:append>
    <div class="pa-2">
				<v-btn block variant="text" @click="logout" prepend-icon="mdi-logout">
				Wyloguj się
				</v-btn>
    </div>
</template>


        </v-navigation-drawer>
        <v-main>
            <div class="pa-4">
                <NuxtPage v-if="userStore.$state.isLoggedIn === true" />
            </div>
        </v-main>
        <LoginDialog></LoginDialog>
        <ConfirmDialog ref="confirmDialog"/>
    </v-app>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { useTheme } from 'vuetify'
import { useStorage } from '@vueuse/core'

const theme = useTheme()
const { mobile } = useDisplay();
const drawer = ref(null)
const currentTheme = useStorage('currentTheme', 'light');
const userStore = useUserStore();
const accountStore = useAccountStore();
const antiForgeryStore = useAntiForgeryStore();
const confirmDialog = ref(null);






const menuItems = [
    {
        name: 'Strona główna',
        icon: 'mdi-home',
        url: '/',
    },
    {
        name: 'Monitorowanie strony',
        icon: 'mdi-web-check',
        url: '/urls',
    }
];

function toggleTheme() {
    let newTheme = theme.global.current.value.dark ? 'light' : 'dark';
    theme.global.name.value = newTheme;
    currentTheme.value = newTheme;

}


//const logout = () => {
//    userStore.logout();
//}




const logout = () => {
    confirmDialog.value.show({
        title: 'Potwierdź wylogowanie',
        text: 'Czy na pewno chcesz się wylogować?',
        confirmBtnText: 'Wyloguj',
        confirmBtnColor: 'error'
    }).then((confirm) => {
        if (confirm) {
            userStore.logout();
        }
    })
}


await antiForgeryStore.loadAntiForgeryToken();



onMounted(() => {
    theme.global.name.value = currentTheme.value;
    userStore.loadLoggedInUser();
});
</script>
