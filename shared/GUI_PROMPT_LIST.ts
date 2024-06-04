import { GuiPromptData } from "@shared/schemas"

export const DEFAULT_PROMPT_TEXT = ""

export const DEFAULT_FIELDS = {
	categoryId: "style",
	promptType: "Style",
	promptItems: [
		{
			promptItemId: "epicrealism_naturalSinRC1VAE_106430",
			name: "Epic Realism",
			imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/model/epicrealism_naturalSinRC1VAE_106430.jpeg",
			fields: {
				modelName: "epicrealism_naturalSinRC1VAE_106430.safetensors",
				prompt:
					"1girl, 20 yo beautiful woman, professional, realistic, professional photography, (smooth hands:1.1), ultra 4k, photorealist",
				negativePrompt: "nsfw, worst_quality, bad hands, bad eyes, sexy outfit",
				width: 512,
				height: 512,
				samplerName: "DPM++ 2S a Karras" as "DPM++ 2S a Karras",
				guidanceScale: 5,
				steps: 30,
				imageNum: 1,
				clipSkip: 1,
				seed: -1,
				hiresFix: {
					targetWidth: 1024,
					targetHeight: 1024,
					strength: 0.6,
				},
			},
		},
	],
}

export const GUI_PROMPT_LIST: GuiPromptData[] = [
	// {
	//   promptType: "Search",
	//   options: [
	//
	//   ]
	// },
	// {
	//   promptType: "Bookmark",
	//   options: [
	//
	//   ]
	// },
	{
		categoryId: "style",
		promptType: "Style",
		promptItems: [
			{
				promptItemId: "epicrealism_naturalSinRC1VAE_106430",
				name: "Epic Realism",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/model/epicrealism_naturalSinRC1VAE_106430.jpeg",
				fields: {
					modelName: "epicrealism_naturalSinRC1VAE_106430.safetensors",
					prompt:
						"1girl, 20 yo beautiful woman, professional, realistic, professional photography, (smooth hands:1.1), ultra 4k, photorealist",
					negativePrompt: "nsfw, worst_quality, bad hands, bad eyes, sexy outfit",
					width: 512,
					height: 512,
					samplerName: "DPM++ 2S a Karras",
					guidanceScale: 5,
					steps: 30,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
					hiresFix: {
						targetWidth: 1024,
						targetHeight: 1024,
						strength: 0.6,
					},
				},
			},
			{
				promptItemId: "dvarchMultiPrompt_dvarchExterior_28334",
				name: "Dvarch Exterior",
				imageUrl:
					"https://storage.googleapis.com/eizoai/prompt_options/model/dvarchMultiPrompt_dvarchExterior_28334.jpeg",
				fields: {
					modelName: "dvarchMultiPrompt_dvarchExterior_28334.safetensors",
					prompt: "beautiful house with black exterior wall, ultra 4k, photorealist",
					negativePrompt: "nsfw, worst_quality, bad hands, bad eyes, sexy outfit",
					width: 512,
					height: 512,
					samplerName: "DPM++ 2S a Karras",
					guidanceScale: 5,
					steps: 30,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
					hiresFix: { targetWidth: 768, targetHeight: 768, strength: 0.6 },
				},
			},
			{
				promptItemId: "crystalClearXL_ccxl_97637",
				name: "Crystal Clear XL",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/model/crystalClearXL_ccxl_97637.jpeg",
				fields: {
					modelName: "crystalClearXL_ccxl_97637.safetensors",
					prompt: "beautiful cyborg with black exterior wall, ultra 4k, photorealist",
					negativePrompt: "nsfw, worst_quality, bad hands, bad eyes, sexy outfit",
					width: 512,
					height: 512,
					samplerName: "DPM++ 2S a Karras",
					guidanceScale: 5,
					steps: 30,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
					hiresFix: { targetWidth: 768, targetHeight: 768, strength: 0.6 },
				},
			},
			{
				promptItemId: "colossusProjectXLSFW_49bExperimental_164709",
				name: "Colossus Project",
				imageUrl:
					"https://storage.googleapis.com/eizoai/prompt_options/model/colossusProjectXLSFW_49bExperimental_164709.jpeg",
				fields: {
					modelName: "colossusProjectXLSFW_49bExperimental_164709.safetensors",
					prompt: "beautiful cyborg with black exterior wall, ultra 4k, photorealist",
					negativePrompt: "nsfw, worst_quality, bad hands, bad eyes, sexy outfit",
					width: 512,
					height: 512,
					samplerName: "DPM++ 2S a Karras",
					guidanceScale: 5,
					steps: 30,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
					hiresFix: { targetWidth: 768, targetHeight: 768, strength: 0.6 },
				},
			},
			{
				promptItemId: "experience_V10_100375",
				name: "Experience V10",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/model/experience_V10_100375.jpeg",
				fields: {
					modelName: "experience_V10_100375.safetensors",
					prompt: "beautiful cyborg with black exterior wall, ultra 4k, photorealist",
					negativePrompt: "nsfw, worst_quality, bad hands, bad eyes, sexy outfit",
					width: 512,
					height: 512,
					samplerName: "DPM++ 2S a Karras",
					guidanceScale: 5,
					steps: 30,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
					hiresFix: { targetWidth: 768, targetHeight: 768, strength: 0.6 },
				},
			},
			{
				promptItemId: "cineDiffusion_v3_39411",
				name: "Cine Diffusion",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/model/cineDiffusion_v3_39411.jpeg",
				fields: {
					modelName: "cineDiffusion_v3_39411.safetensors",
					prompt: "beautiful cyborg with black exterior wall, ultra 4k, photorealist",
					negativePrompt: "nsfw, worst_quality, bad hands, bad eyes, sexy outfit",
					width: 512,
					height: 512,
					samplerName: "DPM++ 2S a Karras",
					guidanceScale: 5,
					steps: 30,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
					hiresFix: { targetWidth: 768, targetHeight: 768, strength: 0.6 },
				},
			},
			{
				promptItemId: "mscenemix_v11_55761",
				name: "MSceneMix",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/model/mscenemix_v11_55761.jpeg",
				fields: {
					modelName: "mscenemix_v11_55761.safetensors",
					prompt: "beautiful cyborg with black exterior wall, ultra 4k, photorealist",
					negativePrompt: "nsfw, worst_quality, bad hands, bad eyes, sexy outfit",
					width: 512,
					height: 512,
					samplerName: "DPM++ 2S a Karras",
					guidanceScale: 5,
					steps: 30,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
					hiresFix: { targetWidth: 768, targetHeight: 768, strength: 0.6 },
				},
			},
			{
				promptItemId: "newdawn_v669prometheus_87310",
				name: "New Dawn",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/model/newdawn_v669prometheus_87310.jpeg",
				fields: {
					modelName: "newdawn_v669prometheus_87310.safetensors",
					prompt: "beautiful cyborg with black exterior wall, ultra 4k, photorealist",
					negativePrompt: "nsfw, worst_quality, bad hands, bad eyes, sexy outfit",
					width: 512,
					height: 512,
					samplerName: "DPM++ 2S a Karras",
					guidanceScale: 5,
					steps: 30,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
					hiresFix: { targetWidth: 768, targetHeight: 768, strength: 0.6 },
				},
			},
			{
				promptItemId: "architecturerealmix_v1repair_79039",
				name: "Architecture Realm Mix V1",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/model/architecturerealmix_v1repair_79039.jpeg",
				fields: {
					modelName: "architecturerealmix_v1repair_79039.safetensors",
					prompt: "beautiful cyborg with black exterior wall, ultra 4k, photorealist",
					negativePrompt: "nsfw, worst_quality, bad hands, bad eyes, sexy outfit",
					width: 512,
					height: 512,
					samplerName: "DPM++ 2S a Karras",
					guidanceScale: 5,
					steps: 30,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
					hiresFix: { targetWidth: 768, targetHeight: 768, strength: 0.6 },
				},
			},
			{
				promptItemId: "landscapesupermix_v21_82826",
				name: "Landscape Supermix v21",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/model/landscapesupermix_v21_82826.jpeg",
				fields: {
					modelName: "landscapesupermix_v21_82826.safetensors",
					prompt: "beautiful cyborg with black exterior wall, ultra 4k, photorealist",
					negativePrompt: "nsfw, worst_quality, bad hands, bad eyes, sexy outfit",
					width: 512,
					height: 512,
					samplerName: "DPM++ 2S a Karras",
					guidanceScale: 5,
					steps: 30,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
					hiresFix: { targetWidth: 768, targetHeight: 768, strength: 0.6 },
				},
			},
			{
				promptItemId: "xsarchitecturalv3com_v31InSafetensor_78140",
				name: "XS Architectural V3",
				imageUrl:
					"https://storage.googleapis.com/eizoai/prompt_options/model/xsarchitecturalv3com_v31InSafetensor_78140.jpeg",
				fields: {
					modelName: "xsarchitecturalv3com_v31InSafetensor_78140.safetensors",
					prompt: "beautiful cyborg with black exterior wall, ultra 4k, photorealist",
					negativePrompt: "nsfw, worst_quality, bad hands, bad eyes, sexy outfit",
					width: 512,
					height: 512,
					samplerName: "DPM++ 2S a Karras",
					guidanceScale: 5,
					steps: 30,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
					hiresFix: { targetWidth: 768, targetHeight: 768, strength: 0.6 },
				},
			},
			{
				promptItemId: "xl13AsmodeusSFWNSFW_v22BakedVAE_111954",
				name: "Asmodeus",
				imageUrl:
					"https://storage.googleapis.com/eizoai/prompt_options/model/xl13AsmodeusSFWNSFW_v22BakedVAE_111954.jpeg",
				fields: {
					modelName: "xl13AsmodeusSFWNSFW_v22BakedVAE_111954.safetensors",
					prompt: "beautiful cyborg with black exterior wall, ultra 4k, photorealist",
					negativePrompt: "nsfw, worst_quality, bad hands, bad eyes, sexy outfit",
					width: 512,
					height: 512,
					samplerName: "DPM++ 2S a Karras",
					guidanceScale: 5,
					steps: 30,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
					hiresFix: { targetWidth: 768, targetHeight: 768, strength: 0.6 },
				},
			},
			{
				promptItemId: "xl6HEPHAISTOSSD10XLSFW_v331BF16Experimental_119579",
				name: "Future City",
				imageUrl:
					"https://storage.googleapis.com/eizoai/prompt_options/model/xl6HEPHAISTOSSD10XLSFW_v331BF16Experimental_119579.jpeg",
				fields: {
					modelName: "xl6HEPHAISTOSSD10XLSFW_v331BF16Experimental_119579.safetensors",
					prompt: "beautiful cyborg with black exterior wall, ultra 4k, photorealist",
					negativePrompt: "nsfw, worst_quality, bad hands, bad eyes, sexy outfit",
					width: 512,
					height: 512,
					samplerName: "DPM++ 2S a Karras",
					guidanceScale: 5,
					steps: 30,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
					hiresFix: { targetWidth: 768, targetHeight: 768, strength: 0.6 },
				},
			},
			{
				promptItemId: "sdxlUnstableDiffusers_v8HEAVENSWRATH_133813",
				name: "Heaven's Wrath",
				imageUrl:
					"https://storage.googleapis.com/eizoai/prompt_options/model/sdxlUnstableDiffusers_v8HEAVENSWRATH_133813.jpeg",
				fields: {
					modelName: "sdxlUnstableDiffusers_v8HEAVENSWRATH_133813.safetensors",
					prompt: "beautiful cyborg with black exterior wall, ultra 4k, photorealist",
					negativePrompt: "nsfw, worst_quality, bad hands, bad eyes, sexy outfit",
					width: 512,
					height: 512,
					samplerName: "DPM++ 2S a Karras",
					guidanceScale: 5,
					steps: 30,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
					hiresFix: { targetWidth: 768, targetHeight: 768, strength: 0.6 },
				},
			},
			{
				promptItemId: "xxmix9realistic_v10_37818",
				name: "xxmix9realistic",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/model/xxmix9realistic.jpeg",
				fields: {
					modelName: "xxmix9realistic_v10_37818.safetensors",
					prompt:
						"1girl, 18 yo pretty woman, professional, realistic, professional photography, (smooth hands:1.1), ultra 4k, photorealist",
					negativePrompt: "worst_quality, bad hands, bad eyes",
					width: 512,
					height: 512,
					samplerName: "DPM++ 2S a Karras",
					guidanceScale: 5.5,
					steps: 30,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
					hiresFix: {
						targetWidth: 768,
						targetHeight: 768,
						strength: 0.6,
					},
				},
			},
			{
				promptItemId: "cyberrealistic_v40_151857",
				name: "Cyber Realistic",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/model/cyberrealistic_v40_151857.jpeg",
				fields: {
					modelName: "cyberrealistic_v40_151857.safetensors",
					prompt:
						"1girl, 20 yo beautiful woman, professional, realistic, professional photography, (smooth hands:1.1), ultra 4k, photorealist",
					negativePrompt: "worst_quality, bad hands, bad eyes, sexy outfit",
					width: 512,
					height: 512,
					samplerName: "DPM++ 2S a Karras",
					guidanceScale: 5,
					steps: 30,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
					hiresFix: {
						targetWidth: 768,
						targetHeight: 768,
						strength: 0.6,
					},
				},
			},
			{
				promptItemId: "deliberate_v2",
				name: "Deliberate",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/model/deliberate_v2.jpeg",
				fields: {
					modelName: "deliberate_v2.safetensors",
					prompt:
						"1girl, 20 yo beautiful woman, professional, realistic, professional photography, (smooth hands:1.1), ultra 4k, photorealist",
					negativePrompt: "worst_quality, bad hands, bad eyes, sexy outfit",
					width: 512,
					height: 512,
					samplerName: "DPM++ 2S a Karras",
					guidanceScale: 5,
					steps: 30,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
					hiresFix: {
						targetWidth: 768,
						targetHeight: 768,
						strength: 0.6,
					},
				},
			},
			{
				promptItemId: "dreamshaper_8_93211",
				name: "Dream Shaper",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/model/dreamshaper_8_93211.jpeg",
				fields: {
					modelName: "dreamshaper_8_93211.safetensors",
					prompt:
						"1girl, 20 yo beautiful woman, professional, realistic, professional photography, (smooth hands:1.1), ultra 4k, photorealist",
					negativePrompt: "nsfw, worst_quality, bad hands, bad eyes, sexy outfit",
					width: 512,
					height: 512,
					samplerName: "DPM++ 2S a Karras",
					guidanceScale: 5,
					steps: 30,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
					hiresFix: {
						targetWidth: 768,
						targetHeight: 768,
						strength: 0.6,
					},
				},
			},
			{
				promptItemId: "realisticVisionV51_v51VAE_94301",
				name: "Realistic Vision",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/model/realisticVisionV51_v51VAE_94301.jpeg",
				fields: {
					modelName: "realisticVisionV51_v51VAE_94301.safetensors",
					prompt:
						"1girl, 20 yo beautiful woman, professional, realistic, professional photography, (smooth hands:1.1), ultra 4k, photorealist",
					negativePrompt: "nsfw, worst_quality, bad hands, bad eyes, sexy outfit",
					width: 512,
					height: 512,
					samplerName: "DPM++ 2S a Karras",
					guidanceScale: 5,
					steps: 30,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
					hiresFix: {
						targetWidth: 768,
						targetHeight: 768,
						strength: 0.6,
					},
				},
			},
			{
				promptItemId: "neverendingDreamNED_v122BakedVae",
				name: "NED",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/model/neverendingDreamNED_v122BakedVae.jpeg",
				fields: {
					modelName: "neverendingDreamNED_v122BakedVae.safetensors",
					prompt:
						"1girl, 20 yo beautiful woman, professional, realistic, professional photography, (smooth hands:1.1), ultra 4k, photorealist",
					negativePrompt: "nsfw, worst_quality, bad hands, bad eyes, sexy outfit",
					width: 512,
					height: 512,
					samplerName: "DPM++ 2S a Karras",
					guidanceScale: 5,
					steps: 30,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
					hiresFix: {
						targetWidth: 768,
						targetHeight: 768,
						strength: 0.6,
					},
				},
			},
			{
				promptItemId: "epicrealism_newCentury",
				name: "Epic Realism New Century",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/model/epicrealism_newCentury.jpeg",
				fields: {
					modelName: "epicrealism_newCentury.safetensors",
					prompt:
						"1girl, 20 yo beautiful woman, realistic, professional photography, (smooth hands:1.1), ultra 4k, photorealist",
					negativePrompt: "nsfw, worst_quality, bad hands, bad eyes, sexy outfit",
					width: 512,
					height: 512,
					samplerName: "DPM++ 2S a Karras",
					guidanceScale: 5,
					steps: 30,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
					hiresFix: {
						targetWidth: 768,
						targetHeight: 768,
						strength: 0.6,
					},
				},
			},
			{
				promptItemId: "photon_v1_61934",
				name: "Photon",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/model/photon_v1_61934.jpeg",
				fields: {
					modelName: "photon_v1_61934.safetensors",
					prompt:
						"1girl, 20 yo beautiful woman, realistic, professional photography, (smooth hands:1.1), ultra 4k, photorealist",
					negativePrompt: "nsfw, worst_quality, bad hands, bad eyes, sexy outfit",
					width: 512,
					height: 512,
					samplerName: "DPM++ 2S a Karras",
					guidanceScale: 5,
					steps: 30,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
					hiresFix: {
						targetWidth: 768,
						targetHeight: 768,
						strength: 0.6,
					},
				},
			},
			{
				promptItemId: "kisaragiMix_v22_67561",
				name: "Kisaragi",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/model/kisaragiMix_v22_67561.jpeg",
				fields: {
					modelName: "kisaragiMix_v22_67561.safetensors",
					prompt:
						"1girl, 20 yo beautiful woman, realistic, professional photography, (smooth hands:1.1), ultra 4k, photorealist",
					negativePrompt: "nsfw, worst_quality, bad hands, bad eyes, sexy outfit",
					width: 512,
					height: 512,
					samplerName: "DPM++ 2S a Karras",
					guidanceScale: 5,
					steps: 30,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
					hiresFix: {
						targetWidth: 768,
						targetHeight: 768,
						strength: 0.6,
					},
				},
			},
			{
				promptItemId: "meinamix_meinaV11_85291",
				name: "MeinaMix",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/anime1.jpeg",
				fields: {
					modelName: "meinamix_meinaV11_85291.safetensors",
					prompt: "best quality",
					negativePrompt: "(worst quality:1.6, low quality:1.6), (zombie, sketch, interlocked fingers, comic)",
					width: 512,
					height: 1024,
					samplerName: "DPM++ 2M Karras",
					guidanceScale: 7.5,
					steps: 30,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
				},
			},
			{
				promptItemId: "AnythingV5_v5PrtRE",
				name: "AnythingV5",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/anythingv5.png",
				fields: {
					modelName: "AnythingV5_v5PrtRE.safetensors",
					prompt: "masterpiece,(best quality),(1girl) ,solo,(high contrast:1.2),(high saturation:1.2), Ink painting",
					negativePrompt:
						"((very long hair:1.3)),messy,ocean,beach,big breast,nsfw,(((pubic))), ((((pubic_hair)))),sketch, duplicate, ugly, huge eyes, text, logo, monochrome, worst face, (bad and mutated hands:1.3), (worst quality:2.0), (low quality:2.0), (blurry:2.0), horror, geometry, bad_prompt, (bad hands), (missing fingers), multiple limbs, bad anatomy, (interlocked fingers:1.2), Ugly Fingers, (extra digit and hands and fingers and legs and arms:1.4), crown braid, ((2girl)), (deformed fingers:1.2), (long fingers:1.2),succubus wings,horn,succubus horn,succubus hairstyle, (bad-artist-anime), bad-artist, badhandv4,",
					width: 960,
					height: 640,
					samplerName: "DPM++ 2M Karras",
					guidanceScale: 7.5,
					steps: 47,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
				},
			},
			{
				promptItemId: "ghostmix_v20Bakedvae_53571",
				name: "GhostMix",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/ghostmix.jpeg",
				fields: {
					modelName: "ghostmix_v20Bakedvae_53571.safetensors",
					prompt:
						"(masterpiece, top quality, best quality, official art, beautiful and aesthetic:1.2),  extreme detailed,(fractal art:1.3),colorful,highest detailed",
					negativePrompt:
						"(worst quality, low quality:2), monochrome, zombie,overexposure, watermark,text,bad anatomy,bad hand,extra hands,extra fingers,too many fingers,fused fingers,bad arm,distorted arm,extra arms,fused arms,extra legs,missing leg,disembodied leg,extra nipples, detached arm, liquid hand,inverted hand,disembodied limb, small breasts, loli, oversized head,extra body,completely nude, extra navel,easynegative,(hair between eyes),sketch, duplicate, ugly, huge eyes, text, logo, worst face, (bad and mutated hands:1.3),  (blurry:2.0), horror, geometry, bad_prompt, (bad hands), (missing fingers), multiple limbs, bad anatomy, (interlocked fingers:1.2), Ugly Fingers, (extra digit and hands and fingers and legs and arms:1.4), ((2girl)), (deformed fingers:1.2), (long fingers:1.2),(bad-artist-anime), bad-artist, bad hand, extra legs ,(ng_deepnegative_v1_75t)",
					width: 512,
					height: 768,
					samplerName: "DPM++ 2M Karras",
					steps: 30,
					guidanceScale: 7.5,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
				},
			},
			{
				promptItemId: "cMoon_v00_11751",
				name: "cMoon",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/cMoon.jpeg",
				fields: {
					modelName: "cMoon_v00_11751.safetensors",
					prompt: "best quality, (masterpiece), Ultra-detailed, (high resolution:1.1), (bold line), (sharp line)",
					negativePrompt:
						"(Low quality, worst quality:1.4), bad anatomy, bad hands, 3d, blurry, lowers, low resolution, text, watermark, multiple panels, multiple views, (obi, kimono)",
					width: 512,
					height: 768,
					samplerName: "DPM++ 2M Karras",
					steps: 30,
					guidanceScale: 7.5,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
				},
			},
			{
				promptItemId: "CetusMix",
				name: "CetusMix",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/cetusmix.jpeg",
				fields: {
					modelName: "cetusMix_Whalefall2_74526.safetensors",
					prompt: "high quality",
					negativePrompt: "(worst quality:1.6),(low quality:1.6),  easynegative,",
					width: 512,
					height: 768,
					samplerName: "DPM++ 2M Karras",
					steps: 20,
					guidanceScale: 7.5,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
				},
			},
			{
				promptItemId: "sudachi",
				name: "sudachi",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/sudachi.jpeg",
				fields: {
					modelName: "sudachi_v10_62914.safetensors",
					prompt: "masterpiece, best quality",
					negativePrompt: "(worst quality, low quality:1.3),",
					width: 512,
					height: 712,
					samplerName: "DPM++ 2M Karras",
					steps: 20,
					guidanceScale: 7.5,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
				},
			},
			{
				promptItemId: "yuzu",
				name: "yuzu",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/yuzu.jpeg",
				fields: {
					modelName: "yuzu_v11_81071.safetensors",
					prompt: "masterpiece, best quality",
					negativePrompt: "(worst quality, low quality:1.4)",
					width: 512,
					height: 784,
					samplerName: "DPM++ 2M Karras",
					steps: 20,
					guidanceScale: 7.5,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
				},
			},
			{
				promptItemId: "hellokid",
				name: "hellokid",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/hellokid.jpeg",
				fields: {
					modelName: "hellokid2d_V15_105711.safetensors",
					prompt: "masterpiece, best quality",
					negativePrompt:
						"FastNegativeV2,(bad-artist:1),(worst quality, low quality:1.4),(bad_prompt_version2:0.8),bad-hands-5,lowres,bad anatomy,bad hands,((text)),(watermark),error,missing fingers,extra digit,fewer digits,cropped,worst quality,low quality,normal quality,((username)),blurry,(extra limbs),bad-artist-anime,badhandv4,EasyNegative,ng_deepnegative_v1_75t,verybadimagenegative_v1.3,BadDream,(three hands:1.6),(three legs:1.1),(more than two hands:1.4),(more than two legs,:1.2),",
					width: 768,
					height: 1152,
					samplerName: "DPM++ 2M Karras",
					steps: 28,
					guidanceScale: 7.5,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
				},
			},
			{
				promptItemId: "CounterfeitV30",
				name: "CounterfeitV30",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/counterfeit.jpeg",
				fields: {
					modelName: "CounterfeitV30_25_7496.safetensors",
					prompt: "((masterpiece,best quality))",
					negativePrompt: "EasyNegative, extra fingers,fewer fingers,",
					width: 512,
					height: 512,
					samplerName: "DPM++ 2M Karras",
					steps: 20,
					guidanceScale: 7.5,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
				},
			},
			{
				promptItemId: "toonyou_beta2",
				name: "toonyou_beta2",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/toonyou.jpeg",
				fields: {
					modelName: "toonyou_beta2.safetensors",
					prompt: "(best quality, masterpiece)",
					negativePrompt: "(worst quality, low quality)",
					width: 512,
					height: 1024,
					samplerName: "DPM++ 2M Karras",
					steps: 25,
					guidanceScale: 7.5,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
				},
			},
			{
				promptItemId: "mixProV4",
				name: "mixProV4",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/mixprov4.jpeg",
				fields: {
					modelName: "mixProV4_v4.safetensors",
					prompt:
						"Original Character, Volumetric Lighting, Best Shadows, Shallow Depth of Field, (Highest Quality, Amazing Details:1.25), Brilliant Colorful Paintings",
					negativePrompt: "(Worst Quality, Low Quality:1.4), Poorly Made Bad 3D, Lousy Bad Realistic",
					width: 512,
					height: 768,
					samplerName: "DPM++ 2M Karras",
					steps: 25,
					guidanceScale: 7.5,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
				},
			},
			{
				promptItemId: "albedobaseXL_v04",
				name: "albedobaseXL_v04",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/albedobaseXL.jpeg",
				fields: {
					modelName: "albedobaseXL_v04_130099.safetensors",
					prompt: "ultra highly intricate detailed 8k, UHD, professional photo, cyberpunk 2077, natural light",
					negativePrompt: "(lowres, low quality, low detailed:1.3), makeup, overexposed, 2d, cartoon",
					width: 768,
					height: 1024,
					samplerName: "DPM++ 2M Karras",
					steps: 50,
					guidanceScale: 7.5,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
				},
			},
			{
				promptItemId: "animagineXLV3",
				name: "animagineXLV3",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/animagineXLV3.jpeg",
				fields: {
					modelName: "animagineXLV3_v30_231047.safetensors",
					prompt: "masterpiece, best quality",
					negativePrompt:
						"nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name,",
					width: 512,
					height: 512,
					samplerName: "DPM++ 2M Karras",
					steps: 28,
					guidanceScale: 7.5,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
				},
			},
			{
				promptItemId: "aniverse_v15",
				name: "aniverse_v15",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/aniverse_v15.jpeg",
				fields: {
					modelName: "aniverse_v15_138593.safetensors",
					prompt:
						"(best quality, masterpiece, colorful, dynamic angle, highest detailed), (ultrahigh resolution textures), in dynamic pose, bokeh, (intricate details, hyperdetailed:1.15), (official art, extreme detailed, highest detailed), HDR",
					negativePrompt: "EasyNegative,  bad-hands-5",
					width: 512,
					height: 904,
					samplerName: "DPM++ 2M Karras",
					steps: 50,
					guidanceScale: 7.5,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
				},
			},
			{
				promptItemId: "mistoonSapphire_v10",
				name: "mistoonSapphire_v10",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/mistoonSapphire_v1.jpeg",
				fields: {
					modelName: "mistoonSapphire_v10_30163.safetensors",
					prompt: "(masterpiece,detailed,highres:1.4)",
					negativePrompt: "verybadimagenegative_v1.3, badhandv4, signature, watermark, text",
					width: 768,
					height: 1152,
					samplerName: "DPM++ 2M Karras",
					steps: 20,
					guidanceScale: 7.5,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
				},
			},
			{
				promptItemId: "majicmixRealistic_v7_134792",
				name: "MiajicMix Realistic",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/model/majicmixRealistic_v7_134792.jpeg",
				fields: {
					modelName: "majicmixRealistic_v7_134792.safetensors",
					prompt:
						"1girl, 20 yo beautiful woman, realistic, professional photography, (smooth hands:1.1), ultra 4k, photorealist",
					negativePrompt: "nsfw, worst_quality, bad hands, bad eyes, sexy outfit",
					width: 512,
					height: 512,
					samplerName: "DPM++ 2S a Karras",
					guidanceScale: 5,
					steps: 30,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
					hiresFix: { targetWidth: 768, targetHeight: 768, strength: 0.6 },
				},
			},
			{
				promptItemId: "meinaunreal_v41_80034",
				name: "Meina Unreal",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/model/meinaunreal_v41_80034.jpeg",
				fields: {
					modelName: "meinaunreal_v41_80034.safetensors",
					prompt:
						"1girl, 20 yo beautiful woman, realistic, professional photography, (smooth hands:1.1), ultra 4k, photorealist",
					negativePrompt: "nsfw, worst_quality, bad hands, bad eyes, sexy outfit",
					width: 512,
					height: 512,
					samplerName: "DPM++ 2S a Karras",
					guidanceScale: 5,
					steps: 30,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
					hiresFix: { targetWidth: 768, targetHeight: 768, strength: 0.6 },
				},
			},
			{
				promptItemId: "beautifulRealistic_brav3_31664",
				name: "Realistic Asian",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/model/beautifulRealistic_brav3_31664.jpeg",
				fields: {
					modelName: "beautifulRealistic_brav3_31664.safetensors",
					prompt:
						"1girl, 20 yo beautiful woman, realistic, professional photography, (smooth hands:1.1), ultra 4k, photorealist",
					negativePrompt: "nsfw, worst_quality, bad hands, bad eyes, sexy outfit",
					width: 512,
					height: 512,
					samplerName: "DPM++ 2S a Karras",
					guidanceScale: 5,
					steps: 30,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
					hiresFix: { targetWidth: 768, targetHeight: 768, strength: 0.6 },
				},
			},
			{
				promptItemId: "arthemyComics_v50Bakedvae_145105",
				name: "Arthemy Comics",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/model/arthemyComics_v50Bakedvae_145105.jpeg",
				fields: {
					modelName: "arthemyComics_v50Bakedvae_145105.safetensors",
					prompt:
						"1girl, 20 yo beautiful woman, realistic, professional photography, (smooth hands:1.1), ultra 4k, photorealist",
					negativePrompt: "nsfw, worst_quality, bad hands, bad eyes, sexy outfit",
					width: 512,
					height: 512,
					samplerName: "DPM++ 2S a Karras",
					guidanceScale: 5,
					steps: 30,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
					hiresFix: { targetWidth: 768, targetHeight: 768, strength: 0.6 },
				},
			},
			{
				promptItemId: "majicmixRealistic_v5_56446",
				name: "MajicMix Realistic",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/model/majicmixRealistic_v5_56446.jpeg",
				fields: {
					modelName: "majicmixRealistic_v5_56446.safetensors",
					prompt:
						"(Simple T-shirt and Jeans), 1girl, 20 yo beautiful woman, realistic, professional photography, (smooth hands:1.1), ultra 4k, photorealist",
					negativePrompt: "nsfw, worst_quality, bad hands, bad eyes, sexy outfit",
					width: 512,
					height: 512,
					samplerName: "DPM++ 2S a Karras",
					guidanceScale: 5,
					steps: 30,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
					hiresFix: { targetWidth: 768, targetHeight: 768, strength: 0.6 },
				},
			},
			{
				promptItemId: "juggernautXL_version2_113240",
				name: "Juggernaut XL 2",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/model/juggernautXL_version2_113240.jpeg",
				fields: {
					modelName: "juggernautXL_version2_113240.safetensors",
					prompt:
						"(evening gown), 1girl, 20 yo beautiful woman, realistic, professional photography, (smooth hands:1.1), ultra 4k, photorealist",
					negativePrompt: "nsfw, worst_quality, bad hands, bad eyes, sexy outfit",
					width: 512,
					height: 512,
					samplerName: "DPM++ 2S a Karras",
					guidanceScale: 5,
					steps: 30,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
					hiresFix: { targetWidth: 768, targetHeight: 768, strength: 0.6 },
				},
			},
			{
				promptItemId: "revAnimated_v122",
				name: "Rev Animated",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/model/revAnimated_v122.jpeg",
				fields: {
					modelName: "revAnimated_v122.safetensors",
					prompt:
						"1girl, 20 yo beautiful woman, wearing Cocktail Dress, realistic, professional photography, (smooth hands:1.1), ultra 4k, photorealist",
					negativePrompt: "nsfw, worst_quality, bad hands, bad eyes, sexy outfit",
					width: 512,
					height: 512,
					samplerName: "DPM++ 2S a Karras",
					guidanceScale: 5,
					steps: 30,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
					hiresFix: { targetWidth: 768, targetHeight: 768, strength: 0.6 },
				},
			},
			{
				promptItemId: "epicphotogasm_x_131265",
				name: "Epicphotogasm X",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/model/epicphotogasm_x_131265.jpeg",
				fields: {
					modelName: "epicphotogasm_x_131265.safetensors",
					prompt:
						"1girl, beautiful woman, wearing Raincoat, (Full Body Portrait), realistic, professional photography, (smooth hands:1.1), ultra 4k, photorealist",
					negativePrompt: "nsfw, worst_quality, bad hands, bad eyes, sexy outfit",
					width: 512,
					height: 512,
					samplerName: "DPM++ 2S a Karras",
					guidanceScale: 5,
					steps: 30,
					imageNum: 1,
					clipSkip: 1,
					seed: -1,
					hiresFix: { targetWidth: 768, targetHeight: 768, strength: 0.6 },
				},
			},
		],
	},
	// {
	//   promptType: "Appearance",
	//   options: [
	//
	//   ]
	// },
	{
		categoryId: "emotion",
		promptType: "Emotion",
		promptItems: [
			{
				promptItemId: "shy",
				name: "Shy",
				imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/Screenshot%202024-02-27%20at%2010.41.59%20AM.png",
				textPrompt: "shy face",
			},
			{
				promptItemId: "smile",
				name: "Smile",
				imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/Screenshot%202024-02-27%20at%2010.41.29%20AM.png",
				textPrompt: "smile face",
			},
			{
				promptItemId: "embarrassed",
				name: "Embarrassed",
				imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/Screenshot%202024-02-27%20at%2010.43.07%20AM.png",
				textPrompt: "embarrassed face",
			},
			{
				promptItemId: "tears",
				name: "Tears",
				imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/Screenshot%202024-02-27%20at%2010.43.34%20AM.png",
				textPrompt: "tears face",
			},
			{
				promptItemId: "stick_out_tongue",
				name: "Stick Out Tongue",
				imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/Screenshot%202024-02-27%20at%2010.44.05%20AM.png",
				textPrompt: "stick out tongue face",
			},
			{
				promptItemId: "grin",
				name: "Grin",
				imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/Screenshot%202024-02-27%20at%2010.44.17%20AM.png",
				textPrompt: "grin face",
			},
			{
				promptItemId: "expressionless",
				name: "Expressionless",
				imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/Screenshot%202024-02-27%20at%2010.44.32%20AM.png",
				textPrompt: "expressionless face",
			},
			{
				promptItemId: "scared",
				name: "Scared",
				imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/Screenshot%202024-02-27%20at%2010.45.38%20AM.png",
				textPrompt: "scared face",
			},
			{
				promptItemId: "o_mouth",
				name: "O-Mouth",
				imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/Screenshot%202024-02-27%20at%2010.46.03%20AM.png",
				textPrompt: "o-mouth face",
			},
			{
				promptItemId: "snicker",
				name: "Snicker",
				imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/Screenshot%202024-02-27%20at%2010.48.02%20AM.png",
				textPrompt: "snicker face",
			},
			{
				promptItemId: "angry",
				name: "Angry",
				imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/Screenshot%202024-02-27%20at%2010.47.29%20AM.png",
				textPrompt: "angry face",
			},
			{
				promptItemId: "worry_smile",
				name: "Worry Smile",
				imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/Screenshot%202024-02-27%20at%2010.48.41%20AM.png",
				textPrompt: "worry smile face",
			},
			{
				promptItemId: "sad",
				name: "Sad",
				imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/Screenshot%202024-02-27%20at%2010.49.00%20AM.png",
				textPrompt: "sad face",
			},
			{
				promptItemId: "frown",
				name: "Frown",
				imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/Screenshot%202024-02-27%20at%2010.52.13%20AM.png",
				textPrompt: "frown face",
			},
			{
				promptItemId: "boring",
				name: "Boring",
				imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/Screenshot%202024-02-27%20at%2010.40.58%20AM.png",
				textPrompt: "boring face",
			},
			{
				promptItemId: "pain",
				name: "Pain",
				imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/Screenshot%202024-02-27%20at%2010.50.02%20AM.png",
				textPrompt: "painful face",
			},
		],
	},
	{
		categoryId: "pose",
		promptType: "Pose",
		promptItems: [
			{
				promptItemId: "hand_on_hip",
				name: "Hand on Hip",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/pose/hand_on_hip.jpeg",
				textPrompt: "Hand on Hip",
			},
			{
				promptItemId: "lying_down",
				name: "Lying Down",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/pose/lying_down.jpeg",
				textPrompt: "Lying Down",
			},
			{
				promptItemId: "looking_over_shoulder",
				name: "Looking Over Shoulder",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/pose/looking_over_shoulder.jpeg",
				textPrompt: "Looking Over Shoulder",
			},
			{
				promptItemId: "tilting_head",
				name: "Tilting Head",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/pose/tilting_head.jpeg",
				textPrompt: "Tilting Head",
			},
			{
				promptItemId: "jumping",
				name: "Jumping",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/pose/jumping.jpeg",
				textPrompt: "Jumping",
			},
			{
				promptItemId: "bending_over",
				name: "Bending Over",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/pose/bending_over.jpeg",
				textPrompt: "Bending Over",
			},
			{
				promptItemId: "walking",
				name: "Walking",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/pose/walking.jpeg",
				textPrompt: "Walking",
			},
			{
				promptItemId: "standing",
				name: "Standing",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/pose/standing.jpeg",
				textPrompt: "Standing",
			},
			{
				promptItemId: "sitting",
				name: "Sitting",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/pose/sitting.jpeg",
				textPrompt: "Sitting",
			},
			{
				promptItemId: "lying_down",
				name: "Lying down",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/pose/lying_down.jpeg",
				textPrompt: "Lying down",
			},
			{
				promptItemId: "kneeling",
				name: "Kneeling",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/pose/kneeling.jpeg",
				textPrompt: "Kneeling",
			},
			{
				promptItemId: "crouching",
				name: "Crouching",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/pose/crouching.jpeg",
				textPrompt: "Crouching",
			},
			{
				promptItemId: "jumping",
				name: "Jumping",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/pose/jumping.jpeg",
				textPrompt: "Jumping",
			},
			{
				promptItemId: "running",
				name: "Running",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/pose/running.jpeg",
				textPrompt: "Running",
			},
			{
				promptItemId: "walking",
				name: "Walking",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/pose/walking.jpeg",
				textPrompt: "Walking",
			},
			{
				promptItemId: "dancing",
				name: "Dancing",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/pose/dancing.jpeg",
				textPrompt: "Dancing",
			},
			{
				promptItemId: "stretching",
				name: "Stretching",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/pose/stretching.jpeg",
				textPrompt: "Stretching",
			},
			{
				promptItemId: "bending_over",
				name: "Bending over",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/pose/bending_over.jpeg",
				textPrompt: "Bending over",
			},
			{
				promptItemId: "leaning",
				name: "Leaning",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/pose/leaning.jpeg",
				textPrompt: "Leaning",
			},
			{
				promptItemId: "reaching",
				name: "Reaching",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/pose/reaching.jpeg",
				textPrompt: "Reaching",
			},
			{
				promptItemId: "holding",
				name: "Holding",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/pose/holding.jpeg",
				textPrompt: "Holding",
			},
			{
				promptItemId: "hugging",
				name: "Hugging",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/pose/hugging.jpeg",
				textPrompt: "Hugging",
			},
			{
				promptItemId: "thinking",
				name: "Thinking",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/pose/thinking.jpeg",
				textPrompt: "Thinking",
			},
			{
				promptItemId: "shouting",
				name: "Shouting",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/pose/shouting.jpeg",
				textPrompt: "Shouting",
			},
			{
				promptItemId: "whispering",
				name: "Whispering",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/pose/whispering.jpeg",
				textPrompt: "Whispering",
			},
			{
				promptItemId: "singing",
				name: "Singing",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/pose/singing.jpeg",
				textPrompt: "Singing",
			},
			{
				promptItemId: "playing_an_instrument",
				name: "Playing an instrument",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/pose/playing_an_instrument.jpeg",
				textPrompt: "Playing an instrument",
			},
			{
				promptItemId: "typing",
				name: "Typing",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/pose/typing.jpeg",
				textPrompt: "Typing",
			},
			{
				promptItemId: "writing",
				name: "Writing",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/pose/writing.jpeg",
				textPrompt: "Writing",
			},
			{
				promptItemId: "drawing",
				name: "Drawing",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/pose/drawing.jpeg",
				textPrompt: "Drawing",
			},

			// {
			//   name: "Standing",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/82657f92-8613-451e-bed3-b062d34b1197",
			//   textPrompt: "Standing",
			// },
			// {
			//   name: "Pet Pose",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/a6bc88f8-2c07-4c67-893c-42db5b776242",
			//   textPrompt: "Pet Pose",
			// },
			// {
			//   name: "Sitting",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/9d7012bb-a34f-4ffa-ae06-93237405d71d",
			//   textPrompt: "Sitting",
			// },
			// {
			//   name: "Back To View",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/3932bfa1-6563-4765-bdaa-66928becdcf1",
			//   textPrompt: "Back To View",
			// },
			// {
			//   name: "Floating On Water",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/5363622b-e07c-4d77-b85f-6a75fb164c3e",
			//   textPrompt: "Floating On Water",
			// },
			// {
			//   name: "Taking Selfie",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/41b2f0cf-576b-49eb-b38b-dd6b8c0b2cbb",
			//   textPrompt: "Taking Selfie",
			// },
			// {
			//   name: "Sleepy",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/685aa990-a45c-4944-84b4-81c0a2b41086",
			//   textPrompt: "Sleepy",
			// },
			// {
			//   name: "Squat",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/3b5508cf-6d7d-44b2-8410-81b18ea182be",
			//   textPrompt: "Squat",
			// },
			// {
			//   name: "Lying",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/1200223908-8b16a4dc-d6ca-11ee-a53c-deec6626437d.png",
			//   textPrompt: "Lying",
			// },
			// {
			//   name: "Covering Face",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/0c36ee6c-8759-4f86-a541-a103869effb6",
			//   textPrompt: "Covering Face",
			// },
			// {
			//   name: "Hand On Arm",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/8f6bd755-5bb4-4b9e-83c3-22322fb71da9",
			//   textPrompt: "Hand On Arm",
			// },
			// {
			//   name: "Rabbit Ears",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/c07ab836-06ca-41ff-a381-7542aefeb809",
			//   textPrompt: "Rabbit Ears",
			// },
			// {
			//   name: "Jumping",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/78d9a6fe-3eb4-4e50-a9ce-af8e9eab2665",
			//   textPrompt: "Jumping",
			// },
			// {
			//   name: "Peeking Out",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/b182a515-bb74-48bd-b20e-33b9c0be7693",
			//   textPrompt: "Peeking Out",
			// }
		],
	},
	{
		categoryId: "framing",
		promptType: "Framing",
		promptItems: [
			{
				promptItemId: "portrait",
				name: "Portrait",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/framing/portrait.jpeg",
				textPrompt: "Portrait",
			},
			{
				promptItemId: "upper_body_portrait",
				name: "Upper Body Portrait",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/framing/upper_body_portrait.jpeg",
				textPrompt: "Upper Body Portrait",
			},
			{
				promptItemId: "bust_shot",
				name: "Bust Shot",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/framing/bust_shot.jpeg",
				textPrompt: "Bust Shot",
			},
			{
				promptItemId: "full_body_shot",
				name: "Full Body Shot",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/framing/full_body_shot.jpeg",
				textPrompt: "Full Body Shot",
			},
			{
				promptItemId: "close-up_to_face",
				name: "Close-Up to Face",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/framing/close-up_to_face.jpeg",
				textPrompt: "Close-Up to Face",
			},
			{
				promptItemId: "bird's_eye_view",
				name: "Bird's Eye View",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/framing/bird's_eye_view.jpeg",
				textPrompt: "Bird's Eye View",
			},

			// {
			//   name: "Cowboy Shot",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/4181539871-d93e9e00-d53d-11ee-91bb-aa8cb9227487.png",
			//   textPrompt: "cowboy shot",
			// },
			// {
			//   name: "Full Body",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/3794958009-f1f9ef9e-d53d-11ee-91bb-aa8cb9227487.png",
			//   textPrompt: "full body",
			// },
			// {
			//   name: "Close Up",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/1683591917-13633fb4-d53e-11ee-91bb-aa8cb9227487.png",
			//   textPrompt: "close up",
			// }
		],
	},
	// {
	//   promptType: "Character",
	//   options: [
	//
	//   ]
	// },
	// {
	//   categoryId: "tool",
	//   promptType: "Tool",
	//   promptItems: [
	//     {
	//       promptItemId: "adddetails",
	//       name: "Add Details",
	//       imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/Screenshot%202024-02-27%20at%203.18.11%20PM.jpeg",
	//       textPrompt: "add details",
	//     },
	//     {
	//       promptItemId: "lowkey",
	//       name: "Low Key",
	//       imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/2755409478-f6f1c418-d551-11ee-b9e1-32f90d620c5b.png",
	//       textPrompt: "low key",
	//     }
	//   ]
	// },
	// {
	//   promptType: "Theme",
	//   options: [
	//     {
	//       name: "Mechanical",
	//       imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/3603605474-fa102114-d469-11ee-b924-ae9bb105b32d.png",
	//       textPrompt: "mechanical",
	//     },
	//     {
	//       name: "Sorcery",
	//       imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/2706766074-5cefb76a-cbc1-11ee-a314-5ad535f6e577.png",
	//       textPrompt: "sorcery",
	//     }
	//   ]
	// },
	{
		categoryId: "clothe",
		promptType: "Clothe",
		promptItems: [
			{
				promptItemId: "simple_t-shirt_and_jeans",
				name: "Simple T-shirt and Jeans",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/clothe/simple_t-shirt_and_jeans.jpeg",
				textPrompt: "wearing Simple T-shirt and Jeans",
			},
			{
				promptItemId: "evening_gown",
				name: "evening gown",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/clothe/evening_gown.jpeg",
				textPrompt: "wearing evening gown",
			},
			{
				promptItemId: "cocktail_dress",
				name: "Cocktail Dress",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/clothe/cocktail_dress.jpeg",
				textPrompt: "wearing Cocktail Dress",
			},
			{
				promptItemId: "wedding_dress",
				name: "Wedding Dress",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/clothe/wedding_dress.jpeg",
				textPrompt: "wearing Wedding Dress",
			},
			{
				promptItemId: "school_uniform",
				name: "School Uniform",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/clothe/school_uniform.jpeg",
				textPrompt: "wearing School Uniform",
			},
			{
				promptItemId: "nurse_uniform",
				name: "Nurse Uniform",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/clothe/nurse_uniform.jpeg",
				textPrompt: "Nurse Uniform",
			},
			{
				promptItemId: "business_suit",
				name: "Business Suit",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/clothe/business_suit.jpeg",
				textPrompt: "Business Suit",
			},
			{
				promptItemId: "sportswear",
				name: "Sportswear",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/clothe/sportswear.jpeg",
				textPrompt: "Sportswear",
			},
			{
				promptItemId: "pajamas",
				name: "Pajamas",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/clothe/pajamas.jpeg",
				textPrompt: "Pajamas",
			},
			{
				promptItemId: "coat",
				name: "Coat",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/clothe/coat.jpeg",
				textPrompt: "Coat",
			},
			{
				promptItemId: "raincoat",
				name: "Raincoat",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/clothe/raincoat.jpeg",
				textPrompt: "Raincoat",
			},
			{
				promptItemId: "hoodie",
				name: "Hoodie",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/clothe/hoodie.jpeg",
				textPrompt: "Hoodie",
			},
			{
				promptItemId: "sweatshirt",
				name: "Sweatshirt",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/clothe/sweatshirt.jpeg",
				textPrompt: "Sweatshirt",
			},
			{
				promptItemId: "tank_top",
				name: "Tank Top",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/clothe/tank_top.jpeg",
				textPrompt: "Tank Top",
			},
			{
				promptItemId: "polo_shirt",
				name: "Polo Shirt",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/clothe/polo_shirt.jpeg",
				textPrompt: "Polo Shirt",
			},
			{
				promptItemId: "button-down_shirt",
				name: "Button-down Shirt",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/clothe/button-down_shirt.jpeg",
				textPrompt: "Button-down Shirt",
			},
			{
				promptItemId: "blouse",
				name: "Blouse",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/clothe/blouse.jpeg",
				textPrompt: "Blouse",
			},
			{
				promptItemId: "skirt",
				name: "Skirt",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/clothe/skirt.jpeg",
				textPrompt: "Skirt",
			},
			{
				promptItemId: "shorts",
				name: "Shorts",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/clothe/shorts.jpeg",
				textPrompt: "Shorts",
			},
			{
				promptItemId: "cargo_pants",
				name: "Cargo Pants",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/clothe/cargo_pants.jpeg",
				textPrompt: "Cargo Pants",
			},
			{
				promptItemId: "leggings",
				name: "Leggings",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/clothe/leggings.jpeg",
				textPrompt: "Leggings",
			},
			{
				promptItemId: "dress_shirt",
				name: "Dress Shirt",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/clothe/dress_shirt.jpeg",
				textPrompt: "Dress Shirt",
			},
			{
				promptItemId: "necktie",
				name: "Necktie",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/clothe/necktie.jpeg",
				textPrompt: "Necktie",
			},
			{
				promptItemId: "bow_tie",
				name: "Bow Tie",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/clothe/bow_tie.jpeg",
				textPrompt: "Bow Tie",
			},
			{
				promptItemId: "vest",
				name: "Vest",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/clothe/vest.jpeg",
				textPrompt: "Vest",
			},
			{
				promptItemId: "cardigan",
				name: "Cardigan",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/clothe/cardigan.jpeg",
				textPrompt: "Cardigan",
			},
			{
				promptItemId: "sweater",
				name: "Sweater",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/clothe/sweater.jpeg",
				textPrompt: "Sweater",
			},

			// {
			//   promptItemId: "blacktrueseifuku",
			//   name: "Black Trueseifuku",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/c86eac47-e65a-4af3-ba58-f2ea0769cc84",
			//   textPrompt: "Black Trueseifuku"
			// },
			// {
			//   promptItemId: "bunnygirl",
			//   name: "Bunny Girl",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/ffaa6521-b049-42a8-9825-dfde7731a723",
			//   textPrompt: "Bunny Girl"
			// },
			// {
			//   name: "Rabbit Maid",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/e8ba45cc-d9b3-4f0d-90e7-fbaeff5c496c",
			//   textPrompt: "Rabbit Maid"
			// },
			// {
			//   name: "All Black Suit",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/c44cac40-7c86-480d-ad2b-476ba3acf856",
			//   textPrompt: "All Black Suit"
			// },
			// {
			//   name: "Beach Shorts",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/45634281-cbb5-48e6-89d0-30cd1aec74e6",
			//   textPrompt: "Beach Shorts"
			// },
			// {
			//   name: "Soldier Vest",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/ef7bff22-042a-4296-97cb-167e0f42f2ca",
			//   textPrompt: "Soldier Vest"
			// },
			// {
			//   name: "Seaweed Gowns",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/a11ce596-b0f9-4d6b-bdb9-9c422cdb79ef",
			//   textPrompt: "Seaweed Gowns"
			// },
			// {
			//   name: "Spacesuit",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/ce3d2677-64df-43ed-89c6-21ae3b5dd549",
			//   textPrompt: "Spacesuit"
			// },
			// {
			//   name: "Fur-Trimmed Capulet",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/45a7c7b3-43af-4b35-8c8a-662481179cee",
			//   textPrompt: "Fur-Trimmed Capulet"
			// },
			// {
			//   name: "Shiromuku",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/510a0c3c-3b28-47fe-998a-cef18a4262ed",
			//   textPrompt: "Shiromuku"
			// },
			// {
			//   name: "Detective",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/4c27608c-3f41-40f3-9470-ebd4332c1626",
			//   textPrompt: "Detective"
			// },
			// {
			//   name: "Red Cloak",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/39c6a0fd-0dfb-4257-b079-b5d1387e4ff1",
			//   textPrompt: "Red Cloak"
			// },
			// {
			//   name: "Unicorn Knight",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/f4ee8829-4433-4fa5-b1da-cbd6a2440815",
			//   textPrompt: "Unicorn Knight"
			// },
			// {
			//   name: "Sports Shorts",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/f70e958d-e3f4-406a-b972-c4c636f14db1",
			//   textPrompt: "Sports Shorts"
			// },
			// {
			//   name: "Snake Pattern",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/3a8ec065-987b-45e6-832b-f8052d7c1cb7",
			//   textPrompt: "Snake Pattern"
			// },
			// {
			//   name: "Sparkle Ballgown",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/040e7a46-8b46-44b2-9921-57b07f527563",
			//   textPrompt: "Sparkle Ballgown"
			// },
			// {
			//   name: "Antigas Mask",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/0bf342ee-6e0b-4d5c-8b7f-b8e50d58b5bb",
			//   textPrompt: "Antigas Mask"
			// },
			// {
			//   name: "Overalls",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/61370b01-650e-49a6-85b2-1bdf52493e72",
			//   textPrompt: "Overalls"
			// },
			// {
			//   name: "Bruce Lee Jacket",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/99f32929-fd3c-42a6-855c-e73e56c98c28",
			//   textPrompt: "Bruce Lee Jacket"
			// },
			// {
			//   name: "Japanese Hoodies",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/fa542388-ab55-4be1-b617-9bfcdccae9f5",
			//   textPrompt: "Japanese Hoodies"
			// },
			// {
			//   name: "Classic Gowns",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/5bcc871c-2e00-4bf6-873a-22fb436559b5",
			//   textPrompt: "Classic Gowns"
			// },
			// {
			//   name: "Choker Attire ",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/24b51ca9-f74e-4efd-8835-d9d8ec8e9fc3",
			//   textPrompt: "Choker Attire "
			// },
			// {
			//   name: "Mask",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/bb06eaac-e259-4474-a0db-97746c4675fa",
			//   textPrompt: "Mask"
			// },
			// {
			//   name: "Puffy Sleeves",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/92a3ccf8-6481-4dbb-9f98-bbccca5d7836",
			//   textPrompt: "Puffy Sleeves"
			// },
			// {
			//   name: "Elf Dress",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/6a0415b0-946c-454a-a741-51e09080b2ff",
			//   textPrompt: "Elf Dress"
			// },
			// {
			//   name: "Thorn Dress",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/07831c4a-bd83-4683-8db9-1d5291ad7077",
			//   textPrompt: "Thorn Dress"
			// },
			// {
			//   name: "Spiderman Costume",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/d0d08628-17eb-44f6-9c84-d37456ee8970",
			//   textPrompt: "Spiderman Costume"
			// },
			// {
			//   name: "Saint",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/48cff46d-0808-4520-a744-20fcc1753e7a",
			//   textPrompt: "Saint"
			// },
			// {
			//   name: "Ballet",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/2e121c2c-4d42-4b5e-bb84-0ead3faa1f6c",
			//   textPrompt: "Ballet"
			// },
			// {
			//   name: "Cowgirl",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/87bc01d6-9d04-4a29-9517-d207a8cdbdf1",
			//   textPrompt: "Cowgirl"
			// },
			// {
			//   name: "Saintly Attire",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/53622fdb-fa31-4fa8-abfa-ff2a23a920cb",
			//   textPrompt: "Saintly Attire"
			// },
			// {
			//   name: "Ghost Robe",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/44f9517f-0d91-44e5-b606-3fa8ac0e5efc",
			//   textPrompt: "Ghost Robe"
			// },
			// {
			//   name: "Hanfu",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/9cb2fd1f-0028-4075-967b-ff1569d2d791",
			//   textPrompt: "Hanfu"
			// },
			// {
			//   name: "Fox Gowns",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/9e9e166c-c4c2-4114-ab42-1db8b03a419f",
			//   textPrompt: "Fox Gowns"
			// },
			// {
			//   name: "Kitchen Apron",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/4f9b47a0-e2f0-46fe-9a43-e20cda2590cd",
			//   textPrompt: "Kitchen Apron"
			// },
			// {
			//   name: "Greek Clothes",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/7bd7f9eb-c41c-4197-977a-bc520e649470",
			//   textPrompt: "Greek Clothes"
			// },
			// {
			//   name: "Hoodies",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/cd4f6a8a-46d7-4d9c-8d01-803905be3af1",
			//   textPrompt: "Hoodies"
			// },
			// {
			//   name: "Round Glasses",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/7e2b300b-79c9-4e76-a987-13d3c387fd28",
			//   textPrompt: "Round Glasses"
			// },
			// {
			//   name: "Grunge Jeans",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/195e133f-ca02-4449-b6e4-6163aa673ba6",
			//   textPrompt: "Grunge Jeans"
			// },
			// {
			//   name: "Combat Suits",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/1b5eeb9d-2d06-4bf9-87af-bf22a433556d",
			//   textPrompt: "Combat Suits"
			// },
			// {
			//   name: "Urban Samurai ",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/287a6836-a982-4f9c-b088-21cd27e301cb",
			//   textPrompt: "Urban Samurai "
			// },
			// {
			//   name: "Oversize Tshirt ",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/7675b97b-10c5-4d6a-84ad-6a5c8b68f668",
			//   textPrompt: "Oversize Tshirt "
			// },
			// {
			//   name: "Stewardess ",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/5364dd67-e27c-45c6-b516-95600b3ae33e",
			//   textPrompt: "Stewardess "
			// },
			// {
			//   name: "Tokiwadai Uniform",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/d366997f-28f4-4d11-8e4b-85eba7c65632",
			//   textPrompt: "Tokiwadai Uniform"
			// },
			// {
			//   name: "Lolita Dress",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/04f55e4b-c049-4479-bc98-9e885b60e608",
			//   textPrompt: "Lolita Dress"
			// },
			// {
			//   name: "Camouflage Uniform",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/5a0e1a75-52bf-4805-b195-10ac41214829",
			//   textPrompt: "Camouflage Uniform"
			// },
			// {
			//   name: "Transparent Raincoat ",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/78044d44-a36a-4a7f-b4e2-bc24e0b952f9",
			//   textPrompt: "Transparent Raincoat "
			// },
			// {
			//   name: "Off Shoulder",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/4efa5901-9505-44db-a805-d3277f47289a",
			//   textPrompt: "Off Shoulder"
			// },
			// {
			//   name: "Volleyball Uniform ",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/492688b7-0227-40f2-a0f8-c22cd3c2337e",
			//   textPrompt: "Volleyball Uniform "
			// },
			// {
			//   name: "Leggings",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/20f01936-faf8-40e0-a7de-09d62d9e9d36",
			//   textPrompt: "Leggings"
			// },
			// {
			//   name: "Dolphin Shorts",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/2110772d-ba39-4665-8d98-11407152ef50",
			//   textPrompt: "Dolphin Shorts"
			// },
			// {
			//   name: "Hogwarts Uniform",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/423e40d5-1636-45f0-a9d5-92975ae32eea",
			//   textPrompt: "Hogwarts Uniform"
			// },
			// {
			//   name: "Landmine Girl",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/6b30175c-6733-44fb-b553-fcf1362e25bf",
			//   textPrompt: "Landmine Girl"
			// },
			// {
			//   name: "Cheerleader Uniforms",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/d28bf83c-b371-4f58-ba13-ed04868efe35",
			//   textPrompt: "Cheerleader Uniforms"
			// },
			// {
			//   name: "Wedding Dress",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/39b43f70-dba5-4032-b608-27d350251ba1",
			//   textPrompt: "Wedding Dress"
			// },
			// {
			//   name: "Egypt Punk",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/374e08d6-9637-49e2-9b00-d107777f6356",
			//   textPrompt: "Egypt Punk"
			// },
			// {
			//   name: "Maid Costume",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/1e3b303d-2d91-4724-a9c4-e730b9aae0e3",
			//   textPrompt: "Maid Costume"
			// },
			// {
			//   name: "Buruma",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/96cfb0de-e2e6-4a1c-9f58-76db18cac4b6",
			//   textPrompt: "Buruma"
			// },
			// {
			//   name: "Kimono",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/e82777e5-2a9d-4619-8dc5-f3f8792cd569",
			//   textPrompt: "Kimono"
			// },
			// {
			//   name: "Curtain Dress",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/108c0b4e-3450-42c2-86f1-e1990045d1dd",
			//   textPrompt: "Curtain Dress"
			// },
			// {
			//   name: "Nurse Uniform",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/004a0330-470b-4d85-bf6f-e6914b38a283",
			//   textPrompt: "Nurse Uniform"
			// },
			// {
			//   name: "Sailor Uniform",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/b0e8f167-a2e0-4f51-9eed-cdff20dc3e8c",
			//   textPrompt: "Sailor Uniform"
			// },
			// {
			//   name: "Workout Clothes",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/d21c8dda-6418-4b21-888b-74bdc83c3b54",
			//   textPrompt: "Workout Clothes"
			// },
			// {
			//   name: "Crop Top",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/3c45a352-bca8-430a-b2d6-443a9999f03e",
			//   textPrompt: "Crop Top"
			// }
		],
	},
	{
		categoryId: "view",
		promptType: "View",
		promptItems: [
			{
				promptItemId: "front_view",
				name: "Front view",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/view/front_view.jpeg",
				textPrompt: "Front view",
			},
			{
				promptItemId: "side_view",
				name: "Side view",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/view/side_view.jpeg",
				textPrompt: "Side view",
			},
			{
				promptItemId: "back_view",
				name: "Back view",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/view/back_view.jpeg",
				textPrompt: "Back view",
			},
			{
				promptItemId: "three-quarter_view",
				name: "Three-quarter view",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/view/three-quarter_view.jpeg",
				textPrompt: "Three-quarter view",
			},

			{
				promptItemId: "low_angle_shot",
				name: "Low angle shot",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/view/low_angle_shot.jpeg",
				textPrompt: "Low angle shot",
			},

			{
				promptItemId: "bird's_eye_view",
				name: "Bird's eye view",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/view/bird's_eye_view.jpeg",
				textPrompt: "Bird's eye view",
			},
			{
				promptItemId: "over-the-shoulder_shot",
				name: "Over-the-shoulder shot",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/view/over-the-shoulder_shot.jpeg",
				textPrompt: "Over-the-shoulder shot",
			},
			{
				promptItemId: "dutch_angle",
				name: "Dutch angle",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/view/dutch_angle.jpeg",
				textPrompt: "Dutch angle",
			},
			{
				promptItemId: "profile_view",
				name: "Profile view",
				imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/view/profile_view.jpeg",
				textPrompt: "Profile view",
			},
			// {
			//   name: "View Above",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/2368054794-7babe5a8-d534-11ee-94f4-524080f97bec.png",
			//   textPrompt: "View Above",
			// },
			// {
			//   name: "From Behind",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/2565999009-7f6b3536-d534-11ee-94f4-524080f97bec.png",
			//   textPrompt: "From Behind",
			// },
			// {
			//   name: "Side View",
			//   imageUrl: "https://storage.googleapis.com/eizoai/appreplicate/482048692-833d4b4a-d534-11ee-94f4-524080f97bec.png",
			//   textPrompt: "Side View",
			// }
		],
	},
	// {
	// 	categoryId: "building",
	// 	promptType: "Building",
	// 	promptItems: [
	// 		{
	// 			promptItemId: "front_view",
	// 			name: "Front view",
	// 			imageUrl: "https://storage.googleapis.com/eizoai/prompt_options/view/front_view.jpeg",
	// 			textPrompt: "Front view",
	// 		},
	// 	],
	// },
]
