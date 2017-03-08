export default {
    closeMask(state) {
        state.mask.maskState = false;
        state.mask.maskContent = '请等待....';
        state.mask.maskLoding = true;
        state.mask.time = 2000;
    },
    openMask(state, config) {
        let open = state.mask.maskState;
        if (!open) {
            if (typeof config == 'string') {
                state.mask.maskLoding = false;
                state.mask.maskContent = config;
            } else if (config) {
                state.mask.maskContent = config.content;
                config.loding != undefined && (state.mask.maskLoding = config.loding)
            }
            state.mask.maskState = true;
            state.mask.time = config.time || 2000;
            setTimeout(function () {
                state.mask.maskState = false;
                state.mask.maskContent = '请等待....';
                state.mask.maskLoding = true;
                state.mask.time = 2000;
            }, state.mask.time);
        }
    }
}
