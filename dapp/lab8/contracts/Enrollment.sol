pragma solidity >=0.4.25 <0.7.0;
pragma experimental ABIEncoderV2;

contract Enrollment {
    //管理员
    address public admin;
    //用户
    struct Participant {
        string name;
        string extra;
        string[] confs;
        bool signIn;
    }

    //会议信息
    struct Conference {
        string title;
        string detail;
        uint256 max;
        uint256 current;
    }

    //用户地址到用户信息的映射
    mapping(address => Participant) public participants;
    //受托者到其委托人信息的映射
    mapping(address => Participant[]) trustees;
    mapping(string => address) usernameToAddress;
    //会议列表
    Conference[] public conferences;

    //构造函数
    constructor() public {
        admin = msg.sender;
    }

    //用户注册，将个地址与个人信息kv对存储到participants中。
    //返回存储后的数据
    function signUp(string memory username, string memory extra)
        public
        returns (string memory, string memory)
    {
        require(
            bytes(participants[msg.sender].name).length <= 0,
            "User exists."
        );
        participants[msg.sender].name = username;
        participants[msg.sender].extra = extra;
        participants[msg.sender].signIn = true;
        usernameToAddress[username] = msg.sender;
        return (participants[msg.sender].name, participants[msg.sender].extra);
    }

    //用户报名会议，从会议列表中找到目标会议，判断是否报名满。
    //报名成功后，会将触发MyNewConference事件，使前端更新my conferences列表。
    //返回存储后的会议title。
    function enroll(string memory title)
        public
        returns (string memory)
    {
        for (uint256 i = 0; i < conferences.length; i++) {
            if (
                keccak256(bytes(conferences[i].title)) ==
                keccak256(bytes(title))
            ) {
                require(
                    conferences[i].current < conferences[i].max,
                    "Enrolled full"
                );
                conferences[i].current = conferences[i].current + 1;
                if (conferences[i].current == conferences[i].max) {
                    emit ConferenceExpire(title);
                }
                //require(msg.value == 1 ether);
                participants[msg.sender].signIn = false;
                participants[msg.sender].confs.push(title);
                emit MyNewConference(title);
            }
        }
        uint256 len = participants[msg.sender].confs.length;
        require(len > 0, "Conference does not exist");
        return participants[msg.sender].confs[len - 1];
    }

    //管理员根据信息创建新的会议，并存储到会议列表中。
    //返回存储后的会议title。
    function newConference(
        string memory title,
        string memory detail,
        uint256 max
    ) public returns (string memory) {
        require(msg.sender == admin, "permission denied");
        conferences.push(Conference(title, detail, max, 0));
        emit NewConference(title, detail);
        return conferences[conferences.length - 1].title;
    }

    //查询所有可报名会议，并以["title1","detail1","title2","detail2"...]的形式返回
    function queryConfList() public view returns (string[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < conferences.length; i++) {
            if (conferences[i].current < conferences[i].max) {
                count += 2;
            }
        }

        string[] memory list = new string[](count);

        count = 0;
        for (uint256 i = 0; i < conferences.length; i++) {
            if (conferences[i].current < conferences[i].max) {
                list[count] = conferences[i].title;
                list[count + 1] = conferences[i].detail;
                count += 2;
            }
        }

        return list;
    }

    //将我的已报名会议列表返回
    function queryMyConf() public view returns (string[] memory) {
        return participants[msg.sender].confs;
    }

    //当管理员发起新会议时触发，前端更新事件信息
    event NewConference(string title, string detail);
    //当报名人满时触发
    event ConferenceExpire(string title);
    //当用户报名新会议时触发
    event MyNewConference(string title);

    function delegate(address addr) public returns (address) {
        trustees[addr].push(participants[msg.sender]);
        // addr.transfer(1 ether);
        return addr;
    }

    function enrollFor(string memory username, string memory title)
        public
        returns (string memory)
    {
        bool flag = false;
        uint256 index = 0;
        for (uint256 i = 0; i < trustees[msg.sender].length; i++) {
            if (
                keccak256(bytes(trustees[msg.sender][i].name)) ==
                keccak256(bytes(username))
            ) {
                flag = true;
                index = i;
                break;
            }
        }
        require(flag == true, "Undelegate");
        for (uint256 i = 0; i < conferences.length; i++) {
            if (
                keccak256(bytes(conferences[i].title)) ==
                keccak256(bytes(title))
            ) {
                require(
                    conferences[i].current < conferences[i].max,
                    "Enrolled full"
                );
                conferences[i].current = conferences[i].current + 1;
                if (conferences[i].current == conferences[i].max) {
                    emit ConferenceExpire(title);
                }
                //require(msg.value == 1 ether);
                participants[usernameToAddress[trustees[msg.sender][index]
                    .name]]
                    .confs
                    .push(title);
                participants[usernameToAddress[trustees[msg.sender][index]
                    .name]]
                    .signIn = false;
            }
        }
        uint256 len = participants[usernameToAddress[trustees[msg.sender][index]
            .name]]
            .confs
            .length;
        require(len > 0, "Conference does not exist");
        return
            participants[usernameToAddress[trustees[msg.sender][index].name]]
                .confs[len - 1];
    }

/*
    function get() public payable {
        require(participants[msg.sender].signIn == false);
        msg.sender.transfer(1 ether);
        participants[msg.sender].signIn = true;
    }
*/
}
