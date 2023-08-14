function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

const rid = `${makeid(8) + "-" + makeid(4)}`
const randomid = rid.toString()
const rnumber = `${Math.floor(Math.random() * 10000000000)}`
const randomnumber = rnumber.toString()
const positiveprompt = "girl"
const negativeprompt = "realistic"

const request = {
    "id": randomid,
    "graph": {
        "id": "text_to_image_graph",
        "nodes": {
            "main_model_loader": {
                "id": "main_model_loader",
                "is_intermediate": false,
                "type": "main_model_loader",
                "model": {
                    "model_name": "Unreal_V4.1",
                    "base_model": "sd-1"
                }
            },
            "clip_skip": {
                "id": "clip_skip",
                "is_intermediate": false,
                "type": "clip_skip",
                "clip": null,
                "skipped_layers": 0
            },
            "positive_conditioning": {
                "id": "positive_conditioning",
                "is_intermediate": false,
                "type": "compel",
                "prompt": positiveprompt,
                "clip": null
            },
            "negative_conditioning": {
                "id": "negative_conditioning",
                "is_intermediate": false,
                "type": "compel",
                "prompt": negativeprompt,
                "clip": null
            },
            "noise": {
                "id": "noise",
                "is_intermediate": false,
                "type": "noise",
                "seed": randomnumber,
                "width": 512,
                "height": 512,
                "use_cpu": true
            },
            "text_to_latents": {
                "id": "text_to_latents",
                "is_intermediate": false,
                "type": "t2l",
                "positive_conditioning": null,
                "negative_conditioning": null,
                "noise": null,
                "steps": 40,
                "cfg_scale": 7.5,
                "scheduler": "euler",
                "unet": null,
                "control": null
            },
            "latents_to_image": {
                "id": "latents_to_image",
                "is_intermediate": false,
                "type": "l2i",
                "latents": null,
                "vae": null,
                "tiled": false,
                "fp32": true,
                "metadata": null
            },
            "metadata_accumulator": {
                "id": "metadata_accumulator",
                "is_intermediate": false,
                "type": "metadata_accumulator",
                "generation_mode": "txt2img",
                "positive_prompt": positiveprompt,
                "negative_prompt": negativeprompt,
                "width": 512,
                "height": 512,
                "seed": 0,
                "rand_device": "cpu",
                "cfg_scale": 7.5,
                "steps": 40,
                "scheduler": "euler",
                "clip_skip": 0,
                "model": {
                    "model_name": "Unreal_V4.1",
                    "base_model": "sd-1"
                },
                "controlnets": [],
                "loras": [
                    {
                        "lora": {
                            "model_name": "newb_0.1",
                            "base_model": "sd-1"
                        },
                        "weight": 0.75
                    }
                ],
                "strength": null,
                "init_image": null,
                "vae": null,
                "positive_style_prompt": null,
                "negative_style_prompt": null,
                "refiner_model": null,
                "refiner_cfg_scale": null,
                "refiner_steps": null,
                "refiner_scheduler": null,
                "refiner_aesthetic_store": null,
                "refiner_start": null
            },
            "lora_loader_newb_0_1": {
                "id": "lora_loader_newb_0_1",
                "is_intermediate": true,
                "type": "lora_loader",
                "lora": {
                    "model_name": "newb_0.1",
                    "base_model": "sd-1"
                },
                "weight": 0.75,
                "unet": null,
                "clip": null
            },
            "iterate": {
                "id": "iterate",
                "is_intermediate": true,
                "type": "iterate",
                "collection": [],
                "index": 0
            },
            "range_of_size": {
                "id": "range_of_size",
                "is_intermediate": true,
                "type": "range_of_size",
                "start": 0,
                "size": 1,
                "step": 1
            },
            "rand_int": {
                "id": "rand_int",
                "is_intermediate": true,
                "type": "rand_int",
                "low": 0,
                "high": 2147483647
            }
        },
        "edges": [
            {
                "source": {
                    "node_id": "main_model_loader",
                    "field": "clip"
                },
                "destination": {
                    "node_id": "clip_skip",
                    "field": "clip"
                }
            },
            {
                "source": {
                    "node_id": "positive_conditioning",
                    "field": "conditioning"
                },
                "destination": {
                    "node_id": "text_to_latents",
                    "field": "positive_conditioning"
                }
            },
            {
                "source": {
                    "node_id": "negative_conditioning",
                    "field": "conditioning"
                },
                "destination": {
                    "node_id": "text_to_latents",
                    "field": "negative_conditioning"
                }
            },
            {
                "source": {
                    "node_id": "text_to_latents",
                    "field": "latents"
                },
                "destination": {
                    "node_id": "latents_to_image",
                    "field": "latents"
                }
            },
            {
                "source": {
                    "node_id": "noise",
                    "field": "noise"
                },
                "destination": {
                    "node_id": "text_to_latents",
                    "field": "noise"
                }
            },
            {
                "source": {
                    "node_id": "metadata_accumulator",
                    "field": "metadata"
                },
                "destination": {
                    "node_id": "latents_to_image",
                    "field": "metadata"
                }
            },
            {
                "source": {
                    "node_id": "main_model_loader",
                    "field": "unet"
                },
                "destination": {
                    "node_id": "lora_loader_newb_0_1",
                    "field": "unet"
                }
            },
            {
                "source": {
                    "node_id": "clip_skip",
                    "field": "clip"
                },
                "destination": {
                    "node_id": "lora_loader_newb_0_1",
                    "field": "clip"
                }
            },
            {
                "source": {
                    "node_id": "lora_loader_newb_0_1",
                    "field": "unet"
                },
                "destination": {
                    "node_id": "text_to_latents",
                    "field": "unet"
                }
            },
            {
                "source": {
                    "node_id": "lora_loader_newb_0_1",
                    "field": "clip"
                },
                "destination": {
                    "node_id": "positive_conditioning",
                    "field": "clip"
                }
            },
            {
                "source": {
                    "node_id": "lora_loader_newb_0_1",
                    "field": "clip"
                },
                "destination": {
                    "node_id": "negative_conditioning",
                    "field": "clip"
                }
            },
            {
                "source": {
                    "node_id": "main_model_loader",
                    "field": "vae"
                },
                "destination": {
                    "node_id": "latents_to_image",
                    "field": "vae"
                }
            },
            {
                "source": {
                    "node_id": "range_of_size",
                    "field": "collection"
                },
                "destination": {
                    "node_id": "iterate",
                    "field": "collection"
                }
            },
            {
                "source": {
                    "node_id": "iterate",
                    "field": "item"
                },
                "destination": {
                    "node_id": "noise",
                    "field": "seed"
                }
            },
            {
                "source": {
                    "node_id": "iterate",
                    "field": "item"
                },
                "destination": {
                    "node_id": "metadata_accumulator",
                    "field": "seed"
                }
            },
            {
                "source": {
                    "node_id": "rand_int",
                    "field": "a"
                },
                "destination": {
                    "node_id": "range_of_size",
                    "field": "start"
                }
            }
        ]
    },
    "execution_graph": {
        "id": randomid,
        randomid: {
            randomid: {
                "id": randomid,
                "is_intermediate": false,
                "type": "main_model_loader",
                "model": {
                    "model_name": "Unreal_V4.1",
                    "base_model": "sd-1"
                }
            },
            "c6ccba45-37fd-40f6-b8df-db0143cb5820": {
                "id": "c6ccba45-37fd-40f6-b8df-db0143cb5820",
                "is_intermediate": true,
                "type": "rand_int",
                "low": 0,
                "high": 2147483647
            },
            "8d8c1cb2-960b-4e09-84cd-0dad145716ad": {
                "id": "8d8c1cb2-960b-4e09-84cd-0dad145716ad",
                "is_intermediate": false,
                "type": "clip_skip",
                "clip": {
                    "tokenizer": {
                        "model_name": "Unreal_V4.1",
                        "base_model": "sd-1",
                        "model_type": "main",
                        "submodel": "tokenizer"
                    },
                    "text_encoder": {
                        "model_name": "Unreal_V4.1",
                        "base_model": "sd-1",
                        "model_type": "main",
                        "submodel": "text_encoder"
                    },
                    "skipped_layers": 0,
                    "loras": []
                },
                "skipped_layers": 0
            },
            "e67e5cc5-c39a-41e7-a2ff-24cbb390ce5d": {
                "id": "e67e5cc5-c39a-41e7-a2ff-24cbb390ce5d",
                "is_intermediate": true,
                "type": "range_of_size",
                "start": 1282458505,
                "size": 1,
                "step": 1
            },
            "7c747ad2-59ee-43f4-8718-d098967573e2": {
                "id": "7c747ad2-59ee-43f4-8718-d098967573e2",
                "is_intermediate": true,
                "type": "lora_loader",
                "lora": {
                    "model_name": "newb_0.1",
                    "base_model": "sd-1"
                },
                "weight": 0.75,
                "unet": {
                    "unet": {
                        "model_name": "Unreal_V4.1",
                        "base_model": "sd-1",
                        "model_type": "main",
                        "submodel": "unet"
                    },
                    "scheduler": {
                        "model_name": "Unreal_V4.1",
                        "base_model": "sd-1",
                        "model_type": "main",
                        "submodel": "scheduler"
                    },
                    "loras": []
                },
                "clip": {
                    "tokenizer": {
                        "model_name": "Unreal_V4.1",
                        "base_model": "sd-1",
                        "model_type": "main",
                        "submodel": "tokenizer"
                    },
                    "text_encoder": {
                        "model_name": "Unreal_V4.1",
                        "base_model": "sd-1",
                        "model_type": "main",
                        "submodel": "text_encoder"
                    },
                    "skipped_layers": 0,
                    "loras": []
                }
            },
            "4a4f8531-ca3b-43f9-9038-8ae8d05b6305": {
                "id": "4a4f8531-ca3b-43f9-9038-8ae8d05b6305",
                "is_intermediate": false,
                "type": "compel",
                "prompt": "bad anatomy, hands, fingers, finger, hand, one leg, long arm, bad face, realistic\n",
                "clip": {
                    "tokenizer": {
                        "model_name": "Unreal_V4.1",
                        "base_model": "sd-1",
                        "model_type": "main",
                        "submodel": "tokenizer"
                    },
                    "text_encoder": {
                        "model_name": "Unreal_V4.1",
                        "base_model": "sd-1",
                        "model_type": "main",
                        "submodel": "text_encoder"
                    },
                    "skipped_layers": 0,
                    "loras": [
                        {
                            "model_name": "newb_0.1",
                            "base_model": "sd-1",
                            "model_type": "lora",
                            "submodel": null,
                            "weight": 0.75
                        }
                    ]
                }
            },
            "4fe78575-212d-46fa-a8d4-3346ea188314": {
                "id": "4fe78575-212d-46fa-a8d4-3346ea188314",
                "is_intermediate": false,
                "type": "compel",
                "prompt": "anime girl, sky sunset background, fabulous eyes, naked",
                "clip": {
                    "tokenizer": {
                        "model_name": "Unreal_V4.1",
                        "base_model": "sd-1",
                        "model_type": "main",
                        "submodel": "tokenizer"
                    },
                    "text_encoder": {
                        "model_name": "Unreal_V4.1",
                        "base_model": "sd-1",
                        "model_type": "main",
                        "submodel": "text_encoder"
                    },
                    "skipped_layers": 0,
                    "loras": [
                        {
                            "model_name": "newb_0.1",
                            "base_model": "sd-1",
                            "model_type": "lora",
                            "submodel": null,
                            "weight": 0.75
                        }
                    ]
                }
            },
            "17541bd8-7ba6-4a70-b095-3d0e999dc2b9": {
                "id": "17541bd8-7ba6-4a70-b095-3d0e999dc2b9",
                "is_intermediate": true,
                "type": "iterate",
                "collection": [
                    1282458505
                ],
                "index": 0
            },
            "667194d1-a44b-4594-804a-f08fe4a34545": {
                "id": "667194d1-a44b-4594-804a-f08fe4a34545",
                "is_intermediate": false,
                "type": "noise",
                "seed": 1282458505,
                "width": 512,
                "height": 512,
                "use_cpu": true
            },
            "edac4aa0-8282-4c4e-bc42-08e998f23d7d": {
                "id": "edac4aa0-8282-4c4e-bc42-08e998f23d7d",
                "is_intermediate": false,
                "type": "metadata_accumulator",
                "generation_mode": "txt2img",
                "positive_prompt": "anime girl, sky sunset background, fabulous eyes, naked",
                "negative_prompt": "bad anatomy, hands, fingers, finger, hand, one leg, long arm, bad face, realistic\n",
                "width": 512,
                "height": 512,
                "seed": 1282458505,
                "rand_device": "cpu",
                "cfg_scale": 7.5,
                "steps": 40,
                "scheduler": "euler",
                "clip_skip": 0,
                "model": {
                    "model_name": "Unreal_V4.1",
                    "base_model": "sd-1"
                },
                "controlnets": [],
                "loras": [
                    {
                        "lora": {
                            "model_name": "newb_0.1",
                            "base_model": "sd-1"
                        },
                        "weight": 0.75
                    }
                ],
                "strength": null,
                "init_image": null,
                "vae": null,
                "positive_style_prompt": null,
                "negative_style_prompt": null,
                "refiner_model": null,
                "refiner_cfg_scale": null,
                "refiner_steps": null,
                "refiner_scheduler": null,
                "refiner_aesthetic_store": null,
                "refiner_start": null
            },
            "52e0992c-d80c-4bd7-a852-dd89bfa042db": {
                "id": "52e0992c-d80c-4bd7-a852-dd89bfa042db",
                "is_intermediate": false,
                "type": "t2l",
                "positive_conditioning": {
                    "conditioning_name": "421f8685-2d56-445a-9378-47e20a7699ec_4fe78575-212d-46fa-a8d4-3346ea188314_conditioning"
                },
                "negative_conditioning": {
                    "conditioning_name": "421f8685-2d56-445a-9378-47e20a7699ec_4a4f8531-ca3b-43f9-9038-8ae8d05b6305_conditioning"
                },
                "noise": {
                    "latents_name": "421f8685-2d56-445a-9378-47e20a7699ec__667194d1-a44b-4594-804a-f08fe4a34545"
                },
                "steps": 40,
                "cfg_scale": 7.5,
                "scheduler": "euler",
                "unet": {
                    "unet": {
                        "model_name": "Unreal_V4.1",
                        "base_model": "sd-1",
                        "model_type": "main",
                        "submodel": "unet"
                    },
                    "scheduler": {
                        "model_name": "Unreal_V4.1",
                        "base_model": "sd-1",
                        "model_type": "main",
                        "submodel": "scheduler"
                    },
                    "loras": [
                        {
                            "model_name": "newb_0.1",
                            "base_model": "sd-1",
                            "model_type": "lora",
                            "submodel": null,
                            "weight": 0.75
                        }
                    ]
                },
                "control": null
            },
            "d4b6633b-b9c9-43bd-b4fe-5fbca81b62f0": {
                "id": "d4b6633b-b9c9-43bd-b4fe-5fbca81b62f0",
                "is_intermediate": false,
                "type": "l2i",
                "latents": {
                    "latents_name": "421f8685-2d56-445a-9378-47e20a7699ec__52e0992c-d80c-4bd7-a852-dd89bfa042db"
                },
                "vae": {
                    "vae": {
                        "model_name": "Unreal_V4.1",
                        "base_model": "sd-1",
                        "model_type": "main",
                        "submodel": "vae"
                    }
                },
                "tiled": false,
                "fp32": true,
                "metadata": {
                    "generation_mode": "txt2img",
                    "positive_prompt": positiveprompt,
                    "negative_prompt": negativeprompt,
                    "width": 512,
                    "height": 512,
                    "seed": randomnumber,
                    "rand_device": "cpu",
                    "cfg_scale": 7.5,
                    "steps": 40,
                    "scheduler": "euler",
                    "clip_skip": 0,
                    "model": {
                        "model_name": "Unreal_V4.1",
                        "base_model": "sd-1"
                    },
                    "controlnets": [],
                    "loras": [
                        {
                            "lora": {
                                "model_name": "newb_0.1",
                                "base_model": "sd-1"
                            },
                            "weight": 0.75
                        }
                    ],
                    "vae": null,
                    "strength": null,
                    "init_image": null,
                    "positive_style_prompt": null,
                    "negative_style_prompt": null,
                    "refiner_model": null,
                    "refiner_cfg_scale": null,
                    "refiner_steps": null,
                    "refiner_scheduler": null,
                    "refiner_aesthetic_store": null,
                    "refiner_start": null
                }
            }
        },
        "edges": [
            {
                "source": {
                    "node_id": "2bc75cd6-8fac-476b-aa70-00b0405df3dd",
                    "field": "clip"
                },
                "destination": {
                    "node_id": "8d8c1cb2-960b-4e09-84cd-0dad145716ad",
                    "field": "clip"
                }
            },
            {
                "source": {
                    "node_id": "c6ccba45-37fd-40f6-b8df-db0143cb5820",
                    "field": "a"
                },
                "destination": {
                    "node_id": "e67e5cc5-c39a-41e7-a2ff-24cbb390ce5d",
                    "field": "start"
                }
            },
            {
                "source": {
                    "node_id": "2bc75cd6-8fac-476b-aa70-00b0405df3dd",
                    "field": "unet"
                },
                "destination": {
                    "node_id": "7c747ad2-59ee-43f4-8718-d098967573e2",
                    "field": "unet"
                }
            },
            {
                "source": {
                    "node_id": "8d8c1cb2-960b-4e09-84cd-0dad145716ad",
                    "field": "clip"
                },
                "destination": {
                    "node_id": "7c747ad2-59ee-43f4-8718-d098967573e2",
                    "field": "clip"
                }
            },
            {
                "source": {
                    "node_id": "7c747ad2-59ee-43f4-8718-d098967573e2",
                    "field": "clip"
                },
                "destination": {
                    "node_id": "4a4f8531-ca3b-43f9-9038-8ae8d05b6305",
                    "field": "clip"
                }
            },
            {
                "source": {
                    "node_id": "7c747ad2-59ee-43f4-8718-d098967573e2",
                    "field": "clip"
                },
                "destination": {
                    "node_id": "4fe78575-212d-46fa-a8d4-3346ea188314",
                    "field": "clip"
                }
            },
            {
                "source": {
                    "node_id": "e67e5cc5-c39a-41e7-a2ff-24cbb390ce5d",
                    "field": "collection"
                },
                "destination": {
                    "node_id": "17541bd8-7ba6-4a70-b095-3d0e999dc2b9",
                    "field": "collection"
                }
            },
            {
                "source": {
                    "node_id": "17541bd8-7ba6-4a70-b095-3d0e999dc2b9",
                    "field": "item"
                },
                "destination": {
                    "node_id": "667194d1-a44b-4594-804a-f08fe4a34545",
                    "field": "seed"
                }
            },
            {
                "source": {
                    "node_id": "17541bd8-7ba6-4a70-b095-3d0e999dc2b9",
                    "field": "item"
                },
                "destination": {
                    "node_id": "edac4aa0-8282-4c4e-bc42-08e998f23d7d",
                    "field": "seed"
                }
            },
            {
                "source": {
                    "node_id": "4fe78575-212d-46fa-a8d4-3346ea188314",
                    "field": "conditioning"
                },
                "destination": {
                    "node_id": "52e0992c-d80c-4bd7-a852-dd89bfa042db",
                    "field": "positive_conditioning"
                }
            },
            {
                "source": {
                    "node_id": "4a4f8531-ca3b-43f9-9038-8ae8d05b6305",
                    "field": "conditioning"
                },
                "destination": {
                    "node_id": "52e0992c-d80c-4bd7-a852-dd89bfa042db",
                    "field": "negative_conditioning"
                }
            },
            {
                "source": {
                    "node_id": "667194d1-a44b-4594-804a-f08fe4a34545",
                    "field": "noise"
                },
                "destination": {
                    "node_id": "52e0992c-d80c-4bd7-a852-dd89bfa042db",
                    "field": "noise"
                }
            },
            {
                "source": {
                    "node_id": "7c747ad2-59ee-43f4-8718-d098967573e2",
                    "field": "unet"
                },
                "destination": {
                    "node_id": "52e0992c-d80c-4bd7-a852-dd89bfa042db",
                    "field": "unet"
                }
            },
            {
                "source": {
                    "node_id": "52e0992c-d80c-4bd7-a852-dd89bfa042db",
                    "field": "latents"
                },
                "destination": {
                    "node_id": "d4b6633b-b9c9-43bd-b4fe-5fbca81b62f0",
                    "field": "latents"
                }
            },
            {
                "source": {
                    "node_id": "edac4aa0-8282-4c4e-bc42-08e998f23d7d",
                    "field": "metadata"
                },
                "destination": {
                    "node_id": "d4b6633b-b9c9-43bd-b4fe-5fbca81b62f0",
                    "field": "metadata"
                }
            },
            {
                "source": {
                    "node_id": "2bc75cd6-8fac-476b-aa70-00b0405df3dd",
                    "field": "vae"
                },
                "destination": {
                    "node_id": "d4b6633b-b9c9-43bd-b4fe-5fbca81b62f0",
                    "field": "vae"
                }
            }
        ]
    },
    "executed": [
        "52e0992c-d80c-4bd7-a852-dd89bfa042db",
        "4a4f8531-ca3b-43f9-9038-8ae8d05b6305",
        "noise",
        "c6ccba45-37fd-40f6-b8df-db0143cb5820",
        "e67e5cc5-c39a-41e7-a2ff-24cbb390ce5d",
        "rand_int",
        "metadata_accumulator",
        "range_of_size",
        "edac4aa0-8282-4c4e-bc42-08e998f23d7d",
        "7c747ad2-59ee-43f4-8718-d098967573e2",
        "text_to_latents",
        "8d8c1cb2-960b-4e09-84cd-0dad145716ad",
        "iterate",
        "latents_to_image",
        "main_model_loader",
        "667194d1-a44b-4594-804a-f08fe4a34545",
        "lora_loader_newb_0_1",
        "clip_skip",
        "positive_conditioning",
        "negative_conditioning",
        "17541bd8-7ba6-4a70-b095-3d0e999dc2b9",
        "4fe78575-212d-46fa-a8d4-3346ea188314",
        "d4b6633b-b9c9-43bd-b4fe-5fbca81b62f0",
        "2bc75cd6-8fac-476b-aa70-00b0405df3dd"
    ],
    "executed_history": [
        "main_model_loader",
        "clip_skip",
        "lora_loader_newb_0_1",
        "positive_conditioning",
        "negative_conditioning",
        "rand_int",
        "range_of_size",
        "iterate",
        "noise",
        "text_to_latents",
        "metadata_accumulator",
        "latents_to_image"
    ],
    "results": {
        "2bc75cd6-8fac-476b-aa70-00b0405df3dd": {
            "type": "model_loader_output",
            "unet": {
                "unet": {
                    "model_name": "Unreal_V4.1",
                    "base_model": "sd-1",
                    "model_type": "main",
                    "submodel": "unet"
                },
                "scheduler": {
                    "model_name": "Unreal_V4.1",
                    "base_model": "sd-1",
                    "model_type": "main",
                    "submodel": "scheduler"
                },
                "loras": []
            },
            "clip": {
                "tokenizer": {
                    "model_name": "Unreal_V4.1",
                    "base_model": "sd-1",
                    "model_type": "main",
                    "submodel": "tokenizer"
                },
                "text_encoder": {
                    "model_name": "Unreal_V4.1",
                    "base_model": "sd-1",
                    "model_type": "main",
                    "submodel": "text_encoder"
                },
                "skipped_layers": 0,
                "loras": []
            },
            "vae": {
                "vae": {
                    "model_name": "Unreal_V4.1",
                    "base_model": "sd-1",
                    "model_type": "main",
                    "submodel": "vae"
                }
            }
        },
        "8d8c1cb2-960b-4e09-84cd-0dad145716ad": {
            "type": "clip_skip_output",
            "clip": {
                "tokenizer": {
                    "model_name": "Unreal_V4.1",
                    "base_model": "sd-1",
                    "model_type": "main",
                    "submodel": "tokenizer"
                },
                "text_encoder": {
                    "model_name": "Unreal_V4.1",
                    "base_model": "sd-1",
                    "model_type": "main",
                    "submodel": "text_encoder"
                },
                "skipped_layers": 0,
                "loras": []
            }
        },
        "7c747ad2-59ee-43f4-8718-d098967573e2": {
            "type": "lora_loader_output",
            "unet": {
                "unet": {
                    "model_name": "Unreal_V4.1",
                    "base_model": "sd-1",
                    "model_type": "main",
                    "submodel": "unet"
                },
                "scheduler": {
                    "model_name": "Unreal_V4.1",
                    "base_model": "sd-1",
                    "model_type": "main",
                    "submodel": "scheduler"
                },
                "loras": [
                    {
                        "model_name": "newb_0.1",
                        "base_model": "sd-1",
                        "model_type": "lora",
                        "submodel": null,
                        "weight": 0.75
                    }
                ]
            },
            "clip": {
                "tokenizer": {
                    "model_name": "Unreal_V4.1",
                    "base_model": "sd-1",
                    "model_type": "main",
                    "submodel": "tokenizer"
                },
                "text_encoder": {
                    "model_name": "Unreal_V4.1",
                    "base_model": "sd-1",
                    "model_type": "main",
                    "submodel": "text_encoder"
                },
                "skipped_layers": 0,
                "loras": [
                    {
                        "model_name": "newb_0.1",
                        "base_model": "sd-1",
                        "model_type": "lora",
                        "submodel": null,
                        "weight": 0.75
                    }
                ]
            }
        },
        "4fe78575-212d-46fa-a8d4-3346ea188314": {
            "type": "compel_output",
            "conditioning": {
                "conditioning_name": "421f8685-2d56-445a-9378-47e20a7699ec_4fe78575-212d-46fa-a8d4-3346ea188314_conditioning"
            }
        },
        "4a4f8531-ca3b-43f9-9038-8ae8d05b6305": {
            "type": "compel_output",
            "conditioning": {
                "conditioning_name": "421f8685-2d56-445a-9378-47e20a7699ec_4a4f8531-ca3b-43f9-9038-8ae8d05b6305_conditioning"
            }
        },
        "c6ccba45-37fd-40f6-b8df-db0143cb5820": {
            "type": "int_output",
            "a": 1282458505
        },
        "e67e5cc5-c39a-41e7-a2ff-24cbb390ce5d": {
            "type": "int_collection",
            "collection": [
                1282458505
            ]
        },
        "17541bd8-7ba6-4a70-b095-3d0e999dc2b9": {
            "type": "iterate_output",
            "item": 1282458505
        },
        "667194d1-a44b-4594-804a-f08fe4a34545": {
            "type": "noise_output",
            "noise": {
                "latents_name": "421f8685-2d56-445a-9378-47e20a7699ec__667194d1-a44b-4594-804a-f08fe4a34545"
            },
            "width": 512,
            "height": 512
        },
        "52e0992c-d80c-4bd7-a852-dd89bfa042db": {
            "type": "latents_output",
            "latents": {
                "latents_name": "421f8685-2d56-445a-9378-47e20a7699ec__52e0992c-d80c-4bd7-a852-dd89bfa042db"
            },
            "width": 512,
            "height": 512
        },
        "edac4aa0-8282-4c4e-bc42-08e998f23d7d": {
            "type": "metadata_accumulator_output",
            "metadata": {
                "generation_mode": "txt2img",
                "positive_prompt": positiveprompt,
                "negative_prompt": negativeprompt,
                "width": 512,
                "height": 512,
                "seed": randomnumber,
                "rand_device": "cpu",
                "cfg_scale": 7.5,
                "steps": 40,
                "scheduler": "euler",
                "clip_skip": 0,
                "model": {
                    "model_name": "Unreal_V4.1",
                    "base_model": "sd-1"
                },
                "controlnets": [],
                "loras": [
                    {
                        "lora": {
                            "model_name": "newb_0.1",
                            "base_model": "sd-1"
                        },
                        "weight": 0.75
                    }
                ],
                "vae": null,
                "strength": null,
                "init_image": null,
                "positive_style_prompt": null,
                "negative_style_prompt": null,
                "refiner_model": null,
                "refiner_cfg_scale": null,
                "refiner_steps": null,
                "refiner_scheduler": null,
                "refiner_aesthetic_store": null,
                "refiner_start": null
            }
        },
        "d4b6633b-b9c9-43bd-b4fe-5fbca81b62f0": {
            "type": "image_output",
            "image": {
                "image_name": randomid + ".png"
            },
            "width": 512,
            "height": 512
        }
    },
    "errors": {},
    "prepared_source_mapping": {
        "2bc75cd6-8fac-476b-aa70-00b0405df3dd": "main_model_loader",
        "c6ccba45-37fd-40f6-b8df-db0143cb5820": "rand_int",
        "8d8c1cb2-960b-4e09-84cd-0dad145716ad": "clip_skip",
        "e67e5cc5-c39a-41e7-a2ff-24cbb390ce5d": "range_of_size",
        "7c747ad2-59ee-43f4-8718-d098967573e2": "lora_loader_newb_0_1",
        "4a4f8531-ca3b-43f9-9038-8ae8d05b6305": "negative_conditioning",
        "4fe78575-212d-46fa-a8d4-3346ea188314": "positive_conditioning",
        "17541bd8-7ba6-4a70-b095-3d0e999dc2b9": "iterate",
        "667194d1-a44b-4594-804a-f08fe4a34545": "noise",
        "edac4aa0-8282-4c4e-bc42-08e998f23d7d": "metadata_accumulator",
        "52e0992c-d80c-4bd7-a852-dd89bfa042db": "text_to_latents",
        "d4b6633b-b9c9-43bd-b4fe-5fbca81b62f0": "latents_to_image"
    },
    "source_prepared_mapping": {
        "main_model_loader": [
            "2bc75cd6-8fac-476b-aa70-00b0405df3dd"
        ],
        "rand_int": [
            "c6ccba45-37fd-40f6-b8df-db0143cb5820"
        ],
        "clip_skip": [
            "8d8c1cb2-960b-4e09-84cd-0dad145716ad"
        ],
        "range_of_size": [
            "e67e5cc5-c39a-41e7-a2ff-24cbb390ce5d"
        ],
        "lora_loader_newb_0_1": [
            "7c747ad2-59ee-43f4-8718-d098967573e2"
        ],
        "negative_conditioning": [
            "4a4f8531-ca3b-43f9-9038-8ae8d05b6305"
        ],
        "positive_conditioning": [
            "4fe78575-212d-46fa-a8d4-3346ea188314"
        ],
        "iterate": [
            "17541bd8-7ba6-4a70-b095-3d0e999dc2b9"
        ],
        "noise": [
            "667194d1-a44b-4594-804a-f08fe4a34545"
        ],
        "metadata_accumulator": [
            "edac4aa0-8282-4c4e-bc42-08e998f23d7d"
        ],
        "text_to_latents": [
            "52e0992c-d80c-4bd7-a852-dd89bfa042db"
        ],
        "latents_to_image": [
            "d4b6633b-b9c9-43bd-b4fe-5fbca81b62f0"
        ]
    }
}



fetch("http://localhost:9090/api/v1/sessions/", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(request)
});
setTimeout(() => {fetch(`http://localhost:9090/api/v1/sessions/${randomid}/invoke?all=true`, {

method: 'PUT',
headers:{
'Content-Type':'application/json'
}
})}, 1000)


console.log("randomid=" + randomid)
console.log("number=" + randomnumber)
