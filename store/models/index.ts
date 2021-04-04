import {types} from 'mobx-state-tree';
import { number } from 'mobx-state-tree/dist/internal';
import { Bot } from './bot';
import { Sound } from './sound';
import {Message} from './message'
import { User } from './user';

export const RootStore = types.model({
    messages: types.optional(types.map(Message), {}),
    user: types.optional(User, {}),
    bot: types.optional(Bot, {}),
    resetting: types.optional(types.boolean, false),
    acceptedCall: types.optional(types.boolean, false),
    startedSpeech: types.optional(types.boolean, false),
    sounds: types.optional(Sound, {})
})
.actions((self: any) => ({
    addMessage(id: number, body:string, sender:string){
        self.messages.set(id, Message.create({body, sender, timestamp: new Date()}))
    },
    clearMessages(){
        self.messages.set([])
    },
    addUser(username: string){
        self.user = User.create({username})
    },
    updateBot(name: string, description: string){
        self.bot = Bot.create({name, description})
    },
    updateResetting(resetting:boolean){
        self.resetting = resetting;
    },
    updateAcceptedCall(acceptedCall: boolean){
        self.acceptedCall = acceptedCall;
    },
    updateStartedSpeech(startedSpeech: boolean){
        self.startedSpeech = startedSpeech
    },
    updateSounds(name: string, sound: any){
        // self.sounds = Sound.create({[name]: {...sound}})
        const test = {
            name: "he"
        }
        self.sounds = Sound.create({...test})
    }
}))