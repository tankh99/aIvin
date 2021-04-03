import {types} from 'mobx-state-tree';
import { number } from 'mobx-state-tree/dist/internal';
import { Bot } from './bot';
import {Message} from './message'
import { User } from './user';

export const RootStore = types.model({
    messages: types.optional(types.map(Message), {}),
    user: types.optional(User, {}),
    bot: types.optional(Bot, {})
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
    }
}))