const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fetch = require("cross-fetch");

// Keeps a history of links obtained to save speed
function memoizedData(){
  const organizations_history = {} // {wie : {organization_name: wie, events: []}}

  return async function (link) {
    try {
      const name = link.replace("https://linktr.ee/", "").replace("uwaterloo", "");

      // if we have already visited the link tree
      if (name in organizations_history){
        console.log(`using memoized link for ${name}`);
        return organizations_history[name];
      } 
      // if its the first time visiting the link tree
      else {
        console.log(`getting ${name} from scratch`)
        const organizationData = await getData(link);
        organizations_history[name] = organizationData;
        return organizationData;
      }
    } catch(e){
      console.log("Link isnt a valid link tree")
      throw new Error(`invalid linktree ${e}`)
    }
  }
}

// Scrapes data given a Link Tree url
async function getData(link){
  console.log(link);
  const res = await fetch(link);
  const html = await res.text();

  console.log("res: " , res);
  console.log("html: " , html);

  const document = new JSDOM(html).window.document;

  console.log("document: " , document);

  // get name of club
  const name = document.querySelector('h1').innerHTML.trim().replace("@", "").replace("uwaterloo", "");
  const data = {
    "organization_name" : name,
    "events": []
  }

  const eventData = document.querySelectorAll('[data-testid="LinkButton"]');
  for (let item of eventData) {
    const eventName = item.textContent.trim();
    const eventLink = item.getAttribute("href");

    if (eventIsUseful(eventName, eventLink)) {
      data["events"].push({
        "name" : eventName,
        "link" : eventLink
      })
    }
  }

  return data
}

// Removes non important links
function eventIsUseful(name, link){
  keywords = ["discord", "facebook", "instagram", "twitch", "website", 
              "nominate", "wie newsletter", "notion template" ,"room access", 
              "slack", "class profile", "bot pictures", "youtube", "twitter",
              "linkedin", "tech+ website", "documentation", "tiktok", "tik tok"]
  for (let keyword of keywords){
    if(name.toLowerCase().includes(keyword) || name == "" || link == "") {
      return false
    }
  }
  return true
}

module.exports = memoizedData;
