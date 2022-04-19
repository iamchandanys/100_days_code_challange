// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

// Solidity - Access Modifiers

contract AccessModifiers {
    uint256 count;

    constructor() {
        count = 0;
    }

    // PUBLIC ACCESS MODIFIER - Public Functions/Variables can be used both externally and internally.
    function getCount() public view returns (uint256) {
        return count;
    }

    // INTERNAL ACCESS MODIFIER − Internal Functions/Variables can only be used internally or by derived contracts.
    function inc() internal {
        count++;
    }
}

// Solidity - Local, State & Global Variables

contract Variables {
    // State Variables − State variables are declared outside a function & stored on the blockchain.
    uint256 public count = 1;

    function doSomething() public view returns (uint256, uint256, uint256, address)
    {
        // Local Variables − Local variables are declared inside a function & not stored on the blockchain.
        uint256 counter = 1;

        // Global Variables - Global variables provides information about the blockchain.
        // Here are some global variables.
        uint256 timeStamp = block.timestamp; // Returns the current block timestamp
        uint256 blockNumber = block.number; // Returns the current block number
        address sender = msg.sender; // Returns the address of the caller

        return (counter, timeStamp, blockNumber, sender);
    }
}

// Solidity – View and Pure Functions

contract ViewAndPureFunctions {
    uint256 count;

    // VEIW - A function that only reads but doesn't alter the state variables defined in the contract is called a View Function.
    function getCount() public view returns (uint256) {
        return count;
    }

    // PURE - A function that doesn't read or modify the state variables defined in the contract is called a Pure Function.
    function getValue() public pure returns (uint256) {
        uint256 counter = 1;
        return counter;
    }
}

// Solidity - Datatypes

contract DataTypes {
    // Signed INTEGERS - Signed Integers can hold both negative and positive values.
    int256 public count1 = 1;

    // UNSIGNED INTEGERS: Unsigned Integers can hold only positive values along with zero.
    uint256 public count2 = 0;

    // STRING - Holds a collection of characters.
    string public myString = "Hello World!";

    // BYTES - Everything in memory is stored in bits consisting of binary values 0's and 1's.
    bytes public myBytes = "Hello World!";

    // ADDRESS - It's similar to the Ethereum address. Holds a 20-byte value.
    address public myAddress = 0x345cA3e014Aaf5dcA488057592ee47305D9B3e10;

    //BOOL - Holds true or false.
    bool public isActive = true;

    // STRUCT - Solidity allows user to create their own data type in the form of structure.
    // The struct contains a group of elements with a different data type. Generally, it is used to represent a record.
    // To define a structure struct keyword is used, which creates a new data type.
    struct PersonDetails {
        uint256 userId;
        string userName;
    }

    // To create new instance of Struct
    PersonDetails public personDetails = PersonDetails(1, "Hello World");
}

// Solidity - Default Values

contract DefaultValues {
    int256 public i; // 0
    uint256 public u; // 0
    bool public b; // false
    address public a; // 0x0000000000000000000000000000000000000000
    bytes16 public b16; // 0x00000000000000000000000000000000
}

// Solidity - Constants

contract Constants {
    // Variables that cannot be changed are known as constants.
    // Their value is hard-coded, and employing constants can help you save money on gas.
    string public constant WITH_CONSTANT = "Any_Text";
    string public WITHOUT_CONSTANT = "Any_Text";
}

// Solidity - Arrays

contract Arrays {
    // an array of integer.
    uint256[] public uintArray = [1, 2, 3];
    // an array of string.
    string[] public strArray = ["Air", "Water", "Soil"];
    // 2 dimentional array of string.
    string[][] public strArray2D = [["A", "B"], ["M", "N"]];


    // add element to an array.
    function add(string memory _myString) public {
        strArray.push(_myString); // adds element at the end of an array
    }

    // remove element from an array.
    function remove() public {
        strArray.pop(); // removes last element from an array.
    }

    // reset element in an array.
    function reset(uint _index) public {
        // the length of the array is not affected by deletion.
        // it resets the value at the index to its default value, which is 0, in this case.
        delete strArray[_index];
    }

    // get length of an array.
    function getLength() public view returns(uint256){
        return strArray.length;
    }

    // to create instance of an array of integer.
    function createInstance() public pure returns(uint256[] memory){
        uint256[] memory a = new uint256[](5); // only fixed size can be created.
        return a;
    }
}