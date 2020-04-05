const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');

    const toReadList = [{bookId: "1", title: 'book A', authors: ["author A"]}]

    const haveReadList = [{bookId: "2", title: 'book B', authors: ["author B"]}]


    router.get('/toRead', (req, res) => res.send(toReadList));
    router.get('/haveRead', (req, res) => res.send(haveReadList));


    router.post('/toRead', (req, res) => {
        const body = req.body;
        var existed = false;

        // for (var i = toReadList.length - 1; i >= 0; i--) {
        //     if (toReadList[i].bookId === body.bookId) {
        //         existed = true;
        //         res.status(200).send({message: 'This book is already in the toRead list!', bookId: body.bookId});
        //     }
        // }
        toReadList.push({
            bookId: body.bookId,
            title: body.title,
            authors: body.authors,
        });
        res.status(200).send({message: 'Success!', newBook: body});
        if (!existed) {

        }

    });

    router.post('/haveRead', (req, res) => {
        const body = req.body;
        var existed = false;

        // for (var i = haveReadList.length - 1; i >= 0; i--) {
        //     if (haveReadList[i].bookId === body.bookId) {
        //         existed = true;
        //         res.status(200).send({message: 'This book is already in the haveRead list!', bookId: body.bookId});
        //     }
        // }
        haveReadList.push({
            bookId: body.bookId,
            title: body.title,
            authors: body.authors,
        });
        res.status(200).send({message: 'Success!', newBook: body});
        if (!existed) {

        }

    });


    router.delete('/toRead/:bookId', function (req, res) {
        const bookId = req.params.bookId;
        for (var i = toReadList.length - 1; i >= 0; i--) {
            if (toReadList[i].bookId === bookId) {
                toReadList.splice(i, 1);
            }
        }
        res.status(200).send('Success!');
    });

    router.delete('/haveRead/:bookId', function (req, res) {
        const bookId = req.params.bookId;
        for (var i = haveReadList.length - 1; i >= 0; i--) {
            if (haveReadList[i].bookId === bookId) {
                haveReadList.splice(i, 1);
            }
        }
        res.status(200).send('Success!');
    });
    
    module.exports = router;





