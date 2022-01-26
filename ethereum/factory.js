import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x021431b137F7EF5cCf5F5c1c557a0D0B9A3268A4'
);

export default instance;
//if we ever need to get access to our deployed factory,
//we won't need to do this again, just need to import this file
