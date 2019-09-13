const { Airgram, Auth, prompt } = require('airgram')
const Settings = require('./Settings')
const airgram = new Airgram({
    apiId: Settings.get('apiId', 925988),
    apiHash: Settings.get('apiHash', '8e6cde8b8bb82334fd4cdbbebc376128'),
  
    databaseDirectory: '/etc/safetygram/db/',
    useFileDatabase: true,
    useChatInfoDatabase: true,

    logVerbosityLevel: 0, // 2,

    deviceModel: 'by CuddlyCheetah',
    systemVersion: '1.0.0',
    applicationVersion: '1.1.0',

    useSecretChats: false,
})

module.exports = airgram