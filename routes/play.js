var express = require('express');
var util = require('../config/util.js');
var router = express.Router();
const { Web3 } = require('web3');
const config = require('config');


router.get('/', function(req, res) {
    res.render('partials/play', {
        title: 'Chess Hub - Game',
        user: req.user,
        isPlayPage: true
    });
});

router.post('/', function(req, res) {
    var side = req.body.side;
    //var opponent = req.body.opponent; // playing against the machine in not implemented
    var token = util.randomString(20);
    res.redirect('/game/' + token + '/' + side);
});

router.get('/isSwapEnabled', async  (_, res) => {
    const web3 = new Web3(config.get('contracts.provider'))
    const contract = new web3.eth.Contract(config.get('contracts.abi'), config.get('contracts.address'));
    const isSwapEnabled = await contract.methods.isSwapEnabled().call()
    res.json({isSwapEnabled}).end()
})

module.exports = router;