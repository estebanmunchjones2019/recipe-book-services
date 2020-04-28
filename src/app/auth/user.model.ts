export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ) {}

    get token() { 
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null; // user = new User(...args), then user.token = null, if it's the expiration date didn't exists or if it expired 
        } else {
            return this._token;
        }
    }
}