var express = require('express');

const Casamento = require('../controllers/Casamento');
var router = express.Router();

router.get('/api/casamentos', function (req, res, next) {
  if (req.query.nome) {
    Casamento.getWithNames(req.query.nome)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp({ "error": erro }))
  } else if (req.query.ano) {
    Casamento.getWithYear(req.query.ano)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp({ "error": erro }))
  } else if (req.query.byAno) {
    Casamento.listar()
      .then(dados => {
        allYears = []

        for (let i = 0; i < dados.length; i++) {
          var obj = dados[i];
          line = obj["date"];

          var year = line.substring(0, 4);

          if (!allYears.includes(year)) {
            allYears.push(year)
          }
        }
        allYears.sort();

        result = [];
        casamentosEmAno = []

        allYears.forEach(y => {

          Casamento.getWithYear(y)
            .then(data => {
              data.forEach(element => {
                
                aux = {
                  "_id": element["_id"],
                  "title": element["title"]
                }

                casamentosEmAno.push(aux)
              });
            })
            .catch(erro => res.status(500).jsonp({ "error": erro }))
            // console.log(casamentosEmAno);
            element = {
              "ano": y,
              "casamentos": casamentosEmAno
            }

            result.push(element )
            casamentosEmAno = []
        });
        res.jsonp(result)
      })
      .catch(erro => res.status(500).jsonp({ "error": erro }))

  }
  else{
    Casamento.listar()
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp({ "error": erro }))
  }
});

router.get('/api/casamentos/noivos', function (req, res, next) {
  Casamento.listar()
    .then(dados => {
      result = []

      for (let i = 0; i < dados.length; i++) {
        var obj = dados[i];
        line = obj["title"];

        var noivo = line.substring(
          line.lastIndexOf(": ") + 1,
          line.lastIndexOf("c.c."))

        var id = obj["_id"]

        var r = {
          "id": id,
          "noivo": noivo
        }
        result.push(r)
      }

      result.sort((a, b) => a.noivo.localeCompare(b.noivo));

      res.jsonp(result)
    })
    .catch(erro => res.status(500).jsonp({ "error": erro }))
});

router.get('/api/casamentos/:id', function (req, res, next) {
  Casamento.consultar(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp({ "error": erro }))
});



module.exports = router;
