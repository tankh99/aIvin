import {types} from 'mobx-state-tree';

export const Message = types.model({
    sender: "",
    body: "",
    timestamp: new Date()
})