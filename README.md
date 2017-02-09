# es5 实现的 promise

## example

```javascript
	
	var promise = new Promise(function (resolve, reject) {
            resolve(1);
            
        }).then(function (n) {
            console.log(1)

            return new Promise(function (resolve, reject) {
                resolve(2);
            });

        }, function(n) {
            console.log(11)

        }).then(function (n) {
            console.log(2)

            return new Promise(function (resolve, reject) {
                resolve(3);
            });
        }, function() {
            console.log(22)
        }).then(function (n) {
            console.log(3)

        }, function() {
            console.log(33)
        });


        //1,2,3

````