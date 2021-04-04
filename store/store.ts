import {RootStore} from './models'

export const store = RootStore.create({
    messages: {},
    user: {},
    bot: {},
    acceptedCall: false,
    resetting: false,
    startedSpeech: false,
    sounds: {}

})