// Japanese Miner v6.2.12 compressed cosmetic artwork loader
(()=>{
  'use strict';
  window.JM_RECOLOR_DATA={};
  window.getJapaneseMinerRecolor=key=>{
    const value=window.JM_RECOLOR_DATA[key];
    return value?`data:image/webp;base64,${value}`:'';
  };
  async function load(){
    try{
      const response=await fetch('recolors.json.gz?v=6.2.12');
      if(!response.ok)throw new Error(`Cosmetic artwork request failed: ${response.status}`);
      const payload=await response.arrayBuffer();
      const bytes=new Uint8Array(payload);
      if(bytes[0]===0x1f&&bytes[1]===0x8b){
        const stream=new Blob([payload]).stream().pipeThrough(new DecompressionStream('gzip'));
        window.JM_RECOLOR_DATA=await new Response(stream).json();
      }else{
        window.JM_RECOLOR_DATA=JSON.parse(new TextDecoder().decode(bytes));
      }
      window.dispatchEvent(new Event('jm-recolors-ready'));
    }catch(error){console.error('Japanese Miner cosmetic artwork could not be loaded.',error);}
  }
  load();
})();
