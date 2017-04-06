import $router from './router';
import { expires } from './store/config'
export default function () {
    let token = window.localStorage.getItem('express-token-key');
    try {
        token = JSON.parse(token)
    } catch (e) {
        $router.replace({
            name: 'login'
        })
        return false;
    }
    let bo = token && Date.now() - token.expires < expires;
    if (bo) {
        return true;
    } else {
        $router.replace({
            name: 'login'
        })
        return false;
    }
    return false;
}
