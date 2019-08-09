const { Airgram, Auth, prompt } = require('airgram')
const airgram = new Airgram({
    apiId: 925988,
    apiHash: '8e6cde8b8bb82334fd4cdbbebc376128',
  
    databaseDirectory: '/etc/safetygram/db/',
    useFileDatabase: true,
    useChatInfoDatabase: true,

    logVerbosityLevel: 0, // 2,

    deviceModel: 'by CuddlyCheetah',
    systemVersion: '1.0.0',
    applicationVersion: '1.0.0',
})

module.exports = airgram