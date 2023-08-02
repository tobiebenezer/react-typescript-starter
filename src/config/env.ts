const env = process.env;
const {NODE_ENV, REACT_APP_DEV_URL, REACT_APP_SENTRY_DSN, APP_URL} = env;
/*
* @description well use this object to iterate on it and check
* if the env vars has the value assigned and if not then we 
* throw a warnig in the console
*/

const env_required: {[key:string]: string|undefined} = {
    REACT_APP_DEV_URL,
    REACT_APP_SENTRY_DSN,
};

export const isDevelopment = NODE_ENV === 'development';

export const appName = APP_URL 
export const API_URL = REACT_APP_DEV_URL;
export const SENTRY_DSN = REACT_APP_SENTRY_DSN;

const checkEnv = () => {
    Object.keys(env_required).forEach(key => {
        const value = env_required[key];
        if(!value){
            console.warn(
                `Prese set the env var: ${key} In .env for development and in you development server for production/staging`);
        }
    })
}

checkEnv();
