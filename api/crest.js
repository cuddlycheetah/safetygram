const Settings = require('../Settings')
const UUIDV4 = require('uuid/v4')
const { sequelize,
	User, UserInfo, UserNameset,
	Message, MessageEdit } = require('../database')

module.exports = (router) => {
	router.get('/users', (req, res) => {
		Message.aggregate('chatId', 'DISTINCT', { plain: false })
		.then(distinctresults => {
			const chatIds = distinctresults.map(distinctResult => distinctResult.DISTINCT)
			console.log(distinctresults, chatIds)
			return Message.findAll({
				where: { chatId: chatIds },
				order: [
					[ 'createdAt', 'DESC' ],
				],
			})
		})
		.then(async messages => {
			const chatIds = messages.map(message => message.chatId)
			return User.findAll({
				where: { id: chatIds },
				include: [
					{
						model: UserNameset,
						limit: 1,
						order: [
							[ 'createdAt', 'DESC' ],
						]
					},
					{
						model: UserInfo,
						limit: 1,
						order: [
							[ 'createdAt', 'DESC' ],
						]
					},
				],
			})
		})
		.then(async result => {
			return res.json(result)
		})
		.catch(error => {
			return res.status(412).json({ msg: error.message });
		});
	});
};