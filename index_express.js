const express = require('express');
const logger = require('morgan');
const app = express();
let arrUser = [{ name: 'Park' }, { name: 'J K Rolling' }];
let resultMsg = 'Success, User\r\nCurrent User Count : 0 Member';
const getUserSuccessMsg = () => {
    resultMsg = 'Success, User\r\nCurrent User Count : ' + arrUser.length + 'Member';
    return resultMsg;
}

app.get('/', (req, res) => {
    res.send('call root');
})
app.get('/users', (req, res) => {
    res.json(arrUser);
})

app.put('/users', (req, res) => {
    arrUser.push({ name: 'Add man' });
    res.send(getUserSuccessMsg());
})


app.delete('/users', (req, res) => {
    // console.log(arrUser.find(e => { return e.name == 'Add man' }));
    // let eleIndex = arrUser.findIndex((fElement, fIndex, fArr) => {
    //     console.log('findIndex Callback Method Target Array : ' + JSON.stringify(fArr))
    //     return fElement.name == 'Add man'
    // });
    // console.log(eleIndex);
    // if(eleIndex > 0) arrUser.splice(eleIndex, 1);
    while(arrUser.find(e => {return e.name == 'Add man'}) != undefined){
        let eleIndex = arrUser.findIndex((fElement, fIndex, fArr) => {
            return fElement.name == 'Add man'
        });
        
        console.log('Removed Array : ' + eleIndex + ' / ' + JSON.stringify(arrUser[eleIndex]));
        if(eleIndex > 0) arrUser.splice(eleIndex, 1);
    }
    res.send(getUserSuccessMsg());
})

const mw1 = (req, res, nex) => {
    console.log('mw1 was ran !');
    throw Error('throw error!!!!!!')
    nex();
}

const mw2 = (req, res, nex) => {
    console.log('mw2 was ran !');
    nex();
}

const errMw = (err, req, res, nex) => {
    console.log(err.message);
    nex();
}
app.use(logger('dev'));
app.use(mw1);
app.use(mw2);
app.use(errMw);
app.listen(3000, () => console.log('Server is running...'));

