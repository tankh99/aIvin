export function formatBotGiftedChatResponse(text: string, botName: string){
    const responseObj = {
        _id: Math.random(),
        text,
        createdAt: new Date(),
        user: {
            _id: 2,
            name: botName,
            avatar: require("../assets/icons/ai-icon.png")
        }
    }
    return responseObj
}