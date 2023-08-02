const env = process.env;

const {API_URL,APP_URL} = env

type IConfig = {
    [ key:string]:string ;
};

const config = (key:string): string => {
    const configVariable:IConfig = {
        "apiUrl" :API_URL ?? '',
        "appUrl": APP_URL ?? '',
    };
        return configVariable[key];
};

export default config;