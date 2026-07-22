// Japanese Miner v6.2.9 compressed cosmetic artwork loader
(()=>{
  'use strict';
  window.JM_RECOLOR_DATA={};
  window.getJapaneseMinerRecolor=key=>{
    const value=window.JM_RECOLOR_DATA[key];
    return value?`data:image/webp;base64,${value}`:'';
  };
  async function load(){
    try{
      const response=await fetch('recolors.json.gz?v=6.2.9');
      if(!response.ok)throw new Error(`Cosmetic artwork request failed: ${response.status}`);
      const compressed=await response.arrayBuffer();
      const stream=new Blob([compressed]).stream().pipeThrough(new DecompressionStream('gzip'));
      window.JM_RECOLOR_DATA=await new Response(stream).json();
      window.dispatchEvent(new Event('jm-recolors-ready'));
    }catch(error){console.error('Japanese Miner cosmetic artwork could not be loaded.',error);}
  }
  load();
})();
