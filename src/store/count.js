export default {
    state:{ countNumber: 0 },
    actions: {
        add(context){
            context.commit('ADD')
        }
    },
    mutations: {
        ADD(state){
            state.countNumber++
        }
    }
}