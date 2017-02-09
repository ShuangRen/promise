function Promise (callback) {
    this.isReturn = false;
    this.isThen = false;
    this.resolveCallback = null;
    this.resolveRes = null;
    this.rejectCallback = null;
    this.rejectRes = null;

    if(!callback) {
        new Error('需要函数体'); 
        return;
    }
    
    callback(this.resolve.bind(this), this.reject.bind(this));
}

Promise.prototype.resolve = function (res) {

    this.resolveRes = res;

    if(this.isReturn) {
        return;
    }

    if(!this.isThen) return;

    if(!this.resolveCallback) {
        new Error('resolve 的 回调函数不存在'); 
        return;
    }

    var other= this.resolveCallback(res);
    this.isReturn = true;

    return other;
}

Promise.prototype.reject = function (res) {

    this.rejectRes = res;

    if(this.isReturn) {
        return;
    }

    if(!this.isThen) return;

    if(!this.rejectCallback) {
        new Error('reject 的 回调函数不存在'); 
        return;
    }

    var other= this.rejectCallback(res);
    this.isReturn = true;

     return other;
}

Promise.prototype.then = function (resolveCallback, rejectCallback) {

    this.isThen = true;

    this.resolveCallback = resolveCallback;

    this.rejectCallback = rejectCallback;

    if(this.isReturn) {
        return;
    }


    if(this.resolveRes) {
        var other=  this.resolveCallback(this.resolveRes);
        this.isReturn = true;

        return other;
    }

    if(this.rejectRes) {
        var other= this.rejectCallback(this.rejectRes);
        this.isReturn = true;

        return other;
    }
}