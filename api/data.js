const Settings = require('../Settings')
const UUIDV4 = require('uuid/v4')

const { sequelize, 
    User, UserInfo, UserNameset,
    Message, MessageEdit } =  require('../database')
const PAGE_SIZE = 50

module.exports = (router, route, Schema) => {
    console.log('registering route' + route)
    router.get(route, (req, res) => {
        Schema.findAll(req.query ? { where: req.query } : {})
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({ msg: error.message });
            });
    })
    router.get(route + '/@count', (req, res) => {
        Schema.count(req.query ? { where: req.query } : {})
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({ msg: error.message });
            });
    })
    router.get(route + '/@page/:chatid/:page', (req, res) => {
        Schema.findAll({ 
            where: { 
                chatId: req.params.chatid
            },
            order: sequelize.literal('id ASC'),
            limit: PAGE_SIZE,
            offset: PAGE_SIZE * (parseInt(req.params.page) | 0)
        })
        .then(result => res.json(result))
        .catch(error => {
            res.status(412).json({ msg: error.message });
        });
    })
      /*.post((req, res) => {
        Schema.create(req.body)
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })*/;

    router.get(route + '/:id', (req, res) => {
        Schema.findOne({ where: req.params })
            .then(result => {
                if (result) {
                    res.json(result);
                } else {
                    res.sendStatus(404);
                }
            })
            .catch(error => {
                res.status(412).json({ msg: error.message });
            });
    })
    router.delete(route + '/:id', (req, res) => {
        Schema.destroy({ where: req.params })
            .then(result => res.sendStatus(204))
            .catch(error => {
                res.status(204).json({ msg: error.message });
            });
    });
};