export default {
    beforeMount: function (el, binding, vnode) {
        const vm = vnode.context;
        const callback = binding.value;
        el.clickOutsideEvent = function (event) {
            if (!(el === event.target || el.contains(event.target))) {
                return callback.call(vm, event);
            }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
    },

    unmounted: function (el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
    }
}
