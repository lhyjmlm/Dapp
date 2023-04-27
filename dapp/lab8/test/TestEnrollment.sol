pragma solidity >=0.4.25 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Enrollment.sol";

contract TestEnrollment{
    //测试注册后，是否返回正确注册信息（仅测试name即可）
    function testSignUp() public {
        Enrollment en = new Enrollment();
        (string memory name,) = en.signUp("alice","male");
        (string memory expected_name,) = ("alice","male");
        Assert.equal(name,expected_name,"signup failed");
    }

    //测试管理员添加新会议是否成功
    function testNewConf() public{
        Enrollment enroll = new Enrollment();
        string memory expected = "conf1";
        Assert.equal(enroll.newConference("conf1","beijing",30),expected,"new conference failed");
    }

    //请测试enroll函数，确保当用户报名后，其已报名会议列表中有该会议。提示：不要忘记先由管理员创建会议。
    function testEnroll() public{
        Enrollment test = new Enrollment();
        test.newConference("conf2","beijing",30);
        string memory expected = "conf2";
        Assert.equal(test.enroll("conf2"),expected,"enroll failed");
    }
}