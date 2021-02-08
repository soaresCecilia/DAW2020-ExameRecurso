var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')

const Team = require('../controllers/team')




/* GET home page. */
router.get('/', function(req, res, next) {
  Team.listar2()
  .then(dados => res.status(200).jsonp(dados) )
  .catch(e => res.status(500).jsonp({error: e}))
});


/* GET /api/teams 
Devolve a lista de equipes, com os campos: 
_id, team, pitch1, pitch2, techPitch, 
businessReport, techReport, e nmembers (número de membros da equipe);
*/
router.get('/api/teams', function(req, res, next) {
  Team.listar()
  .then(dados => res.status(200).jsonp(dados) )
  .catch(e => res.status(500).jsonp({error: e}))
});


/*
GET /api/teams/:id - Devolve toda a informação de uma equipe (o registo completo em JSON);
*/
router.get('/api/teams/:id', function(req, res, next) {
  Team.consultar(req.params.id)
  .then(dados => res.status(200).jsonp(dados) )
  .catch(e => res.status(500).jsonp({error: e}))
});

/*
GET /api/teams/:id/members/:idMember - Devolve a informação de um membro da equipe (o registo em JSON);
*/
router.get('/api/teams/:id/members/:idMember', function(req, res, next) {
  console.log(req.params)
  Team.consultarMembro(req.params.id, req.params.idMember)
  .then(dados => res.status(200).jsonp(dados) )
  .catch(e => res.status(500).jsonp({error: e}))
});


/*
POST /api/teams - Insere uma equipe na base de dados (o registo é fornecido em JSON no body);
*/

router.post('/api/teams', function(req, res, next) {
  console.log(req.body)
  Team.inserir(req.body)
  .then(dados => res.status(200).jsonp(dados) )
  .catch(e => res.status(500).jsonp({error: e}))
});


/*
POST /api/teams/:id/members 
Insere um novo membro numa determinada equipe (o registo do novo membro é fornecido em JSON no body);
*/

router.post('/api/teams/:id/members', function(req, res, next) {
  console.log(req.body)
  Team.inserir2(req.params.id, req.body)
  .then(dados => res.status(200).jsonp(dados) )
  .catch(e => res.status(500).jsonp({error: e}))
});



/*
DELETE /api/teams/:id - Apaga uma equipe, devolve um booleano como resultado;
*/

router.delete('/api/teams/:id', function(req, res, next) {
  console.log(req.body)
  Team.remover(req.params.id)
  .then(dados => res.status(200).jsonp(dados) )
  .catch(e => res.status(500).jsonp({error: e}))
});


/*
DELETE /api/teams/:id/members/:idMember - Apaga um membro duma equipe, devolve um booleano como resultado;
*/

router.delete('/api/teams/:id/members/:idMember', function(req, res, next) {
  console.log(req.params)
  Team.remover2(req.params.id, req.params.idMember)
  .then(dados => res.status(200).jsonp(dados) )
  .catch(e => res.status(500).jsonp({error: e}))
});


/*
GET /api/token - devolve um 
token gerado no momento com o segredo 
"DAW-PRI-2020-recurso" e com o payload 
{"sub":"Exame", "data": "dataDoSistema"};
*/
router.get('/api/token', function(req, res, next) {
  jwt.sign({ sub: "Exame", data: "dataDoSistema" }, 
    "DAW-PRI-2020-recurso",
    function(e, token){
      if(e) res.status(500).jsonp({error: "Error during token generation: " + e})
      else res.status(201).jsonp({token: token})
})
})


module.exports = router;
