// Language Miner v6.4.91 - one Supabase account for game access, existing saves, and Patreon linking.
(()=>{
"use strict";
const CONFIG=window.JAPANESE_MINER_PATREON_CONFIG||{};
const SESSION_KEY="lm_cloud_session_v2";
const LEGACY_SESSION_PREFIX="jm_patreon_session_v1:";

function enabled(){return CONFIG.enabled===true&&/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(String(CONFIG.supabaseUrl||""))&&String(CONFIG.supabaseAnonKey||"").length>30;}
function authUrl(path){return `${String(CONFIG.supabaseUrl).replace(/\/$/,"")}/auth/v1/${path}`;}
function readJson(key){try{return JSON.parse(localStorage.getItem(key)||"null");}catch{return null;}}
function writeJson(key,value){try{if(value==null)localStorage.removeItem(key);else localStorage.setItem(key,JSON.stringify(value));}catch{}}
function normalizeSession(payload){
  if(!payload?.access_token)return null;
  return {accessToken:payload.access_token,refreshToken:payload.refresh_token||"",expiresAt:Number(payload.expires_at)||Math.floor(Date.now()/1000)+Number(payload.expires_in||3600),user:payload.user||null};
}
function migrateLegacySession(){
  const current=readJson(SESSION_KEY);
  if(current?.accessToken)return current;
  try{
    for(let index=0;index<localStorage.length;index++){
      const key=localStorage.key(index);
      if(!String(key||"").startsWith(LEGACY_SESSION_PREFIX))continue;
      const legacy=readJson(key);
      if(legacy?.accessToken){
        const migrated=Object.assign({},legacy,{migratedProfileId:key.slice(LEGACY_SESSION_PREFIX.length)});
        writeJson(SESSION_KEY,migrated);
        return migrated;
      }
    }
  }catch{}
  return null;
}
let session=migrateLegacySession();

function announce(){window.dispatchEvent(new CustomEvent("lm-cloud-session-changed",{detail:{authenticated:!!session,user:session?.user||null}}));}
function saveSession(next){session=next||null;writeJson(SESSION_KEY,session);announce();return session;}
function getSession(){return session;}
async function request(path,{method="POST",body=null,token=null}={}){
  if(!enabled())throw new Error("Online accounts are not configured yet.");
  const headers={apikey:String(CONFIG.supabaseAnonKey||""),Accept:"application/json"};
  if(body!=null)headers["Content-Type"]="application/json";
  if(token)headers.Authorization=`Bearer ${token}`;
  const response=await fetch(authUrl(path),{method,headers,body:body==null?undefined:JSON.stringify(body)});
  let payload={};try{payload=await response.json();}catch{}
  if(!response.ok)throw new Error(payload?.error_description||payload?.msg||payload?.error||payload?.message||`Account request failed (${response.status})`);
  return payload;
}
async function refresh(){
  if(!session?.refreshToken)throw new Error("Your Language Miner session expired. Please sign in again.");
  const payload=await request("token?grant_type=refresh_token",{body:{refresh_token:session.refreshToken}}),next=normalizeSession(payload);
  if(!next)throw new Error("Language Miner could not refresh your account session.");
  if(session.migratedProfileId)next.migratedProfileId=session.migratedProfileId;
  return saveSession(next);
}
async function validSession(){
  if(!session)return null;
  if(Number(session.expiresAt||0)>Math.floor(Date.now()/1000)+60)return session;
  try{return await refresh();}catch(error){saveSession(null);throw error;}
}
async function bootstrap(){
  if(!session)return null;
  try{return await validSession();}catch{return null;}
}
async function signIn(email,password){
  const payload=await request("token?grant_type=password",{body:{email:String(email||"").trim(),password}}),next=normalizeSession(payload);
  if(!next)throw new Error("Language Miner did not return an account session.");
  return saveSession(next);
}
async function signUp(displayName,email,password){
  const name=String(displayName||"").trim().replace(/\s+/g," ");
  const redirectTo=`${location.origin}${location.pathname}`;
  const payload=await request(`signup?redirect_to=${encodeURIComponent(redirectTo)}`,{body:{email:String(email||"").trim(),password,data:{display_name:name,game_profile_name:name}}}),next=normalizeSession(payload);
  if(!next)throw new Error("Account created. Email confirmation is still enabled; confirm the email, then return and sign in.");
  return saveSession(next);
}
async function signOut(){
  const token=session?.accessToken;
  if(token)try{await request("logout",{token});}catch{}
  saveSession(null);
  try{for(let index=localStorage.length-1;index>=0;index--){const key=localStorage.key(index);if(String(key||"").startsWith(LEGACY_SESSION_PREFIX))localStorage.removeItem(key);}}catch{}
}

window.languageMinerCloudAuth=Object.freeze({enabled,getSession,saveSession,bootstrap,validSession,signIn,signUp,signOut});
})();
