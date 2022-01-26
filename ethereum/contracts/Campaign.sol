pragma solidity ^0.4.26;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}
contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;//no need to initialize a reference type like mapping
    }

    //we dont care if someone wants to find what the his address is, in this case is actually better to be public
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    Request[] public requests;
    uint public approversCount;

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minimum, address creator) public {
        manager = creator; //msg.sender; this will be the contract itself
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        //mapping
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string description, uint value, address recipient)
        public restricted {
        Request memory newRequest = Request({ //as this part is created in memory, newrequest can't point to something in storage
            description: description, //storage would give an error
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });

        /*alternative syntax
        Request(description, value, recipient, false);
        */
        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);//check if the dude approved
        require(!request.approvals[msg.sender]);//check if the dude hasn't voted before, the "!" kicks if he did

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount /2));
        require(!request.complete);
        request.complete = true;

        request.recipient.transfer(request.value);
    }

    function getSummary() public view returns (uint, uint, uint, uint, address) {
      return (
        minimumContribution,
        this.balance,
        requests.length,
        approversCount,
        manager
      );
    }

    function getRequestCount() public view returns (uint) {
      return requests.length;
    }
}
