const cookieNames = Object.freeze({
    cookiesAllowed: "forewarnedToolCookiesAllowed",
    theme: "forewarnedToolTheme",
    sectionStates: "forewarnedToolSectionStates"
});

const evidence = Object.freeze({
    destruction: "destruction",
    disturbedTombs: "disturbed-tombs",
    electronicDisturbances: "electronic-disturbances",
    extinguishedFlames: "extinguished-flames",
    footsteps: "footsteps",
    magneticDistortion: "magnetic-distortion",
    metallicSignature: "metallic-signature",
    radarDetection: "radar-detection",
    radioactivity: "radioactivity",
    reanimation: "reanimation",
    tremors: "tremors",
    vocalResponse: "vocal-response"
});

const mejai = Object.freeze({
    dekan: [evidence.destruction, evidence.reanimation,
        evidence.disturbedTombs, evidence.vocalResponse, evidence.radarDetection,
        evidence.tremors, evidence.radioactivity, evidence.footsteps,
        evidence.electronicDisturbances],
    necreph: [evidence.destruction, evidence.extinguishedFlames,
        evidence.disturbedTombs, evidence.magneticDistortion,
        evidence.vocalResponse, evidence.tremors, evidence.radioactivity,
        evidence.metallicSignature, evidence.electronicDisturbances],
    ouphris: [evidence.extinguishedFlames, evidence.reanimation,
        evidence.magneticDistortion, evidence.vocalResponse,
        evidence.radarDetection, evidence.tremors, evidence.radioactivity,
        evidence.metallicSignature, evidence.footsteps],
    rathos: [evidence.destruction, evidence.extinguishedFlames,
        evidence.reanimation, evidence.disturbedTombs,
        evidence.magneticDistortion, evidence.radarDetection,
        evidence.metallicSignature, evidence.footsteps,
        evidence.electronicDisturbances],
    talgor: [evidence.destruction, evidence.extinguishedFlames,
        evidence.reanimation, evidence.magneticDistortion,
        evidence.vocalResponse, evidence.radarDetection, evidence.tremors,
        evidence.radioactivity, evidence.electronicDisturbances]
});
