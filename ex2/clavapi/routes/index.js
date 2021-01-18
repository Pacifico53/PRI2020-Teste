var express = require('express');
var router = express.Router();

var axios = require('axios');

var cred = { username: "pri2020@teste.uminho.pt", password: "123" };

router.get('/', function (req, res) {
  axios.post('http://clav-api.di.uminho.pt/v2/users/login', cred)
    .then((dados) => {
      mytoken = dados.data.token
      axios.get('http://clav-api.di.uminho.pt/v2/classes',
        {
          params: {
            nivel: 1,
            token: mytoken
          }
        })
        .then((lista) => {
          res.render('index', { lista: lista.data })
        })
    })
});

router.get('/classe/:id', function (req, res) {
  axios.post('http://clav-api.di.uminho.pt/v2/users/login', cred)
    .then((dados) => {
      mytoken = dados.data.token
      axios.get('http://clav-api.di.uminho.pt/v2/classes/' + req.params.id + '/descendencia',
        {
          params: {
            token: mytoken
          }
        })
        .then((classe) => {
          console.log(classe.data);
          res.render('individual', { classe: classe.data, title: req.params.id })
        })
        .catch(erro => {
          res.render('error', { error: erro })
        })
    })
});

// GET uma classe para mostrar ao clicar nela na lista
router.get('/:id', function (req, res) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes/c' + req.params.id + '/descendencia?token=' + token)
    .then(dados => {
      res.render('index', { classe: dados.data });
    })
    .catch(erro => {
      res.render('error', { error: erro })
    })
})

module.exports = router;
