import * as THREE from 'three';

// Cache generated textures to avoid duplicate canvas generation
const textureCache = new Map<string, THREE.CanvasTexture>();

/**
 * Generates a seamless schist/slate architectural stone masonry texture
 */
export function getStoneTextures() {
  if (textureCache.has('stone_diffuse')) {
    return {
      map: textureCache.get('stone_diffuse')!,
      bumpMap: textureCache.get('stone_bump')!,
      roughnessMap: textureCache.get('stone_roughness')!,
    };
  }

  const width = 512;
  const height = 512;

  // 1. Diffuse Map
  const canvasDiffuse = document.createElement('canvas');
  canvasDiffuse.width = width;
  canvasDiffuse.height = height;
  const ctx = canvasDiffuse.getContext('2d')!;

  // Base slate tone
  ctx.fillStyle = '#222830';
  ctx.fillRect(0, 0, width, height);

  // Horizontal stone coursing bands
  const rowHeight = 32;
  for (let y = 0; y < height; y += rowHeight) {
    let x = 0;
    while (x < width) {
      const stoneWidth = 40 + Math.random() * 80;
      const shade = Math.floor(30 + Math.random() * 25);
      ctx.fillStyle = `rgb(${shade}, ${shade + 4}, ${shade + 8})`;
      ctx.fillRect(x + 2, y + 2, stoneWidth - 4, rowHeight - 4);

      // Fine stone grain inside each stone
      for (let g = 0; g < 30; g++) {
        const gx = x + 2 + Math.random() * (stoneWidth - 4);
        const gy = y + 2 + Math.random() * (rowHeight - 4);
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.15)';
        ctx.fillRect(gx, gy, 2 + Math.random() * 4, 1.5);
      }

      x += stoneWidth;
    }
    // Mortar horizontal groove
    ctx.fillStyle = '#11151a';
    ctx.fillRect(0, y, width, 2);
  }

  const map = new THREE.CanvasTexture(canvasDiffuse);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;

  // 2. Bump / Height Map
  const canvasBump = document.createElement('canvas');
  canvasBump.width = width;
  canvasBump.height = height;
  const ctxBump = canvasBump.getContext('2d')!;

  ctxBump.fillStyle = '#808080';
  ctxBump.fillRect(0, 0, width, height);

  for (let y = 0; y < height; y += rowHeight) {
    let x = 0;
    while (x < width) {
      const stoneWidth = 40 + Math.random() * 80;
      const bShade = Math.floor(120 + Math.random() * 90);
      ctxBump.fillStyle = `rgb(${bShade}, ${bShade}, ${bShade})`;
      ctxBump.fillRect(x + 2, y + 2, stoneWidth - 4, rowHeight - 4);
      x += stoneWidth;
    }
    ctxBump.fillStyle = '#202020';
    ctxBump.fillRect(0, y, width, 2);
  }

  const bumpMap = new THREE.CanvasTexture(canvasBump);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;

  // 3. Roughness Map
  const canvasRough = document.createElement('canvas');
  canvasRough.width = width;
  canvasRough.height = height;
  const ctxRough = canvasRough.getContext('2d')!;
  ctxRough.fillStyle = '#cccccc';
  ctxRough.fillRect(0, 0, width, height);

  const roughnessMap = new THREE.CanvasTexture(canvasRough);
  roughnessMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.RepeatWrapping;

  textureCache.set('stone_diffuse', map);
  textureCache.set('stone_bump', bumpMap);
  textureCache.set('stone_roughness', roughnessMap);

  return { map, bumpMap, roughnessMap };
}

/**
 * Generates rich smoked cedar / walnut wood grain texture
 */
export function getWoodTextures() {
  if (textureCache.has('wood_diffuse')) {
    return {
      map: textureCache.get('wood_diffuse')!,
      bumpMap: textureCache.get('wood_bump')!,
    };
  }

  const width = 512;
  const height = 512;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Base warm smoked walnut
  ctx.fillStyle = '#4a2f1c';
  ctx.fillRect(0, 0, width, height);

  // Fine linear wood grain lines
  for (let y = 0; y < height; y += 2) {
    const wave = Math.sin(y * 0.05) * 8 + Math.sin(y * 0.12) * 3;
    const darkTone = 40 + Math.floor(Math.sin(y * 0.08) * 15);
    ctx.fillStyle = `rgba(${darkTone + 35}, ${darkTone + 15}, ${darkTone}, 0.25)`;
    ctx.fillRect(0, y, width, 1.5);

    // Subtle knots and grain variation
    if (Math.random() < 0.15) {
      ctx.fillStyle = 'rgba(25, 14, 8, 0.4)';
      ctx.fillRect(Math.random() * width, y, 40 + wave, 2);
    }
  }

  const map = new THREE.CanvasTexture(canvas);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;

  const canvasBump = document.createElement('canvas');
  canvasBump.width = width;
  canvasBump.height = height;
  const ctxBump = canvasBump.getContext('2d')!;
  ctxBump.fillStyle = '#808080';
  ctxBump.fillRect(0, 0, width, height);

  for (let y = 0; y < height; y += 3) {
    ctxBump.fillStyle = Math.random() > 0.5 ? '#909090' : '#707070';
    ctxBump.fillRect(0, y, width, 1.5);
  }

  const bumpMap = new THREE.CanvasTexture(canvasBump);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;

  textureCache.set('wood_diffuse', map);
  textureCache.set('wood_bump', bumpMap);

  return { map, bumpMap };
}

/**
 * Generates procedural terrain texture (rich alpine humus, mossy grass, granite strata)
 */
export function getAlpineTerrainTextures() {
  if (textureCache.has('terrain_diffuse')) {
    return {
      map: textureCache.get('terrain_diffuse')!,
      bumpMap: textureCache.get('terrain_bump')!,
    };
  }

  const width = 1024;
  const height = 1024;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Deep evergreen humus base
  ctx.fillStyle = '#162e1c';
  ctx.fillRect(0, 0, width, height);

  // Multi-frequency noise patches
  for (let i = 0; i < 60000; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const r = Math.random();

    if (r < 0.45) {
      ctx.fillStyle = 'rgba(34, 75, 42, 0.18)'; // Lush mossy alpine grass
    } else if (r < 0.75) {
      ctx.fillStyle = 'rgba(20, 42, 26, 0.25)'; // Deep forest shadow
    } else if (r < 0.92) {
      ctx.fillStyle = 'rgba(56, 42, 28, 0.2)';  // Pine needle humus
    } else {
      ctx.fillStyle = 'rgba(70, 80, 88, 0.15)'; // Slate rock grain
    }

    const s = 1.5 + Math.random() * 4.5;
    ctx.fillRect(x, y, s, s);
  }

  const map = new THREE.CanvasTexture(canvas);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(12, 12);

  // Bump map
  const canvasBump = document.createElement('canvas');
  canvasBump.width = 512;
  canvasBump.height = 512;
  const ctxBump = canvasBump.getContext('2d')!;
  ctxBump.fillStyle = '#808080';
  ctxBump.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 20000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    ctxBump.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
    ctxBump.fillRect(x, y, 3, 3);
  }

  const bumpMap = new THREE.CanvasTexture(canvasBump);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;
  bumpMap.repeat.set(12, 12);

  textureCache.set('terrain_diffuse', map);
  textureCache.set('terrain_bump', bumpMap);

  return { map, bumpMap };
}

/**
 * Generates architectural dark composite panel texture with subtle brushed finish
 */
export function getMetalPanelTextures() {
  if (textureCache.has('metal_diffuse')) {
    return {
      map: textureCache.get('metal_diffuse')!,
      bumpMap: textureCache.get('metal_bump')!,
    };
  }

  const width = 512;
  const height = 512;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Deep matte charcoal
  ctx.fillStyle = '#181f28';
  ctx.fillRect(0, 0, width, height);

  // Subtle brushed vertical lines
  for (let x = 0; x < width; x += 2) {
    const alpha = (Math.random() * 0.08).toFixed(3);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fillRect(x, 0, 1, height);
  }

  const map = new THREE.CanvasTexture(canvas);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;

  const bumpMap = new THREE.CanvasTexture(canvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;

  textureCache.set('metal_diffuse', map);
  textureCache.set('metal_bump', bumpMap);

  return { map, bumpMap };
}

/**
 * Generates warm alpine limestone / sandstone plaster stucco texture
 */
export function getLimestoneStuccoTextures() {
  if (textureCache.has('stucco_diffuse')) {
    return {
      map: textureCache.get('stucco_diffuse')!,
      bumpMap: textureCache.get('stucco_bump')!,
      roughnessMap: textureCache.get('stucco_roughness')!,
    };
  }

  const width = 512;
  const height = 512;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Warm limestone base
  ctx.fillStyle = '#dfd6c8';
  ctx.fillRect(0, 0, width, height);

  // Soft stucco plaster grain
  for (let i = 0; i < 40000; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const shade = Math.random() > 0.5 ? 'rgba(255,255,255,0.12)' : 'rgba(180,160,140,0.15)';
    ctx.fillStyle = shade;
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  const map = new THREE.CanvasTexture(canvas);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;

  // Bump map
  const canvasBump = document.createElement('canvas');
  canvasBump.width = width;
  canvasBump.height = height;
  const ctxBump = canvasBump.getContext('2d')!;
  ctxBump.fillStyle = '#808080';
  ctxBump.fillRect(0, 0, width, height);

  for (let i = 0; i < 25000; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    ctxBump.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
    ctxBump.fillRect(x, y, 2, 2);
  }

  const bumpMap = new THREE.CanvasTexture(canvasBump);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;

  // Roughness map
  const canvasRough = document.createElement('canvas');
  canvasRough.width = width;
  canvasRough.height = height;
  const ctxRough = canvasRough.getContext('2d')!;
  ctxRough.fillStyle = '#b0b0b0';
  ctxRough.fillRect(0, 0, width, height);

  const roughnessMap = new THREE.CanvasTexture(canvasRough);
  roughnessMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.RepeatWrapping;

  textureCache.set('stucco_diffuse', map);
  textureCache.set('stucco_bump', bumpMap);
  textureCache.set('stucco_roughness', roughnessMap);

  return { map, bumpMap, roughnessMap };
}

/**
 * Generates tangent-space Normal Map and Roughness Map for architectural building facades
 */
export function getFacadeNormalAndRoughnessMaps() {
  if (textureCache.has('facade_normal')) {
    return {
      normalMap: textureCache.get('facade_normal')!,
      roughnessMap: textureCache.get('facade_roughness')!,
    };
  }

  const width = 512;
  const height = 512;

  // 1. Tangent Space Normal Map
  const canvasNormal = document.createElement('canvas');
  canvasNormal.width = width;
  canvasNormal.height = height;
  const ctxNormal = canvasNormal.getContext('2d')!;

  // Neutral normal color (Vector [0, 0, 1] -> RGB [128, 128, 255])
  ctxNormal.fillStyle = 'rgb(128, 128, 255)';
  ctxNormal.fillRect(0, 0, width, height);

  // Horizontal floor and relief grooves
  for (let y = 0; y < height; y += 64) {
    // Top bevel edge (pointing slightly down: ny < 0 -> G < 128)
    ctxNormal.fillStyle = 'rgb(128, 90, 240)';
    ctxNormal.fillRect(0, y, width, 3);
    // Bottom bevel edge (pointing slightly up: ny > 0 -> G > 128)
    ctxNormal.fillStyle = 'rgb(128, 165, 240)';
    ctxNormal.fillRect(0, y + 3, width, 3);
  }

  // Vertical window mullions and pillar grooves
  for (let x = 0; x < width; x += 48) {
    ctxNormal.fillStyle = 'rgb(90, 128, 240)'; // Left edge
    ctxNormal.fillRect(x, 0, 3, height);
    ctxNormal.fillStyle = 'rgb(165, 128, 240)'; // Right edge
    ctxNormal.fillRect(x + 3, 0, 3, height);
  }

  // Micro-surface stone grain noise
  for (let i = 0; i < 15000; i++) {
    const rx = Math.random() * width;
    const ry = Math.random() * height;
    const nx = Math.floor(118 + Math.random() * 20);
    const ny = Math.floor(118 + Math.random() * 20);
    ctxNormal.fillStyle = `rgb(${nx}, ${ny}, 255)`;
    ctxNormal.fillRect(rx, ry, 2, 2);
  }

  const normalMap = new THREE.CanvasTexture(canvasNormal);
  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;

  // 2. Multi-Zone Specular Roughness Map
  const canvasRough = document.createElement('canvas');
  canvasRough.width = width;
  canvasRough.height = height;
  const ctxRough = canvasRough.getContext('2d')!;

  ctxRough.fillStyle = '#b0b0b0'; // Stucco masonry (rough)
  ctxRough.fillRect(0, 0, width, height);

  // Smooth reflective window zones
  for (let y = 16; y < height; y += 64) {
    for (let x = 12; x < width; x += 48) {
      ctxRough.fillStyle = '#202020'; // Glass is extremely smooth & glossy
      ctxRough.fillRect(x + 4, y + 4, 32, 48);

      // Bronze frame border (semi-smooth)
      ctxRough.fillStyle = '#606060';
      ctxRough.strokeRect(x + 2, y + 2, 36, 52);
    }
  }

  const roughnessMap = new THREE.CanvasTexture(canvasRough);
  roughnessMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.RepeatWrapping;

  textureCache.set('facade_normal', normalMap);
  textureCache.set('facade_roughness', roughnessMap);

  return { normalMap, roughnessMap };
}

/**
 * Generates French cream limestone ashlar stone texture
 */
export function getLimestoneTextures() {
  if (textureCache.has('limestone_diffuse')) {
    return {
      map: textureCache.get('limestone_diffuse')!,
      bumpMap: textureCache.get('limestone_bump')!,
    };
  }

  const width = 512;
  const height = 512;

  // Diffuse Map
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Base warm cream limestone tone
  ctx.fillStyle = '#ede5d8';
  ctx.fillRect(0, 0, width, height);

  // Ashlar stone blocks
  const rowH = 64;
  for (let y = 0; y < height; y += rowH) {
    const isOdd = (y / rowH) % 2 === 1;
    const offset = isOdd ? 48 : 0;
    for (let x = -offset; x < width + 100; x += 128) {
      const blockW = 124;
      const shade = Math.floor(Math.random() * 8);
      ctx.fillStyle = `rgb(${237 - shade}, ${229 - shade}, ${216 - shade})`;
      ctx.fillRect(x + 2, y + 2, blockW, rowH - 4);

      // Fine stone grain
      for (let g = 0; g < 40; g++) {
        const gx = x + 2 + Math.random() * blockW;
        const gy = y + 2 + Math.random() * (rowH - 4);
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.08)' : 'rgba(180, 160, 140, 0.12)';
        ctx.fillRect(gx, gy, 2, 2);
      }
    }
    // Mortar horizontal joint
    ctx.fillStyle = '#cfc5b4';
    ctx.fillRect(0, y, width, 2);
  }

  const map = new THREE.CanvasTexture(canvas);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;

  // Bump Map
  const canvasBump = document.createElement('canvas');
  canvasBump.width = width;
  canvasBump.height = height;
  const ctxBump = canvasBump.getContext('2d')!;
  ctxBump.fillStyle = '#808080';
  ctxBump.fillRect(0, 0, width, height);

  for (let y = 0; y < height; y += rowH) {
    for (let x = 0; x < width; x += 128) {
      const bShade = Math.floor(125 + Math.random() * 20);
      ctxBump.fillStyle = `rgb(${bShade}, ${bShade}, ${bShade})`;
      ctxBump.fillRect(x + 2, y + 2, 124, rowH - 4);
    }
    ctxBump.fillStyle = '#404040';
    ctxBump.fillRect(0, y, width, 2);
  }

  const bumpMap = new THREE.CanvasTexture(canvasBump);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;

  textureCache.set('limestone_diffuse', map);
  textureCache.set('limestone_bump', bumpMap);

  return { map, bumpMap };
}


