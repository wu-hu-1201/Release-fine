import apiLogin from './interface/login';
import apiRegister from './interface/register';
import apiPublish from './interface/publish';
import apiRelease from './interface/release';
import apiCommunity from './interface/community';

const install = Vue => {
    if (install.installed) {
        return;
    }
    install.installed = true

    
    Object.defineProperties(Vue.prototype, {
        $http: {
            get () {
                return Object.assign(  // assign->拼接
                    {},
                    apiLogin,
                    apiRegister,
                    apiPublish,
                    apiRelease,
                    apiCommunity
                )
            }
        }
    })
}

export default install