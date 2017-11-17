export class Server {
    constructor(ip) {
        this._ip = ip;
        this.xhttr = new XMLHttpRequest();
    }

    increaseCookieCount(){
        this.xhttr.open('POST', this._ip, true);
        this.xhttr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        this.xhttr.send('var=' + encodeURIComponent('inc'));
    }

    checkCookieCount(){
        this.xhttr.open('POST', this._ip, true);
        this.xhttr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        this.xhttr.send('var=' + encodeURIComponent('check')) ;
    }
}