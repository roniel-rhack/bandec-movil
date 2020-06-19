export default class ConfigApp {
    protected static _myInstance: ConfigApp;

    private _password: String = "";

    set password(value: String) {
        this._password = value;
    }

    private _remember: boolean = false;

    set remember(value: boolean) {
        this._remember = value;
    }

    private _username: String = "";

    set username(value: String) {
        this._username = value;
    }

    static getInstance(): ConfigApp {
        if (!ConfigApp._myInstance) {
            ConfigApp._myInstance = new ConfigApp();
        }
        return this._myInstance;
    }

    toString() {
        return `username: ${this._username}, password: ${this._password}, Remember: ${this._remember}`
    }
}