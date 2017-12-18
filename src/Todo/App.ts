import { Component, Vue } from 'vue-property-decorator';
import AppHeader from './components/AppHeader.vue';

@Component({
    name: 'App',
    components: {
        AppHeader
    }
})
export default class Hello extends Vue {
    currentLocation: string = window.location.pathname;
    todoFilters: any = [ '/all', '/active', '/completed']

    beforeMount (): void {
        console.log(1);
    }

    addTodo (payload: any) {
        console.log(payload)
    }

}