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
                "prompt": positiveprompt
            },
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
            "steps": 35,
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
}



fetch("http://localhost:9090/api/v1/sessions/", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify()
});
console.log("randomid=" + randomid)
console.log("number=" + randomnumber)
