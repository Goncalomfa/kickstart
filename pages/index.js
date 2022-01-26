import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';

//we need a minimum amount of JSX when doing a component or it will give error
class CampaignIndex extends Component {
  static async getInitialProps() { //static defines a class function, with this CampaignIndex isn't assigned to instances of the class but to the class itself
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  renderCampaigns() {//this logic is being executed one time for every Campaign
    const items = this.props.campaigns.map(address => {//function into map, the function will be called one time for every element inside the array
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Open Campaigns</h3>

          <Link route="/campaigns/new">
            <a>
              <Button
                floated="right"
                content="Create Campaign"
                icon="add circle"
                primary
              />
            </a>
          </Link>

          {this.renderCampaigns()}
        </div>
      </Layout>
    )
  }
}

export default CampaignIndex; //when next imports a file from pages it always expects an export
