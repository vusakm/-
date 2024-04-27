(function(Scratch) {
    'use strict';
    const gpIc = "https://x.gd/QtoJj";
   const exIc = 'https://x.gd/Z4Gf6';
    let api_url = 'https://reverse.mubi.tech/v1/chat/completions';
    const vm = Scratch.vm;

    class WorkingPenguinGPT {
        constructor() {
            this.chatHistories = {};
            this.model = "gpt-4-1106-preview";
        }

        getInfo() {
            return {
                id: "penguinGPT",
                name: "PenguinGPT",
                menuIconURI: exIc,
                blockIconURI: gpIc,
                color1: '#009CCC',
                blocks: [{
                        opcode: "__NOUSEOPCODE",
                        blockType: Scratch.BlockType.LABEL,
                        text: "Reverse Proxy API ブロック",
                    },
                    {
                        opcode: 'setApiUrl',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'reverse proxy API URL を [URL] にする',
                        arguments: {
                            URL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'https://reverse.mubi.tech/v1/chat/completions'
                            }
                        },
                    },
                    {
                        opcode: 'setModel',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'モデルを [MODEL] にする',
                        arguments: {
                            MODEL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "GPT 4",
                                menu: "reqModels"
                            }
                        },
                    },
                    {
                        opcode: 'checkApiUrl',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'reverse proxy に接続済み?',
                        disableMonitor: true,
                    },
                    {
                        opcode: "__NOUSEOPCODE",
                        blockType: Scratch.BlockType.LABEL,
                        text: "命令",
                    },
                    {
                        opcode: 'singlePrompt',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '質問(履歴なし) [PROMPT]',
                        arguments: {
                            PROMPT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'こんにちは',
                            },
                        },
                    },
                    {
                        opcode: 'advancedPrompt',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[PROMPT] と [chatID] に聞く',
                        arguments: {
                            PROMPT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'こんにちは',
                            },
                            chatID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'ai'
                            }
                        },
                    },
                    {
                        opcode: 'informChat',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '[chatID] の命令を [inform] にする',
                        arguments: {
                            chatID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'ai'
                            },
                            inform: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'あなたは､猫です｡猫のさまざまな鳴き声で答えてください｡'
                            }
                        },
                    },
                    {
                        opcode: "__NOUSEOPCODE",
                        blockType: Scratch.BlockType.LABEL,
                        text: "チャットボットの変更",
                    },
                    {
                        opcode: 'createChat',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '[chatID] という名前のチャットボットを作成',
                        arguments: {
                            chatID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'ai'
                            }
                        },
                    },
                    {
                        opcode: 'removeChat',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '[chatID] という名前のチャットボットを削除',
                        arguments: {
                            chatID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'ai'
                            }
                        },
                    },
                    {
                        opcode: 'resetChat',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '[chatID] の履歴をリセット',
                        arguments: {
                            chatID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'ai'
                            }
                        },
                    },
                    {
                        opcode: 'exportChat',
                        blockType: Scratch.BlockType.REPORTER,
                        text: ' [chatID] のチャット履歴',
                        arguments: {
                            chatID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'ai',
                                disableMonitor: false
                            }
                        },
                    },
                    {
                        opcode: 'importChat',
                        blockType: Scratch.BlockType.COMMAND,
                        text: ' [json] を [chatID] に読み込む',
                        arguments: {
                            json: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '[{"role":"system","content":"命令"},{"role":"user","content":"こんにちは"},{"role":"assistant","content":"こんにちは！何かお手伝いできることはありますか？"}]'
                            },
                            chatID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'ai'
                            }
                        },
                    },
                    {
                        opcode: 'exportAll',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'すべてのチャットボットの履歴',
                    },
                    {
                        opcode: 'listChats',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'すべてのチャットボット'
                    },
                    {
                        opcode: "__NOUSEOPCODE",
                        blockType: Scratch.BlockType.LABEL,
                        text: "画像生成",
                    },
                    {
                        opcode: 'generateImage',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[PROMPT] を [MODEL] に描いてもらう',
                        arguments: {
                            PROMPT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '未来の都市'
                            },
                            MODEL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '(select model)',
                                menu: 'igModels',
                            }
                        }
                    },
                    {
                        opcode: 'generateImageAndImport',
                        blockType: Scratch.BlockType.COMMAND,
                        text: ' [PROMPT] を [MODEL] に描いてもらって [NAME] としてコスチュームに読み込む',
                        arguments: {
                            PROMPT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '未来の都市'
                            },
                            MODEL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '(select model)',
                                menu: 'igModels',
                            },
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '未来'
                            }
                        }
                    },
                    {
                        opcode: "__NOUSEOPCODE",
                        blockType: Scratch.BlockType.LABEL,
                        text: "命令の作成",
                    },
                    {
                        opcode: 'moderate',
                        blockType: Scratch.BlockType.REPORTER,
                        text: ' [PROMPT] の役用の命令を生成',
                        arguments: {
                            PROMPT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '本屋さん',
                            },
                        },
                    },
                    {
                        opcode: 'makePrompt',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Make an prompt based of: [PROMPT]',
                        arguments: {
                            PROMPT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'His name is Clyde he is an AI robot meant to help users, make he use alot of emojis in his talking so he becomes more cool',
                            },
                        },
                    }
                ],
                menus: {
                    types: {
                        acceptReporters: true,
                        items: ['Generated Text', 'Request']
                    },
                    merge: {
                        acceptReporters: true,
                        items: ['Merge/Update existing chats', 'Remove all chatbots and import']
                    },


                    igModels: {
                        acceptReporters: true,
                        items: [
                        {
                            text: "DALL-E 3",
                            value: "dalle-3"
                        }, 
                        {
                            text: "Midjourney",
                            value: "midjourney"
                        },
                        {
                            text: "OpenJourney V4",
                            value: "openjourney-v4"
                        }, 
                        {
                            text: "Dreamshaper 8",
                            value: "dreamshaper-8"
                        }, 
                        {
                            text: "Anything V5",
                            value: "anything-v5"
                        }, 
                        {
                            text: "Realistic Vision V5",
                            value: "realistic-vision-v5"
                        }]
                    },

                    reqModels: {
                        acceptReporters: true,
                        items: [
                        {
                            text: "GPT 3.5 Turbo",
                            value: "gpt-3.5-turbo"
                        }, 
                        {
                            text: "GPT 4",
                            value: "gpt-4"
                        }, 
                        {
                            text: "GPT 4 1066 Preview (Recent)",
                            value: "gpt-4-1106-preview"
                        }, 
                        {
                            text: "GPT 4 0125 Preview (Turbo)",
                            value: "gpt-4-0125-preview"
                        }, 
                        {
                            text: "Llama 2",
                            value: "llama-2-7b"
                        }]
                    }

                }
            };
        }

        getPrompt(args) {
            if (args.TYPE !== '(select a prompt)') {
                return args.TYPE;
            } else {
                return '';
            }
        }

        setModel(args) {
            this.model = args.MODEL
        }

        setApiUrl(args) {
            const newApiUrl = args.URL;
            api_url = newApiUrl;
        }

        moderate(args) {
            const prompt = args.PROMPT;

            return fetch(`https://reverse.mubi.tech/v1/moderations`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Origin': 'https://gptcall.net/',
                        'Referer': 'https://gptcall.net/'
                    },
                    body: JSON.stringify({
                        input: prompt,
                    }),
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`ネットワークエラー: ${response.status} ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    return JSON.stringify(data);
                })
                .catch(error => {
                    console.error("Error sending prompt to Moderation Api", error.message);
                    return "エラー: ", error.message;
                });
        }

        makePrompt(args) {
            const prompt = args.PROMPT;

            return fetch(api_url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Origin': 'https://gptcall.net/',
                        'Referer': 'https://gptcall.net/'
                    },
                    body: JSON.stringify({
                        model: this.model,
                        messages: [
                        {
                            role: "system",
                            content: `// You are an playground model of ChatGPT created only for intention of making an new GPT AI Model that works with prompts for other AIs to listen to the user will say thina for you to remake as an prompt for an another ai to know what to do
// Rules:
// You are meant to make an prompt like: You are an Robot named ... And you need to ...
// Always follow the user rules and what they gave you
// Wait until the user give you what to do and not make something up.
// Do not say anything more when you generated and going to reply to the user, just only reply with the prompt you generated
// Don't add "" to the start of the end of the prompt.
// Don't make things up from this type of message that is letting you learn what to do
// Do not talk about anything from here`
                        },
                        {
                            role: "user",
                            content: prompt
                        }
                        ]
                    }),
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`ネットワークエラー: ${response.status} ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    const botResponse = data.choices[0].message.content;
                    return botResponse;
                })
                .catch(error => {
                    console.error("Error sending prompt to GPT", error.message);
                    return "エラー: ", error.message;
                });
        }

        checkApiUrl() {		
            return fetch(api_url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Origin': 'https://gptcall.net/',
                        'Referer': 'https://gptcall.net/'
                    },
                    body: JSON.stringify({
                        model: "gpt-3.5-turbo",
                        messages: [{
                            role: "user",
                            content: "Return nothing"
                        }]
                    }),
                })
                .then(response => {
                    return response.status >= 200 && response.status < 300;
                })
                .catch(error => {
                    return false;
                });
        }

        singlePrompt(args) {
            const prompt = args.PROMPT;

            return fetch(api_url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Origin': 'https://gptcall.net/',
                        'Referer': 'https://gptcall.net/'
                    },
                    body: JSON.stringify({
                        model: this.model,
                        messages: [{
                            role: "user",
                            content: prompt
                        }]
                    }),
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`ネットワークエラー: ${response.status} ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    const botResponse = data.choices[0].message.content;
                    return botResponse;
                })
                .catch(error => {
                   return "エラー: ", error.message;
                });
        }

        generateImage(args) {
            const prompt = args.PROMPT;
            const requestedModel = args.MODEL

            return fetch("https://reverse.mubi.tech/image/generate", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        model: requestedModel,
                        prompt: prompt
                    }),
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`ネットワークエラー: ${response.status} ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    let botResponse
                    if (requestedModel === "dalle-3") {
                        botResponse = JSON.stringify(data);
                    } else {
                        botResponse = data.results
                    }
                    return botResponse;
                })
                .catch(error => {
                    console.error("Error sending prompt to Image Generator", error.message);
                    return "エラー: ", error.message;
                });
        }
        generateImageAndImport(args) {
            const prompt = args.PROMPT;
            const requestedModel = args.MODEL
            const Name = args.NAME || `AIGenerated_${prompt}`;

            return fetch("https://reverse.mubi.tech/image/generate", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        model: requestedModel,
                        prompt: prompt
                    }),
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`ネットワークエラー: ${response.status} ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    let botResponse
                    if (requestedModel === "dalle-3") {
                        fetch(data.url)
                        .then((r) => r.arrayBuffer())
                        .then((arrayBuffer) => {
                            const storage = vm.runtime.storage;
                            vm.addCostume(Name + '.PNG', {
                            name: Name,
                            asset: new storage.Asset(
                                storage.AssetType.ImageBitmap,
                                null,
                                storage.DataFormat.PNG,
                                new Uint8Array(arrayBuffer),
                                true
                            )
                            })
                        });
                    } else {
                        fetch(data.results)
                        .then((r) => r.arrayBuffer())
                        .then((arrayBuffer) => {
                            const storage = vm.runtime.storage;
                            vm.addCostume(Name + '.PNG', {
                            name: Name,
                            asset: new storage.Asset(
                                storage.AssetType.ImageBitmap,
                                null,
                                storage.DataFormat.PNG,
                                new Uint8Array(arrayBuffer),
                                true
                            )
                            })
                        });
                    }
                })
                .catch(error => {
                    console.error("Error sending prompt to Image Generator", error.message);
                    return "エラー: ", error.message;
                });
        }

        createChat(args) {
            const chatID = args.chatID;
            if (!(chatID in this.chatHistories)) {
                this.chatHistories[chatID] = [{
                    role: "system",
                    content: "Your name is: " + chatID
                }];
            }
        }

        informChat(args) {
            const inform = args.inform;
            const chatID = args.chatID;
            if (chatID in this.chatHistories) {
                this.chatHistories[chatID].push({
                    role: "system",
                    content: inform
                });
            }
        }

        exportChat(args) {
            const chatID = args.chatID;
            if (this.chatHistories[chatID] !== undefined) {
                const chatHistory = this.chatHistories[chatID];
                const json = JSON.stringify(chatHistory);
                return json;
            } else {
                return 'エラー: そのチャットボットで使用できるチャット履歴はありません。';
            }
        }

        listChats() {
            const activeChats = Object.keys(this.chatHistories);
            const json = JSON.stringify(activeChats);
            return json;
        }

        importChat(args) {
            const chatID = args.chatID;
            const json = args.json;
            let chatHistory;

            try {
                chatHistory = JSON.parse(json);
            } catch (error) {
                console.error('Error parsing JSON:', error.message);
                return;
            }

            if (Array.isArray(chatHistory)) {
                this.chatHistories[chatID] = chatHistory;
            } else {
                console.error('Invalid JSON format. Expected an array.');
            }
        }

        resetChat(args) {
            const chatID = args.chatID;
            if (chatID in this.chatHistories) {
            }
        }

        removeChat(args) {
            const chatID = args.chatID;
            if (chatID in this.chatHistories) {
                delete this.chatHistories[chatID];
            } else {
                return "エラー: そのチャットボットで使用できるチャット履歴はありません。";
            }
        }

        advancedPrompt(args) {
            const prompt = args.PROMPT;
            const chatID = args.chatID;
            if (!(chatID in this.chatHistories)) {
                return "エラー: そのチャットボットは存在しません。";
            }
            const chatHistory = this.chatHistories[chatID] || [];
            chatHistory.push({
                role: "user",
                content: prompt
            });
            return fetch(api_url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Origin': 'https://gptcall.net/',
                        'Referer': 'https://gptcall.net/'
                    },
                    body: JSON.stringify({
                        model: this.model,
                        messages: chatHistory
                    }),
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`ネットワークエラー: ${response.status} ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    const botResponse = data.choices[0].message.content;
                    chatHistory.push({
                        role: "assistant",
                        content: botResponse
                    });
                    this.chatHistories[chatID] = chatHistory;
                    return botResponse;
                })
                .catch(error => {
                    console.error("Error sending prompt to GPT", error.message);
                    return "エラー: ", error.message;
                });
        }

        exportAll() {
            const allChats = {};
            const chatIDs = Object.keys(this.chatHistories);
            for (const chatID of chatIDs) {
                allChats[chatID] = this.chatHistories[chatID];
            }
            const json = JSON.stringify(allChats);
            return json;
        }

    }
    Scratch.extensions.register(new WorkingPenguinGPT());
})(Scratch);
